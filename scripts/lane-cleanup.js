const { execSync } = require("child_process");

const run = (org, scope, lane, wsdir) => {
  try {
    execSync(`bit lane remove ${org}.${scope}/${lane} --remote --silent --force`, {
      cwd: wsdir,
      shell: "/bin/bash",
    });
  } catch (error) {
    console.error(
      `Error while removing bit lane: ${error}. Lane may not exist`
    );
  }
};

module.exports = run;
