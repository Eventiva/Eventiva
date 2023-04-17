# EVENTIVA

## Index

<!-- toc -->

- [EVENTIVA](#eventiva)
  - [Index](#index)
  - [Introduction](#introduction)
  - [Why do we exist?](#why-do-we-exist)
  - [Why open-source?](#why-open-source)
  - [How to get support 👨‍👩‍👧‍👦](#how-to-get-support-)
  - [Contributing](#contributing)
    - [Backlog](#backlog)
    - [Running Locally \& Developing](#running-locally--developing)
      - [prerequisites](#prerequisites)
      - [Using Rush](#using-rush)
        - [1. Avoid certain commands in a Rush repo](#1-avoid-certain-commands-in-a-rush-repo)
        - [2. If you suspect your install is corrupted...](#2-if-you-suspect-your-install-is-corrupted)
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

### Backlog

Our backlog can be found on either our [Github Project](https://github.com/orgs/Resnovas/projects/12)

### Running Locally & Developing

#### prerequisites

We use [`@microsoft/rush`](https://rushjs.io/pages/developer/new_developer/) and highly suggest you setup [`Tab Completion`](https://rushjs.io/pages/developer/tab_completion/)!

You can choose one of the following methods to get your development platform configured

First Method:
 - `npm install` - this will install the main utilities we use
 - Follow the ` @microsoft/rush` \(https://rushjs.io/pages/developer/new_developer/\) speccification for development

Second Method:
 - Simply open the github `.devcontainer` which will auto-install all the needed components and extensions

\[Under development\]

#### Using Rush

Before we get started, a couple important points to keep in mind:

##### 1. Avoid certain commands in a Rush repo

Rush optimizes by installing all of your dependency packages in a central folder, and then uses [symlinks](https://en.wikipedia.org/wiki/Symbolic_link) to create the "node_modules" folder for each of your projects.

**Avoid using package manager commands that install/link dependencies.** For example, `npm run` will work fine, but these commands will get confused by Rush's symlinks: `npm install`, `npm update`, `npm link`, `npm dedupe`, etc. (The same goes for other package managers: Avoid commands such as `pnpm install` or `yarn install`.) If you want to use those commands, first run `rush unlink` to delete the symlinks created by Rush.

If you use `git clean -dfx` to clean up your folder, be aware that it handles symlinks poorly. To avoid trouble, always run `rush unlink` before using `git clean -dfx`.

Afterwards you can run `rush update` to recreate the symlinks. (There is a standalone `rush link` command, but it's rarely needed.)

##### 2. If you suspect your install is corrupted...

Rush's package management commands are "incremental", which means they save time by skipping steps that appear to be unnecessary. Since Rush runs in automated build environments, we have many safeguards to ensure these checks are accurate. However when debugging or tinkering with packages on your local machine, sometimes your NPM "node_modules" folder can get into a bad state, causing strange errors.

If you suspect your install is corrupted, try running `rush update --purge`. This will force a full reinstall of your packages, and usually get you back into a good state.

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
