import { Input, InputProps } from "@chakra-ui/react";
import { ko } from "date-fns/locale";
import React, { forwardRef } from "react";
import ReactDatePicker, {
  registerLocale,
  ReactDatePickerProps,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ko", ko);

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onClick, onChange, ...rest }, ref) => {
    return (
      <Input
        onClick={onClick}
        value={value}
        ref={ref}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

export const DatePicker = ({
  selected,
  onChange,
  ...rest
}: ReactDatePickerProps) => {
  return (
    <ReactDatePicker
      locale="ko"
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      customInput={<CustomInput />}
      fixedHeight
      showPopperArrow={false}
      {...rest}
    />
  );
};
