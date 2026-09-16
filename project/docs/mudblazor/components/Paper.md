# Paper

Paper can represent a surface from the [Material Foundation](https://material.io/design/environment/surfaces.html#material-environment). Even if you are not designing something "material", the foundations of Material Design are a pillar of MudBlazor and provide useful insight into how many components operate.

```razor title="PaperComponentExample"
<MudPaper Class="pa-16 ma-2" Elevation="0"></MudPaper>
<MudPaper Class="pa-16 ma-2"></MudPaper>
<MudPaper Class="pa-16 ma-2" Elevation="3"></MudPaper>
```

If you need an outlined or square surface, use the `Outlined` or `Square` properties respectively.

```razor title="PaperVariantsExample"
<MudPaper Class="pa-16 ma-2" Outlined="true"></MudPaper>
<MudPaper Class="pa-16 ma-2" Outlined="true" Square="true"></MudPaper>
<MudPaper Class="pa-16 ma-2" Square="true"></MudPaper>
```
