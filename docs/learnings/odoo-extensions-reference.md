# Odoo Extensions Reference (for Eventiva)

## Purpose

Odoo (and climb-group-odoo) are used as **reference** for planning Eventiva extensions. Goal: “Odoo-inspired but type-safe and unified” in TypeScript/Effect. **Do not copy Odoo’s stack** (Python, no type strictness).

## What to take from Odoo

- **Studio and website editors** – Strong UX; document how Odoo achieves this (XML rendering, drag-and-drop, live preview) so we can design something achievable in our stack (e.g. Zephyr + declarative config or a simpler editor).
- **Accounting** – Odoo does accounting well; review the accounting module and document how to achieve similar capabilities. We may simplify first and add depth later; Linear issue for “Accounting extension” should spell this out.
- **Events module** – Good at registrations; otherwise basic. For complex needs, custom modules were required. **climb-group-odoo** shows what had to be built: custom track/speaker management, custom website ecommerce hooks, custom redirects. Use that to define what an “events extension” for Eventiva must support from day one vs later.
- **XML rendering / overwrites** – Pattern: declarative overwrites, composition. Design a TypeScript/Effect equivalent (e.g. schema-driven UI, or extension layers that merge config).
- **Inheritance model** – Extensions that affect other models without forking core. Eventiva extensions should support extending or composing existing entities/services.

## What to avoid (Odoo’s failures)

- **Disconnected models for the same concept** – Marketing contacts ≠ normal contacts; event attendees use different models again. **Same concept, different models** makes integration and reporting painful. Eventiva must use **unified models** (e.g. one Contact/Party with roles: marketing, attendee, etc.); extensions **reference** it, not define their own contact/attendee.
- **Python and lack of type strictness** – Eventiva is TypeScript/Effect; all extension APIs and models must be type-safe. Any future Python (e.g. tooling) must use Pydantic.

## climb-group-odoo (custom modules)

- Event/festival planner; last 6 months of custom work. Use to see what had to be built **differently** from stock Odoo (e.g. shared email for helpdesk, track/speaker, ecommerce hooks). **Exclude** `portal_dashboard_*` and `service_mcp_*` when extracting learnings.
- Feeds Linear “Extensions and API Mesh” initiative: extension priorities (Contact base, Helpdesk, Discord, etc.) and “unified models / avoid Odoo’s disconnect” principle.

## Extension priorities (from plan)

Contact is the **unified base**. Then: Accounting, AI, Appointments/calendar (in-house), CRM, Helpdesk, Data cleaning/merge, Knowledge base, Marketing automations, Project management, Sales, Purchase, Website tools. Backlog: Delivery partners, Sign, Planning/shift management.

## References

- Plan Part C: “Odoo as reference for extensions”; extension priorities table
- Plan Part D: Contact (auto-installed), Helpdesk, Discord integration; core = framework only; extensions = everything else
