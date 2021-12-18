import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Checkbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 3px solid #29bedb;
  background: ${({ checked }) => (checked ? "#29bedb" : "transparent")};
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledText = styled.div<{ checked: boolean }>`
  text-decoration: ${({ checked }) => (checked ? "line-through" : "")};
  display: "inline-block";
`;

type CheckboxProps = PropsWithChildren<{
  checklist: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>;

export const CustomCheckbox = ({
  checklist,
  onChange,
  ...rest
}: CheckboxProps) => {
  return (
    <CheckboxContainer htmlFor={`cb-${checklist.id}`} {...rest}>
      <Checkbox checked={checklist.checked}>
        <HiddenCheckbox
          id={`cb-${checklist.id}`}
          type="checkbox"
          onChange={onChange}
          checked={checklist.checked}
        />
        {checklist.checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10px"
            height="10px"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
        )}
      </Checkbox>
      <StyledText checked={checklist.checked}>{checklist.content}</StyledText>
    </CheckboxContainer>
  );
};
