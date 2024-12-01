import { WiThermometer, WiHumidity, WiCloudyWindy, WiStrongWind, WiBarometer } from 'react-icons/wi'
import { Star } from 'lucide-react'

export default function WeatherDashboard({ weatherData, units, isFavorite, toggleFavorite }) {
  const { main, weather, wind, name } = weatherData

  const tempUnit = units === 'metric' ? '°C' : '°F'
  const windSpeedUnit = units === 'metric' ? 'm/s' : 'mph'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <button
          onClick={toggleFavorite}
          className={`text-2xl ${isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600 transition-colors duration-200`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={24} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard
          title="Temperature"
          value={`${main.temp.toFixed(1)}${tempUnit}`}
          icon={<WiThermometer className="text-6xl text-red-500" />}
        />
        <WeatherCard
          title="Humidity"
          value={`${main.humidity}%`}
          icon={<WiHumidity className="text-6xl text-blue-500" />}
        />
        <WeatherCard
          title="Weather"
          value={weather[0].description}
          icon={<WiCloudyWindy className="text-6xl text-gray-500" />}
        />
        <WeatherCard
          title="Wind Speed"
          value={`${wind.speed} ${windSpeedUnit}`}
          icon={<WiStrongWind className="text-6xl text-green-500" />}
        />
        <WeatherCard
          title="Pressure"
          value={`${main.pressure} hPa`}
          icon={<WiBarometer className="text-6xl text-purple-500" />}
        />
      </div>
    </div>
  )
}

function WeatherCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

