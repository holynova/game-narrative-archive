import { useEffect, useState } from 'react'
import { ArrowUpRight, BookOpen, ChevronRight, Menu, Network, ScrollText, X } from 'lucide-react'
import { analysisSteps, chapters, characters, decisions, dlcThemes, endings, methodQuestions, relationships } from './data'
import { cyberpunkChapters, cyberpunkCharacters, cyberpunkDecisions, cyberpunkDlcThemes, cyberpunkEndings, cyberpunkRelationships } from './cyberpunkData'
import type { Chapter, Character, Relationship } from './data'

type ViewId = 'read' | 'contents' | 'appendix'
type AppendixTab = 'people' | 'choices' | 'dlc' | 'method'
type EditionId = 'witcher3' | 'cyberpunk2077'
type Decision = { id: string; title: string; prompt: string; branches: string[]; note: string }
type Ending = { title: string; tone: string; condition: string; reading: string }
type DlcTheme = { label: string; base: string; dlc: string }

type GameEdition = {
  id: EditionId
  label: string
  shortLabel: string
  kicker: string
  titleLead: string
  titleEmphasis: string
  opening: string
  scopeLabel: string
  readingTime: string
  preface: string
  railCurrent: string
  chapters: Chapter[]
  characters: Character[]
  relationships: Relationship[]
  decisions: Decision[]
  endings: Ending[]
  dlcThemes: DlcTheme[]
  dlcCards: { label: string; title: string; body: string }[]
  methodIntro: string
}

const appendixTabs: { id: AppendixTab; label: string }[] = [
  { id: 'people', label: '人物关系' },
  { id: 'choices', label: '选择与结局' },
  { id: 'dlc', label: 'DLC 对照' },
  { id: 'method', label: '分析方法' },
]

const editions: Record<EditionId, GameEdition> = {
  witcher3: {
    id: 'witcher3', label: '《巫师 3：狂猎》', shortLabel: 'THE WITCHER 3', kicker: 'THE WITCHER 3 / WILD HUNT', titleLead: '一场关于', titleEmphasis: '如何放手',
    opening: '从白果园的一口井，到希里最终要走向的世界。这里不急着解释所有支线，也不要求你先看懂所有关系，只从第一页开始，连续读下去。', scopeLabel: '本体 + 2 个 DLC', readingTime: '约 40 分钟',
    preface: '《巫师 3》的真正主线，不是杰洛特消灭了多少怪物，而是他如何在每一次没有干净答案的选择里，继续和别人一起生活。', railCurrent: '本体 + 石之心 + 血与酒', chapters, characters, relationships, decisions, endings, dlcThemes,
    dlcCards: [{ label: 'D1', title: '石之心', body: '把责任写成一纸契约：救欧吉尔德，不等于替他抹去过去。' }, { label: 'D2', title: '血与酒', body: '把宽恕放进童话王国：理解创伤，不等于取消责任。' }], methodIntro: '把这套读法带到《赛博朋克 2077》或下一款游戏。',
  },
  cyberpunk2077: {
    id: 'cyberpunk2077', label: '《赛博朋克 2077》', shortLabel: 'CYBERPUNK 2077', kicker: 'CYBERPUNK 2077 / PHANTOM LIBERTY', titleLead: '一场关于', titleEmphasis: '自由意志',
    opening: '从夜之城的第一场大买卖，到 V 被迫决定谁有权继续使用自己的身体。这里把本体和《往日之影》放在一条连续的阅读线上。', scopeLabel: '本体 + 往日之影', readingTime: '约 35 分钟',
    preface: '《赛博朋克 2077》的真正主线，不是 V 如何打败荒坂，而是当身体、记忆和人格都可能被改写时，V 还能否保留决定由谁承担代价的权利。', railCurrent: '本体 + 往日之影', chapters: cyberpunkChapters, characters: cyberpunkCharacters, relationships: cyberpunkRelationships, decisions: cyberpunkDecisions, endings: cyberpunkEndings, dlcThemes: cyberpunkDlcThemes,
    dlcCards: [{ label: 'DLC', title: '往日之影', body: '把求生问题推进成间谍惊悚：每个救命的人，都可能在利用你。' }, { label: 'END', title: '高塔', body: 'V 真的被治好，却不能再回到曾经定义自己的生活。' }], methodIntro: '把这套读法继续带到下一款游戏：先找问题，再追踪动机、选择与代价。',
  },
}

