"use client";

import { useState, useEffect, useCallback } from "react";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  weatherLabel: string;
  isDay: boolean;
  location: string;
  isLoading: boolean;
  error: string | null;
}

const WMO_CODES: Record<number, string> = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Dense Drizzle",
  56: "Freezing Drizzle",
  57: "Dense Freezing Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Freezing Rain",
  67: "Heavy Freezing Rain",
  71: "Slight Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Slight Showers",
  81: "Moderate Showers",
  82: "Violent Showers",
  85: "Slight Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm w/ Hail",
  99: "Heavy Thunderstorm",
};

function getWeatherLabel(code: number): string {
  return WMO_CODES[code] || "Unknown";
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=auto`
    );
    const data = await res.json();
    const tz = data.timezone || "";
    // Extract city-like name from timezone (e.g., "Asia/Dhaka" → "Dhaka")
    const parts = tz.split("/");
    const city = parts[parts.length - 1]?.replace(/_/g, " ") || "";

    if (city) return city;

    // Fallback: use nominatim for more accurate city name
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&addressdetails=1`,
      { headers: { "User-Agent": "CenedyPortfolio/1.0" } }
    );
    const geoData = await geoRes.json();
    const addr = geoData.address || {};
    return addr.city || addr.town || addr.state || addr.country || "Unknown";
  } catch {
    return "Unknown";
  }
}

export function useWeather(): WeatherData {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    weatherCode: 0,
    weatherLabel: "",
    isDay: true,
    location: "",
    isLoading: true,
    error: null,
  });

  const fetchWeather = useCallback(async (lat: number, lon: number, cityName?: string) => {
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`
      );

      // Only reverse-geocode if we don't already have a city name
      let locationName = cityName || "";
      if (!locationName) {
        locationName = await reverseGeocode(lat, lon);
      }

      const data = await weatherRes.json();
      const current = data.current;

      setWeather({
        temperature: Math.round(current.temperature_2m),
        weatherCode: current.weather_code,
        weatherLabel: getWeatherLabel(current.weather_code),
        isDay: current.is_day === 1,
        location: locationName,
        isLoading: false,
        error: null,
      });
    } catch {
      setWeather((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to fetch weather",
      }));
    }
  }, []);

  useEffect(() => {
    // Use IP-based geolocation (GeoJS is rarely blocked by adblockers)
    fetch("https://get.geojs.io/v1/ip/geo.json")
      .then((res) => {
        if (!res.ok) throw new Error("IP API failed");
        return res.json();
      })
      .then((data) => {
        if (data.latitude && data.longitude) {
          const lat = parseFloat(data.latitude);
          const lon = parseFloat(data.longitude);
          fetchWeather(lat, lon, data.city || "");
        } else {
          throw new Error("Invalid location data");
        }
      })
      .catch((err) => {
        console.warn("Location fetch failed, falling back to default (Dhaka):", err);
        // Fallback to Dhaka coordinates if IP API fails/is blocked
        fetchWeather(23.8103, 90.4125, "Dhaka");
      });
  }, [fetchWeather]);

  return weather;
}
