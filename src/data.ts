export type SectionId = 'overview' | 'story' | 'characters' | 'choices' | 'dlc' | 'method'

export type Chapter = {
  id: string
  index: string
  region: string
  title: string
  subtitle: string
  summary: string
  fact: string
  reading: string
  question: string
  tags: string[]
  kind: 'main' | 'side' | 'dlc'
}

export type Character = {
  id: string
  name: string
  role: string
  note: string
  tone: 'gold' | 'blue' | 'red' | 'bone'
}

export type Relationship = {
  from: string
  to: string
  label: string
  tone: 'ally' | 'family' | 'rival' | 'romance'
}

export const chapters: Chapter[] = [
  {
    id: 'white-orchard',
    index: '01',
    region: '序章 · 白果园',
    title: '战争已经先到了',
    subtitle: '一场寻找叶奈法的旅程，从一口井里的鬼魂开始。',
    summary: '杰洛特与维瑟米尔在白果园寻找叶奈法。表面的目标是找到人，真正的开场却先让玩家看见：战争如何把普通人的生活切成一块块无人负责的废墟。',
    fact: '【确定】白果园的主线会把玩家带到尼弗迦德驻地，并让你第一次接近正在逃亡的叶奈法。',
    reading: '【推断】井中女鬼不是一项独立的“新手任务”，它是全作叙事的缩影：真相往往埋在一个没人愿意再问的日常事故里。',
    question: '当所有人都在说“这不是我的错”，谁还要为死者负责？',
    tags: ['战争', '失踪', '民间传说'],
    kind: 'main',
  },
  {
    id: 'bloody-baron',
    index: '02',
    region: '第一幕 · 威伦',
    title: '血腥男爵：一个家庭并不是受害者之家',
    subtitle: '拯救一个人，可能意味着继续和另一个人的罪共处。',
    summary: '杰洛特用寻找希里的线索换取男爵家人的下落，最后却卷进一段关于酗酒、暴力、流产、逃亡与无法修复的家庭关系。',
    fact: '【确定】男爵、安娜和塔玛拉的命运会被多个选择牵动，沼泽的老妪线会把这个家庭与威伦的更大灾难连起来。',
    reading: '【推断】男爵不是“值得救”或“不值得救”的开关。他更像一道测试：你能否承认一个人同时是施害者、受害者，也是一个仍然可能改变的人。',
    question: '悔恨可以抵消责任吗？',
    tags: ['家庭', '责任', '救赎'],
    kind: 'side',
  },
  {
    id: 'ladies-wood',
    index: '03',
    region: '第一幕 · 威伦',
    title: '林中夫人：童话只是权力的化妆',
    subtitle: '孩子、村庄和三位“守护者”，谁在讲述真相？',
    summary: '从孤儿村到泥沼深处，杰洛特不断被要求在不完整的信息中做判断。每条线索都像民间故事，但每个奇迹背后都是资源分配和恐惧管理。',
    fact: '【确定】三女巫控制着一套以献祭、交易和保护为名的地方秩序，玩家可以在呢喃山丘改变这套秩序的后果。',
    reading: '【推断】她们最可怕的地方不是“长得像怪物”，而是她们提供了一个战争时代极具诱惑力的交换：把自由交出来，就能换来活下去的秩序。',
    question: '一个残酷但有效的保护者，算不算好人？',
    tags: ['民俗', '权力', '代价'],
    kind: 'side',
  },
  {
    id: 'novigrad',
    index: '04',
    region: '第二幕 · 诺维格瑞',
    title: '一座城市如何把人变成标签',
    subtitle: '火刑、黑帮、法师与“正常人”的边界。',
    summary: '诺维格瑞的主线围绕寻找丹德里恩展开，同时把玩家放进一座正在清除异端的城市。特莉丝、法师、矮人、妓院和黑帮构成了不同版本的生存策略。',
    fact: '【确定】杰洛特需要在多个中间人之间交换信息，救出丹德里恩，并协助法师逃离城市。',
    reading: '【推断】诺维格瑞的核心不是“城市任务很多”，而是它让身份本身变成一种危险：你首先必须判断对方把你当成什么人。',
    question: '在一个人人都可能告发你的城市里，信任还剩多少价值？',
    tags: ['城市', '迫害', '地下网络'],
    kind: 'main',
  },
  {
    id: 'now-or-never',
    index: '05',
    region: '第二幕 · 诺维格瑞',
    title: '生死攸关：逃亡不是浪漫的冒险',
    subtitle: '特莉丝不是等待被拯救的人，她在组织撤离。',
    summary: '特莉丝与诺维格瑞法师的逃亡线，把“爱情选择”放进了真实的政治压力里。杰洛特的决定不仅关于两个人的关系，也会决定谁有机会离开这座城。',
    fact: '【确定】帮助法师逃离诺维格瑞，会改变多名角色之后的生存位置与终局支援。',
    reading: '【推断】它最动人的地方，是把情感从私密二人世界拉回公共世界：爱一个人，也意味着是否愿意承担她所背负的群体。',
    question: '爱情能不能成为政治承诺？',
    tags: ['特莉丝', '逃亡', '爱情'],
    kind: 'side',
  },
  {
    id: 'skellige',
    index: '06',
    region: '第三幕 · 史凯利格',
    title: '两个继承人：英雄不等于好国王',
    subtitle: '哈尔玛适合冲进暴风雪，凯瑞丝更适合坐在风暴之后。',
    summary: '史凯利格王位争夺把“传统英雄主义”和“治理能力”放在同一张桌上。哈尔玛用勇气证明自己，凯瑞丝用调查和克制证明自己。',
    fact: '【确定】玩家可以分别帮助哈尔玛或凯瑞丝调查王位宴会惨案，并影响最终谁成为女王。',
    reading: '【推断】这不是“战士 vs. 文官”的简单二选一，而是两种政治哲学：用个人声望带领群岛，或承认群岛需要改变。',
    question: '一个人值得被爱戴，和一个人适合统治，是同一件事吗？',
    tags: ['政治', '继承', '传统'],
    kind: 'main',
  },
  {
    id: 'uma',
    index: '07',
    region: '第四幕 · 收束',
    title: 'Uma：关键线索常常长得最不起眼',
    subtitle: '当所有宏大计划都失效，只剩下一个被诅咒的小丑。',
    summary: '寻找希里的线索最终回到乌马身上。解除诅咒的过程重新聚拢了猎魔人、女术士、国王与旧日同伴，也把叙事从私人寻找推向集体备战。',
    fact: '【确定】在凯尔莫罕解除乌马身上的诅咒后，阿瓦拉克说出了希里的去向。',
    reading: '【推断】乌马的存在提醒玩家：巫师三经常把最重要的答案藏在一个不体面的外表里，逼你先决定自己愿不愿意把他当人看。',
    question: '我们会不会只尊重看起来有价值的人？',
    tags: ['诅咒', '身份', '聚合'],
    kind: 'main',
  },
  {
    id: 'kaer-morhen',
    index: '08',
    region: '第四幕 · 收束',
    title: '凯尔莫罕之战：失去维瑟米尔之后',
    subtitle: '故事第一次不再问“能不能救她”，而是问“怎样让她活成自己”。',
    summary: '凯尔莫罕保卫战中，狂猎带走了维瑟米尔。希里的崩溃与爆发把整个故事推过分水岭：从寻找一个女儿，转向见证她成为一个能做决定的人。',
    fact: '【确定】维瑟米尔之死是希里命运线的情绪与叙事转折，之后多次看似轻微的回应会影响她最终的结局。',
    reading: '【推断】维瑟米尔不是简单的“导师牺牲”。他死后，杰洛特失去了替希里挡在前面的人，也因此被迫学会后退一步。',
    question: '保护一个人，什么时候会变成替她活？',
    tags: ['牺牲', '成长', '父女'],
    kind: 'main',
  },
  {
    id: 'ciri-choices',
    index: '09',
    region: '终局 · 希里',
    title: '希里的五个小选择',
    subtitle: '结局不是最后一扇门，而是几十小时态度的回声。',
    summary: '陪希里喝酒还是带她见皇帝、让她独自面对女术士、陪她去阿瓦拉克实验室、是否去看斯凯利的墓——这些细节共同决定她如何理解自己。',
    fact: '【确定】希里结局由多项关键互动累计决定，最终还会受政治线与玩家是否接受恩希尔的报酬影响。',
    reading: '【推断】游戏真正考察的不是“你有没有选对”，而是你有没有把希里当成一个需要被管理的目标，还是一个会承担结果的人。',
    question: '真正的爱，是把人留在身边，还是允许她离开？',
    tags: ['希里', '选择', '结局'],
    kind: 'main',
  },
  {
    id: 'hearts-of-stone',
    index: 'D1',
    region: 'DLC · 石之心',
    title: '欧吉尔德：救他，是奖励还是惩罚？',
    subtitle: '契约可以拿走痛苦，也可以拿走一个人承担责任的能力。',
    summary: '欧吉尔德为了翻身与欧迪姆签约，失去了感情与痛觉，又用一连串残酷的愿望把自己变成故事里的“坏人”。杰洛特要决定的不是他干不干净，而是他是否还能重新成为一个会痛的人。',
    fact: '【确定】玩家可以选择让欧迪姆带走欧吉尔德，或在月亮上找到契约漏洞、挑战欧迪姆并救下他。',
    reading: '【推断】救欧吉尔德不是赦免。他必须重新拥有痛苦，也必须重新面对自己曾经摧毁的一切。',
    question: '一个人被夺走感情之后，还要对没有感情时做的事负责吗？',
    tags: ['契约', '宽恕', '责任'],
    kind: 'dlc',
  },
  {
    id: 'blood-and-wine',
    index: 'D2',
    region: 'DLC · 血与酒',
    title: '童话王国的连环谋杀案',
    subtitle: '“好结局”并不等于所有罪都被擦掉。',
    summary: '陶森特像一幅童话画，但它的秩序建立在被排除的人、未被处理的童年伤口和王室的沉默上。席安娜、狄拉夫、安娜与雷吉斯共同把“受害者是否仍要负责”推到最尖锐。',
    fact: '【确定】进入童话世界、寻找魔法丝带、调查第五名受害者等选择，会改变姐妹和解、席安娜死亡或两人都死的结局。',
    reading: '【推断】血与酒给出的成熟答案是：解释与开脱是两回事。理解一个人的创伤，不代表你必须取消对他行为的判断。',
    question: '和解可以发生，但宽恕是否必须发生？',
    tags: ['创伤', '和解', '怪物'],
    kind: 'dlc',
  },
]

