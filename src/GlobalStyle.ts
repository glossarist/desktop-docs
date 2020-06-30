import { createGlobalStyle } from 'styled-components'

import vFont from 'assets/fonts/Lora.ttf'
import sFont from 'assets/fonts/Lora-Regular.ttf'

import * as theme from './theme/colors'


const app = 'body > #root > :first-child'


export default createGlobalStyle`
  @font-face {
    font-family: LoraRegular;
    src: url('${sFont}');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: Lora;
    src: url('${vFont}');
    font-weight: 400;
    font-style: normal;
  }

  * {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, 'Lucida Grande', Arial, sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;

    height: 100vh;

    display: flex;
    flex-flow: column nowrap;
  }

  body, body > #root, ${app} {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
  }

  ${app} {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  @media screen and (min-width: 800px) {
    ${app} {
      margin-left: 10vw;
      margin-right: 10vw;
    }
  }

  ${app} > header {
    align-self: stretch;
  }

  #{app} > main {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
  }

  a {
    color: ${theme.link.css()};
  }

  img {
    max-width: 100%;
  }
`
