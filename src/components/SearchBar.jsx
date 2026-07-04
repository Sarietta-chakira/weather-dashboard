import { useEffect, useRef, useState } from 'react'
import { searchCities } from '../api/weather.js'
import LoadingSpinner from './LoadingSpinner.jsx'


export default function SearchBar({ onSelect, excludeIds = [] }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setStatus('idle')
      return
    }
    const timer = setTimeout(async () => {
      setStatus('loading')
      setError(null)
      try {
        const cities = await searchCities(query)
        setResults(cities)
        setStatus('success')
      } catch (err) {
        setError(err.message || 'Recherche impossible.')
        setStatus('error')
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const visibleResults = results.filter((r) => !excludeIds.includes(r.id))

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-inkmuted"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Ajouter une ville — ex. Lyon, Dakar, Osaka…"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-hairline bg-station text-sm text-ink placeholder:text-inkmuted/70 focus:outline-none focus:ring-2 focus:ring-steel/40 focus:border-steel transition-shadow"
          aria-label="Rechercher une ville"
        />
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute z-10 mt-1.5 w-full rounded-lg border border-hairline bg-station shadow-card overflow-hidden">
          {status === 'loading' && (
            <div className="p-3.5">
              <LoadingSpinner label="Recherche en cours…" size="sm" />
            </div>
          )}

          {status === 'error' && (
            <p className="p-3.5 text-sm text-coral">{error}</p>
          )}

          {status === 'success' && visibleResults.length === 0 && (
            <p className="p-3.5 text-sm text-inkmuted">Aucune ville trouvée pour « {query} ».</p>
          )}

          {status === 'success' &&
            visibleResults.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  onSelect(city)
                  setQuery('')
                  setResults([])
                  setOpen(false)
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-overcast transition-colors flex items-baseline justify-between gap-3 border-b border-hairline last:border-0"
              >
                <span className="text-sm text-ink font-medium">{city.name}</span>
                <span className="text-xs text-inkmuted font-mono truncate">
                  {[city.admin1, city.country].filter(Boolean).join(', ')}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
