import { useState } from 'react';

const WeatherReducer = () => {
	const [weather, setWeather] = useState([]);

	const myGeoFn = (position) => {
		const APIKey = 'f484e2a5d894868fc44107169564f8f6';
		const lat = position.coords.latitude; //위도
		const lon = position.coords.longitude; //경도
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

		const getWeather = async () => {
			const data = await (await fetch(url)).json();

			setWeather(data.data.movies);
		};

		getWeather();
	};

	//에러발생할 경우 실행할 함수
	const errGeoFn = () => {
		alert('브라우저가 GPS 위치정보 기능을 지원하지 않습니다.');
	};

	//접속장치의 현재위치에 대한 정보 제공(단, GPS위치정보 동의시에)
	navigator.geolocation.getCurrentPosition(myGeoFn, errGeoFn);
};

export default WeatherReducer;
