const { execSync } = require("child_process");

const run = async (wsdir) => {
  const bitVersion = "0.2.8"; // Leave empty for latest version
  await exec("npm i -g @teambit/bvm");
  await exec(`bvm install ${bitVersion} --use-system-node`);
  process.env.PATH = `${process.env.HOME}/bin:` + process.env.PATH; // This step may change depending on your CI runner

  execSync("bit install", { cwd: wsdir, shell: "/bin/bash" });
};

module.exports = run;
