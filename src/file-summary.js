const _ = require("lodash");
const path = require("path");

module.exports = function(results) {
  const basedir = process.cwd();
  results
    .filter(result => result.errorCount + result.warningCount)
    .forEach(result => {
      const relativePath = path.relative( basedir, result.filePath );
      console.log(
        `${relativePath}: ${result.errorCount}E, ${result.warningCount}W`
      );
    });
  const totalErrors = results.reduce(
    (memo, result) => memo + result.errorCount,
    0
  );
  const totalWarnings = results.reduce(
    (memo, result) => memo + result.warningCount,
    0
  );
  console.log(
    `\nTotal Errors: ${totalErrors}\nTotal Warnings: ${totalWarnings}`
  );
};
