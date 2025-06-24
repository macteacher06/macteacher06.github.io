import React, { useState } from 'react';
import { MapPin, Users, Plane, Heart, Music, Mountain, Coffee, ShoppingBag, Waves, Camera, Plus, Search, Calendar, DollarSign, Globe, Home } from 'lucide-react';

interface Location {
  id: string;
  city: string;
  country: string;
  name: string;
}

interface TravelFocus {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
  rating: number;
  focus: string[];
  description: string;
  type: 'domestic' | 'international';
}

const travelFocuses: TravelFocus[] = [
  {
    id: 'wellness',
    name: 'Health & Wellness',
    icon: <Heart className="w-6 h-6" />,
    description: 'Spas, yoga retreats, healthy cuisine',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 'nightlife',
    name: 'Nightlife',
    icon: <Music className="w-6 h-6" />,
    description: 'Clubs, bars, entertainment districts',
    color: 'from-purple-400 to-pink-600'
  },
  {
    id: 'adventure',
    name: 'Outdoor Adventure',
    icon: <Mountain className="w-6 h-6" />,
    description: 'Hiking, sports, nature activities',
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'relax',
    name: 'Kick Back & Relax',
    icon: <Coffee className="w-6 h-6" />,
    description: 'Beaches, resorts, peaceful getaways',
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: <ShoppingBag className="w-6 h-6" />,
    description: 'Markets, malls, unique boutiques',
    color: 'from-yellow-400 to-orange-600'
  },
  {
    id: 'beach',
    name: 'Beach & Water',
    icon: <Waves className="w-6 h-6" />,
    description: 'Coastal destinations, water sports',
    color: 'from-teal-400 to-blue-600'
  },
  {
    id: 'culture',
    name: 'Culture & History',
    icon: <Camera className="w-6 h-6" />,
    description: 'Museums, historic sites, local culture',
    color: 'from-indigo-400 to-purple-600'
  }
];

const sampleDestinations: Destination[] = [
  // International Destinations
  {
    id: '1',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 450,
    rating: 4.8,
    focus: ['nightlife', 'culture', 'beach'],
    description: 'Vibrant city with amazing architecture and beaches',
    type: 'international'
  },
  {
    id: '2',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/2070016/pexels-photo-2070016.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 380,
    rating: 4.9,
    focus: ['wellness', 'relax', 'adventure'],
    description: 'Tropical paradise perfect for wellness and relaxation',
    type: 'international'
  },
  {
    id: '3',
    name: 'Prague',
    country: 'Czech Republic',
    image: 'https://images.pexels.com/photos/161901/prague-czech-republic-city-urban-161901.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 320,
    rating: 4.7,
    focus: ['culture', 'nightlife', 'shopping'],
    description: 'Historic charm with vibrant nightlife and great shopping',
    type: 'international'
  },
  {
    id: '4',
    name: 'Costa Rica',
    country: 'Central America',
    image: 'https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 410,
    rating: 4.6,
    focus: ['adventure', 'wellness', 'beach'],
    description: 'Adventure paradise with pristine beaches',
    type: 'international'
  },
  // Domestic US Destinations
  {
    id: '5',
    name: 'Austin',
    country: 'Texas, USA',
    image: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 180,
    rating: 4.6,
    focus: ['nightlife', 'culture', 'shopping'],
    description: 'Live music capital with incredible food scene',
    type: 'domestic'
  },
  {
    id: '6',
    name: 'Sedona',
    country: 'Arizona, USA',
    image: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&w=800',
    price: 220,
    rating: 4.8,
    focus: ['wellness', 'adventure', 'relax'],
    description: 'Red rock formations and spiritual wellness retreats',
    type: 'domestic'
  },
  {
    id: '7',
    name: 'Charleston',
    country: 'South Carolina, USA',
    image: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 160,
    rating: 4.7,
    focus: ['culture', 'relax', 'shopping'],
    description: 'Historic charm with Southern hospitality and cuisine',
    type: 'domestic'
  },
  {
    id: '8',
    name: 'Denver',
    country: 'Colorado, USA',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 190,
    rating: 4.5,
    focus: ['adventure', 'nightlife', 'culture'],
    description: 'Gateway to the Rockies with craft beer scene',
    type: 'domestic'
  },
  {
    id: '9',
    name: 'Miami',
    country: 'Florida, USA',
    image: 'https://images.pexels.com/photos/161901/miami-beach-south-beach-miami-florida-161901.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 210,
    rating: 4.4,
    focus: ['beach', 'nightlife', 'relax'],
    description: 'Art deco beaches and vibrant nightlife',
    type: 'domestic'
  },
  {
    id: '10',
    name: 'Nashville',
    country: 'Tennessee, USA',
    image: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 170,
    rating: 4.6,
    focus: ['nightlife', 'culture', 'shopping'],
    description: 'Music City with honky-tonk bars and live venues',
    type: 'domestic'
  },
  {
    id: '11',
    name: 'San Francisco',
    country: 'California, USA',
    image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 280,
    rating: 4.5,
    focus: ['culture', 'shopping', 'adventure'],
    description: 'Golden Gate views with diverse neighborhoods',
    type: 'domestic'
  },
  {
    id: '12',
    name: 'Asheville',
    country: 'North Carolina, USA',
    image: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&w=800',
    price: 150,
    rating: 4.7,
    focus: ['adventure', 'wellness', 'culture'],
    description: 'Blue Ridge Mountains with craft breweries',
    type: 'domestic'
  }
];

