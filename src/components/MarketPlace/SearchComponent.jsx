import React, { useState } from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';

const locations = ['Indore', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai']

const searchResults = [
  { name: 'Manchurian - Delivery', type: 'Dish', image: '/placeholder.svg?height=50&width=50' },
  { name: 'Chicken - Delivery', type: 'Dish', image: '/placeholder.svg?height=50&width=50' },
]

export default function SearchComponent() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex flex-col md:flex-row rounded-lg shadow-sm">
        <div className="relative w-full md:w-auto mb-2 md:mb-0">
          <button
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="flex items-center justify-between w-full md:w-auto gap-2 px-4 py-3 text-left bg-white rounded-lg md:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{selectedLocation}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {isLocationDropdownOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setSelectedLocation(location)
                    setIsLocationDropdownOpen(false)
                  }}
                  className="block w-full px-4 py-3 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setIsSearchDropdownOpen(e.target.value.length > 0)
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          {isSearchDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {searchResults.map((result) => (
                <div key={result.name} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                  <img src={result.image} alt={result.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-gray-500">{result.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}