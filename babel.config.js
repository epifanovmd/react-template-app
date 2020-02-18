module.exports = {
  plugins: ["@loadable/babel-plugin"],
  env: {
    development: {
      plugins: [
        [
          "babel-plugin-styled-components",
          {
            displayName: true,
          },
        ],
      ],
    },
    production: {
      plugins: [
        [
          "babel-plugin-styled-components",
          {
            displayName: false,
          },
        ],
      ],
    },
  },
};
