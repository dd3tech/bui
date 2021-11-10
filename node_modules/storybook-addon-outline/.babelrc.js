module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  env: {
    esm: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
      ],
    },
  },
};
