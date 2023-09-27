import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const Ul = styled.ul`
	overflow: auto;
	width: 90%;
	height: 150px;
	margin: 24px auto 0;
`;

const List = ({ dates, fnDel }) => {
	return (
		<Ul className="list">
			{dates.map((date) => (
				<Item date={date} key={date.id} fnDel={fnDel}></Item>
			))}
		</Ul>
	);
};

export default List;
