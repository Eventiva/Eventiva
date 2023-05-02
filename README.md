# EVENTIVA

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Resnovas/eventiva?quickstart=1)

## Index

<!-- toc -->

- [EVENTIVA](#eventiva)
  - [Index](#index)
  - [Introduction](#introduction)
  - [Why do we exist?](#why-do-we-exist)
  - [Why open-source?](#why-open-source)
  - [How to get support 👨‍👩‍👧‍👦](#how-to-get-support-)
  - [Contributing](#contributing)
    - [Contributors ✨](#contributors-)
    - [Visualisation of the codebase](#visualisation-of-the-codebase)
    - [Backlog](#backlog)
    - [Running Locally \& Developing](#running-locally--developing)
      - [prerequisites](#prerequisites)
      - [Manual Method](#manual-method)
      - [Codespaces Method (Recommended)](#codespaces-method-recommended)
      - [Devcontainer Method](#devcontainer-method)
      - [Using Rush](#using-rush)
          - [1. Avoid certain commands in a Rush repo](#1-avoid-certain-commands-in-a-rush-repo)
          - [2. If you suspect your install is corrupted...](#2-if-you-suspect-your-install-is-corrupted)
        - [Creating new projects](#creating-new-projects)
        - [Achieving projects](#achieving-projects)
  - [Security](#security)
    - [Security Policy](#security-policy)
      - [Supported Versions](#supported-versions)
      - [Reporting a Vulnerability](#reporting-a-vulnerability)

<!-- tocstop -->

## Introduction

Welcome to the Eventiva repository. Eventiva is an open-source platform for Event Planning and Production logistics. We have created a custom-built directory focused on indexing, marketing and connecting event specialist Vendors, Venues and professionals. We then connected this to our innovative tools for event production planning which include scheduling, itinerary, task management, contact management, warehousing ticket sales, interactive site maps, online and in-person sales solutions, accounting, payroll and human resources.

## Why do we exist?

When surveyed, the industry revealed that over fifty-five percent of events did not have a management tool of any form. The remaining forty percent are split across solutions designed and implemented for office environments. Software like Flock and Excel barely cover the toolset which managers require to be effective in the preproduction sections of their work. While fifty-five percent of events did not have management tools, a full eighty percent of individuals surveyed believed that schedulers, task lists and other management tools would be helpful to their ongoing operations.

## Why open-source?

We believe in the power of community development, while our tools are designed and marketted for event planning, they can be utilised by organisations planning all variations of projects, we believe that through keeping our tools open-source we can connect with amazing developers who can contribute in ways we simply cannot fathom.

## How to get support 👨‍👩‍👧‍👦

For **Features Requests**, **Q&A**, **Show & Tell** and **Discussions** please use **[our discussion page](https://github.com/Resnovas/Eventiva/discussions)** 🚑.

We have a **FAQ** label in our **[discussion page](https://github.com/Resnovas/Eventiva/discussions)** where you can get quick answers, help with debugging weird issues, and general help.

Our extensive **documentation** can be found at **[here](https://github.com/Resnovas/Eventiva)**.

<!-- Contributing -->

## Contributing

Thank you for taking an interst in contributing. We have created development containers (`.devcontainer`) to allow you to jump straight in with coding. Everything is configured and ready to go, all you need to do is use one of the supported platforms: [VSCode](https://code.visualstudio.com/docs/remote/containers) | [Github Codespaces](https://github.com/features/codespaces)

This project utilises the [Smartcloud Project](https://github.com/Resnovas/smartcloud) to automate our workflow, alongside provide templates for issues and pull requests. If you want to learn more about precisely what this workflow accomplishes, please check out the documentation [here](https://github.com/Resnovas/smartcloud). You can find a example Pull Request, [here](https://github.com/Resnovas/eventiva/pull/36) which shows the standard flow for contributors.

For more information on contributing, please read the [contributing guidelines](./contributing.md).

### Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://jonathanstevens.org/"><img src="https://avatars.githubusercontent.com/u/11413796?v=4?s=100" width="100px;" alt="Jonathan S"/><br /><sub><b>Jonathan S</b></sub></a><br /><a href="#business-TGTGamer" title="Business development">💼</a> <a href="https://github.com/Resnovas/eventiva/commits?author=TGTGamer" title="Code">💻</a> <a href="https://github.com/Resnovas/eventiva/commits?author=TGTGamer" title="Documentation">📖</a> <a href="#financial-TGTGamer" title="Financial">💵</a> <a href="#ideas-TGTGamer" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-TGTGamer" title="Research">🔬</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

### Visualisation of the codebase

![Visualization of the codebase](./diagram.svg)

### Backlog

Our backlog can be found on either our [Github Project](https://github.com/orgs/Resnovas/projects/12)

### Running Locally & Developing

#### prerequisites

We use [`@microsoft/rush`](https://rushjs.io/pages/developer/new_developer/) and highly suggest you setup [`Tab Completion`](https://rushjs.io/pages/developer/tab_completion/)!

You can choose one of the following methods to get your development platform configured

#### Manual Method
 - Follow the ` @microsoft/rush` \(https://rushjs.io/pages/developer/new_developer/\) specification for development

#### Codespaces Method (Recommended)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Resnovas/eventiva?quickstart=1)

GitHub Codespaces provides cloud-hosted development environments for any activity - whether it's a long-term project, or a short-term task like reviewing a pull request. You can connect to Codespaces from Visual Studio Code or a browser-based editor that's accessible anywhere. Download the VSCode extension [here](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces).

#### Devcontainer Method
The Dev Container lets you use a Docker container as a full-featured development environment. Whether you deploy to containers or not, containers make a great development environment because you can:

- Develop with a consistent, easily reproducible toolchain on the same operating system you deploy to.
- Quickly swap between different, separate development environments and safely make updates without worrying about impacting your local machine.
- Try out new technologies or clone a copy of a code base without impacting your local setup.


Simply install the [Dev containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), clone the repository to your local device, and choose the [`Open Devcontainer` option](https://code.visualstudio.com/docs/devcontainers/containers).


#### Using Rush

Before we get started, a couple important points to keep in mind:

###### 1. Avoid certain commands in a Rush repo

Rush optimizes by installing all of your dependency packages in a central folder, and then uses [symlinks](https://en.wikipedia.org/wiki/Symbolic_link) to create the "node_modules" folder for each of your projects.

**Avoid using package manager commands that install/link dependencies.** For example, `npm run` will work fine, but these commands will get confused by Rush's symlinks: `npm install`, `npm update`, `npm link`, `npm dedupe`, etc. (The same goes for other package managers: Avoid commands such as `pnpm install` or `yarn install`.) If you want to use those commands, first run `rush unlink` to delete the symlinks created by Rush.

If you use `git clean -dfx` to clean up your folder, be aware that it handles symlinks poorly. To avoid trouble, always run `rush unlink` before using `git clean -dfx`.

Afterwards you can run `rush update` to recreate the symlinks. (There is a standalone `rush link` command, but it's rarely needed.)

###### 2. If you suspect your install is corrupted...

Rush's package management commands are "incremental", which means they save time by skipping steps that appear to be unnecessary. Since Rush runs in automated build environments, we have many safeguards to ensure these checks are accurate. However when debugging or tinkering with packages on your local machine, sometimes your NPM "node_modules" folder can get into a bad state, causing strange errors.

If you suspect your install is corrupted, try running `rush update --purge`. This will force a full reinstall of your packages, and usually get you back into a good state.

##### Creating new projects

\[coming soon\]

##### Achieving projects

To help keep the mono-repository clean, we have added the ability to achieve projects. 

```
rush archive-project --package-name <your_package_name>
```

> restoring your project by `rush unarchive-project --package-name <your_package_name>`

**The automated archive process** 

1. Find project configuration by Rush.js SDK
2. Check whether there are projects depends on target project
3. Run `git clean -xdf` under project folder
4. Create a checkpoint branch with the name `${projectName}-checkpoint-${date}`
5. Update checkpoint branch information in `common/_graveyard/projectCheckpoints.json` file
6. Record project configuration into `rush-metadata.json` file
7. Create a tarball by running `tar -czf <unscoped_package_name>.tar.gz -C <project_folder> .`
8. Move the tarball to `common/_graveyard` folder
9. Remove project config from `rush.json`
10. Delete project folder

**The automated unarchive process** 

1. Find the tarball by `packageName`
2. Extract the tarball by running `tar xf <package_name>.tar.gz`
3. Get project configuration by reading `rush-metadata.json`
4. Remove checkpoint branch information from checkpoint metadata file if it exists
5. Move the code to project folder
6. Restore project configuration into `rush.json`
7. Delete metadata file and tarball

## Security

<details>
    <summary><b>Current Status</b></summary>

### Security Policy

#### Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| < 1.0   | :white_check_mark: |

#### Reporting a Vulnerability



</details>