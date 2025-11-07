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

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Plano Básico',
    badge: 'Gratuito',
    description:
      'Ideal para conhecer a plataforma e explorar as primeiras aventuras com acesso limitado, mas sem deixar de aprender.',
    features: [
      'Acesso a módulos introdutórios de Nutrição, Saúde Mental e Educação Financeira',
      'Missões e desafios iniciais com recompensas básicas',
      'Relatórios de progresso simples',
      'Suporte por e-mail',
      'Presença de anúncios para manter o plano gratuito',
    ],
  },
  {
    id: 'premium',
    name: 'Plano Premium',
    badge: 'Completo e sem anúncios',
    description:
      'A melhor experiência individual para aproveitar todo o conteúdo e recursos sem interrupções e com personalização.',
    features: [
      'Acesso total a todos os módulos e futuras atualizações',
      'Experiência totalmente livre de anúncios',
      'Personalização do avatar e do ambiente de jogo',
      'Relatórios detalhados de desempenho e evolução',
      'Missões especiais e eventos exclusivos',
      'Suporte prioritário e treinamentos rápidos sobre a plataforma',
    ],
  },
  {
    id: 'enterprise',
    name: 'Plano Empresarial',
    badge: 'Para escolas e instituições',
    description:
      'Solução desenhada para integrar a Nova Mente ao projeto pedagógico e acompanhar o progresso de turmas inteiras.',
    features: [
      'Painel de gestão acadêmica com relatórios por turma e aluno',
      'Ferramentas de monitoramento e avaliação alinhadas à escola',
      'Treinamento e suporte especializado para professores',
      'Conteúdos personalizados e planos de aula integrados',
      'Suporte técnico e pedagógico dedicado',
      'Descontos progressivos conforme o número de alunos licenciados',
    ],
  },
] as const

const educationalBenefits = [
  'Promove o aprendizado ativo e significativo, aumentando a participação e o interesse do aluno.',
  'Utiliza gamificação para transformar o ensino em uma experiência divertida e interativa.',
  'Ensina nutrição, saúde mental e educação financeira de forma prática e acessível.',
  'Desenvolve pensamento crítico, autonomia, responsabilidade e empatia.',
  'Gera relatórios automáticos de desempenho para professores e escolas.',
  'Oferece trilhas de aprendizagem personalizadas e alinhadas à BNCC.',
  'Envolve os pais no processo educacional com acompanhamento em tempo real.',
  'Disponibiliza orientações e atividades familiares que fortalecem vínculos.',
  'Garante acessibilidade e inclusão com interface intuitiva e recursos adaptativos.',
  'Valoriza a diversidade e o respeito às diferenças.',
  'Reduz a carga administrativa dos educadores, otimizando o acompanhamento escolar.',
  'Estimula hábitos saudáveis e conscientes desde a infância.',
  'Introduz tecnologias como realidade aumentada e IA para ampliar a experiência.',
  'Mantém atualizações constantes para garantir conteúdo moderno e relevante.',
  'Conecta-se às principais tendências globais de educação digital e metodologias ativas.',
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
            <section className="plans">
              <div className="plans__header">
                <p className="eyebrow">Planos</p>
                <h2>Três formatos para destravar o aprendizado</h2>
                <p>Selecionamos opções gratuitas, completas e corporativas para apoiar estudantes, famílias e escolas.</p>
              </div>
              <div className="plans__grid">
                {subscriptionPlans.map((plan) => (
                  <article key={plan.id} className={`plan-card plan-card--${plan.id}`}>
                    <div className="plan-card__head">
                      <span className="plan-card__badge">{plan.badge}</span>
                      <h3>{plan.name}</h3>
                      <p className="plan-card__description">{plan.description}</p>
                    </div>
                    <ul className="plan-card__list">
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
            <RegistrationSection />
          </>
        )
      case 'beneficios':
        return renderInfoPanel({
          title: 'Benefícios educacionais',
          description: 'Benefícios educacionais da plataforma Nova Mente e do ecossistema gamificado.',
          items: educationalBenefits,
        })
      case 'sobre':
        return renderInfoPanel({
          title: 'Sobre nós',
          description:
            'A Nova Mente nasceu com o propósito de revolucionar o aprendizado por meio da tecnologia e da criatividade. Somos uma startup brasileira comprometida com inclusão digital e educação de qualidade, unindo educadores, desenvolvedores e designers para tornar o aprendizado acessível, divertido e eficiente.',
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
