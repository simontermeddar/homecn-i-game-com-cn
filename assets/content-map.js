// assets/content-map.js
// 站点内容分区与搜索过滤

const siteConfig = {
  baseUrl: "https://homecn-i-game.com.cn",
  siteName: "HomeCN Game",
  defaultLang: "zh-CN"
};

const contentCategories = [
  {
    id: "action",
    label: "动作游戏",
    tags: ["爱游戏", "射击", "格斗", "跑酷"],
    items: [
      { title: "街头格斗王", slug: "street-fighter-king", summary: "经典格斗对决" },
      { title: "极速射击", slug: "speed-shooter", summary: "快节奏射击体验" }
    ]
  },
  {
    id: "puzzle",
    label: "益智游戏",
    tags: ["爱游戏", "解谜", "策略", "逻辑"],
    items: [
      { title: "迷宫逃脱", slug: "maze-escape", summary: "考验方向感与记忆力" },
      { title: "数字拼图", slug: "number-puzzle", summary: "经典数字排序" }
    ]
  },
  {
    id: "adventure",
    label: "冒险游戏",
    tags: ["爱游戏", "探索", "剧情", "开放世界"],
    items: [
      { title: "秘境寻宝", slug: "treasure-hunt", summary: "在古老遗迹中寻找宝藏" },
      { title: "失落之岛", slug: "lost-island", summary: "荒岛生存与解谜" }
    ]
  }
];

const globalTags = ["爱游戏", "热门", "新游", "推荐"];

// 简单搜索过滤函数：根据关键词匹配标题、摘要或标签
function searchContent(query, categories = contentCategories) {
  if (!query || query.trim() === "") {
    return categories;
  }

  const lowerQuery = query.toLowerCase();
  const result = [];

  for (const category of categories) {
    const matchedItems = category.items.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const summaryMatch = item.summary.toLowerCase().includes(lowerQuery);
      const tagMatch = category.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      return titleMatch || summaryMatch || tagMatch;
    });

    if (matchedItems.length > 0) {
      result.push({
        ...category,
        items: matchedItems
      });
    }
  }

  return result;
}

// 根据标签筛选分区
function filterByTag(tag, categories = contentCategories) {
  if (!tag || tag.trim() === "") {
    return categories;
  }

  const lowerTag = tag.toLowerCase();
  return categories.filter(category =>
    category.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

// 获取指定分区的所有标签（去重）
function getAllTags(categories = contentCategories) {
  const tagSet = new Set(globalTags);
  for (const category of categories) {
    for (const tag of category.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

// 获取站点地图（URL 结构）
function getSiteMap(baseUrl = siteConfig.baseUrl) {
  const map = [];
  for (const category of contentCategories) {
    for (const item of category.items) {
      map.push({
        url: `${baseUrl}/${category.id}/${item.slug}`,
        title: item.title,
        category: category.label,
        tags: category.tags
      });
    }
  }
  return map;
}

// 示例用法（仅用于演示，不会自动执行）
/*
console.log("搜索 '射击':", searchContent("射击"));
console.log("按标签 '爱游戏' 筛选:", filterByTag("爱游戏"));
console.log("所有标签:", getAllTags());
console.log("站点地图:", getSiteMap());
*/

// 导出以便在模块化环境中使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteConfig,
    contentCategories,
    globalTags,
    searchContent,
    filterByTag,
    getAllTags,
    getSiteMap
  };
}