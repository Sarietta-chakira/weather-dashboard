
export default function LoadingSpinner({ label = 'Chargement des données…', size = 'md' }) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'
  return (
    <div className="flex items-center gap-2.5 text-inkmuted" role="status">
      <svg className={`${dim} animate-spin`} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-sm font-mono">{label}</span>
    </div>
  )
}
