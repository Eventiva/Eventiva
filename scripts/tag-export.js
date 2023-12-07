const { execSync } = require("child_process");

const run = (wsdir) => {
  execSync('bit tag -m "CI" --build', { cwd: wsdir, shell: "/bin/bash" }); // add --persist flag for soft tagging workflow
  execSync("bit export", { cwd: wsdir, shell: "/bin/bash" });
};

module.exports = run;
