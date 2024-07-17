/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-1": "0px 2px 4px -2px #0000000D",
        "custom-2": "0px 4px 6px -1px #0000001A",
      },
      fontSize: {
        "custom-18": [
          "18px",
          {
            lineHeight: "27px",
          },
        ],
        "custom-12": [
          "12px",
          {
            lineHeight: "18px",
          },
        ],
        "custom-14": [
          "14px",
          {
            lineHeight: "14px",
          },
        ],
        "custom-16": [
          "16px",
          {
            lineHeight: "20px",
          },
        ],
        "custom-24": [
          "24px",
          {
            lineHeight: "36px",
          },
        ],
      },
    },
  },
  plugins: [],
};
