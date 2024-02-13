# Changelog

## [0.1.2](https://github.com/Eventiva/Eventiva/compare/eventiva-v0.1.1...eventiva-v0.1.2) (2024-02-12)


### Features

* **runtime-options:** add runtime-options module ([d247a4b](https://github.com/Eventiva/Eventiva/commit/d247a4ba98605277f10f6cebdd6d24545e8face5))


### Bug Fixes

* **discordjs.node.runtime.ts:** add null checks before binding message method in registerCommands method ([85c6d01](https://github.com/Eventiva/Eventiva/commit/85c6d01abdba2377fe7feb3d8cbaafc27e0337a5))
* **discordjs.node.runtime.ts:** add null checks before returning defaultConfig values to handle missing environment variables ([85c6d01](https://github.com/Eventiva/Eventiva/commit/85c6d01abdba2377fe7feb3d8cbaafc27e0337a5))
* **discordjs.node.runtime.ts:** add null checks before returning event and command in getEventByName and getCommandByName methods ([85c6d01](https://github.com/Eventiva/Eventiva/commit/85c6d01abdba2377fe7feb3d8cbaafc27e0337a5))
* **discordjs.node.runtime.ts:** comment out unnecessary log statements in registerLocale and registerLocales methods ([85c6d01](https://github.com/Eventiva/Eventiva/commit/85c6d01abdba2377fe7feb3d8cbaafc27e0337a5))
* **generator:** update import path for GeneratorOptions in generator.ts file ([69c1d99](https://github.com/Eventiva/Eventiva/commit/69c1d99b29d52bc884846860a6bf4ad565134cd8))
* **generator:** update import paths for RuntimeOptions in default-runtimes.ts and aspect-runtime.ts ([64ce041](https://github.com/Eventiva/Eventiva/commit/64ce041fedaea018b98070247ec8e7d6459f3efb))
* **logger.ts:** make logger property required in Logger type to ensure it is always present ([da5a6e4](https://github.com/Eventiva/Eventiva/commit/da5a6e4ec33c452c5917815162aeffb9f32bd2ba))
* **logging.node.runtime.ts:** update getLogger method to throw an error if logger for specified module is not found ([da5a6e4](https://github.com/Eventiva/Eventiva/commit/da5a6e4ec33c452c5917815162aeffb9f32bd2ba))
* **logging.node.runtime.ts:** update registerLogger method to accept Partial&lt;Logger&gt;[] instead of Logger[] to allow for optional properties in Logger objects ([da5a6e4](https://github.com/Eventiva/Eventiva/commit/da5a6e4ec33c452c5917815162aeffb9f32bd2ba))
* **management-changelog.yml:** add the --build flag to the bit tag command to trigger a build after tagging the release ([61c1f6a](https://github.com/Eventiva/Eventiva/commit/61c1f6a4ebca38e4ed91fad17ab30719fdb5d973))

## [0.1.1](https://github.com/Eventiva/Eventiva/compare/eventiva-v0.1.0...eventiva-v0.1.1) (2024-02-12)


### Features

* **chore-develop-nightly.yml:** add nightly workflow to automatically merge changes from develop branch to main branch on a daily basis ([7937ee2](https://github.com/Eventiva/Eventiva/commit/7937ee2b6e2d73d1c5245c3e6e3076e8d229a836))
* **management-changelog.yml:** add Bit initialization step to initialize Bit for the workflow ([5ae39dc](https://github.com/Eventiva/Eventiva/commit/5ae39dc8e85173894b851816066bdf356329c7f0))


### Bug Fixes

* **chore-subrepo-push.yml:** update the version of the 'Harden Runner' action to v2.6.1 to ensure the latest security fixes are applied ([0ba507b](https://github.com/Eventiva/Eventiva/commit/0ba507b5cab27fd5fbef6185a237e260cfade366))
* **components-pull-request.yml:** move the initialization of Bit before resolving component packages to ensure proper setup ([c4a76bd](https://github.com/Eventiva/Eventiva/commit/c4a76bde3697b99afa11e79e8e168da4975b6ef9))
* **management-changelog.yml:** fix command to extract tag_name from steps.release.outputs using jq ([3de8155](https://github.com/Eventiva/Eventiva/commit/3de815529d98ea271fe43811ddf6692d56d53868))
* **management-changelog.yml:** fix variable name for project to improve clarity and readability ([3de8155](https://github.com/Eventiva/Eventiva/commit/3de815529d98ea271fe43811ddf6692d56d53868))
* **workflows:** update branch name from "develop" to "main" in management-changelog.yml and management-cla.yml workflows to align with the default branch name change ([a6e0b6e](https://github.com/Eventiva/Eventiva/commit/a6e0b6e8d91901870b2f0d3e0fe2fdaa58a41cd5))

## 0.1.0 (2024-02-11)


### Features

* Add .all-contributorsrc and contributors.json ([62a9feb](https://github.com/eventiva/eventiva/commit/62a9feb5a776fc31a3c49703fb5db0482e0df73f))
* Add [@mohsinalimat](https://github.com/mohsinalimat) as a contributor ([08016a6](https://github.com/eventiva/eventiva/commit/08016a6aa2885910c6f15d3c26004fb297ffb268))
* add Citizen Code of Conduct to promote inclusivity and provide guidelines for community behavior ([2724918](https://github.com/eventiva/eventiva/commit/2724918e5fc4325d17f7e66330914c9e43c8d932))
* Add DefaultLogging aspect and configuration files ([0e2e354](https://github.com/eventiva/eventiva/commit/0e2e354e5cdcd79c5e13c7f393639fe3b0be7783))
* Add Discord workflow and public partnerships documentation ([10eb491](https://github.com/eventiva/eventiva/commit/10eb49146ee8ca02a1bc5cf8ee2d5fba78b9a53c))
* add env.jsonc file to standardize component dependencies ([5c105ea](https://github.com/eventiva/eventiva/commit/5c105ead87bca3a7bad8265a2053b3cad177ccd6))
* add functions for setting up the database, initializing variables, performing setup tasks, and calling them after installation ([c31bd8a](https://github.com/eventiva/eventiva/commit/c31bd8aec8ee3b2c987991c88f6ee14096af552d))
* Add harmony-bot-generators aspect and component-id package ([a07adb6](https://github.com/eventiva/eventiva/commit/a07adb613bd191f2e1b895b7936d482b028060ce))
* Add HarmonyBotGenerators module and related files ([70d3262](https://github.com/eventiva/eventiva/commit/70d326278f70eeb8a8f19d7023bf8b1c53ac1a89))
* add license header and author information to the file ([0d1e91f](https://github.com/eventiva/eventiva/commit/0d1e91fd55fe1891f94fc5df3f70e84b09ef632a))
* add new Discord Command doctype and related files ([3c8eaaf](https://github.com/eventiva/eventiva/commit/3c8eaafa28ec2bb8b6adfb9e20cabeb00274a806))
* add new doctype 'License' with fields 'license_type', 'license_issued_date', and 'license_expiry_date' to support licensing functionality in the gaming module ([5ad4a29](https://github.com/eventiva/eventiva/commit/5ad4a292fea0ea98204aba6f6dcf2314b354249d))
* add new module 'Civilian' to the gaming project ([5c5f9a9](https://github.com/eventiva/eventiva/commit/5c5f9a9a1e1fbb7ad4d2dddbded39558c62afd73))
* Add PingCommand aspect to Harmony platform ([bb3fd80](https://github.com/eventiva/eventiva/commit/bb3fd80bf8239110b30f89ebc5e4aa73df83d597))
* Add support and ping commands, interaction event handling ([5b2cb68](https://github.com/eventiva/eventiva/commit/5b2cb68f9cc906c8fd402c2e1f68943f955c3a57))
* add unit tests for install.py functions to ensure their success ([7dda8b7](https://github.com/eventiva/eventiva/commit/7dda8b7afac29f94c94de113bfadf0f1b93f4f7a))
* Add workflow telemetry for better monitoring ([a4987e3](https://github.com/eventiva/eventiva/commit/a4987e3c6879b7aa0fd5e4dfa854dda71ff46e20))
* bit todo manager ([2e3cbe4](https://github.com/eventiva/eventiva/commit/2e3cbe4b205b19aa2dc7cba0edeb971e73c689b3))
* commit formatting ([3f90f2e](https://github.com/eventiva/eventiva/commit/3f90f2e4fe5a0a3830f551957660a586e44bfa74))
* discord env ([1944331](https://github.com/eventiva/eventiva/commit/1944331e665ff63739d1863d875a0659e740f88f))
* discord module ([e862a60](https://github.com/eventiva/eventiva/commit/e862a608d076314b232daf6f88f5def176789540))
* git subrepo push projects/modules/control_centre ([7a41ad5](https://github.com/eventiva/eventiva/commit/7a41ad55fb85b5f1b3b0f454b315662ce2d4e76c))
* Implement git-subrepo commands and helpers ([1628839](https://github.com/eventiva/eventiva/commit/16288396a0371e21f1dbdfab0ae6e338c0326121))
* Overhaul Discord integration module ([44eb9f6](https://github.com/eventiva/eventiva/commit/44eb9f6bc0c15097b1972a21dbe00fb638332850))
* reinit .github workflows and templates ([abb1137](https://github.com/eventiva/eventiva/commit/abb11374fd96077f61a5d7f58c91585d0c019df8))
* release please process ([#320](https://github.com/eventiva/eventiva/issues/320)) ([1c38119](https://github.com/eventiva/eventiva/commit/1c381194c332e6142c3ccfcda630fcea494efb4b))
* Remove banner image and update public partnerships channel ([5527fd6](https://github.com/eventiva/eventiva/commit/5527fd6904ba10a031b4e8a94df1548cd4597263))
* Setup discord event management ([5ff5ada](https://github.com/eventiva/eventiva/commit/5ff5ada0ea65eaff1fe83e6478ba29a627ff6513))
* standardize component versions ([e5ec278](https://github.com/eventiva/eventiva/commit/e5ec278eb20ffbf7c09412cede7addfcd0dca127))
* Update Bit envs, outdated (direct) external dependencies, and workspace components according to the defined CI task parameter --allow ([03f9279](https://github.com/eventiva/eventiva/commit/03f9279ebc9f77b8c36486355b43ec291b948afe))
* Update codebase visualization ([e62c61b](https://github.com/eventiva/eventiva/commit/e62c61bb86be9a11b41746bc52d99f9925909cc7))
* update techstack.yml ([c42f4d9](https://github.com/eventiva/eventiva/commit/c42f4d931a05bad5b56de22bd56961304dee5fcc))
* update version of root project to 0.0.0 and update versions of subprojects to 1.0.0 to reflect changes made in the codebase ([723eab8](https://github.com/eventiva/eventiva/commit/723eab8cb062c1d47b7935bff432c2cd6f1234fb))
* Updated .github/workflows/cla.yml ([2219530](https://github.com/eventiva/eventiva/commit/2219530af0ceb9f02c586626e72b77fcd82cb114))
* Updated projects/workflows/environments/disc ([cfcbe1f](https://github.com/eventiva/eventiva/commit/cfcbe1f9b5f6622deafbb20630959ba86b6c5871))
* work on build tasks ([36b9e41](https://github.com/eventiva/eventiva/commit/36b9e41a04173ab6e69dd352e442d2bc4b0dc673))


### Bug Fixes

* change execSync to spawnSync to improve performance and prevent shell injection vulnerabilities ([87e13d6](https://github.com/eventiva/eventiva/commit/87e13d6e7039a728ce863a3927eff17be5471308))
* export Logger and Log types from logger.ts to enable usage in other modules ([aa328f4](https://github.com/eventiva/eventiva/commit/aa328f4b60b80caa714fd404371e6bd51742a37b))
* fix file paths in the 'run' commands to correctly reference the scripts directory ([99a18c1](https://github.com/eventiva/eventiva/commit/99a18c1138e3fbdeb6c0ecfafcfd4b8d47c60253))
* fix formatting of companies list to improve readability ([63270d9](https://github.com/eventiva/eventiva/commit/63270d96191eba315867b3d2ad19ee4b20302044))
* fix import formatting for better readability ([f6335f3](https://github.com/eventiva/eventiva/commit/f6335f3093f3dc990203bb42ce56f2efbac86e82))
* fix import formatting for install_fixtures function ([5025eb5](https://github.com/eventiva/eventiva/commit/5025eb5e37fb19da7e1dd31e83c257bfa66df526))
* fix import statements and formatting to improve code readability ([7ba6a5b](https://github.com/eventiva/eventiva/commit/7ba6a5b999f029bb42a6fd0feaadcb9eeee3f2f4))
* fix import statements and remove unused code ([086edcb](https://github.com/eventiva/eventiva/commit/086edcb422e23923a8d3ed423153dc0f71b7fcb7))
* fix import statements and type annotations to improve code readability and maintainability ([2bfcf05](https://github.com/eventiva/eventiva/commit/2bfcf053b28cfab0c1b9efdca7664bccc5f0e887))
* import missing dependencies and fix typo in comment ([f4e2130](https://github.com/eventiva/eventiva/commit/f4e2130581b14284e4d2c29ddd1cabaeea451eff))
* make registerEvent method asynchronous to properly handle event execution ([94e8d95](https://github.com/eventiva/eventiva/commit/94e8d95ffcf77cb5492854f8518af3fe4083b94f))
* remove unnecessary branch argument from git subrepo pull command to simplify the workflow ([829132c](https://github.com/eventiva/eventiva/commit/829132c6a79459b93869372ce06efbb8b5f5636d))
* update Code of Conduct link ([ec599bc](https://github.com/eventiva/eventiva/commit/ec599bc850474f3ef998eb55cd0068683c67ada2))


### Reverts

* Remove discord channel tool ([b1cd154](https://github.com/eventiva/eventiva/commit/b1cd154d2d0cfd3b63c6974ae7050fc0a8392046))
* Remove redundant GitHub config and templates ([73e383e](https://github.com/eventiva/eventiva/commit/73e383eeb0f4e80531689f91e509428a18f780cf))

## Changelog

Generated by the Eventiva Software Delivery Change Manager.
