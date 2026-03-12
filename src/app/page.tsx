import Link from "next/link";

// 模拟热门饰品数据
const featuredSkins = [
  {
    id: 1,
    name: "AK-47 | 火神",
    game: "CS2",
    price: 2899,
    image: "🔥",
    rarity: "隐秘",
  },
  {
    id: 2,
    name: "M4A4 | 印花集",
    game: "CS2",
    price: 1599,
    image: "🎨",
    rarity: "保密",
  },
  {
    id: 3,
    name: "AWP | 巨龙传说",
    game: "CS2",
    price: 15999,
    image: "🐉",
    rarity: "违禁",
  },
  {
    id: 4,
    name: "Karambit | 渐变大理石",
    game: "CS2",
    price: 8999,
    image: "🔪",
    rarity: "★ 罕见特殊",
  },
];

const gameCategories = [
  { name: "CS2", icon: "🎯", count: 12345 },
  { name: "DOTA2", icon: "⚔️", count: 8765 },
  { name: "PUBG", icon: "🔫", count: 4321 },
  { name: "Rust", icon: "🏝️", count: 2109 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              安全、便捷的游戏饰品交易平台
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              支持 CS2、DOTA2 等热门游戏饰品交易，即时到账，安全保障
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/skins"
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-zinc-100 transition-colors"
              >
                浏览饰品
              </Link>
              <Link
                href="/sell"
                className="px-8 py-4 bg-white/20 text-white border border-white/40 rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                立即出售
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">100 万+</div>
              <div className="text-zinc-600 dark:text-zinc-400 mt-1">注册用户</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">50 万+</div>
              <div className="text-zinc-600 dark:text-zinc-400 mt-1">在线饰品</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">10 亿+</div>
              <div className="text-zinc-600 dark:text-zinc-400 mt-1">交易金额</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">99.9%</div>
              <div className="text-zinc-600 dark:text-zinc-400 mt-1">好评率</div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
            支持游戏
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gameCategories.map((game) => (
              <Link
                key={game.name}
                href={`/skins?game=${game.name}`}
                className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-center"
              >
                <div className="text-4xl mb-3">{game.icon}</div>
                <div className="font-semibold text-zinc-900 dark:text-white">{game.name}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {game.count.toLocaleString()} 件饰品
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skins */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              热门推荐
            </h2>
            <Link
              href="/skins"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSkins.map((skin) => (
              <Link
                key={skin.id}
                href={`/skins/${skin.id}`}
                className="group p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 rounded-lg flex items-center justify-center text-6xl mb-4">
                  {skin.image}
                </div>
                <div className="text-xs text-blue-600 font-medium mb-1">{skin.game}</div>
                <div className="font-medium text-zinc-900 dark:text-white mb-2 truncate">
                  {skin.name}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-red-600">
                    ¥{skin.price.toLocaleString()}
                  </div>
                  <div className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded">
                    {skin.rarity}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
            为什么选择 SkinTrade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🛡️
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                安全保障
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                平台担保交易，资金安全，饰品自动发货
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                即时到账
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                出售饰品后，款项立即到账，随时提现
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                💰
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                超低手续费
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                行业最低手续费，让更多利润给你
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
