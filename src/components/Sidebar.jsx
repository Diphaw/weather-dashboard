'use client'

import { useState } from 'react'
import { Search, Star, ToggleLeft, ToggleRight } from 'lucide-react'

export default function Sidebar({ onSearch, recentSearches, favorites, toggleFavorite, units, toggleUnits }) {
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location)
      setLocation('')
    }
  }

  return (
    <div className="w-64 bg-white shadow-md p-6 overflow-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Weather Search</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
          >
            <Search size={20} />
          </button>
        </div>
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

