const $icon = document.querySelector('aside>i');

//랜덤으로 16진수 헥사코드를 생성하는 함수
const hexColorFn = () => {
	let R = Math.floor(Math.random() * 256);
	let G = Math.floor(Math.random() * 256);
	let B = Math.floor(Math.random() * 256);

	R = R.toString(16);
	G = G.toString(16);
	B = B.toString(16);

	R = R.length === 1 ? `0${R}` : R;
	G = G.length === 1 ? `0${G}` : G;
	B = B.length === 1 ? `0${B}` : B;

	const hexColor = `#${R}${G}${B}`;
	// console.log(`hexColor = ${hexColor}`);

	return hexColor;
};

$icon.addEventListener('click', function () {
	document.body.style.backgroundColor = hexColorFn();
});
