import type { Upgrade } from "../types";

export const UPGRADES: Upgrade[] = [
  {id:"desk",name:"学習机",en:"Study Desk",desc:"+20% XP from all lessons",icon:"🪑",cost:240,category:"study"},
  {id:"coffee",name:"コーヒーメーカー",en:"Coffee Maker",desc:"Streak shield — 1 missed day protected/week",icon:"☕",cost:360,category:"study"},
  {id:"anki",name:"Ankiデッキ",en:"Anki Deck",desc:"+50 coins on all perfect quiz scores",icon:"🃏",cost:480,category:"study"},
  {id:"dict",name:"辞書コレクション",en:"Dictionary Set",desc:"Unlock hint in quizzes",icon:"📚",cost:600,category:"study"},
  {id:"partner",name:"会話パートナー",en:"Convo Partner",desc:"+40% XP on Conversation Lab lessons",icon:"🗣️",cost:840,category:"study"},
  {id:"timer",name:"集中タイマー",en:"Focus Timer",desc:"Double XP during power hour",icon:"⏱️",cost:1050,category:"study"},
  {id:"school",name:"語学学校",en:"Language School",desc:"Unlock all lesson previews before completing",icon:"🏫",cost:1500,category:"study"},
  {id:"girlfriend",name:"彼女の語学サポート",en:"Girlfriend's Support",desc:"+30% XP on ALL keigo & conversation lessons",icon:"💝",cost:1800,category:"study"},
  {id:"dojo2",name:"道場アップグレード",en:"Dojo Upgrade",desc:"2x coins on all perfect scores + temple +5 defense",icon:"⛩️",cost:2400,category:"study",defenseBonus:5},
  {id:"immersion",name:"イマージョンルーム",en:"Immersion Room",desc:"+50% XP globally — the ultimate upgrade",icon:"🎌",cost:4500,category:"study"},
];
