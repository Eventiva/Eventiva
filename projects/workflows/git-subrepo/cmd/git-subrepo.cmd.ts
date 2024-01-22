// projects/workflows/git-subrepo/cmd/git-subrepo.cmd.ts

import { Command } from 'commander';
import { executeShellCommand } from '../../utils/shell';

// Add the --force option to the subrepo pull command
const subrepoPullCommand = new Command('pull')
  .option('--force', 'Force the pull operation')
  .action(async (options) => {
    const forceFlag = options.force ? '--force' : '';
    await executeShellCommand(`git subrepo pull ${forceFlag}`);
  });

// Export the subrepo pull command
export { subrepoPullCommand };
