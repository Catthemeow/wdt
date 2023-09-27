/**
 * navigator 객체는
 *    브라우저와 운영체제 정보를 제공
 *    현재 브라우저가 위치정보를 제공하는지 확인할 때 사용
 */

//GPS위치정보 동의시 실행할 함수
const myGeoFn = (position) => {
	const APIKey = 'f484e2a5d894868fc44107169564f8f6';

	const lat = position.coords.latitude; //위도
	const lon = position.coords.longitude; //경도

	// console.log(`위도 : ${lat}`);
	// console.log(`경도 : ${lon}`);

	//날씨정보를 제공하는 오픈웨더맵의 API 서비스 - units=metric 옵션은 섭씨온도 설정
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

	//비동기방식(AJAX)으로 현재날씨 데이터를 받아와서 출력
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			//console.log('현재 날씨 정보데이터 =', data);

			document.querySelector('.weather .city').textContent = data.name; //1.현재지역명 출력

			//2.현재날씨와 기온
			const weather = data.weather[0].main; //현재날씨
			const temp = data.main.temp; //현재기온
			document.querySelector('.weather h3').textContent = `${weather} / ${temp}º`;

			//3. 날씨이미지 - https://openweathermap.org/weather-conditions (날씨별 ID값의 의미)
			https: document.querySelector(
				'.weather>.current>img'
			).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		}); //end of fetch(현재날씨)

	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

	//비동기방식(AJAX)으로 오늘 날씨예보 데이터를 받아와서 출력
	fetch(forecastUrl)
		.then((response) => {
			return response.json();
		})
		.then((info) => {
			//console.log('날씨예보 데이터(3시간단위) info =', info);

			//사용자에게 필요한 날씨정보의 시간대를 09:00 ~ 21:00 으로 가정

			let today9am = null; //오늘 오전 9시 예보를 저장할 변수 {dt: 1689487200, main: {…}, weather: Array(1), clouds: {…}, wind: {…}, …}
			let today12pm = null; //오늘 오후 12시 예보를 저장할 변수
			let today6pm = null; //오늘 오후 6시 예보를 저장할 변수
			let today9pm = null; //오늘 오후 9시 예보를 저장할 변수

			const todayDateMill = new Date().setHours(0, 0, 0, 0); //현재시간정보의 날짜를 밀리세컨즈로 변환
			//console.log(`todayDaMill = ${todayDateMill}`);

			//필요한 데이터만를 찾아내기 위해 전수조사
			for (let i = 0; i < info.list.length; i++) {
				let forecast = info.list[i];
				//console.log('forecast =', forecast);

				/**
				 * 목표 - 오전9시, 오후12/6시/9시에 해당하는 데이터만을 4개의 변수에 각각 저장
				 *
				 * 1) forecast.dt_txt 속성에서 예보데이터 날짜를 가져와 진짜 날짜객체로 변환
				 * 2) 오늘날짜의 예보데이터인지 비교 확인
				 *    (1) 예보데이터의 날짜를 밀리세컨즈로 변환 - 1689260400000
				 *    (2) 현재시간정보의 날짜를 밀리세컨즈로 변환 - 1689260400000
				 */

				const forecastDate = new Date(forecast.dt_txt); //예보데이터의 날짜
				// console.log(`forecastDate = ${forecastDate}`);

				const forecastHour = forecastDate.getHours(); //예보데이터의 시간
				//console.log(`forecastHour = ${forecastHour}`);

				const forcastMill = forecastDate.setHours(0, 0, 0, 0); //예보데이터의 날짜를 밀리세컨즈로 변환
				//console.log(`forcastMill = ${forcastMill}`);

				//만약 같은날(오늘)이면 4개의 예보를 저장할 변수에 각 시간에 해당하는 forecast를 할당
				if (forcastMill === todayDateMill) {
					if (forecastHour === 9) {
						today9am = forecast;
					} else if (forecastHour === 12) {
						today12pm = forecast;
					} else if (forecastHour === 18) {
						today6pm = forecast;
					} else if (forecastHour === 21) {
						today9pm = forecast;
					}
				} //end of if
			} //end of for

			// console.log('today9am =', today9am);
			// console.log('today12pm =', today12pm);
			// console.log('today6pm =', today6pm);
			// console.log('today9pm =', today9pm);

			//
			let frstForecast; //첫번째예보
			let secForecast; //두번째예보

			const curHour = new Date().getHours(); //현재시간

			//현재시간에 따라 위 두 예보변수에 값 할당
			if (curHour > 12) {
				frstForecast = today6pm;
				secForecast = today9pm;
			} else {
				frstForecast = today9am;
				secForecast = today12pm;
			}

			// console.log('frstForecast =', frstForecast);

			//오늘 첫번째예보 출력
			const $firstFrame = document.querySelector('.today p:nth-of-type(1)>.frame');
			$firstFrame.style.backgroundImage = `url(https://openweathermap.org/img/wn/${frstForecast.weather[0].icon}@2x.png)`;
			$firstFrame.setAttribute('title', frstForecast.weather[0].description);
			$firstFrame.nextElementSibling.firstElementChild.textContent = `${new Date(
				frstForecast.dt_txt
			).getHours()}시`;
			$firstFrame.nextElementSibling.lastElementChild.textContent = frstForecast.main.temp;

			//console.log('frstForecast =', frstForecast);

			//오늘 두번째예보 출력
			const $secFrame = document.querySelector('.today p:nth-of-type(2)>.frame');
			$secFrame.style.backgroundImage = `url(https://openweathermap.org/img/wn/${secForecast.weather[0].icon}@2x.png)`;
			$secFrame.setAttribute('title', secForecast.weather[0].description);
			$secFrame.nextElementSibling.firstElementChild.textContent = `${new Date(
				secForecast.dt_txt
			).getHours()}시`;
			$secFrame.nextElementSibling.lastElementChild.textContent = secForecast.main.temp;
		}); //end of fetch(오늘날씨 예보)

	//비동기방식(AJAX)으로 내일 날씨예보 데이터를 받아와서 출력
	fetch(forecastUrl)
		.then((response) => response.json())
		.then((info) => {
			//console.log('info =', info);

			let tomorrow9am = null;
			let tomorrow6pm = null;

			//내일 날짜 설정
			let tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			const tomorrowMill = tomorrow.setHours(0, 0, 0, 0); //내일시간정보의 날짜를 밀리세컨즈로 변환
			//console.log('tomorrowMill =', tomorrowMill); //1689519600000

			//필요한 데이터만를 찾아내기 위해 전수조사
			for (let i = 0; i < info.list.length; i++) {
				/**
				 * 목표 - 오전9시, 오후6시에 해당하는 데이터만을 2개의 변수에 각각 저장
				 *
				 * 1) forecast.dt_txt 속성에서 예보데이터 날짜를 가져와 진짜 날짜객체로 변환
				 * 2) 오늘날짜의 예보데이터인지 비교 확인
				 *    (1) 예보데이터의 날짜를 밀리세컨즈로 변환 - 1689260400000
				 *    (2) 현재시간정보의 날짜를 밀리세컨즈로 변환 - 1689260400000
				 */
				const forecast = info.list[i];

				const forecastDate = new Date(forecast.dt_txt); //예보데이터의 날짜
				const forecastHour = forecastDate.getHours(); //예보데이터의 시간
				const forecastMill = forecastDate.setHours(0, 0, 0, 0); //예보데이터의 날짜를 밀리세컨즈로 변환

				//만약 같은날(내일)이면 2개의 예보를 저장할 변수에 각 시간에 해당하는 forecast를 할당
				if (tomorrowMill === forecastMill) {
					if (forecastHour === 9) {
						tomorrow9am = forecast;
					} else if (forecastHour === 18) {
						tomorrow6pm = forecast;
					}
				} //end of if
			} //end of for

			//내일 첫번째예보 출력
			const $firstFrame = document.querySelector('.tomorrow p:nth-of-type(1)>.frame');
			$firstFrame.style.backgroundImage = `url(https://openweathermap.org/img/wn/${tomorrow9am.weather[0].icon}@2x.png)`;
			$firstFrame.setAttribute('title', tomorrow9am.weather[0].description);
			$firstFrame.nextElementSibling.firstElementChild.textContent = `${new Date(
				tomorrow9am.dt_txt
			).getHours()}시`;
			$firstFrame.nextElementSibling.lastElementChild.textContent = tomorrow9am.main.temp;

			//console.log('frstForecast =', frstForecast);

			//내일 두번째예보 출력
			const $secFrame = document.querySelector('.tomorrow p:nth-of-type(2)>.frame');
			$secFrame.style.backgroundImage = `url(https://openweathermap.org/img/wn/${tomorrow6pm.weather[0].icon}@2x.png)`;
			$secFrame.setAttribute('title', tomorrow6pm.weather[0].description);
			$secFrame.nextElementSibling.firstElementChild.textContent = `${new Date(
				tomorrow6pm.dt_txt
			).getHours()}시`;
			$secFrame.nextElementSibling.lastElementChild.textContent = tomorrow6pm.main.temp;
		});
};

//에러발생할 경우 실행할 함수
const errGeoFn = () => {
	alert('브라우저가 GPS 위치정보 기능을 지원하지 않습니다.');
};

//접속장치의 현재위치에 대한 정보 제공(단, GPS위치정보 동의시에)
navigator.geolocation.getCurrentPosition(myGeoFn, errGeoFn);
