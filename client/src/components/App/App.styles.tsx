import styled from 'styled-components';

export const Main = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 650px;
  height: calc(100vh - 80px);
  padding: 40px 60px;
  background-color: #232425;
`;

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Header = styled.header``;

export const Title = styled.h1`
  color: #eaeaea;
  font-size: 45px;
  line-height: 50px;
`;

export const Button = styled.button`
  color: #eaeaea;
  font-size: 16px;
  line-height: 21px;
  background-color: transparent;
  padding: 4px 8px;
  border: 0;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.25s;

  &:hover {
    background-color: #393a3b;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 2px solid #363738;
`;

export const TasksNumber = styled.span`
  display: block;
  color: #eaeaea;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
`;

export const Content = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const Loading = styled.span`
  color: #eaeaea;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  lint-height: 35px;
`;

export const Error = styled.span`
  color: red;
`;
