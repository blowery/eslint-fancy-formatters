const _ = require("lodash");
const path = require("path");
const url = require("url");

module.exports = function(results) {
  const urlBase = process.env.URL_BASE;
  results
    .filter(result => result.errorCount + result.warningCount)
    .forEach(result => {
      const relativePath = path.relative(process.cwd(), result.filePath);
      const errorsByRule = _.groupBy(result.messages, "ruleId");
      const ruleMsg = _.reduce(
        errorsByRule,
        (acc, value, key) => {
          return acc + "\n\t" + `${key}: ${value.length}`;
        },
        ""
      );
      const message = urlBase
        ? `- [ ] [${relativePath}](${url.resolve(
            urlBase,
            relativePath
          )}) ${ruleMsg}`
        : `- [ ] ${relativePath}`;

      console.log(message);
    });
};
