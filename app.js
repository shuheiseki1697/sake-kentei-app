// ===== 状態管理 =====
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let currentCategory = "";

// ===== DOM要素 =====
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const categoryButtons = document.getElementById("category-buttons");
const categoryLabel = document.getElementById("category-label");
const progress = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const explanationBox = document.getElementById("explanation-box");
const explanationText = document.getElementById("explanation-text");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const resultMessage = document.getElementById("result-message");
const retryBtn = document.getElementById("retry-btn");
const homeBtn = document.getElementById("home-btn");

// ===== 初期化 =====
function init() {
  renderCategoryButtons();
  nextBtn.addEventListener("click", nextQuestion);
  retryBtn.addEventListener("click", retryQuiz);
  homeBtn.addEventListener("click", goHome);
}

// ===== カテゴリボタンを生成 =====
function renderCategoryButtons() {
  // カテゴリごとに問題数を集計
  const categories = {};
  questions.forEach((q) => {
    if (!categories[q.category]) {
      categories[q.category] = 0;
    }
    categories[q.category]++;
  });

  // 「全問チャレンジ」ボタン
  const allBtn = document.createElement("button");
  allBtn.className = "category-btn";
  allBtn.innerHTML = `全問チャレンジ <span class="count">${questions.length}問</span>`;
  allBtn.addEventListener("click", () => startQuiz("all"));
  categoryButtons.appendChild(allBtn);

  // カテゴリ別ボタン
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

  // 問題をフィルタリング＆シャッフル
  if (category === "all") {
    currentQuestions = shuffle([...questions]);
  } else {
    currentQuestions = shuffle(
      questions.filter((q) => q.category === category)
    );
  }

  // 画面切り替え
  showScreen(quizScreen);
  categoryLabel.textContent = category === "all" ? "全問" : category;
  showQuestion();
}

// ===== 問題を表示 =====
function showQuestion() {
  const q = currentQuestions[currentIndex];
  progress.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
  questionText.textContent = q.question;
  explanationBox.classList.add("hidden");

  // 選択肢を生成
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

  // 全ボタンを無効化
  buttons.forEach((btn) => btn.classList.add("disabled"));

  // 正解・不正解の表示
  if (selectedIndex === q.answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
  }

  // 解説を表示
  explanationText.textContent = q.explanation;
  explanationBox.classList.remove("hidden");

  // 最後の問題なら「次へ」ボタンのテキストを変更
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

  let message = "";
  if (percentage === 100) {
    message = "満点！日本酒マスターです！🎉";
  } else if (percentage >= 80) {
    message = "素晴らしい！合格レベルです！";
  } else if (percentage >= 60) {
    message = "もう少し！復習して再チャレンジ！";
  } else {
    message = "がんばりましょう！繰り返し学習が大切です。";
  }
  message += `\n\n${currentQuestions.length}問中 ${score}問正解`;
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
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  screen.classList.remove("hidden");
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
