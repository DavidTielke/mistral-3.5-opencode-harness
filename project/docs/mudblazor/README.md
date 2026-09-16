# MudBlazor reference documentation

Generated from the source pages of docs.mudblazor.com
(`github.com/MudBlazor/MudBlazor`, branch `dev`) on 2026-09-16.

Each page has been flattened into plain Markdown: the prose from the documentation
followed by the code of every example, inline. There is no indirection to resolve —
what you read is what you can copy.

## Read this first

| File | Read it for |
| --- | --- |
| `getting-started/Installation.md` | **Start here before adding MudBlazor to a project.** NuGet package, `_Imports.razor` entry, the CSS and font links, the JS script tag, and the services in `Program.cs`. All of them are required; miss one and the app builds, renders unstyled and nothing works. |
| `getting-started/Usage.md` | First component, the provider components a page needs |
| `getting-started/Layouts.md` | `MudLayout`, `MudAppBar`, `MudDrawer` scaffold |
| `getting-started/Wireframes.md` | Ready-made page skeletons to copy |
| `features/` | Theming, breakpoints, icons, localization |
| `customization/` | Palette, typography, default props |

## Components

One file per component, in `components/`. Grep it for the feature you need, then read
that range — some of these are large.

```bash
grep -n "Variant\|Color" docs/mudblazor/components/Button.md | head
grep -rln "MudDialog" docs/mudblazor/components | head
```

| Component | Size | Component | Size | Component | Size |
| --- | --- | --- | --- | --- | --- |
| `Alert` | 10 KB | `AppBar` | 8 KB | `Autocomplete` | 26 KB |
| `Avatar` | 4 KB | `Breadcrumbs` | 2 KB | `BreakpointProvider` | 4 KB |
| `Button` | 6 KB | `ButtonFAB` | 3 KB | `ButtonFabMenu` | 10 KB |
| `ButtonGroup` | 4 KB | `Card` | 3 KB | `Carousel` | 12 KB |
| `Charts` | 74 KB | `Checkbox` | 10 KB | `Chip` | 9 KB |
| `ChipSet` | 12 KB | `Collapse` | 1 KB | `ColorPicker` | 8 KB |
| `Container` | 1 KB | `DataGrid` | 133 KB | `DatePicker` | 15 KB |
| `DateRangePicker` | 4 KB | `Dialog` | 27 KB | `Divider` | 2 KB |
| `Drawer` | 23 KB | `DropZone` | 44 KB | `Element` | 2 KB |
| `ExitPrompt` | 1 KB | `ExpansionPanel` | 7 KB | `Field` | 7 KB |
| `FileUpload` | 47 KB | `FocusTrap` | 1 KB | `Form` | 23 KB |
| `Grid` | 6 KB | `Hidden` | 3 KB | `Highlighter` | 6 KB |
| `Hotkey` | 3 KB | `IconButton` | 1 KB | `Icons` | 5 KB |
| `Image` | 7 KB | `Link` | 1 KB | `List` | 13 KB |
| `Menu` | 21 KB | `MessageBox` | 6 KB | `NavMenu` | 13 KB |
| `NumericField` | 4 KB | `Overlay` | 8 KB | `Overview` | 1 KB |
| `Pagination` | 4 KB | `Paper` | 1 KB | `Popover` | 18 KB |
| `Progress` | 10 KB | `Radio` | 5 KB | `Rating` | 3 KB |
| `ScrollToTop` | 3 KB | `Select` | 28 KB | `SimpleTable` | 4 KB |
| `Skeleton` | 3 KB | `Slider` | 4 KB | `Snackbar` | 16 KB |
| `Spacer` | 1 KB | `SplitPanel` | 7 KB | `Stack` | 20 KB |
| `Stepper` | 13 KB | `SwipeArea` | 7 KB | `Switch` | 7 KB |
| `Table` | 76 KB | `Tabs` | 27 KB | `TemplateComponent` | 1 KB |
| `TextField` | 18 KB | `TimePicker` | 5 KB | `Timeline` | 17 KB |
| `ToggleGroup` | 9 KB | `ToggleIconButton` | 1 KB | `ToolBar` | 2 KB |
| `Tooltip` | 3 KB | `TreeView` | 31 KB | `Typography` | 2 KB |

## Parameter names

There is no generated API reference in this mirror. To find the exact name of a
parameter, copy it from an example in the component file — never guess it. If no example
shows it, say so instead of inventing one.