function App() {
  const [editionId, setEditionId] = useState<EditionId>('witcher3')
  const [view, setView] = useState<ViewId>('read')
  const [appendixTab, setAppendixTab] = useState<AppendixTab>('people')
  const [tocOpen, setTocOpen] = useState(false)
  const edition = editions[editionId]

  useEffect(() => {
    const label = view === 'read' ? '阅读' : view === 'contents' ? '目录' : '附录'
    document.title = `${edition.label} · ${label} · 游戏剧情档案馆`
  }, [edition, view])

  const changeEdition = (next: EditionId) => { setEditionId(next); setView('read'); setTocOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const openRead = (chapterId?: string) => { setView('read'); setTocOpen(false); window.requestAnimationFrame(() => { if (chapterId) document.getElementById(chapterId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); else window.scrollTo({ top: 0, behavior: 'smooth' }) }) }
  const openAppendix = (tab: AppendixTab = 'people') => { setAppendixTab(tab); setView('appendix'); setTocOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="book-app">
    <header className="book-header">
      <div className="book-identity"><button className="mobile-menu-button" onClick={() => setTocOpen((open) => !open)} aria-label={tocOpen ? '关闭目录' : '打开目录'}>{tocOpen ? <X size={18} /> : <Menu size={18} />}</button><button className="identity-copy" onClick={() => openRead()}><span className="identity-mark">GAME / ARCHIVE</span><span className="identity-name">游戏剧情档案馆</span></button></div>
      <nav className="book-nav" aria-label="主导航"><button className={view === 'read' ? 'is-active' : ''} onClick={() => openRead()}>阅读</button><button className={view === 'contents' ? 'is-active' : ''} onClick={() => { setView('contents'); setTocOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>目录</button><button className={view === 'appendix' ? 'is-active' : ''} onClick={() => openAppendix()}>附录</button></nav>
      <div className="book-edition" aria-label="选择作品">{(Object.keys(editions) as EditionId[]).map((id) => <button key={id} className={editionId === id ? 'is-active' : ''} onClick={() => changeEdition(id)}>{editions[id].shortLabel}</button>)}</div>
    </header>
    <div className="book-layout"><TableOfContents edition={edition} editionId={editionId} activeView={view} open={tocOpen} onEdition={changeEdition} onRead={openRead} onAppendix={openAppendix} /><main className="book-main">{view === 'read' && <ReadingView edition={edition} onAppendix={openAppendix} />}{view === 'contents' && <ContentsView edition={edition} onRead={openRead} />}{view === 'appendix' && <AppendixView edition={edition} activeTab={appendixTab} onTab={setAppendixTab} />}</main><ReadingRail edition={edition} view={view} /></div>
    <footer className="book-footer"><span>GAME / ARCHIVE</span><span>一份连续阅读的剧情档案</span><span>2026</span></footer>
  </div>
}

function TableOfContents({ edition, editionId, activeView, open, onEdition, onRead, onAppendix }: { edition: GameEdition; editionId: EditionId; activeView: ViewId; open: boolean; onEdition: (id: EditionId) => void; onRead: (chapterId?: string) => void; onAppendix: (tab?: AppendixTab) => void }) {
  const groups = chapterGroups(edition.chapters)
  return <aside className={`toc ${open ? 'is-open' : ''}`} aria-label="剧情目录"><div className="toc-editions" aria-label="选择作品">{(Object.keys(editions) as EditionId[]).map((id) => <button key={id} className={editionId === id ? 'is-active' : ''} onClick={() => onEdition(id)}>{editions[id].label}</button>)}</div><div className="toc-heading"><span>目录</span><span className="toc-count">{edition.chapters.length} 章</span></div><button className={`toc-home ${activeView === 'read' ? 'is-active' : ''}`} onClick={() => onRead()}><BookOpen size={15} /><span>从头开始阅读</span></button>{groups.map((group) => <div className="toc-group" key={group.title}><span className="toc-group-title">{group.title}</span>{group.entries.map((chapter) => <button className="toc-entry" key={chapter.id} onClick={() => onRead(chapter.id)}><span>{chapter.index}</span><strong>{formatChineseText(chapter.title)}</strong></button>)}</div>)}<div className="toc-appendix"><span className="toc-group-title">附录</span><button onClick={() => onAppendix('people')}><Network size={14} /><span>人物关系</span></button><button onClick={() => onAppendix('choices')}><ChevronRight size={14} /><span>选择与结局</span></button><button onClick={() => onAppendix('method')}><ScrollText size={14} /><span>分析方法</span></button></div></aside>
}

function ReadingRail({ edition, view }: { edition: GameEdition; view: ViewId }) { return <aside className="reading-rail" aria-label="阅读信息"><div className="rail-rule" /><span className="rail-label">READING EDITION</span><strong>{view === 'read' ? '连续阅读' : view === 'contents' ? '章节目录' : '辅助附录'}</strong><p>{view === 'read' ? '把它当成一本书。从一页读到下一页，先让故事自己展开。' : '这里的工具不替正文讲故事，只在你需要回看时提供索引。'}</p><div className="rail-rule rail-rule-bottom" /><span className="rail-label">CURRENT TEXT</span><span className="rail-current">{edition.railCurrent}</span></aside> }

function ReadingView({ edition, onAppendix }: { edition: GameEdition; onAppendix: (tab?: AppendixTab) => void }) {
  return <div className="reading-view"><section className="book-opening"><span className="opening-kicker">{edition.kicker}</span><h1>{edition.titleLead}<br /><em>{edition.titleEmphasis}</em>的旅程</h1><p>{formatChineseText(edition.opening)}</p><div className="opening-meta"><span>{edition.scopeLabel}</span><span>全剧透</span><span>{edition.readingTime}</span></div></section><article className="continuous-story"><div className="story-preface"><span className="chapter-number">序</span><p>{formatChineseText(edition.preface)}</p></div>{edition.chapters.map((chapter, index) => <ChapterBlock chapter={chapter} number={index + 1} total={edition.chapters.length} key={chapter.id} />)}</article><section className="reading-end"><span className="opening-kicker">THE END IS ANOTHER BEGINNING</span><h2>读完正文，再去看那些图。</h2><p>人物关系、选择矩阵和分析方法都放在附录里。它们不是另一套入口，而是读完故事之后，帮你回头看清结构的工具。</p><div className="appendix-links"><button onClick={() => onAppendix('people')}>人物关系 <ArrowUpRight size={14} /></button><button onClick={() => onAppendix('choices')}>选择与结局 <ArrowUpRight size={14} /></button><button onClick={() => onAppendix('method')}>分析方法 <ArrowUpRight size={14} /></button></div></section></div>
}

function ChapterBlock({ chapter, number, total }: { chapter: Chapter; number: number; total: number }) { return <section className="chapter-block" id={chapter.id}><header className="chapter-heading"><span className="chapter-number">{chapter.index}</span><div><span className="chapter-region">{formatChineseText(chapter.region)}</span><h2>{formatChineseText(chapter.title)}</h2><p>{formatChineseText(chapter.subtitle)}</p></div></header><div className="story-prose">{chapter.body.map((paragraph, index) => <p className={storyParagraphClass(paragraph)} key={`${chapter.id}-${index}`}>{formatChineseText(paragraph)}</p>)}</div><aside className="hard-question"><span>这一章留下的问题</span><strong>{formatChineseText(chapter.question)}</strong></aside><div className="chapter-tail"><span>{chapter.tags.map(formatChineseText).join('  ·  ')}</span><span>{String(number).padStart(2, '0')} / {String(total).padStart(2, '0')}</span></div></section> }

function storyParagraphClass(paragraph: string) { if (paragraph.startsWith('>')) return 'story-quote'; if (paragraph.startsWith('【确定】') || paragraph.startsWith('[确定]')) return 'story-fact'; if (paragraph.startsWith('【很可能】') || paragraph.startsWith('[很可能]')) return 'story-reading'; if (/^(选择|如果|与此同时|最终|现在再看|结局|路线|所以我的判断|这就是|真正的)/.test(paragraph)) return 'story-turn'; return '' }

function ContentsView({ edition, onRead }: { edition: GameEdition; onRead: (chapterId?: string) => void }) { const groups = chapterGroups(edition.chapters); return <div className="contents-view"><section className="contents-intro"><span className="opening-kicker">TABLE OF CONTENTS / {edition.shortLabel}</span><h1>目录</h1><p>这不是任务清单，而是一本书的章节顺序。你可以从头读，也可以从某一段故事开始。</p></section><div className="contents-groups">{groups.map((group) => <section className="contents-group" key={group.title}><div className="contents-group-heading"><span>{group.title}</span><span>{String(group.entries.length).padStart(2, '0')}</span></div>{group.entries.map((chapter) => <button className="contents-row" key={chapter.id} onClick={() => onRead(chapter.id)}><span>{chapter.index}</span><strong>{formatChineseText(chapter.title)}</strong><small>{formatChineseText(chapter.subtitle)}</small><ArrowUpRight size={15} /></button>)}</section>)}</div><section className="contents-appendix"><span className="opening-kicker">APPENDIX</span><h2>正文之后的四个附录</h2><div className="appendix-index-grid">{appendixTabs.map((tab, index) => <div key={tab.id}><span>0{index + 1}</span><strong>{tab.label}</strong><p>{tab.id === 'people' ? '谁在保护谁，谁最后承担代价。' : tab.id === 'choices' ? '选择如何在很久以后回来。' : tab.id === 'dlc' ? `${edition.scopeLabel} 如何重新定义主题。` : '把这套读法带到下一款游戏。'}</p></div>)}</div></section></div> }

function AppendixView({ edition, activeTab, onTab }: { edition: GameEdition; activeTab: AppendixTab; onTab: (tab: AppendixTab) => void }) { return <div className="appendix-view"><section className="appendix-intro"><span className="opening-kicker">APPENDIX / AFTER READING</span><h1>附录</h1><p>正文之外的索引工具。需要时打开，不需要时让它安静地待在书后。</p></section><nav className="appendix-tabs" aria-label="附录导航">{appendixTabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? 'is-active' : ''} onClick={() => onTab(tab.id)}>{tab.label}</button>)}</nav>{activeTab === 'people' && <PeopleAppendix edition={edition} />}{activeTab === 'choices' && <ChoicesAppendix edition={edition} />}{activeTab === 'dlc' && <DlcAppendix edition={edition} />}{activeTab === 'method' && <MethodAppendix edition={edition} />}</div> }

function PeopleAppendix({ edition }: { edition: GameEdition }) { const position = mapPositions(edition.id, edition.characters); return <section className="appendix-section people-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">01 / RELATIONSHIP MAP</span><h2>人物关系</h2></div><p>这不是恋爱表，而是一张保护关系的地图。</p></div><div className="mini-map-wrap"><svg className="mini-map" viewBox="0 0 890 480" role="img" aria-label={`${edition.label}主要人物关系图`}>{edition.relationships.map((link) => <line key={`${link.from}-${link.to}`} className={`mini-link ${link.tone}`} x1={position[link.from].x} y1={position[link.from].y} x2={position[link.to].x} y2={position[link.to].y} />)}{edition.characters.map((character) => <g key={character.id} className="mini-node" transform={`translate(${position[character.id].x} ${position[character.id].y})`}><circle r={character.id === (edition.id === 'witcher3' ? 'geralt' : 'v') ? 27 : 21} /><text y="42" textAnchor="middle">{formatChineseText(character.name)}</text></g>)}</svg></div><div className="people-index">{edition.characters.map((character) => <div key={character.id}><strong>{formatChineseText(character.name)}</strong><span>{formatChineseText(character.role)}</span><p>{formatChineseText(character.note)}</p></div>)}</div></section> }

function ChoicesAppendix({ edition }: { edition: GameEdition }) { return <section className="appendix-section choices-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">02 / ECHOES</span><h2>选择与结局</h2></div><p>结局不是最后一题，而是早先态度的回声。</p></div><div className="choice-list">{edition.decisions.map((decision, index) => <div className="choice-row" key={decision.id}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{formatChineseText(decision.title)}</strong><p>{formatChineseText(decision.prompt)}</p></div><small>{formatChineseText(decision.branches.join(' / '))}</small></div>)}</div><div className="ending-list">{edition.endings.map((ending, index) => <div key={ending.title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{formatChineseText(ending.title)}</strong><p>{formatChineseText(ending.reading)}</p></div>)}</div></section> }

function DlcAppendix({ edition }: { edition: GameEdition }) { return <section className="appendix-section dlc-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">03 / EXPANSIONS</span><h2>本体之外</h2></div><p>{edition.id === 'witcher3' ? '两个 DLC 没有换掉主题，只是把问题问得更狠。' : '往日之影把本体的求生问题推进成一场关于忠诚的间谍惊悚。'}</p></div><div className="dlc-summary">{edition.dlcCards.map((card) => <div key={card.label}><span>{card.label}</span><h3>{card.title}</h3><p>{card.body}</p></div>)}</div><div className="theme-list">{edition.dlcThemes.map((theme) => <div key={theme.label}><strong>{theme.label}</strong><p>{theme.base}</p><p>{theme.dlc}</p></div>)}</div></section> }

function MethodAppendix({ edition }: { edition: GameEdition }) { return <section className="appendix-section method-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">04 / THE LENS</span><h2>分析方法</h2></div><p>{edition.methodIntro}</p></div><blockquote className="method-quote">「不要压缩。遇到两难就停下来彻底拆开。」</blockquote><div className="method-list">{analysisSteps.map((step) => <div key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.body}</p></div></div>)}</div><div className="method-questions"><span className="opening-kicker">先问这六个问题</span>{methodQuestions.map((question, index) => <p key={question}><span>{String(index + 1).padStart(2, '0')}</span>{question}</p>)}</div></section> }

function chapterGroups(chaptersForEdition: Chapter[]) { return [{ title: '本体 · 旅程', entries: chaptersForEdition.filter((chapter) => chapter.kind === 'main') }, { title: '本体 · 支线', entries: chaptersForEdition.filter((chapter) => chapter.kind === 'side') }, { title: '扩展 · DLC', entries: chaptersForEdition.filter((chapter) => chapter.kind === 'dlc') }].filter((group) => group.entries.length > 0) }

function mapPositions(editionId: EditionId, people: Character[]) { const preset: Record<EditionId, Record<string, { x: number; y: number }>> = { witcher3: { geralt: { x: 380, y: 160 }, ciri: { x: 210, y: 72 }, yennefer: { x: 560, y: 66 }, triss: { x: 630, y: 190 }, vesemir: { x: 190, y: 260 }, dandelion: { x: 520, y: 300 }, baron: { x: 77, y: 180 }, olivier: { x: 770, y: 80 }, olgierd: { x: 760, y: 195 }, regis: { x: 650, y: 330 }, dettlaff: { x: 815, y: 320 }, anna: { x: 785, y: 420 } }, cyberpunk2077: { v: { x: 380, y: 160 }, johnny: { x: 210, y: 72 }, jackie: { x: 110, y: 255 }, judy: { x: 620, y: 65 }, panam: { x: 680, y: 180 }, rogue: { x: 590, y: 320 }, songbird: { x: 170, y: 410 }, reed: { x: 390, y: 405 }, yorinobu: { x: 780, y: 85 }, hanako: { x: 790, y: 210 }, myers: { x: 760, y: 365 } } }; const fallback = people.reduce<Record<string, { x: number; y: number }>>((positions, person, index) => ({ ...positions, [person.id]: { x: 90 + (index % 5) * 175, y: 70 + Math.floor(index / 5) * 190 } }), {}); return { ...fallback, ...preset[editionId] } }

const officialTranslations: [string, string][] = [
  ['冈特·欧迪姆', '刚特·欧迪姆'], ['欧迪姆', '刚特·欧迪姆'], ['Gaunter O’Dimm', '刚特·欧迪姆'], ['Gaunter O\'Dimm', '刚特·欧迪姆'], ['O’Dimm', '刚特·欧迪姆'],
  ['Philip Strenger', '菲利普·斯特伦格'], ['Keira Metz', '凯拉·梅兹'], ['Avallac’h', '阿瓦拉克'], ['Avallac\'h', '阿瓦拉克'],
  ['Elder Blood', '上古之血'], ['White Orchard', '白果园'], ['Botchling', '尸婴'], ['Lubberkin', '家宅精灵'], ['Crones', '林中夫人'],
  ['Nathaniel', '纳撒尼尔'], ['Hubert', '休伯特'], ['Cerys', '凯瑞丝'], ['Hjalmar', '哈尔玛'], ['Svanrige', '斯凡里吉'],
  ['Crach an Craite', '克拉奇·安·克莱特'], ['an Craite', '安·克莱特'], ['Undvik', '安德维克'], ['Spikeroog', '史派克鲁格'], ['Jarl Udalryk', '乌达里克领主'], ['Kaer Trolde', '凯尔·特罗德'],
  ['Skjall', '斯凯尔'], ['Uma', '乌马'], ['Isle of Mists', '迷雾之岛'], ['Eredin', '艾瑞汀'], ['Imlerith', '伊勒瑞斯'], ['Weavess', '织婆'], ['White Frost', '白霜'],
  ['欧吉尔德·冯·爱维瑞克', '欧吉尔德·冯·埃弗雷克'], ['欧吉尔德', '欧吉尔德·冯·埃弗雷克'], ['Roche', '罗契'], ['Dijkstra', '迪科斯彻'], ['Olgierd von Everec', '欧吉尔德·冯·埃弗雷克'], ['Olgierd', '欧吉尔德·冯·埃弗雷克'], ['Iris von Everec', '爱丽丝·冯·埃弗雷克'], ['Vlodimir', '弗洛迪米尔'],
  ['Ofieri Prince', '欧菲尔王子'], ['Maximilian Borsodi', '马克西米利安·波索迪'], ['Ewald Borsodi', '埃瓦尔德·波索迪'], ['Orianna', '欧立安娜'], ['Land of a Thousand Fables', '千童话之地'], ['Tesham Mutna', '特沙姆·穆特纳'],
  ['Syanna', '席安娜'], ['Dettlaff', '狄拉夫'], ['Regis', '雷吉斯'], ['The Night of Long Fangs', '长牙之夜'], ['Anna', '安娜'], ['Tamara', '塔玛拉'], ['Ciri', '希里'], ['Dandelion', '丹德里恩'], ['Triss Merigold', '特莉丝·梅莉葛德'], ['Zoltan', '卓尔坦·齐瓦'], ['Corinne Tilly', '柯琳·蒂莉'], ['Birna Bran', '比尔娜·布兰'], ['Menge', '曼吉'], ['Priscilla', '普西拉'], ['Sara', '莎拉'], ['Whoreson Junior', '霍桑二世'],
  ['Jackie Welles', '杰克·威尔斯'], ['Dexter DeShawn', '德克斯特·德肖恩'], ['Evelyn Parker', '伊芙琳·帕克'], ['Yorinobu Arasaka', '赖宣·荒坂'], ['Saburo Arasaka', '荒坂三郎'], ['Johnny Silverhand', '强尼·银手'], ['Viktor Vektor', '维克多·维克托'], ['Alt Cunningham', '奥特·坎宁安'], ['Goro Takemura', '竹村五郎'], ['Judy Alvarez', '朱迪·阿尔瓦雷兹'], ['Panam Palmer', '帕南·帕尔默'], ['Aldecaldos', '阿德卡多'], ['Rogue Amendiares', '罗格·阿曼迪亚斯'], ['Song So Mi', '百灵鸟'], ['Songbird', '百灵鸟'], ['Solomon Reed', '所罗门·李德'], ['Rosalind Myers', '罗莎琳德·迈尔斯'], ['Kurt Hansen', '库尔特·汉森'],
]

const officialTranslationMap = new Map(officialTranslations)
const officialTranslationPattern = new RegExp(officialTranslations.map(([source]) => source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length).join('|'), 'g')

function formatChineseText(value: string) {
  const text = value.replace(officialTranslationPattern, (match) => officialTranslationMap.get(match) ?? match)
  return text.replace(/“([^”]+)”/g, '「$1」').replace(/"([^"]+)"/g, '「$1」').replace(/\.{3}/g, '……').replace(/([\u4e00-\u9fff])([A-Za-z0-9])/g, '$1 $2').replace(/([A-Za-z0-9])([\u4e00-\u9fff])/g, '$1 $2').replace(/ {2,}/g, ' ')
}

export default App
