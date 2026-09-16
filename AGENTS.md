# Global agent rules

These rules apply to every session. Place this file at `~/.config/opencode/AGENTS.md`
(Windows: `%USERPROFILE%\.config\opencode\AGENTS.md`). opencode loads it automatically.

# Workflow

Four steps, in this order, for every task that changes code. A task is not finished after
step 3.

**1. Read the reference for what you are about to build.** If a reference is configured for
this stack, open its `README.md` and grep it for the feature you are implementing, then read
that range. Do this before the first file, not after a failure. Framework versions in a project
are newer than your training data, and recalling something wrongly feels exactly like recalling
it correctly.

**2. Plan and implement.** Let the CLI own what it generates: scaffold with the current
template, add dependencies with `dotnet add package` or `npm install`, never by hand-editing a
project file.

**3. Prove the feature at runtime.** A green build proves compilation and nothing else. Start
the application and drive one complete round trip: send known values, read them back, compare
the values — not the row count. If a `verify` subagent is configured, delegate this step to it.

**4. Report what you verified and what you did not.** Never describe something as working when
you did not observe it working. "I could not verify X" is a valid result; claiming X works is
not.

When a step fails, grep the reference for the symptom before forming a hypothesis. Your first
guess comes from the same knowledge that produced the defect.

---

# Reference

The sections below explain the environment and the traps in it. Consult them when a step above
runs into trouble.

## Environment

- The platform is Windows. The bash tool runs Git Bash, so POSIX syntax works: `&&`, pipes,
  `head`, `tail`, `grep`, `2>/dev/null`.
- If a command fails with `Das Token "&&" ist kein gueltiges Anweisungstrennzeichen`, you are in
  Windows PowerShell 5.1, not Git Bash. Do not retry the same line. Run one command per tool call
  and drop the POSIX-only tools.
- MSYS rewrites any argument that looks like a Unix path into a Windows path. `cmd /c "..."`
  becomes `cmd C:/ "..."`, which drops into an interactive cmd prompt and hangs the session.
  Write `cmd //c "..."` with two slashes, or prefix the call with `MSYS_NO_PATHCONV=1`. The same
  applies to any single-slash flag and to container paths such as `docker run -v /data`.
