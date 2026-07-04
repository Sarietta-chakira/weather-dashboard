

const TABLE = {
  0: { label: 'Ciel dégagé', icon: 'sun' },
  1: { label: 'Peu nuageux', icon: 'sun-cloud' },
  2: { label: 'Partiellement nuageux', icon: 'sun-cloud' },
  3: { label: 'Couvert', icon: 'cloud' },
  45: { label: 'Brouillard', icon: 'fog' },
  48: { label: 'Brouillard givrant', icon: 'fog' },
  51: { label: 'Bruine légère', icon: 'drizzle' },
  53: { label: 'Bruine', icon: 'drizzle' },
  55: { label: 'Bruine dense', icon: 'drizzle' },
  56: { label: 'Bruine verglaçante', icon: 'drizzle' },
  57: { label: 'Bruine verglaçante dense', icon: 'drizzle' },
  61: { label: 'Pluie légère', icon: 'rain' },
  63: { label: 'Pluie', icon: 'rain' },
  65: { label: 'Pluie forte', icon: 'rain' },
  66: { label: 'Pluie verglaçante', icon: 'rain' },
  67: { label: 'Pluie verglaçante forte', icon: 'rain' },
  71: { label: 'Neige légère', icon: 'snow' },
  73: { label: 'Neige', icon: 'snow' },
  75: { label: 'Neige forte', icon: 'snow' },
  77: { label: 'Grains de neige', icon: 'snow' },
  80: { label: 'Averses légères', icon: 'rain' },
  81: { label: 'Averses', icon: 'rain' },
  82: { label: 'Averses violentes', icon: 'rain' },
  85: { label: 'Averses de neige', icon: 'snow' },
  86: { label: 'Averses de neige fortes', icon: 'snow' },
  95: { label: 'Orage', icon: 'storm' },
  96: { label: 'Orage + grêle légère', icon: 'storm' },
  99: { label: 'Orage + grêle forte', icon: 'storm' },
}

export function describeWeatherCode(code) {
  return TABLE[code] || { label: 'Données indisponibles', icon: 'unknown' }
}
