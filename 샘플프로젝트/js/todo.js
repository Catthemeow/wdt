const $frmTodoAdd = document.querySelector('.todo form[name="frmTodoAdd"]');
const $frmTodoEdit = document.querySelector('.todo form[name="frmTodoEdit"]');

const $addTaskInput = $frmTodoAdd.lastElementChild;
const $editTaskInput = $frmTodoEdit.lastElementChild;

const $todoList = document.querySelector('.todo>.list');

let editTodoId = null; //수정할 항목의 id

//로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
const reRenderTodoFn = function () {
	//$li요소 안의 자식엘리먼트를 모두 삭제
	while ($todoList.childElementCount > 0) {
		$todoList.removeChild($todoList.firstElementChild);
	}

	//for문을 이용해서 todos 배열에 저장된 목록을 화면에 출력
	for (let i = 0; i < state.todos.length; i++) {
		//console.log(state.todos[i]);

		const todo = state.todos[i];

		//동적으로 ul.list에 추가할 태그를 생성
		const $li = document.createElement('li');
		$li.id = todo.id;

		const $chk_i = document.createElement('i');
		if (todo.complete) {
			$chk_i.classList.add('insert', 'far', 'fa-check-square');
		} else {
			$chk_i.classList.add('insert', 'far', 'fa-square');
		}

		const $h3 = document.createElement('h3'); //투두프로젝트1 프로그래밍
		$h3.textContent = todo.tit;

		//완료여부에 따른 색상표시
		if (todo.complete) {
			$h3.classList.add('complete');
		} else {
			$h3.classList.remove('complete');
		}

		const $edit_i = document.createElement('i');
		$edit_i.classList.add('fas', 'fa-edit');

		const $del_i = document.createElement('i');
		$del_i.classList.add('del', 'fas', 'fa-times-circle');

		//완성된 태그 i, h3, p를 $li에 추가하여 조립
		$li.append($chk_i, $h3, $edit_i, $del_i);

		//완성된 태그 li를 ul.list에 추가하여 조립
		$todoList.appendChild($li);
	} //end of for

	//완료체크버튼에 대한 클릭이벤트 구문
	const chkIcons = document.querySelectorAll('.todo>.list i:nth-of-type(1)');
	chkIcons.forEach(function (chkIcon) {
		chkIcon.addEventListener('click', function () {
			editTodoId = parseInt(this.parentElement.id);

			/**
			 * map() 함수를 이용하여 state.todos 배열의 원소중
			 * id 속성값이 editTodoId와 일치하는 원소의 complete 속성값을
			 * 현재값의 반대로 변환후 로컬스토리지에 저장한다.
			 */

			state.todos = state.todos.map((todo) =>
				todo.id !== editTodoId ? todo : { ...todo, complete: !todo.complete }
			);

			console.log('state.todos =', state.todos);

			saveStateFn(); //로컬스토리지에 데이터를 저장하는 함수

			reRenderTodoFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
		});
	}); //삭제

	//삭제버튼에 대한 클릭이벤트 구문
	const delIcons = document.querySelectorAll('.todo>.list i:nth-of-type(3)');
	// console.log('delIcons =', delIcons);
	delIcons.forEach(function (delIcon) {
		delIcon.addEventListener('click', function () {
			const $li = this.parentElement;
			$li.remove(); //화면에서 해당 li요소를 삭제(DOMTree에서만...)

			//로컬스토리지에서도 삭제
			state.todos = state.todos.filter((todo) => todo.id !== parseInt($li.id)); //새로운 배열
			saveStateFn(); //로컬스토리지에 데이터를 저장하는 함수

			$addTaskInput.focus();
		});
	}); //삭제

	//수정버튼에 대한 클릭이벤트 구문
	const editIcons = document.querySelectorAll('.todo>.list i:nth-of-type(2)');
	// console.log('editIcons =', editIcons);

	editIcons.forEach(function (editIcon) {
		editIcon.addEventListener('click', function () {
			$frmTodoEdit.classList.add('on');
			$frmTodoAdd.classList.remove('on');

			editTodoId = parseInt(this.parentElement.id);

			/**
			 * state.todos 배열의 원소중 id 속성값이 editTodoId와 일치하는 원소의 tit를 가져온다.
			 * 그러기 위해서는 .findIndex()로 index를 알아야 한다.
			 */
			const idx = state.todos.findIndex((todo) => todo.id === editTodoId);
			console.log(`idx = ${idx}`);

			$editTaskInput.value = state.todos[idx].tit; //수정할 항목의 제목

			$editTaskInput.focus();
		});
	}); //수정
}; //end of reRenderTodoFn()

reRenderTodoFn();

//할일추가폼에 대한 submit 이벤트 구문
$frmTodoAdd.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $addTaskInput.value.trim();
	if (tit === '' || tit === null) {
		alert('Todo 제목을 입력해 주세요');
		$addTaskInput.focus();
		return false;
	} else {
		$addTaskInput.value = '';

		const newTodo = {
			id: state.nextTodoId,
			tit,
			complete: false,
		};

		state.todos.push(newTodo);
		// console.log('state =', state);

		state = { ...state, nextTodoId: state.nextTodoId + 1 }; //다음번에 사용할 id값 증가

		saveStateFn(); //로컬스토리지에 데이터를 저장하는 함수
		reRenderTodoFn();
	}
});

//todo 수정버튼에 대한 클릭이벤트
$frmTodoEdit.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $editTaskInput.value.trim();

	if (tit === '' || tit === null) {
		alert('Todo 제목을 입력해 주세요');
		$addTaskInput.focus();
		return false;
	} else {
		state.todos = state.todos.map((todo) => (todo.id !== editTodoId ? todo : { ...todo, tit }));

		console.log('state.todos =', state.todos);

		saveStateFn(); //로컬스토리지에 데이터를 저장하는 함수

		$frmTodoAdd.classList.add('on'); //todo 입력폼 노출
		$frmTodoEdit.classList.remove('on'); //수정폼 숨김

		$addTaskInput.focus();

		reRenderTodoFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
	} //end of if
});
