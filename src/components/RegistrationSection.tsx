import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

type HeroAvatar = {
  id: string
  name: string
  tagline: string
  color: string
  glow: string
  emoji: string
}

const heroAvatars: HeroAvatar[] = [
  {
    id: 'solaris',
    name: 'Solaris',
    tagline: 'Energia & Nutrição',
    color: '#ffb70333',
    glow: '0 12px 30px rgba(255, 183, 3, 0.35)',
    emoji: '☀️',
  },
  {
    id: 'aqua',
    name: 'Aqua Shield',
    tagline: 'Equilíbrio Mental',
    color: '#8ecae633',
    glow: '0 12px 30px rgba(142, 202, 230, 0.4)',
    emoji: '🌊',
  },
  {
    id: 'orion',
    name: 'Orion Flux',
    tagline: 'Inteligência Financeira',
    color: '#ffd6ff33',
    glow: '0 12px 30px rgba(247, 150, 255, 0.35)',
    emoji: '🛰️',
  },
]

const focusOptions = [
  { value: 'nutricao', label: 'Nutrição e performance' },
  { value: 'financas', label: 'Controle financeiro' },
  { value: 'saude-mental', label: 'Saúde mental e foco' },
]

type FormState = {
  name: string
  email: string
  focus: string
  mission: string
}

const RegistrationSection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(heroAvatars[0].id)
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    focus: focusOptions[0].value,
    mission: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('success')
  }

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    setStatus('idle')
  }

  return (
    <section className="registration" id="matricula">
      <div className="section-head">
        <div>
          <p className="eyebrow">Cadastro rápido</p>
          <h2>Escolha seu avatar e comece a jornada</h2>
          <p>Selecione um mentor heróico, diga seu foco principal e receba o plano personalizado.</p>
        </div>
        <span className="section-pill">2 minutos</span>
      </div>

      <div className="registration__grid">
        <form className="registration__form" onSubmit={handleSubmit}>
          <label>
            Nome completo
            <input
              type="text"
              name="name"
              placeholder="Capitã Clara"
              value={formState.name}
              onChange={handleFieldChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="voce@email.com"
              value={formState.email}
              onChange={handleFieldChange}
              required
            />
          </label>
          <label>
            Foco principal
            <select name="focus" value={formState.focus} onChange={handleFieldChange}>
              {focusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Missão do momento
            <textarea
              name="mission"
              placeholder="Ex: Ganhar 4kg de massa magra e parar de atrasar boletos"
              rows={3}
              value={formState.mission}
              onChange={handleFieldChange}
            />
          </label>
          <button className="btn primary" type="submit">
            Garantir minha matrícula
          </button>
          {status === 'success' && <p className="form-success">Cadastro enviado! Um mentor vai te chamar.</p>}
        </form>

        <div className="avatar-picker">
          <p className="eyebrow">Avatares mentores</p>
          <h3>Selecione seu guia heroico</h3>

          <div className="avatar-picker__grid">
            {heroAvatars.map((avatar) => {
              const isActive = avatar.id === selectedAvatar
              return (
                <button
                  key={avatar.id}
                  type="button"
                  className={`avatar-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  style={{
                    backgroundColor: avatar.color,
                    boxShadow: isActive ? avatar.glow : 'none',
                  }}
                >
                  <span className="avatar-card__emoji" aria-hidden="true">
                    {avatar.emoji}
                  </span>
                  <div>
                    <p>{avatar.name}</p>
                    <small>{avatar.tagline}</small>
                  </div>
                </button>
              )
            })}
          </div>

          <ul className="avatar-perks">
            <li>Protocolos prontos para {focusOptions.length} pilares.</li>
            <li>Mentorias semanais gravadas.</li>
            <li>Dashboard com porcentagem de avanço por módulo.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default RegistrationSection
