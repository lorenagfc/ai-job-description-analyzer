
type HeaderProps = {
  title: string
  subtitle: string
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-label">
        <span className="header-icon">✦</span>
        <span>AI CAREER TOOL</span>
      </div>

      <h1>{title}</h1>

      <p>{subtitle}</p>
    </header>
  )
}

export default Header