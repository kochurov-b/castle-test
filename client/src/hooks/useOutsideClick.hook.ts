import { MutableRefObject } from 'react';

type TUseOutsideClickExpected = {
  setListenerToDocument: () => void;
};

type TUseOutsideClick = (
  ref: MutableRefObject<HTMLDivElement | null>,
  callback: () => void,
) => TUseOutsideClickExpected;

type TOnClick = (e: MouseEvent) => void;

export const useOutsideClick: TUseOutsideClick = (ref, callback) => {
  const handleClick: TOnClick = (e) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();

      document.removeEventListener('click', handleClick);
    }
  };

  const setListenerToDocument = () =>
    document.addEventListener('click', handleClick);

  return {
    setListenerToDocument,
  };
};
