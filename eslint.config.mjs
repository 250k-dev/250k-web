import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
     
      "react-hooks/incompatible-library": "off",
    },
  },
];

export default eslintConfig;
