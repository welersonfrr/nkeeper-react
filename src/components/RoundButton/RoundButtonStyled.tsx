import styled from "styled-components";

interface RoundButtonProps {
  color: string;
  bgcolor: string;
}

const RoundButtonStyled = styled.button<RoundButtonProps>`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgcolor};
  width: 5rem;
  height: 5rem;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 1rem;
`;

export default RoundButtonStyled;
