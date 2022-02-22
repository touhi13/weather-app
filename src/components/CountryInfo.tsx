import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IProps{
    name: string | undefined
}

interface ICountry {
    capital: string[],
    population: number,
    latlng: number[]
    flags: {
        svg: string
    }
}

interface ICountryInfoProps {
    temperature: number,
    weather_icons: string[],
    wind_speed: number,
    precip: number
}

const CountryInfo: React.FC = () => {

    const { name } = useParams<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [wLoading, setWLoading] = useState<boolean>(false);
    const [country, setCountry] = useState<ICountry>();
    const [weatherInfo, setWeatherInfo] = useState<ICountryInfoProps>();

    useEffect(() => {
        getCountry();
    }, [])
    const getCountry = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            const data = await res.json();
            console.log(data);
            setCountry(data.length > 1 ? data[2] : data[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const getWeather = async () => {
        console.log("getWeather");
        try {
            setWLoading(true);
            const res = await fetch(`http://api.weatherstack.com/current?access_key=c4c6ac872a5bd422cd616e1cf43e96a7&query=${country?.capital}`)
            const data = await res.json();
            console.log(data);
            setWeatherInfo(data.current);
            setWLoading(false);
        } catch (error) {
            setWLoading(false);
            console.log(error);
        }
    }

    return (
        <div data-testid="country">
            <h1>Country Info</h1>
            {
                loading ? <p>Loading...</p> :
                    country ? <div>
                        <div className="left">
                            <img src={country.flags.svg} alt='' />
                        </div>
                        <div className="right">
                            <p>Capital : {country.capital}</p>
                            <p>Population : {country.population}</p>
                            <p>Latitude : {country.latlng[0]}</p>
                            <p>Longitude : {country.latlng[1]}</p>
                        </div>
                    </div> : <h3>Country not found by name</h3>
            }
            {
                country && <Button variant="contained" onClick={getWeather}>Capital Weather</Button>
            }
            {
                wLoading ? <p>Loading...</p> :
                    weatherInfo &&  <div>
                        <h3>{country?.capital[0]} Weather Info</h3>
                        <div>
                            <img src={weatherInfo.weather_icons[0]} alt='' />
                            <p>Temperature : {weatherInfo.temperature} <sup>o</sup></p>
                            <p>Wind Speed : {weatherInfo.wind_speed}</p>
                            <p>Precipitation : {weatherInfo.precip}</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default CountryInfo;