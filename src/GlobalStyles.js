import { createGlobalStyle } from "styled-components"
const GlobalStyles = createGlobalStyle`
	*{
		margin:0;
		padding:0;
		box-sizing : border-box;
	}
	*::-webkit-scrollbar {
    display: none;
	}
`
export default GlobalStyles;