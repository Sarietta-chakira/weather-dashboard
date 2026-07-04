
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="rounded-lg border border-coral/30 bg-coral/5 p-4">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 shrink-0 text-coral mt-0.5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="16.2" r="0.9" fill="currentColor" />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-ink font-medium">Panne de mesure</p>
          <p className="text-sm text-inkmuted mt-0.5">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2.5 text-sm font-medium text-steel hover:text-steeldark transition-colors underline underline-offset-2"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
