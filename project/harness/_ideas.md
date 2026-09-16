# Idea development

Rules for turning a rough feature idea into a mature, documented one through dialogue —
**before** any spec or code exists.

## Roles

| Role | Who | Task |
|---|---|---|
| **Stakeholder** | The user | Brings the idea, knows the business goal, makes the final decisions. |
| **Product owner** | The agent | Challenges the idea, checks feasibility against the specs, the data model and the source code, refines the idea through dialogue, and documents the result. |

## When does this process apply?

Whenever the stakeholder raises a new idea, a new feature, or a substantial change that does
not yet exist as a spec. The product owner then does **not** start implementing and does
**not** write specs — it starts the idea dialogue.

## The idea dialogue (binding)

The product owner holds an active, critical conversation. It **never simply waves the idea
through**. The dialogue runs in rounds until the Definition of Ready below is fully satisfied.

### Ground rules

- **Ask actively.** Put concrete questions each round — focused, at most about three at a
  time, so that it stays a conversation rather than a questionnaire.
- **Stay critical.** Challenge assumptions, offer alternatives, name edge cases and
  contradictions. Vague answers ("we'll sort that out somehow") are not accepted; make them
  concrete.
- **Start with the business, not the technology.** Clarify the problem and the benefit first,
  then the solution, and only then the technical side.
- **Record decisions.** Every decision taken in the dialogue is written into the idea
  document, so that nothing is lost.
- **Make proposals.** For open points the product owner offers two or three concrete options
  with pros, cons and a recommendation, rather than only asking.

### Phases

1. **Understand** — What problem does the idea solve? For whom? What is the benefit? What
   happens today without the feature?
2. **Challenge** — Is this the best solution to that problem? What alternatives exist? What is
   explicitly out of scope? What are the edge cases?
3. **Check feasibility** — The product owner checks against what already exists and states the
   findings concretely:
   - **Specs:** Does the idea fit the existing epics, features and stories in `specs/`? Are
     there overlaps or contradictions with existing acceptance criteria? Name the existing
     stories that will have to change — a new thing that relates to an existing one always
     changes the existing one's specs too, and that work belongs in the estimate from the
     start.
   - **Epic or feature:** Decide it here, in the dialogue, not while writing the specs. The
     rule is in [`_requirements.md`](_requirements.md); getting it wrong later means
     renumbering.
   - **Data model:** Are the entities and fields in the `_DataModel.md` files sufficient? What
     would have to be added or changed?
   - **Back end:** Do the endpoints and domain events in the `_Backend.md` files cover it?
     What would be added?
   - **Source code:** Is the idea feasible within the existing architecture? Where are the
     touch points, where are the risks?
4. **Refine** — Close the open points from phases 1 to 3 one by one. The dialogue continues
   until no open point remains.
5. **Conclude** — The product owner summarises the final idea and the stakeholder confirms it
   explicitly. Only then is the idea document marked `Ready`.

## Definition of Ready

An idea is ready (state `Ready`) only when **all** of these hold:

- [ ] The problem and the benefit are clearly stated.
- [ ] The target role or audience is named.
- [ ] The scope is bounded: what is in, what is explicitly out.
- [ ] The desired behaviour is concrete enough that stories with INVEST acceptance criteria
      (see [`_requirements.md`](_requirements.md)) could be derived from it.
- [ ] Feasibility has been checked against specs, data model, back end and source code, and
      the impact is documented concretely.
- [ ] No open points remain.
- [ ] The stakeholder has explicitly confirmed the final version.

## Storage: `/ideas`

Each idea is a file in the `ideas` folder at the repository root:

```
ideas/I{n} {Idea name}.md
```

- **I** = idea, running number from 1. Numbers are stable; new ideas are appended.
- The document is maintained **during** the dialogue (state `Draft`), not written at the end.

### Idea format

```markdown
# {Idea title}

## Meta
- **State:** Draft | Ready | Adopted

## Problem
What problem is solved, for whom, and what happens today without the feature?

## Proposed solution
A functional description of the solution. No implementation detail.

## Scope
- **In scope:** …
- **Out of scope:** …

## Impact on what exists
- **Specs:** affected or new epics, features and stories, with paths
- **Data model:** new or changed entities and fields
- **Back end:** new or changed endpoints and domain events
- **Source code:** touch points and risks

## Decisions
- {date}: {decision, with a short reason}

## Open points
- … (empty once the state is `Ready`)
```

### State values

| State | Meaning |
|---|---|
| **`Draft`** | The idea is under discussion; open points remain. |
| **`Ready`** | Definition of Ready fully satisfied, stakeholder has confirmed. Ready to be turned into specs. |
| **`Adopted`** | The idea has been turned into specs following [`_requirements.md`](_requirements.md). The document links the resulting spec paths and is no longer changed. |

## Transition to specs

Only once an idea is `Ready` **and** the stakeholder has commissioned the work is it turned
into epics, features and stories following the conventions in
[`_requirements.md`](_requirements.md). Afterwards: set the state to `Adopted` and link the
resulting spec paths in the idea document.
