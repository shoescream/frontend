import { createGlobalStyle } from 'styled-components';
import theme from './styles/theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
    font-weight: 400;
    font-family: ${theme.fonts.pretendard} !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  form,
  fieldset,
  img {
    margin: 0;
    padding: 0;
    border: 0;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ul,
  dl,
  dt,
  dd {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  legend {
    position: absolute;
    margin: 0;
    padding: 0;
    font-size: 0;
    line-height: 0;
    text-indent: -9999em;
    overflow: hidden;
  }
  label,
  input,
  button,
  select,
  img {
    vertical-align: middle;
    font-size: 1em;
  }
  input,
  button {
    margin: 0;
    padding: 0;
  }
  input[type='submit'] {
    cursor: pointer;
  }
  button {
    cursor: pointer;
  }
  textarea,
  select {
    margin: 0;
  }
  p {
    margin: 0;
    padding: 0;
    word-break: break-all;
  }
  hr {
    display: none;
  }
  pre {
    overflow-x: scroll;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  a:hover {
    color: #000;
    text-decoration: none;
  }
  *,
  :after,
  :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
