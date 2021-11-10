import { sync } from 'read-pkg-up';
export default {
  packageJson: sync({
    cwd: __dirname
  }).packageJson,
  framework: 'react',
  frameworkPresets: [require.resolve('./framework-preset-react'), require.resolve('./framework-preset-cra'), require.resolve('./framework-preset-react-docgen')]
};