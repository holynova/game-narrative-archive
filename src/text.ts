type CharacterNameRule = {
  canonical: string
  english: string
  short?: string
  aliases: string[]
}

const characterNameRules: CharacterNameRule[] = [
  { canonical: '杰洛特', english: 'Geralt', aliases: ['Geralt'] },
  { canonical: '希里', english: 'Ciri', aliases: ['Ciri', 'Cirilla'] },
  { canonical: '叶奈法', english: 'Yennefer', aliases: ['Yennefer'] },
  { canonical: '特莉丝·梅莉葛德', english: 'Triss Merigold', short: '特莉丝', aliases: ['特莉丝', 'Triss'] },
  { canonical: '维瑟米尔', english: 'Vesemir', aliases: ['Vesemir'] },
  { canonical: '丹德里恩', english: 'Dandelion', aliases: ['Dandelion'] },
  { canonical: '血腥男爵', english: 'The Bloody Baron', aliases: ['Bloody Baron', 'The Bloody Baron'] },
  { canonical: '菲利普·斯特伦格', english: 'Philip Strenger', aliases: ['Philip Strenger'] },
  { canonical: '刚特·欧迪姆', english: "Gaunter O'Dimm", short: '欧迪姆', aliases: ['冈特·欧迪姆', '欧迪姆', 'Gaunter O’Dimm', "Gaunter O'Dimm", 'O’Dimm', "O'Dimm"] },
  { canonical: '凯拉·梅兹', english: 'Keira Metz', short: '凯拉', aliases: ['凯拉', 'Keira Metz', 'Keira'] },
  { canonical: '阿瓦拉克', english: "Avallac'h", aliases: ['Avallac’h', "Avallac'h", 'Avallac', 'Avallac\'h'] },
  { canonical: '罗契', english: 'Vernon Roche', aliases: ['Roche'] },
  { canonical: '迪科斯彻', english: 'Sigismund Dijkstra', aliases: ['Dijkstra'] },
  { canonical: '欧吉尔德·冯·埃弗雷克', english: 'Olgierd von Everec', short: '欧吉尔德', aliases: ['欧吉尔德', '欧吉尔德·冯·爱维瑞克', 'Olgierd von Everec', 'Olgierd'] },
  { canonical: '爱丽丝·冯·埃弗雷克', english: 'Iris von Everec', short: '爱丽丝', aliases: ['爱丽丝', 'Iris von Everec'] },
  { canonical: '弗洛迪米尔', english: 'Vlodimir von Everec', aliases: ['Vlodimir'] },
  { canonical: '欧立安娜', english: 'Orianna', aliases: ['Orianna'] },
  { canonical: '席安娜', english: 'Syanna', aliases: ['Syanna'] },
  { canonical: '狄拉夫', english: 'Dettlaff', aliases: ['Dettlaff'] },
  { canonical: '雷吉斯', english: 'Regis', aliases: ['Regis'] },
  { canonical: '安娜·亨利叶塔', english: 'Anna Henrietta', short: '安娜', aliases: ['安娜·亨利叶塔', 'Anna Henrietta'] },
  { canonical: '克拉奇·安·克莱特', english: 'Crach an Craite', short: '克拉奇', aliases: ['克拉奇', 'Crach an Craite'] },
  { canonical: '凯瑞丝', english: 'Cerys an Craite', aliases: ['Cerys'] },
  { canonical: '哈尔玛', english: 'Hjalmar an Craite', aliases: ['Hjalmar'] },
  { canonical: '斯凡里吉', english: 'Svanrige an Tuirseach', aliases: ['Svanrige'] },
  { canonical: '斯凯尔', english: 'Skjall', aliases: ['Skjall'] },
  { canonical: '乌马', english: 'Uma', aliases: ['Uma'] },
  { canonical: '艾瑞汀', english: 'Eredin', aliases: ['Eredin'] },
  { canonical: '伊勒瑞斯', english: 'Imlerith', aliases: ['Imlerith'] },
  { canonical: '纳撒尼尔', english: 'Nathaniel', aliases: ['Nathaniel'] },
  { canonical: '休伯特', english: 'Hubert Rejk', aliases: ['Hubert'] },
  { canonical: '曼吉', english: 'Caleb Menge', aliases: ['Menge'] },
  { canonical: '普西拉', english: 'Priscilla', aliases: ['Priscilla'] },
  { canonical: '莎拉', english: 'Sara', aliases: ['Sara'] },
  { canonical: '霍桑二世', english: 'Whoreson Junior', aliases: ['Whoreson Junior'] },
  { canonical: '卓尔坦·齐瓦', english: 'Zoltan Chivay', aliases: ['Zoltan'] },
  { canonical: '柯琳·蒂莉', english: 'Corinne Tilly', aliases: ['Corinne Tilly'] },
  { canonical: '比尔娜·布兰', english: 'Birna Bran', aliases: ['Birna Bran'] },
  { canonical: '塔玛拉', english: 'Tamara Strenger', aliases: ['Tamara'] },
  { canonical: '拉多维德', english: 'Radovid V', aliases: ['Radovid'] },
  { canonical: '恩希尔', english: 'Emhyr var Emreis', aliases: ['Emhyr var Emreis'] },
  { canonical: '强尼·银手', english: 'Johnny Silverhand', aliases: ['强尼', 'Johnny Silverhand'] },
  { canonical: '杰克·威尔斯', english: 'Jackie Welles', aliases: ['杰克', 'Jackie Welles'] },
  { canonical: '德克斯特·德肖恩', english: 'Dexter DeShawn', aliases: ['德克斯特', 'Dexter DeShawn'] },
  { canonical: '伊芙琳·帕克', english: 'Evelyn Parker', aliases: ['伊芙琳', 'Evelyn Parker'] },
  { canonical: '赖宣·荒坂', english: 'Yorinobu Arasaka', short: '赖宣', aliases: ['赖宣', 'Yorinobu Arasaka'] },
  { canonical: '荒坂三郎', english: 'Saburo Arasaka', short: '三郎', aliases: ['三郎', 'Saburo Arasaka'] },
  { canonical: '维克多·维克托', english: 'Viktor Vektor', short: '维克多', aliases: ['维克多', 'Viktor Vektor'] },
  { canonical: '奥特·坎宁安', english: 'Alt Cunningham', short: '奥特', aliases: ['奥特', 'Alt Cunningham'] },
  { canonical: '竹村五郎', english: 'Goro Takemura', short: '竹村', aliases: ['竹村', 'Goro Takemura'] },
  { canonical: '朱迪·阿尔瓦雷兹', english: 'Judy Alvarez', short: '朱迪', aliases: ['朱迪', 'Judy Alvarez'] },
  { canonical: '帕南·帕尔默', english: 'Panam Palmer', short: '帕南', aliases: ['帕南', 'Panam Palmer'] },
  { canonical: '罗格·阿曼迪亚斯', english: 'Rogue Amendiares', short: '罗格', aliases: ['罗格', 'Rogue Amendiares'] },
  { canonical: '百灵鸟', english: 'Songbird', aliases: ['Songbird', 'Song So Mi'] },
  { canonical: '所罗门·李德', english: 'Solomon Reed', short: '李德', aliases: ['李德', 'Solomon Reed'] },
  { canonical: '罗莎琳德·迈尔斯', english: 'Rosalind Myers', short: '迈尔斯', aliases: ['罗莎琳德', '迈尔斯', 'Rosalind Myers'] },
  { canonical: '库尔特·汉森', english: 'Kurt Hansen', short: '库尔特', aliases: ['库尔特', 'Kurt Hansen'] },
  { canonical: '索尔·布莱特', english: 'Saul Bright', short: '索尔', aliases: ['索尔', 'Saul Bright'] },
  { canonical: '麦可·德圣塔', english: 'Michael De Santa', short: '麦可', aliases: ['麦可', 'Michael De Santa', 'Michael Townley'] },
  { canonical: '富兰克林·克林顿', english: 'Franklin Clinton', short: '富兰克林', aliases: ['富兰克林', 'Franklin Clinton'] },
  { canonical: '崔佛·菲利普', english: 'Trevor Philips', short: '崔佛', aliases: ['崔佛', 'Trevor Philips'] },
  { canonical: '莱斯特·克瑞斯特', english: 'Lester Crest', short: '莱斯特', aliases: ['莱斯特', 'Lester Crest'] },
  { canonical: '拉玛·戴维斯', english: 'Lamar Davis', short: '拉玛', aliases: ['拉玛', 'Lamar Davis'] },
  { canonical: '阿曼达·德圣塔', english: 'Amanda De Santa', short: '阿曼达', aliases: ['阿曼达', 'Amanda De Santa'] },
  { canonical: '吉米·德圣塔', english: 'Jimmy De Santa', short: '吉米', aliases: ['吉米', 'Jimmy De Santa'] },
  { canonical: '崔西·德圣塔', english: 'Tracey De Santa', short: '崔西', aliases: ['崔西', 'Tracey De Santa'] },
  { canonical: '戴夫·诺顿', english: 'Dave Norton', short: '戴夫', aliases: ['戴夫', 'Dave Norton'] },
  { canonical: '史蒂夫·海因斯', english: 'Steve Haines', short: '史蒂夫', aliases: ['史蒂夫', 'Steve Haines'] },
  { canonical: '德凡·韦斯顿', english: 'Devin Weston', short: '德凡', aliases: ['德凡', 'Devin Weston'] },
  { canonical: '马丁·马德拉索', english: 'Martin Madrazo', short: '马丁', aliases: ['马丁', 'Martin Madrazo'] },
  { canonical: '帕特里夏·马德拉索', english: 'Patricia Madrazo', short: '帕特里夏', aliases: ['帕特里夏', 'Patricia Madrazo'] },
  { canonical: '罗恩·杰科夫斯基', english: 'Ron Jakowski', short: '罗恩', aliases: ['罗恩', 'Ron Jakowski'] },
]

