//로컬스토리지에 저장된 프로젝트 데이터 추출
let state = localStorage.getItem('state');

if (state !== null) {
	state = JSON.parse(state); //불러온 데이터가 문자열이므로 객체로 변환
} else {
	//프로젝트에서 로컬스토리지에 저장할 초기 데이터
	// state = {
	// 	username: '둘리',

	// 	Dday: [{ id: 0, tit: '취업준비', date: new Date('2023-8-10').valueOf() }],
	// 	nextDdayId: 1,

	// 	todos: [{ id: 0, tit: '입사지원', complete: false }],
	// 	nextTodoId: 1,
	// };
	state = {
		username: '',

		Dday: [],
		nextDdayId: 0,

		todos: [],
		nextTodoId: 0,
	};
}

//현재상태를 로컬스토리지에 저장
const saveStateFn = () => {
	localStorage.setItem('state', JSON.stringify(state)); //문자열로 변환하여 저장
};

document.querySelector('.expire').addEventListener('click', function () {
	if (confirm('초기화 하면 작성한 모든 정보가 삭제됩니다. \n 계속 진행하시겠습니까?')) {
		localStorage.removeItem('state');
		location.reload();
	} else {
		alert('데이터 초기화가 중지되었습니다. \n계속 이용해 주세요~!');
	}
});
