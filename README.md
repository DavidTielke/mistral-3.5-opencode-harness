# opencode workshop package

Two parts. One goes into your user profile and applies to every session; the other goes into
the project you are working on.

## 1. User configuration

Copy these two files into your opencode config directory:

| File | Destination |
| --- | --- |
| `opencode.jsonc` | `%USERPROFILE%\.config\opencode\opencode.jsonc` |
| `AGENTS.md` | `%USERPROFILE%\.config\opencode\AGENTS.md` |

opencode picks both up automatically — `AGENTS.md` needs no entry in the config.

If you already have an `AGENTS.md` there, rename the old one first and merge by hand. These
rules are additive and do not replace a working setup.

### You must add your own model

`opencode.jsonc` deliberately contains no provider and no model. Add the endpoint you were
given, for example:

```jsonc
{
  "provider": {
    "local": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Local model",
      "options": { "baseURL": "http://localhost:8000/v1", "apiKey": "sk-local-no-auth" },
      "models": { "<served-model-name>": { "tool_call": true, "reasoning": true } }
    }
  },
  "model": "local/<served-model-name>"
}
```

Before the first session, confirm the endpoint actually answers:

```bash
curl http://localhost:8000/v1/models
```

An endpoint behind an SSH tunnel is dead until the tunnel is up, and opencode will only tell
you "Cannot connect to API".

### Requires Git for Windows

`opencode.jsonc` sets the shell to `C:\Program Files\Git\bin\bash.exe`. This removes a whole
class of failures: Windows PowerShell 5.1 understands neither `&&` nor `head`, `tail`, `grep`
or `/dev/null`, which every model types by reflex.

Note the path: `Git\bin\bash.exe`, **not** `Git\usr\bin\bash.exe`. The latter is the bare MSYS
shell and inherits only the Windows `PATH`, so `mkdir`, `ls` and `grep` do not exist in it.

Without Git for Windows, comment out the `shell` line.

## 2. Project files

Copy the contents of `project\` into the root of your project:

```
<your project>\
  .opencode\opencode.json     references to the documentation
  docs\blazor\                ASP.NET Core Blazor documentation
  docs\opencode\              opencode documentation
```

The reference paths in `.opencode\opencode.json` are relative (`../docs/blazor`), so the whole
folder can be moved or renamed without editing anything.

### Why the documentation is included

Local models are older than the frameworks you are using. Measured on 2026-09-15: a model
wrote a Blazor app that compiled cleanly, rendered correctly and silently did nothing —
buttons dead, forms saving empty records — because it applied a pattern from an earlier
framework version. Nothing in the build output indicated a problem.

The documentation closes that gap, but only if the agent reads it. That is why every
reference carries a `description` saying **when** to consult it, and why `AGENTS.md` treats
references as required reading rather than as a fallback after something breaks.

### Verify it is loaded

Start a session in the project and ask:

```
welche references hast du?
```

The answer should name `blazor-docs` and `opencode-docs` with paths resolving under your
project.

## What is in AGENTS.md

Twelve sections of working rules, each one derived from a failure that cost real time in this
workshop:

- **Environment** — Git Bash, MSYS path conversion (`cmd //c`), backslash paths, German
  Windows locale
- **Configured references are required reading** — consult the docs before writing, not after
  failing
- **Long-running processes** — why a trailing `&` hangs the session, and how to start a server
  without doing that
- **Test what you actually built** — prove the running instance contains your change; stop at
  the first contradiction
- **Scaffolding and generated project files** — let the CLI own what it generates
- **Context economy** and **Editing files** — keep the transcript small, patch instead of
  rewriting
- **Prove the feature, not the build** — a green build proves compilation and nothing else
- **Root causes**, **Investigate before asking**, **Reporting**, **Stack notes**
