import React from 'react';
import styled from 'styled-components';

const Tit = styled.div`
	display: flex;
	align-items: center;
	width: 90%;

	margin: 0 auto;
	padding: 10px 0 20px;
	border-bottom: 2px solid #d9d9d9;
`;

const Add = styled.i`
	color: #a799ff;
	font-size: 24px;
	cursor: pointer;

	&:hover {
		color: darken(#a799ff, 10%);
	}
`;

const Delete = styled.h2`
	flex: 1 1 0;
	text-align: center;

	> small {
		color: #ccc;
		&:hover {
			text-decoration: underline;
		}
		cursor: pointer;
	}
`;

const Title = () => {
	return (
		<Tit className="tit">
			<Delete title="클릭시 전체데이터 삭제됨">
				D-Day Goal Setting <small>&lt;전체삭제&gt;</small>
			</Delete>
			<Add
				className="add fas fa-plus-circle"
				// Dday 추가버튼에 대한 click 이벤트
				onClick={() => {
					const $frmDdayAdd = document.querySelector('.Dday>.inputBox>form[name="frmAdd"]');
					const $frmDdayEdit = document.querySelector('.Dday>.inputBox>form[name="frmEdit"]');
					const $btnDdayAdd = document.querySelector('.Dday>.tit>.add'); //Dday 추가버튼
					const $inputBox = document.querySelector('.Dday>.inputBox');
					const $addTit = document.querySelector('.Dday>.inputBox input[name=addTit]');

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
				}}
			></Add>
		</Tit>
	);
};

export default Title;
