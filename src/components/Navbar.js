import React from "react";

function Navbar(props) {
	function changeEvent(e) {
		e.preventDefault();
		// console.log(e.target.value);
		props.changeRegion(e.target.value);
	}

	function submit(e) {
		props.changeWeather(e);
	}
	return (
		<div className="row">
			<div className="col-md-6">
				<h1 className="title">Weather App</h1>
			</div>

			<div className="col-md-6">
				<form className="region" onSubmit={submit}>
					<input
						className="regioninput"
						placeholder="Enter location"
						onChange={changeEvent}
					/>
				</form>
			</div>
		</div>
	);
}

export default Navbar;