export const characters: Character[] = [
  { id: 'geralt', name: '杰洛特', role: '猎魔人 / 养父', note: '从“替别人解决问题”退到“让希里自己选择”。', tone: 'gold' },
  { id: 'ciri', name: '希里', role: '继承人 / 风暴中心', note: '她不是主线的奖品，而是最终必须获得主体性的人。', tone: 'blue' },
  { id: 'yennefer', name: '叶奈法', role: '术士 / 母亲', note: '用控制与计划保护家人，也必须学习放弃控制。', tone: 'bone' },
  { id: 'triss', name: '特莉丝', role: '术士 / 逃亡组织者', note: '把个人情感放进一场真实的政治撤离。', tone: 'red' },
  { id: 'vesemir', name: '维瑟米尔', role: '导师 / 家族长者', note: '他的死让“保护”从一种本能变成一个问题。', tone: 'bone' },
  { id: 'dandelion', name: '丹德里恩', role: '诗人 / 朋友', note: '诺维格瑞线里，友情是一张仍然有效的地下网络。', tone: 'gold' },
  { id: 'baron', name: '血腥男爵', role: '父亲 / 施害者', note: '他必须同时被理解，也必须被追责。', tone: 'red' },
  { id: 'olivier', name: '欧迪姆', role: '契约者 / 观察者', note: '他从不强迫你作恶，只负责把欲望写进合同。', tone: 'red' },
  { id: 'olgierd', name: '欧吉尔德', role: '贵族 / 债务人', note: '重获痛觉，才重新拥有承担责任的资格。', tone: 'blue' },
  { id: 'regis', name: '雷吉斯', role: '吸血鬼 / 朋友', note: '他爱狄拉夫，所以杀死狄拉夫才更像一种道德伤口。', tone: 'blue' },
  { id: 'dettlaff', name: '狄拉夫', role: '高等吸血鬼 / 被操纵者', note: '受害者身份不能覆盖他主动造成的灾难。', tone: 'red' },
  { id: 'anna', name: '安娜·亨利叶塔', role: '公爵夫人 / 姐姐', note: '王权的保护，也可能是把真相拖到爆炸的一层幕布。', tone: 'gold' },
]

