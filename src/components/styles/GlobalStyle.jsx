import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    background-color: rgb(243 245 245);         
    font-family: "Pretendard";
  }
`;

export default GlobalStyle;
