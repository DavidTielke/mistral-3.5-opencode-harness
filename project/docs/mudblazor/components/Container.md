# Container

You can set the max width with the `MaxWidth` enum.

```razor title="ContainerFluidExample"
<MudPaper Height="400px" Width="100%">
    <MudContainer MaxWidth="MaxWidth.Small">
        <MudPaper Height="400px" Width="100%" Square="true" Class="mud-theme-primary"></MudPaper>
    </MudContainer>
</MudPaper>
```

With the `Fixed` property set to true the container will "snap" to the closest breakpoint.

```razor title="ContainedFixedExample"
<MudPaper Height="400px" Width="100%">
    <MudContainer Fixed="true">
        <MudPaper Height="400px" Width="100%" Square="true" Class="mud-theme-primary"></MudPaper>
    </MudContainer>
</MudPaper>
```
