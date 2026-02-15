const questions = [
  // ===== 歴史 =====
  {
    category: "歴史",
    question: "日本酒の醸造技術が大きく発展した「諸白（もろはく）造り」が確立されたのはいつ頃か？",
    choices: ["奈良時代", "平安時代", "室町時代", "江戸時代"],
    answer: 2,
    explanation: "室町時代に、麹米・掛米ともに精白米を用いる「諸白造り」が確立され、酒質が大きく向上しました。",
    textbookSection: "history-medieval"
  },
  {
    category: "歴史",
    question: "江戸時代に「下り酒」として江戸で人気を博した酒の主な産地はどこか？",
    choices: ["新潟", "灘（兵庫）", "伏見（京都）", "秋田"],
    answer: 1,
    explanation: "灘（兵庫県）の酒は、宮水を使った辛口の酒として江戸で大人気となり「下り酒」と呼ばれました。",
    textbookSection: "history-edo"
  },
  {
    category: "歴史",
    question: "明治時代に導入され、日本酒の品質向上に大きく貢献した技術は何か？",
    choices: ["木桶仕込み", "生酛造り", "速醸酛", "山廃仕込み"],
    answer: 2,
    explanation: "明治42年（1909年）に江田鎌治郎が速醸酛を開発。乳酸を直接添加することで、安全かつ短期間で酒母を造れるようになりました。",
    textbookSection: "history-modern"
  },
  {
    category: "歴史",
    question: "日本最古の酒についての記述がある書物はどれか？",
    choices: ["古事記", "日本書紀", "播磨国風土記", "万葉集"],
    answer: 2,
    explanation: "播磨国風土記には「庭田の稲についたカビからお神酒を醸した」という記述があり、麹を用いた酒造りの最古の記録とされています。",
    textbookSection: "history-ancient"
  },
  {
    category: "歴史",
    question: "「灘の生一本」の「生一本」の意味として正しいものはどれか？",
    choices: ["加水していない原酒のこと", "単一の醸造所で造られた純米酒のこと", "生酒であること", "一回火入れの酒のこと"],
    answer: 1,
    explanation: "「生一本」とは、単一の製造場で醸造した純米酒のみに表示が認められている用語です。",
    textbookSection: "history-edo"
  },

  // ===== 製造 =====
  {
    category: "製造",
    question: "日本酒の仕込みで、麹菌が米のデンプンを糖に変える工程を何というか？",
    choices: ["発酵", "糖化", "蒸留", "濾過"],
    answer: 1,
    explanation: "麹菌が生成する酵素（アミラーゼなど）が米のデンプンをブドウ糖に分解する工程を「糖化」といいます。",
    textbookSection: "brewing-koji"
  },
  {
    category: "製造",
    question: "日本酒の「三段仕込み」で、最初の仕込みを何と呼ぶか？",
    choices: ["添（そえ）", "仲（なか）", "留（とめ）", "酛（もと）"],
    answer: 0,
    explanation: "三段仕込みは「添（初添）」→「仲（仲添）」→「留（留添）」の順で行います。最初の添で酵母を慣らします。",
    textbookSection: "brewing-moromi"
  },
  {
    category: "製造",
    question: "「並行複発酵」とは何か？",
    choices: [
      "蒸留と発酵を同時に行うこと",
      "糖化とアルコール発酵が同時に進むこと",
      "赤色酵母と白色酵母を同時に使うこと",
      "仕込みと搾りを並行して行うこと"
    ],
    answer: 1,
    explanation: "日本酒は麹による糖化と酵母によるアルコール発酵が同じタンク内で同時に進行します。これを「並行複発酵」といい、世界的にも珍しい醸造法です。",
    textbookSection: "brewing-fermentation"
  },
  {
    category: "製造",
    question: "「山廃仕込み」の「山廃」とは何を廃止したことを指すか？",
    choices: ["山田錦の使用", "山卸し（やまおろし）", "山水の使用", "山間部での仕込み"],
    answer: 1,
    explanation: "「山廃」は「山卸し廃止酛」の略。生酛造りで行っていた米をすり潰す作業「山卸し」を廃止した方法です。",
    textbookSection: "brewing-moto"
  },
  {
    category: "製造",
    question: "日本酒造りにおいて「上槽（じょうそう）」とはどの工程か？",
    choices: ["蒸米を冷ます工程", "醪（もろみ）を搾る工程", "火入れをする工程", "貯蔵タンクに移す工程"],
    answer: 1,
    explanation: "上槽とは、発酵が終わった醪（もろみ）を搾って、酒と酒粕に分離する工程のことです。",
    textbookSection: "brewing-pressing"
  },
  {
    category: "製造",
    question: "「火入れ」の主な目的として正しいものはどれか？",
    choices: [
      "アルコール度数を上げるため",
      "酵素の働きを止め、殺菌するため",
      "香りを引き出すため",
      "色をつけるため"
    ],
    answer: 1,
    explanation: "火入れ（約60〜65℃の加熱）は、酒中の酵素を失活させ、火落ち菌などを殺菌して品質を安定させる目的で行います。",
    textbookSection: "brewing-pressing"
  },

  // ===== 原料 =====
  {
    category: "原料",
    question: "酒造好適米の代表品種「山田錦」の主な産地はどこか？",
    choices: ["新潟県", "兵庫県", "山形県", "長野県"],
    answer: 1,
    explanation: "山田錦は兵庫県が最大の産地で、全国生産量の約6割を占めます。特に三木市・加東市が有名です。",
    textbookSection: "ingredients-rice"
  },
  {
    category: "原料",
    question: "酒造好適米に求められる特徴として正しいものはどれか？",
    choices: [
      "粒が小さく硬いこと",
      "心白が大きく、タンパク質が少ないこと",
      "粘りが強いこと",
      "食味が良いこと"
    ],
    answer: 1,
    explanation: "酒造好適米は心白（中心の白い部分）が大きく、タンパク質や脂肪が少ないことが求められます。これにより雑味の少ないきれいな酒が造れます。",
    textbookSection: "ingredients-rice"
  },
  {
    category: "原料",
    question: "精米歩合60%とはどういう意味か？",
    choices: [
      "米の60%を削り取ったもの",
      "米の40%を削り、60%が残ったもの",
      "米の60%が水分であるもの",
      "60%の米を使用したもの"
    ],
    answer: 1,
    explanation: "精米歩合60%は、玄米の外側40%を削り取り、中心の60%を残した状態を指します。数字が小さいほど多く削っています。",
    textbookSection: "ingredients-polishing"
  },
  {
    category: "原料",
    question: "日本酒造りに使われる水で、灘の「宮水」が有名な理由は何か？",
    choices: [
      "軟水で繊細な酒が造れるから",
      "ミネラル（特にリンやカリウム）が豊富で発酵が旺盛になるから",
      "アルカリ性が強いから",
      "鉄分が多く色が付くから"
    ],
    answer: 1,
    explanation: "宮水はリン・カリウムなどのミネラルが豊富な中硬水で、酵母の発酵を促進します。また鉄分が少ないため酒が着色しにくい利点もあります。",
    textbookSection: "ingredients-water"
  },
  {
    category: "原料",
    question: "「五百万石」が主に栽培されている地域はどこか？",
    choices: ["兵庫県", "新潟県", "岡山県", "広島県"],
    answer: 1,
    explanation: "五百万石は新潟県で誕生した酒造好適米で、主に新潟をはじめ北陸地方で多く栽培されています。すっきりとした淡麗な酒質になるのが特徴です。",
    textbookSection: "ingredients-rice"
  },

  // ===== 味わい・香り =====
  {
    category: "味わい・香り",
    question: "日本酒の「日本酒度」がプラスの値の場合、一般的にどのような味わいか？",
    choices: ["甘口", "辛口", "酸味が強い", "苦い"],
    answer: 1,
    explanation: "日本酒度がプラスになるほど糖分が少なく「辛口」、マイナスになるほど糖分が多く「甘口」とされます。ただし実際の味わいは酸度なども影響します。",
    textbookSection: "taste-indicators"
  },
  {
    category: "味わい・香り",
    question: "吟醸酒に特有の華やかな香りを何と呼ぶか？",
    choices: ["熟成香", "吟醸香", "老ね香", "麹香"],
    answer: 1,
    explanation: "吟醸酒特有のフルーティーで華やかな香りを「吟醸香」といいます。主成分はカプロン酸エチルや酢酸イソアミルなどのエステル類です。",
    textbookSection: "taste-aroma"
  },
  {
    category: "味わい・香り",
    question: "日本酒の4タイプ分類で「薫酒（くんしゅ）」に該当するのはどれか？",
    choices: ["純米酒", "大吟醸酒", "本醸造酒", "古酒"],
    answer: 1,
    explanation: "薫酒は香りが高く軽快なタイプで、大吟醸酒や吟醸酒が該当します。4タイプは薫酒・爽酒・醇酒・熟酒に分類されます。",
    textbookSection: "taste-4types"
  },
  {
    category: "味わい・香り",
    question: "「酸度」が高い日本酒は、一般的にどのような味わいの印象になるか？",
    choices: ["甘くまろやか", "辛くキレがある", "薄くさっぱり", "渋くて苦い"],
    answer: 1,
    explanation: "酸度が高いと味に締まりが出て辛く感じます。逆に酸度が低いと甘く淡い印象になります。同じ日本酒度でも酸度によって味わいの印象は大きく変わります。",
    textbookSection: "taste-indicators"
  },
  {
    category: "味わい・香り",
    question: "日本酒の4タイプ分類で「熟酒（じゅくしゅ）」の特徴として正しいものはどれか？",
    choices: [
      "フルーティーで軽快",
      "すっきりとして淡麗",
      "濃厚で複雑な香味、黄金〜琥珀色",
      "米の旨味が豊かでコクがある"
    ],
    answer: 2,
    explanation: "熟酒は長期熟成酒や古酒が該当し、濃厚で複雑な香味を持ちます。色も黄金色〜琥珀色になり、スパイスやドライフルーツのような熟成香が特徴です。",
    textbookSection: "taste-4types"
  },

  // ===== 雑学・サービス =====
  {
    category: "雑学",
    question: "特定名称酒の分類で「純米大吟醸酒」の精米歩合の条件は？",
    choices: ["70%以下", "60%以下", "50%以下", "40%以下"],
    answer: 2,
    explanation: "純米大吟醸酒は精米歩合50%以下で、醸造アルコールを添加せず米と米麹のみで造った酒です。",
    textbookSection: "trivia-classification"
  },
  {
    category: "雑学",
    question: "日本酒のラベルに「生酒」と表示するための条件は？",
    choices: [
      "火入れを1回だけ行った酒",
      "一切火入れをしていない酒",
      "冷蔵保存した酒",
      "搾りたての酒"
    ],
    answer: 1,
    explanation: "「生酒」は製造工程で一切火入れ（加熱処理）を行っていない酒のことです。フレッシュな味わいが特徴ですが、要冷蔵で品質管理が重要です。",
    textbookSection: "trivia-classification"
  },
  {
    category: "雑学",
    question: "日本酒の「ひやおろし」とはどのような酒か？",
    choices: [
      "冷やして飲む酒",
      "春に搾って一度火入れし、秋まで熟成させてから出荷する酒",
      "常温で一年以上熟成させた酒",
      "氷を入れて飲む酒"
    ],
    answer: 1,
    explanation: "ひやおろしは春に一度火入れした後、夏を越して秋に出荷される酒です。2回目の火入れをしない「生詰め」の状態で、まろやかな味わいが特徴です。",
    textbookSection: "trivia-seasonal"
  },
  {
    category: "雑学",
    question: "日本酒を温めて飲む「燗酒」で、約50℃のものを何と呼ぶか？",
    choices: ["ぬる燗", "上燗", "熱燗", "飛び切り燗"],
    answer: 2,
    explanation: "燗酒の温度帯は、日向燗（30℃）→人肌燗（35℃）→ぬる燗（40℃）→上燗（45℃）→熱燗（50℃）→飛び切り燗（55℃以上）と分類されます。",
    textbookSection: "trivia-serving"
  },
  {
    category: "雑学",
    question: "「特定名称酒」に該当しないものはどれか？",
    choices: ["純米酒", "本醸造酒", "普通酒", "吟醸酒"],
    answer: 2,
    explanation: "特定名称酒は、本醸造酒・特別本醸造酒・純米酒・特別純米酒・吟醸酒・純米吟醸酒・大吟醸酒・純米大吟醸酒の8種類です。普通酒はこれに含まれません。",
    textbookSection: "trivia-classification"
  }
];