export const relationships: Relationship[] = [
  { from: 'geralt', to: 'ciri', label: '养父与女儿', tone: 'family' },
  { from: 'geralt', to: 'yennefer', label: '爱人与共同监护', tone: 'romance' },
  { from: 'geralt', to: 'triss', label: '旧爱与同盟', tone: 'romance' },
  { from: 'geralt', to: 'vesemir', label: '学徒与导师', tone: 'family' },
  { from: 'geralt', to: 'dandelion', label: '多年朋友', tone: 'ally' },
  { from: 'geralt', to: 'baron', label: '线索交换', tone: 'rival' },
  { from: 'yennefer', to: 'ciri', label: '母女般的保护', tone: 'family' },
  { from: 'ciri', to: 'vesemir', label: '被他相信', tone: 'family' },
  { from: 'olgierd', to: 'olivier', label: '契约与债务', tone: 'rival' },
  { from: 'regis', to: 'dettlaff', label: '血缘般的友谊', tone: 'family' },
  { from: 'anna', to: 'dettlaff', label: '交换与利用', tone: 'rival' },
  { from: 'anna', to: 'regis', label: '请求与审判', tone: 'rival' },
]

export const decisions = [
  { id: 'baron', title: '血腥男爵的家人', prompt: '你是否愿意救一个施害者？', branches: ['安娜活着但失去理智', '男爵带安娜离开', '孩子们得救但男爵一家崩坏'], note: '这条线不提供干净的善良，只提供不同的责任分配。' },
  { id: 'ciri', title: '如何陪希里长大', prompt: '你是她的父亲，还是她的监护人？', branches: ['支持她自己决定', '替她安排安全路线', '接受帝国的政治安排'], note: '结局不是单次按钮，而是你在很多小场景里给她的反馈。' },
  { id: 'olgierd', title: '欧吉尔德的契约', prompt: '救他，还是让契约兑现？', branches: ['挑战欧迪姆', '让欧迪姆带走他'], note: '救下他不是给奖状，而是把痛苦还给他。' },
  { id: 'dettlaff', title: '狄拉夫的审判', prompt: '被操纵过，能否免除主动造成的灾难？', branches: ['杀死狄拉夫', '放狄拉夫离开', '席安娜先死，狄拉夫仍存活'], note: '雷吉斯的代价让“正确答案”变成了一道私人伤口。' },
]

