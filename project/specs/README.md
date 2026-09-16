# Specs

Requirements for this project, as epics, features and stories.

```
specs/
└── E{n} {Epic name}/
    ├── _DataModel.md         entities belonging to the epic
    ├── _Navigation.md        where the epic appears in the navigation
    ├── _Backend.md           endpoints and domain events of the epic
    └── F{n} {Feature name}/
        └── S{n} {Story name}.md
```

The conventions — numbering, story format, the `State` field, when something is an epic rather
than a feature, and the INVEST rules for acceptance criteria — are defined in
[`../harness/_requirements.md`](../harness/_requirements.md). Read that before creating or
editing anything here.

Templates for each file type are in [`../harness/templates/`](../harness/templates/).

Nothing is specified yet. The first epic starts at `E1`.
