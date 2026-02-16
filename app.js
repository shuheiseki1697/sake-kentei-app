// ===== Storage =====
const STORAGE_KEY = "sake_kentei_progress";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ===== State =====
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let currentCategory = "";
let wrongAnswers = [];

// ===== DOM =====
const $ = (id) => document.getElementById(id);
const screens = {
  home: $("home-screen"),
  category: $("category-screen"),
  quiz: $("quiz-screen"),
  result: $("result-screen"),
};

// ===== Init =====
function init() {
  // Inject SVG gradient for score ring
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  svg.innerHTML = `<defs><linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#8b2d2d"/><stop offset="100%" stop-color="#d4a574"/>
  </linearGradient></defs>`;
  document.body.appendChild(svg);

  renderCategoryButtons();
  updateDashboard();

  $("start-quiz-btn").addEventListener("click", () => navigateTo("category"));
  $("back-to-home").addEventListener("click", () => navigateTo("home"));
  $("quiz-back").addEventListener("click", () => navigateTo("home"));
  $("next-btn").addEventListener("click", nextQuestion);
  $("retry-btn").addEventListener("click", retryQuiz);
  $("home-btn").addEventListener("click", () => navigateTo("home"));
  $("review-btn").addEventListener("click", startReview);
}

// ===== Navigation =====
function navigateTo(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  const target = screens[name];
  target.classList.add("active");
  // Re-trigger animation
  target.style.animation = "none";
  target.offsetHeight; // reflow
  target.style.animation = "";
  window.scrollTo(0, 0);

  if (name === "home") updateDashboard();
}

// ===== Dashboard =====
function updateDashboard() {
  const progress = loadProgress();
  const attempts = progress.totalAttempts || 0;
  const best = progress.bestScore;
  const mastered = countMastered(progress);

  $("stat-total").textContent = attempts;
  $("stat-best").textContent = best != null ? best + "%" : "-%";
  $("stat-mastered").textContent = mastered + "/" + questions.length;

  renderCategoryBars(progress);
}

function countMastered(progress) {
  const m = progress.mastered || {};
  return Object.keys(m).length;
}

function renderCategoryBars(progress) {
  const container = $("category-bars");
  container.innerHTML = "";
  const cats = getCategories();

  Object.keys(cats).forEach((cat) => {
    const catBest = (progress.categoryBest || {})[cat];
    const pct = catBest != null ? catBest : 0;

    const row = document.createElement("div");
    row.className = "cat-bar-row";
    row.innerHTML = `
      <span class="cat-bar-label">${cat}</span>
      <div class="cat-bar-track"><div class="cat-bar-fill" style="width:0%"></div></div>
      <span class="cat-bar-pct">${pct}%</span>`;
    container.appendChild(row);

    // Animate bar after append
    requestAnimationFrame(() => {
      row.querySelector(".cat-bar-fill").style.width = pct + "%";
    });
  });
}

// ===== Categories =====
function getCategories() {
  const cats = {};
  questions.forEach((q) => {
    if (!cats[q.category]) cats[q.category] = 0;
    cats[q.category]++;
  });
  return cats;
}

function renderCategoryButtons() {
  const container = $("category-buttons");
  const cats = getCategories();
  const progress = loadProgress();

  // All
  const allBtn = document.createElement("button");
  allBtn.className = "cat-btn";
  const allBest = progress.bestScore;
  allBtn.innerHTML = `<span>全問チャレンジ</span>
    <div class="cat-meta">
      <span class="cat-count">${questions.length}問</span>
      ${allBest != null ? `<span class="cat-best">${allBest}%</span>` : ""}
    </div>`;
  allBtn.addEventListener("click", () => startQuiz("all"));
  container.appendChild(allBtn);

  Object.keys(cats).forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "cat-btn";
    const catBest = (progress.categoryBest || {})[cat];
    btn.innerHTML = `<span>${cat}</span>
      <div class="cat-meta">
        <span class="cat-count">${cats[cat]}問</span>
        ${catBest != null ? `<span class="cat-best">${catBest}%</span>` : ""}
      </div>`;
    btn.addEventListener("click", () => startQuiz(cat));
    container.appendChild(btn);
  });
}

// ===== Quiz =====
function startQuiz(category) {
  currentCategory = category;
  currentIndex = 0;
  score = 0;
  wrongAnswers = [];

  if (category === "all") {
    currentQuestions = shuffle([...questions]);
  } else {
    currentQuestions = shuffle(questions.filter((q) => q.category === category));
  }

  navigateTo("quiz");
  $("category-label").textContent = category === "all" ? "全問" : category;
  showQuestion();
}

