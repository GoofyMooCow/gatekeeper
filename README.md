# Gatekeeper

Gatekeeper is a server-side Fabric mod that gives you complete control over who can access your Minecraft server.

Unlike Minecraft's basic whitelist system, Gatekeeper introduces flexible player statuses, custom denial screens, player profiles, detailed audit logging, and a powerful HTTP API for external integrations.

Gatekeeper supports both Java Edition and Bedrock Edition players when used with Geyser/Floodgate.

## Features
* **Flexible player statuses** - Built-in statuses include whitelisted, neutral, and banned, with support for creating your own custom statuses.
* **Custom denial screens** - Display fully customizable messages when players are denied access.
* **Java & Bedrock support** - Seamless compatibility with Geyser/Floodgate.
* **Player profiles** - Store information such as Discord usernames, email addresses, bios, applications, notes, and more.
* **Public and private profile fields** - Control exactly which information is visible publicly and which remains admin-only.
* **Join and audit logging** - Record login attempts and administrative actions for moderation and accountability.
* **HTTP API** - Integrate Gatekeeper with websites, Discord bots, dashboards, and custom applications.
* **In-game administration** - Manage players, statuses, and profiles directly from Minecraft.
* **Hot-reload configuration** - Apply most configuration changes instantly with /gatekeeper reload.
* **Fail-closed security** - If an access check fails unexpectedly, players are denied access rather than mistakenly allowed in.
  
## Why Gatekeeper?

Gatekeeper is designed as a modern replacement for Minecraft's whitelist system.

Instead of managing a simple list of allowed and denied players, you can create a complete onboarding and access-management workflow using custom statuses, profile fields, denial messages, and external integrations.

Whether you're running a private server, a community server with applications, or a large network with custom tooling, Gatekeeper provides the flexibility to manage player access your way.
