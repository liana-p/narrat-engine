# Security Policy

## Supported Versions

At the moment there is no "LTS" version. To get updates simply stay on the latest version of narrat.

| Version | Supported          |
| ------- | ------------------ |
| 3.x     | :white_check_mark: |
| < 3.x   | :x:                |

## Reporting a Vulnerability

You can report a vulnerability either in issues, on discord, in the narrat forum, or by email.

Please note that the security warnings given during `pnpm install` tend to be irrelevant because they relate to user-injection exploits in build tools, which are not an issue because build tools are not being run with any third party user data. Narrat doesn't even have any kind of server or user input beyond what the developers themselves do when using Narrat.
