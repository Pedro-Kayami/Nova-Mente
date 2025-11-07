import { useMemo, useState, type ReactNode } from 'react'
import HeroSection from './components/HeroSection.tsx'
import ModulesSection, { type StudyModule } from './components/ModulesSection.tsx'
import RegistrationSection from './components/RegistrationSection.tsx'
import LoginSection from './components/LoginSection.tsx'
import NavigationTabs from './components/NavigationTabs.tsx'
import BrandHeader from './components/BrandHeader.tsx'
import { mockUsers, type PublicUser } from './data/mockUsers.ts'
import alimentacaoImg from './Imgs/Alimentacao.jpg'
import economiaImg from './Imgs/Economia.jpg'
import saudeMentalImg from './Imgs/SaudeMental.jpg'

const studyModules: StudyModule[] = [
  {
    id: 'nutrition',
    title: 'Módulo 1',
    topic: 'Nutrição Estratégica',
    description:
      'Planeje refeições inteligentes, entenda como combinar macros e mantenha energia para treinos e estudos.',
    icon: '🥗',
    steps: 8,
    image: alimentacaoImg,
    mediaBackground: '#16a34a',
    insight: 'Protocolos rápidos + checklists de abastecimento semanal.',
  },
  {
    id: 'finance',
    title: 'Módulo 2',
    topic: 'Educação Financeira',
    description:
      'Organize o orçamento, domine juros compostos e construa reservas que sustentam seus objetivos heroicos.',
    icon: '💰',
    steps: 8,
    image: economiaImg,
    mediaBackground: '#facc15',
    insight: 'Dashboards práticos para decisões em 5 minutos.',
  },
  {
    id: 'mental-health',
    title: 'Módulo 3',
    topic: 'Saúde Mental',
    description:
      'Crie rituais de foco, recupere energia emocional e fortaleça o autocuidado diário.',
    icon: '🧠',
    steps: 8,
    image: saudeMentalImg,
    mediaBackground: '#1d4ed8',
    insight: 'Ferramentas de respiração guiada e diário de vitórias.',
  },
]

const navigationTabs = [
  { key: 'inicio', label: 'Início' },
  { key: 'plataforma', label: 'Plataforma' },
  { key: 'guia', label: 'Guia de uso' },
  { key: 'escolas', label: 'Para escolas e pais' },
  { key: 'planos', label: 'Planos e assinaturas' },
  { key: 'beneficios', label: 'Benefícios educacionais' },
  { key: 'login', label: 'Login' },
  { key: 'sobre', label: 'Sobre nós' },
  { key: 'contato', label: 'Contato' },
] as const

type TabKey = (typeof navigationTabs)[number]['key']

type ViewMode = 'student' | 'full'

