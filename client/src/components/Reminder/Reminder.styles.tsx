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
  border-radius: 50%;
  border: 1px solid #363738;
  padding: 4px;
  transform: translate(10%, -10%);
  background-color: #d36e6e;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;

  &:hover {
    background-color: #cb4949;
  }
`;

export const Main = styled.div<CommonProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 24px;
  background-color: ${({ complete }) => (complete ? 'transparent' : '#2e2f30')};
  border: 1px solid;
  border-radius: 15px;
  border-color: ${({ complete }) => (complete ? 'transparent' : '#363738')};
  transition: 0.25s;

  &:hover {
    background-color: #393a3b;

    & ${DeleteButton} {
      opacity: 1;
      visibility: visible;
      transform: translate(25%, -25%);
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 18px;
`;

export const Header = styled.header``;

export const Input = styled.input.attrs({ type: 'text' })<CommonProps>`
  color: ${({ complete }) => (complete ? '#9c9c9d' : '#eaeaea')};
  font-size: 20px;
  line-height: 25px;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin-bottom: 4px;
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
  transition: 0.25s;
`;

export const Actions = styled.div<ActionsProps>`
  margin-top: 8px;
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  transition: 0.25s;
`;

export const DateView = styled.span`
  color: #999a9a;
  display: block;
  cursor: default;
`;

export const Icon = styled.svg``;

export const Path = styled.path`
  stroke: #232425;
  fill: transparent;
  stroke-linecap: round;
  stroke-width: 4;
`;
