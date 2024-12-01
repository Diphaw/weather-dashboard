'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import WeatherDashboard from '../components/WeatherDashboard'

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [recentSearches, setRecentSearches] = useState([])
  const [favorites, setFavorites] = useState([])
  const [units, setUnits] = useState('metric')

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setRecentSearches(savedSearches)
    setFavorites(savedFavorites)
  }, [])

  const fetchWeatherData = async (location) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`

    console.log('Fetching URL:', url)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Weather data not found')
      }
      const data = await response.json()
      setWeatherData(data)
      updateRecentSearches(location)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      alert('Failed to fetch weather data. Please try again.')
    }
  }

  const updateRecentSearches = (location) => {
    const updatedSearches = [location, ...recentSearches.filter(item => item !== location)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  const toggleFavorite = (location) => {
    const updatedFavorites = favorites.includes(location)
      ? favorites.filter(item => item !== location)
      : [...favorites, location]
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const toggleUnits = () => {
    setUnits(prevUnits => prevUnits === 'metric' ? 'imperial' : 'metric')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        onSearch={fetchWeatherData}
        recentSearches={recentSearches}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        units={units}
        toggleUnits={toggleUnits}
      />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Weather Dashboard</h1>
        {weatherData ? (
          <WeatherDashboard 
            weatherData={weatherData} 
            units={units}
            isFavorite={favorites.includes(weatherData.name)}
            toggleFavorite={() => toggleFavorite(weatherData.name)}
          />
        ) : (
          <p className="text-gray-500">Enter a location to see weather information</p>
        )}
      </main>
    </div>
  )
}

