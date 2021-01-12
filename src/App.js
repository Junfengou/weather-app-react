import React, { Component } from "react";
import DisplayWeather from "./components/DisplayWeather";
import Navbar from "./components/Navbar";
import Axios from "axios";
import "./App.css";

class App extends Component {
	state = {
		coords: {
			latitude: 45,
			logitude: 60,
		},
		data: {},
		inputData: "",
	};

	componentDidMount() {
		// get device location upon website load
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				//console.log("Position: ", position);
				let newCoords = {
					latitude: position.coords.latitude,
					logitude: position.coords.longitude,
				};

				this.setState({ coords: newCoords });
				console.log("Coords: ", this.state.coords);
				Axios.get(
					`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_KEY}&query=${this.state.coords.latitude},${this.state.coords.logitude}`
				).then((res) => {
					console.log("Result: ", this.state.coords);
					let weatherData = {
						location: res.data.location.name,
						temperature: res.data.current.temperature,
						description: res.data.current.weather_descriptions[0],
						region: res.data.location.region,
						country: res.data.location.country,
						wind_speed: res.data.current.wind_speed,
						pressure: res.data.current.pressure,
						precip: res.data.current.precip,
						humidity: res.data.current.humidity,
						img: res.data.current.weather_icons,
					};
					this.setState({ data: weatherData });
				});
			});
		} else {
			console.log("not supported");
		}
	}
	change = (value) => {
		this.setState({ inputData: value });
	};

	changeWeather = (e) => {
		e.preventDefault();
		Axios.get(
			`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_KEY}&query=${this.state.inputData}`
		).then((res) => {
			console.log(this.state.inputData);
			let newWeather = {
				location: res.data.location.name,
				temperature: res.data.current.temperature,
				description: res.data.current.weather_descriptions[0],
				region: res.data.location.region,
				country: res.data.location.country,
				wind_speed: res.data.current.wind_speed,
				pressure: res.data.current.pressure,
				precip: res.data.current.precip,
				humidity: res.data.current.humidity,
				img: res.data.current.weather_icons,
			};
			this.setState({ data: newWeather });
		});
	};

	render() {
		return (
			<div className="App">
				<div className="container">
					<Navbar
						changeRegion={this.change}
						changeWeather={this.changeWeather}
					/>
					<DisplayWeather weatherData={this.state.data} />
				</div>
			</div>
		);
	}
}

export default App;
