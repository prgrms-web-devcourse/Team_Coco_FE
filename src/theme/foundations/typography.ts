import { css } from "@emotion/react";

export const typography = {
  fonts: {
    heading: "Noto Sans KR",
    body: "Noto Sans KR",
  },
};

export const fontsStyle = css`
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 100;
    src: local("Noto Sans KR"),
      url("/fonts/NotoSansKR-Light.otf") format("truetype");
    font-display: swap;
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: normal;
    src: local("Noto Sans KR"),
      url("/fonts/NotoSansKR-Regular.otf") format("truetype");
    font-display: swap;
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    src: local("Noto Sans KR"),
      url("/fonts/NotoSansKR-Medium.otf") format("truetype");
    font-display: swap;
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: bold;
    src: local("Noto Sans KR"),
      url("/fonts/NotoSansKR-Bold.otf") format("truetype");
    font-display: swap;
  }
`;
