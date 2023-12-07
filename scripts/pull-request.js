const { execSync } = require("child_process");

const run = (org, scope, lane, wsdir) => {
  execSync("bit status --strict", { cwd: wsdir, shell: "/bin/bash" });
  execSync(`bit lane create ${lane}`, { cwd: wsdir, shell: "/bin/bash" });
  execSync('bit snap -m "CI" --build', { cwd: wsdir, shell: "/bin/bash" });

  try {
    execSync(`bit lane remove ${org}.${scope}/${lane} --remote --silent`, {
      cwd: wsdir,
      shell: "/bin/bash",
    });
  } catch (error) {
    console.error(
      `Error while removing bit lane: ${error}. Lane may not exist`
    );
  }
  
  execSync("bit export", { cwd: wsdir, shell: "/bin/bash" });
};

module.exports = run;