export const endings = [
  { title: '猎魔人希里', tone: 'blue', condition: '多数互动支持她独立，并拒绝把她当成政治工具。', reading: '杰洛特真正学会的不是保护，而是信任。' },
  { title: '女皇希里', tone: 'gold', condition: '她活下来，并接触到帝国的治理位置。', reading: '这不是背叛自由，而是另一种承担世界的方式。' },
  { title: '希里未归', tone: 'red', condition: '关键互动反复削弱她的主体性，或让她孤立无援。', reading: '最坏结局不是一次错误，而是她逐渐不再相信自己能做决定。' },
  { title: '星星', tone: 'blue', condition: '与帕南和阿德卡多离开夜之城式的权力逻辑。', reading: '离开系统不代表获得幸福，但至少重新拥有了方向。' },
  { title: '恶魔', tone: 'red', condition: '把自己交给荒坂的秩序，以安全换取被保存。', reading: '一种非常黑暗的成功：身体活着，人生却被写入合同。' },
]

export const dlcThemes = [
  { label: '契约', base: '本体里，契约通常藏在国家、家庭和命运背后。', dlc: '石之心把契约写在纸上，让代价具体到可以签字。' },
  { label: '受害者', base: '血腥男爵、希里和怪物都拒绝被单一标签概括。', dlc: '血与酒进一步追问：受害经历如何影响责任，但不能取消责任。' },
  { label: '宽恕', base: '杰洛特一次次在没有完美答案的情况下继续同行。', dlc: '两个 DLC 都把宽恕变成一种需要付出代价、且不保证幸福的选择。' },
]

export const analysisSteps = [
  { number: '01', title: '先找故事的真正问题', body: '不要从“玩家接到了什么任务”开始。先问：这个游戏一直在逼玩家回答什么？是身份、自由、责任，还是归属？' },
  { number: '02', title: '分开事实与判断', body: '用【确定】记录游戏明确展示的内容，用【推断】记录对动机、主题和象征的解释。让读者知道你在哪里开始思考。' },
  { number: '03', title: '把人物写成动机系统', body: '每个重要人物至少拆成：想要什么、害怕什么、被什么塑造、主动做错了什么、何时改变。' },
  { number: '04', title: '抓住被延迟的选择', body: '重点不是选择按钮本身，而是几十分钟或几十小时后，那个选择如何回来找玩家。' },
  { number: '05', title: '每条线都追问代价', body: '不要只写“好结局”和“坏结局”。记录谁获益、谁受伤、谁替玩家承受了代价。' },
  { number: '06', title: '让支线反照主线', body: '优秀支线不是附加故事，而是主线主题的小型实验室。用支线解释主线，而不是只列推荐清单。' },
  { number: '07', title: '最后才总结主题', body: '主题不是开头贴上的标签。要等人物、选择和后果都展开后，再回答这款游戏最终相信什么。' },
]

export const methodQuestions = [
  '故事表面要你做什么，真正要你回答什么？',
  '谁拥有定义“正常”的权力？',
  '哪个人物同时是受害者和施害者？',
  '哪一个小选择在很久以后才产生回声？',
  '玩家究竟改变了世界，还是只暴露了自己的价值排序？',
  '本体与 DLC 是重复主题，还是在改写主题？',
]
