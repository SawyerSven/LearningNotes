"use strict";
const chalk = require("chalk"); // 用于在命令行中输出彩色信息
const semver = require("semver"); // 获取node的语义版本
const shell = require("shelljs"); // 全平台的Unix shell命令
const packageConfig = require("../package.json");

function exec(cmd) {
  //执行命令
  return require("child_process")
    .execSync(cmd)
    .toString().trim();
}

const versionRequirements = [
  {
    name: "node",
    currentVersion: semver.clean(process.version), //clean用于去掉版本号前面的v
    versionRequirements: packageConfig.engines.node
  }
];

if (shell.which("npm")) {
  versionRequirements.push({
    name: "npm",
    currentVersion: exec("npm --version"),
    versionRequirements: packageConfig.engines.npm
  });
}

module.exports = function() {
  const warnings = [];

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i];
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirements)) {
      //对比当前版本是否符合版本需求
      warning.push(
        mod.name +
          ":" +
          chalk.red(mod.currentVersion) +
          "should be" +
          chalk.green(mod.versionRequirements)
      );
    }
  }

  if (warnings.length) {
    console.log("");
    console.log(chalk.yellow("为了良好的使用本项目，建议升级一下模块:"));
    console.log();

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      console.log(" " + warning);
    }

    console.log();
    process.exit(1);
  }
};
