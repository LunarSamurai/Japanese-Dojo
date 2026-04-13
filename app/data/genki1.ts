import type { Lesson } from "../types";

export const GENKI1: Lesson[] = [
  // ─── Lesson 1: New Friends ───────────────────────────────────
  {
    id: "g1-l1",
    lesson: 1,
    title: "New Friends",
    jp: "新しい友達",
    book: "Genki I",
    xp: 60,
    coins: 12,
    vocab: [
      { j: "わたし", r: "私", e: "I" },
      { j: "ともだち", r: "友達", e: "friend" },
      { j: "がくせい", r: "学生", e: "student" },
      { j: "だいがくせい", r: "大学生", e: "college student" },
      { j: "りゅうがくせい", r: "留学生", e: "international student" },
      { j: "せんせい", r: "先生", e: "teacher; professor" },
      { j: "だいがく", r: "大学", e: "college; university" },
      { j: "こうこう", r: "高校", e: "high school" },
      { j: "がっこう", r: "学校", e: "school" },
      { j: "でんわ", r: "電話", e: "telephone" },
      { j: "でんわばんごう", r: "電話番号", e: "telephone number" },
      { j: "なまえ", r: "名前", e: "name" },
      { j: "にほんご", r: "日本語", e: "Japanese language" },
      { j: "えいご", r: "英語", e: "English language" },
      { j: "なんさい", r: "何歳", e: "how old" },
      { j: "〜さい", r: "〜歳", e: "~ years old" },
      { j: "〜さん", r: "〜さん", e: "Mr./Ms. ~" },
      { j: "〜じん", r: "〜人", e: "~ person (nationality)" },
      { j: "〜ねんせい", r: "〜年生", e: "~ year student" },
      { j: "〜ご", r: "〜語", e: "~ language" },
      { j: "いちねんせい", r: "一年生", e: "first-year student" },
      { j: "にほんじん", r: "日本人", e: "Japanese person" },
      { j: "アメリカじん", r: "アメリカ人", e: "American person" },
      { j: "いま", r: "今", e: "now" },
      { j: "ごぜん", r: "午前", e: "a.m." },
      { j: "ごご", r: "午後", e: "p.m." },
      { j: "〜じ", r: "〜時", e: "~ o'clock" },
      { j: "〜ぷん / 〜ふん", r: "〜分", e: "~ minutes" },
      { j: "はん", r: "半", e: "half (past the hour)" },
      { j: "なんじ", r: "何時", e: "what time" },
      { j: "はい", r: "はい", e: "yes" },
      { j: "いいえ", r: "いいえ", e: "no" },
      { j: "すみません", r: "すみません", e: "excuse me; I'm sorry" },
      { j: "せんこう", r: "専攻", e: "major (academic)" },
      { j: "おかあさん", r: "お母さん", e: "(someone's) mother" },
      { j: "おとうさん", r: "お父さん", e: "(someone's) father" },
      { j: "おねえさん", r: "お姉さん", e: "(someone's) older sister" },
      { j: "おにいさん", r: "お兄さん", e: "(someone's) older brother" },
      { j: "いもうと", r: "妹", e: "younger sister" },
      { j: "おとうと", r: "弟", e: "younger brother" },
    ],
    grammar: [
      {
        pattern: "Xは Y です",
        explanation:
          "The basic copula sentence. は (wa) marks the topic, です is the polite form of 'to be'. Used for identification and description.",
        examples: [
          { jp: "わたしはがくせいです。", tr: "I am a student." },
          { jp: "たけしさんはにほんじんです。", tr: "Takeshi is Japanese." },
        ],
      },
      {
        pattern: "Xは Y じゃないです / じゃありません",
        explanation:
          "The negative of です. じゃないです is slightly casual; じゃありません is more formal. Both are polite.",
        examples: [
          {
            jp: "わたしはにほんじんじゃないです。",
            tr: "I am not Japanese.",
          },
          {
            jp: "メアリーさんはせんせいじゃありません。",
            tr: "Mary is not a teacher.",
          },
        ],
      },
      {
        pattern: "Xは Y ですか",
        explanation:
          "Add か to the end of a statement to make it a yes/no question. Intonation rises. Answer with はい or いいえ.",
        examples: [
          { jp: "がくせいですか。", tr: "Are you a student?" },
          {
            jp: "たけしさんはにほんじんですか。",
            tr: "Is Takeshi Japanese?",
          },
        ],
      },
      {
        pattern: "Noun の Noun",
        explanation:
          "The particle の connects two nouns, showing possession, affiliation, or description. Similar to English 'of' or possessive 's.",
        examples: [
          {
            jp: "たけしさんはにほんごのがくせいです。",
            tr: "Takeshi is a student of Japanese.",
          },
          {
            jp: "わたしのでんわばんごうは０９０です。",
            tr: "My phone number is 090.",
          },
        ],
      },
      {
        pattern: "なん / なに (what)",
        explanation:
          "なん is used before です, before counters (〜じ, 〜さい, 〜ねんせい), and before sounds starting with d/t/n. Otherwise, なに.",
        examples: [
          {
            jp: "せんこうはなんですか。",
            tr: "What is your major?",
          },
          { jp: "なんさいですか。", tr: "How old are you?" },
        ],
      },
    ],
    dialogue: [
      {
        jp: "はじめまして。メアリー・ハートです。アリゾナだいがくのがくせいです。",
        tr: "How do you do? I'm Mary Hart. I'm a student at the University of Arizona.",
      },
      {
        jp: "いまにねんせいです。せんこうはにほんごです。",
        tr: "I'm a sophomore now. My major is Japanese.",
      },
      {
        jp: "はじめまして。たけしです。よろしくおねがいします。",
        tr: "How do you do? I'm Takeshi. Nice to meet you.",
      },
      {
        jp: "たけしさんはなんねんせいですか。",
        tr: "Takeshi, what year are you?",
      },
      {
        jp: "さんねんせいです。れきしがせんこうです。",
        tr: "I'm a third-year student. History is my major.",
      },
      {
        jp: "そうですか。どうぞよろしくおねがいします。",
        tr: "I see. Nice to meet you.",
      },
      {
        jp: "こちらこそ、よろしくおねがいします。",
        tr: "Likewise, nice to meet you.",
      },
    ],
    tips: [
      "Always use さん after someone else's name, never after your own. Dropping さん is rude unless you are close friends.",
      "Japanese uses a 12-hour clock in daily conversation. Use ごぜん (a.m.) and ごご (p.m.) before the time: ごぜんくじ = 9 a.m.",
      "When telling your age, avoid asking older people なんさいですか directly — it can be considered impolite.",
      "はじめまして literally means 'for the first time.' It is only used when meeting someone for the very first time.",
    ],
    quiz: [
      {
        q: "How do you say 'I am a student' politely?",
        opts: [
          "わたしはがくせいだ",
          "わたしはがくせいです",
          "わたしがくせいです",
          "がくせいはわたしです",
        ],
        a: 1,
      },
      {
        q: "What is the negative of です?",
        opts: [
          "ですない",
          "じゃないです",
          "ですません",
          "ないです",
        ],
        a: 1,
      },
      {
        q: "What does の do between two nouns?",
        opts: [
          "Makes a question",
          "Shows possession or affiliation",
          "Marks the object",
          "Marks location",
        ],
        a: 1,
      },
      {
        q: "How do you form a yes/no question?",
        opts: [
          "Add か at the end",
          "Add ね at the end",
          "Change word order",
          "Add の at the end",
        ],
        a: 0,
      },
      {
        q: "Which is correct for 'What time is it?'",
        opts: ["なにじですか", "なんじですか", "いつじですか", "どのじですか"],
        a: 1,
      },
      {
        q: "How should you address Ms. Tanaka?",
        opts: ["たなか", "たなかちゃん", "たなかさん", "たなかくん"],
        a: 2,
      },
      {
        q: "What does せんこう mean?",
        opts: ["teacher", "major (academic)", "school", "year"],
        a: 1,
      },
      {
        q: "3:30 p.m. in Japanese is:",
        opts: [
          "ごぜんさんじはん",
          "ごごさんじはん",
          "ごごさんじさんじゅっぷん",
          "ごぜんさんじさんじゅっぷん",
        ],
        a: 1,
      },
    ],
  },

  // ─── Lesson 2: Shopping ──────────────────────────────────────
  {
    id: "g1-l2",
    lesson: 2,
    title: "Shopping",
    jp: "買い物",
    book: "Genki I",
    xp: 65,
    coins: 13,
    vocab: [
      { j: "これ", r: "これ", e: "this one (near speaker)" },
      { j: "それ", r: "それ", e: "that one (near listener)" },
      { j: "あれ", r: "あれ", e: "that one (over there)" },
      { j: "どれ", r: "どれ", e: "which one" },
      { j: "この", r: "この", e: "this ~ (before noun)" },
      { j: "その", r: "その", e: "that ~ (near listener)" },
      { j: "あの", r: "あの", e: "that ~ (over there)" },
      { j: "どの", r: "どの", e: "which ~" },
      { j: "ここ", r: "ここ", e: "here" },
      { j: "そこ", r: "そこ", e: "there (near listener)" },
      { j: "あそこ", r: "あそこ", e: "over there" },
      { j: "どこ", r: "どこ", e: "where" },
      { j: "だれ", r: "誰", e: "who" },
      { j: "おいしい", r: "美味しい", e: "delicious" },
      { j: "たかい", r: "高い", e: "expensive; tall" },
      { j: "やすい", r: "安い", e: "cheap; inexpensive" },
      { j: "あたらしい", r: "新しい", e: "new" },
      { j: "ふるい", r: "古い", e: "old (things)" },
      { j: "おおきい", r: "大きい", e: "big" },
      { j: "ちいさい", r: "小さい", e: "small" },
      { j: "おもしろい", r: "面白い", e: "interesting; funny" },
      { j: "つまらない", r: "つまらない", e: "boring" },
      { j: "いい", r: "いい", e: "good" },
      { j: "かわいい", r: "可愛い", e: "cute" },
      { j: "〜えん", r: "〜円", e: "~ yen" },
      { j: "いくら", r: "いくら", e: "how much (money)" },
      { j: "ほん", r: "本", e: "book" },
      { j: "かばん", r: "鞄", e: "bag" },
      { j: "くつ", r: "靴", e: "shoes" },
      { j: "さいふ", r: "財布", e: "wallet" },
      { j: "とけい", r: "時計", e: "watch; clock" },
      { j: "ぼうし", r: "帽子", e: "hat; cap" },
      { j: "Tシャツ", r: "Tシャツ", e: "T-shirt" },
      { j: "しんぶん", r: "新聞", e: "newspaper" },
      { j: "じしょ", r: "辞書", e: "dictionary" },
      { j: "ノート", r: "ノート", e: "notebook" },
      { j: "えんぴつ", r: "鉛筆", e: "pencil" },
      { j: "かさ", r: "傘", e: "umbrella" },
      { j: "ください", r: "ください", e: "please give me" },
      { j: "おねがいします", r: "お願いします", e: "please (polite request)" },
    ],
    grammar: [
      {
        pattern: "これ / それ / あれ / どれ",
        explanation:
          "Demonstrative pronouns. これ (near speaker), それ (near listener), あれ (far from both). どれ asks 'which one?' They stand alone without a following noun.",
        examples: [
          { jp: "これはいくらですか。", tr: "How much is this?" },
          { jp: "それはわたしのかばんです。", tr: "That is my bag." },
        ],
      },
      {
        pattern: "この / その / あの / どの + Noun",
        explanation:
          "Demonstrative adjectives must be followed by a noun. この (this ~), その (that ~), あの (that ~ over there), どの (which ~).",
        examples: [
          {
            jp: "このとけいはたかいです。",
            tr: "This watch is expensive.",
          },
          { jp: "あのかばんをください。", tr: "Please give me that bag over there." },
        ],
      },
      {
        pattern: "い-adjective です / くないです",
        explanation:
          "い-adjectives end in い. Affirmative: adj + です. Negative: drop い, add くないです / くありません. Exception: いい → よくないです.",
        examples: [
          { jp: "このほんはおもしろいです。", tr: "This book is interesting." },
          {
            jp: "あのレストランはおいしくないです。",
            tr: "That restaurant is not delicious.",
          },
        ],
      },
      {
        pattern: "〜も",
        explanation:
          "The particle も means 'also' or 'too.' It replaces は, が, or を.",
        examples: [
          {
            jp: "たけしさんはにほんじんです。みちこさんもにほんじんです。",
            tr: "Takeshi is Japanese. Michiko is also Japanese.",
          },
        ],
      },
      {
        pattern: "〜ね / 〜よ",
        explanation:
          "Sentence-ending particles. ね seeks agreement ('isn't it?'). よ asserts new information to the listener ('I tell you').",
        examples: [
          {
            jp: "このえいがはおもしろいですね。",
            tr: "This movie is interesting, isn't it?",
          },
          {
            jp: "このかさは三千円ですよ。",
            tr: "This umbrella is 3,000 yen, you know.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "すみません、このとけいはいくらですか。",
        tr: "Excuse me, how much is this watch?",
      },
      {
        jp: "それはさんぜんえんです。",
        tr: "That one is 3,000 yen.",
      },
      {
        jp: "ちょっとたかいですね。あのとけいは？",
        tr: "That's a little expensive. How about that watch over there?",
      },
      {
        jp: "あれはにせんえんです。",
        tr: "That one is 2,000 yen.",
      },
      {
        jp: "やすいですね。いいですね。",
        tr: "That's cheap. That's nice.",
      },
      {
        jp: "じゃあ、あのとけいをください。",
        tr: "Then, I'll take that watch, please.",
      },
      {
        jp: "はい、にせんえんです。ありがとうございます。",
        tr: "Yes, that's 2,000 yen. Thank you.",
      },
    ],
    tips: [
      "Japanese uses ko-so-a-do patterns everywhere: これ/それ/あれ/どれ for things, ここ/そこ/あそこ/どこ for places, この/その/あの/どの before nouns.",
      "The adjective いい (good) is irregular. Its negative is よくない, not いくない.",
      "When shopping, say ～をください to buy something. For casual browsing, say みているだけです (I'm just looking).",
      "Japanese currency uses 円 (en). Common coins: 1, 5, 10, 50, 100, 500 yen. Bills: 1000, 5000, 10000 yen.",
    ],
    quiz: [
      {
        q: "Which word must always precede a noun?",
        opts: ["これ", "それ", "この", "どれ"],
        a: 2,
      },
      {
        q: "What is the negative of たかい?",
        opts: ["たかじゃない", "たかくない", "たかない", "たかいない"],
        a: 1,
      },
      {
        q: "What does ね at the end of a sentence do?",
        opts: [
          "Makes a strong assertion",
          "Seeks agreement",
          "Asks a question",
          "Negates",
        ],
        a: 1,
      },
      {
        q: "'This book is interesting' in Japanese:",
        opts: [
          "このほんはおもしろです",
          "このほんはおもしろいです",
          "これほんはおもしろいです",
          "このほんがおもしろいだ",
        ],
        a: 1,
      },
      {
        q: "What is the negative of いい?",
        opts: ["いくない", "よくない", "いいじゃない", "よいくない"],
        a: 1,
      },
      {
        q: "どれ is used to ask:",
        opts: ["where", "who", "which one", "how much"],
        a: 2,
      },
      {
        q: "も replaces which particles?",
        opts: [
          "に and で",
          "は, が, or を",
          "の and と",
          "から and まで",
        ],
        a: 1,
      },
      {
        q: "'Please give me that umbrella' =",
        opts: [
          "あのかさがください",
          "あのかさにください",
          "あのかさをください",
          "あのかさはください",
        ],
        a: 2,
      },
    ],
  },

  // ─── Lesson 3: Making Plans ──────────────────────────────────
  {
    id: "g1-l3",
    lesson: 3,
    title: "Making Plans",
    jp: "デートの約束",
    book: "Genki I",
    xp: 70,
    coins: 15,
    vocab: [
      { j: "たべる", r: "食べる", e: "to eat (ru-verb)" },
      { j: "のむ", r: "飲む", e: "to drink (u-verb)" },
      { j: "みる", r: "見る", e: "to see; to watch (ru-verb)" },
      { j: "きく", r: "聞く", e: "to listen; to ask (u-verb)" },
      { j: "よむ", r: "読む", e: "to read (u-verb)" },
      { j: "かく", r: "書く", e: "to write (u-verb)" },
      { j: "はなす", r: "話す", e: "to speak; to talk (u-verb)" },
      { j: "まつ", r: "待つ", e: "to wait (u-verb)" },
      { j: "のる", r: "乗る", e: "to ride; to board (u-verb)" },
      { j: "する", r: "する", e: "to do (irregular)" },
      { j: "くる", r: "来る", e: "to come (irregular)" },
      { j: "いく", r: "行く", e: "to go (u-verb)" },
      { j: "かえる", r: "帰る", e: "to go home; return (u-verb)" },
      { j: "おきる", r: "起きる", e: "to get up (ru-verb)" },
      { j: "ねる", r: "寝る", e: "to sleep; go to bed (ru-verb)" },
      { j: "べんきょうする", r: "勉強する", e: "to study" },
      { j: "えいが", r: "映画", e: "movie" },
      { j: "おんがく", r: "音楽", e: "music" },
      { j: "ざっし", r: "雑誌", e: "magazine" },
      { j: "テレビ", r: "テレビ", e: "television" },
      { j: "みず", r: "水", e: "water" },
      { j: "おちゃ", r: "お茶", e: "green tea" },
      { j: "コーヒー", r: "コーヒー", e: "coffee" },
      { j: "あさごはん", r: "朝ご飯", e: "breakfast" },
      { j: "ひるごはん", r: "昼ご飯", e: "lunch" },
      { j: "ばんごはん", r: "晩ご飯", e: "dinner" },
      { j: "いえ", r: "家", e: "home; house" },
      { j: "うち", r: "うち", e: "home" },
      { j: "がっこう", r: "学校", e: "school" },
      { j: "まいにち", r: "毎日", e: "every day" },
      { j: "まいあさ", r: "毎朝", e: "every morning" },
      { j: "まいばん", r: "毎晩", e: "every evening" },
      { j: "たいてい", r: "たいてい", e: "usually" },
      { j: "ときどき", r: "時々", e: "sometimes" },
      { j: "よく", r: "よく", e: "often" },
      { j: "あまり", r: "あまり", e: "not very (+ negative)" },
      { j: "ぜんぜん", r: "全然", e: "not at all (+ negative)" },
    ],
    grammar: [
      {
        pattern: "Verb (polite): ～ます / ～ません",
        explanation:
          "The polite present/future affirmative is ～ます and the negative is ～ません. Ru-verbs: drop る, add ます. U-verbs: change the last vowel to い-row, add ます.",
        examples: [
          { jp: "コーヒーをのみます。", tr: "I drink coffee." },
          { jp: "テレビをみません。", tr: "I don't watch TV." },
        ],
      },
      {
        pattern: "Verb を します",
        explanation:
          "を marks the direct object of an action verb. Some activities use する: べんきょうする, りょうりする, etc.",
        examples: [
          { jp: "にほんごをべんきょうします。", tr: "I study Japanese." },
          { jp: "あさごはんをたべます。", tr: "I eat breakfast." },
        ],
      },
      {
        pattern: "Place に / へ いきます / きます / かえります",
        explanation:
          "に or へ marks the destination of movement verbs (go/come/return). They are interchangeable for direction.",
        examples: [
          { jp: "がっこうにいきます。", tr: "I go to school." },
          { jp: "うちへかえります。", tr: "I return home." },
        ],
      },
      {
        pattern: "Time に",
        explanation:
          "Specific times require に: ～じに (at ~ o'clock), ～ようびに (on ~ day). Relative time words (きょう, あした, まいにち) do NOT take に.",
        examples: [
          { jp: "しちじにおきます。", tr: "I get up at 7 o'clock." },
          { jp: "にちようびにえいがをみます。", tr: "I watch a movie on Sunday." },
        ],
      },
      {
        pattern: "Place で (action location)",
        explanation:
          "で marks the place where an action occurs. Different from に which marks destination or existence location.",
        examples: [
          {
            jp: "としょかんでべんきょうします。",
            tr: "I study at the library.",
          },
          { jp: "うちでばんごはんをたべます。", tr: "I eat dinner at home." },
        ],
      },
      {
        pattern: "Frequency adverbs",
        explanation:
          "Japanese uses adverbs for frequency: いつも (always) > よく (often) > たいてい (usually) > ときどき (sometimes) > あまり (not often, + neg) > ぜんぜん (not at all, + neg).",
        examples: [
          {
            jp: "よくとしょかんにいきます。",
            tr: "I often go to the library.",
          },
          {
            jp: "あまりテレビをみません。",
            tr: "I don't watch TV very often.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "メアリーさんはまいにちなにをしますか。",
        tr: "Mary, what do you do every day?",
      },
      {
        jp: "たいていしちじにおきます。そして、あさごはんをたべます。",
        tr: "I usually get up at 7. Then I eat breakfast.",
      },
      {
        jp: "がっこうでなにをしますか。",
        tr: "What do you do at school?",
      },
      {
        jp: "にほんごをべんきょうします。ときどきとしょかんでほんをよみます。",
        tr: "I study Japanese. Sometimes I read books at the library.",
      },
      {
        jp: "ばんごはんのあとはなにをしますか。",
        tr: "What do you do after dinner?",
      },
      {
        jp: "テレビをみたり、おんがくをきいたりします。",
        tr: "I do things like watch TV and listen to music.",
      },
      {
        jp: "なんじにねますか。",
        tr: "What time do you go to bed?",
      },
      {
        jp: "たいていじゅういちじごろにねます。",
        tr: "I usually go to bed around 11 o'clock.",
      },
    ],
    tips: [
      "Japanese verbs are classified as ru-verbs (drop る, add ます) or u-verbs (change last u-sound to i-sound, add ます). する and くる are irregular.",
      "で (at/in) is used for locations where actions happen: としょかんでべんきょうする. に is for destinations: がっこうにいく.",
      "Frequency adverbs like あまり and ぜんぜん MUST be used with negative verb forms.",
      "Time words like きょう (today), あした (tomorrow), and まいにち (every day) do not need the particle に.",
    ],
    quiz: [
      {
        q: "What is the ます-form of たべる?",
        opts: ["たべます", "たべります", "たべるます", "たべいます"],
        a: 0,
      },
      {
        q: "What particle marks the place where an action happens?",
        opts: ["に", "で", "が", "を"],
        a: 1,
      },
      {
        q: "する in polite form is:",
        opts: ["すます", "します", "するます", "しります"],
        a: 1,
      },
      {
        q: "Which time expression needs に?",
        opts: ["きょう", "まいにち", "しちじ", "あした"],
        a: 2,
      },
      {
        q: "'I don't eat breakfast' politely:",
        opts: [
          "あさごはんをたべません",
          "あさごはんをたべない",
          "あさごはんをたべくない",
          "あさごはんをたべありません",
        ],
        a: 0,
      },
      {
        q: "'I often go to school' =",
        opts: [
          "がっこうでよくいきます",
          "よくがっこうにいきます",
          "がっこうにいつもいきます",
          "がっこうによくいます",
        ],
        a: 1,
      },
      {
        q: "What is the ます-form of のむ?",
        opts: ["のます", "のみます", "のむます", "のめます"],
        a: 1,
      },
      {
        q: "あまり must be paired with:",
        opts: [
          "a positive verb",
          "a negative verb",
          "an adjective",
          "a noun",
        ],
        a: 1,
      },
    ],
  },

  // ─── Lesson 4: The First Date ────────────────────────────────
  {
    id: "g1-l4",
    lesson: 4,
    title: "The First Date",
    jp: "初めてのデート",
    book: "Genki I",
    xp: 75,
    coins: 16,
    vocab: [
      { j: "アルバイト", r: "アルバイト", e: "part-time job" },
      { j: "かいもの", r: "買い物", e: "shopping" },
      { j: "クラス", r: "クラス", e: "class" },
      { j: "あなた", r: "あなた", e: "you" },
      { j: "いぬ", r: "犬", e: "dog" },
      { j: "ねこ", r: "猫", e: "cat" },
      { j: "ひと", r: "人", e: "person" },
      { j: "おとこのひと", r: "男の人", e: "man" },
      { j: "おんなのひと", r: "女の人", e: "woman" },
      { j: "こども", r: "子供", e: "child" },
      { j: "テニス", r: "テニス", e: "tennis" },
      { j: "サッカー", r: "サッカー", e: "soccer" },
      { j: "おさけ", r: "お酒", e: "sake; alcohol" },
      { j: "にく", r: "肉", e: "meat" },
      { j: "やさい", r: "野菜", e: "vegetable" },
      { j: "くだもの", r: "果物", e: "fruit" },
      { j: "やすみ", r: "休み", e: "holiday; break; absence" },
      { j: "あう", r: "会う", e: "to meet (u-verb)" },
      { j: "ある", r: "ある", e: "there is (inanimate)" },
      { j: "かう", r: "買う", e: "to buy (u-verb)" },
      { j: "あそぶ", r: "遊ぶ", e: "to play; to hang out (u-verb)" },
      { j: "いそぐ", r: "急ぐ", e: "to hurry (u-verb)" },
      { j: "おわる", r: "終わる", e: "to end (u-verb)" },
      { j: "おふろにはいる", r: "お風呂に入る", e: "to take a bath" },
      { j: "りょうり", r: "料理", e: "cooking; cuisine" },
      { j: "りょうりする", r: "料理する", e: "to cook" },
      { j: "きのう", r: "昨日", e: "yesterday" },
      { j: "きょう", r: "今日", e: "today" },
      { j: "あした", r: "明日", e: "tomorrow" },
      { j: "こんしゅう", r: "今週", e: "this week" },
      { j: "せんしゅう", r: "先週", e: "last week" },
      { j: "らいしゅう", r: "来週", e: "next week" },
      { j: "いつ", r: "いつ", e: "when" },
      { j: "〜ごろ", r: "〜ごろ", e: "about (approximate time)" },
    ],
    grammar: [
      {
        pattern: "Past tense: ～ました / ～ませんでした",
        explanation:
          "Polite past affirmative: ～ました. Polite past negative: ～ませんでした. For です: でした / じゃなかったです.",
        examples: [
          { jp: "きのうえいがをみました。", tr: "I watched a movie yesterday." },
          {
            jp: "あさごはんをたべませんでした。",
            tr: "I didn't eat breakfast.",
          },
        ],
      },
      {
        pattern: "Noun を します",
        explanation:
          "Some activities use the pattern Noun + を + します: かいものをします (to shop), べんきょうをします (to study), りょうりをします (to cook).",
        examples: [
          {
            jp: "きのうかいものをしました。",
            tr: "I went shopping yesterday.",
          },
          { jp: "にちようびにテニスをします。", tr: "I play tennis on Sunday." },
        ],
      },
      {
        pattern: "～も (also / too)",
        explanation:
          "も replaces は, が, or を to mean 'also/too.' It cannot stack with those particles.",
        examples: [
          {
            jp: "わたしもがくせいです。",
            tr: "I am also a student.",
          },
          { jp: "にくもやさいもたべました。", tr: "I ate both meat and vegetables." },
        ],
      },
      {
        pattern: "Word order and time expressions",
        explanation:
          "Japanese word order is flexible, but time usually comes before the place, and the verb always comes last. Topic は ... time ... place で ... object を ... verb.",
        examples: [
          {
            jp: "わたしはきのうとしょかんでにほんごをべんきょうしました。",
            tr: "I studied Japanese at the library yesterday.",
          },
        ],
      },
      {
        pattern: "～ましょう / ～ましょうか",
        explanation:
          "～ましょう means 'let's ~.' ～ましょうか is a polite offer: 'shall I ~?' or 'shall we ~?'",
        examples: [
          { jp: "いっしょにひるごはんをたべましょう。", tr: "Let's eat lunch together." },
          { jp: "てつだいましょうか。", tr: "Shall I help you?" },
        ],
      },
    ],
    dialogue: [
      {
        jp: "しゅうまつ、なにをしましたか。",
        tr: "What did you do on the weekend?",
      },
      {
        jp: "どようびにともだちとかいものをしました。",
        tr: "On Saturday I went shopping with a friend.",
      },
      {
        jp: "なにをかいましたか。",
        tr: "What did you buy?",
      },
      {
        jp: "くつをかいました。たかかったですけど、かわいいです。",
        tr: "I bought shoes. They were expensive, but they're cute.",
      },
      {
        jp: "にちようびは？",
        tr: "How about Sunday?",
      },
      {
        jp: "にちようびはうちでりょうりをしました。",
        tr: "On Sunday I cooked at home.",
      },
      {
        jp: "いいですね！こんどいっしょにりょうりをしましょう。",
        tr: "Nice! Let's cook together next time.",
      },
    ],
    tips: [
      "けど / けれども at the end of a sentence means 'but' and softens the statement. It's very common in conversation.",
      "In Japanese, you rarely use あなた (you). Instead, use the person's name + さん.",
      "〜ましょう is a friendly suggestion ('let's'), while 〜ましょうか as a question is an offer to help.",
      "Time words like きのう, きょう, あした don't need the particle に, but specific days like にちようび do: にちようびに.",
    ],
    quiz: [
      {
        q: "Past tense of たべます is:",
        opts: ["たべました", "たべした", "たべるました", "たべたです"],
        a: 0,
      },
      {
        q: "'I didn't go' (polite past negative):",
        opts: [
          "いきません",
          "いきませんでした",
          "いかないでした",
          "いきなかった",
        ],
        a: 1,
      },
      {
        q: "'Let's eat together' =",
        opts: [
          "いっしょにたべましょう",
          "いっしょにたべます",
          "いっしょにたべてください",
          "いっしょにたべたい",
        ],
        a: 0,
      },
      {
        q: "も replaces which particles?",
        opts: ["に and で", "は, が, or を", "の and と", "から and まで"],
        a: 1,
      },
      {
        q: "Past tense of たかい is:",
        opts: ["たかかった", "たかいだった", "たかいでした", "たかかったです"],
        a: 3,
      },
      {
        q: "'Shall I help?' =",
        opts: [
          "てつだいます",
          "てつだいましょう",
          "てつだいましょうか",
          "てつだってください",
        ],
        a: 2,
      },
      {
        q: "What did you do yesterday? =",
        opts: [
          "きのうなにをしましたか",
          "きのうなにをしますか",
          "あしたなにをしましたか",
          "きょうなにをしますか",
        ],
        a: 0,
      },
      {
        q: "Past negative of です:",
        opts: [
          "じゃないです",
          "じゃなかったです",
          "じゃありません",
          "でしたない",
        ],
        a: 1,
      },
    ],
  },

  // ─── Lesson 5: A Trip to Okinawa ─────────────────────────────
  {
    id: "g1-l5",
    lesson: 5,
    title: "A Trip to Okinawa",
    jp: "沖縄旅行",
    book: "Genki I",
    xp: 80,
    coins: 17,
    vocab: [
      { j: "すき（な）", r: "好き", e: "to like (na-adj)" },
      { j: "きらい（な）", r: "嫌い", e: "to dislike (na-adj)" },
      { j: "じょうず（な）", r: "上手", e: "skillful; good at (na-adj)" },
      { j: "へた（な）", r: "下手", e: "clumsy; bad at (na-adj)" },
      { j: "ゆうめい（な）", r: "有名", e: "famous (na-adj)" },
      { j: "しずか（な）", r: "静か", e: "quiet (na-adj)" },
      { j: "にぎやか（な）", r: "賑やか", e: "lively (na-adj)" },
      { j: "げんき（な）", r: "元気", e: "healthy; energetic (na-adj)" },
      { j: "きれい（な）", r: "きれい", e: "beautiful; clean (na-adj)" },
      { j: "ひま（な）", r: "暇", e: "free; not busy (na-adj)" },
      { j: "しんせつ（な）", r: "親切", e: "kind (na-adj)" },
      { j: "たいへん（な）", r: "大変", e: "tough; hard (na-adj)" },
      { j: "うみ", r: "海", e: "sea; ocean" },
      { j: "やま", r: "山", e: "mountain" },
      { j: "まち", r: "町", e: "town; city" },
      { j: "たべもの", r: "食べ物", e: "food" },
      { j: "のみもの", r: "飲み物", e: "drink; beverage" },
      { j: "くに", r: "国", e: "country" },
      { j: "ところ", r: "所", e: "place" },
      { j: "りょこう", r: "旅行", e: "travel; trip" },
      { j: "おんせん", r: "温泉", e: "hot spring" },
      { j: "すもう", r: "相撲", e: "sumo wrestling" },
      { j: "おてら", r: "お寺", e: "temple" },
      { j: "じんじゃ", r: "神社", e: "shrine" },
      { j: "およぐ", r: "泳ぐ", e: "to swim (u-verb)" },
      { j: "でかける", r: "出かける", e: "to go out (ru-verb)" },
      { j: "つかれる", r: "疲れる", e: "to get tired (ru-verb)" },
      { j: "とても", r: "とても", e: "very" },
      { j: "すこし", r: "少し", e: "a little" },
      { j: "どんな", r: "どんな", e: "what kind of" },
      { j: "どうして", r: "どうして", e: "why" },
      { j: "〜から", r: "〜から", e: "because ~" },
      { j: "ずっと", r: "ずっと", e: "much more; the whole time" },
      { j: "はやい", r: "早い", e: "early; fast (i-adj)" },
      { j: "おそい", r: "遅い", e: "slow; late (i-adj)" },
    ],
    grammar: [
      {
        pattern: "な-adjective + です / じゃないです",
        explanation:
          "な-adjectives use な before nouns (しずかなまち). Predicate: adj + です. Negative: adj + じゃないです. They do NOT end in い (except きれい and きらい which are な-adjectives).",
        examples: [
          { jp: "このまちはしずかです。", tr: "This town is quiet." },
          {
            jp: "あのレストランはゆうめいじゃないです。",
            tr: "That restaurant is not famous.",
          },
        ],
      },
      {
        pattern: "～が すき / きらい / じょうず / へた",
        explanation:
          "With すき, きらい, じょうず, へた, the object takes が, not を. The person takes は.",
        examples: [
          {
            jp: "わたしはにほんのたべものがすきです。",
            tr: "I like Japanese food.",
          },
          {
            jp: "たけしさんはうたがへたです。",
            tr: "Takeshi is bad at singing.",
          },
        ],
      },
      {
        pattern: "どんな + Noun",
        explanation:
          "どんな asks 'what kind of ~' and must be followed by a noun.",
        examples: [
          {
            jp: "どんなおんがくがすきですか。",
            tr: "What kind of music do you like?",
          },
          {
            jp: "どんなところですか。",
            tr: "What kind of place is it?",
          },
        ],
      },
      {
        pattern: "～ましょう / ～ましょうか (review + new uses)",
        explanation:
          "～ましょう (let's do ~). ～ましょうか (shall we / shall I?). Used for invitations and offers.",
        examples: [
          {
            jp: "おきなわにいきましょう。",
            tr: "Let's go to Okinawa.",
          },
          {
            jp: "なにをのみましょうか。",
            tr: "What shall we drink?",
          },
        ],
      },
      {
        pattern: "～から (because)",
        explanation:
          "～から at the end of a clause gives the reason. The reason clause comes before the result, or after as an afterthought.",
        examples: [
          {
            jp: "おきなわがすきです。うみがきれいですから。",
            tr: "I like Okinawa. Because the ocean is beautiful.",
          },
          {
            jp: "つかれましたから、はやくねます。",
            tr: "Because I'm tired, I'll go to bed early.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "おきなわはどうでしたか。",
        tr: "How was Okinawa?",
      },
      {
        jp: "とてもよかったです。うみがきれいでした。",
        tr: "It was very good. The ocean was beautiful.",
      },
      {
        jp: "なにをしましたか。",
        tr: "What did you do?",
      },
      {
        jp: "まいにちうみでおよぎました。おきなわのりょうりもたべました。",
        tr: "I swam in the ocean every day. I also ate Okinawan food.",
      },
      {
        jp: "おきなわのたべものはどうでしたか。",
        tr: "How was the food in Okinawa?",
      },
      {
        jp: "とてもおいしかったです！ゴーヤチャンプルーがすきになりました。",
        tr: "It was very delicious! I came to like goya champuru.",
      },
      {
        jp: "いいですね。わたしもいきたいです。",
        tr: "That's nice. I want to go too.",
      },
      {
        jp: "ぜひいってください。きれいなうみですから。",
        tr: "You should definitely go. Because the ocean is beautiful.",
      },
    ],
    tips: [
      "きれい and きらい look like い-adjectives but are actually な-adjectives. Their negative is きれいじゃない, NOT きれくない.",
      "When talking about someone else's skills, じょうず is fine, but for yourself use とくい (good at) instead — じょうず about yourself sounds arrogant.",
      "Okinawa has a unique culture with distinct cuisine like ゴーヤチャンプルー (bitter melon stir-fry) and さたーあんだぎー (deep-fried doughnuts).",
      "から (because) can come at the end of a sentence as an afterthought: いきません。あめですから。 (I won't go. Because it's raining.)",
    ],
    quiz: [
      {
        q: "な-adjectives need what before a noun?",
        opts: ["い", "な", "の", "を"],
        a: 1,
      },
      {
        q: "'I like Japanese food' — correct particle?",
        opts: [
          "にほんのたべものをすきです",
          "にほんのたべものはすきです",
          "にほんのたべものがすきです",
          "にほんのたべものにすきです",
        ],
        a: 2,
      },
      {
        q: "Negative of きれい (present) is:",
        opts: [
          "きれいくない",
          "きれいじゃないです",
          "きれいない",
          "きれくない",
        ],
        a: 1,
      },
      {
        q: "What does どんな mean?",
        opts: ["which", "where", "what kind of", "how"],
        a: 2,
      },
      {
        q: "'Because I'm tired' =",
        opts: [
          "つかれましたね",
          "つかれましたよ",
          "つかれましたから",
          "つかれましたけど",
        ],
        a: 2,
      },
      {
        q: "Past tense of しずか is:",
        opts: [
          "しずかかった",
          "しずかだった",
          "しずかでした",
          "しずかくなった",
        ],
        a: 2,
      },
      {
        q: "Which is a な-adjective?",
        opts: ["おおきい", "おもしろい", "たかい", "げんき"],
        a: 3,
      },
      {
        q: "'Let's go to Okinawa' =",
        opts: [
          "おきなわにいきます",
          "おきなわにいきましょう",
          "おきなわにいきません",
          "おきなわにいきました",
        ],
        a: 1,
      },
    ],
  },

  // ─── Lesson 6: A Day in the Life ─────────────────────────────
  {
    id: "g1-l6",
    lesson: 6,
    title: "A Day in the Life",
    jp: "ロバートさんの一日",
    book: "Genki I",
    xp: 85,
    coins: 18,
    vocab: [
      { j: "あらう", r: "洗う", e: "to wash (u-verb)" },
      { j: "いう", r: "言う", e: "to say (u-verb)" },
      { j: "いる", r: "要る", e: "to need (u-verb)" },
      { j: "おくれる", r: "遅れる", e: "to be late (ru-verb)" },
      { j: "おぼえる", r: "覚える", e: "to memorize (ru-verb)" },
      { j: "おりる", r: "降りる", e: "to get off (ru-verb)" },
      { j: "かす", r: "貸す", e: "to lend (u-verb)" },
      { j: "けす", r: "消す", e: "to turn off; erase (u-verb)" },
      { j: "しぬ", r: "死ぬ", e: "to die (u-verb)" },
      { j: "すわる", r: "座る", e: "to sit down (u-verb)" },
      { j: "たつ", r: "立つ", e: "to stand up (u-verb)" },
      { j: "たばこをすう", r: "タバコを吸う", e: "to smoke (u-verb)" },
      { j: "つかう", r: "使う", e: "to use (u-verb)" },
      { j: "てつだう", r: "手伝う", e: "to help (u-verb)" },
      { j: "はいる", r: "入る", e: "to enter (u-verb)" },
      { j: "もつ", r: "持つ", e: "to hold; carry (u-verb)" },
      { j: "やすむ", r: "休む", e: "to rest; be absent (u-verb)" },
      { j: "あける", r: "開ける", e: "to open (ru-verb)" },
      { j: "しめる", r: "閉める", e: "to close (ru-verb)" },
      { j: "おしえる", r: "教える", e: "to teach; tell (ru-verb)" },
      { j: "つける", r: "つける", e: "to turn on (ru-verb)" },
      { j: "でんき", r: "電気", e: "electricity; light" },
      { j: "まど", r: "窓", e: "window" },
      { j: "ドア", r: "ドア", e: "door" },
      { j: "でんしゃ", r: "電車", e: "train" },
      { j: "くるま", r: "車", e: "car" },
      { j: "シャワー", r: "シャワー", e: "shower" },
      { j: "しゃしん", r: "写真", e: "photograph" },
      { j: "きって", r: "切手", e: "postage stamp" },
      { j: "じてんしゃ", r: "自転車", e: "bicycle" },
      { j: "しゅくだい", r: "宿題", e: "homework" },
      { j: "パソコン", r: "パソコン", e: "personal computer" },
      { j: "おかね", r: "お金", e: "money" },
      { j: "でも", r: "でも", e: "but; however" },
      { j: "ちょっと", r: "ちょっと", e: "a little; somewhat" },
    ],
    grammar: [
      {
        pattern: "て-form of verbs",
        explanation:
          "The て-form is one of the most important verb forms. Ru-verbs: drop る, add て. U-verbs follow patterns based on the ending consonant. する→して, くる→きて.",
        examples: [
          { jp: "たべる → たべて", tr: "eat → eating (te-form)" },
          { jp: "のむ → のんで、かく → かいて", tr: "drink → のんで, write → かいて" },
        ],
      },
      {
        pattern: "～てください",
        explanation:
          "て-form + ください = polite request ('please do ~'). ～ないでください = 'please don't do ~'.",
        examples: [
          { jp: "すわってください。", tr: "Please sit down." },
          { jp: "ここでたばこをすわないでください。", tr: "Please don't smoke here." },
        ],
      },
      {
        pattern: "～てもいいです",
        explanation:
          "て-form + もいいです = permission ('you may ~'). Question: ～てもいいですか ('may I ~?').",
        examples: [
          {
            jp: "しゃしんをとってもいいですか。",
            tr: "May I take a photo?",
          },
          {
            jp: "はい、とってもいいですよ。",
            tr: "Yes, you may take one.",
          },
        ],
      },
      {
        pattern: "～てはいけません",
        explanation:
          "て-form + はいけません = prohibition ('you must not ~'). Stronger than ～ないでください.",
        examples: [
          {
            jp: "ここではいってはいけません。",
            tr: "You must not enter here.",
          },
          {
            jp: "じゅぎょうちゅうにけいたいをつかってはいけません。",
            tr: "You must not use your phone during class.",
          },
        ],
      },
      {
        pattern: "～ている (progressive & states)",
        explanation:
          "て-form + いる = action in progress ('is ~ing') OR ongoing state/habit. With stative verbs (しる, すむ, etc.) it describes a resulting state.",
        examples: [
          {
            jp: "いまべんきょうしています。",
            tr: "I am studying right now.",
          },
          {
            jp: "とうきょうにすんでいます。",
            tr: "I live in Tokyo.",
          },
        ],
      },
      {
        pattern: "～てから (after doing ~)",
        explanation:
          "て-form + から = 'after doing ~'. The first action must be completed before the second begins.",
        examples: [
          {
            jp: "シャワーをあびてから、ねます。",
            tr: "After taking a shower, I go to bed.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "すみません、ここにすわってもいいですか。",
        tr: "Excuse me, may I sit here?",
      },
      {
        jp: "はい、どうぞ。",
        tr: "Yes, please go ahead.",
      },
      {
        jp: "このへやでたべてもいいですか。",
        tr: "May I eat in this room?",
      },
      {
        jp: "すみません、ここでたべてはいけません。",
        tr: "I'm sorry, you must not eat here.",
      },
      {
        jp: "わかりました。じゃあ、そとでたべます。",
        tr: "I understand. Then I'll eat outside.",
      },
      {
        jp: "あ、まどをしめてください。さむいですから。",
        tr: "Oh, please close the window. It's cold.",
      },
      {
        jp: "はい、わかりました。",
        tr: "OK, understood.",
      },
    ],
    tips: [
      "て-form patterns for u-verbs: う/つ/る→って, む/ぶ/ぬ→んで, く→いて, ぐ→いで, す→して. The big exception: いく→いって.",
      "～ている has two main uses: 1) an action happening right now (テレビをみている = watching TV) and 2) a habitual/ongoing state (まいにちはしっている = I run every day).",
      "Some verbs describe states with ～ている: しっている (know), すんでいる (live), けっこんしている (be married).",
      "To politely refuse permission, say すみませんが、ちょっと… (I'm sorry, but that's a bit…). Direct refusal is considered impolite.",
      "～てから (after ~ing) vs. ～まえに (before ~ing) are opposite time connectors.",
    ],
    quiz: [
      {
        q: "What is the て-form of いく?",
        opts: ["いいて", "いきて", "いって", "いけて"],
        a: 2,
      },
      {
        q: "How do you ask 'May I sit here?'",
        opts: [
          "ここにすわってはいけません",
          "ここにすわってもいいですか",
          "ここにすわってください",
          "ここにすわりますか",
        ],
        a: 1,
      },
      {
        q: "～てはいけません expresses:",
        opts: ["permission", "request", "prohibition", "ability"],
        a: 2,
      },
      {
        q: "て-form of のむ is:",
        opts: ["のんて", "のんで", "のみて", "のめて"],
        a: 1,
      },
      {
        q: "'I am studying now' =",
        opts: [
          "いまべんきょうします",
          "いまべんきょうしています",
          "いまべんきょうしました",
          "いまべんきょうしてから",
        ],
        a: 1,
      },
      {
        q: "て-form of する is:",
        opts: ["すて", "して", "すって", "せて"],
        a: 1,
      },
      {
        q: "'Please don't open the window' =",
        opts: [
          "まどをあけてください",
          "まどをあけてはいけません",
          "まどをあけないでください",
          "まどをあけてもいいですか",
        ],
        a: 2,
      },
      {
        q: "'After eating, I study' =",
        opts: [
          "たべてからべんきょうします",
          "べんきょうしてからたべます",
          "たべながらべんきょうします",
          "たべてべんきょうします",
        ],
        a: 0,
      },
    ],
  },

  // ─── Lesson 7: Family Photo ──────────────────────────────────
  {
    id: "g1-l7",
    lesson: 7,
    title: "Family Photo",
    jp: "家族の写真",
    book: "Genki I",
    xp: 90,
    coins: 19,
    vocab: [
      { j: "かぞく", r: "家族", e: "family" },
      { j: "ちち", r: "父", e: "my father" },
      { j: "おとうさん", r: "お父さん", e: "(someone's) father" },
      { j: "はは", r: "母", e: "my mother" },
      { j: "おかあさん", r: "お母さん", e: "(someone's) mother" },
      { j: "あに", r: "兄", e: "my older brother" },
      { j: "おにいさん", r: "お兄さん", e: "(someone's) older brother" },
      { j: "あね", r: "姉", e: "my older sister" },
      { j: "おねえさん", r: "お姉さん", e: "(someone's) older sister" },
      { j: "おとうと", r: "弟", e: "my younger brother" },
      { j: "おとうとさん", r: "弟さん", e: "(someone's) younger brother" },
      { j: "いもうと", r: "妹", e: "my younger sister" },
      { j: "いもうとさん", r: "妹さん", e: "(someone's) younger sister" },
      { j: "おっと／しゅじん", r: "夫／主人", e: "my husband" },
      { j: "ごしゅじん", r: "ご主人", e: "(someone's) husband" },
      { j: "つま／かない", r: "妻／家内", e: "my wife" },
      { j: "おくさん", r: "奥さん", e: "(someone's) wife" },
      { j: "こども", r: "子供", e: "child" },
      { j: "きょうだい", r: "兄弟", e: "siblings" },
      { j: "せがたかい", r: "背が高い", e: "tall (person)" },
      { j: "せがひくい", r: "背が低い", e: "short (person)" },
      { j: "かみがながい", r: "髪が長い", e: "long hair" },
      { j: "かみがみじかい", r: "髪が短い", e: "short hair" },
      { j: "あたまがいい", r: "頭がいい", e: "smart; bright" },
      { j: "やさしい", r: "優しい", e: "kind; gentle" },
      { j: "かいしゃ", r: "会社", e: "company" },
      { j: "かいしゃいん", r: "会社員", e: "company employee" },
      { j: "しごと", r: "仕事", e: "work; job" },
      { j: "びょういん", r: "病院", e: "hospital" },
      { j: "いしゃ", r: "医者", e: "doctor" },
      { j: "はたらく", r: "働く", e: "to work (u-verb)" },
      { j: "けっこんする", r: "結婚する", e: "to get married" },
      { j: "ひとり", r: "一人", e: "one person" },
      { j: "ふたり", r: "二人", e: "two people" },
      { j: "〜にん", r: "〜人", e: "counter for people" },
    ],
    grammar: [
      {
        pattern: "～ている (describing people)",
        explanation:
          "～ている is used to describe a person's appearance or current state. With verbs like きる (wear), かぶる (put on head), かける (put on face), it means 'is wearing/has on.'",
        examples: [
          {
            jp: "メアリーさんはめがねをかけています。",
            tr: "Mary wears glasses.",
          },
          {
            jp: "あのひとはTシャツをきています。",
            tr: "That person is wearing a T-shirt.",
          },
        ],
      },
      {
        pattern: "Adjective + verb forms",
        explanation:
          "Adjectives can be used to describe nouns: い-adj + noun (おおきいいえ). な-adj + な + noun (しずかなまち). They also describe verbs using the adverbial form: い→く (はやくはしる), な→に (しずかにはなす).",
        examples: [
          {
            jp: "ちちはせがたかいです。",
            tr: "My father is tall.",
          },
          {
            jp: "あねはかみがながいです。",
            tr: "My older sister has long hair.",
          },
        ],
      },
      {
        pattern: "Family vocabulary (humble vs. respectful)",
        explanation:
          "Use humble terms for YOUR own family when talking to outsiders: ちち, はは, あに, あね. Use respectful terms for SOMEONE ELSE's family: おとうさん, おかあさん, おにいさん, おねえさん.",
        examples: [
          {
            jp: "ちちはかいしゃいんです。",
            tr: "My father is a company employee.",
          },
          {
            jp: "おとうさんのおしごとはなんですか。",
            tr: "What does your father do?",
          },
        ],
      },
      {
        pattern: "Counting people: ひとり、ふたり、〜にん",
        explanation:
          "People are counted: ひとり (1), ふたり (2), さんにん (3), よにん (4), ごにん (5)... なんにん (how many). Note the irregular forms for 1 and 2.",
        examples: [
          {
            jp: "かぞくはなんにんですか。",
            tr: "How many people are in your family?",
          },
          {
            jp: "ごにんです。りょうしんときょうだいがふたりいます。",
            tr: "Five. I have my parents and two siblings.",
          },
        ],
      },
      {
        pattern: "～て、～て (sequential actions with て)",
        explanation:
          "Connect multiple actions in sequence using て-form. The tense is determined by the final verb.",
        examples: [
          {
            jp: "あさおきて、シャワーをあびて、あさごはんをたべます。",
            tr: "I get up in the morning, take a shower, and eat breakfast.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "これはかぞくのしゃしんですか。",
        tr: "Is this a family photo?",
      },
      {
        jp: "はい。これはちちとははです。",
        tr: "Yes. This is my father and mother.",
      },
      {
        jp: "おとうさんはせがたかいですね。",
        tr: "Your father is tall, isn't he?",
      },
      {
        jp: "ええ。ちちはびょういんではたらいています。いしゃです。",
        tr: "Yes. My father works at a hospital. He's a doctor.",
      },
      {
        jp: "こちらはおねえさんですか。",
        tr: "Is this your older sister?",
      },
      {
        jp: "いいえ、いもうとです。だいがくせいです。",
        tr: "No, that's my younger sister. She's a college student.",
      },
      {
        jp: "きょうだいはなんにんですか。",
        tr: "How many siblings do you have?",
      },
      {
        jp: "さんにんです。あにとあねといもうとがいます。",
        tr: "Three. I have an older brother, older sister, and younger sister.",
      },
    ],
    tips: [
      "When talking about your own family to outsiders, always use humble forms (ちち, はは, あに, あね, etc.). Using おとうさん for your own father sounds odd.",
      "Counting people is irregular for 1 and 2: ひとり, ふたり. From 3 onward, use 〜にん: さんにん, よにん, etc. Note: よにん not しにん (4 people).",
      "Japanese often describe people by their features: せがたかい (tall), かみがながい (long hair), めがねをかけている (wearing glasses).",
      "けっこんしている means 'is married' (a state), while けっこんする means 'to get married' (an event).",
      "When describing your family members' jobs, don't use さん after their name: ちちはいしゃです (My father is a doctor).",
    ],
    quiz: [
      {
        q: "How do you refer to YOUR mother when talking to others?",
        opts: ["おかあさん", "はは", "ママ", "ははさん"],
        a: 1,
      },
      {
        q: "Which exists with います?",
        opts: ["a chair", "a book", "a cat", "a tree"],
        a: 2,
      },
      {
        q: "'My sister has long hair' =",
        opts: [
          "あねがながいかみです",
          "あねはかみがながいです",
          "あねのかみはながいがあります",
          "あねにながいかみがいます",
        ],
        a: 1,
      },
      {
        q: "How many people = なんにん. '4 people' is:",
        opts: ["しにん", "よにん", "よんにん", "よっにん"],
        a: 1,
      },
      {
        q: "'She is wearing a hat' =",
        opts: [
          "ぼうしをかぶります",
          "ぼうしをかぶっています",
          "ぼうしがかぶります",
          "ぼうしにかぶっています",
        ],
        a: 1,
      },
      {
        q: "Humble term for 'my older brother' is:",
        opts: ["おにいさん", "あに", "にいちゃん", "おにい"],
        a: 1,
      },
      {
        q: "'How many people in your family?' =",
        opts: [
          "かぞくはだれですか",
          "かぞくはなんにんですか",
          "かぞくにだれがいますか",
          "かぞくはいくつですか",
        ],
        a: 1,
      },
      {
        q: "けっこんしている means:",
        opts: [
          "will get married",
          "is getting married now",
          "is married (state)",
          "got married (past)",
        ],
        a: 2,
      },
    ],
  },

  // ─── Lesson 8: Barbecue ──────────────────────────────────────
  {
    id: "g1-l8",
    lesson: 8,
    title: "Barbecue",
    jp: "バーベキュー",
    book: "Genki I",
    xp: 95,
    coins: 20,
    vocab: [
      { j: "あめ", r: "雨", e: "rain" },
      { j: "くもり", r: "曇り", e: "cloudy weather" },
      { j: "ゆき", r: "雪", e: "snow" },
      { j: "てんき", r: "天気", e: "weather" },
      { j: "きた", r: "北", e: "north" },
      { j: "みなみ", r: "南", e: "south" },
      { j: "ひがし", r: "東", e: "east" },
      { j: "にし", r: "西", e: "west" },
      { j: "きせつ", r: "季節", e: "season" },
      { j: "はる", r: "春", e: "spring" },
      { j: "なつ", r: "夏", e: "summer" },
      { j: "あき", r: "秋", e: "autumn; fall" },
      { j: "ふゆ", r: "冬", e: "winter" },
      { j: "あつい", r: "暑い", e: "hot (weather)" },
      { j: "さむい", r: "寒い", e: "cold (weather)" },
      { j: "すずしい", r: "涼しい", e: "cool (weather)" },
      { j: "あたたかい", r: "暖かい", e: "warm (weather)" },
      { j: "おもう", r: "思う", e: "to think (u-verb)" },
      { j: "きる", r: "着る", e: "to wear (ru-verb)" },
      { j: "すむ", r: "住む", e: "to live (u-verb)" },
      { j: "しる", r: "知る", e: "to know (u-verb)" },
      { j: "ふる", r: "降る", e: "to fall (rain/snow) (u-verb)" },
      { j: "やめる", r: "辞める", e: "to quit (ru-verb)" },
      { j: "はじめる", r: "始める", e: "to begin (ru-verb)" },
      { j: "もらう", r: "もらう", e: "to receive (u-verb)" },
      { j: "おくる", r: "送る", e: "to send (u-verb)" },
      { j: "かかる", r: "かかる", e: "to take (time/money) (u-verb)" },
      { j: "ほんとう", r: "本当", e: "truth; really" },
      { j: "うそ", r: "嘘", e: "lie" },
      { j: "じつは", r: "実は", e: "actually; to tell the truth" },
      { j: "たぶん", r: "多分", e: "probably; maybe" },
      { j: "もちろん", r: "もちろん", e: "of course" },
      { j: "さっき", r: "さっき", e: "a while ago; just now" },
      { j: "これから", r: "これから", e: "from now on" },
    ],
    grammar: [
      {
        pattern: "Short forms (plain forms) introduction",
        explanation:
          "Short forms are used in casual speech and inside longer sentences. Verbs: dictionary form (present aff.), ない-form (present neg.). い-adj: drop です. な-adj/noun: だ (aff.), じゃない (neg.).",
        examples: [
          { jp: "あしたあめがふる。", tr: "It'll rain tomorrow. (casual)" },
          {
            jp: "きょうはさむくない。",
            tr: "It's not cold today. (casual)",
          },
        ],
      },
      {
        pattern: "Short form + と思います",
        explanation:
          "Plain/short form + と思います = 'I think (that) ~'. The clause before と must be in plain form. Never use です/ます before と思います.",
        examples: [
          {
            jp: "あしたはあめがふるとおもいます。",
            tr: "I think it will rain tomorrow.",
          },
          {
            jp: "このえいがはおもしろいとおもいます。",
            tr: "I think this movie is interesting.",
          },
        ],
      },
      {
        pattern: "Short form + と言っていました",
        explanation:
          "Plain form + と言っていました = 'someone said that ~'. Used for indirect quotation.",
        examples: [
          {
            jp: "たけしさんはパーティーにいくといっていました。",
            tr: "Takeshi said he would go to the party.",
          },
          {
            jp: "メアリーさんはさむいといっていました。",
            tr: "Mary said it was cold.",
          },
        ],
      },
      {
        pattern: "～ないでください",
        explanation:
          "ない-form (drop い) + でください = 'please don't ~'. More polite than just ～ないで.",
        examples: [
          {
            jp: "ここでしゃしんをとらないでください。",
            tr: "Please don't take photos here.",
          },
          {
            jp: "きょうかしょをわすれないでください。",
            tr: "Please don't forget your textbook.",
          },
        ],
      },
      {
        pattern: "Verb のが すき / じょうず / へた",
        explanation:
          "To say you like/are good at/bad at an activity, use: verb dictionary form + の + が + すき/じょうず/へた. の turns the verb into a noun-like phrase.",
        examples: [
          {
            jp: "にほんごをはなすのがすきです。",
            tr: "I like speaking Japanese.",
          },
          {
            jp: "りょうりをするのがへたです。",
            tr: "I'm bad at cooking.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "あしたのバーベキュー、たのしみだね。",
        tr: "I'm looking forward to tomorrow's barbecue.",
      },
      {
        jp: "でも、あめがふるとおもうよ。",
        tr: "But I think it's going to rain.",
      },
      {
        jp: "ほんとう？てんきよほうはなんといっていた？",
        tr: "Really? What did the weather forecast say?",
      },
      {
        jp: "ごごからくもりで、よるはあめだといっていた。",
        tr: "It said it'll be cloudy from the afternoon, with rain at night.",
      },
      {
        jp: "じゃあ、はやくはじめようか。",
        tr: "Then shall we start early?",
      },
      {
        jp: "うん、そうしよう。じゅうじからはじめない？",
        tr: "Yeah, let's do that. How about we start from 10?",
      },
      {
        jp: "いいね。みんなにメールをおくらないと。",
        tr: "Sounds good. I have to send everyone an email.",
      },
    ],
    tips: [
      "Short (plain) forms are essential in Japanese. They are used in casual speech, before grammatical patterns like と思う and と言う, and in many other constructions.",
      "The ない-form of verbs follows a pattern: u-verbs change the final -u to -a and add ない (のむ→のまない). Exception: う-ending verbs use わない (かう→かわない).",
      "と思う is ONLY used for the speaker's own thoughts. For third-person thoughts, use と思っている (is thinking that ~).",
      "Japanese weather vocabulary is essential for daily conversation. Weather is one of the most common small-talk topics.",
    ],
    quiz: [
      {
        q: "Plain form of たべます is:",
        opts: ["たべる", "たべ", "たべます", "たべた"],
        a: 0,
      },
      {
        q: "'I think it's delicious' =",
        opts: [
          "おいしいとおもいます",
          "おいしくておもいます",
          "おいしいがおもいます",
          "おいしいですとおもいます",
        ],
        a: 0,
      },
      {
        q: "ない-form of のむ:",
        opts: ["のまない", "のみない", "のむない", "のめない"],
        a: 0,
      },
      {
        q: "'Please don't smoke' =",
        opts: [
          "たばこをすってください",
          "たばこをすわないでください",
          "たばこをすってはいけません",
          "たばこをすってもいいですか",
        ],
        a: 1,
      },
      {
        q: "'Tanaka said it was fun' =",
        opts: [
          "たなかさんはたのしいとおもいます",
          "たなかさんはたのしいといっていました",
          "たなかさんはたのしいですといいます",
          "たなかさんにたのしいといいました",
        ],
        a: 1,
      },
      {
        q: "'I like swimming' =",
        opts: [
          "およぐのがすきです",
          "およぐをすきです",
          "およぎがすきです",
          "およいですきです",
        ],
        a: 0,
      },
      {
        q: "ない-form of する:",
        opts: ["さない", "しない", "すない", "せない"],
        a: 1,
      },
      {
        q: "ない-form of ある:",
        opts: ["あらない", "ない", "ありない", "あない"],
        a: 1,
      },
    ],
    kanji: [
      {
        char: "山",
        on: "サン",
        kun: "やま",
        meaning: "mountain",
        examples: [
          { word: "山", reading: "やま", meaning: "mountain" },
          { word: "富士山", reading: "ふじさん", meaning: "Mt. Fuji" },
        ],
      },
      {
        char: "川",
        on: "セン",
        kun: "かわ",
        meaning: "river",
        examples: [
          { word: "川", reading: "かわ", meaning: "river" },
          { word: "山川", reading: "やまかわ", meaning: "mountains and rivers" },
        ],
      },
      {
        char: "天",
        on: "テン",
        kun: "あめ、あま",
        meaning: "sky; heaven",
        examples: [
          { word: "天気", reading: "てんき", meaning: "weather" },
          { word: "天ぷら", reading: "てんぷら", meaning: "tempura" },
        ],
      },
      {
        char: "気",
        on: "キ、ケ",
        kun: "",
        meaning: "spirit; mind; air",
        examples: [
          { word: "天気", reading: "てんき", meaning: "weather" },
          { word: "元気", reading: "げんき", meaning: "healthy" },
          { word: "人気", reading: "にんき", meaning: "popularity" },
        ],
      },
      {
        char: "雨",
        on: "ウ",
        kun: "あめ",
        meaning: "rain",
        examples: [
          { word: "雨", reading: "あめ", meaning: "rain" },
          { word: "大雨", reading: "おおあめ", meaning: "heavy rain" },
        ],
      },
      {
        char: "新",
        on: "シン",
        kun: "あたら.しい",
        meaning: "new",
        examples: [
          { word: "新しい", reading: "あたらしい", meaning: "new" },
          { word: "新聞", reading: "しんぶん", meaning: "newspaper" },
        ],
      },
      {
        char: "古",
        on: "コ",
        kun: "ふる.い",
        meaning: "old (things)",
        examples: [
          { word: "古い", reading: "ふるい", meaning: "old (things)" },
          { word: "中古", reading: "ちゅうこ", meaning: "secondhand" },
        ],
      },
      {
        char: "高",
        on: "コウ",
        kun: "たか.い",
        meaning: "tall; expensive",
        examples: [
          { word: "高い", reading: "たかい", meaning: "tall; expensive" },
          { word: "高校", reading: "こうこう", meaning: "high school" },
        ],
      },
      {
        char: "安",
        on: "アン",
        kun: "やす.い",
        meaning: "cheap; peaceful",
        examples: [
          { word: "安い", reading: "やすい", meaning: "cheap" },
          { word: "安心", reading: "あんしん", meaning: "relief" },
        ],
      },
      {
        char: "好",
        on: "コウ",
        kun: "す.き",
        meaning: "like; fond of",
        examples: [
          { word: "好き", reading: "すき", meaning: "to like" },
          { word: "大好き", reading: "だいすき", meaning: "to love" },
        ],
      },
      {
        char: "大",
        on: "ダイ、タイ",
        kun: "おお.きい",
        meaning: "big; large",
        examples: [
          { word: "大きい", reading: "おおきい", meaning: "big" },
          { word: "大学", reading: "だいがく", meaning: "university" },
        ],
      },
      {
        char: "小",
        on: "ショウ",
        kun: "ちい.さい、こ",
        meaning: "small; little",
        examples: [
          { word: "小さい", reading: "ちいさい", meaning: "small" },
          { word: "小学校", reading: "しょうがっこう", meaning: "elementary school" },
        ],
      },
    ],
    reading: [
      {
        title: "天気と予定",
        titleEn: "Weather and Plans",
        text: "明日友達とバーベキューをするつもりです。でも、天気予報は午後から雨だと言っていました。友達は「早く始めよう」と言っています。私もそう思います。天気がいいうちに食べたいですから。もし雨が降ったら、友達の家で映画を見るつもりです。料理をするのが好きなので、何か作ろうと思います。",
        translation: "I plan to have a barbecue with my friend tomorrow. But the weather forecast said it will rain from the afternoon. My friend is saying, 'Let's start early.' I think so too. Because I want to eat while the weather is nice. If it rains, I plan to watch a movie at my friend's house. Since I like cooking, I think I'll make something.",
        notes: [
          "と言っていました (reported speech) is used for what the weather forecast and friend said.",
          "～と思います is used for the speaker's own opinion and intention.",
          "Verb のが好き (like doing) describes the speaker's hobby of cooking.",
        ],
      },
    ],
  },

  // ─── Lesson 9: Kabuki ────────────────────────────────────────
  {
    id: "g1-l9",
    lesson: 9,
    title: "Kabuki",
    jp: "歌舞伎",
    book: "Genki I",
    xp: 100,
    coins: 22,
    vocab: [
      { j: "いろ", r: "色", e: "color" },
      { j: "しろい", r: "白い", e: "white" },
      { j: "くろい", r: "黒い", e: "black" },
      { j: "あかい", r: "赤い", e: "red" },
      { j: "あおい", r: "青い", e: "blue" },
      { j: "きいろい", r: "黄色い", e: "yellow" },
      { j: "うた", r: "歌", e: "song" },
      { j: "うたう", r: "歌う", e: "to sing (u-verb)" },
      { j: "おどる", r: "踊る", e: "to dance (u-verb)" },
      { j: "おわる", r: "終わる", e: "to end (u-verb)" },
      { j: "にんきがある", r: "人気がある", e: "to be popular" },
      { j: "はじまる", r: "始まる", e: "to begin (intrans.) (u-verb)" },
      { j: "ひく", r: "弾く", e: "to play (instrument) (u-verb)" },
      { j: "もらう", r: "もらう", e: "to receive (u-verb)" },
      { j: "あげる", r: "あげる", e: "to give (ru-verb)" },
      { j: "くれる", r: "くれる", e: "to give (to me) (ru-verb)" },
      { j: "できる", r: "出来る", e: "to be able to; can (ru-verb)" },
      { j: "さんぽする", r: "散歩する", e: "to take a walk" },
      { j: "せんたくする", r: "洗濯する", e: "to do laundry" },
      { j: "そうじする", r: "掃除する", e: "to clean (room)" },
      { j: "りょうりする", r: "料理する", e: "to cook" },
      { j: "ピアノ", r: "ピアノ", e: "piano" },
      { j: "ギター", r: "ギター", e: "guitar" },
      { j: "コンサート", r: "コンサート", e: "concert" },
      { j: "チケット", r: "チケット", e: "ticket" },
      { j: "よやく", r: "予約", e: "reservation" },
      { j: "ばしょ", r: "場所", e: "place; location" },
      { j: "すごい", r: "すごい", e: "amazing; incredible" },
      { j: "つまらない", r: "つまらない", e: "boring" },
      { j: "むずかしい", r: "難しい", e: "difficult" },
      { j: "やさしい", r: "易しい", e: "easy (not difficult)" },
      { j: "ながい", r: "長い", e: "long" },
      { j: "みじかい", r: "短い", e: "short (length)" },
      { j: "はじめて", r: "初めて", e: "for the first time" },
    ],
    grammar: [
      {
        pattern: "Past short forms",
        explanation:
          "Verb past plain: た-form (same sound changes as て-form but ends in た/だ). い-adj past: い→かった. な-adj/noun past: だった. Negative past: なかった (verbs/い-adj), じゃなかった (な-adj/noun).",
        examples: [
          {
            jp: "きのうえいがをみた。たのしかった。",
            tr: "I watched a movie yesterday. It was fun.",
          },
          {
            jp: "べんきょうしなかった。おもしろくなかった。",
            tr: "I didn't study. It wasn't interesting.",
          },
        ],
      },
      {
        pattern: "～たことがある",
        explanation:
          "Past plain form + ことがある = 'have (ever) done ~'. Expresses past experience. Negative: ～たことがない (have never done ~).",
        examples: [
          {
            jp: "かぶきをみたことがあります。",
            tr: "I have seen kabuki before.",
          },
          {
            jp: "おすしをつくったことがありません。",
            tr: "I have never made sushi.",
          },
        ],
      },
      {
        pattern: "～たり～たりする",
        explanation:
          "Past plain + り ... past plain + り + する = 'do things like ~ and ~'. Lists representative activities (non-exhaustive).",
        examples: [
          {
            jp: "やすみにほんをよんだり、えいがをみたりしました。",
            tr: "During the break, I did things like reading and watching movies.",
          },
        ],
      },
      {
        pattern: "～し、～し (listing reasons)",
        explanation:
          "Plain form + し connects multiple reasons or features. Usually ends with a concluding statement.",
        examples: [
          {
            jp: "あのレストランはやすいし、おいしいし、いつもいきます。",
            tr: "That restaurant is cheap and delicious, so I always go.",
          },
          {
            jp: "かぶきはながかったし、むずかしかったし、つかれました。",
            tr: "Kabuki was long and difficult, so I got tired.",
          },
        ],
      },
      {
        pattern: "～から (plain form reasoning)",
        explanation:
          "In casual speech, use plain form + から for 'because'. In polite speech, polite form + から is also acceptable.",
        examples: [
          {
            jp: "あめがふっているから、でかけない。",
            tr: "Because it's raining, I won't go out.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "かぶきをみたことがありますか。",
        tr: "Have you ever seen kabuki?",
      },
      {
        jp: "いいえ、ありません。どうでしたか。",
        tr: "No, I haven't. How was it?",
      },
      {
        jp: "すごくよかったです！でもむずかしかったし、ながかったし、ちょっとつかれました。",
        tr: "It was really good! But it was difficult and long, so I got a bit tired.",
      },
      {
        jp: "なんじかんぐらいでしたか。",
        tr: "About how many hours was it?",
      },
      {
        jp: "よじかんぐらいでした。でも、おんがくもきれいだったし、いしょうもすごかったです。",
        tr: "About four hours. But the music was beautiful and the costumes were amazing.",
      },
      {
        jp: "しゅうまつはなにをしましたか。",
        tr: "What did you do on the weekend?",
      },
      {
        jp: "ともだちとさんぽしたり、りょうりをしたりしました。",
        tr: "I did things like take walks and cook with my friend.",
      },
      {
        jp: "いいですね。こんどいっしょにかぶきをみましょう。",
        tr: "That's nice. Let's watch kabuki together next time.",
      },
    ],
    tips: [
      "The た-form uses the same consonant changes as the て-form: のむ→のんだ, かく→かいた, はなす→はなした, etc.",
      "～たことがある is about lifetime experience. Don't use it for recent events. Say きのうみた (I saw it yesterday), not きのうみたことがある.",
      "～たり～たりする implies the list is not exhaustive — there were other activities too. It's different from listing with て-form which implies sequential actions.",
      "Kabuki is a traditional Japanese theater form dating back to the Edo period, known for elaborate costumes, stylized acting, and all-male casts.",
      "～し can list both positive and negative reasons. It's very useful for explaining why you feel a certain way about something.",
    ],
    quiz: [
      {
        q: "Plain past of いく:",
        opts: ["いった", "いきた", "いいた", "いけた"],
        a: 0,
      },
      {
        q: "Past of い-adjective たのしい:",
        opts: [
          "たのしいた",
          "たのしかった",
          "たのしでした",
          "たのしだった",
        ],
        a: 1,
      },
      {
        q: "'I have been to Japan' =",
        opts: [
          "にほんにいきました",
          "にほんにいったことがあります",
          "にほんにいくことがあります",
          "にほんにいっていました",
        ],
        a: 1,
      },
      {
        q: "'It wasn't good' (plain past) =",
        opts: [
          "よくなかった",
          "よかったじゃない",
          "よくじゃなかった",
          "よいなかった",
        ],
        a: 0,
      },
      {
        q: "～し is used to:",
        opts: [
          "Give a single reason",
          "List multiple reasons or features",
          "Ask a question",
          "Express surprise",
        ],
        a: 1,
      },
      {
        q: "～たり～たりする implies:",
        opts: [
          "An exhaustive list",
          "A representative sample of activities",
          "Sequential actions",
          "Simultaneous actions",
        ],
        a: 1,
      },
      {
        q: "Plain past of な-adjective しずか:",
        opts: [
          "しずかかった",
          "しずかだった",
          "しずかでした",
          "しずかなかった",
        ],
        a: 1,
      },
      {
        q: "'I have never eaten natto' =",
        opts: [
          "なっとうをたべたことがありません",
          "なっとうをたべませんでした",
          "なっとうをたべることがありません",
          "なっとうをたべていません",
        ],
        a: 0,
      },
    ],
    kanji: [
      {
        char: "山",
        on: "サン",
        kun: "やま",
        meaning: "mountain",
        examples: [
          { word: "山", reading: "やま", meaning: "mountain" },
          { word: "富士山", reading: "ふじさん", meaning: "Mt. Fuji" },
          { word: "山田", reading: "やまだ", meaning: "Yamada (surname)" },
        ],
      },
      {
        char: "川",
        on: "セン",
        kun: "かわ",
        meaning: "river",
        examples: [
          { word: "川", reading: "かわ", meaning: "river" },
          { word: "小川", reading: "おがわ", meaning: "stream; Ogawa (surname)" },
        ],
      },
      {
        char: "大",
        on: "ダイ、タイ",
        kun: "おお.きい",
        meaning: "big; large",
        examples: [
          { word: "大きい", reading: "おおきい", meaning: "big" },
          { word: "大学", reading: "だいがく", meaning: "university" },
          { word: "大変", reading: "たいへん", meaning: "tough; very" },
        ],
      },
      {
        char: "小",
        on: "ショウ",
        kun: "ちい.さい、こ",
        meaning: "small; little",
        examples: [
          { word: "小さい", reading: "ちいさい", meaning: "small" },
          { word: "小学校", reading: "しょうがっこう", meaning: "elementary school" },
        ],
      },
      {
        char: "新",
        on: "シン",
        kun: "あたら.しい",
        meaning: "new",
        examples: [
          { word: "新しい", reading: "あたらしい", meaning: "new" },
          { word: "新聞", reading: "しんぶん", meaning: "newspaper" },
          { word: "新幹線", reading: "しんかんせん", meaning: "bullet train" },
        ],
      },
      {
        char: "古",
        on: "コ",
        kun: "ふる.い",
        meaning: "old (things)",
        examples: [
          { word: "古い", reading: "ふるい", meaning: "old (things)" },
          { word: "中古", reading: "ちゅうこ", meaning: "secondhand" },
        ],
      },
      {
        char: "高",
        on: "コウ",
        kun: "たか.い",
        meaning: "tall; expensive; high",
        examples: [
          { word: "高い", reading: "たかい", meaning: "tall; expensive" },
          { word: "高校", reading: "こうこう", meaning: "high school" },
        ],
      },
      {
        char: "安",
        on: "アン",
        kun: "やす.い",
        meaning: "cheap; peaceful",
        examples: [
          { word: "安い", reading: "やすい", meaning: "cheap" },
          { word: "安心", reading: "あんしん", meaning: "relief; peace of mind" },
        ],
      },
      {
        char: "好",
        on: "コウ",
        kun: "す.き",
        meaning: "like; fond of",
        examples: [
          { word: "好き", reading: "すき", meaning: "to like" },
          { word: "大好き", reading: "だいすき", meaning: "to love; to like a lot" },
        ],
      },
      {
        char: "天",
        on: "テン",
        kun: "あめ、あま",
        meaning: "sky; heaven",
        examples: [
          { word: "天気", reading: "てんき", meaning: "weather" },
          { word: "天ぷら", reading: "てんぷら", meaning: "tempura" },
        ],
      },
      {
        char: "気",
        on: "キ、ケ",
        kun: "",
        meaning: "spirit; mind; air",
        examples: [
          { word: "天気", reading: "てんき", meaning: "weather" },
          { word: "元気", reading: "げんき", meaning: "healthy; energetic" },
          { word: "気持ち", reading: "きもち", meaning: "feeling" },
        ],
      },
      {
        char: "雨",
        on: "ウ",
        kun: "あめ",
        meaning: "rain",
        examples: [
          { word: "雨", reading: "あめ", meaning: "rain" },
          { word: "大雨", reading: "おおあめ", meaning: "heavy rain" },
        ],
      },
    ],
    reading: [
      {
        title: "週末のこと",
        titleEn: "About the Weekend",
        text: "先週の週末は楽しかったです。土曜日に友達と歌舞伎を見に行きました。歌舞伎を見たことがなかったので、とてもわくわくしました。音楽がきれいだったし、衣装もすごかったし、感動しました。日曜日は友達の家で料理をしたり、散歩をしたりしました。天気がよかったから、公園まで歩きました。いい週末でした。",
        translation: "Last weekend was fun. On Saturday I went to see kabuki with my friend. I had never seen kabuki before, so I was very excited. The music was beautiful, and the costumes were amazing, so I was moved. On Sunday I did things like cooking and taking walks at my friend's house. Because the weather was nice, we walked to the park. It was a good weekend.",
        notes: [
          "～たことがなかった (had never done) is the past negative of the experience pattern.",
          "～し...～し lists multiple reasons (music was beautiful AND costumes were amazing).",
          "～たり～たりしました lists representative activities done on Sunday.",
        ],
      },
    ],
  },

  // ─── Lesson 10: Winter Vacation Plans ────────────────────────
  {
    id: "g1-l10",
    lesson: 10,
    title: "Winter Vacation Plans",
    jp: "冬休みの予定",
    book: "Genki I",
    xp: 105,
    coins: 23,
    vocab: [
      { j: "〜より", r: "〜より", e: "than ~" },
      { j: "〜のほうが", r: "〜の方が", e: "~ is more (of the two)" },
      { j: "いちばん", r: "一番", e: "the most; number one" },
      { j: "〜つもり", r: "〜つもり", e: "intend to ~; plan to ~" },
      { j: "もっと", r: "もっと", e: "more" },
      { j: "あと", r: "後", e: "after; later" },
      { j: "ちかい", r: "近い", e: "near; close" },
      { j: "とおい", r: "遠い", e: "far" },
      { j: "おおい", r: "多い", e: "many; a lot" },
      { j: "すくない", r: "少ない", e: "few; little" },
      { j: "はやい", r: "速い", e: "fast; quick" },
      { j: "おそい", r: "遅い", e: "slow; late" },
      { j: "わかい", r: "若い", e: "young" },
      { j: "あたらしい", r: "新しい", e: "new" },
      { j: "ふるい", r: "古い", e: "old (things)" },
      { j: "ひろい", r: "広い", e: "wide; spacious" },
      { j: "せまい", r: "狭い", e: "narrow; cramped" },
      { j: "くうこう", r: "空港", e: "airport" },
      { j: "のりもの", r: "乗り物", e: "vehicle; transportation" },
      { j: "ひこうき", r: "飛行機", e: "airplane" },
      { j: "ふね", r: "船", e: "ship; boat" },
      { j: "バス", r: "バス", e: "bus" },
      { j: "しんかんせん", r: "新幹線", e: "bullet train" },
      { j: "ちかてつ", r: "地下鉄", e: "subway" },
      { j: "えき", r: "駅", e: "station" },
      { j: "きっぷ", r: "切符", e: "ticket" },
      { j: "おみやげ", r: "お土産", e: "souvenir" },
      { j: "ふゆやすみ", r: "冬休み", e: "winter vacation" },
      { j: "なつやすみ", r: "夏休み", e: "summer vacation" },
      { j: "こんど", r: "今度", e: "next time; this time" },
      { j: "らいねん", r: "来年", e: "next year" },
      { j: "きょねん", r: "去年", e: "last year" },
      { j: "いろいろ", r: "色々", e: "various; all sorts of" },
      { j: "はじめて", r: "初めて", e: "for the first time" },
      { j: "〜じかん", r: "〜時間", e: "~ hours" },
    ],
    grammar: [
      {
        pattern: "A は B より ～ (comparison)",
        explanation:
          "A は B より + adjective = 'A is more ~ than B.' より marks the item being compared against.",
        examples: [
          {
            jp: "とうきょうはおおさかよりおおきいです。",
            tr: "Tokyo is bigger than Osaka.",
          },
          {
            jp: "にほんごはえいごよりむずかしいです。",
            tr: "Japanese is harder than English.",
          },
        ],
      },
      {
        pattern: "A と B と どちらが ～ / ～のほうが",
        explanation:
          "A と B と どちらが + adj + ですか = 'Which is more ~, A or B?' Answer with ～のほうが + adj + です.",
        examples: [
          {
            jp: "にくとさかなとどちらがすきですか。",
            tr: "Which do you like more, meat or fish?",
          },
          {
            jp: "さかなのほうがすきです。",
            tr: "I prefer fish.",
          },
        ],
      },
      {
        pattern: "～のなかで ～がいちばん ～ (superlative)",
        explanation:
          "～のなかで + topic + がいちばん + adj = 'Among ~, topic is the most ~.' For questions: なに/どこ/だれ + がいちばん.",
        examples: [
          {
            jp: "きせつのなかでなつがいちばんすきです。",
            tr: "Among seasons, I like summer the most.",
          },
          {
            jp: "にほんでどこがいちばんきれいですか。",
            tr: "Where in Japan is the most beautiful?",
          },
        ],
      },
      {
        pattern: "Adjective + の (noun substitution)",
        explanation:
          "の can replace a noun already mentioned. い-adj: adj + の. な-adj: adj + なの.",
        examples: [
          {
            jp: "おおきいのをください。",
            tr: "Please give me a big one.",
          },
          {
            jp: "しずかなのがいいです。",
            tr: "I'd like a quiet one.",
          },
        ],
      },
      {
        pattern: "～つもりです (intention/plan)",
        explanation:
          "Dictionary form + つもりです = 'I intend to ~.' Negative intention: ～ないつもりです (I intend not to ~).",
        examples: [
          {
            jp: "ふゆやすみにほっかいどうにいくつもりです。",
            tr: "I plan to go to Hokkaido during winter break.",
          },
          {
            jp: "おさけをのまないつもりです。",
            tr: "I intend not to drink alcohol.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "ふゆやすみはなにをするつもりですか。",
        tr: "What do you plan to do during winter break?",
      },
      {
        jp: "にほんにいくつもりです。はじめてです。",
        tr: "I plan to go to Japan. It's my first time.",
      },
      {
        jp: "いいですね！とうきょうとおおさかとどちらにいきますか。",
        tr: "Nice! Are you going to Tokyo or Osaka?",
      },
      {
        jp: "りょうほういくつもりです。でも、とうきょうのほうがながくいます。",
        tr: "I plan to go to both. But I'll stay longer in Tokyo.",
      },
      {
        jp: "にほんでなにがいちばんたのしみですか。",
        tr: "What are you most looking forward to in Japan?",
      },
      {
        jp: "やっぱりにほんのたべものです。おすしがいちばんたべたいです。",
        tr: "The food, of course. I want to eat sushi the most.",
      },
      {
        jp: "しんかんせんとひこうきとどちらがはやいですか。",
        tr: "Which is faster, the bullet train or the airplane?",
      },
      {
        jp: "ひこうきのほうがはやいですけど、しんかんせんのほうがべんりです。",
        tr: "The airplane is faster, but the bullet train is more convenient.",
      },
    ],
    tips: [
      "When comparing two things, use どちら (which of the two). For three or more, use どれ/どこ/だれ + がいちばん.",
      "つもり expresses personal intention, not official plans. For official schedules, use よてい (予定).",
      "The particle の after an adjective replaces a noun: あかいの (a red one), おおきいの (a big one). Very common in shopping.",
      "Japan's bullet train (しんかんせん) can travel over 300 km/h and connects major cities efficiently.",
      "おおい (many) and すくない (few) cannot directly modify nouns. Instead say: ひとがおおい (there are many people), not おおいひと.",
    ],
    quiz: [
      {
        q: "'Tokyo is bigger than Osaka' =",
        opts: [
          "とうきょうはおおさかよりおおきい",
          "おおさかはとうきょうよりおおきい",
          "とうきょうとおおさかはおおきい",
          "とうきょうがいちばんおおきい",
        ],
        a: 0,
      },
      {
        q: "'I plan to study' =",
        opts: [
          "べんきょうするつもりです",
          "べんきょうのつもりです",
          "べんきょうしたつもりです",
          "べんきょうできるつもりです",
        ],
        a: 0,
      },
      {
        q: "'Which is more delicious?' =",
        opts: [
          "どれがいちばんおいしいですか",
          "どちらのほうがおいしいですか",
          "どちらがおいしかったですか",
          "どのほうがおいしいですか",
        ],
        a: 1,
      },
      {
        q: "いちばん is used for:",
        opts: [
          "comparing two things",
          "superlative (best/most of all)",
          "listing reasons",
          "expressing intention",
        ],
        a: 1,
      },
      {
        q: "'Please give me a small one' =",
        opts: [
          "ちいさいをください",
          "ちいさいのをください",
          "ちいさなをください",
          "ちいさくをください",
        ],
        a: 1,
      },
      {
        q: "Negative intention: 'I don't plan to go' =",
        opts: [
          "いくつもりじゃないです",
          "いかないつもりです",
          "いくつもりません",
          "いったつもりです",
        ],
        a: 1,
      },
      {
        q: "'Among fruits, which do you like most?' =",
        opts: [
          "くだもののなかでなにがいちばんすきですか",
          "くだもののなかでどちらがすきですか",
          "くだもののどれがいちばんすきですか",
          "くだものはなにがすきですか",
        ],
        a: 0,
      },
      {
        q: "'Fish is more delicious than meat' =",
        opts: [
          "さかなよりにくがおいしい",
          "にくよりさかなのほうがおいしい",
          "さかなはにくよりおいしい",
          "Both B and C are correct",
        ],
        a: 3,
      },
    ],
    kanji: [
      {
        char: "食",
        on: "ショク",
        kun: "た.べる",
        meaning: "eat; food",
        examples: [
          { word: "食べる", reading: "たべる", meaning: "to eat" },
          { word: "食べ物", reading: "たべもの", meaning: "food" },
        ],
      },
      {
        char: "飲",
        on: "イン",
        kun: "の.む",
        meaning: "drink",
        examples: [
          { word: "飲む", reading: "のむ", meaning: "to drink" },
          { word: "飲み物", reading: "のみもの", meaning: "beverage" },
        ],
      },
      {
        char: "見",
        on: "ケン",
        kun: "み.る",
        meaning: "see; look",
        examples: [
          { word: "見る", reading: "みる", meaning: "to see; to watch" },
          { word: "花見", reading: "はなみ", meaning: "flower viewing" },
        ],
      },
      {
        char: "聞",
        on: "ブン",
        kun: "き.く",
        meaning: "hear; ask; listen",
        examples: [
          { word: "聞く", reading: "きく", meaning: "to listen; to ask" },
          { word: "新聞", reading: "しんぶん", meaning: "newspaper" },
        ],
      },
      {
        char: "読",
        on: "ドク",
        kun: "よ.む",
        meaning: "read",
        examples: [
          { word: "読む", reading: "よむ", meaning: "to read" },
          { word: "読書", reading: "どくしょ", meaning: "reading (books)" },
        ],
      },
      {
        char: "書",
        on: "ショ",
        kun: "か.く",
        meaning: "write",
        examples: [
          { word: "書く", reading: "かく", meaning: "to write" },
          { word: "辞書", reading: "じしょ", meaning: "dictionary" },
        ],
      },
      {
        char: "出",
        on: "シュツ",
        kun: "で.る、だ.す",
        meaning: "go out; put out",
        examples: [
          { word: "出る", reading: "でる", meaning: "to go out" },
          { word: "出口", reading: "でぐち", meaning: "exit" },
        ],
      },
      {
        char: "入",
        on: "ニュウ",
        kun: "はい.る、い.れる",
        meaning: "enter; put in",
        examples: [
          { word: "入る", reading: "はいる", meaning: "to enter" },
          { word: "入口", reading: "いりぐち", meaning: "entrance" },
        ],
      },
      {
        char: "帰",
        on: "キ",
        kun: "かえ.る",
        meaning: "return home",
        examples: [
          { word: "帰る", reading: "かえる", meaning: "to go home" },
          { word: "帰国", reading: "きこく", meaning: "returning to one's country" },
        ],
      },
      {
        char: "来",
        on: "ライ",
        kun: "く.る",
        meaning: "come; next",
        examples: [
          { word: "来る", reading: "くる", meaning: "to come" },
          { word: "来年", reading: "らいねん", meaning: "next year" },
        ],
      },
      {
        char: "行",
        on: "コウ",
        kun: "い.く",
        meaning: "go",
        examples: [
          { word: "行く", reading: "いく", meaning: "to go" },
          { word: "旅行", reading: "りょこう", meaning: "travel" },
        ],
      },
    ],
    reading: [
      {
        title: "冬休みの計画",
        titleEn: "Winter Vacation Plans",
        text: "もうすぐ冬休みです。私は日本に行くつもりです。東京と大阪に行きたいです。東京は大阪より大きいですが、大阪の食べ物のほうがおいしいと思います。日本で一番行きたいところは京都です。お寺がたくさんあるし、とてもきれいですから。新幹線と飛行機とどちらがいいか、まだ決めていません。新幹線のほうが便利ですが、飛行機のほうが速いです。",
        translation: "Winter vacation is coming soon. I plan to go to Japan. I want to go to Tokyo and Osaka. Tokyo is bigger than Osaka, but I think Osaka's food is more delicious. The place I most want to visit in Japan is Kyoto. Because there are many temples and it is very beautiful. I haven't decided yet whether the bullet train or airplane is better. The bullet train is more convenient, but the airplane is faster.",
        notes: [
          "This passage practices comparisons with より (than) and のほうが (more of the two).",
          "～つもりです shows the speaker's intention/plan for the vacation.",
          "～のなかで...一番 is used for the superlative (most want to visit).",
        ],
      },
    ],
  },

  // ─── Lesson 11: After the Vacation ───────────────────────────
  {
    id: "g1-l11",
    lesson: 11,
    title: "After the Vacation",
    jp: "休みのあと",
    book: "Genki I",
    xp: 110,
    coins: 25,
    vocab: [
      { j: "〜たい", r: "〜たい", e: "want to ~" },
      { j: "ほしい", r: "欲しい", e: "to want (object)" },
      { j: "なく", r: "泣く", e: "to cry (u-verb)" },
      { j: "わらう", r: "笑う", e: "to laugh (u-verb)" },
      { j: "みがく", r: "磨く", e: "to brush (teeth) (u-verb)" },
      { j: "やくそくする", r: "約束する", e: "to promise; make appointment" },
      { j: "いる", r: "居る", e: "to be; stay (ru-verb, animate)" },
      { j: "つくる", r: "作る", e: "to make (u-verb)" },
      { j: "もっていく", r: "持っていく", e: "to take (something)" },
      { j: "もってくる", r: "持ってくる", e: "to bring (something)" },
      { j: "きめる", r: "決める", e: "to decide (ru-verb)" },
      { j: "とる", r: "撮る", e: "to take (photo) (u-verb)" },
      { j: "さがす", r: "探す", e: "to look for (u-verb)" },
      { j: "いのる", r: "祈る", e: "to pray (u-verb)" },
      { j: "はじめる", r: "始める", e: "to start (ru-verb)" },
      { j: "じんじゃ", r: "神社", e: "shrine" },
      { j: "おてら", r: "お寺", e: "temple" },
      { j: "きょうかい", r: "教会", e: "church" },
      { j: "おまつり", r: "お祭り", e: "festival" },
      { j: "おしょうがつ", r: "お正月", e: "New Year" },
      { j: "おせちりょうり", r: "おせち料理", e: "New Year's food" },
      { j: "おもち", r: "お餅", e: "rice cake" },
      { j: "プレゼント", r: "プレゼント", e: "present; gift" },
      { j: "じぶん", r: "自分", e: "oneself" },
      { j: "たからもの", r: "宝物", e: "treasure" },
      { j: "けいけん", r: "経験", e: "experience" },
      { j: "きもち", r: "気持ち", e: "feeling" },
      { j: "こころ", r: "心", e: "heart; mind" },
      { j: "かんがえる", r: "考える", e: "to think (about) (ru-verb)" },
      { j: "ぜひ", r: "ぜひ", e: "by all means; definitely" },
      { j: "それに", r: "それに", e: "moreover; furthermore" },
      { j: "たとえば", r: "例えば", e: "for example" },
      { j: "ほかに", r: "他に", e: "in addition; besides" },
      { j: "そろそろ", r: "そろそろ", e: "soon; it's about time" },
    ],
    grammar: [
      {
        pattern: "～たい (want to do)",
        explanation:
          "Verb stem (ます-form minus ます) + たい = 'want to ~'. Conjugates like an い-adjective. The object can take either が or を. Only for the speaker's own desires.",
        examples: [
          {
            jp: "にほんにいきたいです。",
            tr: "I want to go to Japan.",
          },
          {
            jp: "おすしがたべたいです。",
            tr: "I want to eat sushi.",
          },
        ],
      },
      {
        pattern: "～たらどうですか (suggestion)",
        explanation:
          "Past plain form + ら + どうですか = 'how about ~ing?' or 'why don't you ~?' A polite way to give a suggestion.",
        examples: [
          {
            jp: "くすりをのんだらどうですか。",
            tr: "How about taking some medicine?",
          },
          {
            jp: "せんせいにきいたらどうですか。",
            tr: "Why don't you ask the teacher?",
          },
        ],
      },
      {
        pattern: "Giving: あげる / くれる / もらう",
        explanation:
          "あげる = give (I/someone → others). くれる = give (someone → me/my in-group). もらう = receive (I receive from someone). Direction matters!",
        examples: [
          {
            jp: "わたしはともだちにプレゼントをあげました。",
            tr: "I gave a present to my friend.",
          },
          {
            jp: "ともだちがわたしにプレゼントをくれました。",
            tr: "My friend gave me a present.",
          },
        ],
      },
      {
        pattern: "て-form + あげる / くれる / もらう",
        explanation:
          "Verb て-form + あげる/くれる/もらう expresses doing a favor. ～てあげる = do for someone. ～てくれる = someone does for me. ～てもらう = I have someone do.",
        examples: [
          {
            jp: "ともだちににほんごをおしえてあげました。",
            tr: "I taught Japanese to my friend (as a favor).",
          },
          {
            jp: "ははがおべんとうをつくってくれました。",
            tr: "My mother made me a lunch box.",
          },
        ],
      },
      {
        pattern: "ほしい (want something)",
        explanation:
          "ほしい = want (an object). It is an い-adjective. The desired object takes が. Only for the speaker's own wants. Third person: ほしがっている.",
        examples: [
          {
            jp: "あたらしいパソコンがほしいです。",
            tr: "I want a new computer.",
          },
          {
            jp: "なにがほしいですか。",
            tr: "What do you want?",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "やすみはどうでしたか。",
        tr: "How was your vacation?",
      },
      {
        jp: "とてもたのしかったです。きょうとにいきました。",
        tr: "It was very fun. I went to Kyoto.",
      },
      {
        jp: "きょうとでなにをしましたか。",
        tr: "What did you do in Kyoto?",
      },
      {
        jp: "おてらをみたり、おいしいものをたべたりしました。ともだちがおみやげをくれました。",
        tr: "I did things like visit temples and eat delicious food. My friend gave me a souvenir.",
      },
      {
        jp: "いいですね。わたしもきょうとにいきたいです。",
        tr: "That's nice. I also want to go to Kyoto.",
      },
      {
        jp: "ぜひいったらどうですか。はるがいちばんきれいですよ。",
        tr: "You should definitely go. Spring is the most beautiful.",
      },
      {
        jp: "こんどおすすめのばしょをおしえてください。",
        tr: "Please tell me some recommended places next time.",
      },
      {
        jp: "もちろん！しゃしんもみせてあげますよ。",
        tr: "Of course! I'll show you my photos too.",
      },
    ],
    tips: [
      "～たい is ONLY used for the speaker's own desires. For third person, use ～たがっている (seems to want to) or add そうです.",
      "The giving/receiving verbs (あげる/くれる/もらう) reflect social relationships. くれる is a special verb because it centers on the speaker as the recipient.",
      "～たらどうですか is a soft suggestion. Avoid it with superiors — it can sound condescending. Use ～たほうがいいです instead.",
      "When someone does you a favor, Japanese culture expects you to acknowledge it. て-form + くれる/もらう explicitly marks favors.",
      "ほしい directly states desire and can be too direct. In polite situations, use ～がほしいんですが… (trailing off) to soften it.",
    ],
    quiz: [
      {
        q: "'I want to eat sushi' =",
        opts: [
          "すしをたべほしい",
          "すしがたべたい",
          "すしをたべたい",
          "Both B and C are acceptable",
        ],
        a: 3,
      },
      {
        q: "'How about asking the teacher?' =",
        opts: [
          "せんせいにきいてください",
          "せんせいにきいたらどうですか",
          "せんせいにきいたいですか",
          "せんせいにきくことがあります",
        ],
        a: 1,
      },
      {
        q: "'My friend gave me a book' uses:",
        opts: ["あげる", "くれる", "もらう", "やる"],
        a: 1,
      },
      {
        q: "'I gave my friend a present' =",
        opts: [
          "ともだちにプレゼントをくれました",
          "ともだちにプレゼントをあげました",
          "ともだちがプレゼントをくれました",
          "ともだちにプレゼントをもらいました",
        ],
        a: 1,
      },
      {
        q: "ほしい conjugates like:",
        opts: [
          "a な-adjective",
          "an い-adjective",
          "a verb",
          "a noun",
        ],
        a: 1,
      },
      {
        q: "'My mother cooked for me' =",
        opts: [
          "ははがりょうりをしてあげました",
          "ははがりょうりをしてくれました",
          "ははにりょうりをしてもらいました",
          "Both B and C are correct",
        ],
        a: 3,
      },
      {
        q: "～たい can be used for:",
        opts: [
          "anyone's desires",
          "speaker's desires only",
          "third person only",
          "requests",
        ],
        a: 1,
      },
      {
        q: "'I want a new bag' =",
        opts: [
          "あたらしいかばんをほしい",
          "あたらしいかばんがほしいです",
          "あたらしいかばんにほしいです",
          "あたらしいかばんはほしいです",
        ],
        a: 1,
      },
    ],
    kanji: [
      {
        char: "食",
        on: "ショク",
        kun: "た.べる",
        meaning: "eat; food",
        examples: [
          { word: "食べる", reading: "たべる", meaning: "to eat" },
          { word: "食事", reading: "しょくじ", meaning: "meal" },
        ],
      },
      {
        char: "飲",
        on: "イン",
        kun: "の.む",
        meaning: "drink",
        examples: [
          { word: "飲む", reading: "のむ", meaning: "to drink" },
          { word: "飲み物", reading: "のみもの", meaning: "beverage" },
        ],
      },
      {
        char: "見",
        on: "ケン",
        kun: "み.る",
        meaning: "see; look",
        examples: [
          { word: "見る", reading: "みる", meaning: "to see" },
          { word: "見せる", reading: "みせる", meaning: "to show" },
        ],
      },
      {
        char: "読",
        on: "ドク",
        kun: "よ.む",
        meaning: "read",
        examples: [
          { word: "読む", reading: "よむ", meaning: "to read" },
          { word: "読書", reading: "どくしょ", meaning: "reading (books)" },
        ],
      },
      {
        char: "書",
        on: "ショ",
        kun: "か.く",
        meaning: "write",
        examples: [
          { word: "書く", reading: "かく", meaning: "to write" },
          { word: "辞書", reading: "じしょ", meaning: "dictionary" },
        ],
      },
      {
        char: "言",
        on: "ゲン、ゴン",
        kun: "い.う",
        meaning: "say; word",
        examples: [
          { word: "言う", reading: "いう", meaning: "to say" },
          { word: "言葉", reading: "ことば", meaning: "word; language" },
        ],
      },
      {
        char: "話",
        on: "ワ",
        kun: "はな.す、はなし",
        meaning: "talk; story",
        examples: [
          { word: "話す", reading: "はなす", meaning: "to speak" },
          { word: "電話", reading: "でんわ", meaning: "telephone" },
        ],
      },
      {
        char: "買",
        on: "バイ",
        kun: "か.う",
        meaning: "buy",
        examples: [
          { word: "買う", reading: "かう", meaning: "to buy" },
          { word: "買い物", reading: "かいもの", meaning: "shopping" },
        ],
      },
      {
        char: "出",
        on: "シュツ",
        kun: "で.る、だ.す",
        meaning: "go out; put out",
        examples: [
          { word: "出る", reading: "でる", meaning: "to go out" },
          { word: "出かける", reading: "でかける", meaning: "to go out (somewhere)" },
        ],
      },
      {
        char: "帰",
        on: "キ",
        kun: "かえ.る",
        meaning: "return home",
        examples: [
          { word: "帰る", reading: "かえる", meaning: "to go home" },
          { word: "帰国", reading: "きこく", meaning: "returning to one's country" },
        ],
      },
      {
        char: "来",
        on: "ライ",
        kun: "く.る",
        meaning: "come; next",
        examples: [
          { word: "来る", reading: "くる", meaning: "to come" },
          { word: "来年", reading: "らいねん", meaning: "next year" },
          { word: "来週", reading: "らいしゅう", meaning: "next week" },
        ],
      },
      {
        char: "行",
        on: "コウ",
        kun: "い.く",
        meaning: "go; carry out",
        examples: [
          { word: "行く", reading: "いく", meaning: "to go" },
          { word: "旅行", reading: "りょこう", meaning: "travel" },
          { word: "銀行", reading: "ぎんこう", meaning: "bank" },
        ],
      },
    ],
    reading: [
      {
        title: "京都への旅行",
        titleEn: "A Trip to Kyoto",
        text: "休みに京都に行きました。お寺を見たり、おいしいものを食べたりしました。友達がお土産をくれました。とてもうれしかったです。私も友達にお菓子をあげました。京都は春が一番きれいだと思います。桜がとてもきれいでした。また行きたいです。",
        translation: "I went to Kyoto during vacation. I did things like visiting temples and eating delicious food. My friend gave me a souvenir. I was very happy. I also gave sweets to my friend. I think Kyoto is most beautiful in spring. The cherry blossoms were very beautiful. I want to go again.",
        notes: [
          "This passage uses あげる/くれる to show the direction of giving between the speaker and friend.",
          "Notice ～たり～たりしました for listing representative activities.",
          "～たいです expresses the speaker's own desire (want to go again).",
        ],
      },
    ],
  },

  // ─── Lesson 12: Feeling Ill ──────────────────────────────────
  {
    id: "g1-l12",
    lesson: 12,
    title: "Feeling Ill",
    jp: "病気",
    book: "Genki I",
    xp: 115,
    coins: 26,
    vocab: [
      { j: "からだ", r: "体", e: "body" },
      { j: "あたま", r: "頭", e: "head" },
      { j: "め", r: "目", e: "eye" },
      { j: "みみ", r: "耳", e: "ear" },
      { j: "はな", r: "鼻", e: "nose" },
      { j: "くち", r: "口", e: "mouth" },
      { j: "は", r: "歯", e: "tooth" },
      { j: "のど", r: "喉", e: "throat" },
      { j: "おなか", r: "お腹", e: "stomach" },
      { j: "あし", r: "足", e: "foot; leg" },
      { j: "て", r: "手", e: "hand" },
      { j: "せなか", r: "背中", e: "back (body)" },
      { j: "かお", r: "顔", e: "face" },
      { j: "いたい", r: "痛い", e: "painful; hurts (i-adj)" },
      { j: "かぜ", r: "風邪", e: "cold (illness)" },
      { j: "かぜをひく", r: "風邪を引く", e: "to catch a cold" },
      { j: "ねつ", r: "熱", e: "fever" },
      { j: "ねつがある", r: "熱がある", e: "to have a fever" },
      { j: "せき", r: "咳", e: "cough" },
      { j: "せきがでる", r: "咳が出る", e: "to cough" },
      { j: "くすり", r: "薬", e: "medicine" },
      { j: "くすりをのむ", r: "薬を飲む", e: "to take medicine" },
      { j: "びょうき", r: "病気", e: "illness; disease" },
      { j: "びょういん", r: "病院", e: "hospital" },
      { j: "アレルギー", r: "アレルギー", e: "allergy" },
      { j: "けが", r: "怪我", e: "injury" },
      { j: "インフルエンザ", r: "インフルエンザ", e: "influenza" },
      { j: "だいじょうぶ", r: "大丈夫", e: "all right; OK" },
      { j: "しんぱい", r: "心配", e: "worry; concern" },
      { j: "しんぱいする", r: "心配する", e: "to worry" },
      { j: "やすむ", r: "休む", e: "to rest; be absent" },
      { j: "ねる", r: "寝る", e: "to sleep; lie down" },
      { j: "きをつける", r: "気をつける", e: "to be careful" },
      { j: "むり", r: "無理", e: "impossible; unreasonable" },
      { j: "むりをする", r: "無理をする", e: "to overdo it" },
      { j: "たいいん", r: "退院", e: "leaving the hospital" },
      { j: "にゅういん", r: "入院", e: "hospitalization" },
      { j: "おだいじに", r: "お大事に", e: "take care (to sick person)" },
    ],
    grammar: [
      {
        pattern: "～んです / ～のです (explanatory)",
        explanation:
          "Plain form + んです (spoken) / のです (written) explains a situation, gives a reason, or asks for an explanation. Very common and natural in conversation. な-adjectives and nouns use な before んです in present affirmative.",
        examples: [
          {
            jp: "あたまがいたいんです。",
            tr: "The thing is, I have a headache.",
          },
          {
            jp: "どうしたんですか。",
            tr: "What happened? / What's wrong?",
          },
        ],
      },
      {
        pattern: "～すぎる (too much)",
        explanation:
          "Verb stem + すぎる = 'do too much ~'. い-adjective (drop い) + すぎる = 'too ~'. な-adjective + すぎる = 'too ~'. すぎる itself conjugates as a ru-verb.",
        examples: [
          {
            jp: "きのうのみすぎました。",
            tr: "I drank too much yesterday.",
          },
          {
            jp: "このへやはあつすぎます。",
            tr: "This room is too hot.",
          },
        ],
      },
      {
        pattern: "～ほうがいいです (advice)",
        explanation:
          "Past plain + ほうがいいです = 'you'd better ~' (strong advice). ～ないほうがいいです = 'you'd better not ~'.",
        examples: [
          {
            jp: "びょういんにいったほうがいいですよ。",
            tr: "You'd better go to the hospital.",
          },
          {
            jp: "むりをしないほうがいいです。",
            tr: "You'd better not overdo it.",
          },
        ],
      },
      {
        pattern: "～ので (because; since)",
        explanation:
          "Plain form + ので = 'because/since ~'. More polite and objective than から. な-adjectives use な before ので; nouns use な before ので.",
        examples: [
          {
            jp: "ねつがあるので、がっこうをやすみます。",
            tr: "Since I have a fever, I'll be absent from school.",
          },
          {
            jp: "びょうきなので、いきません。",
            tr: "Because I'm sick, I won't go.",
          },
        ],
      },
      {
        pattern: "～なければいけない / ～なくてはいけない (must)",
        explanation:
          "ない-form (drop い) + ければいけない/なくてはいけない = 'must ~; have to ~'. Casual: ～なきゃ. Both forms express obligation.",
        examples: [
          {
            jp: "くすりをのまなければいけません。",
            tr: "I must take medicine.",
          },
          {
            jp: "はやくねなくてはいけません。",
            tr: "I have to go to bed early.",
          },
        ],
      },
      {
        pattern: "～なくてもいいです (don't have to)",
        explanation:
          "ない-form (drop い) + くてもいいです = 'don't have to ~; it's OK not to ~'.",
        examples: [
          {
            jp: "あしたこなくてもいいですよ。",
            tr: "You don't have to come tomorrow.",
          },
          {
            jp: "むりしなくてもいいです。",
            tr: "You don't have to push yourself.",
          },
        ],
      },
    ],
    dialogue: [
      {
        jp: "どうしたんですか。かおいろがわるいですよ。",
        tr: "What's wrong? You look pale.",
      },
      {
        jp: "じつはきのうからあたまがいたいんです。ねつもあるんです。",
        tr: "Actually, I've had a headache since yesterday. I also have a fever.",
      },
      {
        jp: "それはたいへんですね。くすりをのみましたか。",
        tr: "That's rough. Did you take medicine?",
      },
      {
        jp: "いいえ、まだです。",
        tr: "No, not yet.",
      },
      {
        jp: "くすりをのんだほうがいいですよ。びょういんにもいったほうがいいとおもいます。",
        tr: "You should take medicine. I also think you should go to the hospital.",
      },
      {
        jp: "でも、きょうのじゅぎょうにでなければいけないんです。",
        tr: "But I have to attend today's class.",
      },
      {
        jp: "むりしないほうがいいですよ。びょうきのときはやすまなければいけません。",
        tr: "You shouldn't overdo it. When you're sick, you have to rest.",
      },
      {
        jp: "そうですね…。じゃあ、きょうはやすみます。おだいじに、ありがとう。",
        tr: "You're right... OK, I'll rest today. Take care — thank you.",
      },
    ],
    tips: [
      "～んです is one of the most important patterns in natural Japanese. It adds nuance of 'the situation is...' and makes speech sound natural. どうしたんですか (What happened?) is far more natural than どうしましたか.",
      "When giving advice, use た-form + ほうがいい (positive advice) or ない + ほうがいい (negative advice). The past tense (た) is used even for future-oriented advice.",
      "おだいじに (please take care) is the standard thing to say to someone who is sick. It's short for おだいじにしてください.",
      "Japanese people often go to the hospital (びょういん) even for minor illnesses. It functions more like a clinic in the West.",
      "～ので is more formal and objective than ～から for giving reasons. Use ので in polite/written contexts and から in casual speech.",
    ],
    quiz: [
      {
        q: "～んです is mainly used to:",
        opts: [
          "give a command",
          "explain a situation",
          "express desire",
          "show past tense",
        ],
        a: 1,
      },
      {
        q: "'I must go' (obligation) =",
        opts: [
          "いってもいい",
          "いかなくてもいい",
          "いかなければいけない",
          "いかないといい",
        ],
        a: 2,
      },
      {
        q: "'You don't have to come' =",
        opts: [
          "こなくてはいけない",
          "こなくてもいいです",
          "こないといけない",
          "くるなくていい",
        ],
        a: 1,
      },
      {
        q: "'I have a fever' =",
        opts: [
          "ねつがいます",
          "ねつをあります",
          "ねつがあります",
          "ねつになります",
        ],
        a: 2,
      },
      {
        q: "'Too expensive' =",
        opts: ["たかくてすぎ", "たかすぎる", "たかいすぎ", "すぎたかい"],
        a: 1,
      },
      {
        q: "'You should go to the hospital' =",
        opts: [
          "びょういんにいくほうがいい",
          "びょういんにいったほうがいい",
          "びょういんにいってほうがいい",
          "びょういんにいきほうがいい",
        ],
        a: 1,
      },
      {
        q: "～ので is compared to ～から:",
        opts: [
          "More casual",
          "More polite/objective",
          "More emotional",
          "Identical in usage",
        ],
        a: 1,
      },
      {
        q: "'I ate too much' =",
        opts: [
          "たべすぎました",
          "たべたすぎます",
          "たべるすぎました",
          "たべもすぎました",
        ],
        a: 0,
      },
    ],
    kanji: [
      {
        char: "食",
        on: "ショク",
        kun: "た.べる",
        meaning: "eat; food",
        examples: [
          { word: "食べる", reading: "たべる", meaning: "to eat" },
          { word: "食べ物", reading: "たべもの", meaning: "food" },
          { word: "食堂", reading: "しょくどう", meaning: "dining hall" },
        ],
      },
      {
        char: "飲",
        on: "イン",
        kun: "の.む",
        meaning: "drink",
        examples: [
          { word: "飲む", reading: "のむ", meaning: "to drink" },
          { word: "飲み物", reading: "のみもの", meaning: "beverage" },
        ],
      },
      {
        char: "見",
        on: "ケン",
        kun: "み.る",
        meaning: "see; look",
        examples: [
          { word: "見る", reading: "みる", meaning: "to see" },
          { word: "見せる", reading: "みせる", meaning: "to show" },
          { word: "花見", reading: "はなみ", meaning: "flower viewing" },
        ],
      },
      {
        char: "聞",
        on: "ブン",
        kun: "き.く",
        meaning: "hear; ask; listen",
        examples: [
          { word: "聞く", reading: "きく", meaning: "to listen; to ask" },
          { word: "新聞", reading: "しんぶん", meaning: "newspaper" },
        ],
      },
      {
        char: "読",
        on: "ドク",
        kun: "よ.む",
        meaning: "read",
        examples: [
          { word: "読む", reading: "よむ", meaning: "to read" },
          { word: "読書", reading: "どくしょ", meaning: "reading (books)" },
        ],
      },
      {
        char: "書",
        on: "ショ",
        kun: "か.く",
        meaning: "write",
        examples: [
          { word: "書く", reading: "かく", meaning: "to write" },
          { word: "辞書", reading: "じしょ", meaning: "dictionary" },
          { word: "図書館", reading: "としょかん", meaning: "library" },
        ],
      },
      {
        char: "言",
        on: "ゲン、ゴン",
        kun: "い.う",
        meaning: "say; word",
        examples: [
          { word: "言う", reading: "いう", meaning: "to say" },
          { word: "言葉", reading: "ことば", meaning: "word; language" },
        ],
      },
      {
        char: "話",
        on: "ワ",
        kun: "はな.す、はなし",
        meaning: "talk; story",
        examples: [
          { word: "話す", reading: "はなす", meaning: "to speak" },
          { word: "電話", reading: "でんわ", meaning: "telephone" },
          { word: "会話", reading: "かいわ", meaning: "conversation" },
        ],
      },
      {
        char: "買",
        on: "バイ",
        kun: "か.う",
        meaning: "buy",
        examples: [
          { word: "買う", reading: "かう", meaning: "to buy" },
          { word: "買い物", reading: "かいもの", meaning: "shopping" },
        ],
      },
      {
        char: "出",
        on: "シュツ",
        kun: "で.る、だ.す",
        meaning: "go out; put out",
        examples: [
          { word: "出る", reading: "でる", meaning: "to go out; to appear" },
          { word: "出す", reading: "だす", meaning: "to take out; to submit" },
          { word: "出口", reading: "でぐち", meaning: "exit" },
        ],
      },
      {
        char: "入",
        on: "ニュウ",
        kun: "はい.る、い.れる",
        meaning: "enter; put in",
        examples: [
          { word: "入る", reading: "はいる", meaning: "to enter" },
          { word: "入れる", reading: "いれる", meaning: "to put in" },
          { word: "入口", reading: "いりぐち", meaning: "entrance" },
        ],
      },
      {
        char: "帰",
        on: "キ",
        kun: "かえ.る",
        meaning: "return home",
        examples: [
          { word: "帰る", reading: "かえる", meaning: "to go home" },
          { word: "帰国", reading: "きこく", meaning: "returning to one's country" },
        ],
      },
      {
        char: "来",
        on: "ライ",
        kun: "く.る",
        meaning: "come; next",
        examples: [
          { word: "来る", reading: "くる", meaning: "to come" },
          { word: "来週", reading: "らいしゅう", meaning: "next week" },
          { word: "来年", reading: "らいねん", meaning: "next year" },
        ],
      },
      {
        char: "行",
        on: "コウ、ギョウ",
        kun: "い.く、おこな.う",
        meaning: "go; carry out",
        examples: [
          { word: "行く", reading: "いく", meaning: "to go" },
          { word: "旅行", reading: "りょこう", meaning: "travel" },
          { word: "銀行", reading: "ぎんこう", meaning: "bank" },
        ],
      },
    ],
    reading: [
      {
        title: "先週の病気",
        titleEn: "Last Week's Illness",
        text: "先週、風邪を引いてしまいました。頭が痛いし、熱もあったので、大学を休みました。友達が「病院に行ったほうがいいよ」と言ってくれました。それで、病院に行って、薬をもらいました。お医者さんに「たくさん寝なければいけません。無理をしないほうがいいですよ」と言われました。三日間うちで寝ていました。母が毎日おかゆを作ってくれました。今はもう元気です。来週からまた学校に行くつもりです。",
        translation: "Last week, I caught a cold. My head hurt and I had a fever, so I was absent from university. My friend told me I should go to the hospital. So I went to the hospital and received medicine. The doctor told me I must sleep a lot and that I shouldn't push myself. I slept at home for three days. My mother made rice porridge for me every day. Now I'm already well. I plan to go to school again from next week.",
        notes: [
          "This passage uses ～ので (since/because) to give reasons, and ～ほうがいい for advice.",
          "Notice ～てくれました (did something for me as a favor) with both the friend's advice and the mother's cooking.",
          "～なければいけません (must) expresses the doctor's obligation/instruction.",
        ],
      },
    ],
  },
];
