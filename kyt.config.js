// Base kyt config.
// Edit these properties to make changes.
const path = require('path');

module.exports = {
  debug: false,
  modifyJestConfig: (baseConfig) => {
    const jestConfig = Object.assign({}, baseConfig);
    jestConfig.setupTestFrameworkScriptFile = path.resolve(__dirname, 'setupTests.js');
    return jestConfig;
  }
}
