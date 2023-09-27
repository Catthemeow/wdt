import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
	display: none;
	position: absolute;
	left: 50%;
	top: 70px;
	width: 90%;
	height: 48px;
	background-color: #fff;
	border: 3px solid #ccc;
	border-bottom-width: 3px;
	transform: translate(-50%, 0);
	box-sizing: border-box;

	&.show {
		display: block;
	}

	> form {
		&.on {
			display: flex;
		}

		display: none;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		padding: 10px 0;
		background-color: #fff;

		> label {
			padding: 0 10px;
		}
		> input[type='text'] {
			flex: 1;
			outline: none;
		}
		> input[type='date'] {
			margin: 0 5px;
		}
		> .insert {
			padding-right: 10px;
			font-size: 20px;
			background: none;
			border: none;
			outline: none;
			cursor: pointer;
		}
	}
`;

const InputBox = () => {
	return (
		<Box className="inputBox">
			<form name="frmAdd" className="on">
				<label htmlFor="addTit">목표</label>
				<input
					type="text"
					name="addTit"
					id="addTit"
					autoComplete="off"
					placeholder="Enter your goal and press enter"
				/>
				<input type="date" name="addDate" />
				<button className="insert fas fa-check-square"></button>
			</form>

			<form name="frmEdit">
				<label htmlFor="editTit">수정</label>
				<input
					type="text"
					name="editTit"
					id="editTit"
					autoComplete="off"
					placeholder="Enter your goal and press enter"
				/>
				<input type="date" name="editDate" />
				<button className="insert fas fa-check-square"></button>
			</form>
		</Box>
	);
};

export default InputBox;
