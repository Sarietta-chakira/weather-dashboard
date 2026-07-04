import { useCallback, useEffect, useState } from 'react'
import { fetchForecast } from '../api/weather.js'

export function useForecast(city) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const forecast = await fetchForecast(city)
      setData(forecast)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Une erreur inattendue est survenue.')
      setStatus('error')
    }
  }, [city.latitude, city.longitude])

  useEffect(() => {
    load()
  }, [load])

  return { data, status, error, reload: load }
}
