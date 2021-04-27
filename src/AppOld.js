import React, { Component } from "react";
import "./App.css";

const PLACES = [
  { name: "Moscow", zip: "107370" },
  { name: "St Petersburg", zip: "187015" },
  { name: "Novosibirsk", zip: "630011" },
  { name: "Yekaterinburg", zip: "620000" },
  { name: "Nizhny Novgorod", zip: "603000" },
  { name: "Chelyabinsk", zip: "454000" },
  { name: "Omsk", zip: "644010" },
  { name: "Rostov-on-Don", zip: "344000" },
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=4108158e1a1ac40620f94bfd83f37504&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading...</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current temperature: {weatherData.main.temp}°C</p>
        <p>Max temperature: {weatherData.main.temp_max}°C</p>
        <p>Min temperature: {weatherData.main.temp_min}°C</p>
        <p>Wind Speed: {weatherData.wind.speed} m/sec</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        {PLACES.map((place, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
            {place.name}
          </button>
        ))}
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
      </div>
    );
  }
}

export default App;