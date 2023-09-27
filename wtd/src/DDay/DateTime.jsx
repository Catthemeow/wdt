import React from "react";
import styled from "styled-components";

const Wrap = styled.p``;

const StyledDate = styled.span``;

const Day = styled.strong`
  margin-right: 5px;
`;

const Time = styled.span``;

const DateTime = ({ DT }) => {
  const today = DT;

  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  const date = today.getDate();

  month = month < 10 ? `0${month}` : month; //두자리표기

  //요일출력
  const day = today.getDay(); //0~6(일~토)
  const dayName = ["일", "월", "화", "수", "목", "금", "토"];

  //날짜시간을 가져오는 함수
  const displayTimeFn = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const ampm = hours < 12 ? "am" : "pm";

    //2자리 숫자로 변환
    const hours12 = hours % 12;

    const zeroHours = hours12 < 10 ? `0${hours12}` : hours12;
    const zeroMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const zeroSeconds = seconds < 10 ? `0${seconds}` : seconds;

    let time = "";

    if (hours12 > 0) {
      time = `(${zeroHours}:${zeroMinutes}:${zeroSeconds} ${ampm})`; //1~11시
    } else {
      time = `(12:${zeroMinutes}:${zeroSeconds} ${ampm})`; //정각
    }
  };

  setInterval(() => {
    displayTimeFn();
  }, 1000);

  return (
    <Wrap className="datetime">
      <StyledDate className="date">{`${year}.${month}.${date}`}</StyledDate>
      <Day className="day">{dayName[day]}</Day>
      <Time className="time"></Time>
    </Wrap>
  );
};

export default DateTime;
