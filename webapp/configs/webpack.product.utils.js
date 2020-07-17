const fs = require('fs');
const { join } = require('path');

function getCloudbeaverDeps(package) {
  if (!package.dependencies) {
      return [];
  }

  return Object.keys(package.dependencies)
      .filter(dependency => /@cloudbeaver\/(.*?)/.test(dependency))
}

function scanCloudbeaverDeps(package) {
  const deps = new Set();
  const list = getCloudbeaverDeps(package);

  while (list.length) {
      const dependency = list.shift();

      if (!deps.has(dependency)) {
          list.push(...getCloudbeaverDeps(require(join(__dirname, '../node_modules', dependency, 'package.json'))))
      }

      deps.add(dependency);
  }

  return Array.from(deps.keys())
}

module.exports = function getAssets(package, to) {
  const patterns = scanCloudbeaverDeps(package)
      .map(dependency => ({ from: join(__dirname, '../node_modules', dependency, 'public'), to, force: true }))
      .reverse();

  patterns.push({ from: './public', to, force: true });

  return patterns.filter(pattern => fs.existsSync(pattern.from))
}