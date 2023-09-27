import React, { useEffect, useState } from 'react';
import Title from './components/Title';
import InputBox from './components/InputBox';
import List from './components/List';
import styled from 'styled-components';

const Section = styled.section`
	position: relative;
	width: 95%;
	margin: 0 auto 16px;
	padding: 24px 0;
	border: 2px solid #a799ff;
	border-radius: 24px;
`;

const initialData = [
	{ id: 1, day: 1, list: '투두 프로젝트' },
	{ id: 2, day: 6, list: '포폴준비' },
];

const defaultState = JSON.parse(localStorage['friends-contact'] || JSON.stringify(initialData));

const DDay = () => {
	const [dates, setDates] = useState(defaultState);

	useEffect(() => {
		localStorage['friends-contact'] = JSON.stringify(dates);
	}, [dates]);

	//삭제함수
	const fnDel = (id) => {
		// alert('id =' + id);
		setDates((prevDates) =>
			prevDates.filter((todo) => {
				return todo.id !== id;
			})
		);
	};

	return (
		<Section className="Dday">
			<Title />
			<InputBox />
			<List dates={dates} fnDel={fnDel} />
		</Section>
	);
};

export default DDay;
