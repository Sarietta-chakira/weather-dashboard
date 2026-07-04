import WeatherIcon from './WeatherIcon.jsx'


export default function HourlyStrip({ hours, timezone }) {
  const formatHour = (iso) =>
    new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', timeZone: timezone }).format(new Date(iso))

  return (
    <div className="flex gap-4 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
      {hours.map((h) => (
        <div key={h.time} className="flex flex-col items-center gap-1.5 shrink-0 min-w-[3rem]">
          <span className="text-xs font-mono text-inkmuted">{formatHour(h.time)}</span>
          <WeatherIcon code={h.weatherCode} className="w-5 h-5 text-steel" />
          <span className="text-sm font-mono text-ink">{Math.round(h.temperature)}°</span>
        </div>
      ))}
    </div>
  )
}
