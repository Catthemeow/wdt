import React from 'react';
import styled from 'styled-components';

const Article = styled.article`
	margin-top: 48px;
	> h3 {
		width: 60%;
		color: #a799ff;
		margin: 0 auto 16px;
		text-align: left;
	}
	> div {
		display: flex;
		justify-content: space-between;
		width: 55%;
		margin: 0 auto;

		> p {
			display: flex;
			align-items: center;

			> .frame {
				display: block;
				width: 72px;
				height: 72px;
				background-position: center center;
				background-size: cover;
			}

			&:nth-of-type(1) > span {
				background-image: url(https://openweathermap.org/img/wn/50d@2x.png);
			}
			&:nth-of-type(2) > span {
				background-image: url(https://openweathermap.org/img/wn/10d@2x.png);
			}

			> span {
				line-height: 1.5;
				text-align: left;
			}
		}
	}
`;

const Tomorrow = () => {
	return (
		<Article className="forecast tomorrow">
			<h3>Tomorrow</h3>
			<div>
				<p>
					<span className="frame"></span>
					<span>
						<span className="when">19시</span>
						<span className="temp">23</span>º
					</span>
				</p>
				<p>
					<span className="frame"></span>
					<span>
						<span className="when">9시</span>
						<span className="temp">23</span>º
					</span>
				</p>
			</div>
		</Article>
	);
};

export default Tomorrow;
