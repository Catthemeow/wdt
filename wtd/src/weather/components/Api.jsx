import React from 'react';
import styled from 'styled-components';

const Title = styled.h2``;

const Area = styled.span`
	color: #a799ff;
`;

const Article = styled.article``;

const Img = styled.img`
	width: 122px;
`;

const Info = styled.h3`
	font-size: 1.2rem;
`;

const Api = () => {
	return (
		<>
			<Title>
				<Area className="city">서울</Area> Weather
			</Title>
			<Article className="current">
				<Img src="https://openweathermap.org/img/wn/50d@2x.png" alt="Rain" />
				<Info>Rain / 28º</Info>
			</Article>
		</>
	);
};

export default Api;
