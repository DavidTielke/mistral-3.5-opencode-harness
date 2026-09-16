# Spacer

The `MudSpacer` component simply expands and fills available space. Its size is dependent on the parent's size.

```razor title="SpacerBasicExample"
<MudPaper Class=" pa-4 align-start d-flex" Style="width: 250px;" Outlined="true">
    <MudPaper Class="pa-3" Elevation="6">Item 1</MudPaper>
    <MudSpacer />
    <MudPaper Class="pa-3" Elevation="6">Item 2</MudPaper>
</MudPaper>

@*
    MudSpacer is shorthand for: <div class="flex-grow-1" />
*@
```
