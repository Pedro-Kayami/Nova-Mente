import { useMemo, useState } from 'react'

export type StudyModule = {
  id: string
  title: string
  topic: string
  description: string
  icon: string
  steps: number
  insight: string
  image: string
  mediaBackground: string
}

type ModulesSectionProps = {
  modules: StudyModule[]
}

const ModulesSection = ({ modules }: ModulesSectionProps) => {
  const modulesById = useMemo(
    () =>
      modules.reduce<Record<string, StudyModule>>((acc, module) => {
        acc[module.id] = module
        return acc
      }, {}),
    [modules],
  )

  const [progressMap, setProgressMap] = useState<Record<string, number>>(() =>
    modules.reduce<Record<string, number>>((acc, module) => {
      acc[module.id] = 1
      return acc
    }, {}),
  )

  const handleAdvance = (moduleId: string) => {
    setProgressMap((prev) => {
      const module = modulesById[moduleId]
      if (!module) {
        return prev
      }

      const current = prev[moduleId] ?? 1
      const next = current >= module.steps ? 1 : current + 1
      return { ...prev, [moduleId]: next }
    })
  }

  return (
    <section className="modules" id="trilhas">
      <div className="section-head">
        <div>
          <p className="eyebrow">Trilhas guiadas</p>
          <h2>3 módulos • 8 etapas cada</h2>
          <p>Use a seta para avançar de fase e acompanhar a porcentagem concluída em cada trilha.</p>
        </div>
        <span className="section-pill">Progresso em tempo real</span>
      </div>

      <div className="modules__grid">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            currentStep={progressMap[module.id] ?? 1}
            onAdvance={() => handleAdvance(module.id)}
          />
        ))}
      </div>
    </section>
  )
}

type ModuleCardProps = {
  module: StudyModule
  currentStep: number
  onAdvance: () => void
}

const ModuleCard = ({ module, currentStep, onAdvance }: ModuleCardProps) => {
  const percentage = Math.round((currentStep / module.steps) * 100)

  return (
    <article className="module-card">
      <div className="module-card__accent" style={{ backgroundColor: module.mediaBackground }}>
        <span>{module.icon}</span>
      </div>
      <div className="module-card__media" style={{ backgroundColor: module.mediaBackground }}>
        <img src={module.image} alt={`Visual do módulo ${module.topic}`} loading="lazy" />
      </div>
      <div className="module-card__body">
        <div className="module-card__title">
          <p>{module.title}</p>
          <h3>{module.topic}</h3>
        </div>
        <p className="module-card__description">{module.description}</p>
        <p className="module-card__insight">{module.insight}</p>

        <div className="module-card__progress">
          <div className="progress-header">
            <div>
              <strong>{percentage}%</strong>
              <span>
                Etapa {currentStep}/{module.steps}
              </span>
            </div>
            <button type="button" className="arrow-button" onClick={onAdvance} aria-label="Próxima etapa">
              →
            </button>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>

          <div className="progress-steps" style={{ gridTemplateColumns: `repeat(${module.steps}, 1fr)` }}>
            {Array.from({ length: module.steps }).map((_, index) => {
              const step = index + 1
              const status = step <= currentStep ? 'is-active' : ''
              return <span key={step} className={status} aria-hidden="true" />
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ModulesSection
