import type { Lesson } from "../types";

export const QUARTET1: Lesson[] = [
  // ============================================================
  // Lesson 1: Famous Japanese Figures / Admired People
  // ============================================================
  {
    id: "q1-l1",
    lesson: 1,
    title: "Famous Japanese Figures",
    jp: "あこがれの人",
    book: "Quartet I",
    xp: 165,
    coins: 40,
    vocab: [
      {j:"あこがれ",r:"憧れ",e:"admiration; longing"},
      {j:"じんぶつ",r:"人物",e:"person; figure; character"},
      {j:"えいきょう",r:"影響",e:"influence; effect"},
      {j:"ぎょうせき",r:"業績",e:"achievement; accomplishment"},
      {j:"こうけん",r:"貢献",e:"contribution"},
      {j:"かつやく",r:"活躍",e:"active role; great efforts"},
      {j:"さくひん",r:"作品",e:"work (of art/literature)"},
      {j:"じゅしょう",r:"受賞",e:"winning a prize"},
      {j:"ノーベルしょう",r:"ノーベル賞",e:"Nobel Prize"},
      {j:"かんとく",r:"監督",e:"director; supervisor"},
      {j:"けんきゅうしゃ",r:"研究者",e:"researcher"},
      {j:"はつめい",r:"発明",e:"invention"},
      {j:"はっけん",r:"発見",e:"discovery"},
      {j:"せいかく",r:"性格",e:"personality; character"},
      {j:"まじめ",r:"真面目",e:"serious; diligent"},
      {j:"どりょく",r:"努力",e:"effort; endeavor"},
      {j:"さいのう",r:"才能",e:"talent; ability"},
      {j:"そんけい",r:"尊敬",e:"respect; esteem"},
      {j:"でんき",r:"伝記",e:"biography"},
      {j:"けいけん",r:"経験",e:"experience"},
      {j:"しょうがい",r:"生涯",e:"lifetime; one's whole life"},
      {j:"せいちょう",r:"成長",e:"growth; development"},
      {j:"ぶんや",r:"分野",e:"field; area; domain"},
      {j:"せかいてき",r:"世界的",e:"worldwide; global"},
      {j:"ゆうめい",r:"有名",e:"famous; well-known"},
      {j:"りっぱ",r:"立派",e:"splendid; admirable"},
      {j:"こころざし",r:"志",e:"ambition; aspiration"},
      {j:"めざす",r:"目指す",e:"to aim for"},
      {j:"とりくむ",r:"取り組む",e:"to tackle; to work on"},
      {j:"みとめる",r:"認める",e:"to recognize; to acknowledge"},
      {j:"こえる",r:"越える",e:"to exceed; to surpass"},
      {j:"うみだす",r:"生み出す",e:"to create; to produce"},
      {j:"つたえる",r:"伝える",e:"to convey; to transmit"},
      {j:"ほうそう",r:"放送",e:"broadcast"},
      {j:"しゅっぱん",r:"出版",e:"publication"},
      {j:"ぶんがく",r:"文学",e:"literature"},
      {j:"かがく",r:"科学",e:"science"},
      {j:"いがく",r:"医学",e:"medicine; medical science"},
      {j:"きっかけ",r:"きっかけ",e:"trigger; opportunity"},
      {j:"しょうらい",r:"将来",e:"future"},
      {j:"せいこう",r:"成功",e:"success"},
      {j:"こんなん",r:"困難",e:"difficulty; hardship"},
      {j:"のりこえる",r:"乗り越える",e:"to overcome"},
      {j:"しめす",r:"示す",e:"to show; to indicate"},
      {j:"よのなか",r:"世の中",e:"society; the world"},
    ],
    grammar: [
      {
        p: "Nといえば",
        explanation: "Used to introduce a well-known topic or association. 'Speaking of N / When it comes to N'",
        examples: [
          {jp:"日本の映画といえば、宮崎駿が有名です。",tr:"Speaking of Japanese films, Miyazaki Hayao is famous."},
          {jp:"ノーベル賞といえば、日本人の受賞者も多い。",tr:"When it comes to the Nobel Prize, there are many Japanese winners too."},
        ],
        note: "Often used to bring up a topic the listener would naturally associate with."
      },
      {
        p: "〜なら",
        explanation: "Conditional 'if' that picks up on a topic the listener mentioned. Implies 'if that's what you're talking about'.",
        examples: [
          {jp:"伝記を読むなら、この本がおすすめです。",tr:"If you're going to read a biography, I recommend this book."},
          {jp:"科学者なら、山中伸弥先生が尊敬されている。",tr:"If we're talking about scientists, Professor Yamanaka Shinya is respected."},
        ],
        note: "Different from たら/ば; なら picks up a previously mentioned topic."
      },
      {
        p: "〜とおり(に) / Nどおり(に)",
        explanation: "Means 'exactly as; in the way that'. Used to describe doing something in accordance with something.",
        examples: [
          {jp:"先生が言ったとおりにやってみた。",tr:"I tried doing it exactly as the teacher said."},
          {jp:"予定どおりに進んでいる。",tr:"Things are proceeding as planned."},
        ],
        note: "とおり follows verbs; どおり attaches to nouns."
      },
      {
        p: "〜らしい (hearsay)",
        explanation: "Indicates information heard from an external source. 'It seems; apparently'.",
        examples: [
          {jp:"宮崎監督は引退を撤回したらしい。",tr:"Apparently Director Miyazaki withdrew his retirement."},
          {jp:"あの研究者は来月受賞するらしい。",tr:"I hear that researcher will receive an award next month."},
        ],
        note: "Based on external evidence or information, not the speaker's own impression."
      },
      {
        p: "〜らしい (typicality)",
        explanation: "Expresses that something is typical of or befitting the noun. 'Like a real N; N-like'.",
        examples: [
          {jp:"彼女は科学者らしい人だ。",tr:"She is a person befitting a scientist (a true scientist type)."},
          {jp:"子供らしい発想だ。",tr:"That's a child-like idea."},
        ],
        note: "Attaches to nouns to mean 'typical of that noun'."
      },
      {
        p: "〜ために / 〜ためのN (purpose)",
        explanation: "Expresses purpose: 'in order to'. The subject of both clauses must be the same.",
        examples: [
          {jp:"研究を続けるために、アメリカに留学した。",tr:"In order to continue research, I studied abroad in America."},
          {jp:"夢を実現するための努力を続けた。",tr:"He continued efforts to realize his dream."},
        ],
        note: "Volitional verbs only for purpose. Differs from ため (reason/cause)."
      },
      {
        p: "〜がきっかけで",
        explanation: "Expresses a trigger or catalyst event. 'Triggered by; as a result of the opportunity'.",
        examples: [
          {jp:"あの映画がきっかけで、日本に興味を持った。",tr:"That movie was what sparked my interest in Japan."},
          {jp:"留学がきっかけで、研究者になった。",tr:"Studying abroad was the catalyst for becoming a researcher."},
        ],
        note: "The event before がきっかけで is the trigger for what follows."
      },
      {
        p: "〜ようになる",
        explanation: "Describes a change of state over time. 'Come to do; reach the point where'.",
        examples: [
          {jp:"毎日練習して、上手に描けるようになった。",tr:"By practicing every day, I came to be able to draw well."},
          {jp:"彼の作品は世界中で知られるようになった。",tr:"His works came to be known throughout the world."},
        ],
        note: "Expresses gradual change. Used with potential or intransitive verbs."
      },
      {
        p: "〜ようにする",
        explanation: "Expresses a conscious effort or habit. 'Make an effort to; try to'.",
        examples: [
          {jp:"毎日本を読むようにしている。",tr:"I make an effort to read books every day."},
          {jp:"遅刻しないようにしている。",tr:"I try not to be late."},
        ],
        note: "Emphasizes deliberate effort. ている form = habitual effort."
      },
      {
        p: "Nによると",
        explanation: "Cites the source of information. 'According to N'.",
        examples: [
          {jp:"新聞によると、来年新しい映画が公開される。",tr:"According to the newspaper, a new film will be released next year."},
          {jp:"伝記によると、彼は子供のころから絵が好きだった。",tr:"According to the biography, he liked drawing since childhood."},
        ],
        note: "Often paired with そうだ or らしい at sentence end."
      },
    ],
    kanji: [
      {char:"憧",on:"ショウ",kun:"あこが-れる",meaning:"yearn; admire",examples:[{word:"憧れ",reading:"あこがれ",meaning:"admiration"},{word:"憧れる",reading:"あこがれる",meaning:"to admire"}]},
      {char:"影",on:"エイ",kun:"かげ",meaning:"shadow; influence",examples:[{word:"影響",reading:"えいきょう",meaning:"influence"},{word:"影",reading:"かげ",meaning:"shadow"}]},
      {char:"響",on:"キョウ",kun:"ひび-く",meaning:"echo; resound",examples:[{word:"影響",reading:"えいきょう",meaning:"influence"},{word:"響く",reading:"ひびく",meaning:"to resound"}]},
      {char:"績",on:"セキ",kun:"",meaning:"achievements",examples:[{word:"業績",reading:"ぎょうせき",meaning:"achievements"},{word:"成績",reading:"せいせき",meaning:"grades"}]},
      {char:"貢",on:"コウ",kun:"みつ-ぐ",meaning:"contribute",examples:[{word:"貢献",reading:"こうけん",meaning:"contribution"}]},
      {char:"献",on:"ケン・コン",kun:"",meaning:"offering;献",examples:[{word:"貢献",reading:"こうけん",meaning:"contribution"},{word:"献血",reading:"けんけつ",meaning:"blood donation"}]},
      {char:"躍",on:"ヤク",kun:"おど-る",meaning:"leap; active",examples:[{word:"活躍",reading:"かつやく",meaning:"active role"},{word:"躍動",reading:"やくどう",meaning:"dynamism"}]},
      {char:"賞",on:"ショウ",kun:"",meaning:"prize; praise",examples:[{word:"受賞",reading:"じゅしょう",meaning:"winning a prize"},{word:"賞品",reading:"しょうひん",meaning:"prize"}]},
      {char:"督",on:"トク",kun:"",meaning:"supervise",examples:[{word:"監督",reading:"かんとく",meaning:"director"},{word:"総督",reading:"そうとく",meaning:"governor-general"}]},
      {char:"研",on:"ケン",kun:"と-ぐ",meaning:"polish; study",examples:[{word:"研究",reading:"けんきゅう",meaning:"research"},{word:"研究者",reading:"けんきゅうしゃ",meaning:"researcher"}]},
      {char:"究",on:"キュウ",kun:"きわ-める",meaning:"investigate",examples:[{word:"研究",reading:"けんきゅう",meaning:"research"},{word:"究極",reading:"きゅうきょく",meaning:"ultimate"}]},
      {char:"発",on:"ハツ",kun:"",meaning:"emit; departure",examples:[{word:"発明",reading:"はつめい",meaning:"invention"},{word:"発見",reading:"はっけん",meaning:"discovery"}]},
      {char:"明",on:"メイ・ミョウ",kun:"あか-るい",meaning:"bright; clear",examples:[{word:"発明",reading:"はつめい",meaning:"invention"},{word:"説明",reading:"せつめい",meaning:"explanation"}]},
      {char:"格",on:"カク",kun:"",meaning:"status; character",examples:[{word:"性格",reading:"せいかく",meaning:"personality"},{word:"格好",reading:"かっこう",meaning:"appearance"}]},
      {char:"努",on:"ド",kun:"つと-める",meaning:"strive; effort",examples:[{word:"努力",reading:"どりょく",meaning:"effort"}]},
      {char:"才",on:"サイ",kun:"",meaning:"talent; age",examples:[{word:"才能",reading:"さいのう",meaning:"talent"},{word:"天才",reading:"てんさい",meaning:"genius"}]},
      {char:"尊",on:"ソン",kun:"たっと-い",meaning:"precious; respect",examples:[{word:"尊敬",reading:"そんけい",meaning:"respect"},{word:"尊い",reading:"とうとい",meaning:"precious"}]},
      {char:"敬",on:"ケイ",kun:"うやま-う",meaning:"respect",examples:[{word:"尊敬",reading:"そんけい",meaning:"respect"},{word:"敬語",reading:"けいご",meaning:"honorific language"}]},
      {char:"伝",on:"デン",kun:"つた-える",meaning:"transmit; legend",examples:[{word:"伝記",reading:"でんき",meaning:"biography"},{word:"伝える",reading:"つたえる",meaning:"to convey"}]},
      {char:"涯",on:"ガイ",kun:"",meaning:"shore; career",examples:[{word:"生涯",reading:"しょうがい",meaning:"lifetime"}]},
      {char:"志",on:"シ",kun:"こころざし",meaning:"aspiration; will",examples:[{word:"志",reading:"こころざし",meaning:"ambition"},{word:"志望",reading:"しぼう",meaning:"aspiration"}]},
      {char:"認",on:"ニン",kun:"みと-める",meaning:"recognize",examples:[{word:"認める",reading:"みとめる",meaning:"to recognize"},{word:"確認",reading:"かくにん",meaning:"confirmation"}]},
      {char:"版",on:"ハン",kun:"",meaning:"printing; edition",examples:[{word:"出版",reading:"しゅっぱん",meaning:"publication"},{word:"版画",reading:"はんが",meaning:"woodblock print"}]},
      {char:"科",on:"カ",kun:"",meaning:"department; course",examples:[{word:"科学",reading:"かがく",meaning:"science"},{word:"教科書",reading:"きょうかしょ",meaning:"textbook"}]},
      {char:"医",on:"イ",kun:"",meaning:"medicine; doctor",examples:[{word:"医学",reading:"いがく",meaning:"medical science"},{word:"医者",reading:"いしゃ",meaning:"doctor"}]},
    ],
    reading: [
      {
        title: "あこがれの人—宮崎駿",
        titleEn: "A Person I Admire — Hayao Miyazaki",
        text: "私があこがれる人物は、映画監督の宮崎駿だ。宮崎監督といえば、「となりのトトロ」や「千と千尋の神隠し」などの作品で世界的に知られている。新聞によると、「千と千尋の神隠し」はアカデミー賞を受賞した最初の日本のアニメだったらしい。宮崎監督は子供のころから絵を描くのが好きで、大学を卒業した後、アニメーターになった。それがきっかけで、自分の作品を作るようになった。彼の作品には、自然を大切にするというメッセージが込められている。困難を乗り越えて夢を実現するために努力し続けた宮崎監督の生涯は、多くの人に影響を与えている。",
        translation: "The person I admire is film director Hayao Miyazaki. Speaking of Director Miyazaki, he is known worldwide for works such as 'My Neighbor Totoro' and 'Spirited Away.' According to the newspaper, 'Spirited Away' was apparently the first Japanese anime to win an Academy Award. Director Miyazaki liked drawing from childhood, and after graduating from university, he became an animator. That became the catalyst for him to start creating his own works. His works contain the message that we should value nature. Director Miyazaki's life, in which he continued to make efforts to overcome difficulties and realize his dreams, has influenced many people.",
        notes: [
          "Notice the use of といえば to introduce a well-known association.",
          "によると + らしい is used to cite an information source.",
          "がきっかけで shows the trigger event for his career.",
          "ようになった describes the gradual change in his career."
        ]
      }
    ],
    dialogue: [
      {jp:"A: あこがれの人はいますか。",tr:"A: Is there anyone you admire?"},
      {jp:"B: はい、宮崎駿監督です。日本の映画といえば、やはり宮崎監督だと思います。",tr:"B: Yes, Director Miyazaki Hayao. Speaking of Japanese films, I think it has to be Director Miyazaki."},
      {jp:"A: どうして宮崎監督にあこがれるようになったんですか。",tr:"A: How did you come to admire Director Miyazaki?"},
      {jp:"B: 子供のとき「となりのトトロ」を見たのがきっかけで、ファンになりました。",tr:"B: Watching 'My Neighbor Totoro' as a child was the catalyst for becoming a fan."},
      {jp:"A: そうですか。宮崎監督はどんな性格の人らしいですか。",tr:"A: I see. What kind of personality does Director Miyazaki seem to have?"},
      {jp:"B: 伝記によると、とても真面目で、作品を作るために毎日何時間も絵を描くらしいです。",tr:"B: According to a biography, he is very serious and apparently draws for many hours every day to create his works."},
      {jp:"A: まさに努力の人ですね。私も見習うようにしたいです。",tr:"A: He is truly a person of effort. I want to try to follow his example."},
      {jp:"B: そうですね。あきらめないで努力すれば、夢は実現できると思います。",tr:"B: Indeed. I think if you keep trying without giving up, you can realize your dreams."},
    ],
    tips: [
      "Nといえば is a great conversation starter to introduce a well-known topic.",
      "〜らしい has two distinct uses: hearsay ('apparently') and typicality ('befitting of'). Context is key.",
      "〜ようになる (gradual change) vs 〜ようにする (deliberate effort) — learn to distinguish them.",
      "がきっかけで links a trigger event to a result — useful for talking about turning points.",
      "Nによると cites a source and is often paired with そうだ or らしい at sentence end.",
      "〜とおりに follows verbs; Nどおりに attaches to nouns. Both mean 'exactly as'.",
    ],
    quiz: [
      {q:"日本のアニメ___、宮崎駿が有名だ。",opts:["といえば","にとって","として","について"],a:0},
      {q:"伝記を読む___、この本がいい。",opts:["なら","ので","から","ために"],a:0},
      {q:"先生が言った___にやってください。",opts:["とおり","ように","まま","ほど"],a:0},
      {q:"新聞___、来月新しい映画が出る。",opts:["によると","について","のために","にとって"],a:0},
      {q:"あの映画が___、日本語を勉強し始めた。",opts:["きっかけで","ために","ように","ことで"],a:0},
      {q:"毎日練習して、上手に弾ける___。",opts:["ようになった","ようにした","ことになった","ことにした"],a:0},
      {q:"健康の___、早く寝るようにしている。",opts:["ために","ように","ことに","わけに"],a:0},
      {q:"彼女は本当に科学者___人だ。",opts:["らしい","みたいな","ような","そうな"],a:0},
      {q:"あの作家は子供のころから本を読む___好きだった。",opts:["のが","ことを","ものが","ことが"],a:0},
      {q:"予定___に会議を始めましょう。",opts:["どおり","とおり","のまま","のよう"],a:0},
      {q:"困難を___ために、毎日努力した。",opts:["乗り越える","乗り越えた","乗り越えて","乗り越え"],a:0},
      {q:"彼の業績は世界的に___。",opts:["認められている","認めている","認めさせる","認められる"],a:0},
    ],
  },

  // ============================================================
  // Lesson 2: Correspondence & Communication
  // ============================================================
  {
    id: "q1-l2",
    lesson: 2,
    title: "Correspondence & Communication",
    jp: "手紙やメール",
    book: "Quartet I",
    xp: 160,
    coins: 40,
    vocab: [
      {j:"てがみ",r:"手紙",e:"letter"},
      {j:"メール",r:"メール",e:"email"},
      {j:"れんらく",r:"連絡",e:"contact; communication"},
      {j:"へんじ",r:"返事",e:"reply; response"},
      {j:"そうしん",r:"送信",e:"sending (a message)"},
      {j:"じゅしん",r:"受信",e:"receiving (a message)"},
      {j:"けんめい",r:"件名",e:"subject line"},
      {j:"あてさき",r:"宛先",e:"addressee; recipient"},
      {j:"あいさつ",r:"挨拶",e:"greeting"},
      {j:"けいご",r:"敬語",e:"honorific language"},
      {j:"ていねい",r:"丁寧",e:"polite; careful"},
      {j:"かしこまる",r:"畏まる",e:"to be formal/humble"},
      {j:"おれい",r:"お礼",e:"thanks; gratitude"},
      {j:"おわび",r:"お詫び",e:"apology"},
      {j:"おねがい",r:"お願い",e:"request; favor"},
      {j:"ごぶさた",r:"ご無沙汰",e:"long silence; neglecting to write"},
      {j:"りゅうがく",r:"留学",e:"studying abroad"},
      {j:"ほうこく",r:"報告",e:"report"},
      {j:"きんきょう",r:"近況",e:"recent situation"},
      {j:"むすび",r:"結び",e:"closing (of a letter)"},
      {j:"まえりゃく",r:"前略",e:"'Dear...' (informal letter opening)"},
      {j:"はいけい",r:"拝啓",e:"'Dear...' (formal letter opening)"},
      {j:"けいぐ",r:"敬具",e:"'Sincerely' (formal closing)"},
      {j:"そうろう",r:"草々",e:"'Sincerely' (semi-formal closing)"},
      {j:"おせわになる",r:"お世話になる",e:"to be indebted to"},
      {j:"おかげさまで",r:"おかげさまで",e:"thanks to you"},
      {j:"しらせ",r:"知らせ",e:"notice; news"},
      {j:"たのむ",r:"頼む",e:"to ask; to request"},
      {j:"つたわる",r:"伝わる",e:"to be conveyed"},
      {j:"なれる",r:"慣れる",e:"to get accustomed to"},
      {j:"こまる",r:"困る",e:"to be troubled"},
      {j:"すごす",r:"過ごす",e:"to spend (time)"},
      {j:"いらい",r:"依頼",e:"request; commission"},
      {j:"しょうたいじょう",r:"招待状",e:"invitation"},
      {j:"ねんがじょう",r:"年賀状",e:"New Year's card"},
      {j:"はがき",r:"葉書",e:"postcard"},
      {j:"ふうとう",r:"封筒",e:"envelope"},
      {j:"きって",r:"切手",e:"postage stamp"},
      {j:"きもち",r:"気持ち",e:"feeling"},
      {j:"きにする",r:"気にする",e:"to worry about"},
      {j:"きがつく",r:"気がつく",e:"to notice"},
      {j:"きをつける",r:"気をつける",e:"to be careful"},
      {j:"おかげで",r:"おかげで",e:"thanks to"},
      {j:"せいで",r:"せいで",e:"because of (negative)"},
      {j:"まるで",r:"まるで",e:"as if; just like"},
    ],
    grammar: [
      {
        p: "連用形 (formal て-form)",
        explanation: "The 連用形 (masu-stem) can replace て-form in formal writing to connect clauses. Common in letters and formal emails.",
        examples: [
          {jp:"東京に到着し、ホテルに向かいました。",tr:"I arrived in Tokyo and headed to the hotel."},
          {jp:"先生にお会いし、お礼を申し上げました。",tr:"I met the teacher and expressed my gratitude."},
        ],
        note: "Used in formal writing. The masu-stem replaces て to connect clauses."
      },
      {
        p: "〜ずに",
        explanation: "Formal negative equivalent of 〜ないで. Means 'without doing'.",
        examples: [
          {jp:"辞書を使わずに手紙を書いた。",tr:"I wrote the letter without using a dictionary."},
          {jp:"何も言わずに帰ってしまった。",tr:"He left without saying anything."},
        ],
        note: "する becomes せずに. More formal/written than ないで."
      },
      {
        p: "〜てくる / 〜ていく",
        explanation: "Expresses change over time. てくる = change approaching the present. ていく = change moving away from the present/into the future.",
        examples: [
          {jp:"日本語が上手になってきた。",tr:"(My) Japanese has been getting better (up to now)."},
          {jp:"これからも連絡を取り続けていきたい。",tr:"I want to continue keeping in touch from now on."},
        ],
        note: "てくる = toward now/speaker; ていく = from now/away."
      },
      {
        p: "しか〜ない",
        explanation: "Means 'only; nothing but'. Emphasizes limitation. The verb must be negative.",
        examples: [
          {jp:"この町には郵便局が一つしかない。",tr:"There is only one post office in this town."},
          {jp:"日本語でしか手紙を書けない。",tr:"I can only write letters in Japanese."},
        ],
        note: "Always paired with a negative verb. More emphatic than だけ."
      },
      {
        p: "〜ことにする",
        explanation: "Expresses a decision made by the speaker. 'Decide to do'.",
        examples: [
          {jp:"先生に手紙を書くことにした。",tr:"I decided to write a letter to the teacher."},
          {jp:"来月留学しないことにした。",tr:"I decided not to study abroad next month."},
        ],
        note: "Speaker's own decision. Compare with ことになる (external decision)."
      },
      {
        p: "「気」expressions",
        explanation: "Various expressions using 気: 気にする (to worry about), 気がつく (to notice), 気をつける (to be careful), 気になる (to be on one's mind).",
        examples: [
          {jp:"小さいことを気にしないでください。",tr:"Please don't worry about small things."},
          {jp:"間違いに気がついて、すぐ直した。",tr:"I noticed the mistake and fixed it right away."},
        ],
        note: "気 expressions are very common in daily Japanese. Learn them as set phrases."
      },
      {
        p: "「おかげ」expressions",
        explanation: "おかげで (thanks to — positive result), おかげさまで (polite 'thanks to you'). Compare with せいで (because of — negative result).",
        examples: [
          {jp:"先生のおかげで、日本語が上手になりました。",tr:"Thanks to my teacher, my Japanese improved."},
          {jp:"おかげさまで、元気にしております。",tr:"Thanks to you, I am doing well."},
        ],
        note: "おかげで = positive cause; せいで = negative cause."
      },
      {
        p: "XばXほどY",
        explanation: "The more X, the more Y. Expresses proportional change.",
        examples: [
          {jp:"練習すればするほど上手になる。",tr:"The more you practice, the better you get."},
          {jp:"読めば読むほど面白くなってきた。",tr:"The more I read, the more interesting it became."},
        ],
        note: "Same verb repeated in ば-form + ほど. Adjectives: 高ければ高いほど."
      },
      {
        p: "(まるで)Nのようだ",
        explanation: "Simile expression: 'It's as if; just like'. まるで adds emphasis.",
        examples: [
          {jp:"彼女の日本語はまるで日本人のようだ。",tr:"Her Japanese is just like a native Japanese person's."},
          {jp:"あの手紙はまるで小説のようだった。",tr:"That letter was as if it were a novel."},
        ],
        note: "のようだ/のように for nouns; Vかのようだ for verbs."
      },
      {
        p: "〜ことになる",
        explanation: "Expresses a decision or outcome that was determined by external circumstances. 'It has been decided that'.",
        examples: [
          {jp:"来月からアメリカに転勤することになった。",tr:"It has been decided that I will transfer to America from next month."},
          {jp:"会議は来週行うことになった。",tr:"It has been decided that the meeting will be held next week."},
        ],
        note: "External decision, not speaker's choice. Compare with ことにする (own decision)."
      },
    ],
    kanji: [
      {char:"紙",on:"シ",kun:"かみ",meaning:"paper",examples:[{word:"手紙",reading:"てがみ",meaning:"letter"},{word:"紙",reading:"かみ",meaning:"paper"}]},
      {char:"連",on:"レン",kun:"つら-なる",meaning:"connect; link",examples:[{word:"連絡",reading:"れんらく",meaning:"contact"},{word:"連休",reading:"れんきゅう",meaning:"consecutive holidays"}]},
      {char:"絡",on:"ラク",kun:"から-む",meaning:"entwine; contact",examples:[{word:"連絡",reading:"れんらく",meaning:"contact"}]},
      {char:"返",on:"ヘン",kun:"かえ-す",meaning:"return",examples:[{word:"返事",reading:"へんじ",meaning:"reply"},{word:"返す",reading:"かえす",meaning:"to return"}]},
      {char:"届",on:"",kun:"とど-ける",meaning:"deliver; reach",examples:[{word:"届ける",reading:"とどける",meaning:"to deliver"},{word:"届く",reading:"とどく",meaning:"to reach"}]},
      {char:"送",on:"ソウ",kun:"おく-る",meaning:"send",examples:[{word:"送信",reading:"そうしん",meaning:"sending"},{word:"送る",reading:"おくる",meaning:"to send"}]},
      {char:"受",on:"ジュ",kun:"う-ける",meaning:"receive",examples:[{word:"受信",reading:"じゅしん",meaning:"receiving"},{word:"受ける",reading:"うける",meaning:"to receive"}]},
      {char:"件",on:"ケン",kun:"",meaning:"matter; case",examples:[{word:"件名",reading:"けんめい",meaning:"subject line"},{word:"事件",reading:"じけん",meaning:"incident"}]},
      {char:"挨",on:"アイ",kun:"",meaning:"greet",examples:[{word:"挨拶",reading:"あいさつ",meaning:"greeting"}]},
      {char:"拶",on:"サツ",kun:"",meaning:"greet",examples:[{word:"挨拶",reading:"あいさつ",meaning:"greeting"}]},
      {char:"丁",on:"テイ・チョウ",kun:"",meaning:"polite; block",examples:[{word:"丁寧",reading:"ていねい",meaning:"polite"}]},
      {char:"寧",on:"ネイ",kun:"",meaning:"rather; peaceful",examples:[{word:"丁寧",reading:"ていねい",meaning:"polite"}]},
      {char:"礼",on:"レイ",kun:"",meaning:"thanks; bow",examples:[{word:"お礼",reading:"おれい",meaning:"thanks"},{word:"礼儀",reading:"れいぎ",meaning:"manners"}]},
      {char:"詫",on:"",kun:"わ-びる",meaning:"apologize",examples:[{word:"お詫び",reading:"おわび",meaning:"apology"}]},
      {char:"願",on:"ガン",kun:"ねが-う",meaning:"wish; request",examples:[{word:"お願い",reading:"おねがい",meaning:"request"},{word:"願う",reading:"ねがう",meaning:"to wish"}]},
      {char:"沙",on:"サ",kun:"すな",meaning:"sand; filter",examples:[{word:"ご無沙汰",reading:"ごぶさた",meaning:"long silence"}]},
      {char:"況",on:"キョウ",kun:"",meaning:"condition",examples:[{word:"近況",reading:"きんきょう",meaning:"recent situation"},{word:"状況",reading:"じょうきょう",meaning:"situation"}]},
      {char:"封",on:"フウ",kun:"",meaning:"seal",examples:[{word:"封筒",reading:"ふうとう",meaning:"envelope"}]},
      {char:"筒",on:"トウ",kun:"つつ",meaning:"tube; cylinder",examples:[{word:"封筒",reading:"ふうとう",meaning:"envelope"}]},
      {char:"頼",on:"ライ",kun:"たの-む",meaning:"request; rely",examples:[{word:"頼む",reading:"たのむ",meaning:"to ask"},{word:"依頼",reading:"いらい",meaning:"request"}]},
      {char:"届",on:"",kun:"とど-く",meaning:"reach; deliver",examples:[{word:"届く",reading:"とどく",meaning:"to arrive"},{word:"届ける",reading:"とどける",meaning:"to deliver"}]},
      {char:"慣",on:"カン",kun:"な-れる",meaning:"accustom",examples:[{word:"慣れる",reading:"なれる",meaning:"to get used to"},{word:"習慣",reading:"しゅうかん",meaning:"habit"}]},
      {char:"困",on:"コン",kun:"こま-る",meaning:"trouble",examples:[{word:"困る",reading:"こまる",meaning:"to be troubled"},{word:"困難",reading:"こんなん",meaning:"difficulty"}]},
      {char:"過",on:"カ",kun:"す-ごす",meaning:"pass; exceed",examples:[{word:"過ごす",reading:"すごす",meaning:"to spend (time)"},{word:"過去",reading:"かこ",meaning:"past"}]},
      {char:"葉",on:"ヨウ",kun:"は",meaning:"leaf; word",examples:[{word:"葉書",reading:"はがき",meaning:"postcard"},{word:"言葉",reading:"ことば",meaning:"word"}]},
    ],
    reading: [
      {
        title: "留学先からのメール",
        titleEn: "Email from Study Abroad",
        text: "拝啓　先生、ご無沙汰しております。お元気でいらっしゃいますか。おかげさまで、私は元気にしております。東京に到着し、大学の寮に入りました。日本の生活にはまだ慣れていませんが、日本語を使えば使うほど上手になってきた気がします。最初は何も分からず、困ることしかありませんでしたが、周りの人のおかげで少しずつ生活できるようになりました。来月から研究を始めることになりましたので、辞書を使わずに論文を読めるように頑張ります。またご連絡いたします。　敬具",
        translation: "Dear Teacher, It has been a long time since I last wrote. How are you? Thanks to you, I am doing well. I arrived in Tokyo and moved into the university dormitory. I am not yet accustomed to life in Japan, but I feel that the more I use Japanese, the better I get. At first, I had nothing but troubles without understanding anything, but thanks to the people around me, I gradually became able to get by. It has been decided that I will start my research from next month, so I will do my best to be able to read papers without using a dictionary. I will contact you again. Sincerely,",
        notes: [
          "Notice the formal 連用形: 到着し connects clauses formally.",
          "ずに (知らずに) is the formal version of ないで.",
          "ば〜ほど shows the proportional relationship.",
          "しか〜ない emphasizes 'nothing but' troubles.",
          "ことになる shows an external decision about the research schedule."
        ]
      }
    ],
    dialogue: [
      {jp:"A: 先生にお礼のメールを書こうと思うんですが、どう書けばいいですか。",tr:"A: I'm thinking of writing a thank-you email to the teacher. How should I write it?"},
      {jp:"B: まず、「拝啓」で始めて、ご無沙汰のお詫びを書くといいですよ。",tr:"B: First, start with 'Dear...' and write an apology for the long silence."},
      {jp:"A: 敬語を使わずに書いてもいいですか。",tr:"A: Is it OK to write without using honorific language?"},
      {jp:"B: 先生へのメールなら、丁寧に書くことにしたほうがいいです。",tr:"B: If it's an email to a teacher, you should decide to write politely."},
      {jp:"A: 日本語のメールは難しくて、書けば書くほど分からなくなります。",tr:"A: Japanese emails are difficult; the more I write, the more confused I get."},
      {jp:"B: 気にしないでください。先生のおかげで上手になってきたじゃないですか。",tr:"B: Don't worry about it. You've been getting better thanks to the teacher, haven't you?"},
      {jp:"A: そうですね。「おかげさまで元気にしております」と書くことにします。",tr:"A: You're right. I'll decide to write 'Thanks to you, I am doing well.'"},
    ],
    tips: [
      "In formal letters, use 連用形 (masu-stem) instead of て-form to connect clauses.",
      "Japanese letters have set openings (拝啓/前略) and closings (敬具/草々). Learn the pairs.",
      "〜ずに is the formal written equivalent of 〜ないで. Exception: する → せずに.",
      "ことにする (own decision) vs ことになる (external decision) — a crucial distinction.",
      "おかげで (positive cause) vs せいで (negative cause) — choose based on the result.",
      "The ば〜ほど pattern repeats the same verb: 読めば読むほど (the more you read...).",
    ],
    quiz: [
      {q:"東京に___、すぐ大学に向かった。(formal)",opts:["到着し","到着して","到着すると","到着したら"],a:0},
      {q:"辞書を___に手紙を書いた。",opts:["使わず","使わない","使って","使えず"],a:0},
      {q:"日本語が上手に___。",opts:["なってきた","なっていった","していった","してきた"],a:0},
      {q:"この町にはコンビニが一つ___。",opts:["しかない","だけある","ばかりだ","までだ"],a:0},
      {q:"来月日本に行く___にした。",opts:["こと","もの","はず","わけ"],a:0},
      {q:"先生の___で、日本語が上達した。",opts:["おかげ","せい","ため","わけ"],a:0},
      {q:"練習___ほど上手になる。",opts:["すれば する","すると する","したら した","しても する"],a:0},
      {q:"彼女の日本語はまるで日本人___。",opts:["のようだ","らしい","みたいだ","そうだ"],a:0},
      {q:"来月から新しい仕事を始める___になった。",opts:["こと","もの","はず","わけ"],a:0},
      {q:"間違いに___、すぐ直した。",opts:["気がついて","気にして","気をつけて","気になって"],a:0},
      {q:"小さいことを___でください。",opts:["気にしない","気がつかない","気をつけない","気にならない"],a:0},
    ],
  },

  // ============================================================
  // Lesson 3: Travel & Enjoying Japan
  // ============================================================
  {
    id: "q1-l3",
    lesson: 3,
    title: "Travel & Enjoying Japan",
    jp: "旅行と日本を楽しむ",
    book: "Quartet I",
    xp: 170,
    coins: 42,
    vocab: [
      {j:"りょこう",r:"旅行",e:"travel; trip"},
      {j:"かんこう",r:"観光",e:"sightseeing"},
      {j:"かんこうち",r:"観光地",e:"tourist spot"},
      {j:"けしき",r:"景色",e:"scenery; view"},
      {j:"しぜん",r:"自然",e:"nature"},
      {j:"おんせん",r:"温泉",e:"hot spring"},
      {j:"りょかん",r:"旅館",e:"traditional Japanese inn"},
      {j:"たいざい",r:"滞在",e:"stay; sojourn"},
      {j:"もくてきち",r:"目的地",e:"destination"},
      {j:"こうつう",r:"交通",e:"transportation"},
      {j:"しんかんせん",r:"新幹線",e:"bullet train"},
      {j:"のりかえる",r:"乗り換える",e:"to transfer (trains)"},
      {j:"いざかや",r:"居酒屋",e:"Japanese pub"},
      {j:"めいぶつ",r:"名物",e:"local specialty"},
      {j:"みりょく",r:"魅力",e:"charm; attraction"},
      {j:"たいけん",r:"体験",e:"experience (firsthand)"},
      {j:"ふじさん",r:"富士山",e:"Mt. Fuji"},
      {j:"のぼる",r:"登る",e:"to climb"},
      {j:"とざん",r:"登山",e:"mountain climbing"},
      {j:"いっぱく",r:"一泊",e:"one night stay"},
      {j:"よやく",r:"予約",e:"reservation"},
      {j:"おすすめ",r:"お勧め",e:"recommendation"},
      {j:"たのしむ",r:"楽しむ",e:"to enjoy"},
      {j:"あじわう",r:"味わう",e:"to savor; to taste"},
      {j:"うつくしい",r:"美しい",e:"beautiful"},
      {j:"すばらしい",r:"素晴らしい",e:"wonderful; magnificent"},
      {j:"にんき",r:"人気",e:"popularity"},
      {j:"こむ",r:"込む",e:"to be crowded"},
      {j:"まつり",r:"祭り",e:"festival"},
      {j:"しゅくはく",r:"宿泊",e:"lodging; accommodation"},
      {j:"てんき",r:"天気",e:"weather"},
      {j:"きせつ",r:"季節",e:"season"},
      {j:"さくら",r:"桜",e:"cherry blossom"},
      {j:"こうよう",r:"紅葉",e:"autumn leaves"},
      {j:"おみやげ",r:"お土産",e:"souvenir"},
      {j:"ガイド",r:"ガイド",e:"guide"},
      {j:"くうこう",r:"空港",e:"airport"},
      {j:"じんじゃ",r:"神社",e:"shrine"},
      {j:"おてら",r:"お寺",e:"temple"},
      {j:"ぶんか",r:"文化",e:"culture"},
      {j:"でんとう",r:"伝統",e:"tradition"},
      {j:"けいかく",r:"計画",e:"plan"},
      {j:"りゅういん",r:"流行",e:"trend; fashion"},
    ],
    grammar: [
      {
        p: "〜うちに",
        explanation: "Means 'while (the condition still holds); before it changes'. Suggests you should do something before the opportunity is lost.",
        examples: [
          {jp:"桜が咲いているうちに、花見に行きたい。",tr:"I want to go cherry blossom viewing while they're still in bloom."},
          {jp:"若いうちに、たくさん旅行したほうがいい。",tr:"You should travel a lot while you're young."},
        ],
        note: "Implies the condition will change. 'Do it before it's too late.'"
      },
      {
        p: "〜ないうちに",
        explanation: "Means 'before (something happens)'. Similar to うちに but focuses on acting before a negative change.",
        examples: [
          {jp:"暗くならないうちに、山を降りよう。",tr:"Let's go down the mountain before it gets dark."},
          {jp:"忘れないうちに、予約しておこう。",tr:"Let's make a reservation before we forget."},
        ],
        note: "Vない + うちに. Emphasizes urgency before a change occurs."
      },
      {
        p: "何と言っても",
        explanation: "Means 'above all; no matter what anyone says; undeniably'. Used to emphasize the most important point.",
        examples: [
          {jp:"日本の山で何と言っても一番有名なのは富士山だ。",tr:"Among Japanese mountains, undeniably the most famous is Mt. Fuji."},
          {jp:"京都の魅力は何と言っても古い寺だ。",tr:"The charm of Kyoto is, above all, the old temples."},
        ],
        note: "Strong emphasis. Often followed by the speaker's main point."
      },
      {
        p: "Nにとって",
        explanation: "Means 'for N; from N's perspective'. Expresses how something is perceived by someone.",
        examples: [
          {jp:"外国人にとって、温泉は珍しい体験だ。",tr:"For foreigners, hot springs are an unusual experience."},
          {jp:"私にとって、日本旅行は夢だった。",tr:"For me, traveling to Japan was a dream."},
        ],
        note: "Expresses personal perspective. Often followed by an evaluation."
      },
      {
        p: "Nとして",
        explanation: "Means 'as N; in the capacity of N'. Indicates a role or status.",
        examples: [
          {jp:"富士山は世界遺産として登録されている。",tr:"Mt. Fuji is registered as a World Heritage site."},
          {jp:"ガイドとして働いている。",tr:"I work as a guide."},
        ],
        note: "Indicates role/capacity. Different from にとって (perspective)."
      },
      {
        p: "〜ため(に) (reason/cause)",
        explanation: "Expresses a cause or reason. 'Because of; due to'. Different from purpose ために.",
        examples: [
          {jp:"台風のために、飛行機が欠航になった。",tr:"Due to the typhoon, the flight was cancelled."},
          {jp:"道が込んでいたために、遅れてしまった。",tr:"Because the road was crowded, I ended up being late."},
        ],
        note: "Reason/cause use: past tense or noun + の + ため. Formal tone."
      },
      {
        p: "Nによって",
        explanation: "Means 'depending on N; by means of N; due to N'. Has multiple uses: variation, means, agent.",
        examples: [
          {jp:"季節によって、景色が変わる。",tr:"The scenery changes depending on the season."},
          {jp:"この寺は平安時代に建てられたによって知られている。",tr:"This temple is known for having been built in the Heian period."},
        ],
        note: "によって has three uses: variation, means/agent, cause."
      },
      {
        p: "〜べきだ / べきではない",
        explanation: "Expresses a strong recommendation or social expectation. 'Should / should not'.",
        examples: [
          {jp:"日本に行ったら、温泉に入るべきだ。",tr:"If you go to Japan, you should try a hot spring."},
          {jp:"神社では大きい声で話すべきではない。",tr:"You should not speak loudly at a shrine."},
        ],
        note: "Strong 'should'. するべき can also be すべき. Not for personal preferences."
      },
      {
        p: "〜からといって",
        explanation: "Means 'just because... doesn't mean'. Refutes an assumed conclusion.",
        examples: [
          {jp:"有名だからといって、必ずしもいい観光地とは限らない。",tr:"Just because it's famous doesn't necessarily mean it's a good tourist spot."},
          {jp:"日本人だからといって、寿司が好きとは限らない。",tr:"Just because someone is Japanese doesn't mean they like sushi."},
        ],
        note: "Often paired with とは限らない. Refutes a stereotype or assumption."
      },
      {
        p: "〜とは限らない",
        explanation: "Means 'it is not necessarily the case that'. Expresses that something is not always true.",
        examples: [
          {jp:"高いレストランがおいしいとは限らない。",tr:"Expensive restaurants are not necessarily delicious."},
          {jp:"天気がいいとは限らないので、傘を持っていこう。",tr:"The weather won't necessarily be good, so let's bring an umbrella."},
        ],
        note: "Negates an assumption. Can follow plain form verbs, adjectives, or nouns."
      },
      {
        p: "〜のに",
        explanation: "Expresses frustration or disappointment about an unexpected result. 'Even though; despite'.",
        examples: [
          {jp:"せっかく京都に来たのに、雨で何も見られなかった。",tr:"Even though I came all the way to Kyoto, I couldn't see anything because of the rain."},
          {jp:"予約したのに、満席だと言われた。",tr:"Even though I made a reservation, I was told it was full."},
        ],
        note: "Expresses the speaker's frustration or regret. Emotional nuance."
      },
    ],
    kanji: [
      {char:"観",on:"カン",kun:"み-る",meaning:"view; observe",examples:[{word:"観光",reading:"かんこう",meaning:"sightseeing"},{word:"観る",reading:"みる",meaning:"to watch"}]},
      {char:"光",on:"コウ",kun:"ひかり",meaning:"light",examples:[{word:"観光",reading:"かんこう",meaning:"sightseeing"},{word:"光",reading:"ひかり",meaning:"light"}]},
      {char:"景",on:"ケイ",kun:"",meaning:"scenery",examples:[{word:"景色",reading:"けしき",meaning:"scenery"},{word:"風景",reading:"ふうけい",meaning:"landscape"}]},
      {char:"温",on:"オン",kun:"あたた-かい",meaning:"warm",examples:[{word:"温泉",reading:"おんせん",meaning:"hot spring"},{word:"温かい",reading:"あたたかい",meaning:"warm"}]},
      {char:"泉",on:"セン",kun:"いずみ",meaning:"spring; fountain",examples:[{word:"温泉",reading:"おんせん",meaning:"hot spring"},{word:"泉",reading:"いずみ",meaning:"spring"}]},
      {char:"館",on:"カン",kun:"",meaning:"building; hall",examples:[{word:"旅館",reading:"りょかん",meaning:"Japanese inn"},{word:"図書館",reading:"としょかん",meaning:"library"}]},
      {char:"滞",on:"タイ",kun:"とどこお-る",meaning:"stagnate; stay",examples:[{word:"滞在",reading:"たいざい",meaning:"stay"}]},
      {char:"交",on:"コウ",kun:"まじ-わる",meaning:"mix; exchange",examples:[{word:"交通",reading:"こうつう",meaning:"transportation"},{word:"交換",reading:"こうかん",meaning:"exchange"}]},
      {char:"通",on:"ツウ",kun:"とお-る",meaning:"pass through",examples:[{word:"交通",reading:"こうつう",meaning:"transportation"},{word:"通る",reading:"とおる",meaning:"to pass"}]},
      {char:"乗",on:"ジョウ",kun:"の-る",meaning:"ride",examples:[{word:"乗り換える",reading:"のりかえる",meaning:"to transfer"},{word:"乗る",reading:"のる",meaning:"to ride"}]},
      {char:"換",on:"カン",kun:"か-える",meaning:"exchange",examples:[{word:"乗り換える",reading:"のりかえる",meaning:"to transfer"},{word:"交換",reading:"こうかん",meaning:"exchange"}]},
      {char:"居",on:"キョ",kun:"い-る",meaning:"reside",examples:[{word:"居酒屋",reading:"いざかや",meaning:"izakaya"},{word:"居る",reading:"いる",meaning:"to be"}]},
      {char:"酒",on:"シュ",kun:"さけ",meaning:"alcohol; sake",examples:[{word:"居酒屋",reading:"いざかや",meaning:"izakaya"},{word:"お酒",reading:"おさけ",meaning:"alcohol"}]},
      {char:"魅",on:"ミ",kun:"",meaning:"charm; fascination",examples:[{word:"魅力",reading:"みりょく",meaning:"charm"}]},
      {char:"登",on:"トウ",kun:"のぼ-る",meaning:"climb",examples:[{word:"登山",reading:"とざん",meaning:"mountain climbing"},{word:"登る",reading:"のぼる",meaning:"to climb"}]},
      {char:"約",on:"ヤク",kun:"",meaning:"promise; approx.",examples:[{word:"予約",reading:"よやく",meaning:"reservation"},{word:"約束",reading:"やくそく",meaning:"promise"}]},
      {char:"込",on:"",kun:"こ-む",meaning:"crowded; put in",examples:[{word:"込む",reading:"こむ",meaning:"to be crowded"},{word:"申し込む",reading:"もうしこむ",meaning:"to apply"}]},
      {char:"祭",on:"サイ",kun:"まつ-り",meaning:"festival",examples:[{word:"祭り",reading:"まつり",meaning:"festival"},{word:"文化祭",reading:"ぶんかさい",meaning:"cultural festival"}]},
      {char:"季",on:"キ",kun:"",meaning:"season",examples:[{word:"季節",reading:"きせつ",meaning:"season"}]},
      {char:"節",on:"セツ",kun:"ふし",meaning:"season; joint",examples:[{word:"季節",reading:"きせつ",meaning:"season"},{word:"節約",reading:"せつやく",meaning:"economize"}]},
      {char:"桜",on:"オウ",kun:"さくら",meaning:"cherry blossom",examples:[{word:"桜",reading:"さくら",meaning:"cherry blossom"}]},
      {char:"紅",on:"コウ",kun:"べに",meaning:"crimson",examples:[{word:"紅葉",reading:"こうよう",meaning:"autumn leaves"},{word:"口紅",reading:"くちべに",meaning:"lipstick"}]},
      {char:"港",on:"コウ",kun:"みなと",meaning:"port; harbor",examples:[{word:"空港",reading:"くうこう",meaning:"airport"},{word:"港",reading:"みなと",meaning:"port"}]},
      {char:"伝",on:"デン",kun:"つた-える",meaning:"transmit",examples:[{word:"伝統",reading:"でんとう",meaning:"tradition"},{word:"伝える",reading:"つたえる",meaning:"to convey"}]},
      {char:"統",on:"トウ",kun:"す-べる",meaning:"unite; govern",examples:[{word:"伝統",reading:"でんとう",meaning:"tradition"},{word:"統一",reading:"とういつ",meaning:"unification"}]},
    ],
    reading: [
      {
        title: "富士山に登ろう",
        titleEn: "Let's Climb Mt. Fuji",
        text: "日本の山で何と言っても一番有名なのは富士山だ。外国人にとって、富士山は日本のシンボルとして知られている。登山のシーズンは七月から九月だが、天気がいいとは限らないので、準備をするべきだ。人気があるからといって、簡単に登れるとは限らない。桜が咲いているうちに麓を訪れるのもいいが、暗くならないうちに山を降りることが大切だ。季節によって景色が変わるので、何度来ても楽しめる。富士山の美しさは、写真で見たとおりだった。",
        translation: "Undeniably, the most famous mountain in Japan is Mt. Fuji. For foreigners, Mt. Fuji is known as a symbol of Japan. The climbing season is from July to September, but the weather is not necessarily good, so you should prepare. Just because it is popular doesn't mean you can climb it easily. Visiting the foothills while the cherry blossoms are in bloom is also nice, but it is important to come down the mountain before it gets dark. The scenery changes depending on the season, so you can enjoy it no matter how many times you come. The beauty of Mt. Fuji was exactly as I had seen in photos.",
        notes: [
          "何と言っても emphasizes the main point strongly.",
          "にとって shows the foreigner's perspective.",
          "として indicates Mt. Fuji's role as a symbol.",
          "からといって + とは限らない refute an assumption.",
          "うちに and ないうちに both express 'while/before'."
        ]
      }
    ],
    dialogue: [
      {jp:"A: 日本旅行のおすすめはありますか。",tr:"A: Do you have any recommendations for traveling in Japan?"},
      {jp:"B: 日本に来たら、何と言っても温泉に入るべきですよ。",tr:"B: If you come to Japan, above all you should try a hot spring."},
      {jp:"A: 温泉は外国人にとっても楽しめますか。",tr:"A: Can even foreigners enjoy hot springs?"},
      {jp:"B: もちろんです。ただ、有名だからといって必ずしもいいとは限りません。",tr:"B: Of course. However, just because a place is famous doesn't necessarily mean it's good."},
      {jp:"A: じゃあ、桜が咲いているうちに行きたいです。",tr:"A: Then, I'd like to go while the cherry blossoms are still in bloom."},
      {jp:"B: いいですね。季節によって景色が変わるので、秋の紅葉もおすすめです。",tr:"B: That sounds great. The scenery changes depending on the season, so autumn leaves are also recommended."},
      {jp:"A: せっかく日本に来たのに、富士山に登らないのはもったいないですね。",tr:"A: It would be a waste to come all the way to Japan and not climb Mt. Fuji."},
      {jp:"B: そうですね。暗くならないうちに出発しましょう。",tr:"B: Indeed. Let's depart before it gets dark."},
    ],
    tips: [
      "〜うちに implies 'do it while you can' — the condition will eventually change.",
      "何と言っても is great for emphasizing your main recommendation in conversation.",
      "にとって (perspective) vs として (role/capacity) — don't confuse them.",
      "〜からといって〜とは限らない is a powerful pattern for refuting stereotypes.",
      "〜べきだ is a strong 'should' — use it for social expectations, not personal preferences.",
      "〜のに shows frustration. It's emotional — avoid using it about others to their face.",
    ],
    quiz: [
      {q:"桜が咲いている___、花見に行きたい。",opts:["うちに","あいだに","ときに","まえに"],a:0},
      {q:"暗くならない___に帰ろう。",opts:["うち","あいだ","とき","まえ"],a:0},
      {q:"日本の食べ物で___一番有名なのは寿司だ。",opts:["何と言っても","何でも","何とか","何しろ"],a:0},
      {q:"外国人___、この祭りは珍しい体験だ。",opts:["にとって","として","によって","について"],a:0},
      {q:"富士山は世界遺産___登録されている。",opts:["として","にとって","によって","について"],a:0},
      {q:"台風の___、電車が止まった。",opts:["ために","ように","ことに","わけに"],a:0},
      {q:"季節___景色が違う。",opts:["によって","にとって","として","について"],a:0},
      {q:"日本に行ったら、温泉に入る___だ。",opts:["べき","はず","わけ","こと"],a:0},
      {q:"有名だ___、必ずしもいいとは限らない。",opts:["からといって","から","ので","ために"],a:0},
      {q:"高い___おいしいとは限らない。",opts:["からといって","から","ので","ために"],a:0},
      {q:"予約した___、満席だと言われた。",opts:["のに","ので","から","けど"],a:0},
    ],
  },

  // ============================================================
  // Lesson 4: Overseas Experiences / Handling Difficulties
  // ============================================================
  {
    id: "q1-l4",
    lesson: 4,
    title: "Overseas Experiences",
    jp: "海外経験と困難",
    book: "Quartet I",
    xp: 170,
    coins: 42,
    vocab: [
      {j:"かいがい",r:"海外",e:"overseas; abroad"},
      {j:"りゅうがくせい",r:"留学生",e:"exchange student"},
      {j:"こうかんりゅうがく",r:"交換留学",e:"exchange study program"},
      {j:"ぶんかのちがい",r:"文化の違い",e:"cultural differences"},
      {j:"しゅうかん",r:"習慣",e:"custom; habit"},
      {j:"せいかつ",r:"生活",e:"daily life"},
      {j:"ホームステイ",r:"ホームステイ",e:"homestay"},
      {j:"ホストファミリー",r:"ホストファミリー",e:"host family"},
      {j:"てつづき",r:"手続き",e:"procedures; paperwork"},
      {j:"ビザ",r:"ビザ",e:"visa"},
      {j:"にゅうがく",r:"入学",e:"enrollment; entering school"},
      {j:"そつぎょう",r:"卒業",e:"graduation"},
      {j:"アルバイト",r:"アルバイト",e:"part-time job"},
      {j:"ウエイター",r:"ウエイター",e:"waiter"},
      {j:"チップ",r:"チップ",e:"tip; gratuity"},
      {j:"つうきん",r:"通勤",e:"commuting to work"},
      {j:"つうがく",r:"通学",e:"commuting to school"},
      {j:"しつぼう",r:"失望",e:"disappointment"},
      {j:"こうかい",r:"後悔",e:"regret"},
      {j:"くろう",r:"苦労",e:"hardship; trouble"},
      {j:"ホームシック",r:"ホームシック",e:"homesickness"},
      {j:"さびしい",r:"寂しい",e:"lonely"},
      {j:"なつかしい",r:"懐かしい",e:"nostalgic"},
      {j:"なじむ",r:"馴染む",e:"to become familiar with"},
      {j:"とまどう",r:"戸惑う",e:"to be bewildered"},
      {j:"たよる",r:"頼る",e:"to rely on"},
      {j:"たすける",r:"助ける",e:"to help; to rescue"},
      {j:"なおす",r:"直す",e:"to fix; to correct"},
      {j:"あきらめる",r:"諦める",e:"to give up"},
      {j:"がんばる",r:"頑張る",e:"to do one's best"},
      {j:"せっかく",r:"せっかく",e:"with much trouble; specially"},
      {j:"さすが",r:"さすが",e:"as expected; impressive"},
      {j:"やっと",r:"やっと",e:"at last; finally"},
      {j:"いっしょうけんめい",r:"一生懸命",e:"with all one's might"},
      {j:"ちょうせん",r:"挑戦",e:"challenge"},
      {j:"けいけんち",r:"経験値",e:"experience points (life experience)"},
      {j:"こくふく",r:"克服",e:"overcoming"},
      {j:"いらい",r:"以来",e:"since; ever since"},
      {j:"きがする",r:"気がする",e:"to feel like; to have a feeling"},
      {j:"すむ",r:"済む",e:"to be sufficient; to end"},
      {j:"わけ",r:"わけ",e:"reason; meaning"},
    ],
    grammar: [
      {
        p: "〜以来",
        explanation: "Means 'since; ever since (a certain event)'. Indicates a continuing state from that point.",
        examples: [
          {jp:"日本に来て以来、毎日日本語を使っている。",tr:"Ever since I came to Japan, I use Japanese every day."},
          {jp:"卒業以来、友達に会っていない。",tr:"I haven't met my friend since graduation."},
        ],
        note: "Vて以来 or N以来. The state continues up to the present."
      },
      {
        p: "〜ような気がする",
        explanation: "Expresses a vague feeling or impression. 'I have a feeling that; it seems like'.",
        examples: [
          {jp:"最近、日本語が上手になったような気がする。",tr:"I have a feeling that my Japanese has gotten better recently."},
          {jp:"前にもこの場所に来たような気がする。",tr:"I have a feeling I've been to this place before."},
        ],
        note: "Expresses an uncertain, subjective impression. Softer than と思う."
      },
      {
        p: "せっかく",
        explanation: "Emphasizes that something was done with great effort or is a rare opportunity, and it would be a waste not to take advantage of it.",
        examples: [
          {jp:"せっかくアメリカに来たのだから、英語で話そう。",tr:"Since we went to the trouble of coming to America, let's speak English."},
          {jp:"せっかくの休みなのに、雨で出かけられない。",tr:"Even though it's a precious day off, I can't go out because of rain."},
        ],
        note: "Often paired with のだから (positive) or のに (regret)."
      },
      {
        p: "〜さえ",
        explanation: "Means 'even'. Emphasizes an extreme example to imply 'let alone other things'.",
        examples: [
          {jp:"忙しくて、昼ごはんを食べる時間さえなかった。",tr:"I was so busy that I didn't even have time to eat lunch."},
          {jp:"漢字は日本人でさえ間違えることがある。",tr:"Even Japanese people sometimes make mistakes with kanji."},
        ],
        note: "Particle さえ replaces を/が/は. Emphasizes the extreme case."
      },
      {
        p: "〜たばかり",
        explanation: "Means 'just did'. Indicates an action was recently completed.",
        examples: [
          {jp:"日本に来たばかりで、まだ何も分からない。",tr:"I just came to Japan, so I don't understand anything yet."},
          {jp:"引っ越したばかりなので、まだ片付いていない。",tr:"I just moved, so things aren't organized yet."},
        ],
        note: "Vた + ばかり. Focuses on recency. Can imply 'too soon for something'."
      },
      {
        p: "〜ないで済む / 〜ずに済む",
        explanation: "Means 'to manage without doing; to get by without'. Implies relief that something wasn't necessary.",
        examples: [
          {jp:"友達が助けてくれたので、一人で悩まないで済んだ。",tr:"My friend helped me, so I managed without worrying alone."},
          {jp:"保険があったので、お金を払わずに済んだ。",tr:"Because I had insurance, I got by without paying."},
        ],
        note: "Positive nuance: relief at avoiding something. ずに is more formal."
      },
      {
        p: "(Xは) Yほど〜ない",
        explanation: "Means 'X is not as ~ as Y'. Used for comparisons where X falls short of Y.",
        examples: [
          {jp:"アメリカの電車は日本ほど便利ではない。",tr:"American trains are not as convenient as Japan's."},
          {jp:"思ったほど難しくなかった。",tr:"It wasn't as difficult as I thought."},
        ],
        note: "Negative comparison pattern. Y sets the benchmark."
      },
      {
        p: "〜わけだ",
        explanation: "Expresses a logical conclusion or realization. 'So that's why; no wonder; that means'.",
        examples: [
          {jp:"十年も日本にいたのか。日本語が上手なわけだ。",tr:"You were in Japan for ten years? No wonder your Japanese is good."},
          {jp:"毎日練習しているから、上手になるわけだ。",tr:"Since you practice every day, it makes sense you'd improve."},
        ],
        note: "Expresses 'it logically follows that'. Shows understanding."
      },
      {
        p: "〜ば〜のに",
        explanation: "Expresses regret about not having done something. 'If only I had done X, then Y (but I didn't)'.",
        examples: [
          {jp:"もっと勉強すればよかったのに。",tr:"If only I had studied more (but I didn't)."},
          {jp:"早く相談すれば、こんなに苦労しなかったのに。",tr:"If I had consulted earlier, I wouldn't have struggled this much."},
        ],
        note: "Expresses regret about the past. ばよかったのに is a common pattern."
      },
    ],
    kanji: [
      {char:"海",on:"カイ",kun:"うみ",meaning:"sea",examples:[{word:"海外",reading:"かいがい",meaning:"overseas"},{word:"海",reading:"うみ",meaning:"sea"}]},
      {char:"外",on:"ガイ・ゲ",kun:"そと",meaning:"outside",examples:[{word:"海外",reading:"かいがい",meaning:"overseas"},{word:"外国",reading:"がいこく",meaning:"foreign country"}]},
      {char:"換",on:"カン",kun:"か-える",meaning:"exchange",examples:[{word:"交換",reading:"こうかん",meaning:"exchange"},{word:"交換留学",reading:"こうかんりゅうがく",meaning:"exchange study"}]},
      {char:"違",on:"イ",kun:"ちが-う",meaning:"differ",examples:[{word:"違い",reading:"ちがい",meaning:"difference"},{word:"違う",reading:"ちがう",meaning:"to differ"}]},
      {char:"慣",on:"カン",kun:"な-れる",meaning:"accustom",examples:[{word:"習慣",reading:"しゅうかん",meaning:"custom"},{word:"慣れる",reading:"なれる",meaning:"to get used to"}]},
      {char:"続",on:"ゾク",kun:"つづ-く",meaning:"continue",examples:[{word:"手続き",reading:"てつづき",meaning:"procedures"},{word:"続ける",reading:"つづける",meaning:"to continue"}]},
      {char:"届",on:"",kun:"とど-ける",meaning:"deliver",examples:[{word:"届く",reading:"とどく",meaning:"to arrive"}]},
      {char:"卒",on:"ソツ",kun:"",meaning:"graduate",examples:[{word:"卒業",reading:"そつぎょう",meaning:"graduation"}]},
      {char:"業",on:"ギョウ・ゴウ",kun:"わざ",meaning:"business; work",examples:[{word:"卒業",reading:"そつぎょう",meaning:"graduation"},{word:"業績",reading:"ぎょうせき",meaning:"achievements"}]},
      {char:"勤",on:"キン",kun:"つと-める",meaning:"work; serve",examples:[{word:"通勤",reading:"つうきん",meaning:"commuting"},{word:"勤める",reading:"つとめる",meaning:"to work at"}]},
      {char:"悔",on:"カイ",kun:"く-いる",meaning:"regret",examples:[{word:"後悔",reading:"こうかい",meaning:"regret"}]},
      {char:"苦",on:"ク",kun:"くる-しい",meaning:"suffering",examples:[{word:"苦労",reading:"くろう",meaning:"hardship"},{word:"苦しい",reading:"くるしい",meaning:"painful"}]},
      {char:"労",on:"ロウ",kun:"",meaning:"labor; effort",examples:[{word:"苦労",reading:"くろう",meaning:"hardship"},{word:"労働",reading:"ろうどう",meaning:"labor"}]},
      {char:"寂",on:"セキ・ジャク",kun:"さび-しい",meaning:"lonely",examples:[{word:"寂しい",reading:"さびしい",meaning:"lonely"}]},
      {char:"懐",on:"カイ",kun:"なつ-かしい",meaning:"nostalgic; bosom",examples:[{word:"懐かしい",reading:"なつかしい",meaning:"nostalgic"}]},
      {char:"頼",on:"ライ",kun:"たよ-る",meaning:"rely on",examples:[{word:"頼る",reading:"たよる",meaning:"to rely on"},{word:"頼む",reading:"たのむ",meaning:"to ask"}]},
      {char:"助",on:"ジョ",kun:"たす-ける",meaning:"help",examples:[{word:"助ける",reading:"たすける",meaning:"to help"},{word:"助け",reading:"たすけ",meaning:"help"}]},
      {char:"諦",on:"テイ",kun:"あきら-める",meaning:"give up",examples:[{word:"諦める",reading:"あきらめる",meaning:"to give up"}]},
      {char:"挑",on:"チョウ",kun:"いど-む",meaning:"challenge",examples:[{word:"挑戦",reading:"ちょうせん",meaning:"challenge"}]},
      {char:"戦",on:"セン",kun:"たたか-う",meaning:"battle; war",examples:[{word:"挑戦",reading:"ちょうせん",meaning:"challenge"},{word:"戦う",reading:"たたかう",meaning:"to fight"}]},
      {char:"克",on:"コク",kun:"",meaning:"overcome",examples:[{word:"克服",reading:"こくふく",meaning:"overcoming"}]},
      {char:"服",on:"フク",kun:"",meaning:"clothes; submit",examples:[{word:"克服",reading:"こくふく",meaning:"overcoming"},{word:"服",reading:"ふく",meaning:"clothes"}]},
      {char:"済",on:"サイ",kun:"す-む",meaning:"finish; settle",examples:[{word:"済む",reading:"すむ",meaning:"to suffice"},{word:"経済",reading:"けいざい",meaning:"economy"}]},
      {char:"惑",on:"ワク",kun:"まど-う",meaning:"bewildered",examples:[{word:"戸惑う",reading:"とまどう",meaning:"to be bewildered"}]},
      {char:"懸",on:"ケン",kun:"か-ける",meaning:"suspend; hang",examples:[{word:"一生懸命",reading:"いっしょうけんめい",meaning:"with all one's might"}]},
    ],
    reading: [
      {
        title: "留学生の体験談",
        titleEn: "An Exchange Student's Story",
        text: "私は去年の四月にアメリカに留学して以来、毎日新しい発見がある。来たばかりのころは、文化の違いに戸惑い、ホームシックになった。英語さえうまく話せなくて、注文する時間さえ苦労した。せっかくアメリカに来たのに、何もできない自分が情けなかった。でも、ホストファミリーが助けてくれたおかげで、一人で悩まないで済んだ。思ったほど生活は難しくなかった。毎日英語を使っていたら、だんだん話せるようになった。十年住んでいる友達は「もう少し頑張れば、もっと上手になるのに」と言う。一生懸命頑張っているから、上達するわけだ。留学して以来、世界の見方が変わったような気がする。",
        translation: "Since I went to study in America last April, I have new discoveries every day. When I had just arrived, I was bewildered by the cultural differences and became homesick. I couldn't even speak English well, and I even struggled just ordering food. Even though I had gone to the trouble of coming to America, I felt pathetic for being unable to do anything. But thanks to my host family helping me, I got by without worrying alone. Life wasn't as difficult as I thought. By using English every day, I gradually became able to speak. A friend who has lived here for ten years says, 'If you tried a bit harder, you'd get even better.' Since I'm working my hardest, it makes sense that I'd improve. Ever since studying abroad, I feel like my view of the world has changed.",
        notes: [
          "以来 indicates a continuing state from the start of study abroad.",
          "たばかり shows recency of arrival.",
          "さえ emphasizes the extreme — couldn't even do basic things.",
          "ないで済んだ expresses relief at not having to worry alone.",
          "ほど〜ない makes a comparison: not as hard as expected.",
          "わけだ draws a logical conclusion."
        ]
      }
    ],
    dialogue: [
      {jp:"A: アメリカに来て以来、何が一番大変でしたか。",tr:"A: Since coming to America, what has been the hardest?"},
      {jp:"B: 来たばかりのころ、英語さえうまく話せなくて困りました。",tr:"B: Right after I arrived, I struggled because I couldn't even speak English well."},
      {jp:"A: 思ったほど大変でしたか。",tr:"A: Was it as hard as you expected?"},
      {jp:"B: いいえ、思ったほど難しくありませんでした。ホストファミリーのおかげで悩まずに済みました。",tr:"B: No, it wasn't as difficult as I thought. Thanks to my host family, I managed without worrying."},
      {jp:"A: せっかくの留学ですから、色々挑戦したほうがいいですね。",tr:"A: Since it's a precious study abroad opportunity, you should try various things."},
      {jp:"B: そうですね。もっと早く相談すればよかったのにと後悔することもありますが。",tr:"B: That's right. Sometimes I regret that I should have consulted someone sooner."},
      {jp:"A: 毎日頑張っているから、上達するわけですよ。",tr:"A: Since you're working hard every day, it makes sense that you'd improve."},
      {jp:"B: ありがとうございます。留学して以来、世界の見方が変わった気がします。",tr:"B: Thank you. I feel like my view of the world has changed since studying abroad."},
    ],
    tips: [
      "〜以来 marks the starting point of an ongoing state. It doesn't describe one-time past events.",
      "せっかく highlights effort or rarity. Pair with のだから (positive) or のに (regret).",
      "さえ replaces particles が/を/は to mean 'even'. It implies 'if even this, then certainly other things too'.",
      "〜ないで済む expresses relief. The ずに済む form is more formal/written.",
      "ほど〜ない is essential for comparisons: 思ったほど難しくない (not as hard as I thought).",
      "〜わけだ shows you logically understand a situation — great for showing empathy in conversation.",
    ],
    quiz: [
      {q:"日本に来て___、毎日漢字を勉強している。",opts:["以来","から","ので","ために"],a:0},
      {q:"最近、日本語が上手になった___。",opts:["ような気がする","ようにする","ようになる","ようだ"],a:0},
      {q:"___日本に来たのだから、色々体験しよう。",opts:["せっかく","わざわざ","やっと","さすが"],a:0},
      {q:"忙しくて、寝る時間___なかった。",opts:["さえ","しか","だけ","ばかり"],a:0},
      {q:"日本に来た___で、まだ何も分からない。",opts:["ばかり","だけ","しか","ところ"],a:0},
      {q:"保険があったので、払わ___済んだ。",opts:["ずに","ないで","なくて","ないと"],a:0},
      {q:"アメリカの電車は日本___便利ではない。",opts:["ほど","より","くらい","だけ"],a:0},
      {q:"毎日練習しているから、上手になる___だ。",opts:["わけ","はず","こと","もの"],a:0},
      {q:"もっと早く相談___よかったのに。",opts:["すれば","したら","すると","しても"],a:0},
      {q:"来た___のころは大変だった。",opts:["ばかり","だけ","しか","ところ"],a:0},
      {q:"友達が助けてくれたので、一人で悩まないで___。",opts:["済んだ","よかった","いた","おいた"],a:0},
    ],
  },

  // ============================================================
  // Lesson 5: Japanese Food & Cooking
  // ============================================================
  {
    id: "q1-l5",
    lesson: 5,
    title: "Japanese Food & Cooking",
    jp: "日本の食べ物と料理",
    book: "Quartet I",
    xp: 175,
    coins: 43,
    vocab: [
      {j:"りょうり",r:"料理",e:"cooking; cuisine; dish"},
      {j:"ざいりょう",r:"材料",e:"ingredients; materials"},
      {j:"ちょうみりょう",r:"調味料",e:"seasoning; condiment"},
      {j:"しょうゆ",r:"醤油",e:"soy sauce"},
      {j:"みりん",r:"味醂",e:"mirin (sweet rice wine)"},
      {j:"さとう",r:"砂糖",e:"sugar"},
      {j:"しお",r:"塩",e:"salt"},
      {j:"す",r:"酢",e:"vinegar"},
      {j:"だし",r:"出汁",e:"stock; broth"},
      {j:"にくじゃが",r:"肉じゃが",e:"meat and potato stew"},
      {j:"すし",r:"寿司",e:"sushi"},
      {j:"かいてんずし",r:"回転寿司",e:"conveyor belt sushi"},
      {j:"さしみ",r:"刺身",e:"sashimi (raw fish)"},
      {j:"やく",r:"焼く",e:"to grill; to bake"},
      {j:"にる",r:"煮る",e:"to simmer; to boil"},
      {j:"いためる",r:"炒める",e:"to stir-fry"},
      {j:"むす",r:"蒸す",e:"to steam"},
      {j:"あげる",r:"揚げる",e:"to deep-fry"},
      {j:"きる",r:"切る",e:"to cut"},
      {j:"まぜる",r:"混ぜる",e:"to mix"},
      {j:"くわえる",r:"加える",e:"to add"},
      {j:"たく",r:"炊く",e:"to cook (rice)"},
      {j:"なべ",r:"鍋",e:"pot; hot pot dish"},
      {j:"フライパン",r:"フライパン",e:"frying pan"},
      {j:"ほうちょう",r:"包丁",e:"kitchen knife"},
      {j:"まないた",r:"まな板",e:"cutting board"},
      {j:"はし",r:"箸",e:"chopsticks"},
      {j:"ちゃわん",r:"茶碗",e:"rice bowl; teacup"},
      {j:"さら",r:"皿",e:"plate; dish"},
      {j:"しょくぶんか",r:"食文化",e:"food culture"},
      {j:"わしょく",r:"和食",e:"Japanese cuisine"},
      {j:"ようしょく",r:"洋食",e:"Western-style food"},
      {j:"いただきます",r:"いただきます",e:"phrase before eating"},
      {j:"ごちそうさま",r:"ごちそうさま",e:"phrase after eating"},
      {j:"あじ",r:"味",e:"taste; flavor"},
      {j:"かおり",r:"香り",e:"aroma; fragrance"},
      {j:"しんせん",r:"新鮮",e:"fresh"},
      {j:"けんこう",r:"健康",e:"health"},
      {j:"えいよう",r:"栄養",e:"nutrition"},
      {j:"レシピ",r:"レシピ",e:"recipe"},
      {j:"おかわり",r:"お代わり",e:"refill; second helping"},
      {j:"ちゅうもん",r:"注文",e:"order"},
    ],
    grammar: [
      {
        p: "Question word〜ても",
        explanation: "Means 'no matter (what/where/when/who/how)'. Expresses that the result is the same regardless.",
        examples: [
          {jp:"何を食べてもおいしい。",tr:"No matter what I eat, it's delicious."},
          {jp:"どこに行っても、日本料理が食べられる。",tr:"No matter where you go, you can eat Japanese food."},
        ],
        note: "Interrogative + ても = 'no matter...' Always followed by a consistent result."
      },
      {
        p: "〜たび(に)",
        explanation: "Means 'every time; whenever'. Expresses that something happens each time.",
        examples: [
          {jp:"日本に行くたびに、新しい料理を試す。",tr:"Every time I go to Japan, I try new dishes."},
          {jp:"この店に来るたびに、混んでいる。",tr:"Every time I come to this restaurant, it's crowded."},
        ],
        note: "Vる/Nの + たびに. Similar to 〜とき but emphasizes repetition."
      },
      {
        p: "〜はずだ",
        explanation: "Expresses a confident expectation based on logic or evidence. 'It should be; it's expected that'.",
        examples: [
          {jp:"この材料で作れば、おいしいはずだ。",tr:"If you make it with these ingredients, it should be delicious."},
          {jp:"予約したから、席があるはずだ。",tr:"Since I made a reservation, there should be seats."},
        ],
        note: "Based on reasoning. はずがない = 'there's no way that'."
      },
      {
        p: "〜ておく / 〜ないでおく",
        explanation: "Means 'to do something in advance/preparation' or 'to leave something as is'.",
        examples: [
          {jp:"材料を買っておいた。",tr:"I bought the ingredients in advance."},
          {jp:"味を見て、まだ塩を入れないでおこう。",tr:"After tasting, let's leave it without adding salt yet."},
        ],
        note: "ておく = prepare in advance. ないでおく = deliberately leave undone."
      },
      {
        p: "まず / 次に / それから / 最後に",
        explanation: "Sequence markers for describing steps: First / Next / Then / Finally.",
        examples: [
          {jp:"まず材料を切る。次に鍋に油を入れる。それから肉を炒める。最後に醤油を加える。",tr:"First, cut the ingredients. Next, put oil in the pot. Then, stir-fry the meat. Finally, add soy sauce."},
        ],
        note: "Essential for giving instructions, especially recipes."
      },
      {
        p: "(もし)〜ても",
        explanation: "Means 'even if'. Expresses that the result won't change regardless of the condition.",
        examples: [
          {jp:"もし失敗しても、もう一度作ればいい。",tr:"Even if you fail, you can just make it again."},
          {jp:"高くても、新鮮な魚を買うべきだ。",tr:"Even if it's expensive, you should buy fresh fish."},
        ],
        note: "Concessive conditional. Different from たら/ば (which expect the result to follow)."
      },
      {
        p: "〜ように",
        explanation: "Expresses purpose with non-volitional verbs: 'so that'. Also used for indirect commands.",
        examples: [
          {jp:"子供でも食べられるように、小さく切った。",tr:"I cut it small so that even children can eat it."},
          {jp:"味が分かるように、少し味見してください。",tr:"Please taste a little so you can tell the flavor."},
        ],
        note: "Used with potential/intransitive verbs. Different from ために (volitional verbs)."
      },
      {
        p: "Nにする",
        explanation: "Means 'to decide on N; to choose N'. Common when ordering or making selections.",
        examples: [
          {jp:"私は天ぷらにします。",tr:"I'll have the tempura. (I'll go with tempura.)"},
          {jp:"飲み物はお茶にしましょう。",tr:"Let's make the drink tea."},
        ],
        note: "Very common for ordering in restaurants. Compare with ことにする (decide to do)."
      },
      {
        p: "〜だけあって",
        explanation: "Means 'as expected of; befitting'. Acknowledges that something lives up to its reputation.",
        examples: [
          {jp:"有名な店だけあって、どの料理もおいしい。",tr:"As expected of a famous restaurant, every dish is delicious."},
          {jp:"十年も修行しただけあって、腕がいい。",tr:"Having trained for ten years, his skill is impressive, as you'd expect."},
        ],
        note: "Positive evaluation. The result matches the expectation."
      },
    ],
    kanji: [
      {char:"料",on:"リョウ",kun:"",meaning:"fee; material",examples:[{word:"料理",reading:"りょうり",meaning:"cooking"},{word:"材料",reading:"ざいりょう",meaning:"ingredients"}]},
      {char:"材",on:"ザイ",kun:"",meaning:"material",examples:[{word:"材料",reading:"ざいりょう",meaning:"ingredients"},{word:"木材",reading:"もくざい",meaning:"lumber"}]},
      {char:"調",on:"チョウ",kun:"しら-べる",meaning:"investigate; tune",examples:[{word:"調味料",reading:"ちょうみりょう",meaning:"seasoning"},{word:"調べる",reading:"しらべる",meaning:"to investigate"}]},
      {char:"味",on:"ミ",kun:"あじ",meaning:"taste; flavor",examples:[{word:"味",reading:"あじ",meaning:"taste"},{word:"調味料",reading:"ちょうみりょう",meaning:"seasoning"}]},
      {char:"醤",on:"ショウ",kun:"ひしお",meaning:"soy; fermented",examples:[{word:"醤油",reading:"しょうゆ",meaning:"soy sauce"}]},
      {char:"油",on:"ユ",kun:"あぶら",meaning:"oil",examples:[{word:"醤油",reading:"しょうゆ",meaning:"soy sauce"},{word:"油",reading:"あぶら",meaning:"oil"}]},
      {char:"砂",on:"サ",kun:"すな",meaning:"sand",examples:[{word:"砂糖",reading:"さとう",meaning:"sugar"},{word:"砂",reading:"すな",meaning:"sand"}]},
      {char:"糖",on:"トウ",kun:"",meaning:"sugar",examples:[{word:"砂糖",reading:"さとう",meaning:"sugar"}]},
      {char:"塩",on:"エン",kun:"しお",meaning:"salt",examples:[{word:"塩",reading:"しお",meaning:"salt"},{word:"塩分",reading:"えんぶん",meaning:"salt content"}]},
      {char:"酢",on:"サク",kun:"す",meaning:"vinegar",examples:[{word:"酢",reading:"す",meaning:"vinegar"}]},
      {char:"焼",on:"ショウ",kun:"や-く",meaning:"burn; grill",examples:[{word:"焼く",reading:"やく",meaning:"to grill"},{word:"焼き鳥",reading:"やきとり",meaning:"grilled chicken"}]},
      {char:"煮",on:"シャ",kun:"に-る",meaning:"boil; simmer",examples:[{word:"煮る",reading:"にる",meaning:"to simmer"},{word:"煮物",reading:"にもの",meaning:"simmered dish"}]},
      {char:"炒",on:"ソウ",kun:"いた-める",meaning:"stir-fry",examples:[{word:"炒める",reading:"いためる",meaning:"to stir-fry"}]},
      {char:"蒸",on:"ジョウ",kun:"む-す",meaning:"steam",examples:[{word:"蒸す",reading:"むす",meaning:"to steam"},{word:"蒸し暑い",reading:"むしあつい",meaning:"humid"}]},
      {char:"揚",on:"ヨウ",kun:"あ-げる",meaning:"fry; raise",examples:[{word:"揚げる",reading:"あげる",meaning:"to deep-fry"},{word:"揚げ物",reading:"あげもの",meaning:"fried food"}]},
      {char:"混",on:"コン",kun:"ま-ぜる",meaning:"mix",examples:[{word:"混ぜる",reading:"まぜる",meaning:"to mix"},{word:"混む",reading:"こむ",meaning:"to be crowded"}]},
      {char:"加",on:"カ",kun:"くわ-える",meaning:"add",examples:[{word:"加える",reading:"くわえる",meaning:"to add"},{word:"参加",reading:"さんか",meaning:"participation"}]},
      {char:"炊",on:"スイ",kun:"た-く",meaning:"cook (rice)",examples:[{word:"炊く",reading:"たく",meaning:"to cook rice"},{word:"炊飯器",reading:"すいはんき",meaning:"rice cooker"}]},
      {char:"鍋",on:"",kun:"なべ",meaning:"pot; pan",examples:[{word:"鍋",reading:"なべ",meaning:"pot"},{word:"鍋物",reading:"なべもの",meaning:"hot pot"}]},
      {char:"包",on:"ホウ",kun:"つつ-む",meaning:"wrap",examples:[{word:"包丁",reading:"ほうちょう",meaning:"kitchen knife"},{word:"包む",reading:"つつむ",meaning:"to wrap"}]},
      {char:"箸",on:"",kun:"はし",meaning:"chopsticks",examples:[{word:"箸",reading:"はし",meaning:"chopsticks"}]},
      {char:"皿",on:"",kun:"さら",meaning:"plate; dish",examples:[{word:"皿",reading:"さら",meaning:"plate"},{word:"灰皿",reading:"はいざら",meaning:"ashtray"}]},
      {char:"鮮",on:"セン",kun:"あざ-やか",meaning:"fresh; vivid",examples:[{word:"新鮮",reading:"しんせん",meaning:"fresh"},{word:"鮮やか",reading:"あざやか",meaning:"vivid"}]},
      {char:"栄",on:"エイ",kun:"さか-える",meaning:"prosper; glory",examples:[{word:"栄養",reading:"えいよう",meaning:"nutrition"},{word:"栄える",reading:"さかえる",meaning:"to prosper"}]},
      {char:"養",on:"ヨウ",kun:"やしな-う",meaning:"nourish; foster",examples:[{word:"栄養",reading:"えいよう",meaning:"nutrition"},{word:"養う",reading:"やしなう",meaning:"to nourish"}]},
    ],
    reading: [
      {
        title: "回転寿司の楽しみ方",
        titleEn: "How to Enjoy Conveyor Belt Sushi",
        text: "日本に行くたびに回転寿司に行く。何と言っても、どの皿を食べてもおいしいし、値段も安い。有名な店だけあって、魚はいつも新鮮なはずだ。まず席に座ったら、目の前を流れる皿から好きなものを取る。次にタッチパネルで注文することもできる。もし食べたいネタがなくても、少し待てば来るはずだ。最後にお茶を飲んで、皿を数えてもらう。子供でも楽しめるように、デザートやジュースも流れている。私はいつもサーモンにする。回転寿司は安くておいしいだけあって、日本で一番人気のある外食の一つだ。",
        translation: "Every time I go to Japan, I go to conveyor belt sushi. Above all, no matter which plate you eat, it's delicious, and the prices are cheap. As expected of a famous restaurant, the fish should always be fresh. First, after sitting down, take what you like from the plates flowing in front of you. Next, you can also order from a touch panel. Even if the topping you want isn't there, if you wait a bit it should come. Finally, drink tea and have them count your plates. So that even children can enjoy it, desserts and juice also flow on the belt. I always go with salmon. Conveyor belt sushi, as befitting something cheap and delicious, is one of the most popular dining-out options in Japan.",
        notes: [
          "たびに shows the repeated pattern of visiting.",
          "何を食べても means 'no matter what you eat'.",
          "だけあって shows the restaurant living up to its reputation.",
          "はずだ expresses confident expectation.",
          "ように expresses purpose (so that children can enjoy).",
          "にする is used for choosing/ordering."
        ]
      }
    ],
    dialogue: [
      {jp:"A: 今日の晩ごはんは何にしますか。",tr:"A: What shall we have for dinner today?"},
      {jp:"B: 肉じゃがにしましょう。レシピを見ておきましたから。",tr:"B: Let's go with nikujaga. I looked at a recipe in advance."},
      {jp:"A: いいですね。まず何をしますか。",tr:"A: Sounds good. What do we do first?"},
      {jp:"B: まず材料を切ります。次に鍋で肉を炒めて、それからじゃがいもを加えます。",tr:"B: First, cut the ingredients. Next, stir-fry the meat in the pot, then add the potatoes."},
      {jp:"A: 醤油はいつ入れますか。",tr:"A: When do we add the soy sauce?"},
      {jp:"B: 最後に醤油と砂糖を加えて煮ます。この材料で作れば、おいしいはずですよ。",tr:"B: Finally, add soy sauce and sugar and simmer. If we make it with these ingredients, it should be delicious."},
      {jp:"A: もし失敗しても、もう一度作ればいいですね。",tr:"A: Even if we fail, we can just make it again, right?"},
      {jp:"B: そうですよ。料理は作るたびに上手になりますから。",tr:"B: That's right. Cooking improves every time you make it."},
    ],
    tips: [
      "Question word + ても (何を食べても, どこに行っても) means 'no matter what/where'.",
      "〜たびに (every time) vs 〜とき (when) — たびに emphasizes repeated occurrence.",
      "はずだ is based on logic/evidence. Don't use it for hopes or wishes (use といい for that).",
      "Sequence markers (まず→次に→それから→最後に) are essential for recipes and instructions.",
      "Nにする is the standard way to order in a restaurant: 私はこれにします。",
      "だけあって is always positive — it praises something for living up to expectations.",
    ],
    quiz: [
      {q:"何を___もおいしい。",opts:["食べて","食べた","食べる","食べない"],a:0},
      {q:"日本に行く___、寿司を食べる。",opts:["たびに","ときに","うちに","あいだに"],a:0},
      {q:"予約したから、席がある___だ。",opts:["はず","わけ","こと","もの"],a:0},
      {q:"明日のために、材料を買って___。",opts:["おいた","あった","いた","みた"],a:0},
      {q:"___野菜を切る。___鍋に入れる。",opts:["まず / 次に","次に / まず","最後に / まず","それから / まず"],a:0},
      {q:"もし失敗___、もう一度やればいい。",opts:["しても","したら","すれば","すると"],a:0},
      {q:"子供でも食べられる___、小さく切った。",opts:["ように","ために","ことに","わけに"],a:0},
      {q:"飲み物はお茶___しましょう。",opts:["に","を","で","が"],a:0},
      {q:"有名な店___、どの料理もおいしい。",opts:["だけあって","だけで","ばかりで","しかなくて"],a:0},
      {q:"まだ塩を入れない___。",opts:["でおこう","ておこう","でみよう","てみよう"],a:0},
      {q:"この店に来る___混んでいる。",opts:["たびに","ために","うちに","ことに"],a:0},
      {q:"どこに___日本料理が食べられる。",opts:["行っても","行ったら","行けば","行くと"],a:0},
    ],
  },

  // ============================================================
  // Lesson 6: Voices on Japanese Society
  // ============================================================
  {
    id: "q1-l6",
    lesson: 6,
    title: "Voices on Japanese Society",
    jp: "日本社会の声",
    book: "Quartet I",
    xp: 180,
    coins: 45,
    vocab: [
      {j:"しゃかい",r:"社会",e:"society"},
      {j:"もんだい",r:"問題",e:"problem; issue"},
      {j:"いけん",r:"意見",e:"opinion"},
      {j:"ぎろん",r:"議論",e:"debate; discussion"},
      {j:"さんせい",r:"賛成",e:"agreement; approval"},
      {j:"はんたい",r:"反対",e:"opposition; objection"},
      {j:"かんきょう",r:"環境",e:"environment"},
      {j:"ほうそう",r:"包装",e:"packaging; wrapping"},
      {j:"かじょうほうそう",r:"過剰包装",e:"excessive packaging"},
      {j:"ごみ",r:"ごみ",e:"garbage; trash"},
      {j:"リサイクル",r:"リサイクル",e:"recycling"},
      {j:"エコ",r:"エコ",e:"eco-friendly"},
      {j:"むだ",r:"無駄",e:"waste; useless"},
      {j:"もったいない",r:"もったいない",e:"wasteful; too good to waste"},
      {j:"きょういく",r:"教育",e:"education"},
      {j:"えいごきょういく",r:"英語教育",e:"English education"},
      {j:"しょうがっこう",r:"小学校",e:"elementary school"},
      {j:"せいさく",r:"政策",e:"policy"},
      {j:"こくさいか",r:"国際化",e:"internationalization"},
      {j:"ひつよう",r:"必要",e:"necessary; need"},
      {j:"ふひつよう",r:"不必要",e:"unnecessary"},
      {j:"えいきょう",r:"影響",e:"influence; effect"},
      {j:"けっか",r:"結果",e:"result; consequence"},
      {j:"げんいん",r:"原因",e:"cause; origin"},
      {j:"たいさく",r:"対策",e:"countermeasure"},
      {j:"じっさい",r:"実際",e:"actually; in reality"},
      {j:"しゅちょう",r:"主張",e:"assertion; claim"},
      {j:"りゆう",r:"理由",e:"reason"},
      {j:"たちば",r:"立場",e:"standpoint; position"},
      {j:"しんぶん",r:"新聞",e:"newspaper"},
      {j:"きじ",r:"記事",e:"article"},
      {j:"ちょうさ",r:"調査",e:"survey; investigation"},
      {j:"わりあい",r:"割合",e:"ratio; proportion"},
      {j:"ふえる",r:"増える",e:"to increase"},
      {j:"へる",r:"減る",e:"to decrease"},
      {j:"うったえる",r:"訴える",e:"to appeal; to complain"},
      {j:"みなおす",r:"見直す",e:"to review; to reconsider"},
      {j:"とりあげる",r:"取り上げる",e:"to take up (a topic)"},
      {j:"わざわざ",r:"わざわざ",e:"to go out of one's way; specially"},
      {j:"はたして",r:"果たして",e:"really; as expected"},
      {j:"かならずしも",r:"必ずしも",e:"not necessarily"},
      {j:"そもそも",r:"そもそも",e:"in the first place"},
    ],
    grammar: [
      {
        p: "〜(という)わけではない",
        explanation: "Means 'it doesn't mean that; it's not the case that'. Partially denies an assumption.",
        examples: [
          {jp:"英語教育に反対というわけではない。",tr:"It's not that I'm against English education."},
          {jp:"包装が全部無駄だというわけではない。",tr:"It's not that all packaging is wasteful."},
        ],
        note: "Softens a denial. 'Not entirely; not exactly.' Often followed by が/けど + real opinion."
      },
      {
        p: "Nからみると / すると / いうと",
        explanation: "Means 'from the perspective of N; viewed from N's standpoint'.",
        examples: [
          {jp:"親からみると、子供の英語教育は大切だ。",tr:"From a parent's perspective, children's English education is important."},
          {jp:"環境の面からすると、過剰包装は問題だ。",tr:"From an environmental standpoint, excessive packaging is a problem."},
        ],
        note: "Three variants with similar meaning. からいうと is slightly more evaluative."
      },
      {
        p: "〜(の)ではない(だろう)か",
        explanation: "Means 'isn't it the case that; I think it might be'. A soft way to state an opinion or make a suggestion.",
        examples: [
          {jp:"もっとリサイクルを進めるべきではないだろうか。",tr:"Shouldn't we promote recycling more?"},
          {jp:"この問題はもっと議論する必要があるのではないか。",tr:"Isn't there a need to discuss this problem more?"},
        ],
        note: "Rhetorical question form. Softly asserts the speaker's opinion."
      },
      {
        p: "〜がる",
        explanation: "Describes another person's apparent feelings or desires. Attaches to adjective stems or たい-form stems.",
        examples: [
          {jp:"子供たちは英語を学びたがっている。",tr:"The children seem to want to study English."},
          {jp:"彼は寂しがっている。",tr:"He appears to be feeling lonely."},
        ],
        note: "Used for third person feelings. 〜がっている for current state."
      },
      {
        p: "〜(よ)うとする / しない",
        explanation: "Means 'try to do / refuse to do'. Expresses an attempt or resistance.",
        examples: [
          {jp:"ごみを減らそうとする努力が必要だ。",tr:"Effort to try to reduce garbage is necessary."},
          {jp:"彼は意見を変えようとしない。",tr:"He refuses to change his opinion."},
        ],
        note: "Volitional form + とする = attempt. + としない = refusal."
      },
      {
        p: "〜まま",
        explanation: "Means 'as it is; while remaining in a state'. Describes doing something without changing the current condition.",
        examples: [
          {jp:"テレビをつけたまま寝てしまった。",tr:"I fell asleep with the TV still on."},
          {jp:"問題を放置したままでは解決しない。",tr:"If we leave the problem as is, it won't be solved."},
        ],
        note: "Vた/Vない + まま. The state from the first clause continues."
      },
      {
        p: "〜ようにいう",
        explanation: "Means 'to tell someone to do something'. Used to report indirect commands or requests.",
        examples: [
          {jp:"先生は学生にもっと本を読むように言った。",tr:"The teacher told the students to read more books."},
          {jp:"母にごみを分別するように言われた。",tr:"My mother told me to sort the garbage."},
        ],
        note: "Indirect command: Vる/Vない + ように言う. Softer than 〜と命令する."
      },
      {
        p: "〜ほど",
        explanation: "Means 'to the extent that; so much that'. Expresses degree or extent.",
        examples: [
          {jp:"泣きたいほど悔しかった。",tr:"I was so frustrated that I wanted to cry."},
          {jp:"この問題は無視できないほど深刻だ。",tr:"This problem is serious to the extent that it cannot be ignored."},
        ],
        note: "Degree expression. Often with a surprising or extreme result."
      },
      {
        p: "わざわざ",
        explanation: "Means 'to go out of one's way; to take the trouble to'. Emphasizes unnecessary or special effort.",
        examples: [
          {jp:"わざわざ遠い店まで買いに行く必要はない。",tr:"There's no need to go out of your way to buy from a distant store."},
          {jp:"わざわざ来てくださって、ありがとうございます。",tr:"Thank you for taking the trouble to come."},
        ],
        note: "Can be positive (grateful) or negative (unnecessary effort) depending on context."
      },
    ],
    kanji: [
      {char:"社",on:"シャ",kun:"やしろ",meaning:"company; shrine",examples:[{word:"社会",reading:"しゃかい",meaning:"society"},{word:"会社",reading:"かいしゃ",meaning:"company"}]},
      {char:"議",on:"ギ",kun:"",meaning:"deliberation",examples:[{word:"議論",reading:"ぎろん",meaning:"debate"},{word:"会議",reading:"かいぎ",meaning:"meeting"}]},
      {char:"論",on:"ロン",kun:"",meaning:"theory; argument",examples:[{word:"議論",reading:"ぎろん",meaning:"debate"},{word:"論文",reading:"ろんぶん",meaning:"thesis"}]},
      {char:"賛",on:"サン",kun:"",meaning:"approve",examples:[{word:"賛成",reading:"さんせい",meaning:"agreement"}]},
      {char:"反",on:"ハン",kun:"そ-る",meaning:"anti; oppose",examples:[{word:"反対",reading:"はんたい",meaning:"opposition"},{word:"反省",reading:"はんせい",meaning:"reflection"}]},
      {char:"環",on:"カン",kun:"",meaning:"ring; surround",examples:[{word:"環境",reading:"かんきょう",meaning:"environment"},{word:"循環",reading:"じゅんかん",meaning:"circulation"}]},
      {char:"境",on:"キョウ",kun:"さかい",meaning:"boundary",examples:[{word:"環境",reading:"かんきょう",meaning:"environment"},{word:"国境",reading:"こっきょう",meaning:"border"}]},
      {char:"装",on:"ソウ",kun:"よそお-う",meaning:"attire; pretend",examples:[{word:"包装",reading:"ほうそう",meaning:"packaging"},{word:"装う",reading:"よそおう",meaning:"to dress up"}]},
      {char:"駄",on:"ダ",kun:"",meaning:"burdensome; useless",examples:[{word:"無駄",reading:"むだ",meaning:"waste"}]},
      {char:"育",on:"イク",kun:"そだ-てる",meaning:"raise; educate",examples:[{word:"教育",reading:"きょういく",meaning:"education"},{word:"育てる",reading:"そだてる",meaning:"to raise"}]},
      {char:"策",on:"サク",kun:"",meaning:"scheme; plan",examples:[{word:"政策",reading:"せいさく",meaning:"policy"},{word:"対策",reading:"たいさく",meaning:"countermeasure"}]},
      {char:"際",on:"サイ",kun:"きわ",meaning:"occasion; edge",examples:[{word:"国際化",reading:"こくさいか",meaning:"internationalization"},{word:"実際",reading:"じっさい",meaning:"actually"}]},
      {char:"必",on:"ヒツ",kun:"かなら-ず",meaning:"necessarily",examples:[{word:"必要",reading:"ひつよう",meaning:"necessary"},{word:"必ず",reading:"かならず",meaning:"surely"}]},
      {char:"要",on:"ヨウ",kun:"い-る",meaning:"need; essential",examples:[{word:"必要",reading:"ひつよう",meaning:"necessary"},{word:"重要",reading:"じゅうよう",meaning:"important"}]},
      {char:"結",on:"ケツ",kun:"むす-ぶ",meaning:"tie; bind",examples:[{word:"結果",reading:"けっか",meaning:"result"},{word:"結婚",reading:"けっこん",meaning:"marriage"}]},
      {char:"果",on:"カ",kun:"は-たす",meaning:"fruit; result",examples:[{word:"結果",reading:"けっか",meaning:"result"},{word:"果たして",reading:"はたして",meaning:"really"}]},
      {char:"原",on:"ゲン",kun:"はら",meaning:"origin; field",examples:[{word:"原因",reading:"げんいん",meaning:"cause"},{word:"原料",reading:"げんりょう",meaning:"raw materials"}]},
      {char:"因",on:"イン",kun:"",meaning:"cause",examples:[{word:"原因",reading:"げんいん",meaning:"cause"}]},
      {char:"張",on:"チョウ",kun:"は-る",meaning:"stretch; assert",examples:[{word:"主張",reading:"しゅちょう",meaning:"assertion"},{word:"張る",reading:"はる",meaning:"to stretch"}]},
      {char:"査",on:"サ",kun:"",meaning:"investigate",examples:[{word:"調査",reading:"ちょうさ",meaning:"survey"},{word:"検査",reading:"けんさ",meaning:"inspection"}]},
      {char:"割",on:"カツ",kun:"わ-る",meaning:"divide; ratio",examples:[{word:"割合",reading:"わりあい",meaning:"ratio"},{word:"割る",reading:"わる",meaning:"to divide"}]},
      {char:"増",on:"ゾウ",kun:"ふ-える",meaning:"increase",examples:[{word:"増える",reading:"ふえる",meaning:"to increase"},{word:"増加",reading:"ぞうか",meaning:"increase"}]},
      {char:"減",on:"ゲン",kun:"へ-る",meaning:"decrease",examples:[{word:"減る",reading:"へる",meaning:"to decrease"},{word:"減少",reading:"げんしょう",meaning:"decrease"}]},
      {char:"訴",on:"ソ",kun:"うった-える",meaning:"appeal; sue",examples:[{word:"訴える",reading:"うったえる",meaning:"to appeal"}]},
      {char:"直",on:"チョク",kun:"なお-す",meaning:"fix; direct",examples:[{word:"見直す",reading:"みなおす",meaning:"to reconsider"},{word:"直す",reading:"なおす",meaning:"to fix"}]},
    ],
    reading: [
      {
        title: "過剰包装について考える",
        titleEn: "Thinking About Excessive Packaging",
        text: "日本のお店で買い物をすると、包装が多いことに気がつく。お菓子一つ買っても、個別に包まれていて、さらに箱に入っている。環境の面からみると、これは問題ではないだろうか。包装が全部無駄だというわけではない。衛生のために必要な場合もある。しかし、ごみが泣きたいほど増えているのも事実だ。政府はリサイクルを進めるように言っているが、問題を放置したままでは解決しない。消費者も、わざわざ過剰包装の商品を選ぶ必要はないだろう。ごみを減らそうとする努力が一人一人に求められているのではないだろうか。",
        translation: "When you shop at a Japanese store, you notice that there is a lot of packaging. Even when you buy a single snack, it's individually wrapped and placed in a box. From an environmental perspective, isn't this a problem? It's not that all packaging is wasteful. There are cases where it's necessary for hygiene. However, it's also a fact that garbage has increased to a crying degree. The government is telling people to promote recycling, but if the problem is left as is, it won't be solved. Consumers probably don't need to go out of their way to choose excessively packaged products. Isn't each individual's effort to try to reduce garbage being called for?",
        notes: [
          "からみると introduces the environmental perspective.",
          "〜ではないだろうか softly asserts the writer's opinion.",
          "というわけではない partially denies — 'not entirely wasteful.'",
          "ほど expresses degree — garbage increased to a shocking extent.",
          "まま shows the problem stays in its current unchanged state.",
          "ようにいう reports the government's indirect command.",
          "わざわざ highlights unnecessary effort."
        ]
      }
    ],
    dialogue: [
      {jp:"A: 小学校からの英語教育についてどう思いますか。",tr:"A: What do you think about English education from elementary school?"},
      {jp:"B: 英語教育に反対というわけではありませんが、早すぎるのではないかと思います。",tr:"B: It's not that I'm against English education, but I wonder if it's too early."},
      {jp:"A: 親からみると、早く始めたほうがいいと思う人が多いですよね。",tr:"A: From a parent's perspective, many people think it's better to start early, right?"},
      {jp:"B: そうですが、子供たちは遊びたがっている年齢ですよ。",tr:"B: That's true, but children are at an age where they want to play."},
      {jp:"A: 国際化のために必要だと主張する人もいますが。",tr:"A: Some people assert that it's necessary for internationalization, though."},
      {jp:"B: 問題を放置したままでいいとは言いませんが、もっと議論するべきではないでしょうか。",tr:"B: I'm not saying it's fine to leave the problem as is, but shouldn't we discuss it more?"},
      {jp:"A: 確かに。教育の問題は子供の将来に関わりますから、慎重に考えるべきですね。",tr:"A: Indeed. Since education issues affect children's futures, we should think carefully."},
      {jp:"B: ごみの問題と同じで、一人一人が考えようとすることが大切だと思います。",tr:"B: Like the garbage problem, I think it's important that each person tries to think about it."},
    ],
    tips: [
      "〜というわけではない is great for diplomatic disagreement. 'It's not that I disagree, but...'",
      "からみると/すると/いうと all mean 'from the perspective of'. Use them to present different viewpoints.",
      "〜のではないだろうか is a polite, indirect way to state your opinion in essays and debates.",
      "〜がる is only for third person feelings. Never use it about yourself (use たい/ほしい instead).",
      "〜まま implies the state is continuing unchanged. Often implies something should be done about it.",
      "わざわざ can be grateful or critical depending on context — pay attention to tone.",
    ],
    quiz: [
      {q:"反対___わけではないが、もう少し考えたい。",opts:["という","という の","との","なの"],a:0},
      {q:"環境の面___みると、包装は問題だ。",opts:["から","に","で","を"],a:0},
      {q:"もっと議論する必要がある___ないだろうか。",opts:["ので は","のに","のが","のを"],a:0},
      {q:"子供たちは外で遊び___いる。",opts:["たがって","たくて","たいで","たいと"],a:0},
      {q:"ごみを減ら___とする努力が必要だ。",opts:["そう","して","さない","せよう"],a:0},
      {q:"テレビをつけた___寝てしまった。",opts:["まま","まで","ほど","だけ"],a:0},
      {q:"先生は本を読む___言った。",opts:["ように","ために","ことに","わけに"],a:0},
      {q:"泣きたい___悔しかった。",opts:["ほど","まで","だけ","ばかり"],a:0},
      {q:"___遠い店まで行く必要はない。",opts:["わざわざ","せっかく","さすが","やっと"],a:0},
      {q:"親の立場___すると、心配するのは当然だ。",opts:["から","に","で","と"],a:0},
      {q:"彼は意見を変え___としない。",opts:["よう","る","た","ない"],a:0},
      {q:"問題を放置した___では解決しない。",opts:["まま","ほど","だけ","まで"],a:0},
    ],
  },
];
