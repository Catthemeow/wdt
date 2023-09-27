import React from 'react';
import styled from 'styled-components';

import Api from './components/Api';
import Today from './components/Today';
import Tomorrow from './components/Tomorrow';

const Section = styled.div`
	width: 95%;
	margin: 0 auto 16px;
	padding: 24px 0;
	text-align: center;
	border: 2px solid #a799ff;
	border-radius: 24px;
`;

const Weather = () => {
	return (
		<Section className="weather">
			<Api></Api>

			<Today></Today>

			<Tomorrow></Tomorrow>
		</Section>
	);
};

export default Weather;
