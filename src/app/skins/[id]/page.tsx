import Link from "next/link";

// 模拟饰品数据
const skinData: Record<string, any> = {
  "1": {
    id: 1,
    name: "AK-47 | 火神",
    game: "CS2",
    price: 2899,
    wear: "崭新出厂",
    float: 0.0234,
    image: "🔥",
    rarity: "隐秘",
    description: "AK-47 | 火神 (Fire Serpent) 是 CS2 中最受欢迎的皮肤之一，以其独特的火焰图案而闻名。",
    seller: { name: "ProTrader", rating: 4.9, trades: 1234 },
    stock: 15,
  },
  "2": {
    id: 2,
    name: "M4A4 | 印花集",
    game: "CS2",
    price: 1599,
    wear: "略有磨损",
    float: 0.0891,
    image: "🎨",
    rarity: "保密",
    description: "M4A4 | 印花集 (Howl) 是一款极其稀有的皮肤，因其独特的设计而备受追捧。",
    seller: { name: "SkinMaster", rating: 4.8, trades: 856 },
    stock: 8,
  },
  "3": {
    id: 3,
    name: "AWP | 巨龙传说",
    game: "CS2",
    price: 15999,
    wear: "崭新出厂",
    float: 0.0156,
    image: "🐉",
    rarity: "违禁",
    description: "AWP | 巨龙传说 (Dragon Lore) 是 CS2 中最具标志性的皮肤，以其精美的龙纹设计而闻名。",
    seller: { name: "DragonKing", rating: 5.0, trades: 2341 },
    stock: 3,
  },
};

const relatedSkins = [
  { id: 4, name: "Karambit | 渐变大理石", price: 8999, image: "🔪" },
  { id: 5, name: "Butterfly | 多普勒", price: 6599, image: "🦋" },
  { id: 6, name: "Glock | 火山", price: 899, image: "🌋" },
  { id: 7, name: "USP | 印花集", price: 1299, image: "🎯" },
];

export default async function SkinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skin = skinData[id] || skinData["1"];

  if (!skin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            饰品未找到
          </h1>
          <Link href="/skins" className="text-blue-600 hover:text-blue-700">
            返回饰品列表 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">
                首页
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/skins" className="hover:text-zinc-900 dark:hover:text-white">
                饰品列表
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-900 dark:text-white">{skin.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 rounded-xl flex items-center justify-center text-9xl mb-4">
              {skin.image}
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                {skin.game}
              </span>
              <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded">
                {skin.rarity}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              {skin.name}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {skin.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">磨损</div>
                <div className="font-semibold text-zinc-900 dark:text-white">{skin.wear}</div>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">磨损值</div>
                <div className="font-semibold text-zinc-900 dark:text-white">{skin.float}</div>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">库存</div>
                <div className="font-semibold text-green-600">{skin.stock} 件</div>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">卖家</div>
                <div className="font-semibold text-zinc-900 dark:text-white">{skin.seller.name}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">价格</div>
                <div className="text-4xl font-bold text-red-600">
                  ¥{skin.price.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">卖家评分</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                  ⭐ {skin.seller.rating} ({skin.seller.trades} 交易)
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                立即购买
              </button>
              <button className="px-6 py-4 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                收藏
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-xl">🛡️</span>
                <div>
                  <div className="font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                    平台担保
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-500">
                    本交易受平台保护，购买后饰品将自动发送至您的库存。如有问题，请联系客服。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Skins */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            相关推荐
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedSkins.map((item) => (
              <Link
                key={item.id}
                href={`/skins/${item.id}`}
                className="group p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 rounded-lg flex items-center justify-center text-4xl mb-3">
                  {item.image}
                </div>
                <div className="font-medium text-zinc-900 dark:text-white text-sm mb-2 truncate">
                  {item.name}
                </div>
                <div className="text-red-600 font-bold">
                  ¥{item.price.toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
