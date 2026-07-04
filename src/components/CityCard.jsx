import { useForecast } from '../hooks/useForecast.js'
import WeatherIcon from './WeatherIcon.jsx'
import TempBar from './TempBar.jsx'
import HourlyStrip from './HourlyStrip.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import { describeWeatherCode } from '../api/weatherCodes.js'


export default function CityCard({ city, onRemove }) {
  const { data, status, error, reload } = useForecast(city)

  return (
    <div className="rounded-xl border border-hairline bg-station shadow-card p-5 flex flex-col gap-4 min-h-[19rem]">
      <header className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-semibold text-ink leading-tight">{city.name}</h3>
          <p className="text-xs text-inkmuted font-mono">
            {[city.admin1, city.country].filter(Boolean).join(', ')}
          </p>
        </div>
        <button
          onClick={() => onRemove(city.id)}
          aria-label={`Retirer ${city.name} du tableau de bord`}
          className="text-inkmuted hover:text-coral transition-colors p-1 -mr-1 -mt-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {status === 'loading' && (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner label="Relevé en cours…" />
        </div>
      )}

      {status === 'error' && (
        <div className="flex-1 flex items-center">
          <ErrorMessage message={error} onRetry={reload} />
        </div>
      )}

      {status === 'success' && data && (
        <CityCardBody data={data} />
      )}
    </div>
  )
}

function CityCardBody({ data }) {
  const { label } = describeWeatherCode(data.current.weatherCode)
  const today = data.daily[0]

  return (
    <>
      <div className="flex items-center gap-3">
        <WeatherIcon code={data.current.weatherCode} className="w-11 h-11 text-steel shrink-0" />
        <div>
          <p className="text-3xl font-mono font-medium text-ink leading-none">
            {Math.round(data.current.temperature)}°
          </p>
          <p className="text-xs text-inkmuted mt-1">{label}</p>
        </div>
        <div className="ml-auto text-right text-xs font-mono text-inkmuted space-y-0.5">
          <p>Ressenti {Math.round(data.current.feelsLike)}°</p>
          <p>Humidité {data.current.humidity}%</p>
          <p>Vent {Math.round(data.current.windSpeed)} km/h</p>
        </div>
      </div>

      {today && (
        <TempBar min={today.min} max={today.max} current={data.current.temperature} />
      )}

      <div className="pt-3 border-t border-hairline">
        <HourlyStrip hours={data.hourly} timezone={data.timezone} />
      </div>
    </>
  )
}
