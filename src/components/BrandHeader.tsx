import novaMenteLogo from '../Imgs/NovaMente.png'
import academiaLogo from '../Imgs/Academia.png'

type BrandHeaderProps = {
  layout?: 'stacked' | 'inline'
}

const BrandHeader = ({ layout = 'inline' }: BrandHeaderProps) => {
  return (
    <div className={`brand-header ${layout === 'stacked' ? 'is-stacked' : ''}`}>
      <div className="brand-header__logos">
        <img src={academiaLogo} alt="Logo Academia dos Heróis" className="brand-header__logo brand-header__logo--product" />
        <img src={novaMenteLogo} alt="Logo Nova Mente" className="brand-header__logo brand-header__logo--brand" />
      </div>
      <div className="brand-header__text">
        <p className="brand-header__eyebrow">Powered by Nova Mente</p>
        <strong>Academia dos Heróis</strong>
      </div>
    </div>
  )
}

export default BrandHeader
