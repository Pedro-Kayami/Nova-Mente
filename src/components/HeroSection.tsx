type HeroStats = {
  modules: number
  stagesPerModule: number
  focusAreas: string[]
}

type HeroSectionProps = {
  stats: HeroStats
  studentName?: string
}

const HeroSection = ({ stats, studentName }: HeroSectionProps) => {
  const { modules, stagesPerModule, focusAreas } = stats
  const formattedName = studentName
    ? studentName.charAt(0).toUpperCase() + studentName.slice(1).toLowerCase()
    : 'Herói'

  return (
    <header className="hero">
      <div className="hero__content">
        <p className="eyebrow">Painel do aluno • Academia dos Heróis</p>
        <h1>
          Bem-vindo, {formattedName}
          <span>este é o seu portal para evoluir Nutrição, Finanças e Saúde Mental.</span>
        </h1>
        <p className="subtitle">
          Metodologia gamificada com {modules} módulos, {stagesPerModule} etapas cada, para você ganhar
          energia, clareza financeira e equilíbrio emocional sem perder ritmo.
        </p>
        <div className="hero__actions">
          <a className="btn primary" href="#matricula">
            Começar agora
          </a>
          <a className="btn ghost" href="#trilhas">
            Ver trilhas
          </a>
        </div>
        <ul className="hero__tags">
          {focusAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>
      <div className="hero__badge">
        <p>Acesso liberado</p>
        <strong>
          {modules} x {stagesPerModule}
        </strong>
        <p>Etapas guiadas</p>
      </div>
    </header>
  )
}

export default HeroSection