const officialTranslations: [string, string][] = [
  ['Elder Blood', '上古之血'], ['White Orchard', '白果园'], ['Botchling', '尸婴'], ['Lubberkin', '家宅精灵'], ['Crones', '林中夫人'],
  ['Cerys', '凯瑞丝'], ['Hjalmar', '哈尔玛'], ['Svanrige', '斯凡里吉'], ['Undvik', '安德维克'], ['Spikeroog', '史派克鲁格'], ['Jarl Udalryk', '乌达里克领主'], ['Kaer Trolde', '凯尔·特罗德'],
  ['Isle of Mists', '迷雾之岛'], ['White Frost', '白霜'], ['Ofieri Prince', '欧菲尔王子'], ['Maximilian Borsodi', '马克西米利安·波索迪'], ['Ewald Borsodi', '埃瓦尔德·波索迪'], ['Land of a Thousand Fables', '千童话之地'], ['Tesham Mutna', '特沙姆·穆特纳'],
  ['The Night of Long Fangs', '长牙之夜'], ['Anna', '安娜'], ['Triss Merigold', '特莉丝·梅莉葛德'], ['Zoltan', '卓尔坦·齐瓦'], ['Corinne Tilly', '柯琳·蒂莉'], ['Birna Bran', '比尔娜·布兰'], ['Priscilla', '普西拉'], ['Sara', '莎拉'], ['Whoreson Junior', '霍桑二世'], ['an Craite', '安·克莱特'], ['Weavess', '织婆'],
  ['Aldecaldos', '阿德卡多'], ['Kurt Hansen', '库尔特·汉森'], ['Rosalind Myers', '罗莎琳德·迈尔斯'],
]

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const nameAliases: [string, string][] = characterNameRules.flatMap((rule) => [[rule.canonical, rule.canonical] as [string, string], ...rule.aliases.map((alias) => [alias, rule.canonical] as [string, string])])
const translationEntries: [string, string][] = [...officialTranslations, ...nameAliases]
const translationMap = new Map<string, string>(translationEntries)
const translationPattern = new RegExp(translationEntries.map(([source]) => escapeRegex(source)).sort((a, b) => b.length - a.length).join('|'), 'g')
const rulesByCanonical = new Map(characterNameRules.map((rule) => [rule.canonical, rule]))
const annotationPattern = new RegExp(characterNameRules.map((rule) => escapeRegex(rule.canonical)).sort((a, b) => b.length - a.length).join('|'), 'g')

function normalizeChineseText(value: string) {
  const text = value.replace(translationPattern, (match) => translationMap.get(match) ?? match)
  return text.replace(/“([^”]+)”/g, '「$1」').replace(/"([^"]+)"/g, '「$1」').replace(/\.{3}/g, '……').replace(/([\u4e00-\u9fff])([A-Za-z0-9])/g, '$1 $2').replace(/([A-Za-z0-9])([\u4e00-\u9fff])/g, '$1 $2').replace(/ {2,}/g, ' ')
}

export function formatChineseText(value: string) {
  return normalizeChineseText(value).replace(annotationPattern, (match) => rulesByCanonical.get(match)?.short ?? match)
}

export function createNarrativeFormatter() {
  const seen = new Set<string>()
  return (value: string) => normalizeChineseText(value).replace(annotationPattern, (match, offset: number, source: string) => {
    const rule = rulesByCanonical.get(match)
    if (!rule) return match
    const suffix = source.slice(offset + match.length)
    if (seen.has(rule.canonical) || /^\s*[（(][^）)]*[）)]/.test(suffix)) return rule.short ?? rule.canonical
    seen.add(rule.canonical)
    return `${rule.canonical}（${rule.english}）`
  })
}
