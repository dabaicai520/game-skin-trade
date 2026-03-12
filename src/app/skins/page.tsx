import Link from "next/link";

// 模拟饰品数据
const allSkins = [
  { id: 1, name: "AK-47 | 火神", game: "CS2", price: 2899, wear: "崭新出厂", image: "🔥", rarity: "隐秘" },
  { id: 2, name: "M4A4 | 印花集", game: "CS2", price: 1599, wear: "略有磨损", image: "🎨", rarity: "保密" },
  { id: 3, name: "AWP | 巨龙传说", game: "CS2", price: 15999, wear: "崭新出厂", image: "🐉", rarity: "违禁" },
  { id: 4, name: "Karambit | 渐变大理石", game: "CS2", price: 8999, wear: "崭新出厂", image: "🔪", rarity: "★ 罕见特殊" },
  { id: 5, name: "Butterfly | 多普勒", game: "CS2", price: 6599, wear: "略有磨损", image: "🦋", rarity: "★ 罕见特殊" },
  { id: 6, name: "Glock | 火山", game: "CS2", price: 899, wear: "久经沙场", image: "🌋", rarity: "受限" },
  { id: 7, name: "USP | 印花集", game: "CS2", price: 1299, wear: "崭新出厂", image: "🎯", rarity: "保密" },
  { id: 8, name: "M9 Bayonet | 渐变", game: "CS2", price: 7599, wear: "崭新出厂", image: "⚔️", rarity: "★ 罕见特殊" },
  { id: 9, name: "Dragonclaw Hook", game: "DOTA2", price: 12999, wear: "-", image: "🐲", rarity: "至宝" },
  { id: 10, name: "Manifold Paradox", game: "DOTA2", price: 3599, wear: "-", image: "✨", rarity: "至宝" },
  { id: 11, name: "Fractal Horns", game: "DOTA2", price: 8999, wear: "-", image: "👹", rarity: "至宝" },
  { id: 12, name: "Bladeform Legacy", game: "DOTA2", price: 6999, wear: "-", image: "⚡", rarity: "至宝" },
];

const filters = [
  { label: "全部游戏", value: "all" },
  { label: "CS2", value: "CS2" },
  { label: "DOTA2", value: "DOTA2" },
  { label: "PUBG", value: "PUBG" },
];

const rarities = [
  { label: "全部品质", value: "all" },
  { label: "违禁", value: "contraband" },
  { label: "★ 罕见特殊", value: "ancient" },
  { label: "隐秘", value: "legendary" },
  { label: "保密", value: "epic" },
];

const wearOptions = [
  { label: "全部磨损", value: "all" },
  { label: "崭新出厂", value: "fn" },
  { label: "略有磨损", value: "mw" },
  { label: "久经沙场", value: "ft" },
];

export default function SkinsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            饰品列表
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            浏览所有可购买的饰品，共 {allSkins.length} 件
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                游戏
              </label>
              <select className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {filters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                品质
              </label>
              <select className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {rarities.map((rarity) => (
                  <option key={rarity.value} value={rarity.value}>
                    {rarity.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                磨损
              </label>
              <select className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {wearOptions.map((wear) => (
                  <option key={wear.value} value={wear.value}>
                    {wear.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                价格区间
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="最低"
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-zinc-400">-</span>
                <input
                  type="number"
                  placeholder="最高"
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="搜索饰品名称..."
              className="flex-1 max-w-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              筛选
            </button>
          </div>
        </div>

        {/* Skins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allSkins.map((skin) => (
            <Link
              key={skin.id}
              href={`/skins/${skin.id}`}
              className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center text-7xl">
                {skin.image}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                    {skin.game}
                  </span>
                  <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded">
                    {skin.rarity}
                  </span>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-1 truncate">
                  {skin.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  磨损：{skin.wear}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-600">
                    ¥{skin.price.toLocaleString()}
                  </span>
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    购买
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            上一页
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            2
          </button>
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            3
          </button>
          <span className="text-zinc-400">...</span>
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            下一页
          </button>
        </div>
      </div>
    </div>
  );
}
