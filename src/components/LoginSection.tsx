import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { MockUser, PublicUser } from '../data/mockUsers.ts'

type LoginSectionProps = {
  users: MockUser[]
  onLogin: (payload: PublicUser) => void
}

const LoginSection = ({ users, onLogin }: LoginSectionProps) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    remember: true,
  })
  const [error, setError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formattedEmail = formState.email.trim().toLowerCase()
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === formattedEmail && user.password === formState.password,
    )

    if (!matchedUser) {
      setError('Credenciais inválidas. Use um dos heróis de demonstração.')
      return
    }

    const { password, ...publicUser } = matchedUser
    onLogin(publicUser)
  }

  return (
    <section className="login">
      <div className="login__hero">
        <p className="eyebrow">Portal Academia dos Heróis</p>
        <h1>
          Entre e acesse as trilhas
          <span> como em uma plataforma de cursos.</span>
        </h1>
        <p className="subtitle">
          Faça login para ver seus módulos de Nutrição, Educação Financeira e Saúde Mental, seguindo o mesmo fluxo de
          plataformas como Udemy — com progresso salvo e etapas guiadas.
        </p>
        <ul className="login__bullets">
          <li>3 módulos principais com 8 etapas cada</li>
          <li>Progresso atualizado a cada clique</li>
          <li>Mentoria e cadastro liberados após o acesso</li>
        </ul>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <h2>Login do herói</h2>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="voce@herois.com"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </label>
        <label className="checkbox">
          <input type="checkbox" name="remember" checked={formState.remember} onChange={handleChange} />
          <span>Lembrar meu acesso</span>
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="btn primary" type="submit">
          Entrar na plataforma
        </button>
        <p className="login__hint">
          Teste com: clara@herois.com (sol123) • davi@herois.com (orion123) • lia@herois.com (aqua123)
        </p>
      </form>
    </section>
  )
}

export default LoginSection
