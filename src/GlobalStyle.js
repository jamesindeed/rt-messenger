import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --primary-color: #4a536b;
  --primary-color-alpha: #aed6dc;
  --primary-color-beta: #ff9a8d;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#root {
  height: 100%;
}
`;

export default GlobalStyle;

// export const Container = styled.div`
//   z-index: 1px;
//   width: 100%;
//   max-width: 1300px;
//   margin: 0 auto;
//   padding: 0 50px;

//   @media screen and (max-width: 991px) {
//     padding: 0 30px;
//   }
// `;

export const Button = styled.button`
  border-radius: 4px;
  background: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  padding: 0.7rem 1.2rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease;

  &::hover {
    background: var(--primary-color-beta);
    /* content: "◀"; */
  }
`;
