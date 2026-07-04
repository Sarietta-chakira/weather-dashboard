import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'meteo-stations:cities'

const DEFAULT_CITIES = [
  { id: 2968815, name: 'Paris', country: 'France', admin1: 'Île-de-France', latitude: 48.8534, longitude: 2.3488 },
  { id: 2260536, name: 'Yaoundé', country: 'Cameroun', admin1: 'Centre', latitude: 3.848, longitude: 11.5021 },
  { id: 6167865, name: 'Toronto', country: 'Canada', admin1: 'Ontario', latitude: 43.7001, longitude: -79.4163 },
]

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_CITIES
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CITIES
  } catch {
    return DEFAULT_CITIES
  }
}


export function useTrackedCities() {
  const [cities, setCities] = useState(readStorage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cities))
    } catch {

    }
  }, [cities])

  const addCity = useCallback((city) => {
    setCities((prev) => {
      if (prev.some((c) => c.id === city.id)) return prev
      return [...prev, city]
    })
  }, [])

  const removeCity = useCallback((id) => {
    setCities((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return { cities, addCity, removeCity }
}