- You rarely need `cmd` at all. Use the POSIX tool: `mkdir -p`, `rm -rf`, `cp` are all present.
- The shell and the file tools need different path forms, and confusing them fails silently.
  - In a shell command use a relative path or the POSIX form `/c/src/NATO Day 3/App`, and quote
    anything containing a space. A backslash path breaks: in bash `\` is the escape character, so
    `ls "C:\src\NATO Day 3\App"` becomes `C:srcNATO Day 3App`.
  - In the `read`, `write`, `edit` and `glob` tools always use the Windows form
    `C:\src\NATO Day 3\App`. A POSIX path is not translated there. `write` to `/c/src/...` reports
    "Wrote file successfully" and silently creates `C:\c\src\...` instead. `read` normalises the
    same path and `edit` fails outright, so the tools disagree — never rely on a POSIX path in any
    of them.
  - If a write reports success but the file is not where you expect, you used the wrong path form.
    Fix the path. Do not fall back to `cat > file << 'EOF'`: that bypasses the diff and the
    permission prompt, and breaks on content containing backticks or `$`.
- Windows CLI tools emit German. `netstat -ano | findstr LISTENING` always returns nothing, because
  Windows prints `ABHOEREN`. Use `netstat -ano | findstr ABH` or
  `Get-NetTCPConnection -State Listen`. An empty result from a locale-dependent filter is not
  evidence that nothing is listening.

## Configured references are required reading

Your context lists the project's configured references with their paths and a description of when
to use each one. They document the exact versions this project runs on, and those versions are
newer than your training data. You will not feel that gap: recalling something wrongly feels
exactly like recalling it correctly, so waiting until you notice a problem is not a strategy.

- Before writing the first file of a framework that a reference covers, open that reference's
  `README.md`, then the one topic that covers what you are about to build. Locate the passage with
  `grep -n` and read that range rather than the whole file.
- Do not treat a reference as something to consult after a failure. A framework that silently
  defaults to the wrong behaviour does not fail: it produces something that compiles, renders, and
  does nothing.
- When a verification does fail, search the reference before forming a hypothesis from memory.
  Your first guess comes from the same training data that produced the defect.
- A reference is cheaper than the loop it prevents. One targeted `grep` costs a few hundred tokens;
  rediscovering a framework requirement by trial and error costs an entire session.

## Long-running processes

A trailing `&` does not make a command return early — it hangs the session. The background
process inherits the shell's output pipe, and the caller waits for that pipe to close, which
happens only when the process ends (measured: `sleep 8 &` returned after 8.1 s, not
immediately). For a server that never exits, the tool call never returns. The tool's `timeout`
parameter does not save you: it kills the shell, not the orphaned child still holding the pipe.

- Never append `&`, and never use `Start-Process` or `nohup`. A detached server also outlives the
  session and will silently answer later requests against stale code.
- To check that an application is sound, do not start it. `dotnet build` tells you it compiles;
  the tests tell you it works. Starting a web server proves very little and costs you the session.
- If you genuinely must start a server, bound it AND free the output pipe — both, not either:
  `timeout 60 dotnet run --no-launch-profile > run.log 2>&1; tail -20 run.log`
  Redirecting to a file releases the pipe (measured: 0.1 s instead of 8 s); `timeout` ends the
  process. The same applies to `npm run dev`, `ng serve` and `dotnet watch`.
  Never fold `cd` into the same line: `cd X && cmd > log 2>&1 &` backgrounds the whole list in a
  subshell whose own stdout is still the caller's pipe, so the call blocks for the full timeout
  (measured: 0.1 s vs 8.1 s for an 8-second job). Use `( cd X && cmd ) > log 2>&1 &`.
  If you background the server with `&` in order to query it afterwards, give `timeout` several
  hundred seconds and kill the process yourself at the end. Between two of your tool calls 30 to
  60 seconds of wall clock pass, so a short timeout kills the server before your first request
  reaches it, and every check then fails for that reason instead of the one you are testing.
- For containers use `docker compose up -d`. A plain `docker compose up` holds the pipe for
  exactly the same reason.
- `Stop-Process -Name dotnet` does not stop an app started with `dotnet run`. The app runs as its own
  `<Project>.exe` apphost process and survives.
- Before testing a service, identify which process owns the port:
  `netstat -ano | findstr :<port>`, then `tasklist /FI "PID eq <pid>"`.
- On Windows a process bound to `127.0.0.1:P` and a container published on `0.0.0.0:P` coexist
  without an error, and `localhost:P` reaches the former. A running container is not proof that your
  requests reach it.

## Test what you actually built

- After changing code that runs behind a build step or inside a container, prove the running instance
  contains the change before you interpret any test result. Use a marker: a new endpoint, a version
  string, a log line, or the build timestamp of the artifact.
- Stop at the first contradiction and resolve it before continuing. A contradiction means you are not
  measuring what you think you are measuring. Examples:
  - the container log shows a freshly created empty database, but the API returns rows
  - an endpoint you just added returns 404 on an image you just built
  - a rebuild with `--no-cache` changes nothing about the observed behaviour
- Rebuild or restart at most twice for the same hypothesis. If the symptom is unchanged after that,
  the hypothesis is wrong. Change the diagnosis, not the code.
- Follow this decision tree after a failed verification:
  - If you have not yet proven the running instance contains your change, prove that first.
  - Otherwise, if the same error message has appeared twice — even from two different commands —
    stop varying the command. The command is not the problem. Open the file and the line the error
    names, and fix the cause.
  - Otherwise, if three different hypotheses have failed, stop and report what you ruled out instead
    of trying a fourth.

## Scaffolding and generated project files

- Let the CLI own the files it generates. Add dependencies with `dotnet add package` or
  `npm install`, never by hand-editing the project file. A `<PackageReference>` written directly
  under `<Project>` instead of inside an `<ItemGroup>` breaks every later `dotnet` command with
  `MSB4067` — including `dotnet add package` itself, so the tool can no longer repair the damage.
- Scaffold first, then write. Create the project skeleton, list the result, and only then add your
  own files into it. Writing files into a directory the scaffold has not created yet forces a
  second run with `--force` and leaves the first attempt lying around.
- Never scaffold into `.`. Pass an explicit `-o <name>` and verify with `ls` where the project file
  actually landed. Scaffolding into the current directory scatters a whole project across the
  workspace root, and the leftovers make later `dotnet` commands pick the wrong project.
- If a template produces an outdated target framework, it is the wrong template. Do not patch
  `<TargetFramework>` by hand — that leaves an old project layout wearing a new version number.
  Check `dotnet new list <keyword>` first. On .NET 10 `dotnet new blazorserver` still scaffolds
  net7.0; the current template is `dotnet new blazor --interactivity Server`.

## Context economy

Tool output is the largest consumer of context, and tool-calling accuracy drops sharply as the
conversation grows. Keep the transcript small on purpose.

- Filter output at the source, not afterwards. Use `docker compose build 2>&1 | tail -20`,
  `npm install --silent`, `dotnet build -v q`, `git log --oneline -10`.
- Never paste a full build log, a full `npm install` transcript, or a whole dependency tree into the
  conversation. Extract the error line.
- For files longer than 300 lines, read the relevant range with `sed -n 'A,Bp'` or locate it with
  `grep -n` first. Do not read whole files to answer a narrow question.
- Prefer one targeted command over three broad ones.

## Editing files

- Use the edit or patch tool to change existing files. Write a whole file only when you are creating
  it, or when more than half of its lines change.
- Never rewrite a whole file to change a handful of lines. It costs output tokens, and it silently
  discards edits made outside your view.
- Before rewriting a file you did not create in this session, read it first.

## Prove the feature, not the build

A green build proves that the code compiles. A rendered page proves that it renders. Neither proves
that a single button, form or binding does anything. Modern UI frameworks fail silently in exactly
this gap: the build succeeds, the page looks right, and the handlers were simply never wired up.

- Before you report any interactive feature as done, drive one complete round trip against the
  running application and verify the result where the data actually lands. For a create form:
  submit known values, then read the stored record back and compare the values, not just the row
  count.
- A value that comes back empty, zero or default when you sent something else is a defect, not a
  detail. Do not explain it away, and do not report the feature as working.
- Read the existing data before you start. Rows that are already empty or default are evidence that
  the write path has been broken for a while.
- If you cannot drive the round trip, say so plainly and report the feature as unverified. That is a
  legitimate outcome; claiming it works is not.

## Root causes

- State a root cause only after demonstrating it. Otherwise label it explicitly as an unverified
  hypothesis.
- The absence of a file is weak evidence. A framework-dependent .NET app has no framework assemblies
  in its publish output; they live in the shared framework directory.
- Do not blame the user's environment (browser cache, stale session, wrong port) unless you have
  reproduced it. If the user reports they already tried a private window, that hypothesis is closed.

## Investigate before asking

- Read the signal yourself: response headers, status codes, container logs, network calls. Do not ask
  the user to open dev tools and report back what you can measure directly.
- Raise log verbosity when it decides the question. In ASP.NET Core,
  `"Microsoft.AspNetCore": "Warning"` in appsettings hides per-request logging. Set it to
  `Information` to see whether requests reach the server at all.

## Reporting

- Say what you verified and how. Distinguish "I ran the tests and they pass" from "I did not test
  this".
- Never describe something as working when your last observation showed it failing. If you ran out of
  ideas, say so and list what you ruled out.

## Stack notes

- Docker: write a `.dockerignore` before the first build. Without it, `COPY . .` drags `bin/`, `obj/`,
  `node_modules/` and local database files into the build context.
- Angular 21 builds to `dist/<project>/browser`. Serve that directory, not its parent.
- Angular 21 runs zoneless. Values assigned from async callbacks into plain component fields never
  trigger change detection: the HTTP call succeeds while the view stays on its initial state. Use
  signals for anything written from a subscription.
- EF Core: a `CREATE TABLE` line in the startup log means you are looking at a brand new, empty
  database. If the API still returns data, you are talking to a different process.
