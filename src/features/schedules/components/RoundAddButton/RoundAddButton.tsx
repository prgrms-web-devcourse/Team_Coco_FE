import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { IoAdd } from "react-icons/io5";

type RoundButtonWithIconProps = PropsWithChildren<{
  onClick: React.MouseEventHandler;
}>;

export const RoundAddButton = (props: RoundButtonWithIconProps) => {
  return (
    <StyledButton onClick={props.onClick} type="button">
      <IoAdd size="24" color="718096" />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  background-color: #e2e8f0;
  width: 3rem;
  height: 3rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
