export interface PremiumPack {
  id: string;
  name: string;
  nameEn: string;
  price: number;          // USD price
  omamoriAmount: number;
  bonusPercent: number;    // bonus omamori percentage (0 for small packs)
  icon: string;
  featured: boolean;      // highlight this pack
  bestValue: boolean;     // "Best Value" badge
}

export const PREMIUM_PACKS: PremiumPack[] = [
  { id: "pack_tiny",    name: "小包", nameEn: "Tiny Pack",      price: 0.99,   omamoriAmount: 10,    bonusPercent: 0,   icon: "🎁", featured: false, bestValue: false },
  { id: "pack_small",   name: "小袋", nameEn: "Small Pack",     price: 1.99,   omamoriAmount: 25,    bonusPercent: 5,   icon: "🎁", featured: false, bestValue: false },
  { id: "pack_basic",   name: "基本包", nameEn: "Basic Pack",    price: 2.99,   omamoriAmount: 40,    bonusPercent: 10,  icon: "🎁", featured: false, bestValue: false },
  { id: "pack_medium",  name: "中袋", nameEn: "Medium Pack",    price: 9.99,   omamoriAmount: 150,   bonusPercent: 15,  icon: "💎", featured: false, bestValue: false },
  { id: "pack_large",   name: "大袋", nameEn: "Large Pack",     price: 14.99,  omamoriAmount: 250,   bonusPercent: 20,  icon: "💎", featured: true,  bestValue: false },
  { id: "pack_xl",      name: "特大包", nameEn: "XL Pack",       price: 29.99,  omamoriAmount: 550,   bonusPercent: 25,  icon: "💎", featured: false, bestValue: true  },
  { id: "pack_mega",    name: "巨大包", nameEn: "Mega Pack",     price: 39.99,  omamoriAmount: 800,   bonusPercent: 30,  icon: "👑", featured: false, bestValue: false },
  { id: "pack_ultra",   name: "超大包", nameEn: "Ultra Pack",    price: 49.99,  omamoriAmount: 1100,  bonusPercent: 35,  icon: "👑", featured: true,  bestValue: false },
  { id: "pack_supreme", name: "至高包", nameEn: "Supreme Pack",  price: 79.99,  omamoriAmount: 2000,  bonusPercent: 40,  icon: "👑", featured: false, bestValue: true  },
  { id: "pack_divine",  name: "神包",  nameEn: "Divine Pack",   price: 100.99, omamoriAmount: 3000,  bonusPercent: 50,  icon: "🌟", featured: true,  bestValue: false },
];
