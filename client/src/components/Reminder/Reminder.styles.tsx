import styled from 'styled-components';

type ActionsProps = {
  expanded: boolean;
};

type CommonProps = {
  complete: boolean;
};

export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 27px;
  height: 27px;
  border-radius: 0 15px 0 15px;
  border: 0;
  padding: 4px;
  background-color: #b86464;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background-color: #e66969;
  }
`;

export const Main = styled.div<CommonProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 30px 15px 24px;
  background-color: ${({ complete }) => (complete ? 'transparent' : '#2e2f30')};
  border: 1px solid #363738;
  border-radius: 15px;
  transition: 0.25s;
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 15px;
`;

export const Header = styled.header``;

export const Input = styled.input.attrs({ type: 'text' })<CommonProps>`
  width: 100%;
  color: ${({ complete }) => (complete ? '#9c9c9d' : '#eaeaea')};
  font-size: 20px;
  line-height: 25px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 0px 6px;
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
  transition: 0.25s;

  &:hover {
    border-color: ${({ complete }) => (complete ? 'transparent' : '#484a4c')};
  }
`;

export const Actions = styled.div<ActionsProps>`
  margin-top: 8px;
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  transition: 0.25s;
`;

export const DateView = styled.span`
  color: #999a9a;
  display: block;
  margin: 4px 0 0 7px;
  cursor: default;
`;

export const Icon = styled.svg``;

export const Path = styled.path`
  stroke: #232425;
  fill: transparent;
  stroke-linecap: round;
  stroke-width: 4;
`;

export const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 25px;
  width: 25px;
  height: 25px;
  border: 2px solid #9c9c9d;
  background-color: #9c9c9d;
  border-radius: 8px;
`;

export const PlusSvg = styled.svg`
  width: 15px;
  height: 15px;
`;

export const PlusPath = styled.path`
  fill: #232425;
`;
