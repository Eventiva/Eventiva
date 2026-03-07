Ok, so I think this plan @Eventiva/.cursor/plans/eventiva_learnings_and_rebuild_f7373630.plan.md needs converting from just planning to action, but as the next steps. Update the plan file so part A-C of the existing plan are all about planning, and the next sections are about how we actually execute. 

A. We need to add the following information to address the concerns and questions raised by you.

1. So you said the product really needs a bit more defining in the goals. I really want to focus on the ERP toolset, but coming at it from an events focus, so there's a lot of key modules which need adding and creating. The core structure should be all the tools that allow the models to be created, to exist within the database, to hook, to be able to extend each other. Basically the core only provides the framework to allow everything else to function. Everything else, each other model, user interface, api functionality, integration must exist in a "Extension". I really like the way odoo does it's dependencies, and it's "auto-install" functionality, where if all the dependencies listed in the auto-install field in the manifest exist in the server, it automatically installs this additional feature. 

1.1 First module, and most important to get working perfectly is the "Contact" model. It is the base model that will be used for every person, attendee, staff member, user or anything referencing a person. As such it is basically the centre of the events erp. It should exist within a "Contacts" module which is auto-installed on all servers (so just depends on the core)

1.2 The second module that I want to design is the "Helpdesk" module. It provides a good test ground for all of the key components that I want to engineer later. it will require a number of new models to be created and implemented via an extension. It should support the following features: 
1.2.1 Support for multiple helpdesk teams
1.2.1.1 Support for adding multiple helpdesk channels, including email, chat, social media (discord, slack, etc), etc via extensions.
1.2.1.2 Support for adding multiple helpdesk statuses
1.2.1.3 Support for multiple helpdesk tags
1.2.1.4 Support for adding multiple helpdesk categories
1.2.1.5 Support for adding multiple helpdesk priorities
1.2.1.6 Support for adding multiple helpdesk attachments
1.2.1.7 Support for adding multiple helpdesk notes
1.2.1.8 Support for adding multiple helpdesk history
1.2.1.9 Support for adding multiple helpdesk automation
1.2.1.10 Support for adding multiple helpdesk reporting
1.2.1.11 Support for adding multiple helpdesk integrations
1.2.1.12 Support for adding multiple helpdesk integrations
1.2.1.13 Support for adding multiple helpdesk SLAs
1.2.2 It should integrate into the contacts module, which should clearly display all the contact information, should link and track the tickets to the contacts, and should allow the contact's information to be updated from within the helpdesk module. 
1.2.3 It should support full extendability, so that as we add features it can develop better tools for the helpdesk, such as issuing discounts or creating deployments, etc etc. 
1.2.4 It should support knowledge bases, template responses, and should use embedding and vector search tools to provide AI assistance within the helpdesk. 

1.3 The third module I want to build is the discord integration module. This should support creating multiple discord bots, and managing all the channels, roles, users and permissions from discord within the system. it should support creating, responding and interacting with helpdesk tickets from discord, and should clearly demonstrate the extendability features of the system. I also want the discord bots to be extremely configurable so that we can create custom commands and interactions from the ui, which will be stored in the UI as plain text. 

2. You raised some concerns about how I will handle security, including authentication and compliance. So here are the answers to all the questions you raised. 

