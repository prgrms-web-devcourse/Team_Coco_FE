import styled from "@emotion/styled";
import { IoPersonAddSharp } from "react-icons/io5";

export const AddUserButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <StyledButton onClick={onClick} type="button">
      <IoPersonAddSharp size="24" color="718096" />
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
