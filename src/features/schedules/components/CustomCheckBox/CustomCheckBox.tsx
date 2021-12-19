import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Checkbox = styled.div<{ checked: boolean; isLoading: boolean }>`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  background: ${({ checked }) => (checked ? "#29bedb" : "transparent")};
  border: ${({ isLoading }) => (isLoading ? "none" : "3px solid #29bedb")};
  border-radius: 4px;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

const StyledText = styled.div<{ checked: boolean }>`
  display: "inline-block";
  text-decoration: ${({ checked }) => (checked ? "line-through" : "")};
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
      <Checkbox checked={checklist.checked} isLoading={checklist.isLoading}>
        <HiddenCheckbox
          id={`cb-${checklist.id}`}
          type="checkbox"
          onChange={onChange}
          checked={checklist.checked}
          disabled={checklist.isLoading}
        />
        {checklist.isLoading && <Spinner size="xs" color="cyan.500" mb="1" />}
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
