import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleDot,
  Compass,
  GitBranch,
  Layers3,
  Map,
  Menu,
  Network,
  ScrollText,
  Sparkles,
  X,
} from 'lucide-react'
import {
  analysisSteps,
  chapters,
  characters,
  decisions,
  dlcThemes,
  endings,
  methodQuestions,
  relationships,
  type Character,
  type SectionId,
} from './data'

const navigation: { id: SectionId; label: string; detail: string; icon: typeof BookOpen }[] = [
  { id: 'overview', label: '总览', detail: 'THE FIELD', icon: Compass },
  { id: 'story', label: '剧情', detail: 'THE ROUTE', icon: BookOpen },
  { id: 'characters', label: '人物', detail: 'THE WEB', icon: Network },
  { id: 'choices', label: '选择', detail: 'THE ECHO', icon: GitBranch },
  { id: 'dlc', label: 'DLC', detail: 'THE AFTERLIFE', icon: Layers3 },
  { id: 'method', label: '方法', detail: 'THE LENS', icon: ScrollText },
]

const chapterNodes = [
  { label: '白果园', index: '01' },
  { label: '威伦', index: '02–03' },
  { label: '诺维格瑞', index: '04–05' },
  { label: '史凯利格', index: '06' },
  { label: '收束', index: '07–09' },
  { label: '石之心', index: 'D1' },
  { label: '血与酒', index: 'D2' },
]

