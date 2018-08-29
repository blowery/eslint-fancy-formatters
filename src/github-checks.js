const _ = require('lodash');

module.exports = function (results) {
  results.filter(result => result.errorCount + result.warningCount).forEach(result => {
    const relativePath = result.filePath.replace('/Users/blowery/src/a8c/wp-calypso/', '');
    const errorsByRule = _.groupBy(result.messages, 'ruleId');
    const ruleMsg = _.reduce(errorsByRule, (acc, value, key) => {
      return acc + '\n\t' + `${key}: ${value.length}`;
    }, '');
    console.log(`- [ ] [${relativePath}](https://github.com/Automattic/wp-calypso/blob/master/${relativePath}) ${ruleMsg}`);
  });
}