import React, { useState, useEffect } from 'react';
import { WeatherData, WeatherCondition, WindInfo } from '../types';
import { WeatherCard } from './WeatherCard';

const LOCATIONS = {
    KENT: 'Kent, WA',
    CAPE: 'Cape Canaveral, FL'
};

const generateSimulatedWeather = (location: string): WeatherData => {
    const conditions = Object.values(WeatherCondition);
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    let temp, windSpeed, condition;

    if (location === LOCATIONS.KENT) {
        // Cooler, milder weather for Kent, WA
        temp = 12 + Math.random() * 8; // 12-20°C
        windSpeed = 5 + Math.random() * 15; // 5-20 km/h
        condition = conditions[Math.floor(Math.random() * conditions.length)];
    } else {
        // Warmer, potentially windier for Cape Canaveral, FL
        temp = 22 + Math.random() * 10; // 22-32°C
        windSpeed = 10 + Math.random() * 20; // 10-30 km/h
        condition = conditions[Math.floor(Math.random() * conditions.length)];
    }
    
    const wind: WindInfo = {
        speed: Math.round(windSpeed),
        direction: directions[Math.floor(Math.random() * directions.length)]
    };

    return {
        location,
        temperature: Math.round(temp),
        condition,
        wind,
    };
};

const WeatherDisplay: React.FC = () => {
    const [weatherKent, setWeatherKent] = useState<WeatherData | null>(null);
    const [weatherCape, setWeatherCape] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeather = () => {
            setWeatherKent(generateSimulatedWeather(LOCATIONS.KENT));
            setWeatherCape(generateSimulatedWeather(LOCATIONS.CAPE));
        };
        
        fetchWeather(); // Initial fetch
        const interval = setInterval(fetchWeather, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weatherKent ? <WeatherCard data={weatherKent} /> : <div>Loading...</div>}
            {weatherCape ? <WeatherCard data={weatherCape} /> : <div>Loading...</div>}
        </div>
    );
};

export default WeatherDisplay;
