'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Star, ToggleLeft, ToggleRight } from 'lucide-react'

export default function Sidebar({ onSearch, recentSearches, favorites, toggleFavorite, units, toggleUnits }) {
  const [location, setLocation] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const suggestionsRef = useRef(null)

  const fetchSuggestions = async (input) => {
    if (input.length === 0) {
      setSuggestions([])
      return
    }

    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      const uniqueCities = Array.from(new Set(data.map(item => item.name)))
        .sort((a, b) => a.localeCompare(b))
      setSuggestions(uniqueCities)
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
      setSuggestions([])
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setLocation(value)
    fetchSuggestions(value)
  }

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion)
    setSuggestions([])
    onSearch(suggestion)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location)
      setLocation('')
      setSuggestions([])
    }
  }

  return (
    <div className="w-64 bg-white shadow-md p-6 overflow-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Weather Search</h2>
      <form onSubmit={handleSubmit} className="mb-6 relative">
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search for a location"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul 
            ref={suggestionsRef}
            className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Recent Searches</h3>
        <ul className="space-y-2">
          {recentSearches.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onSearch(item)}
                className="w-full text-left text-gray-600 hover:text-blue-500 transition-colors duration-200"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Favorites</h3>
        <ul className="space-y-2">
          {favorites.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <button
                onClick={() => onSearch(item)}
                className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
              >
                {item}
              </button>
              <button
                onClick={() => toggleFavorite(item)}
                className="text-yellow-500 hover:text-yellow-600"
                aria-label={`Remove ${item} from favorites`}
              >
                <Star size={16} fill="currentColor" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">Temperature Units</span>
        <button
          onClick={toggleUnits}
          className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-200"
          aria-label={`Switch to ${units === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
        >
          {units === 'metric' ? (
            <>
              <span className="mr-2">°C</span>
              <ToggleLeft size={24} />
            </>
          ) : (
            <>
              <span className="mr-2">°F</span>
              <ToggleRight size={24} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

