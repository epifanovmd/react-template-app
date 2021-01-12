module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-react"],
  plugins: [
    "@loadable/babel-plugin",
    "@babel/syntax-dynamic-import",
    "react-hot-loader/babel",
  ],
  env: {
    development: {
      plugins: [],
    },
    production: {
      plugins: [],
    },
  },
};