2.1.1 Authentication - The aim is to make it super easy to maintain and really easy to keep free and open source. So we need to create a solution which utilises the best security we can, without compromising on the ease of use for our community installations (local-host). I think betterauth should be the default authentication provider, and we should look at integrating it with the core. I really want to ensure OAuth, Magic Links and Passkeys work out of the box for everyone, with all admins getting 2fa using email or sms without need for a lot of additional configuration (adding a sms provider api key or something is fine, but we shouldn't force it on everyone).

2.1.2 Encryption - I want encryption to be built into the project from the start, everything that is PPI or GDPR protected must be fully encrypted at rest and in transit. We need to use the best encryption libraries and algorithms available, and we need to ensure that the encryption is transparent to the user. Ideally, I would like to use a 2 key encryption on anything that is stored in the database. The first key would be the server/masterkey, which is used to encrypt the (second) workspace key. The workspace key should be encrypted in such a way that any authenticated backend user can decrypt the data when they have a valid masterkey and authentication token, and once the workspace key has been decrypted, the data can be decrypted using the workspace key. This is a very common pattern in enterprise software, and it is very secure and easy to implement. The masterkey and workspace keys should be generated at creation, using cryptographically secure methods, and only presented to the backend server. It should never be accessible in the UI or frontend. The protection of this key is super important, so we should implement extremely strong code and log protections, which are detailed in 2.1.4.

2.1.3 Secrets - So secrets should be provided in the enviroment via environment variables, and should be stored in the database in a secure way. We should not store any secrets and should not allow them to be exposed in the code or logs. We will implement both Proton Pass CLI and 1Password CLI to manage secrets for developers, and make it really easy to setup. The protection of secrets is super important, so we should implement extremely strong code and log protections, which are detailed in 2.1.4.

2.1.4 Protection - Protecting the secrets is not just important for when the server is running, but also when it is not running. So we need to protect the secrets from being exposed in the code or logs when the server is not running. Therefore, we need to implement strong protections against code injection, cross-site scripting (XSS), and other common attacks. We also need to utilise Effect-ts/config to allow us to create secrets which physically cannot be logged to the console and cannot be accessed outside of the protected enviroments. Authentication, encryption and decryption, and any other security step must be handled by the core modules, and should never be allowed to be handled in a "extension". It must never expose a way to be overwritten or injected. This module must start before everything else, and if it doesn't pass integrety checks, must immediately exit. Integrety checks must be randomised, and unique per a server, and be extremely difficult to bypass. I was thinking either using External attestation or Build-time signing to ensure the integrity of the code.

2.2 GDPR Compliance - As mentioned in 2.1.2, everything should be encrypted at rest and in transit. But I want to take this a step further, and provide full audit logs for all access, alterations and deletions of data. As the data is client owned, the server must exist in the region that the client chose. So if they use the SaaS solution, we should give them a option to choose the region they want the server to be in (if permitted by Neon or other providers). We should also fully support running the datbase locally or connecting their own database to the server, so that they have full control over data residency. 

2.2.1 Audit Logs - The audit logs should show the user who accessed the data, when they accessed it, and what they did. It should keep a record of the original data and the altered data. This should be fully encrypted at rest and in transit, and should be stored in a secure way. The data should only be editable by the core modules, and should never be allowed to be handled in a "extension". It must never expose a way to be overwritten or injected. It should start immediately after the encryption module, before any other modules are allowed to run. Once again, it should implement integrety checks as detailed in 2.1.4.

2.2.2. Deletion compliance - We should also provide a way to search and test all the data for compliance. For instance, in odoo, we can search for every mention of a specific name, email, phone number, address, etc. We should be able to do the same for GDPR compliance. We need to be able to anonymise all data if requested, and we should have GDPR compliant automatic anonymisation of data after a certain period of time. This must include the audit logs, which should anonymise any data stored as the "original" or "altered" data, but never the user who made the alteration or deletion. All of these compliance automations must be handled by the core modules, and should never be allowed to be handled in a "extension". It must never expose a way to be overwritten or injected. It should start immediately after the encryption module, before any other modules are allowed to run. Once again, it should implement integrety checks as detailed in 2.1.4.

2.3 Secrets for contributors - We want to make the system as secret free as possible for contributors. Ideally any "secret" that is needed would be generated at the time of installation, and the contributors should not be running anything using the SaaS version of the product. The only difference between the SaaS and the open source version should be the way it's deployed, e.g. using docker compose or kubernetes for local database deployment, and using neon for the SaaS version.

3. Identity and multi-tenant access - We need to create a way to allow users to access multiple tenants using as single identity. As previously discussed, we will have the cloud SaaS solution as the top level, users should be able to login to this, and SSO into any sub-account (organisation accounts) linked to their main account. Each organisation account should have it's own identity and access to it's own data. Accounts are primarily registered at the organisation level, some users may have cloud accounts, but this primarily would be organisation admin's and account holders. When a user is invited to an organisation or workspace, they should be created as a user within the organisation account with strict permissions for the workspace that they have been invited to. They should always have the option to upgrade their account to a cloud account and link them if they want to manage multiple organisation accounts. Once authenticated, roles, permissions and access should be granted by the core modules dependent on a workspace permission, and should never be allowed to be handled in a "extension". It must never expose a way to be overwritten or injected. It should start immediately after the encryption module, before any other modules are allowed to run. Once again, it should implement integrety checks as detailed in 2.1.4.

3.1 When creating a new organisation account, the user should be able to choose all the key seperation options, like region, database provider and default compliance options. 

4. We should make it clear that this is a greenfield project and we are not needing to protect or reuse any existing code or data. We are starting from scratch and learning from the items described in parts A&B. 

5. The CI for the TDD loop should be powered using Github Actions and AI tools, such as Cursor Automation, we should utilise the functionality within Nx to enhance these workflows. 
5.1 We will have 2 seperate repositories.
5.1.1 The main repository (this one) will contain all the code, all the .d.ts and api contracts for the project. 
5.1.2 The second repository will contain the test code.
5.2 We will have 2 seperate workflows, that must exist to make the TDD loop work.
5.2.1 The first workflow will be the "test creation" workflow. It will pull the definition files from the main repository, during the workflow, and this will allow it to create new test files and test suites on a new branch. This new branch must be named in a manner easy to identify back to the branch on the main repository that generated it. 
5.2.2 The second workflow will be the "test execution" workflow. It will pull the test code from the test repository, during the workflow, and this will allow it to execute the tests against the PR and report the results back to both the test repository and the main repository via linear issues and comments on the PR.

6. Observability - I want to use Effect Logging to handle the metrics and logging functionality. Everything should be built with Tracing, metrics and logging out of the box. Every single function should be cleanly logged and traced, and should track metrics. We should implement the best practices and should fully utilise the logging capabilities within effect-ts. I did a not great implementation of it in the common-crm project, but it was a good starting point which fully integrated with opentelementry. There are better examples of how to do this on the effect github. 

7. Drop the discussion about the "cal.com" features. Right now just focus on the fact that I want a calendar module which can support appointments and bookings. For now, assume we are building it completely ourselves. 

8. Contrinbutor onboarding - I want to keep the barriers super simple. So I want to provide clear guidance, easy to utilise .devcontainers, .github, .cursor, .vscode and such folders. I also want to provide clear guidance on how to use AI tools to help with the development process, and explicity point them to our learnings (part B) folders and our rules folders. These clear guidelines should also document and make easy to install any extensions used during the development process, e.g. nx and @effect/language-service. 


B. I want to discuss how the models will be created. I really like what odoo does that allows you to create models really easily either in code or through their ui. I assume this means that somewhere the code is either being generated, or is being stored in the database. 

I've added the "smartcloud" folder for reference, it has a really cool (I maintain) evaluator functionality, which allows me to define the rules for the automation in config files, and execute complex code workflows based on the configurations built in the config files. I think this is a really cool way to create models, and I want to use it to create the models for the project. I did something really similar in the common-crm project, reporting-manager, which used "transforms" I registered in the "transform manager" module, and then applied them to reports generations. It wasn't the fastest report generation tool, but it was extremely extendable and customisable. 

I basically want to create this same concept again in the eventiva project, but improve it, use effect-ts clustering functionality and better structuring to allow the same concept to be developed directly ontop of effect without the Bit.dev step. 

I think if this is achieved well, I will be able to define models using either config files or directly in the code, making it extremely easy for non-developers to create and modify models, and as the transforms could be registered and applied, if they had code knowledge, they could create their own transforms which had complex logic. 

Transforms is the name used in teh common-crm project, and I think it explains the concept well, but I want to take the transforms to the next level too, allowing them to be used not only in the api, but also to be triggered by events and other functionality. 

C. So lets finally talk about how I want you to go about building this project. 
1. First, I want to clean out the repository. 
1.1. Remove all the existing code within the Eventiva folders, these folders include 
1.1.1. .devcontainers
1.1.2. .github/releases/*
1.1.3. .github/compass.yml
1.1.4. .github/config.json
1.1.5. .github/workflows/components-* (other workflows may need tidying up, but keep any security or non-bit.dev workflows.)
1.1.6. .idea/*
1.1.7. .vscode/*
1.1.8. .jetclient
1.1.9. projects
1.1.10. scripts
1.2. Cleanup the root files and remove anything bit.dev related (.bitmap*)
1.3. Rebuild the project structure using Nx to power the main microservices functionality. 
1.4. Implement Zephyr ui module structure and extensions into the nx project, so we can create multiple ui modules (React Native as primary react flavour)

At this point, we should have a clean project, with a new Nx based microservices monorepo structure, with Zephyr configured and ready to go. We should have already populated linear with issues/features/tasks for the project, and I can start working through the tasks in a logical order. The Key thing is that the repository should be primed and ready to go. 