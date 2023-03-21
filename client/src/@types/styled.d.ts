import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string,
      primary: {
        lighter: string,
        light: string,
        main: string,
        dark: string,
      },
      gray: {
        100: string,
        200: string,
        900: string,
      },
      danger: {
        light: string,
        main: string,
        dark: string
      },
      success: {
        main: string
      }
    }
  }
}
