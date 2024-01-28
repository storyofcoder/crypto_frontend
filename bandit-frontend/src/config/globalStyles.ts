import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* prettier-ignore */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  
  html {
    height: 100%;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 400 !important;
    line-height: 1.6 !important;
    color: ${(p) => p.theme.colors.foreground} !important;
    text-align: left !important;
    background: ${(p) => p.theme.colors.background} !important;
    height: 100%;
    box-sizing: border-box;
  }
  
  a{
    text-decoration: none !important;
    color: ${(p) => p.theme.colors.foreground};
    
    &:hover{
      color: ${(p) => p.theme.colors.foreground};
    }
  }

  :root {
    --lightGrey100: #FAFAFB;
    --lightGrey200: #F5F6F7;
    --lightGrey300: #EEEFF2;
    --lightGrey400: #E2E4E8;
    --lightGrey500: #CACDD5;
    --lightGrey600: #B2B7C2;
    --lightGrey700: #A4A9B6;
    --lightGrey800: #959CAB;
    --lightGrey900: #8C93A3;    
    
    // baseColors
    --failure: #ED4B9E;
    --primary: #1f3ca6;
    --primaryBright: #5e66d8;
    --primaryDark: #001776;
    --secondary: #7B7FF5;
    --success: #01B652;
    --error: #DB2438;
    --warning: #FFAD0D;
    --black: #000000;
    --white: #FFFFFF;
    

    --background: #FFFFFF;
    --backgroundDisabled: #E2E4E8;
    --backgroundAlt: #f5f5f5;
    --backgroundAlt2: rgba(255, 255, 255, 0.7);
    --foreground: #000000;
    --border: #eaeaea;
    --cardBorder: #eaeaea;
    --contrast: #191326;
    --dropdown: #F6F6F6;
    --dropdownDeep: #EEEEEE;
    --invertedContrast: #FFFFFF;
    --input: #FFFFFF;
    --inputSecondary: #E2E4E8;
    --tertiary: #EFF4F5;
    --text: #666666;
    --textDisabled: #B2B7C2;
    --textSubtle: #777E90;
    --disabled: #E9EAEB;
    
    //components
    --header-border-bottom: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
    --header-background: rgba(255,255,255,0.5);
    
    //shadows
    --shadow-small: 0 5px 10px rgba(0,0,0,.12);
    --shadow-medium: 0 8px 30px rgba(0,0,0,.12);
    --shadow-large: 0 30px 60px rgba(0,0,0,.12);
  }

  [data-theme='dark'] {
    --darkGrey100: #747C90;
    --darkGrey200: #656E85;
    --darkGrey300: #5C657D;
    --darkGrey400: #525C76; 
    --darkGrey500: #49536E;
    --darkGrey600: #3A4662;
    --darkGrey700: #2C3857;
    --darkGrey800: #192648;
    --darkGrey900: #0F1D40;

    // baseColors
    --failure: #ED4B9E;
    --primary: #1f3ca6;
    --primaryBright: #5e66d8;
    --primaryDark: #001776;
    --secondary: #7B7FF5;
    --success: #01B652;
    --error: #FF3236;
    --warning: #FFAD0D;
    --black: #000000;
    --white: #FFFFFF;
    

    --secondary: #9A6AFF;
    --background: #010409;
    --backgroundDisabled: #3c3742;
    --backgroundAlt: #0D1117;
    --backgroundAlt2: rgba(39, 38, 44, 0.7);
    --foreground: #ffffff;
    --border: #333;
    --cardBorder: #333;
    --contrast: #FFFFFF;
    --dropdown: #1E1D20;
    --dropdownDeep: #100C18;
    --invertedContrast: #191326;
    --input: #161b22;
    --inputSecondary: #30363d;
    --primaryDark: #0098A1;
    --tertiary: #353547;
    --text: #888888;
    --textDisabled: #666171;
    --textSubtle: #C3C5CD;
    --disabled: #524B63;
    
    
    //components
    --header-border-bottom: inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
    --header-background: rgba(1, 4, 9,0.5);

    --shadow-small: 0 2px 4px rgba(255,255,255,.12);
    --shadow-medium: 0 8px 30px rgba(255,255,255,.12);
    --shadow-large: 0 30px 60px rgba(255,255,255,.12);
  }
  
  

  .ant-layout{
    background: transparent !important;
  }
  .ant-layout-header{
    background: transparent !important;
  }

  .header--logo {
    margin: 0 !important;
    margin-right: 30px !important;
  }

  .ant-modal-content {
    border-radius: 10px !important;
    background-color: var(--backgroundAlt);
    color: var(--foreground);
    box-shadow: var(--shadow-small);
  }
  
  .ant-modal-close-icon{
    path{
      fill:var(--foreground);
    }
  }
  
  .ant-popover {
    z-index: 1052 !important;
  }

  .ant-modal-wrap{
  z-index: 1050 !important;
  }
  .ant-modal-mask{
    z-index: 1050 !important;
  }

  .ant-popover-inner-content {
    padding: 0px !important;
    padding-bottom: 0px !important;
  }

  .ant-popover-inner {
    border-radius: 12px !important;
  }
  .ant-popover-title {
    border-bottom: none !important;
  }
  .ant-modal-wrap,
  .ant-modal-mask {
    // z-index: 1051 !important;
  }

  ant-tabs-tab-btn {
    color: #9e9c98;
  }

  .ant-tabs-ink-bar {
    background-color: black !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: black !important;
  }
  .ant-tabs-tab-btn {

  }

  .ant-dropdown-menu{
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.colors.shadows.small};
  }

  .margint20{
    margin-top: 20px!important;
  }

  ::-webkit-scrollbar {
    width: 4px !important;
    height: 4px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba('#000000', 0.08) !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: grey !important;
    outline: 1px solid grey !important;
    opacity: 0.2 !important;
    border-radius: 15px !important;
  }


  @-webkit-keyframes pulsate {
    0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
    50% {opacity: 1.0;}
    100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
  }

  @font-face {
    font-family: "Neue Haas Grotesk Display Pro";
    src: url("./assets/fonts/NeueHaasDisplayRoman.ttf");
  }

  @font-face {
    font-family: "Montserrat";
    src: url("./assets/fonts/Montserrat-VariableFont_wght.ttf");
  }
`
