// Appends reminders to the results of tool calls that change something.
//
// Why this exists: rules in AGENTS.md are skipped for small changes. Measured on 2026-09-16,
// a one-line column rename produced four tool calls and the answer "Done" — no runtime
// verification, no spec update — with the workflow at line 1 of AGENTS.md and an explicit
// "a one-line change is not an exemption". The model stops once the literal request is
// satisfied, and a rule further up in the system prompt does not reach that moment.
//
// A note appended to the tool result does: it lands in the transcript directly next to the
// change, at the point where the model decides whether it is finished.

const FILE_TOOLS = new Set(["edit", "write", "patch", "multiedit"])

// Editing these is one of the follow-up steps itself, or documentation — no reminder there.
const SKIP_PATHS = [
  "specs/", "specs\\",
  "harness/", "harness\\",
  "docs/", "docs\\",
  "ideas/", "ideas\\",
  ".opencode",
  "AGENTS.md",
]

// Shell commands that can change the directory structure.
const STRUCTURE = /\b(mkdir|rmdir|dotnet\s+new|git\s+clone|ng\s+new)\b|\brm\s+-[a-zA-Z]*r|\bmv\s+\S+\s+\S+/

const WORKFLOW_NOTE = [
  "",
  "",
  "[workflow] A source file was changed. Two steps of the dev workflow are now due:",
  "  3. Verify at runtime — delegate to the `verify-app` subagent. A green build is not a result.",
  "  4. Sync `specs/` — update the story this change affects, or create it if the change opened a new one.",
  "     Skip step 4 only if `specs/` holds nothing but a README, or if nothing user-visible changed.",
  'Do not reply "Done" until both are done, or until you have said which one you skipped and why.',
].join("\n")

const MAP_NOTE = [
  "",
  "",
  "[repo-map] That command may have changed the directory structure. If a directory was created,",
  "renamed, moved or removed, load the `repo-map` skill and regenerate the map at the top of",
  "AGENTS.md before you finish. If nothing structural changed, ignore this line.",
].join("\n")

function pathOf(input, output) {
  for (const s of [output && output.args, input && input.args, input]) {
    if (!s) continue
    const p = s.filePath || s.path || s.file
    if (typeof p === "string") return p
  }
  return ""
}

function commandOf(input, output) {
  for (const s of [output && output.args, input && input.args, input]) {
    if (!s) continue
    if (typeof s.command === "string") return s.command
  }
  return ""
}

function append(output, note) {
  if (typeof output.output === "string") {
    output.output += note
    return true
  }
  for (const key of ["result", "text", "content"]) {
    if (typeof output[key] === "string") {
      output[key] += note
      return true
    }
  }
  return false
}

export const WorkflowReminder = async () => {
  return {
    "tool.execute.after": async (input, output) => {
      try {
        if (!input || !output) return

        if (FILE_TOOLS.has(input.tool)) {
          const path = pathOf(input, output)
          if (SKIP_PATHS.some((s) => path.includes(s))) return
          append(output, WORKFLOW_NOTE)
          return
        }

        if (input.tool === "bash") {
          const cmd = commandOf(input, output)
          if (cmd && STRUCTURE.test(cmd)) append(output, MAP_NOTE)
        }
      } catch {
        // A reminder must never break a tool call.
      }
    },
  }
}
