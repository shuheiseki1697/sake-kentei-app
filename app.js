// ===== 状態管理 =====
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let currentCategory = "";

// ===== DOM要素 =====
const startScreen = document.getElementById("start-screen");
const categoryScreen = document.getElementById("category-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const categoryButtons = document.getElementById("category-buttons");
const categoryLabel = document.getElementById("category-label");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const explanationBox = document.getElementById("explanation-box");
const explanationText = document.getElementById("explanation-text");
const textbookLink = document.getElementById("textbook-link");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const resultDetail = document.getElementById("result-detail");
const resultMessage = document.getElementById("result-message");
const retryBtn = document.getElementById("retry-btn");
const homeBtn = document.getElementById("home-btn");
const startQuizBtn = document.getElementById("start-quiz-btn");
const backToHome = document.getElementById("back-to-home");

// ===== 全画面リスト =====
const allScreens = [startScreen, categoryScreen, quizScreen, resultScreen];

// ===== 初期化 =====
function init() {
  renderCategoryButtons();
  nextBtn.addEventListener("click", nextQuestion);
  retryBtn.addEventListener("click", retryQuiz);
  homeBtn.addEventListener("click", goHome);
  startQuizBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showScreen(categoryScreen);
  });
  backToHome.addEventListener("click", goHome);
}

// ===== カテゴリボタンを生成 =====
function renderCategoryButtons() {
  const categories = {};
  questions.forEach((q) => {
    if (!categories[q.category]) categories[q.category] = 0;
    categories[q.category]++;
  });

  const allBtn = document.createElement("button");
  allBtn.className = "category-btn";
  allBtn.innerHTML = `全問チャレンジ <span class="count">${questions.length}問</span>`;
  allBtn.addEventListener("click", () => startQuiz("all"));
  categoryButtons.appendChild(allBtn);

  Object.keys(categories).forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.innerHTML = `${cat} <span class="count">${categories[cat]}問</span>`;
    btn.addEventListener("click", () => startQuiz(cat));
    categoryButtons.appendChild(btn);
  });
}

// ===== クイズ開始 =====
function startQuiz(category) {
  currentCategory = category;
  currentIndex = 0;
  score = 0;

  if (category === "all") {
    currentQuestions = shuffle([...questions]);
  } else {
    currentQuestions = shuffle(questions.filter((q) => q.category === category));
  }

  showScreen(quizScreen);
  categoryLabel.textContent = category === "all" ? "全問" : category;
  showQuestion();
}

// ===== 問題を表示 =====
function showQuestion() {
  const q = currentQuestions[currentIndex];
  progress.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
  progressBar.style.width = `${((currentIndex + 1) / currentQuestions.length) * 100}%`;
  questionText.textContent = q.question;
  explanationBox.classList.add("hidden");

  choicesContainer.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    choicesContainer.appendChild(btn);
  });
}

// ===== 回答を選択 =====
function selectAnswer(selectedIndex, selectedBtn) {
  const q = currentQuestions[currentIndex];
  const buttons = choicesContainer.querySelectorAll(".choice-btn");

  buttons.forEach((btn) => btn.classList.add("disabled"));

  if (selectedIndex === q.answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
  }

  explanationText.textContent = q.explanation;

  // 教科書リンクを設定
  if (q.textbookSection) {
    textbookLink.href = `textbook.html#${q.textbookSection}`;
    textbookLink.style.display = "block";
  } else {
    textbookLink.style.display = "none";
  }

  explanationBox.classList.remove("hidden");

  if (currentIndex === currentQuestions.length - 1) {
    nextBtn.textContent = "結果を見る";
  } else {
    nextBtn.textContent = "次の問題へ";
  }
}

// ===== 次の問題へ =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ===== 結果画面を表示 =====
function showResult() {
  showScreen(resultScreen);

  const percentage = Math.round((score / currentQuestions.length) * 100);
  scoreText.textContent = `${percentage}%`;
  resultDetail.textContent = `${currentQuestions.length}問中 ${score}問正解`;

  let message = "";
  if (percentage === 100) {
    message = "満点！日本酒マスター！";
  } else if (percentage >= 80) {
    message = "素晴らしい！合格レベル！";
  } else if (percentage >= 60) {
    message = "もう少し！復習して再挑戦！";
  } else {
    message = "精進あるのみ！";
  }
  resultMessage.textContent = message;
}

// ===== 同じカテゴリでやり直し =====
function retryQuiz() {
  startQuiz(currentCategory);
}

// ===== ホームに戻る =====
function goHome() {
  showScreen(startScreen);
}

// ===== 画面切り替え =====
function showScreen(screen) {
  allScreens.forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
  window.scrollTo(0, 0);
}

// ===== 配列をシャッフル =====
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ===== アプリ起動 =====
init();
