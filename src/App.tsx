import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Div = styled.div`
  color: white;
`;

const App = () => {
  return (
    <Div
      css={css`
        background-color: black;
      `}
    >
      Hello World
    </Div>
  );
};

export default App;
