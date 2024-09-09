import styled from "styled-components";

export const ListWrap = styled.ul`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: white;
  margin: 0 auto 40px;
  padding: 50px;
  min-height: 60vh;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0 0 5px skyblue;
`;

export const List = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: decimal;
  margin: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid gray;
`;

export const Span = styled.span`
  font-size: 20px;
`;

export const Check = styled.input`
  height: 20px;
  width: 20px;
  cursor: "pointer";
`;
