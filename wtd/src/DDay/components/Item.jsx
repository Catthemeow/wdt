import React from 'react';
import styled from 'styled-components';

const Date = styled.h3`
	padding: 0 10px;
	color: #a799ff;
	font-size: 20px;
`;

const DayList = styled.p`
	flex: 1;
	font-size: 20px;
`;

const Del = styled.i`
	font-size: 18px;
	color: #a799ff;
	&:hover {
		color: darken(#a799ff, 10%);
		cursor: pointer;
	}
`;

const Edit = styled.i`
	font-size: 18px;
	color: #a799ff;
	&:hover {
		color: darken(#a799ff, 10%);
		cursor: pointer;
	}
`;

const DdayItem = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 24px;

	&.complete {
		text-decoration: line-through #a799ff;
	}

	&:last-child {
		margin-bottom: 0;
	}
`;

const Item = ({ date, fnDel }) => {
	const { id, day, list } = date;

	return (
		<>
			<DdayItem>
				<Del
					className="fas fa-times-circle"
					onClick={() => {
						fnDel(id);
					}}
				></Del>
				<Date>D-{day}</Date>
				<DayList>{list}</DayList>
				<Edit className="fas fa-edit"></Edit>
			</DdayItem>
		</>
	);
};

export default Item;
