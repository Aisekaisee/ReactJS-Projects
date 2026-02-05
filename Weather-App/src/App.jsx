import React from "react";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleClick = async () => {
    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},IN&limit=1&appid=${WEATHER_API_KEY}`,
      );

      const geoData = await geoRes.json();

      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`,
      );

      const weatherData = await weatherRes.json();

      setWeather({
        city: weatherData.name,
        temp: weatherData.main.temp,
        condition: weatherData.weather[0].main,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Weather App</h1>
          <p className="text-blue-100 text-lg">Find weather in your city</p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          {/* Input and Button Container */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onKeyPress={(e) => e.key === "Enter" && handleClick()}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all shadow-lg hover:shadow-xl"
            >
              Search
            </button>
          </div>
        </div>

        {/* Weather Data Card */}
        {weather && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-xl bg-opacity-95 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {weather?.city}
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-6">
                  <p className="text-gray-700 text-sm font-semibold mb-2">
                    Temperature
                  </p>
                  <p className="text-4xl font-bold text-orange-600">
                    {weather?.temp}°
                  </p>
                  <p className="text-gray-600 text-xs mt-1">Celsius</p>
                </div>

                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6">
                  <p className="text-gray-700 text-sm font-semibold mb-2">
                    Condition
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {weather?.condition}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setWeather(null)}
                className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Empty State Message */}
        {!weather && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-12 text-center">
            <p className="text-white text-lg font-medium">
              Enter a city name and search to see the weather
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
