import { Input } from "@chakra-ui/react";
import { ko } from "date-fns/locale";
import React, { useState, forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ko", ko);

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

// customDateInput.tsx
const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
  <Input
    placeholder="Description"
    onClick={onClick}
    value={value}
    ref={ref}
    onChange={onChange}
  />
);

// MyForm.tsx
const CustomInput = forwardRef(customDateInput);

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <>
      <ReactDatePicker
        locale="ko"
        selected={value}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
        customInput={<Input />}
      />
    </>
  );
};
