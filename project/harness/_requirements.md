# Requirement conventions

Rules for how requirements — epics, features, stories and acceptance criteria — are structured
and worded in the spec folder.

## Folder and file structure

```
specs/
├── E{n} {Epic name}/
│   ├── _DataModel.md         ← entities belonging to the epic
│   ├── _Navigation.md        ← where the epic appears in the navigation
│   ├── _Backend.md           ← endpoints and domain events of the epic
│   └── F{n} {Feature name}/
│       └── S{n} {Story name}.md
```

- **E** = epic, **F** = feature, **S** = story, each with a running number.
- Numbering starts at 1 on every level: `S1`, `S2`, … per feature; `F1`, `F2`, … per epic.
- Numbers are stable. New stories are appended, never inserted in between.

## Story format

Every story file follows this structure:

```markdown
# {Story title}

## Meta
- **State:** Modified | Implemented

## User story
As a {role} I want {goal} so that {benefit}.

## Description
A short functional description: what the page or function does, how it is reached, what the
main interactions are. No implementation detail.

## Acceptance criteria
- …
- …
```

The epic, feature and story numbers come from the file path
(`E{n} {Epic}/F{n} {Feature}/S{n} {Story}.md`). They are **not** repeated in the story header.

Large stories may group their acceptance criteria into thematic subsections (`### …`), for
example "Master data" or "Section X".

## Meta block and state (binding)

**Why:** make it visible at a glance which stories currently match the code (`Implemented`) and
which have drifted from it (`Modified` — the spec was changed, or was never implemented).

Every story carries a meta block directly after the H1 title, with exactly one mandatory field:

```
## Meta
- **State:** Modified | Implemented
```

### State values

| State | Meaning |
|---|---|
| **`Modified`** | The spec is new, or has changed in substance since it was last implemented. The code does **not** reflect the spec. |
| **`Implemented`** | Spec and code are in sync — every acceptance criterion is implemented, front end and back end. |

### Maintenance rules

- **Any change of substance** to an `Implemented` story resets its state to `Modified` — that
  includes tightening an acceptance criterion or editing the description.
- **As soon as the implementation matches the spec**, set the state to `Implemented`, in the
  same session in which the code was checked against the spec.
- **Code-only changes** with no spec change — bug fixes, refactorings, performance work — do
  **not** change the state.
- **Spec and code changed together** in one session: go straight to `Implemented`, without
  writing `Modified` as an intermediate step.
- **The state is the source of truth for sync status.** Check it explicitly on every spec edit.
  Drift is the main enemy; when in doubt, set `Modified`.

## Epic or feature?

Getting this wrong is expensive, because the folder path carries the numbering and moving it
later renumbers everything below.

It is a **new epic** when the thing has all three of:

- its own entity in a `_DataModel.md`,
- its own entry in the navigation, reachable directly,
- its own lifecycle — it can be created, viewed and deleted without going through another
  epic first.

It is a **feature under an existing epic** when it only extends that epic's entity and is
reached through it.

A relationship between two things does not make one of them a feature of the other. Two
entities that each have their own screens are two epics, however closely they are linked.

## A new epic changes its neighbours

The moment a new epic relates to an existing one — a foreign key, a new field, a new choice in
an existing form, a new consequence when something is deleted — the existing stories are
**wrong** until you update them. Writing the new epic and leaving the old one untouched is not
half the job; it is a contradiction between two specs that both claim to be current.

Do this in the same pass, before you report anything as finished:

1. List the stories of every epic the new one touches.
2. For each story, ask: does the new relationship change what the user sees, chooses, or gets
   as a consequence? Deletion behaviour counts.
3. Update the description **and** the affected acceptance criteria, then set
   `State: Modified`.
4. Say in your report which existing stories you changed and why.

If you conclude that an existing story is genuinely unaffected, say so explicitly rather than
silently skipping it.

## Acceptance criteria: INVEST

Acceptance criteria must satisfy the INVEST principles:

- **I**ndependent — worded as independently as possible. Reference another story only where
  the content forces it, and then as "see S{n}".
- **N**egotiable — criteria describe behaviour, not implementation.
- **V**aluable — every criterion delivers value to a user or to the business.
- **E**stimable — concrete enough that the effort can be estimated.
- **S**mall — **atomic**: one criterion states exactly one checkable fact. Compound statements
  are split.
- **T**estable — every criterion has an unambiguous pass or fail.

### Wording patterns

- ✅ "The field `Name` is mandatory."
- ✅ "The field `Name` accepts at most 200 characters."
- ✅ "The field `Name` is unique across all records."
- ❌ "Name: mandatory, max 200 characters, unique." *(not atomic)*
- ❌ "All input is validated." *(not testable — what does "all" mean?)*
- ❌ "Only valid input is accepted." *(not testable)*

### Verb conventions

- "is visible / is enabled / is disabled" — for UI states
- "a modal dialog opens" — for modals
- "the event `X` is raised" — for domain events
- "is persisted / is removed from the database" — for data states
- "matches the format `{…}`" — for URL or file formats

### Separating UI from back end

Acceptance criteria follow the architecture rule: business logic, validation and uniqueness
checks are expressed as back-end behaviour, and the UI only displays the result.

- ✅ "The back end checks that `Name` is unique. On conflict the UI displays the error message
  returned by the back end."
- ❌ "The form checks whether the `Name` already exists."

Client-side validation is allowed as a UX aid, but the criterion is worded as "validated on the
client and on the server" to make clear that the back end is the authoritative source.

## Fields and entities

- Field names in acceptance criteria always in backticks and in the exact spelling used in
  `_DataModel.md` — for example `Name`, `Email`, `FK_OwnerId`.
- Event names in backticks as well — for example `ItemCreatedMessage`, `UserAddedByAdmin`.
- Enum values in backticks — for example `"German"`, `"Admin"`.
