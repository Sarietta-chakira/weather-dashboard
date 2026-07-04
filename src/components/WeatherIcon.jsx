import { describeWeatherCode } from '../api/weatherCodes.js'

const PATHS = {
  sun: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="4.2"
          x2="12"
          y2="1.8"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </g>
  ),
  'sun-cloud': (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="9" cy="9" r="3.4" fill="currentColor" stroke="none" />
      <path
        d="M6 17.5h11a3.3 3.3 0 0 0 .5-6.55A4.6 4.6 0 0 0 9 12.2"
        fill="none"
      />
    </g>
  ),
  cloud: (
    <path
      d="M6 17.5h11a3.3 3.3 0 0 0 .5-6.55A5 5 0 0 0 8 10.3 4 4 0 0 0 6 17.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  ),
  fog: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 10.5h11a3.3 3.3 0 0 0 .3-6.58A5 5 0 0 0 8 5.3" fill="none" />
      <line x1="4" y1="14.5" x2="20" y2="14.5" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </g>
  ),
  drizzle: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 12.5h11a3.3 3.3 0 0 0 .3-6.58A5 5 0 0 0 8 7.3" fill="none" />
      <line x1="9" y1="16" x2="8" y2="19" />
      <line x1="14" y1="16" x2="13" y2="19" />
    </g>
  ),
  rain: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 11.5h11a3.3 3.3 0 0 0 .3-6.58A5 5 0 0 0 8 6.3" fill="none" />
      <line x1="8" y1="15" x2="7" y2="19.5" />
      <line x1="12.5" y1="15" x2="11.5" y2="19.5" />
      <line x1="17" y1="15" x2="16" y2="19.5" />
    </g>
  ),
  snow: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 11.5h11a3.3 3.3 0 0 0 .3-6.58A5 5 0 0 0 8 6.3" fill="none" />
      <g strokeWidth="1.3">
        <line x1="8" y1="15.5" x2="8" y2="19.5" />
        <line x1="6.3" y1="17.5" x2="9.7" y2="17.5" />
        <line x1="13" y1="15.5" x2="13" y2="19.5" />
        <line x1="11.3" y1="17.5" x2="14.7" y2="17.5" />
      </g>
    </g>
  ),
  storm: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 11h11a3.3 3.3 0 0 0 .3-6.58A5 5 0 0 0 8 5.8" fill="none" />
      <path d="M13 14.5 10.5 18.5h3L11.5 22" fill="none" />
    </g>
  ),
  unknown: (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="8" fill="none" />
      <line x1="12" y1="16" x2="12" y2="16.2" />
      <path d="M12 13v-.6c0-.9.6-1.3 1.2-1.8.6-.5 1-.9 1-1.7A2.2 2.2 0 0 0 12 6.9a2.2 2.2 0 0 0-2.2 2" fill="none" />
    </g>
  ),
}

export default function WeatherIcon({ code, className = 'w-8 h-8', title }) {
  const { icon, label } = describeWeatherCode(code)
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={title || label}
    >
      {PATHS[icon] || PATHS.unknown}
    </svg>
  )
}
