type NavigationTabsProps<T extends string> = {
  tabs: ReadonlyArray<{ key: T; label: string }>
  activeTab: T
  onSelect: (tab: T) => void
}

const NavigationTabs = <T extends string>({ tabs, activeTab, onSelect }: NavigationTabsProps<T>) => {
  return (
    <nav className="navigation-tabs" aria-label="Seções principais">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab
        return (
          <button
            key={tab.key}
            type="button"
            className={`navigation-tab ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelect(tab.key)}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}

export default NavigationTabs
