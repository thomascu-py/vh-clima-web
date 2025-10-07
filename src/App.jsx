import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFetch = async () => {
    if (!url.trim()) {
      setError('Por favor, ingrese una URL')
      return
    }

    setLoading(true)
    setError(null)
    setWeatherData(null)

    try {
      const response = await fetch(`https://${url}/api/v1/weather`)
      if (!response.ok) {
        throw new Error('Error al obtener los datos')
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Información del Clima</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Ingrese la URL de la API del clima"
          className="url-input"
        />
        <button onClick={handleFetch} disabled={loading} className="fetch-button">
          {loading ? 'Cargando...' : 'Obtener Datos'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <div className="weather-item">
            <span className="label">Temperatura:</span>
            <span className="value">{weatherData.temperature}°C</span>
          </div>
          <div className="weather-item">
            <span className="label">Clima:</span>
            <span className="value">{weatherData.weather}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
