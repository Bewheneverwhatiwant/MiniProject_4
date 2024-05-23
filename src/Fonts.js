import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body {
    font-family: 'Nanum Gothic', sans-serif;
}

@font-face {
    font-family: 'BMJUA';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

.bmjua-text {
    font-family: 'BMJUA', sans-serif;
}
`;