const characterPositions: Record<string, { x: number; y: number }> = {
  geralt: { x: 390, y: 188 },
  ciri: { x: 220, y: 96 },
  yennefer: { x: 560, y: 82 },
  triss: { x: 632, y: 202 },
  vesemir: { x: 210, y: 274 },
  dandelion: { x: 540, y: 318 },
  baron: { x: 95, y: 208 },
  olivier: { x: 788, y: 98 },
  olgierd: { x: 785, y: 214 },
  regis: { x: 664, y: 356 },
  dettlaff: { x: 820, y: 338 },
  anna: { x: 792, y: 435 },
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.title = `${navigation.find((item) => item.id === activeSection)?.label ?? '总览'} · 游戏剧情档案馆`
  }, [activeSection])

  const goTo = (section: SectionId) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <aside className={`side-rail ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="rail-brand">
          <ArchiveGlyph />
          <div>
            <strong>GAME / ARCHIVE</strong>
            <span>游戏剧情档案馆</span>
          </div>
        </div>

        <div className="rail-rule" />
        <div className="rail-status">
          <span className="status-dot" />
          <span>FULL SPOILER / 03.11</span>
        </div>

        <nav className="side-nav" aria-label="主要导航">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'is-active' : ''}`}
                onClick={() => goTo(item.id)}
              >
                <Icon size={17} strokeWidth={1.7} />
                <span>{item.label}</span>
                <small>{item.detail}</small>
              </button>
            )
          })}
        </nav>

        <div className="rail-bottom">
          <div className="rail-note">
            <span className="micro-label">READER'S NOTE</span>
            <p>先看全图，再进入一个人的困境。每一次选择，都会在很久以后回来。</p>
          </div>
          <div className="rail-footer">
            <span>本体 + 2 DLC</span>
            <span>CN / EN NAMES</span>
          </div>
        </div>
      </aside>

      <div className="page-column">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="打开导航">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="topbar-location">
            <span className="topbar-kicker">CURRENT FOLIO</span>
            <span className="topbar-title">{navigation.find((item) => item.id === activeSection)?.label}</span>
          </div>
          <div className="topbar-meta">
            <span>WILD HUNT</span>
            <span className="topbar-separator" />
            <span>READ / MAP / TRACE</span>
          </div>
        </header>

        <main>
          {activeSection === 'overview' && <Overview onNavigate={goTo} />}
          {activeSection === 'story' && <StoryView onNavigate={goTo} />}
          {activeSection === 'characters' && <CharactersView />}
          {activeSection === 'choices' && <ChoicesView />}
          {activeSection === 'dlc' && <DlcView />}
          {activeSection === 'method' && <MethodView />}
        </main>

        <footer className="site-footer">
          <div className="footer-mark"><ArchiveGlyph small /></div>
          <p>一份把任务、人物与选择重新折叠在一起的剧情档案。</p>
          <span>GAME / ARCHIVE · 2026</span>
        </footer>
      </div>

      <div className="mobile-bottom-nav" aria-label="移动端导航">
        {navigation.slice(0, 5).map((item) => {
          const Icon = item.icon
          return (
            <button key={item.id} className={activeSection === item.id ? 'is-active' : ''} onClick={() => goTo(item.id)}>
              <Icon size={18} strokeWidth={1.7} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ArchiveGlyph({ small = false }: { small?: boolean }) {
  return (
    <svg className={`archive-glyph ${small ? 'is-small' : ''}`} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M9 11.5 24 7l15 4.5v25L24 41 9 36.5v-25Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m9 11.5 15 5 15-5M24 16.5V41M16.5 14l15 5M16.5 14v18.5M31.5 19v18.5" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="m20 25 4-1.4 4 1.4-4 1.4-4-1.4Z" fill="currentColor" opacity=".82" />
    </svg>
  )
}

function Overview({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  return (
    <div className="view overview-view">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="hero-line"><span className="hero-line-dot" /> <span>THE WITCHER 3: WILD HUNT</span></div>
          <h1>一张会展开的<br /><em>故事地图</em></h1>
          <p className="hero-lede">从白果园的一口井，到希里最终要走向的世界。把任务、人物、选择与后果放回同一张纸上，重新读一遍《巫师 3》。</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => onNavigate('story')}>开始阅读 <ArrowUpRight size={16} /></button>
            <button className="text-action" onClick={() => onNavigate('characters')}>先看人物关系 <ChevronRight size={16} /></button>
          </div>
          <div className="hero-footnote"><span>本体 + 石之心 + 血与酒</span><span>全剧透档案</span></div>
        </div>

        <div className="hero-map-wrap">
          <FoldedStoryMap />
          <div className="hero-map-caption"><span>FIG. 01</span><span>从寻找，到放手</span></div>
        </div>
      </section>

      <section className="manifesto-strip">
        <div className="manifesto-mark">“</div>
        <div>
          <p>《巫师 3》的真正主线，不是杰洛特消灭了多少怪物，而是他如何在每一次没有干净答案的选择里，继续和别人一起生活。</p>
          <span>— ARCHIVE PRINCIPLE / 01</span>
        </div>
      </section>

      <section className="section-block route-overview">
        <div className="section-heading-row">
          <div>
            <span className="section-marker">A / THE ROUTE</span>
            <h2>先看全图，再进入细节</h2>
          </div>
          <button className="inline-link" onClick={() => onNavigate('story')}>打开完整路线 <ArrowUpRight size={15} /></button>
        </div>
        <div className="route-line">
          {chapterNodes.map((node, index) => (
            <button key={node.label} className={`route-node ${index === 4 ? 'is-current' : ''}`} onClick={() => onNavigate('story')}>
              <span className="route-node-index">{node.index}</span>
              <span>{node.label}</span>
              {index < chapterNodes.length - 1 && <span className="route-connector" />}
            </button>
          ))}
        </div>
        <div className="route-caption"><span>起点：一个失踪的女儿</span><span>终点：允许她成为自己</span></div>
      </section>

      <section className="split-reading-section">
        <article className="feature-article">
          <span className="section-marker">B / DEEP READ</span>
          <h2>血腥男爵为什么经典？</h2>
          <p>因为这条线不要求你先判断他是不是一个“好人”。它要求你把一个人的伤害、悔恨、软弱和责任同时放在眼前。</p>
          <div className="article-pullquote">“解释”和“开脱”，是两回事。</div>
          <button className="inline-link" onClick={() => onNavigate('story')}>进入威伦章节 <ArrowUpRight size={15} /></button>
        </article>
        <div className="reading-index">
          <div className="index-head"><span>RECOMMENDED ORDER</span><span>03 ENTRIES</span></div>
          <button className="index-row" onClick={() => onNavigate('story')}><span>01</span><strong>从威伦开始理解“灰色”</strong><ChevronRight size={16} /></button>
          <button className="index-row" onClick={() => onNavigate('characters')}><span>02</span><strong>看杰洛特如何学会后退</strong><ChevronRight size={16} /></button>
          <button className="index-row" onClick={() => onNavigate('dlc')}><span>03</span><strong>用两个 DLC 重新看宽恕</strong><ChevronRight size={16} /></button>
        </div>
      </section>

      <section className="section-block signal-section">
        <div className="section-heading-row">
          <div>
            <span className="section-marker">C / SIGNALS</span>
            <h2>这部作品反复折返的主题</h2>
          </div>
          <span className="muted-count">06 THEMES</span>
        </div>
        <div className="signal-grid">
          {['责任不是清白', '保护与控制', '战争先于英雄', '解释不等于开脱', '选择的延迟回声', '离开也是一种答案'].map((theme, index) => (
            <div className={`signal-cell signal-${index + 1}`} key={theme}>
              <span>0{index + 1}</span><strong>{theme}</strong><CircleDot size={13} />
            </div>
          ))}
        </div>
      </section>

      <section className="closing-invite">
        <div>
          <span className="section-marker">THE LENS</span>
          <h2>以后分析任何一款游戏，都可以从这里开始。</h2>
        </div>
        <button className="primary-action dark-action" onClick={() => onNavigate('method')}>打开分析方法 <ArrowUpRight size={16} /></button>
      </section>
    </div>
  )
}

function FoldedStoryMap() {
  return (
    <div className="folded-map" aria-label="游戏故事路线折页图">
      <div className="map-corner corner-a">WILD HUNT</div>
      <div className="map-sheet map-sheet-back"><span>THE NORTH</span><i /></div>
      <div className="map-sheet map-sheet-middle"><span>THE CHOICE</span><i /><b /></div>
      <div className="map-sheet map-sheet-front">
        <div className="map-front-top"><span>ARCHIVE / 03</span><span>FULL SPOILER</span></div>
        <div className="map-path path-one"><span className="map-dot" /><span className="map-dot" /><span className="map-dot" /></div>
        <div className="map-path path-two"><span className="map-dot" /><span className="map-dot" /></div>
        <div className="map-card-title"><small>THE WITCHER 3</small><strong>从寻找<br />到放手</strong></div>
        <div className="map-front-foot"><span>GERALT / CIRI</span><span>VOL. 01</span></div>
      </div>
      <div className="map-annotation note-one"><span>01</span><span>关系</span></div>
      <div className="map-annotation note-two"><span>02</span><span>选择</span></div>
      <div className="map-annotation note-three"><span>03</span><span>回声</span></div>
    </div>
  )
}

function ViewHeader({ marker, title, description, count }: { marker: string; title: string; description: string; count?: string }) {
  return (
    <section className="view-header">
      <div>
        <span className="section-marker">{marker}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {count && <span className="view-count">{count}</span>}
    </section>
  )
}

function StoryView({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id)
  const [filter, setFilter] = useState<'all' | 'main' | 'side' | 'dlc'>('all')
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0]
  const filteredChapters = filter === 'all' ? chapters : chapters.filter((chapter) => chapter.kind === filter)

  return (
    <div className="view story-view">
      <ViewHeader marker="A / THE ROUTE" title="剧情路线" description="不要把它当成任务清单。这里按叙事转折整理：每一段都记录发生了什么、它真正问了什么，以及它如何在之后回来。" count="09 CHAPTERS · 02 DLC" />
      <div className="story-filters" role="tablist" aria-label="剧情类型">
        {[['all', '全部'], ['main', '主线'], ['side', '重点支线'], ['dlc', 'DLC']].map(([value, label]) => (
          <button key={value} className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value as typeof filter)}>{label}</button>
        ))}
      </div>
      <section className="story-reader">
        <div className="chapter-list" aria-label="章节列表">
          <div className="chapter-list-head"><span>FOLIO INDEX</span><span>{filteredChapters.length.toString().padStart(2, '0')}</span></div>
          {filteredChapters.map((chapter) => (
            <button key={chapter.id} className={`chapter-row ${activeChapter.id === chapter.id ? 'is-active' : ''}`} onClick={() => setActiveChapterId(chapter.id)}>
              <span className="chapter-row-index">{chapter.index}</span>
              <span className="chapter-row-copy"><small>{chapter.region}</small><strong>{chapter.title}</strong></span>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
        <article className="chapter-detail">
          <div className="chapter-detail-meta"><span>{activeChapter.region}</span><span>{activeChapter.kind === 'dlc' ? 'EXPANSION' : activeChapter.kind.toUpperCase()}</span></div>
          <h2>{activeChapter.title}</h2>
          <p className="chapter-subtitle">{activeChapter.subtitle}</p>
          <div className="chapter-tags">{activeChapter.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="chapter-prose"><p>{activeChapter.summary}</p></div>
          <div className="evidence-grid">
            <div><span className="evidence-label fact-label">确定事实</span><p>{activeChapter.fact}</p></div>
            <div><span className="evidence-label inference-label">分析判断</span><p>{activeChapter.reading}</p></div>
          </div>
          <div className="chapter-question"><span>THE QUESTION</span><strong>{activeChapter.question}</strong></div>
          <div className="chapter-detail-footer">
            <span>READING NOTE / {activeChapter.index}</span>
            <button className="inline-link" onClick={() => onNavigate(activeChapter.kind === 'dlc' ? 'dlc' : 'choices')}>{activeChapter.kind === 'dlc' ? '去看 DLC 对照' : '去看选择回声'} <ArrowUpRight size={15} /></button>
          </div>
        </article>
      </section>
      <section className="story-endnote"><span className="section-marker">THE THREAD</span><p>从白果园到陶森特，真正不变的不是杰洛特的剑，而是他一次次被迫回答：当你无法修复世界时，仍然愿意为谁留下？</p></section>
    </div>
  )
}

function CharactersView() {
  const [filter, setFilter] = useState<'all' | 'core' | 'dlc'>('all')
  const visibleRelationships = relationships.filter((relationship) => {
    if (filter === 'all') return true
    const dlcIds = new Set(['olivier', 'olgierd', 'regis', 'dettlaff', 'anna'])
    return filter === 'dlc' ? dlcIds.has(relationship.from) || dlcIds.has(relationship.to) : !dlcIds.has(relationship.from) && !dlcIds.has(relationship.to)
  })
  const visibleCharacters = characters.filter((character) => filter === 'all' || (filter === 'dlc' ? ['olivier', 'olgierd', 'regis', 'dettlaff', 'anna'].includes(character.id) : !['olivier', 'olgierd', 'regis', 'dettlaff', 'anna'].includes(character.id)))

  return (
    <div className="view characters-view">
      <ViewHeader marker="B / THE WEB" title="人物关系" description="人物不是节点，动机才是。用关系图看谁在保护谁、利用谁、失去谁，以及哪一段关系会在结局时变成代价。" count="12 FIGURES · 12 LINKS" />
      <div className="map-controls"><div className="story-filters" role="tablist" aria-label="人物关系筛选"><button className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>全部关系</button><button className={filter === 'core' ? 'is-active' : ''} onClick={() => setFilter('core')}>本体核心</button><button className={filter === 'dlc' ? 'is-active' : ''} onClick={() => setFilter('dlc')}>DLC 回声</button></div><div className="map-legend"><span><i className="legend-line family-line" />家族</span><span><i className="legend-line ally-line" />同盟</span><span><i className="legend-line rival-line" />对立</span></div></div>
      <section className="relationship-layout">
        <div className="relationship-map-wrap">
          <svg className="relationship-map" viewBox="0 0 920 520" role="img" aria-label="主要人物关系图">
            <path className="map-axis" d="M40 460H880M70 56V470" />
            <text x="77" y="42" className="map-axis-label">PRIVATE / PUBLIC</text>
            <text x="805" y="480" className="map-axis-label">THE DLC AFTERLIFE →</text>
            {visibleRelationships.map((relationship) => {
              const from = characterPositions[relationship.from]
              const to = characterPositions[relationship.to]
              return <line key={`${relationship.from}-${relationship.to}`} className={`relationship-line ${relationship.tone}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
            })}
            {visibleCharacters.map((character) => {
              const position = characterPositions[character.id]
              return <g key={character.id} className={`character-node node-${character.tone}`} transform={`translate(${position.x} ${position.y})`}><circle r={character.id === 'geralt' ? 31 : 23} /><circle r="4" className="node-core" /><text y="43" textAnchor="middle">{character.name}</text><text y="58" textAnchor="middle" className="node-role">{character.role}</text></g>
            })}
          </svg>
          <div className="map-caption"><span>THE RELATIONSHIP FIELD</span><span>线条表示叙事张力，不代表简单的善恶。</span></div>
        </div>
        <div className="character-notes">
          <div className="character-notes-head"><span>FIGURES IN FRAME</span><span>{visibleCharacters.length.toString().padStart(2, '0')}</span></div>
          {visibleCharacters.slice(0, 7).map((character) => <CharacterNote character={character} key={character.id} />)}
        </div>
      </section>
      <section className="relationship-thesis"><div className="thesis-icon"><Network size={20} /></div><div><span className="section-marker">RELATIONSHIP NOTE</span><p>杰洛特的关系网不是一张“谁和谁恋爱”的表格，而是一张保护关系的地图：他越想把希里保护在身后，越需要最后让她走到自己前面。</p></div></section>
    </div>
  )
}

function CharacterNote({ character }: { character: Character }) {
  return <div className="character-note"><div className={`character-note-mark mark-${character.tone}`}><span>{character.name.slice(0, 1)}</span></div><div><strong>{character.name}</strong><small>{character.role}</small><p>{character.note}</p></div></div>
}

function ChoicesView() {
  const [activeDecisionId, setActiveDecisionId] = useState(decisions[0].id)
  const activeDecision = decisions.find((decision) => decision.id === activeDecisionId) ?? decisions[0]
  return (
    <div className="view choices-view">
      <ViewHeader marker="C / THE ECHO" title="选择与结局" description="结局不是最后一个按钮，而是早先那些被你以为不会留下痕迹的态度，终于一起回来结算。" count="04 DECISIONS · 05 ENDINGS" />
      <section className="choice-workbench">
        <div className="decision-list">
          <div className="chapter-list-head"><span>DECISION INDEX</span><span>04</span></div>
          {decisions.map((decision) => <button key={decision.id} className={`decision-row ${activeDecision.id === decision.id ? 'is-active' : ''}`} onClick={() => setActiveDecisionId(decision.id)}><span className="decision-index">{String(decisions.indexOf(decision) + 1).padStart(2, '0')}</span><span><small>{decision.title}</small><strong>{decision.prompt}</strong></span><ChevronRight size={16} /></button>)}
        </div>
        <div className="decision-detail">
          <div className="decision-detail-top"><span className="section-marker">DECISION / {String(decisions.indexOf(activeDecision) + 1).padStart(2, '0')}</span><GitBranch size={20} /></div>
          <h2>{activeDecision.title}</h2>
          <p className="decision-prompt">{activeDecision.prompt}</p>
          <div className="branch-tree">
            <div className="branch-root"><span className="branch-dot" />你站在选择之前</div>
            {activeDecision.branches.map((branch, index) => <div className="branch-option" key={branch}><span className={`branch-connector branch-${index + 1}`} /><span className="branch-number">0{index + 1}</span><strong>{branch}</strong><ArrowUpRight size={14} /></div>)}
          </div>
          <div className="decision-note"><span>READING NOTE</span><p>{activeDecision.note}</p></div>
        </div>
      </section>
      <section className="ending-section">
        <div className="section-heading-row"><div><span className="section-marker">ENDING MATRIX</span><h2>主要结局不是好坏，而是价值排序</h2></div><span className="muted-count">READ THE COST</span></div>
        <div className="ending-grid">{endings.map((ending, index) => <article className={`ending-card ending-${ending.tone}`} key={ending.title}><div className="ending-card-head"><span>0{index + 1}</span><span className="ending-signal" /></div><h3>{ending.title}</h3><p className="ending-condition">{ending.condition}</p><p className="ending-reading">{ending.reading}</p></article>)}</div>
      </section>
    </div>
  )
}

function DlcView() {
  const [activeDlc, setActiveDlc] = useState<'hearts' | 'blood'>('hearts')
  const activeChapter = activeDlc === 'hearts' ? chapters.find((chapter) => chapter.id === 'hearts-of-stone')! : chapters.find((chapter) => chapter.id === 'blood-and-wine')!
  return (
    <div className="view dlc-view">
      <ViewHeader marker="D / THE AFTERLIFE" title="两个 DLC，另一种答案" description="本体结束后，故事没有收口。石之心和血与酒分别把“责任”和“宽恕”推进到更难躲开的地方。" count="02 EXPANSIONS" />
      <section className="dlc-switcher"><button className={activeDlc === 'hearts' ? 'is-active' : ''} onClick={() => setActiveDlc('hearts')}><span>D1</span><strong>石之心</strong><small>HEARTS OF STONE</small></button><button className={activeDlc === 'blood' ? 'is-active' : ''} onClick={() => setActiveDlc('blood')}><span>D2</span><strong>血与酒</strong><small>BLOOD AND WINE</small></button></section>
      <section className={`dlc-feature ${activeDlc}`}>
        <div className="dlc-number">{activeDlc === 'hearts' ? 'D1' : 'D2'}</div>
        <div className="dlc-feature-copy"><span className="section-marker">{activeChapter.region}</span><h2>{activeChapter.title}</h2><p className="dlc-subtitle">{activeChapter.subtitle}</p><p>{activeChapter.summary}</p><div className="dlc-question"><span>THE HARD QUESTION</span><strong>{activeChapter.question}</strong></div></div>
        <div className="dlc-stamp"><span>{activeDlc === 'hearts' ? 'CONTRACT' : 'FAIRYTALE'}</span><span>{activeDlc === 'hearts' ? 'RESPONSIBILITY' : 'RECONCILIATION'}</span></div>
      </section>
      <section className="dlc-compare"><div className="section-heading-row"><div><span className="section-marker">THE COMPARISON</span><h2>放在一起，才看见它们在回答同一个问题</h2></div><span className="muted-count">BASE GAME → DLC</span></div>{dlcThemes.map((theme) => <div className="compare-row" key={theme.label}><div className="compare-label"><span>{theme.label}</span><CircleDot size={13} /></div><p>{theme.base}</p><p>{theme.dlc}</p></div>)}</section>
      <section className="dlc-endnote"><span className="section-marker">AFTER THE END</span><p>《血与酒》给杰洛特一个像结局的地方，但它没有让他变成一个没有伤口的人。它只是让他终于可以在伤口还在的时候，选择留下。</p></section>
    </div>
  )
}

function MethodView() {
  const [showTemplate, setShowTemplate] = useState(false)
  return (
    <div className="view method-view">
      <ViewHeader marker="E / THE LENS" title="一套可复用的游戏分析法" description="把《巫师 3》的读法抽象出来：先找核心问题，再追踪人物、选择、延迟后果，最后回到主题。下一次可以直接套在《赛博朋克 2077》上。" count="07 MOVES · 01 TEMPLATE" />
      <section className="method-intro"><div className="method-quote">“不要压缩。按一个优秀支线一个优秀短篇的密度来讲；遇到两难就停下来彻底拆开。”</div><div><span className="section-marker">THE WORKING RULE</span><p>好的剧情分析不是把所有剧情都讲完，而是让读者明白：哪一个细节改变了人物，哪一个选择改变了关系，哪一种代价最终无法被抹掉。</p></div></section>
      <section className="method-steps"><div className="section-heading-row"><div><span className="section-marker">THE SEVEN MOVES</span><h2>从复述，走到判断</h2></div><button className="inline-link" onClick={() => setShowTemplate((value) => !value)}>{showTemplate ? '收起模板' : '打开分析模板'} <ArrowUpRight size={15} /></button></div>{analysisSteps.map((step) => <article className="method-step" key={step.number}><span className="method-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div><Check size={16} /></article>)}</section>
      <section className="method-questions"><div><span className="section-marker">THE QUESTIONS</span><h2>分析下一款游戏时，先问这些</h2></div><div className="question-list">{methodQuestions.map((question, index) => <div key={question}><span>0{index + 1}</span><p>{question}</p></div>)}</div></section>
      {showTemplate && <section className="template-sheet"><div className="template-head"><div><span className="section-marker">GAME ANALYSIS / TEMPLATE</span><h2>一款游戏的剧情档案</h2></div><Sparkles size={19} /></div><div className="template-grid">{['核心问题', '世界规则', '主角的欲望', '关键关系', '被延迟的选择', '支线如何反照主线', '本体与 DLC 的主题变化', '最终价值排序'].map((field) => <div className="template-field" key={field}><span>{field}</span><div /></div>)}</div><div className="template-footer"><span>FACT / INFERENCE / COST / THEME</span><span>READY FOR NEXT GAME</span></div></section>}
    </div>
  )
}

export default App
