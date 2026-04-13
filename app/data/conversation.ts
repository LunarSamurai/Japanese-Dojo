import type { Lesson } from "../types";

export const CONV: Lesson[] = [
  {
    id:"cv-1", title:"Meeting the Parents", jp:"ご両親への挨拶", category:"Real Life", xp:120, coins:35,
    situation:"You're meeting your girlfriend's parents for the first time at their home in Osaka.",
    phrases:[
      {jp:"はじめまして。〔名前〕ともうします。いつもお世話になっております。",tr:"Nice to meet you. My name is [Name]. Thank you for always taking care of [girlfriend]."},
      {jp:"本日はお招きいただきありがとうございます。",tr:"Thank you very much for inviting me today."},
      {jp:"これ、よかったらどうぞ。",tr:"Here, please (handing over a gift)."},
      {jp:"いただきます。とてもおいしいです！",tr:"(Before eating) Thank you for the meal. It's delicious!"},
      {jp:"ごちそうさまでした。本当においしかったです。",tr:"(After eating) Thank you for the wonderful meal. It was truly delicious."},
      {jp:"日本語がまだうまくないですが、がんばって勉強しています。",tr:"My Japanese isn't good yet, but I'm working hard to study."},
      {jp:"またぜひうかがわせてください。",tr:"Please let me visit again by all means."},
    ],
    tips:[
      "Bring a gift (手土産) — sweets from your area work great",
      "Bow when greeting — 15-30 degrees for acquaintances",
      "いただきます before eating is non-negotiable",
      "Don't leave food on your plate if possible",
      "Address them as お父さん/お母さん only if invited to",
    ],
    quiz:[
      {q:"What do you say BEFORE eating?",opts:["ごちそうさまでした","いただきます","おじゃまします","よろしくおねがいします"],a:1},
      {q:"What do you say AFTER eating?",opts:["いただきます","はじめまして","ごちそうさまでした","おかまいなく"],a:2},
      {q:"'Thank you for inviting me' =",opts:["よんでくれてありがとう","おまねきいただきありがとうございます","きてくれてありがとう","よんでもらいました"],a:1},
      {q:"Humble form of 'my name is' =",opts:["わたしはXといいます","わたしはXともうします","わたしはXです","わたしのなまえはX"],a:1},
    ]
  },
  {
    id:"cv-2", title:"Ordering at a Restaurant", jp:"レストランで注文する", category:"Real Life", xp:90, coins:28,
    situation:"At a Japanese restaurant — from arriving to paying.",
    phrases:[
      {jp:"すみません、二人なんですが、席はありますか？",tr:"Excuse me, there are two of us — do you have a table?"},
      {jp:"メニューをください。",tr:"Could I have the menu please?"},
      {jp:"おすすめはなんですか？",tr:"What do you recommend?"},
      {jp:"これとこれをひとつずつください。",tr:"One of this and one of this please."},
      {jp:"たまごアレルギーがあるんですが、これは大丈夫ですか？",tr:"I have an egg allergy — is this one OK?"},
      {jp:"からくないですか？",tr:"Is it not spicy?"},
      {jp:"おかいけいをおねがいします。",tr:"Could I have the bill please?"},
      {jp:"カードはつかえますか？",tr:"Can I use a card?"},
    ],
    tips:[
      "すみません = the magic word for getting attention in Japan",
      "Pointing at menus is totally acceptable",
      "You'll often hear 'いらっしゃいませ' — no response needed",
      "お会計 or でんぴょう to ask for the bill",
      "Many places are still cash only — have coins!",
    ],
    quiz:[
      {q:"How do you call a waiter's attention?",opts:["おい！","すみません","ちょっと","もしもし"],a:1},
      {q:"'Could I have the bill?' =",opts:["メニューください","おかいけいをおねがいします","もっとください","ごちそうさまでした"],a:1},
      {q:"'Is it spicy?' =",opts:["からいですか","あまいですか","からくないですか","からさはどうですか"],a:2},
      {q:"'Can I use a card?' =",opts:["カードをください","カードはありますか","カードはつかえますか","カードにします"],a:2},
    ]
  },
  {
    id:"cv-3", title:"Asking for Directions", jp:"道を聞く", category:"Real Life", xp:85, coins:26,
    situation:"You're in Namba and need to find a specific place.",
    phrases:[
      {jp:"すみません、〔場所〕はどこですか？",tr:"Excuse me, where is [place]?"},
      {jp:"〔場所〕に行きたいんですが、どうやっていけばいいですか？",tr:"I want to go to [place] — how do I get there?"},
      {jp:"ここから歩いていけますか？",tr:"Can I walk there from here?"},
      {jp:"だいたいどのくらいかかりますか？",tr:"About how long does it take?"},
      {jp:"すみません、もう一度ゆっくりいっていただけますか？",tr:"Excuse me, could you please say that again slowly?"},
      {jp:"ちょっとわかりませんでした。地図で見せてもらえますか？",tr:"I didn't quite understand. Could you show me on a map?"},
      {jp:"ありがとうございました、たすかりました！",tr:"Thank you so much, you've saved me!"},
    ],
    tips:[
      "たすかりました = 'you saved me' — very natural and appreciated",
      "If lost, show them your phone map instead of describing",
      "People in Japan are very helpful — don't be shy",
      "Convenience stores are great landmarks (コンビニの前)",
      "Google Maps works great in Japan",
    ],
    quiz:[
      {q:"'How do I get to [place]?' =",opts:["〔場所〕はどこにいきますか","〔場所〕にいきたいんですが、どうやっていけばいいですか","〔場所〕まであるきますか","〔場所〕はいくらですか"],a:1},
      {q:"'About how long does it take?' =",opts:["どこですか","いくらですか","どのくらいかかりますか","なんじですか"],a:2},
      {q:"'Please say that again slowly' =",opts:["もっとはなしてください","もういちどゆっくりいっていただけますか","わかりません","おそくいってください"],a:1},
      {q:"'You've saved me!' (natural expression) =",opts:["ありがとう","たすかりました","すごいです","よかったです"],a:1},
    ]
  },
  {
    id:"cv-4", title:"Talking About Yourself", jp:"自己紹介・自分のこと", category:"Conversational", xp:100, coins:30,
    situation:"Natural self-introduction — hobbies, work, life.",
    phrases:[
      {jp:"アメリカのアラバマ州から来ました。",tr:"I'm from Alabama, in the United States."},
      {jp:"サイバーセキュリティの仕事をしています。",tr:"I work in cybersecurity."},
      {jp:"音楽を作ったり、ゲームを開発したりしています。",tr:"I do things like make music and develop games."},
      {jp:"彼女のおかげで日本語に興味を持つようになりました。",tr:"Thanks to my girlfriend, I became interested in Japanese."},
      {jp:"まだ勉強中ですが、日本語がだんだん好きになってきました。",tr:"I'm still studying, but I've gradually come to love Japanese."},
      {jp:"日本の文化や歴史がとても好きです。",tr:"I really like Japanese culture and history."},
      {jp:"まだまだですが、よろしくおねがいします。",tr:"I still have a long way to go, but pleased to meet you."},
    ],
    tips:[
      "まだまだです = 'I still have a long way to go' — Japanese love this humility",
      "〜がだんだん好きになってきた = very natural for growing interest",
      "〜のおかげで = 'thanks to ~' — positive cause",
      "〜のせいで = 'because of ~' — negative cause (don't mix them up!)",
      "趣味 = hobby — one of the first questions you'll be asked",
    ],
    quiz:[
      {q:"'Thanks to my girlfriend' =",opts:["かのじょのせいで","かのじょのおかげで","かのじょのために","かのじょだから"],a:1},
      {q:"'I gradually came to like Japanese' =",opts:["にほんごがすきです","にほんごがすきになりました","にほんごがだんだんすきになってきました","にほんごをすきにしています"],a:2},
      {q:"'I still have a long way to go' (humble) =",opts:["まあまあです","まだまだです","もういいです","だいじょうぶです"],a:1},
      {q:"'I work in ~' =",opts:["〜をします","〜のしごとをしています","〜にはたらきます","〜がしごとです"],a:1},
    ]
  },
  {
    id:"cv-5", title:"Making Plans with Friends", jp:"友達と約束する", category:"Conversational", xp:95, coins:29,
    situation:"Setting up plans, suggesting places, confirming times — casual speech.",
    phrases:[
      {jp:"こんど、ごはんでもいかない？",tr:"Want to grab food sometime?"},
      {jp:"いつがひまですか？",tr:"When are you free?"},
      {jp:"土曜日はどう？",tr:"How about Saturday?"},
      {jp:"じゃあ、なんばで六時に待ち合わせしよう。",tr:"Let's meet at Namba at 6 then."},
      {jp:"なんでもいいよ、まかせる。",tr:"Anything is fine, I'll leave it to you."},
      {jp:"ごめん、やっぱりその日はちょっと…",tr:"Sorry, actually that day is a bit... (backing out politely)"},
      {jp:"じゃあ、またこんど！",tr:"Let's do it another time then!"},
    ],
    tips:[
      "でも after a noun softens: ごはんでも = something like food",
      "まかせる = 'leave it to you' — very useful casual phrase",
      "やっぱり introduces a change of mind or 'as expected'",
      "〜はちょっと… trailing off = polite rejection",
      "Japanese often suggest vague times first, then narrow down",
    ],
    quiz:[
      {q:"Casual 'Want to go?' =",opts:["いきますか","いきましょう","いかない？","いきたい？"],a:2},
      {q:"'Leave it to you / up to you' (casual) =",opts:["なんでもいい","まかせる","どちらでも","おまかせします"],a:1},
      {q:"'I'll leave it to you' (polite) =",opts:["まかせる","なんでもいいです","おまかせします","どちらでもいいです"],a:2},
      {q:"Trailing 〜はちょっと… implies:",opts:["Agreement","Strong enthusiasm","Polite reluctance/refusal","Confusion"],a:2},
    ]
  },
  {
    id:"cv-6", title:"Talking About Hobbies & Music", jp:"趣味と音楽の話", category:"Conversational", xp:105, coins:32,
    situation:"Casual conversation about music production, games, and interests.",
    phrases:[
      {jp:"趣味はなんですか？",tr:"What are your hobbies?"},
      {jp:"音楽を作ったり、ゲームを作ったりしています。",tr:"I make music and develop games and things like that."},
      {jp:"EDMとヒップホップとハイパーポップです。",tr:"EDM, hip-hop, and hyperpop."},
      {jp:"説明しにくいんですが、すごくエネルギッシュな電子音楽です。",tr:"It's hard to explain, but it's really energetic electronic music."},
      {jp:"聴かせてもらえますか？",tr:"Could you let me have a listen?"},
      {jp:"最近どんなゲームを作っていますか？",tr:"What kind of games are you making lately?"},
      {jp:"ピクセルアートのRPGを作っています。",tr:"I'm making a pixel art RPG."},
    ],
    tips:[
      "〜にくい = hard to do (説明しにくい = hard to explain)",
      "〜やすい = easy to do (わかりやすい = easy to understand)",
      "聴かせてください = please let me hear (causative + please)",
      "最近 = recently / lately — natural conversation filler",
      "〜をやっています is casual for work/hobby activities",
    ],
    quiz:[
      {q:"'Hard to explain' =",opts:["せつめいできない","せつめいしにくい","せつめいじゃない","せつめいむずかしい"],a:1},
      {q:"'Easy to understand' =",opts:["わかりにくい","わかれる","わかりやすい","わかりほしい"],a:2},
      {q:"'Could you let me hear it?' =",opts:["きいてください","きかせてもらえますか","きくことができますか","きいてみたい"],a:1},
      {q:"'I'm making a game' (ongoing) =",opts:["ゲームをつくりたい","ゲームをつくっています","ゲームをつくった","ゲームをつくります"],a:1},
    ]
  },
  {
    id:"cv-7", title:"At a Convenience Store", jp:"コンビニで", category:"Real Life", xp:75, coins:22,
    situation:"Japan's konbini culture — essential survival Japanese.",
    phrases:[
      {jp:"あたためますか？",tr:"Would you like this warmed up?"},
      {jp:"はい、おねがいします。/ いいえ、けっこうです。",tr:"Yes please. / No thank you."},
      {jp:"ふくろはいりますか？",tr:"Would you like a bag?"},
      {jp:"ポイントカードはおもちですか？",tr:"Do you have a points card?"},
      {jp:"〜ってありますか？",tr:"Do you have ~?"},
      {jp:"トイレをかしてもらえますか？",tr:"Could I use the bathroom?"},
      {jp:"ATMはどこですか？",tr:"Where is the ATM?"},
    ],
    tips:[
      "コンビニ = one of Japan's greatest inventions — 24/7, everywhere",
      "あたためますか = they'll always ask this for warm food",
      "ふくろはいりますか = bags now cost money (エコバッグ recommended)",
      "ATMs at コンビニ accept foreign cards (7-Eleven's most reliable)",
      "Saying ありがとうございます to staff is always appreciated",
    ],
    quiz:[
      {q:"'No thank you' (polite refusal) =",opts:["いいえ","けっこうです","ちがいます","だいじょうぶです"],a:1},
      {q:"'Do you have ~?' =",opts:["〜はいくらですか","〜ってありますか","〜をください","〜はどこですか"],a:1},
      {q:"'Could I use the bathroom?' =",opts:["トイレはどこですか","トイレをかしてもらえますか","トイレがあります","トイレにいきます"],a:1},
      {q:"What does あたためますか mean?",opts:["Would you like a bag?","Do you have a points card?","Would you like this warmed up?","Can I help you?"],a:2},
    ]
  },
  {
    id:"cv-8", title:"Expressing Opinions & Reacting", jp:"意見・リアクション", category:"Conversational", xp:110, coins:33,
    situation:"Having real conversations — agreeing, disagreeing, reacting naturally.",
    phrases:[
      {jp:"そうですね。/ そうだね。",tr:"That's right. / Yeah, exactly. (agreement)"},
      {jp:"なるほど。",tr:"I see. / That makes sense."},
      {jp:"たしかに。",tr:"Certainly. / You're right about that."},
      {jp:"でも、〜と思うんですけど…",tr:"But I think ~ … (polite disagreement)"},
      {jp:"それはちょっとちがうかな。",tr:"That's a bit different I think. (soft correction)"},
      {jp:"え、まじで？",tr:"Wait, seriously? (casual surprise)"},
      {jp:"わかる、わかる！",tr:"I get it, I totally get it!"},
    ],
    tips:[
      "Backchanneling (あいづち) is HUGE — use はい、なるほど、そうですね constantly",
      "Silence in Japanese conversation isn't awkward — it can be thoughtful",
      "まじで = seriously? (casual) — DO NOT use with elders",
      "〜と思うんですけど… trailing off = polite way to push back",
      "じゃないですか seeks agreement, like 'right?' or 'isn't it?'",
    ],
    quiz:[
      {q:"Natural reaction meaning 'I see / makes sense':",opts:["わかる","なるほど","そうか","ほんとうに"],a:1},
      {q:"Casual 'Seriously?!':",opts:["ほんとうですか","まじで？","そうですか","ほんとに？"],a:1},
      {q:"'I totally get it!' (emphatic casual):",opts:["わかります","なるほどです","わかる、わかる！","そうです"],a:2},
      {q:"Polite way to introduce a disagreement:",opts:["ちがいます","でも、〜とおもうんですけど…","それはだめです","ちがうとおもいます"],a:1},
    ]
  },
];
