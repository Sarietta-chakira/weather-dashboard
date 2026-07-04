

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

class WeatherApiError extends Error {
  constructor(message, cause) {
    super(message)
    this.name = 'WeatherApiError'
    this.cause = cause
  }
}


export async function searchCities(query) {
  if (!query || query.trim().length < 2) return []

  let res
  try {
    res = await fetch(
      `${GEOCODING_URL}?name=${encodeURIComponent(query.trim())}&count=6&language=fr&format=json`
    )
  } catch (err) {
    throw new WeatherApiError('Impossible de contacter le service de recherche de villes.', err)
  }

  if (!res.ok) {
    throw new WeatherApiError(`Le service de recherche a répondu avec une erreur (${res.status}).`)
  }

  const data = await res.json()
  return (data.results || []).map((r) => ({
    id: r.id,
    name: r.name,
    country: r.country,
    admin1: r.admin1,
    latitude: r.latitude,
    longitude: r.longitude,
  }))
}


export async function fetchForecast({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    forecast_days: '5',
    timezone: 'auto',
  })

  let res
  try {
    res = await fetch(`${FORECAST_URL}?${params.toString()}`)
  } catch (err) {
    throw new WeatherApiError('Connexion au service météo impossible. Vérifiez votre réseau.', err)
  }

  if (!res.ok) {
    throw new WeatherApiError(`Le service météo a répondu avec une erreur (${res.status}).`)
  }

  const data = await res.json()
  return normalizeForecast(data)
}

function normalizeForecast(data) {
  const now = new Date(data.current.time)
  const hourlyIndexNow = data.hourly.time.findIndex((t) => new Date(t) >= now)
  const startIdx = hourlyIndexNow === -1 ? 0 : hourlyIndexNow

  return {
    timezone: data.timezone,
    current: {
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      time: data.current.time,
    },
    hourly: data.hourly.time.slice(startIdx, startIdx + 8).map((time, i) => ({
      time,
      temperature: data.hourly.temperature_2m[startIdx + i],
      weatherCode: data.hourly.weather_code[startIdx + i],
    })),
    daily: data.daily.time.map((time, i) => ({
      date: time,
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
      weatherCode: data.daily.weather_code[i],
    })),
  }
}

export { WeatherApiError }
