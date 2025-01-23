declare module "react-multi-date-picker" {
  import { FC } from "react";

  export class DateObject {
    format(format?: string): string;
    constructor(date?: Date | string | number);
  }

  export type Value = DateObject | Date | string | number;

  interface FormattingValues {
    [key: string]: string | number | boolean;
  }

  interface Locale {
    name: string;
    months: string[][];
    weekDays: string[][];
    digits: string[];
    meridiems: string[][];
    defaultFormat: string;
  }

  interface Calendar {
    name: string;
    months: string[][];
    weekDays: string[][];
    defaultFormat: string;
    startYear: number;
    yearLength: number;
    epoch: number;
    century: number;
    calendar: string;
    locale: string;
    year: number;
    month: number;
    day: number;
    weekStartDayIndex: number;
    getMonthLengths: (year: number) => number[];
    isLeap: (year: number) => boolean;
    getLeaps: (start: number, end: number) => number[];
    getAllDays: (date: DateObject) => number;
    formattingValues: FormattingValues;
    toJalaali?: (date: Date) => { jy: number; jm: number; jd: number };
  }

  interface DatePickerProps {
    value?: Value | null | undefined;
    onChange?: (
      date: DateObject | null,
      options?: { 
        validatedValue: string | string[];
        input: HTMLElement;
        isTyping: boolean;
      }
    ) => void;
    calendar?: Partial<Calendar>;
    locale?: Partial<Locale>;
    minDate?: Date;
    format?: string;
    className?: string;
    calendarPosition?: string;
    inputClass?: string;
  }

  const DatePicker: FC<DatePickerProps>;
  export default DatePicker;
}

declare module "react-date-object/calendars/persian" {
  const persian: Partial<Calendar>;
  export default persian;
}

declare module "react-date-object/locales/persian_fa" {
  const persian_fa: Partial<Locale>;
  export default persian_fa;
} 