function App() {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('login')
  const [viewMode, setViewMode] = useState<ViewMode>('student')

  const stats = useMemo(
    () => ({
      modules: studyModules.length,
      stagesPerModule: studyModules[0]?.steps ?? 0,
      focusAreas: ['Nutrição', 'Finanças', 'Saúde mental'],
    }),
    [],
  )

  const handleLogin = (user: PublicUser) => {
    setCurrentUser(user)
    setActiveTab('inicio')
    setViewMode('student')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setActiveTab('login')
    setViewMode('student')
  }

  const handleTabSelect = (tab: TabKey) => {
    if (tab === 'login') {
      setActiveTab('login')
      if (currentUser) {
        setCurrentUser(null)
      }
      return
    }
    setActiveTab(tab)
  }

  const renderLockedPanel = (title: string) => (
    <section className="locked-panel">
      <h2>{title}</h2>
      <p>Entre com uma das contas demo para destravar seus módulos e acompanhar o progresso.</p>
      <button className="btn primary" type="button" onClick={() => setActiveTab('login')}>
        Ir para o Login
      </button>
    </section>
  )

  const renderInfoPanel = (props: { title: string; description: string; items?: string[] }) => (
    <section className="info-panel">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      {props.items && (
        <ul className="info-panel__list">
          {props.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  )

  const renderStudentArea = () => (
    <section className="student-area">
      <div className="student-area__summary">
        <h2>Área do aluno</h2>
        <p>
          {currentUser?.name ?? 'Herói'}, continue a jornada focando nos {stats.modules} módulos com {stats.stagesPerModule}{' '}
          etapas cada. Clique na seta para avançar e acompanhar o percentual.
        </p>
      </div>
      <ModulesSection modules={studyModules} />
    </section>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        if (!currentUser) {
          return renderLockedPanel('Área exclusiva dos alunos')
        }
        return (
          <section className="dashboard-panel">
            <ModulesSection modules={studyModules} />
          </section>
        )
      case 'plataforma':
        return (
          <>
            <HeroSection stats={stats} studentName={currentUser?.name ?? 'Visitante'} />
            <section className="info-panel">
              <h2>Como funciona a plataforma</h2>
              <p>
                Inspirada em plataformas como Udemy, você acompanha os {stats.modules} módulos em cards interativos, com
                porcentagem e setas para avançar as {stats.stagesPerModule} etapas.
              </p>
            </section>
          </>
        )
      case 'guia':
        return renderInfoPanel({
          title: 'Guia de uso',
          description:
            'Siga as etapas para aproveitar os estudos gamificados. Cada passo libera materiais e orientações práticas.',
          items: ['Login com uma conta ativa', 'Escolha o módulo prioritário', 'Avance etapa por etapa com a seta', 'Registre insights e dúvidas na área de mentorias'],
        })
      case 'escolas':
        return renderInfoPanel({
          title: 'Para escolas e pais',
          description:
            'Oferecemos relatórios semanais sobre engajamento, além de recursos para alinhar família e educadores.',
          items: ['Dashboard de turmas', 'Planos personalizados por faixa etária', 'Workshops presenciais e remotos'],
        })
      case 'planos':
        return (
          <>
            {renderInfoPanel({
              title: 'Planos e assinaturas',
              description:
                'Escolha entre planos individuais, familiares ou corporativos. Tudo feito direto pelo portal.',
              items: ['Plano Individual Hero', 'Plano Família Guardiã', 'Plano Escolas Visionárias'],
            })}
            <RegistrationSection />
          </>
        )
      case 'beneficios':
        return renderInfoPanel({
          title: 'Benefícios educacionais',
          description:
            'Integramos saúde mental, nutrição e educação financeira para formar heróis com visão 360º.',
          items: ['Gamificação com metas semanais', 'Acompanhamento multidisciplinar', 'Comunidade segura para alunos'],
        })
      case 'sobre':
        return renderInfoPanel({
          title: 'Sobre nós',
          description:
            'A Academia dos Heróis nasceu para unir ciência e ludicidade. Nosso time é formado por nutricionistas, psicólogos e educadores financeiros.',
        })
      case 'contato':
        return renderInfoPanel({
          title: 'Contato',
          description: 'Fale com a central de mentores para suporte ou parcerias.',
          items: ['Email: contato@academiadosherois.com', 'WhatsApp: (11) 99999-0000', 'Instagram: @academiaherois'],
        })
      case 'login':
      default:
        return <LoginSection users={mockUsers} onLogin={handleLogin} />
    }
  }

  const visibleTabs =
    activeTab === 'login' || viewMode === 'student'
      ? navigationTabs
      : navigationTabs.filter((tab) => tab.key !== 'login')

  const showNavigation = currentUser && viewMode === 'full' && activeTab !== 'login'

  let mainContent: ReactNode
  if (!currentUser) {
    mainContent = <LoginSection users={mockUsers} onLogin={handleLogin} />
  } else if (viewMode === 'student') {
    mainContent = renderStudentArea()
  } else {
    mainContent = renderTabContent()
  }

  return (
    <>
      <BrandHeader layout={activeTab === 'login' ? 'stacked' : 'inline'} />
      {currentUser && (
        <div className="user-menu">
          <div className="user-menu__info">
            <span className="user-menu__label">{currentUser.heroTitle}</span>
            <strong>{currentUser.name}</strong>
          </div>
          <button type="button" className="user-menu__logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
      {currentUser && (
        <div className="view-toggle">
          <button
            type="button"
            className={`view-toggle__button ${viewMode === 'student' ? 'is-active' : ''}`}
            onClick={() => {
              setViewMode('student')
              setActiveTab('inicio')
            }}
          >
            Área do aluno
          </button>
          <button
            type="button"
            className={`view-toggle__button ${viewMode === 'full' ? 'is-active' : ''}`}
            onClick={() => {
              setViewMode('full')
              if (activeTab === 'login') {
                setActiveTab('inicio')
              }
            }}
          >
            Área completa
          </button>
        </div>
      )}
      {showNavigation && (
        <NavigationTabs tabs={visibleTabs} activeTab={activeTab} onSelect={handleTabSelect} />
      )}
      <main className="content">{mainContent}</main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Academia dos Heróis. Treine corpo, mente e finanças.</p>
      </footer>
    </>
  )
}

export default App
