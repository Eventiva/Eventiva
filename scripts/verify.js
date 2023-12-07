const { execSync } = require("child_process");

const run = (wsdir) => {
  execSync("bit status --strict", { cwd: wsdir, shell: "/bin/bash" });
  execSync("bit build", { cwd: wsdir, shell: "/bin/bash" });
};

module.exports = run;
