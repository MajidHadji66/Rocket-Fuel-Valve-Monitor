import React from 'react';
import { WeatherData, WeatherCondition } from '../types';
import { SunIcon, CloudIcon, RainIcon, WindIcon } from './WeatherIcons';

interface WeatherCardProps {
    data: WeatherData;
}

const WeatherIcon: React.FC<{ condition: WeatherCondition }> = ({ condition }) => {
    switch (condition) {
        case WeatherCondition.Clear:
            return <SunIcon />;
        case WeatherCondition.Cloudy:
        case WeatherCondition.PartlyCloudy:
            return <CloudIcon />;
        case WeatherCondition.Rain:
            return <RainIcon />;
        case WeatherCondition.Windy:
            return <WindIcon />;
        default:
            return <SunIcon />;
    }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const tempCelsius = data.temperature;
    const tempFahrenheit = Math.round(tempCelsius * 9/5 + 32);

    return (
        <div className="bg-mission-panel border border-mission-border rounded-lg p-4 shadow-lg flex items-center justify-between">
            <div>
                <h3 className="font-bold text-lg text-mission-text-primary">{data.location}</h3>
                <p className="text-mission-text-secondary">{data.condition}</p>
                <div className="font-mono text-sm text-mission-text-secondary mt-2">
                    <p>Wind: {data.wind.speed} km/h {data.wind.direction}</p>
                </div>
            </div>
            <div className="text-right flex items-center space-x-4">
                <div className="w-12 h-12 text-yellow-400">
                     <WeatherIcon condition={data.condition} />
                </div>
                <div>
                    <p className="font-mono text-3xl font-bold text-mission-text-primary">{tempCelsius}°C</p>
                    <p className="font-mono text-md text-mission-text-secondary">{tempFahrenheit}°F</p>
                </div>
            </div>
        </div>
    );
};
