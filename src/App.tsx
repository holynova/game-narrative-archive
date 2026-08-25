import { useEffect, useState } from 'react'
import { ArrowUpRight, BookOpen, ChevronRight, Menu, Network, ScrollText, X } from 'lucide-react'
import { analysisSteps, chapters, characters, decisions, dlcThemes, endings, methodQuestions, relationships } from './data'

type ViewId = 'read' | 'contents' | 'appendix'
type AppendixTab = 'people' | 'choices' | 'dlc' | 'method'

const appendixTabs: { id: AppendixTab; label: string }[] = [
  { id: 'people', label: '人物关系' },
  { id: 'choices', label: '选择与结局' },
  { id: 'dlc', label: 'DLC 对照' },
  { id: 'method', label: '分析方法' },
]

const groups = [
  { title: '本体 · 旅程', entries: chapters.filter((chapter) => chapter.kind === 'main') },
  { title: '本体 · 支线', entries: chapters.filter((chapter) => chapter.kind === 'side') },
  { title: '扩展 · DLC', entries: chapters.filter((chapter) => chapter.kind === 'dlc') },
]

function App() {
  const [view, setView] = useState<ViewId>('read')
  const [appendixTab, setAppendixTab] = useState<AppendixTab>('people')
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const label = view === 'read' ? '阅读' : view === 'contents' ? '目录' : '附录'
    document.title = `${label} · 游戏剧情档案馆`
  }, [view])

  const openRead = (chapterId?: string) => {
    setView('read')
    setTocOpen(false)
    window.requestAnimationFrame(() => {
      if (chapterId) document.getElementById(chapterId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const openAppendix = (tab: AppendixTab = 'people') => {
    setAppendixTab(tab)
    setView('appendix')
    setTocOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="book-app">
      <header className="book-header">
        <div className="book-identity">
          <button className="mobile-menu-button" onClick={() => setTocOpen((open) => !open)} aria-label={tocOpen ? '关闭目录' : '打开目录'}>
            {tocOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button className="identity-copy" onClick={() => openRead()}>
            <span className="identity-mark">GAME / ARCHIVE</span>
            <span className="identity-name">游戏剧情档案馆</span>
          </button>
        </div>
        <nav className="book-nav" aria-label="主导航">
          <button className={view === 'read' ? 'is-active' : ''} onClick={() => openRead()}>阅读</button>
          <button className={view === 'contents' ? 'is-active' : ''} onClick={() => { setView('contents'); setTocOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>目录</button>
          <button className={view === 'appendix' ? 'is-active' : ''} onClick={() => openAppendix()}>附录</button>
        </nav>
        <div className="book-edition"><span>THE WITCHER 3</span><span className="book-edition-dot" /><span>FULL SPOILER</span></div>
      </header>

      <div className="book-layout">
        <TableOfContents activeView={view} open={tocOpen} onRead={openRead} onAppendix={openAppendix} />
        <main className="book-main">
          {view === 'read' && <ReadingView onAppendix={openAppendix} />}
          {view === 'contents' && <ContentsView onRead={openRead} />}
          {view === 'appendix' && <AppendixView activeTab={appendixTab} onTab={setAppendixTab} />}
        </main>
        <ReadingRail view={view} />
      </div>

      <footer className="book-footer"><span>GAME / ARCHIVE</span><span>一份连续阅读的剧情档案</span><span>2026</span></footer>
    </div>
  )
}

function TableOfContents({ activeView, open, onRead, onAppendix }: { activeView: ViewId; open: boolean; onRead: (chapterId?: string) => void; onAppendix: (tab?: AppendixTab) => void }) {
  return (
    <aside className={`toc ${open ? 'is-open' : ''}`} aria-label="剧情目录">
      <div className="toc-heading"><span>目录</span><span className="toc-count">11 章</span></div>
      <button className={`toc-home ${activeView === 'read' ? 'is-active' : ''}`} onClick={() => onRead()}><BookOpen size={15} /><span>从头开始阅读</span></button>
      {groups.map((group) => <div className="toc-group" key={group.title}><span className="toc-group-title">{group.title}</span>{group.entries.map((chapter) => <button className="toc-entry" key={chapter.id} onClick={() => onRead(chapter.id)}><span>{chapter.index}</span><strong>{chapter.title}</strong></button>)}</div>)}
      <div className="toc-appendix"><span className="toc-group-title">附录</span><button onClick={() => onAppendix('people')}><Network size={14} /><span>人物关系</span></button><button onClick={() => onAppendix('choices')}><ChevronRight size={14} /><span>选择与结局</span></button><button onClick={() => onAppendix('method')}><ScrollText size={14} /><span>分析方法</span></button></div>
    </aside>
  )
}

function ReadingRail({ view }: { view: ViewId }) {
  return <aside className="reading-rail" aria-label="阅读信息"><div className="rail-rule" /><span className="rail-label">READING EDITION</span><strong>{view === 'read' ? '连续阅读' : view === 'contents' ? '章节目录' : '辅助附录'}</strong><p>{view === 'read' ? '把它当成一本书。从一页读到下一页，先让故事自己展开。' : '这里的工具不替正文讲故事，只在你需要回看时提供索引。'}</p><div className="rail-rule rail-rule-bottom" /><span className="rail-label">CURRENT TEXT</span><span className="rail-current">本体 + 2 个 DLC</span></aside>
}

function ReadingView({ onAppendix }: { onAppendix: (tab?: AppendixTab) => void }) {
  return <div className="reading-view">
    <section className="book-opening"><span className="opening-kicker">THE WITCHER 3 / WILD HUNT</span><h1>一场关于<br /><em>如何放手</em>的旅程</h1><p>从白果园的一口井，到希里最终要走向的世界。这里不急着解释所有支线，也不要求你先看懂所有关系，只从第一页开始，连续读下去。</p><div className="opening-meta"><span>本体 + 石之心 + 血与酒</span><span>全剧透</span><span>约 40 分钟</span></div></section>
    <article className="continuous-story"><div className="story-preface"><span className="chapter-number">序</span><p>《巫师 3》的真正主线，不是杰洛特消灭了多少怪物，而是他如何在每一次没有干净答案的选择里，继续和别人一起生活。</p></div>{chapters.map((chapter, index) => <ChapterBlock chapter={chapter} number={index + 1} key={chapter.id} />)}</article>
    <section className="reading-end"><span className="opening-kicker">THE END IS ANOTHER BEGINNING</span><h2>读完正文，再去看那些图。</h2><p>人物关系、选择矩阵和分析方法都放在附录里。它们不是另一套入口，而是读完故事之后，帮你回头看清结构的工具。</p><div className="appendix-links"><button onClick={() => onAppendix('people')}>人物关系 <ArrowUpRight size={14} /></button><button onClick={() => onAppendix('choices')}>选择与结局 <ArrowUpRight size={14} /></button><button onClick={() => onAppendix('method')}>分析方法 <ArrowUpRight size={14} /></button></div></section>
  </div>
}

function ChapterBlock({ chapter, number }: { chapter: (typeof chapters)[number]; number: number }) {
  return <section className="chapter-block" id={chapter.id}><header className="chapter-heading"><span className="chapter-number">{chapter.index}</span><div><span className="chapter-region">{chapter.region}</span><h2>{chapter.title}</h2><p>{chapter.subtitle}</p></div></header><div className="story-prose">{chapter.body.map((paragraph, index) => <p className={storyParagraphClass(paragraph)} key={`${chapter.id}-${index}`}>{paragraph}</p>)}</div><aside className="hard-question"><span>这一章留下的问题</span><strong>{chapter.question}</strong></aside><div className="chapter-tail"><span>{chapter.tags.join('  ·  ')}</span><span>{String(number).padStart(2, '0')} / 11</span></div></section>
}

function storyParagraphClass(paragraph: string) {
  if (paragraph.startsWith('>')) return 'story-quote'
  if (paragraph.startsWith('【确定】')) return 'story-fact'
  if (paragraph.startsWith('【很可能】')) return 'story-reading'
  if (/^(选择|如果|与此同时|最终|现在再看|结局|路线|所以我的判断|这就是|真正的)/.test(paragraph)) return 'story-turn'
  return ''
}

function ContentsView({ onRead }: { onRead: (chapterId?: string) => void }) {
  return <div className="contents-view"><section className="contents-intro"><span className="opening-kicker">TABLE OF CONTENTS</span><h1>目录</h1><p>这不是任务清单，而是一本书的章节顺序。你可以从头读，也可以从某一段故事开始。</p></section><div className="contents-groups">{groups.map((group) => <section className="contents-group" key={group.title}><div className="contents-group-heading"><span>{group.title}</span><span>{String(group.entries.length).padStart(2, '0')}</span></div>{group.entries.map((chapter) => <button className="contents-row" key={chapter.id} onClick={() => onRead(chapter.id)}><span>{chapter.index}</span><strong>{chapter.title}</strong><small>{chapter.subtitle}</small><ArrowUpRight size={15} /></button>)}</section>)}</div><section className="contents-appendix"><span className="opening-kicker">APPENDIX</span><h2>正文之后的四个附录</h2><div className="appendix-index-grid">{appendixTabs.map((tab, index) => <div key={tab.id}><span>0{index + 1}</span><strong>{tab.label}</strong><p>{tab.id === 'people' ? '谁在保护谁，谁最后承担代价。' : tab.id === 'choices' ? '选择如何在很久以后回来。' : tab.id === 'dlc' ? '两个 DLC 如何重新定义宽恕。' : '把这套读法带到下一款游戏。'}</p></div>)}</div></section></div>
}

function AppendixView({ activeTab, onTab }: { activeTab: AppendixTab; onTab: (tab: AppendixTab) => void }) {
  return <div className="appendix-view"><section className="appendix-intro"><span className="opening-kicker">APPENDIX / AFTER READING</span><h1>附录</h1><p>正文之外的索引工具。需要时打开，不需要时让它安静地待在书后。</p></section><nav className="appendix-tabs" aria-label="附录导航">{appendixTabs.map((tab) => <button key={tab.id} className={activeTab === tab.id ? 'is-active' : ''} onClick={() => onTab(tab.id)}>{tab.label}</button>)}</nav>{activeTab === 'people' && <PeopleAppendix />}{activeTab === 'choices' && <ChoicesAppendix />}{activeTab === 'dlc' && <DlcAppendix />}{activeTab === 'method' && <MethodAppendix />}</div>
}

function PeopleAppendix() {
  const position: Record<string, { x: number; y: number }> = { geralt: { x: 380, y: 160 }, ciri: { x: 210, y: 72 }, yennefer: { x: 560, y: 66 }, triss: { x: 630, y: 190 }, vesemir: { x: 190, y: 260 }, dandelion: { x: 520, y: 300 }, baron: { x: 77, y: 180 }, olivier: { x: 770, y: 80 }, olgierd: { x: 760, y: 195 }, regis: { x: 650, y: 330 }, dettlaff: { x: 815, y: 320 }, anna: { x: 785, y: 420 } }
  return <section className="appendix-section people-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">01 / RELATIONSHIP MAP</span><h2>人物关系</h2></div><p>这不是恋爱表，而是一张保护关系的地图。</p></div><div className="mini-map-wrap"><svg className="mini-map" viewBox="0 0 890 480" role="img" aria-label="巫师三主要人物关系图">{relationships.map((link) => <line key={`${link.from}-${link.to}`} className={`mini-link ${link.tone}`} x1={position[link.from].x} y1={position[link.from].y} x2={position[link.to].x} y2={position[link.to].y} />)}{characters.map((character) => <g key={character.id} className="mini-node" transform={`translate(${position[character.id].x} ${position[character.id].y})`}><circle r={character.id === 'geralt' ? 27 : 21} /><text y="42" textAnchor="middle">{character.name}</text></g>)}</svg></div><div className="people-index">{characters.map((character) => <div key={character.id}><strong>{character.name}</strong><span>{character.role}</span><p>{character.note}</p></div>)}</div></section>
}

function ChoicesAppendix() {
  return <section className="appendix-section choices-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">02 / ECHOES</span><h2>选择与结局</h2></div><p>结局不是最后一题，而是早先态度的回声。</p></div><div className="choice-list">{decisions.map((decision, index) => <div className="choice-row" key={decision.id}><span>0{index + 1}</span><div><strong>{decision.title}</strong><p>{decision.prompt}</p></div><small>{decision.branches.join(' / ')}</small></div>)}</div><div className="ending-list">{endings.map((ending, index) => <div key={ending.title}><span>0{index + 1}</span><strong>{ending.title}</strong><p>{ending.reading}</p></div>)}</div></section>
}

function DlcAppendix() {
  return <section className="appendix-section dlc-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">03 / EXPANSIONS</span><h2>本体之外</h2></div><p>两个 DLC 没有换掉主题，只是把问题问得更狠。</p></div><div className="dlc-summary"><div><span>D1</span><h3>石之心</h3><p>把责任写成一纸契约：救欧吉尔德，不等于替他抹去过去。</p></div><div><span>D2</span><h3>血与酒</h3><p>把宽恕放进童话王国：理解创伤，不等于取消责任。</p></div></div><div className="theme-list">{dlcThemes.map((theme) => <div key={theme.label}><strong>{theme.label}</strong><p>{theme.base}</p><p>{theme.dlc}</p></div>)}</div></section>
}

function MethodAppendix() {
  return <section className="appendix-section method-appendix"><div className="appendix-section-heading"><div><span className="opening-kicker">04 / THE LENS</span><h2>分析方法</h2></div><p>把这套读法带到《赛博朋克 2077》或下一款游戏。</p></div><blockquote className="method-quote">“不要压缩。遇到两难就停下来彻底拆开。”</blockquote><div className="method-list">{analysisSteps.map((step) => <div key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.body}</p></div></div>)}</div><div className="method-questions"><span className="opening-kicker">先问这六个问题</span>{methodQuestions.map((question, index) => <p key={question}><span>0{index + 1}</span>{question}</p>)}</div></section>
}

export default App
