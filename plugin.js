module.exports = function ({ addBase }) {
  addBase({
    "html, body": {
      fontFamily: '"Cairo", sans-serif !important',
    },
    "*": {
      letterSpacing: "-0.5px",
      lineHeight: "120% !important",
    },
  });
};
