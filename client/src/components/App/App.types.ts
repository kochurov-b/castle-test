export type TReminder = {
  id: number;
  title: string;
  date?: Date | null;
  complete: boolean;
};

export type TOnChangeComplete = (index: number) => void;

export type TOnChangeDate = (date: Date | null, index: number) => void;
