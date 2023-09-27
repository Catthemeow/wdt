const $btnDdayAdd = document.querySelector('.Dday>.tit>.add'); //Dday 추가버튼
const $inputBox = document.querySelector('.Dday>.inputBox');

const $frmDdayAdd = document.querySelector('.Dday>.inputBox>form[name="frmAdd"]');
const $frmDdayEdit = document.querySelector('.Dday>.inputBox>form[name="frmEdit"]');

const $addTit = document.querySelector('.Dday>.inputBox input[name=addTit]');
const $editTit = document.querySelector('.Dday>.inputBox input[name=editTit]');

const $addDate = document.querySelector('.Dday>.inputBox input[name=addDate]');
const $editDate = document.querySelector('.Dday>.inputBox input[name=editDate]');

const $DdayList = $inputBox.nextElementSibling;
const $btnClearDday = document.querySelector('.Dday h2>small');

let editDdayId = null; //수정할 항목의 id

//로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
const reRenderDdayFn = function () {
	//$DdayList요소 안의 자식엘리먼트를 모두 삭제
	//주의 - 이 구문은 CSS 작성이후에 적용할 것
	while ($DdayList.childElementCount > 0) {
		$DdayList.removeChild($DdayList.firstElementChild);
	}

	//for문을 이용해서 배열에 저장된 Dday 목록을 화면에 출력
	for (let i = 0; i < state.Dday.length; i++) {
		const Dday = state.Dday[i];

		//동적으로 ul.list에 추가할 태그를 생성
		const $li = document.createElement('li');
		$li.id = Dday.id;

		//삭제아이콘
		const $del_i = document.createElement('i');
		$del_i.classList.add('fas', 'fa-times-circle');

		const $h3 = document.createElement('h3'); //D-1
		const $p = document.createElement('p'); //내용

		//수정아이콘
		const $edit_i = document.createElement('i');
		$edit_i.classList.add('fas', 'fa-edit');

		//Dday 계산
		const today = new Date().valueOf();
		const savedDday = parseInt(Dday.date);
		const millPerDay = 24 * 60 * 60 * 1000; //하루에 해당하는 밀리세컨즈
		const remainDay = Math.floor((savedDday - today) / millPerDay) + 1; //오늘 기준으로 남아있는 날수

		//생성한 태그에 내용을 삽입`
		$h3.textContent = `D-${remainDay}`;

		//남은 날수에 따른 제목색상
		if (remainDay < 3) {
			$h3.style.color = 'red';
		} else if (remainDay < 7) {
			$h3.style.color = 'orange';
		}

		$p.textContent = Dday.tit;

		//완성된 태그 i, h3, p를 $li에 추가하여 조립
		$li.append($del_i, $h3, $p, $edit_i); //append()는 여러개의 자식요소 추가 가능

		//완성된 태그 li를 ul.list에 추가하여 조립
		$DdayList.appendChild($li); //appendChild()는한개의 자식요소만 추가 가능
	} //end of for

	//삭제버튼에 대한 클릭이벤트 구문
	const delIcons = document.querySelectorAll('.Dday>.list i:first-child');
	delIcons.forEach(function (delIcon) {
		delIcon.addEventListener('click', function () {
			const $li = this.parentElement;

			$li.classList.add('complete');

			//0.5초후 삭제 예약
			setTimeout(function () {
				$li.remove(); //해당 li요소를 삭제함(DOMTree에서만...)

				//로컬스토리지에서도 삭제
				state.Dday = state.Dday.filter((Dday) => Dday.id !== parseInt($li.id)); //새로운 배열
				saveStateFn(); //로컬스토리지에 반영
			}, 500);
		});
	});

	//수정버튼에 대한 클릭이벤트 구문
	const editIcons = document.querySelectorAll('.Dday>.list i:last-child');
	editIcons.forEach(function ($editIcon) {
		$editIcon.addEventListener('click', function () {
			//수정폼 노출
			$inputBox.classList.toggle('show', true);
			$frmDdayEdit.classList.add('on');
			$frmDdayAdd.classList.remove('on');

			editDdayId = parseInt(this.parentElement.id);

			/**
			 * state.Dday 배열의 원소중 id 속성값이 editDdayId와 일치하는 원소의 tit, date를 가져온다.
			 * 그러기 위해서는 .findIndex()로 index를 알아야 한다.
			 */

			const idx = state.Dday.findIndex((Dday) => Dday.id === editDdayId);
			//console.log(`idx = ${idx}`);

			//날짜추출 후 input[type=date] 값형식에 맞게 변환 : 2023-07-05
			let savedDate = new Date(state.Dday[idx].date);

			let year = savedDate.getFullYear();
			let month = savedDate.getMonth() + 1;
			let date = savedDate.getDate();

			month = month < 10 ? `0${month}` : month;
			date = date < 10 ? `0${date}` : date;
			savedDate = `${year}-${month}-${date}`;

			$editTit.value = state.Dday[idx].tit; //제목
			$editDate.value = savedDate; //날짜

			$editTit.focus();
		});
	});
};

reRenderDdayFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수

//로컬스토리에 저장된 Dday 데이터 삭제함수
const clearDdayFn = () => {
	state.Dday = [];
	saveStateFn();
};

//전체데이터 삭제
$btnClearDday.addEventListener('click', function () {
	clearDdayFn();
	reRenderDdayFn();
});

// Dday 추가버튼에 대한 click 이벤트
$btnDdayAdd.addEventListener('click', function () {
	if (!$frmDdayEdit.classList.contains('on')) {
		//디데이 입력창 보이기/숨기기
		//.show클래스가 없으면 붙이고, 있으면 삭제
		$inputBox.classList.toggle('show');
	}

	$frmDdayAdd.classList.add('on'); //새목표 추가폼 노출
	$frmDdayEdit.classList.remove('on'); //수정폼 숨김

	$addTit.focus();
});

//Dday 추가
$frmDdayAdd.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $addTit.value.trim();
	const inputDate = new Date($addDate.value);
	const today = new Date();

	const gapDay = inputDate - today; //오늘이후의 날짜를 선택하면 양수
	console.log(`gapDay = ${gapDay}`);

	if (tit === '' || tit === null) {
		alert('D-Day 제목을 입력해 주세요');
		$addTit.focus();
		return false;
	} else if (gapDay <= 0) {
		alert('오늘 이후의 날짜를 설정해야 합니다.');
		$addDate.focus();
		return false;
	} else if (isNaN(gapDay)) {
		alert('날짜를 선택해 주세요');
		$addDate.focus();
		return false;
	} else {
		//데이터를 state.Dday 배열에 추가
		const newDday = {
			id: state.nextDdayId,
			tit,
			date: inputDate.valueOf(),
		};

		state = { ...state, nextDdayId: state.nextDdayId + 1 }; //다음번에 사용할 id값 증가

		state.Dday.push(newDday);
		//console.log('state =', state);

		saveStateFn(); //로컬스토리지에 데이터를 저장하는 함수

		//false 옵션을 주면 .show클래스를 무조건 삭제
		$inputBox.classList.toggle('show', false);

		$addTit.value = '';
		$addDate.value = '';

		reRenderDdayFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
	} //end of if
});

//디데이 수정버튼에 대한 클릭이벤트
$frmDdayEdit.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $editTit.value.trim();
	const inputDate = new Date($editDate.value);
	const today = new Date();

	const gapDay = inputDate - today; //오늘이후의 날짜를 선태하면 양수
	console.log(`gapDay = ${gapDay}`);

	if (tit === '' || tit === null) {
		alert('D-Day 제목을 입력해 주세요`');
		$editTit.focus();
		return false;
	} else if (gapDay <= 0) {
		alert('오늘 이후의 날짜를 설정해야 합니다.');
		$editDate.focus();
		return false;
	} else if (isNaN(gapDay)) {
		alert('날짜를 선택해 주세요');
		$editDate.focus();
		evt.preventDefault();
		return false;
	} else {
		state.Dday = state.Dday.map((Dday) =>
			Dday.id !== editDdayId ? Dday : { ...Dday, tit, date: inputDate.valueOf() }
		);

		// console.log('state.Dday =', state.Dday);

		saveStateFn(); //로컬스토리지에 데이터를 저장하는 함수

		//false 옵션을 주면 .show클래스를 무조건 삭제
		$inputBox.classList.toggle('show', false);

		$frmDdayAdd.classList.add('on'); //새목표 추가폼 노출
		$frmDdayEdit.classList.remove('on'); //수정폼 숨김

		reRenderDdayFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
	} //end of if
});
