declare module "react-multi-date-picker" {
  import { FC } from "react";

  export class DateObject {
    format(format?: string): string;
    constructor(date?: Date | string | number);
  }

  export type Value = DateObject | Date | string | number;

  interface DatePickerProps {
    value?: Value | null;
    onChange?: (date: Value) => void;
    calendar?: any;
    locale?: any;
    minDate?: Date;
    format?: string;
    className?: string;
    calendarPosition?: string;
  }

  const DatePicker: FC<DatePickerProps>;
  export default DatePicker;
}

declare module "react-date-object/calendars/persian" {
  const persian: any;
  export default persian;
}

declare module "react-date-object/locales/persian_fa" {
  const persian_fa: any;
  export default persian_fa;
} 