function showQuestion() {
  const q = currentQuestions[currentIndex];
  const total = currentQuestions.length;
  $("progress").textContent = `${currentIndex + 1} / ${total}`;
  $("progress-bar").style.width = `${((currentIndex + 1) / total) * 100}%`;
  $("question-text").textContent = q.question;
  $("explanation-box").classList.add("hidden");

  // Re-animate question card
  const card = $("question-card");
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "";

  const choices = $("choices");
  choices.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    choices.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, selectedBtn) {
  const q = currentQuestions[currentIndex];
  const buttons = $("choices").querySelectorAll(".choice-btn");
  const answerIcon = $("answer-icon");
  const answerLabel = $("answer-label");

  buttons.forEach((btn) => btn.classList.add("disabled"));

  const isCorrect = selectedIndex === q.answer;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    answerIcon.textContent = "\u2713";
    answerLabel.textContent = "正解！";
    answerLabel.className = "answer-label correct";

    // Track mastered
    const progress = loadProgress();
    if (!progress.mastered) progress.mastered = {};
    progress.mastered[q.question] = true;
    saveProgress(progress);
  } else {
    selectedBtn.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    answerIcon.textContent = "\u2717";
    answerLabel.textContent = "不正解...";
    answerLabel.className = "answer-label wrong";
    wrongAnswers.push({ question: q, selected: selectedIndex });
  }

  $("explanation-text").textContent = q.explanation;

  const link = $("textbook-link");
  if (q.textbookSection) {
    link.href = `textbook.html#${q.textbookSection}`;
    link.style.display = "inline-block";
  } else {
    link.style.display = "none";
  }

  $("explanation-box").classList.remove("hidden");
  $("next-btn").textContent =
    currentIndex === currentQuestions.length - 1 ? "結果を見る" : "次の問題へ";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ===== Result =====
function showResult() {
  navigateTo("result");

  const total = currentQuestions.length;
  const pct = Math.round((score / total) * 100);

  // Animate ring
  $("score-text").textContent = pct + "%";
  const circumference = 2 * Math.PI * 54; // 339.292
  const offset = circumference * (1 - pct / 100);
  const ring = $("ring-fill");
  ring.style.strokeDashoffset = circumference;
  requestAnimationFrame(() => {
    ring.style.strokeDashoffset = offset;
  });

  // Message
  let msg = "";
  if (pct === 100) msg = "満点！日本酒マスター！";
  else if (pct >= 80) msg = "素晴らしい！合格レベル！";
  else if (pct >= 60) msg = "もう少しで合格！";
  else msg = "精進あるのみ！";
  $("result-message").textContent = msg;
  $("result-detail").textContent = `${total}問中 ${score}問正解`;

  // Save progress
  const progress = loadProgress();
  progress.totalAttempts = (progress.totalAttempts || 0) + 1;
  if (currentCategory === "all") {
    if (pct > (progress.bestScore || 0)) progress.bestScore = pct;
  }
  if (!progress.categoryBest) progress.categoryBest = {};
  // Update per-category
  const catScores = {};
  currentQuestions.forEach((q, i) => {
    if (!catScores[q.category]) catScores[q.category] = { correct: 0, total: 0 };
    catScores[q.category].total++;
  });
  wrongAnswers.forEach((w) => {
    if (!catScores[w.question.category]) catScores[w.question.category] = { correct: 0, total: 0 };
  });
  // count correct per cat
  currentQuestions.forEach((q) => {
    const wasWrong = wrongAnswers.some((w) => w.question === q);
    if (!wasWrong) catScores[q.category].correct++;
  });

  Object.keys(catScores).forEach((cat) => {
    const catPct = Math.round((catScores[cat].correct / catScores[cat].total) * 100);
    const prev = progress.categoryBest[cat] || 0;
    if (catPct > prev) progress.categoryBest[cat] = catPct;
  });
  saveProgress(progress);

  // Breakdown chips
  const breakdown = $("result-breakdown");
  breakdown.innerHTML = "";
  Object.keys(catScores).forEach((cat) => {
    const s = catScores[cat];
    const chip = document.createElement("div");
    chip.className = "breakdown-chip";
    chip.innerHTML = `<span class="breakdown-chip-cat">${cat}</span>
      <span class="breakdown-chip-score">${s.correct}/${s.total}</span>`;
    breakdown.appendChild(chip);
  });

  // Wrong answers
  const wrongSection = $("wrong-section");
  const wrongList = $("wrong-list");
  const reviewBtn = $("review-btn");
  wrongList.innerHTML = "";

  if (wrongAnswers.length > 0) {
    wrongSection.classList.remove("hidden");
    reviewBtn.classList.remove("hidden");
    wrongAnswers.forEach((w) => {
      const item = document.createElement("div");
      item.className = "wrong-item";
      item.innerHTML = `<p class="wrong-item-q">${w.question.question}</p>
        <p class="wrong-item-a">\u2713 ${w.question.choices[w.question.answer]}</p>`;
      wrongList.appendChild(item);
    });
  } else {
    wrongSection.classList.add("hidden");
    reviewBtn.classList.add("hidden");
  }

  // Refresh category buttons (to show updated best scores)
  $("category-buttons").innerHTML = "";
  renderCategoryButtons();
}

function retryQuiz() {
  startQuiz(currentCategory);
}

function startReview() {
  currentCategory = "review";
  currentIndex = 0;
  score = 0;
  currentQuestions = wrongAnswers.map((w) => w.question);
  wrongAnswers = [];

  navigateTo("quiz");
  $("category-label").textContent = "復習";
  showQuestion();
}

// ===== Shuffle =====
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ===== Boot =====
init();
