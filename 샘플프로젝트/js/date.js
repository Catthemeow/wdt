//날짜정보를 가져오는 즉시실행함수
(function () {
	const $date = document.querySelector('header > .datetime > .date');
	const $day = $date.nextElementSibling; //DOMTree를 타고 선택

	//날짜출력
	const today = new Date();

	const year = today.getFullYear();
	let month = today.getMonth() + 1;
	const date = today.getDate();

	month = month < 10 ? `0${month}` : month; //두자리표기

	$date.textContent = `${year}.${month}.${date}`;

	//요일출력
	const day = today.getDay(); //0~6(일~토)
	const dayName = ['일', '월', '화', '수', '목', '금', '토'];
	$day.textContent = dayName[day];

	//주말일경우 요일강조
	if (day === 0 || day === 6) {
		$day.style.color = hexColorFn(); //bg.js에서 작성한 함수
	}
})();
