const path = require('path');
const fs = require('@danielcobo/fs');
const micromatch = require('micromatch');

module.exports = async function cloneTemplateAssets(tree, toPath) {
  const globs = ['**', '!**/*.css', '!**/*.scss', '!**/*.js', '!**/*.ts'];
  const assetPaths = micromatch(tree.files, globs, { dot: true });
  return await Promise.all(
    assetPaths.map(async function (assetPath) {
      return fs.clone(assetPath, path.join(toPath, assetPath.replace()));
    })
  );
};
