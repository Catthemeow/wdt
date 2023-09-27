const $login = document.querySelector('#login');
const $loginForm = $login.firstElementChild;
const $username = $loginForm.children[1];

const $wrap = document.querySelector('#wrap');
const $user = document.querySelector('h1>.user');

//2. 환영인사(이름설정) 함수
const welcomeFn = (username) => {
	$user.textContent = `${username}`;
	console.log(state);
};

//1. 로컬스토리지의 username값 유무에 따라 UI 선택
if (state.username !== '') {
	welcomeFn(state.username); //환영인사 함수호출

	$wrap.style.display = 'block'; //Todo컨테이너 노출
	$login.style.display = 'none'; // 로그인폼 숨김
} else {
	$wrap.style.display = 'none'; //Todo컨테이너 숨김
	$login.style.display = 'block'; // 로그인폼 노출
}

//3. input 박스에서 엔터키를 누르면 submit 이벤트 발생
$loginForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	const username = $username.value.trim();

	// input 태그에서 required 했기 때문에 필요없음
	// if (username === '' || username === null) {
	// 	alert('사용자명을 입력해 주세요~!');
	// 	$username.focus();
	// 	return false;
	// }

	$login.style.display = 'none'; // 로그인폼 숨김
	$wrap.style.display = 'block'; //Todo컨테이너 노출

	//로컬스토리지에 username값 저장
	state = { ...state, username };
	saveStateFn();
	//console.log(state);
	welcomeFn(username); //환영인사 함수호출
});