function App() {
  const [step, setStep] = useState<'welcome' | 'locations' | 'preference' | 'focus' | 'results'>('welcome');
  const [locations, setLocations] = useState<Location[]>([]);
  const [travelPreference, setTravelPreference] = useState<'domestic' | 'international' | 'both'>('both');
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState({ name: '', city: '', country: '' });

  const addLocation = () => {
    if (newLocation.name && newLocation.city) {
      const location: Location = {
        id: Date.now().toString(),
        ...newLocation
      };
      setLocations([...locations, location]);
      setNewLocation({ name: '', city: '', country: '' });
    }
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const toggleFocus = (focusId: string) => {
    if (selectedFocus.includes(focusId)) {
      setSelectedFocus(selectedFocus.filter(f => f !== focusId));
    } else {
      setSelectedFocus([...selectedFocus, focusId]);
    }
  };

  const handleSearch = () => {
    if (locations.length >= 2 && selectedFocus.length > 0) {
      setStep('results');
    }
  };

  const filteredDestinations = sampleDestinations.filter(dest => {
    const matchesFocus = dest.focus.some(focus => selectedFocus.includes(focus));
    const matchesPreference = travelPreference === 'both' || dest.type === travelPreference;
    return matchesFocus && matchesPreference;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meet Me in the Middle
              </h1>
            </div>
            {step !== 'welcome' && (
              <button
                onClick={() => setStep('welcome')}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Welcome Screen */}
      {step === 'welcome' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-pulse">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meeting Point
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover amazing destinations where you and your friends can meet in the middle. 
              We'll find the best deals and perfect spots based on everyone's location and travel preferences.
            </p>
            <button
              onClick={() => setStep('locations')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <Plane className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Locations</h3>
              <p className="text-gray-600">Enter where each friend is starting from</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Vibe</h3>
              <p className="text-gray-600">Select your travel focus and preferences</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Deals</h3>
              <p className="text-gray-600">Discover perfect destinations and travel deals</p>
            </div>
          </div>
        </div>
      )}

      {/* Locations Step */}
      {step === 'locations' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Where is everyone starting from?</h2>
            <p className="text-xl text-gray-600">Add at least 2 locations to find your middle ground</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Friend's name"
                value={newLocation.name}
                onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
              <input
                type="text"
                placeholder="City"
                value={newLocation.city}
                onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Country/State"
                value={newLocation.country}
                onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
              <button
                onClick={addLocation}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {locations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <button
                      onClick={() => removeLocation(location.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      ×
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{location.name}</h3>
                  <p className="text-gray-600">{location.city}, {location.country}</p>
                </div>
              ))}
            </div>
          )}

          {locations.length >= 2 && (
            <div className="text-center">
              <button
                onClick={() => setStep('preference')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Choose Travel Preference</span>
                <Globe className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Travel Preference Step */}
      {step === 'preference' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Where would you like to travel?</h2>
            <p className="text-xl text-gray-600">Choose your travel scope preference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <button
              onClick={() => setTravelPreference('domestic')}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                travelPreference === 'domestic'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay Domestic</h3>
              <p className="text-gray-600">Explore destinations within your home country</p>
              <div className="mt-4 text-sm text-gray-500">
                Lower costs • Shorter flights • No passport needed
              </div>
            </button>

            <button
              onClick={() => setTravelPreference('international')}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                travelPreference === 'international'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Go International</h3>
              <p className="text-gray-600">Discover amazing destinations around the world</p>
              <div className="mt-4 text-sm text-gray-500">
                Cultural immersion • Unique experiences • Adventure awaits
              </div>
            </button>

            <button
              onClick={() => setTravelPreference('both')}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                travelPreference === 'both'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="bg-gradient-to-r from-orange-400 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Show Me Both</h3>
              <p className="text-gray-600">See all options and decide based on deals</p>
              <div className="mt-4 text-sm text-gray-500">
                Maximum flexibility • Best deals • All possibilities
              </div>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setStep('focus')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Choose Travel Focus</span>
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Focus Selection Step */}
      {step === 'focus' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's your travel vibe?</h2>
            <p className="text-xl text-gray-600">Select one or more travel focuses to personalize your recommendations</p>
            <div className="mt-4 inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              {travelPreference === 'domestic' && (
                <>
                  <Home className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Domestic destinations only</span>
                </>
              )}
              {travelPreference === 'international' && (
                <>
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">International destinations only</span>
                </>
              )}
              {travelPreference === 'both' && (
                <>
                  <Plane className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700">All destinations</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {travelFocuses.map((focus) => (
              <button
                key={focus.id}
                onClick={() => toggleFocus(focus.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                  selectedFocus.includes(focus.id)
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r ${focus.color}`}>
                  <div className="text-white">
                    {focus.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{focus.name}</h3>
                <p className="text-gray-600 text-sm">{focus.description}</p>
              </button>
            ))}
          </div>

          {selectedFocus.length > 0 && (
            <div className="text-center">
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Find Perfect Destinations</span>
                <Search className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Step */}
      {step === 'results' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect Meeting Destinations</h2>
            <p className="text-xl text-gray-600 mb-8">Based on your locations and preferences, here are the best options</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedFocus.map((focusId) => {
                const focus = travelFocuses.find(f => f.id === focusId);
                return focus ? (
                  <span
                    key={focusId}
                    className={`px-4 py-2 rounded-full text-white text-sm bg-gradient-to-r ${focus.color}`}
                  >
                    {focus.name}
                  </span>
                ) : null;
              })}
            </div>

            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              {travelPreference === 'domestic' && (
                <>
                  <Home className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Domestic destinations</span>
                </>
              )}
              {travelPreference === 'international' && (
                <>
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">International destinations</span>
                </>
              )}
              {travelPreference === 'both' && (
                <>
                  <Plane className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700">All destinations</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">★ {destination.rating}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      destination.type === 'domestic' 
                        ? 'bg-green-500' 
                        : 'bg-purple-500'
                    }`}>
                      {destination.type === 'domestic' ? 'Domestic' : 'International'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.country}</p>
                  <p className="text-gray-700 mb-4">{destination.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.focus.filter(f => selectedFocus.includes(f)).map((focusId) => {
                      const focus = travelFocuses.find(f => f.id === focusId);
                      return focus ? (
                        <span
                          key={focusId}
                          className={`px-3 py-1 rounded-full text-white text-xs bg-gradient-to-r ${focus.color}`}
                        >
                          {focus.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">${destination.price}</span>
                      <span className="text-gray-500 text-sm">avg per person</span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>View Deals</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 mb-4">Try selecting different travel focuses or changing your travel preference</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setStep('focus')}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    Update Preferences
                  </button>
                  <button
                    onClick={() => setStep('preference')}
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300"
                  >
                    Change Travel Scope
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;