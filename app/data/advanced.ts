import type { Lesson } from "../types";

export const ADVANCED: Lesson[] = [
  // ============================================================
  // JLPT N2 Grammar — Lessons 1–4
  // ============================================================
  {
    id: "adv-1",
    lesson: 1,
    title: "N2 Grammar I — Parallel Change",
    jp: "N2文法I — 並行変化",
    category: "JLPT N2",
    xp: 200,
    coins: 50,
    vocab: [
      { j: "ともなう", r: "伴う", e: "to accompany; to go along with" },
      { j: "へんか", r: "変化", e: "change; transformation" },
      { j: "じんこう", r: "人口", e: "population" },
      { j: "けいざい", r: "経済", e: "economy" },
      { j: "しんぽ", r: "進歩", e: "progress; advancement" },
      { j: "こうれいか", r: "高齢化", e: "aging (of population)" },
      { j: "おんだんか", r: "温暖化", e: "global warming" },
      { j: "ぞうか", r: "増加", e: "increase" },
      { j: "げんしょう", r: "減少", e: "decrease; decline" },
      { j: "えいきょう", r: "影響", e: "influence; impact" },
    ],
    grammar: [
      {
        pattern: "〜に伴って / 〜に伴い",
        explanation:
          "As X happens, Y happens simultaneously. Used for proportional or accompanying changes.",
        examples: [
          {
            japanese: "人口の増加に伴って、住宅問題が深刻化した。",
            english: "Along with the population increase, the housing problem became serious.",
          },
          {
            japanese: "経済の発展に伴い、環境問題も増えてきた。",
            english: "Accompanying economic development, environmental problems have also increased.",
          },
        ],
      },
      {
        pattern: "〜につれて",
        explanation:
          "As X changes, Y changes proportionally. Emphasizes gradual, proportional change.",
        examples: [
          {
            japanese: "年を取るにつれて、体力が衰えてくる。",
            english: "As you age, your physical strength declines.",
          },
          {
            japanese: "日本語を勉強するにつれて、日本文化への理解も深まった。",
            english: "As I studied Japanese, my understanding of Japanese culture also deepened.",
          },
        ],
      },
      {
        pattern: "〜にしたがって",
        explanation:
          "As X progresses, Y follows. Similar to につれて but often used with more concrete or measurable changes.",
        examples: [
          {
            japanese: "高度が上がるにしたがって、気温が下がる。",
            english: "As altitude rises, the temperature drops.",
          },
          {
            japanese: "技術の進歩にしたがって、生活が便利になった。",
            english: "As technology advances, life has become more convenient.",
          },
        ],
      },
      {
        pattern: "〜とともに",
        explanation:
          "Together with X / At the same time as X. Can express simultaneous change or 'together with (someone/something).'",
        examples: [
          {
            japanese: "時代の変化とともに、人々の価値観も変わった。",
            english: "Along with the changes of the era, people's values also changed.",
          },
          {
            japanese: "春の訪れとともに、桜が咲き始めた。",
            english: "Together with the arrival of spring, the cherry blossoms began to bloom.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "最近、温暖化に伴って異常気象が増えていますね。", tr: "Recently, abnormal weather has been increasing along with global warming." },
      { jp: "ええ、気温が上がるにつれて、台風も強くなっているそうです。", tr: "Yes, I hear typhoons are getting stronger as temperatures rise." },
      { jp: "技術の進歩にしたがって、予測精度は上がっていますけどね。", tr: "Prediction accuracy is improving as technology progresses, though." },
      { jp: "それとともに、防災意識も高まってきました。", tr: "Along with that, disaster prevention awareness has also increased." },
      { jp: "社会全体で取り組む必要がありますね。", tr: "It's necessary for society as a whole to work on this." },
    ],
    tips: [
      "に伴って is often used in formal writing and news reports.",
      "につれて and にしたがって are largely interchangeable, but にしたがって can also mean 'in accordance with (rules).'",
      "とともに has a literary feel and is common in written Japanese.",
      "All four patterns connect to verb dictionary form or noun + の/particle.",
    ],
    quiz: [
      {
        q: "経済が発展する___、環境問題も増えた。",
        opts: ["に伴って", "ばかりに", "としたら", "にしても"],
        a: 0,
      },
      {
        q: "年を取る___、物忘れが多くなる。",
        opts: ["ことなく", "につれて", "ぬきで", "にもとづいて"],
        a: 1,
      },
      {
        q: "時代の変化___、新しい職業が生まれた。",
        opts: ["とともに", "ものなら", "だけあって", "にかけては"],
        a: 0,
      },
      {
        q: "高度が上がる___、空気が薄くなる。",
        opts: ["かぎり", "からして", "にしたがって", "に関して"],
        a: 2,
      },
    ],
  },

  {
    id: "adv-2",
    lesson: 2,
    title: "N2 Grammar II — Regardless Of",
    jp: "N2文法II — 〜を問わず",
    category: "JLPT N2",
    xp: 210,
    coins: 52,
    vocab: [
      { j: "せいべつ", r: "性別", e: "gender; sex" },
      { j: "ねんれい", r: "年齢", e: "age" },
      { j: "けいけん", r: "経験", e: "experience" },
      { j: "てんこう", r: "天候", e: "weather conditions" },
      { j: "こくせき", r: "国籍", e: "nationality" },
      { j: "じょうけん", r: "条件", e: "conditions; terms" },
      { j: "けっか", r: "結果", e: "result; outcome" },
      { j: "しかく", r: "資格", e: "qualification; certification" },
      { j: "ゆうむ", r: "有無", e: "presence or absence; whether or not" },
      { j: "おうぼ", r: "応募", e: "application; entry" },
    ],
    grammar: [
      {
        pattern: "〜を問わず / 〜は問わず",
        explanation:
          "Regardless of X. Used to state that something applies irrespective of the given factor. Common in formal announcements.",
        examples: [
          {
            japanese: "性別を問わず、どなたでも応募できます。",
            english: "Regardless of gender, anyone can apply.",
          },
          {
            japanese: "経験の有無を問わず歓迎します。",
            english: "We welcome you regardless of whether you have experience.",
          },
        ],
      },
      {
        pattern: "〜にかかわらず / 〜に関わらず",
        explanation:
          "Regardless of X / Irrespective of X. Broader usage than を問わず; works with verbs and adjectives too.",
        examples: [
          {
            japanese: "天候にかかわらず、試合は行われます。",
            english: "The match will be held regardless of the weather.",
          },
          {
            japanese: "賛成するかしないかにかかわらず、決定は変わりません。",
            english: "Regardless of whether you agree or not, the decision won't change.",
          },
        ],
      },
      {
        pattern: "〜いかんによらず / 〜いかんにかかわらず",
        explanation:
          "Regardless of how X turns out. Very formal; いかん (如何) means 'how / in what way.' Often in legal or official contexts.",
        examples: [
          {
            japanese: "結果のいかんによらず、責任を取ります。",
            english: "I will take responsibility regardless of the outcome.",
          },
          {
            japanese: "理由のいかんにかかわらず、遅刻は認められません。",
            english: "Tardiness is not permitted regardless of the reason.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "この求人は経験を問わず応募できるそうですよ。", tr: "I heard anyone can apply for this job regardless of experience." },
      { jp: "年齢にかかわらず大丈夫なんですか？", tr: "Is it OK regardless of age?" },
      { jp: "ええ、国籍も問いません。", tr: "Yes, they don't ask about nationality either." },
      { jp: "結果のいかんによらず、挑戦してみる価値はありますね。", tr: "Regardless of the outcome, it's worth trying." },
      { jp: "条件がいいので、応募してみましょう。", tr: "The conditions are good, so let's apply." },
    ],
    tips: [
      "を問わず is most natural with nouns that represent categories: 性別、年齢、国籍、経験.",
      "にかかわらず is the most versatile — it works with nouns, verbs (plain form), and paired alternatives (〜か〜ないかにかかわらず).",
      "いかんによらず is highly formal and mostly seen in written documents, contracts, and speeches.",
      "All three are interchangeable in many contexts, but formality differs.",
    ],
    quiz: [
      {
        q: "性別___、どなたでも参加できます。",
        opts: ["を問わず", "をもとに", "にそって", "にわたって"],
        a: 0,
      },
      {
        q: "天候___、イベントは開催されます。",
        opts: ["をこめて", "にかかわらず", "にともなって", "をきっかけに"],
        a: 1,
      },
      {
        q: "理由の___にかかわらず、欠席は欠席です。",
        opts: ["もと", "うえ", "いかん", "こと"],
        a: 2,
      },
      {
        q: "「いかんによらず」はどんな場面で使いますか？",
        opts: ["カジュアルな会話", "フォーマルな文書", "友達とのチャット", "子供向けの本"],
        a: 1,
      },
    ],
  },

  {
    id: "adv-3",
    lesson: 3,
    title: "N2 Grammar III — Action States",
    jp: "N2文法III — 動作の状態",
    category: "JLPT N2",
    xp: 220,
    coins: 54,
    vocab: [
      { j: "つけっぱなし", r: "つけっ放し", e: "leaving on (lights, TV, etc.)" },
      { j: "あけっぱなし", r: "開けっ放し", e: "leaving open" },
      { j: "いいっぱなし", r: "言いっ放し", e: "saying and leaving it at that" },
      { j: "よみかけ", r: "読みかけ", e: "half-read; partway through reading" },
      { j: "たべかけ", r: "食べかけ", e: "half-eaten" },
      { j: "ふたりきり", r: "二人きり", e: "just the two (of us/them)" },
      { j: "いっかいきり", r: "一回きり", e: "only once" },
      { j: "だらしない", r: "だらしない", e: "sloppy; untidy" },
      { j: "しまつ", r: "始末", e: "management; disposal; settlement" },
      { j: "ちゅうと", r: "中途", e: "midway; halfway" },
    ],
    grammar: [
      {
        pattern: "〜っぱなし",
        explanation:
          "Left in a state of (doing). Attached to verb masu-stem. Usually implies carelessness or negligence.",
        examples: [
          {
            japanese: "電気をつけっぱなしで寝てしまった。",
            english: "I fell asleep leaving the lights on.",
          },
          {
            japanese: "ドアを開けっぱなしにしないでください。",
            english: "Please don't leave the door open.",
          },
        ],
      },
      {
        pattern: "〜きり / 〜っきり",
        explanation:
          "Only; just; since (and nothing more). Indicates a limited state that continues, or 'only that amount.'",
        examples: [
          {
            japanese: "彼は出かけたきり、帰ってこなかった。",
            english: "He went out and never came back.",
          },
          {
            japanese: "あの人とは一度会ったきりです。",
            english: "I've only met that person once.",
          },
        ],
      },
      {
        pattern: "〜かけ / 〜かけの / 〜かける",
        explanation:
          "Half-done; in the middle of. Attached to verb masu-stem. Indicates an action that was started but not completed.",
        examples: [
          {
            japanese: "読みかけの本がテーブルの上にある。",
            english: "There's a half-read book on the table.",
          },
          {
            japanese: "食べかけのりんごを捨てないで。",
            english: "Don't throw away the half-eaten apple.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "またエアコンをつけっぱなしにしてる！", tr: "You left the air conditioner on again!" },
      { jp: "ごめん、読みかけの本に夢中になってて…", tr: "Sorry, I was absorbed in a book I was in the middle of reading..." },
      { jp: "言いっぱなしで片付けないのはだらしないよ。", tr: "It's sloppy to just say things and not follow through." },
      { jp: "あの映画、一回きりしか見てないのにセリフを覚えてるの？", tr: "You only saw that movie once and you remember the lines?" },
      { jp: "うん、二人きりで見たから印象に残ってるんだ。", tr: "Yeah, it left an impression because we watched it just the two of us." },
    ],
    tips: [
      "っぱなし always carries a negative nuance — something that should have been dealt with.",
      "きり can follow た-form verbs (行ったきり) or quantities (一度きり).",
      "かけ can be used as a noun modifier (食べかけのパン) or as a verb (死にかける = nearly die).",
      "These patterns are extremely common in daily conversation and JLPT N2 reading passages.",
      "Don't confuse 〜かける (half-done) with 〜かける (to be about to / almost): 倒れかける = nearly collapse.",
    ],
    quiz: [
      {
        q: "テレビをつけ___で外出しないでください。",
        opts: ["っぱなし", "きり", "かけ", "がち"],
        a: 0,
      },
      {
        q: "彼女は出て行った___、連絡がない。",
        opts: ["っぱなし", "きり", "かけ", "だらけ"],
        a: 1,
      },
      {
        q: "食べ___のケーキは冷蔵庫に入れて。",
        opts: ["っぱなし", "きり", "かけ", "ぬき"],
        a: 2,
      },
      {
        q: "「っぱなし」のニュアンスはどれですか？",
        opts: ["肯定的", "否定的・だらしない", "中立的", "丁寧"],
        a: 1,
      },
    ],
  },

  {
    id: "adv-4",
    lesson: 4,
    title: "N2 Grammar IV — Reason & Basis",
    jp: "N2文法IV — 理由・根拠",
    category: "JLPT N2",
    xp: 230,
    coins: 56,
    vocab: [
      { j: "やくそく", r: "約束", e: "promise; appointment" },
      { j: "せきにん", r: "責任", e: "responsibility" },
      { j: "しかたない", r: "仕方ない", e: "can't be helped" },
      { j: "いいわけ", r: "言い訳", e: "excuse" },
      { j: "けってい", r: "決定", e: "decision" },
      { j: "じじょう", r: "事情", e: "circumstances" },
      { j: "かくご", r: "覚悟", e: "preparedness; resolve" },
      { j: "しゅちょう", r: "主張", e: "assertion; claim" },
      { j: "こんきょ", r: "根拠", e: "basis; grounds" },
      { j: "つらぬく", r: "貫く", e: "to carry through; to persist" },
    ],
    grammar: [
      {
        pattern: "〜ものだから / 〜もので",
        explanation:
          "Because (excuse/justification). Gives a reason with a nuance of excuse or personal justification. Slightly informal.",
        examples: [
          {
            japanese: "電車が遅れたものだから、遅刻してしまいました。",
            english: "Because the train was delayed, I ended up being late.",
          },
          {
            japanese: "急いでいたものだから、財布を忘れてしまった。",
            english: "Because I was in a hurry, I forgot my wallet.",
          },
        ],
      },
      {
        pattern: "〜ことだし",
        explanation:
          "Since / Given that. Presents a reason as a mild justification for a suggestion or decision. Conversational.",
        examples: [
          {
            japanese: "天気もいいことだし、散歩にでも行こうか。",
            english: "Since the weather is nice, shall we go for a walk or something?",
          },
          {
            japanese: "せっかくの休みのことだし、旅行に行きませんか。",
            english: "Since it's a rare day off, why don't we go on a trip?",
          },
        ],
      },
      {
        pattern: "〜以上（は）",
        explanation:
          "Now that / Since (with determination). Implies that because X is the case, Y naturally follows as a duty or obligation.",
        examples: [
          {
            japanese: "約束した以上は、守らなければならない。",
            english: "Now that you've made a promise, you must keep it.",
          },
          {
            japanese: "引き受けた以上、最後までやり遂げます。",
            english: "Since I've taken it on, I'll see it through to the end.",
          },
        ],
      },
      {
        pattern: "〜からには",
        explanation:
          "Now that / Since (strong resolve). Very similar to 以上は but slightly stronger emotional commitment.",
        examples: [
          {
            japanese: "日本に来たからには、日本語をマスターしたい。",
            english: "Now that I've come to Japan, I want to master Japanese.",
          },
          {
            japanese: "やるからには、全力を尽くすべきだ。",
            english: "Since you're going to do it, you should give it your all.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "すみません、道が混んでいたものですから遅くなりました。", tr: "Sorry, I'm late because the roads were congested." },
      { jp: "事情は分かりました。せっかく集まったことだし、始めましょう。", tr: "I understand the circumstances. Since we've gathered, let's begin." },
      { jp: "プロジェクトを引き受けた以上は、全力で取り組みます。", tr: "Now that I've taken on the project, I'll tackle it with all my effort." },
      { jp: "やるからには、中途半端にはしたくないですね。", tr: "Since we're doing it, we don't want to do it halfway." },
      { jp: "その覚悟があれば、きっとうまくいきますよ。", tr: "With that resolve, I'm sure it will go well." },
    ],
    tips: [
      "ものだから is often used as a soft excuse — be careful not to overuse it or it sounds like you're always making excuses.",
      "ことだし is conversational and friendly; avoid it in formal writing.",
      "以上（は） and からには both express resolve, but からには tends to feel more emotionally committed.",
      "For JLPT: ものだから, 以上は, and からには appear very frequently in N2 reading comprehension.",
    ],
    quiz: [
      {
        q: "急いでいた___、鍵をかけるのを忘れた。",
        opts: ["ものだから", "以上は", "からには", "ことだし"],
        a: 0,
      },
      {
        q: "天気もいい___、ピクニックに行こう。",
        opts: ["ものだから", "以上は", "からには", "ことだし"],
        a: 3,
      },
      {
        q: "約束した___、必ず守ります。",
        opts: ["ものだから", "以上は", "ことだし", "っぱなし"],
        a: 1,
      },
      {
        q: "日本に来た___、日本文化を学びたい。",
        opts: ["ことだし", "ものだから", "からには", "を問わず"],
        a: 2,
      },
    ],
  },

  // ============================================================
  // JLPT N1 Grammar — Lessons 5–8
  // ============================================================
  {
    id: "adv-5",
    lesson: 5,
    title: "N1 Grammar I — Defiance & Disregard",
    jp: "N1文法I — 無視・反抗",
    category: "JLPT N1",
    xp: 250,
    coins: 58,
    vocab: [
      { j: "こんなん", r: "困難", e: "difficulty; hardship" },
      { j: "はんたい", r: "反対", e: "opposition" },
      { j: "しゅうい", r: "周囲", e: "surroundings; people around" },
      { j: "しんぱい", r: "心配", e: "worry; concern" },
      { j: "たちば", r: "立場", e: "position; standpoint" },
      { j: "たちむかう", r: "立ち向かう", e: "to confront; to stand up to" },
      { j: "かいちょう", r: "会長", e: "president (of a society)" },
      { j: "きぎょうか", r: "起業家", e: "entrepreneur" },
      { j: "ぎせい", r: "犠牲", e: "sacrifice" },
      { j: "ゆうかん", r: "勇敢", e: "brave; courageous" },
    ],
    grammar: [
      {
        pattern: "〜をものともせず（に）",
        explanation:
          "Without being daunted by; in defiance of. Used to praise someone who overcomes hardship bravely. Literary/written.",
        examples: [
          {
            japanese: "彼女はけがをものともせず、試合に出場した。",
            english: "Undaunted by her injury, she competed in the match.",
          },
          {
            japanese: "困難をものともせずに、夢を追い続けた。",
            english: "Without being daunted by difficulties, she kept pursuing her dream.",
          },
        ],
      },
      {
        pattern: "〜をよそに",
        explanation:
          "Ignoring; paying no heed to. The subject disregards others' feelings or circumstances. Often carries a critical tone.",
        examples: [
          {
            japanese: "親の心配をよそに、息子は海外へ旅立った。",
            english: "Ignoring his parents' worries, the son set off overseas.",
          },
          {
            japanese: "周囲の反対をよそに、彼は起業した。",
            english: "Paying no heed to those around him who opposed it, he started a business.",
          },
        ],
      },
      {
        pattern: "〜ともなると / 〜ともなれば",
        explanation:
          "When it comes to (a high level/important situation). Implies that at a certain level, things are naturally different.",
        examples: [
          {
            japanese: "社長ともなると、責任も大きくなる。",
            english: "When you're the company president, responsibilities become great.",
          },
          {
            japanese: "大学院生ともなれば、自分で研究を進められるはずだ。",
            english: "Once you're a graduate student, you should be able to conduct research on your own.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "田中選手はけがをものともせず、見事に優勝しましたね。", tr: "Tanaka won splendidly, undaunted by the injury." },
      { jp: "周囲の心配をよそに、復帰戦に臨んだそうです。", tr: "I heard he entered the comeback match, ignoring everyone's concerns." },
      { jp: "プロともなると、精神力が違いますね。", tr: "When it comes to being a professional, the mental strength is different." },
      { jp: "勇敢ですよね。普通なら諦めてしまいます。", tr: "He's brave. Normally you'd give up." },
      { jp: "犠牲を払ってでも挑戦する姿勢は尊敬に値します。", tr: "The attitude of challenging oneself even at personal cost is worthy of respect." },
    ],
    tips: [
      "をものともせず is always used positively — to praise someone's courage or determination.",
      "をよそに often has a slightly negative or critical nuance toward the subject's disregard.",
      "ともなると implies 'at such a level, it's only natural that...' — used about positions, stages, or age.",
      "All three are characteristic of written/formal Japanese and commonly tested at N1.",
    ],
    quiz: [
      {
        q: "困難___、彼は挑戦し続けた。",
        opts: ["をものともせず", "をよそに", "ともなると", "にひきかえ"],
        a: 0,
      },
      {
        q: "親の反対___、彼女は留学した。",
        opts: ["をものともせず", "をよそに", "ともなると", "ならでは"],
        a: 1,
      },
      {
        q: "部長___、部下の管理も大変だ。",
        opts: ["をものともせず", "をよそに", "ともなると", "たりとも"],
        a: 2,
      },
      {
        q: "「をものともせず」のニュアンスはどれ？",
        opts: ["批判的", "称賛的", "中立的", "皮肉"],
        a: 1,
      },
    ],
  },

  {
    id: "adv-6",
    lesson: 6,
    title: "N1 Grammar II — Emphasis & Contrast",
    jp: "N1文法II — 強調・対比",
    category: "JLPT N1",
    xp: 260,
    coins: 60,
    vocab: [
      { j: "いっしゅん", r: "一瞬", e: "an instant; a moment" },
      { j: "ゆだん", r: "油断", e: "negligence; carelessness" },
      { j: "どくじ", r: "独自", e: "original; unique" },
      { j: "でんとう", r: "伝統", e: "tradition" },
      { j: "かつやく", r: "活躍", e: "active role; great efforts" },
      { j: "きょうだい", r: "兄弟", e: "siblings; brothers" },
      { j: "あに", r: "兄", e: "older brother" },
      { j: "おとうと", r: "弟", e: "younger brother" },
      { j: "まじめ", r: "真面目", e: "serious; diligent" },
      { j: "きょうち", r: "境地", e: "state; level (of mastery)" },
    ],
    grammar: [
      {
        pattern: "〜たりとも〜ない",
        explanation:
          "Not even (one). Strong emphatic negation. Often with 一秒、一瞬、一歩 etc.",
        examples: [
          {
            japanese: "一瞬たりとも油断してはいけない。",
            english: "You must not let your guard down even for an instant.",
          },
          {
            japanese: "一円たりとも無駄にしたくない。",
            english: "I don't want to waste even a single yen.",
          },
        ],
      },
      {
        pattern: "〜にひきかえ",
        explanation:
          "In contrast to; compared with (negative comparison). Highlights a stark difference between two things.",
        examples: [
          {
            japanese: "兄の真面目さにひきかえ、弟は遊んでばかりいる。",
            english: "In contrast to the older brother's diligence, the younger brother does nothing but play.",
          },
          {
            japanese: "去年の好成績にひきかえ、今年は散々だった。",
            english: "In contrast to last year's good results, this year was terrible.",
          },
        ],
      },
      {
        pattern: "〜ならでは（の）",
        explanation:
          "Unique to; only possible with/at. Used to praise something that is special to a particular person, place, or thing.",
        examples: [
          {
            japanese: "京都ならではの美しい景色を楽しんだ。",
            english: "I enjoyed the beautiful scenery unique to Kyoto.",
          },
          {
            japanese: "ベテランならではの技術が光っていた。",
            english: "The skill unique to a veteran really shone through.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "この大会は一秒たりとも気を抜けませんね。", tr: "You can't let up even for a second in this tournament." },
      { jp: "去年の楽勝にひきかえ、今年は強豪ぞろいです。", tr: "In contrast to last year's easy win, this year is packed with strong competitors." },
      { jp: "この独自の戦術はうちのチームならではですね。", tr: "This unique strategy is something only our team can do." },
      { jp: "伝統を守りつつ、新しいことに挑戦する。それがならではの強みです。", tr: "Preserving tradition while taking on new challenges. That's a unique strength." },
    ],
    tips: [
      "たりとも always pairs with a negative form. The counter + たりとも pattern is fixed (一秒たりとも、一歩たりとも).",
      "にひきかえ often carries disappointment or criticism toward the second item being compared.",
      "ならでは is always positive — it praises uniqueness. It can modify nouns with の (京都ならではの風景).",
      "These are high-frequency N1 grammar points in reading passages.",
    ],
    quiz: [
      {
        q: "一瞬___油断は許されない。",
        opts: ["たりとも", "ならでは", "にひきかえ", "をよそに"],
        a: 0,
      },
      {
        q: "兄の成功___、弟はまだ就職が決まらない。",
        opts: ["たりとも", "ならでは", "にひきかえ", "をものともせず"],
        a: 2,
      },
      {
        q: "この味は母___の味だ。",
        opts: ["たりとも", "ならでは", "にひきかえ", "ともなると"],
        a: 1,
      },
      {
        q: "「ならでは」はどんなニュアンス？",
        opts: ["否定的", "批判的", "称賛的", "中立的"],
        a: 2,
      },
    ],
  },

  {
    id: "adv-7",
    lesson: 7,
    title: "N1 Grammar III — Inevitability",
    jp: "N1文法III — 不可避",
    category: "JLPT N1",
    xp: 280,
    coins: 65,
    vocab: [
      { j: "かんどう", r: "感動", e: "being moved; emotion" },
      { j: "しゃざい", r: "謝罪", e: "apology" },
      { j: "ばいしょう", r: "賠償", e: "compensation; reparation" },
      { j: "ふんがい", r: "憤慨", e: "indignation; outrage" },
      { j: "へいわ", r: "平和", e: "peace" },
      { j: "はんえい", r: "繁栄", e: "prosperity" },
      { j: "ねがう", r: "願う", e: "to wish; to hope" },
      { j: "ひがい", r: "被害", e: "damage; harm" },
      { j: "ふせぐ", r: "防ぐ", e: "to prevent; to defend" },
      { j: "さける", r: "避ける", e: "to avoid" },
    ],
    grammar: [
      {
        pattern: "〜ずにはおかない / 〜ないではおかない",
        explanation:
          "Cannot help but; will inevitably cause. Something is so powerful that it inevitably produces a result or emotion.",
        examples: [
          {
            japanese: "あの映画は観る者を感動させずにはおかない。",
            english: "That movie cannot help but move anyone who watches it.",
          },
          {
            japanese: "彼の演説は聴衆を奮い立たせずにはおかなかった。",
            english: "His speech could not help but rouse the audience.",
          },
        ],
      },
      {
        pattern: "〜ないではすまない / 〜ずにはすまない",
        explanation:
          "Cannot get away without doing; must do (social/moral obligation). Implies that not doing something would be unacceptable.",
        examples: [
          {
            japanese: "これだけの被害を出した以上、謝罪しないではすまないだろう。",
            english: "Having caused this much damage, they can't get away without apologizing.",
          },
          {
            japanese: "約束を破ったのだから、説明せずにはすまない。",
            english: "Since you broke your promise, you can't avoid explaining yourself.",
          },
        ],
      },
      {
        pattern: "〜てやまない",
        explanation:
          "Sincerely; from the bottom of one's heart (wishing/hoping). Very formal and literary. Used with 願う、祈る、愛する、尊敬する etc.",
        examples: [
          {
            japanese: "世界の平和を願ってやまない。",
            english: "I sincerely wish for world peace.",
          },
          {
            japanese: "皆様のご活躍を祈ってやまません。",
            english: "I sincerely pray for everyone's success.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "あのドキュメンタリーは視聴者を考えさせずにはおかない作品でした。", tr: "That documentary was a work that inevitably made viewers think." },
      { jp: "確かに。あれだけの問題を無視しては済まないですよね。", tr: "Indeed. With problems like that, you can't just ignore them." },
      { jp: "制作者は社会の改善を願ってやまないのでしょう。", tr: "The producers must sincerely wish for the improvement of society." },
      { jp: "被害を受けた方々への賠償も避けては済まないでしょう。", tr: "Compensation for those who were harmed can't be avoided either." },
      { jp: "平和と繁栄を祈ってやみません。", tr: "I sincerely pray for peace and prosperity." },
    ],
    tips: [
      "ずにはおかない describes an irresistible force or outcome — often with emotions (感動させる、考えさせる).",
      "ないではすまない is about social/moral inevitability — 'you can't get away without doing it.'",
      "てやまない is highly formal and literary; common in speeches, formal letters, and ceremony contexts.",
      "The negative stem ず comes from classical Japanese: する→せず, 食べる→食べず, 行く→行かず.",
    ],
    quiz: [
      {
        q: "あの映画は人を感動させ___。",
        opts: ["ずにはおかない", "ないではすまない", "てやまない", "からには"],
        a: 0,
      },
      {
        q: "これだけ迷惑をかけたら、謝ら___。",
        opts: ["ずにはおかない", "ないではすまない", "てやまない", "ものだから"],
        a: 1,
      },
      {
        q: "皆様の健康を祈っ___。",
        opts: ["ずにはおかない", "ないではすまない", "てやまない", "以上は"],
        a: 2,
      },
      {
        q: "「てやまない」はどんな場面で使う？",
        opts: ["カジュアルな会話", "フォーマルなスピーチ・手紙", "友達とのチャット", "SNS"],
        a: 1,
      },
    ],
  },

  {
    id: "adv-8",
    lesson: 8,
    title: "N1 Grammar IV — Literary & Formal",
    jp: "N1文法IV — 文語・格式",
    category: "JLPT N1",
    xp: 300,
    coins: 68,
    vocab: [
      { j: "ゆえ", r: "故", e: "reason; cause (literary)" },
      { j: "こうけん", r: "貢献", e: "contribution" },
      { j: "ひはん", r: "批判", e: "criticism" },
      { j: "しんねん", r: "信念", e: "conviction; belief" },
      { j: "こうげん", r: "公言", e: "public declaration" },
      { j: "ゆうしゅう", r: "優秀", e: "excellent; outstanding" },
      { j: "けってん", r: "欠点", e: "flaw; shortcoming" },
      { j: "かち", r: "価値", e: "value; worth" },
      { j: "だんげん", r: "断言", e: "assertion; declaration" },
      { j: "たいど", r: "態度", e: "attitude; manner" },
    ],
    grammar: [
      {
        pattern: "〜ゆえ（に）/ 〜がゆえ（に）",
        explanation:
          "Because of; due to. Classical/literary form of から/ので. Found in formal writing, proverbs, and elevated speech.",
        examples: [
          {
            japanese: "若さゆえの過ちだった。",
            english: "It was a mistake due to youth.",
          },
          {
            japanese: "愛するがゆえに、厳しくしてしまう。",
            english: "Because I love (them), I end up being strict.",
          },
        ],
      },
      {
        pattern: "〜こそあれ",
        explanation:
          "There may be X, but certainly not the opposite. Concedes the existence of something while denying its negative counterpart.",
        examples: [
          {
            japanese: "彼の研究には批判こそあれ、その価値を否定する者はいない。",
            english: "There may be criticism of his research, but no one denies its value.",
          },
          {
            japanese: "欠点こそあれ、彼は信頼できる人物だ。",
            english: "He may have flaws, but he is a trustworthy person.",
          },
        ],
      },
      {
        pattern: "〜てはばからない",
        explanation:
          "To not hesitate to say/do. Used when someone boldly declares or does something without reservation. Can be positive or negative.",
        examples: [
          {
            japanese: "彼は自分が一番優秀だと言ってはばからない。",
            english: "He doesn't hesitate to say he is the most outstanding.",
          },
          {
            japanese: "この計画は必ず成功すると断言してはばからない。",
            english: "I declare without hesitation that this plan will definitely succeed.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "彼女は信念ゆえに、反対意見にも動じなかった。", tr: "Due to her convictions, she was not shaken by opposing views." },
      { jp: "困難こそあれ、このプロジェクトの意義は大きい。", tr: "There may be difficulties, but the significance of this project is great." },
      { jp: "彼は自分の理論が正しいと公言してはばからない。", tr: "He doesn't hesitate to publicly declare that his theory is correct." },
      { jp: "その態度には批判もあるでしょうけど。", tr: "There's probably criticism of that attitude too." },
      { jp: "愛するがゆえに厳しく接するのだと思います。", tr: "I think it's because he cares that he's strict." },
    ],
    tips: [
      "ゆえ（に）is interchangeable with から/ので but far more literary. Common in essays and formal speeches.",
      "こそあれ always follows a noun. The pattern is: Noun + こそあれ + (positive continuation).",
      "てはばからない often describes bold or even arrogant declarations — context determines the tone.",
      "These patterns are essential for N1 reading comprehension, especially in opinion pieces and editorials.",
      "がゆえに can follow verbs in dictionary form: 愛するがゆえに, 求めるがゆえに.",
    ],
    quiz: [
      {
        q: "若さ___の過ちを許してほしい。",
        opts: ["ゆえ", "こそあれ", "てはばからない", "ならでは"],
        a: 0,
      },
      {
        q: "欠点___、彼は優れたリーダーだ。",
        opts: ["ゆえに", "こそあれ", "てはばからない", "をよそに"],
        a: 1,
      },
      {
        q: "彼女は自分の能力を自慢し___。",
        opts: ["ゆえ", "こそあれ", "てはばからない", "てやまない"],
        a: 2,
      },
      {
        q: "「ゆえ」はどんな文体で使われますか？",
        opts: ["口語・カジュアル", "文語・フォーマル", "方言", "若者言葉"],
        a: 1,
      },
    ],
  },

  // ============================================================
  // Business Japanese — Lessons 9–10
  // ============================================================
  {
    id: "adv-9",
    lesson: 9,
    title: "Business Meetings",
    jp: "ビジネス会議",
    category: "Business",
    xp: 310,
    coins: 70,
    vocab: [
      { j: "ぎじろく", r: "議事録", e: "meeting minutes" },
      { j: "ていあん", r: "提案", e: "proposal; suggestion" },
      { j: "ぎだい", r: "議題", e: "agenda item" },
      { j: "しりょう", r: "資料", e: "materials; documents" },
      { j: "けんとう", r: "検討", e: "examination; consideration" },
      { j: "しょうにん", r: "承認", e: "approval; authorization" },
      { j: "ほうこく", r: "報告", e: "report" },
      { j: "きょうぎ", r: "協議", e: "deliberation; consultation" },
      { j: "さいたく", r: "採択", e: "adoption (of a proposal)" },
      { j: "ぎけつ", r: "議決", e: "resolution; vote" },
    ],
    grammar: [
      {
        pattern: "ご検討ください / ご検討いただけますでしょうか",
        explanation:
          "Please consider (this). Standard polite request in business. いただけますでしょうか is the most deferential form.",
        examples: [
          {
            japanese: "この提案についてご検討ください。",
            english: "Please consider this proposal.",
          },
          {
            japanese: "予算の件、ご検討いただけますでしょうか。",
            english: "Could you please consider the matter of the budget?",
          },
        ],
      },
      {
        pattern: "〜させていただきます",
        explanation:
          "I will (humbly) do X. Humble form used when doing something with implied permission from the listener. Very common in business.",
        examples: [
          {
            japanese: "それでは、会議を始めさせていただきます。",
            english: "Well then, allow me to begin the meeting.",
          },
          {
            japanese: "資料を配布させていただきます。",
            english: "I will (humbly) distribute the materials.",
          },
        ],
      },
      {
        pattern: "〜の件につきまして",
        explanation:
          "Regarding the matter of X. Formal version of 〜について. Standard in meetings and business correspondence.",
        examples: [
          {
            japanese: "新プロジェクトの件につきまして、ご報告いたします。",
            english: "Regarding the matter of the new project, I would like to report.",
          },
          {
            japanese: "先日の議題の件につきまして、進捗をお伝えします。",
            english: "Regarding the agenda item from the other day, I'll share the progress.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "それでは、本日の会議を始めさせていただきます。", tr: "Well then, allow me to begin today's meeting." },
      { jp: "まず、前回の議事録の確認をお願いいたします。", tr: "First, I'd like to ask you to review the minutes from last time." },
      { jp: "続きまして、新規プロジェクトの件につきまして、田中が報告いたします。", tr: "Next, regarding the new project, Tanaka will report." },
      { jp: "資料をご覧いただけますでしょうか。こちらが提案書でございます。", tr: "Could you please look at the materials? This is the proposal." },
      { jp: "ご検討いただき、次回までにご意見をいただければ幸いです。", tr: "I would appreciate it if you could consider it and give your opinions by next time." },
      { jp: "他にご質問がなければ、以上で本日の会議を終了いたします。", tr: "If there are no other questions, that concludes today's meeting." },
    ],
    tips: [
      "させていただきます is sometimes overused — use it only when you genuinely need permission or humility.",
      "につきまして is the formal equivalent of について; use it in meetings and emails.",
      "議事録 (minutes) are typically kept by the most junior member at a Japanese company.",
      "In Japanese meetings, decisions are often pre-negotiated (根回し / nemawashi) before the formal meeting.",
      "いただければ幸いです is one of the most polite request forms in business Japanese.",
    ],
    quiz: [
      {
        q: "会議を始め___。",
        opts: ["させていただきます", "してあげます", "になります", "していきます"],
        a: 0,
      },
      {
        q: "新プロジェクトの件___、ご報告します。",
        opts: ["について", "につきまして", "にとって", "に関わらず"],
        a: 1,
      },
      {
        q: "会議の記録のことを何と言いますか？",
        opts: ["議題", "議事録", "資料", "報告書"],
        a: 1,
      },
      {
        q: "「ご検討いただけますでしょうか」はどんな場面で使いますか？",
        opts: ["友達への頼み事", "ビジネスでの丁寧な依頼", "家族への依頼", "独り言"],
        a: 1,
      },
    ],
  },

  {
    id: "adv-10",
    lesson: 10,
    title: "Business Emails",
    jp: "ビジネスメール",
    category: "Business",
    xp: 320,
    coins: 72,
    vocab: [
      { j: "おせわになる", r: "お世話になる", e: "to be in someone's care (set phrase)" },
      { j: "なにとぞ", r: "何卒", e: "please; kindly (very formal)" },
      { j: "きじつ", r: "期日", e: "deadline; due date" },
      { j: "てんぷ", r: "添付", e: "attachment" },
      { j: "かくにん", r: "確認", e: "confirmation; verification" },
      { j: "へんしん", r: "返信", e: "reply (email)" },
      { j: "おてすう", r: "お手数", e: "trouble; bother (polite)" },
      { j: "とりいそぎ", r: "取り急ぎ", e: "hurriedly; for the time being" },
      { j: "ごりょうしょう", r: "ご了承", e: "understanding; consent (honorific)" },
      { j: "おわび", r: "お詫び", e: "apology (polite)" },
    ],
    grammar: [
      {
        pattern: "お世話になっております",
        explanation:
          "Standard opening for business emails. Literally 'I am in your care.' Used even in first contact as a formality.",
        examples: [
          {
            japanese: "いつもお世話になっております。株式会社ABCの山田です。",
            english: "Thank you always for your support. This is Yamada from ABC Corporation.",
          },
          {
            japanese: "お世話になっております。先日はありがとうございました。",
            english: "Thank you for your continued support. Thank you for the other day.",
          },
        ],
      },
      {
        pattern: "何卒よろしくお願い致します",
        explanation:
          "Standard closing for business emails. The most formal version of よろしくお願いします. 何卒 adds earnestness.",
        examples: [
          {
            japanese: "ご多忙の折、恐れ入りますが、何卒よろしくお願い致します。",
            english: "I understand you are busy, but I humbly ask for your consideration.",
          },
          {
            japanese: "今後ともどうぞよろしくお願い致します。",
            english: "I look forward to your continued support.",
          },
        ],
      },
      {
        pattern: "お手数をおかけしますが",
        explanation:
          "I'm sorry for the trouble, but... Used before making a request. Acknowledges the burden placed on the recipient.",
        examples: [
          {
            japanese: "お手数をおかけしますが、ご確認いただけますでしょうか。",
            english: "I'm sorry for the trouble, but could you please verify this?",
          },
          {
            japanese: "お手数ですが、添付ファイルをご参照ください。",
            english: "Sorry to trouble you, but please refer to the attached file.",
          },
        ],
      },
      {
        pattern: "取り急ぎ〜まで",
        explanation:
          "Just a quick (report/note). Used for brief emails that convey information without lengthy formality.",
        examples: [
          {
            japanese: "取り急ぎ、ご報告まで。",
            english: "Just a quick report for now.",
          },
          {
            japanese: "取り急ぎ、お礼まで申し上げます。",
            english: "Just writing quickly to express my thanks.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "件名：次回打ち合わせの日程について", tr: "Subject: Regarding the schedule for the next meeting" },
      { jp: "株式会社XYZ 佐藤様　いつもお世話になっております。ABC商事の鈴木です。", tr: "Mr. Sato of XYZ Corporation, thank you always for your support. This is Suzuki from ABC Trading." },
      { jp: "次回打ち合わせの件につきまして、ご連絡いたします。", tr: "I am writing to you regarding the next meeting." },
      { jp: "添付の資料をご確認いただけますでしょうか。", tr: "Could you please check the attached materials?" },
      { jp: "お手数をおかけしますが、期日までにご返信いただければ幸いです。", tr: "I'm sorry for the trouble, but I would appreciate a reply by the deadline." },
      { jp: "何卒よろしくお願い致します。", tr: "I humbly ask for your kind consideration." },
    ],
    tips: [
      "お世話になっております is used at the start of virtually every business email in Japan.",
      "何卒 (なにとぞ) adds a level of earnestness and formality beyond just よろしくお願いします.",
      "取り急ぎ is appropriate for quick updates but should not be used for important or formal requests.",
      "Japanese business emails follow a strict structure: greeting, self-introduction, main content, closing.",
      "When replying, add Re: to the subject and start with お世話になっております or ご返信ありがとうございます.",
    ],
    quiz: [
      {
        q: "ビジネスメールの冒頭に使う定型表現は？",
        opts: ["お世話になっております", "元気ですか", "こんにちは", "やあ"],
        a: 0,
      },
      {
        q: "メールの最後に使う最もフォーマルな表現は？",
        opts: ["じゃあね", "よろしく", "何卒よろしくお願い致します", "またね"],
        a: 2,
      },
      {
        q: "「添付」の意味は？",
        opts: ["返信", "転送", "添付ファイル", "件名"],
        a: 2,
      },
      {
        q: "短い報告メールの結びに使える表現は？",
        opts: ["何卒よろしく", "取り急ぎご報告まで", "お手数ですが", "ご了承ください"],
        a: 1,
      },
    ],
  },

  // ============================================================
  // Academic Japanese — Lesson 11
  // ============================================================
  {
    id: "adv-11",
    lesson: 11,
    title: "Research & Presentations",
    jp: "研究と発表",
    category: "Academic",
    xp: 330,
    coins: 75,
    vocab: [
      { j: "ろんぶん", r: "論文", e: "thesis; academic paper" },
      { j: "はっぴょう", r: "発表", e: "presentation; announcement" },
      { j: "けんきゅう", r: "研究", e: "research" },
      { j: "かせつ", r: "仮説", e: "hypothesis" },
      { j: "けんしょう", r: "検証", e: "verification; testing" },
      { j: "こうさつ", r: "考察", e: "discussion; analysis (in a paper)" },
      { j: "けつろん", r: "結論", e: "conclusion" },
      { j: "さんこうぶんけん", r: "参考文献", e: "references; bibliography" },
      { j: "ちょうさ", r: "調査", e: "survey; investigation" },
      { j: "データ", r: "データ", e: "data" },
    ],
    grammar: [
      {
        pattern: "〜と考えられる / 〜と思われる",
        explanation:
          "It is thought/considered that... Passive form used in academic writing to present analysis objectively, avoiding the first person.",
        examples: [
          {
            japanese: "この結果から、仮説は正しいと考えられる。",
            english: "From these results, it is considered that the hypothesis is correct.",
          },
          {
            japanese: "この現象は温暖化の影響と思われる。",
            english: "This phenomenon is thought to be the effect of global warming.",
          },
        ],
      },
      {
        pattern: "〜に基づいて / 〜に基づき",
        explanation:
          "Based on X. Used to cite the foundation of an argument, analysis, or decision.",
        examples: [
          {
            japanese: "調査データに基づいて分析を行った。",
            english: "We conducted analysis based on the survey data.",
          },
          {
            japanese: "先行研究に基づき、新しい仮説を立てた。",
            english: "Based on prior research, we formulated a new hypothesis.",
          },
        ],
      },
      {
        pattern: "〜を踏まえて / 〜を踏まえた上で",
        explanation:
          "Taking into account; in light of. Used when building on previous findings or circumstances.",
        examples: [
          {
            japanese: "これまでの議論を踏まえて、結論を述べる。",
            english: "Taking into account the discussion so far, I will state the conclusion.",
          },
          {
            japanese: "調査結果を踏まえた上で、提言を行う。",
            english: "In light of the survey results, we will make recommendations.",
          },
        ],
      },
      {
        pattern: "〜ものと見られる / 〜と見なされる",
        explanation:
          "It is regarded/seen as. Objective expression for presenting interpretations in academic and journalistic writing.",
        examples: [
          {
            japanese: "この遺跡は3世紀のものと見られる。",
            english: "These ruins are regarded as dating from the 3rd century.",
          },
          {
            japanese: "この行為は違法と見なされる可能性がある。",
            english: "This act may be regarded as illegal.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "本日は「SNSが若者の言語使用に与える影響」について発表させていただきます。", tr: "Today I will present on 'The Impact of Social Media on Youth Language Use.'" },
      { jp: "先行研究に基づき、三つの仮説を立てました。", tr: "Based on prior research, I formulated three hypotheses." },
      { jp: "調査データに基づいて分析を行った結果、仮説の一つが支持されました。", tr: "As a result of analysis based on survey data, one of the hypotheses was supported." },
      { jp: "これらの結果を踏まえて、以下の結論に至りました。", tr: "Taking these results into account, I reached the following conclusion." },
      { jp: "この傾向は今後も続くものと考えられます。ご清聴ありがとうございました。", tr: "It is thought that this trend will continue in the future. Thank you for your attention." },
    ],
    tips: [
      "Academic Japanese avoids 私は〜と思う; use と考えられる or と思われる for objectivity.",
      "に基づいて and を踏まえて are both 'based on,' but を踏まえて implies more active consideration of prior work.",
      "ご清聴ありがとうございました is the standard closing phrase for academic presentations.",
      "Japanese academic papers follow: 序論 (introduction) → 方法 (method) → 結果 (results) → 考察 (discussion) → 結論 (conclusion).",
      "参考文献 (references) are listed at the end of papers, similar to Western academic conventions.",
    ],
    quiz: [
      {
        q: "学術論文で客観的に意見を述べるとき、どの表現を使いますか？",
        opts: ["私は思います", "と考えられる", "だと思うんだけど", "じゃないかな"],
        a: 1,
      },
      {
        q: "データ___分析を行った。",
        opts: ["に基づいて", "をよそに", "ならでは", "ゆえに"],
        a: 0,
      },
      {
        q: "これまでの結果___、結論を述べます。",
        opts: ["に伴って", "を踏まえて", "をものともせず", "にひきかえ"],
        a: 1,
      },
      {
        q: "発表の最後に使う定型表現は？",
        opts: ["じゃあね", "以上です。バイバイ", "ご清聴ありがとうございました", "終わり！"],
        a: 2,
      },
    ],
  },

  // ============================================================
  // Native Expressions — Lesson 12
  // ============================================================
  {
    id: "adv-12",
    lesson: 12,
    title: "Native-level Nuance",
    jp: "ネイティブの感覚",
    category: "Advanced",
    xp: 350,
    coins: 80,
    vocab: [
      { j: "いちごいちえ", r: "一期一会", e: "once-in-a-lifetime encounter (yojijukugo)" },
      { j: "しちてんはっき", r: "七転八起", e: "fall seven times, get up eight (resilience)" },
      { j: "じごうじとく", r: "自業自得", e: "reap what you sow; self-inflicted" },
      { j: "いしんでんしん", r: "以心伝心", e: "heart-to-heart communication without words" },
      { j: "ぬきんでる", r: "抜きん出る", e: "to stand out; to surpass" },
      { j: "しぶい", r: "渋い", e: "tasteful; understated cool; astringent" },
      { j: "やばい", r: "やばい", e: "amazing / terrible (slang, context-dependent)" },
      { j: "なにげに", r: "何気に", e: "casually; nonchalantly (casual speech)" },
      { j: "くうきをよむ", r: "空気を読む", e: "to read the room/atmosphere" },
      { j: "ほんね", r: "本音", e: "true feelings (vs. tatemae)" },
    ],
    grammar: [
      {
        pattern: "四字熟語 (Yojijukugo) in Context",
        explanation:
          "Four-character compounds from Chinese. They pack complex ideas into four kanji and are used in speeches, essays, and daily conversation to sound educated and expressive.",
        examples: [
          {
            japanese: "一期一会の精神で、毎日を大切にしたい。",
            english: "With the spirit of 'once-in-a-lifetime encounters,' I want to cherish every day.",
          },
          {
            japanese: "七転八起の精神で何度でも挑戦する。",
            english: "With the spirit of 'fall seven times, rise eight,' I'll try again and again.",
          },
        ],
      },
      {
        pattern: "〜っぽい (casual suffix)",
        explanation:
          "Seems like; -ish; tends to be. Casual suffix added to nouns, adjective stems, or verb stems. Very common in spoken Japanese.",
        examples: [
          {
            japanese: "最近、忘れっぽくなった。",
            english: "Lately I've become forgetful.",
          },
          {
            japanese: "あの人、怒りっぽいよね。",
            english: "That person is quick to anger, right?",
          },
        ],
      },
      {
        pattern: "空気を読む / KY (読めない)",
        explanation:
          "Reading the room — understanding unspoken social cues. KY (kuuki yomenai) is slang for someone who can't read the room.",
        examples: [
          {
            japanese: "空気を読んで、その話題は避けた。",
            english: "I read the room and avoided that topic.",
          },
          {
            japanese: "あいつ、本当にKYだよな。",
            english: "That guy really can't read the room.",
          },
        ],
      },
      {
        pattern: "本音と建前 (Honne to Tatemae)",
        explanation:
          "True feelings vs. public facade. A core Japanese cultural concept. Understanding this distinction is essential for native-level communication.",
        examples: [
          {
            japanese: "建前では賛成したが、本音では反対だった。",
            english: "Outwardly I agreed, but my true feeling was opposition.",
          },
          {
            japanese: "本音を言えば、あまり乗り気じゃない。",
            english: "To be honest, I'm not that enthusiastic.",
          },
        ],
      },
    ],
    dialogue: [
      { jp: "あの先輩、何気にすごい人だよね。", tr: "That senpai is casually impressive, you know." },
      { jp: "うん、渋いよね。抜きん出てるのに目立とうとしない。", tr: "Yeah, they're cool in an understated way. They stand out but don't try to be noticed." },
      { jp: "以心伝心っていうか、言わなくても分かる関係って憧れる。", tr: "Like 'heart-to-heart communication' — I admire relationships where you understand each other without words." },
      { jp: "でも空気読めない人には通じないけどね。", tr: "But it doesn't work with people who can't read the room." },
      { jp: "自業自得にならないように、本音と建前のバランスが大事だよ。", tr: "To avoid reaping what you sow, the balance of true feelings and public facade is important." },
    ],
    tips: [
      "四字熟語 are a sign of education and eloquence. Learning even 10-20 common ones greatly improves your Japanese.",
      "っぽい is informal — avoid it in business or academic writing. Use らしい or 的 instead.",
      "空気を読む is one of the most important cultural concepts for living in Japan.",
      "本音 and 建前 are not about dishonesty — they reflect social harmony (和 / wa) as a core value.",
      "やばい has flipped meaning among young people: it now often means 'amazing' rather than 'dangerous.'",
    ],
    quiz: [
      {
        q: "「一期一会」の意味は？",
        opts: ["毎日同じ", "一生に一度の出会い", "最初の出会い", "別れの挨拶"],
        a: 1,
      },
      {
        q: "「空気を読む」とはどういう意味？",
        opts: ["天気を調べる", "本を読む", "場の雰囲気を察する", "深呼吸する"],
        a: 2,
      },
      {
        q: "「忘れっぽい」の意味は？",
        opts: ["忘れない", "忘れやすい", "忘れたい", "忘れられない"],
        a: 1,
      },
      {
        q: "「本音」の反対語は？",
        opts: ["嘘", "建前", "冗談", "皮肉"],
        a: 1,
      },
    ],
  },
];
