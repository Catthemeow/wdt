import React from 'react';
import Weather from './weather/Weather';
import { createGlobalStyle } from 'styled-components';
import DDay from './dDay/DDay';

const GlobalStyle = createGlobalStyle`
	*{margin: 0;padding: 0;}
	ul,li,ol{list-style:none;}
`;

function App() {
	return (
		<>
			<GlobalStyle />

			<Weather />
			<DDay />
		</>
	);
}

export default App;
