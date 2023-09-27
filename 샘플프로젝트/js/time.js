//날짜시간을 가져오는 함수
const displayTimeFn = () => {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();

	const ampm = hours < 12 ? 'am' : 'pm';

	//2자리 숫자로 변환
	const hours12 = hours % 12;

	const zeroHours = hours12 < 10 ? `0${hours12}` : hours12;
	const zeroMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const zeroSeconds = seconds < 10 ? `0${seconds}` : seconds;

	let time = '';

	if (hours12 > 0) {
		time = `(${zeroHours}:${zeroMinutes}:${zeroSeconds} ${ampm})`; //1~11시
	} else {
		time = `(12:${zeroMinutes}:${zeroSeconds} ${ampm})`; //정각
	}

	const $time = document.querySelector('header > .datetime > .time');

	$time.textContent = time;
};

displayTimeFn();

// setInterval(함수,밀리세컨즈시간) - 설정한 시간 간격으로 함수를 호출
setInterval(displayTimeFn, 1000);
