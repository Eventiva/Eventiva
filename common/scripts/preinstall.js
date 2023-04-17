if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository requires using pnpm as the package manager for scripts to work properly.\u001b[39m\n` + `Please use \u001b[33mnpm install -g pnpm\u001b[39m to install locally or use the preconfigured development containers\n`
  )
  process.exit(1)
}