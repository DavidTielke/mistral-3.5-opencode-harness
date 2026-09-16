# Alert

There are five severity levels that each set a different icon and a color.

```razor title="AlertSimpleExample"
<MudAlert Severity="Severity.Normal">The reactor type is RBMK-1000</MudAlert>
<MudAlert Severity="Severity.Info">The reactor was fired up successfully</MudAlert>
<MudAlert Severity="Severity.Success">The reactor is running at optimum temperature</MudAlert>
<MudAlert Severity="Severity.Warning">The reactor temperature exceeds the optimal range</MudAlert>
<MudAlert Severity="Severity.Error">Meltdown is imminent</MudAlert>
```

The default variant is text. In addition to that, outlined and filled is available.

```razor title="AlertOutlinedExample"
<MudAlert Severity="Severity.Normal" Variant="Variant.Outlined">The reactor type is RBMK-1000</MudAlert>
<MudAlert Severity="Severity.Info" Variant="Variant.Outlined">The reactor was fired up successfully</MudAlert>
<MudAlert Severity="Severity.Success" Variant="Variant.Outlined">The reactor is running at optimum temperature</MudAlert>
<MudAlert Severity="Severity.Warning" Variant="Variant.Outlined">The reactor temperature exceeds the optimal range</MudAlert>
<MudAlert Severity="Severity.Error" Variant="Variant.Outlined">Meltdown is imminent</MudAlert>
```

```razor title="AlertFilledExample"
<MudAlert Severity="Severity.Normal" Variant="Variant.Filled">The reactor type is RBMK-1000</MudAlert>
<MudAlert Severity="Severity.Info" Variant="Variant.Filled">The reactor was fired up successfully</MudAlert>
<MudAlert Severity="Severity.Success" Variant="Variant.Filled">The reactor is running at optimum temperature</MudAlert>
<MudAlert Severity="Severity.Warning" Variant="Variant.Filled">The reactor temperature exceeds the optimal range</MudAlert>
<MudAlert Severity="Severity.Error" Variant="Variant.Filled">Meltdown is imminent</MudAlert>
```

Taking up too much space? Set the `Dense` property to true. It removes the vertical padding and lowers the horizontal.

```razor title="AlertDenseExample"
<MudGrid>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Dense="true" Class="my-2">Dense Default</MudAlert>
        <MudAlert Severity="Severity.Info" Dense="true" Class="my-2">Dense Info</MudAlert>
        <MudAlert Severity="Severity.Success" Dense="true" Class="my-2">Dense Success</MudAlert>
        <MudAlert Severity="Severity.Warning" Dense="true" Class="my-2">Dense Warning</MudAlert>
        <MudAlert Severity="Severity.Error" Dense="true" Class="my-2">Dense Error</MudAlert>
    </MudItem>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Variant="Variant.Outlined" Dense="true" Class="my-2">Dense Default</MudAlert>
        <MudAlert Severity="Severity.Info" Variant="Variant.Outlined" Dense="true" Class="my-2">Dense Info</MudAlert>
        <MudAlert Severity="Severity.Success" Variant="Variant.Outlined" Dense="true" Class="my-2">Dense Success</MudAlert>
        <MudAlert Severity="Severity.Warning" Variant="Variant.Outlined" Dense="true" Class="my-2">Dense Warning</MudAlert>
        <MudAlert Severity="Severity.Error" Variant="Variant.Outlined" Dense="true" Class="my-2">Dense Error</MudAlert>
    </MudItem>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Variant="Variant.Filled" Dense="true" Class="my-2">Dense Default</MudAlert>
        <MudAlert Severity="Severity.Info" Variant="Variant.Filled" Dense="true" Class="my-2">Dense Info</MudAlert>
        <MudAlert Severity="Severity.Success" Variant="Variant.Filled" Dense="true" Class="my-2">Dense Success</MudAlert>
        <MudAlert Severity="Severity.Warning" Variant="Variant.Filled" Dense="true" Class="my-2">Dense Warning</MudAlert>
        <MudAlert Severity="Severity.Error" Variant="Variant.Filled" Dense="true" Class="my-2">Dense Error</MudAlert>
    </MudItem>
</MudGrid>
```

You can disable the alert icons with the bool `NoIcon` set to true.

```razor title="AlertNoIconExample"
<MudGrid>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" NoIcon="true" Class="mb-2 mt-3">Default No Icon</MudAlert>
        <MudAlert Severity="Severity.Info" NoIcon="true" Class="my-2">Info No Icon</MudAlert>
        <MudAlert Severity="Severity.Success" NoIcon="true" Class="my-2">Success No Icon</MudAlert>
        <MudAlert Severity="Severity.Warning" NoIcon="true" Class="my-2">Warning No Icon</MudAlert>
        <MudAlert Severity="Severity.Error" NoIcon="true" Class="my-2">Error No Icon</MudAlert>
    </MudItem>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Variant="Variant.Outlined" NoIcon="true" Class="my-2">Icon Default No</MudAlert>
        <MudAlert Severity="Severity.Info" Variant="Variant.Outlined" NoIcon="true" Class="my-2">Info No Icon</MudAlert>
        <MudAlert Severity="Severity.Success" Variant="Variant.Outlined" NoIcon="true" Class="my-2">Success No Icon</MudAlert>
        <MudAlert Severity="Severity.Warning" Variant="Variant.Outlined" NoIcon="true" Class="my-2">Warning No Icon</MudAlert>
        <MudAlert Severity="Severity.Error" Variant="Variant.Outlined" NoIcon="true" Class="my-2">Error No Icon</MudAlert>
    </MudItem>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Variant="Variant.Filled" NoIcon="true" Class="mb-2 mt-3">Default No Icon</MudAlert>
        <MudAlert Severity="Severity.Info" Variant="Variant.Filled" NoIcon="true" Class="my-2">Info No Icon</MudAlert>
        <MudAlert Severity="Severity.Success" Variant="Variant.Filled" NoIcon="true" Class="my-2">Success No Icon</MudAlert>
        <MudAlert Severity="Severity.Warning" Variant="Variant.Filled" NoIcon="true" Class="my-2">Warning No Icon</MudAlert>
        <MudAlert Severity="Severity.Error" Variant="Variant.Filled" NoIcon="true" Class="my-2">Error No Icon</MudAlert>
    </MudItem>
</MudGrid>
```

By default, the alert is set to rounded corners by your theme's default value. If you need a square Alert but don't want to change the theme, you can set the `Square` property to true.

```razor title="AlertSquareExample"
<MudGrid>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Square="true" Class="mb-2 mt-3">Default Square</MudAlert>
        <MudAlert Severity="Severity.Info" Square="true" Class="my-2">Info Square</MudAlert>
        <MudAlert Severity="Severity.Success" Square="true" Class="my-2">Success Square</MudAlert>
        <MudAlert Severity="Severity.Warning" Square="true" Class="my-2">Warning Square</MudAlert>
        <MudAlert Severity="Severity.Error" Square="true" Class="my-2">Error Square</MudAlert>
    </MudItem>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Variant="Variant.Outlined" Square="true" Class="my-2">Default Square</MudAlert>
        <MudAlert Severity="Severity.Info" Variant="Variant.Outlined" Square="true" Class="my-2">Info Square</MudAlert>
        <MudAlert Severity="Severity.Success" Variant="Variant.Outlined" Square="true" Class="my-2">Success Square</MudAlert>
        <MudAlert Severity="Severity.Warning" Variant="Variant.Outlined" Square="true" Class="my-2">Warning Square</MudAlert>
        <MudAlert Severity="Severity.Error" Variant="Variant.Outlined" Square="true" Class="my-2">Error Square</MudAlert>
    </MudItem>
    <MudItem md="4" xs="12">
        <MudAlert Severity="Severity.Normal" Variant="Variant.Filled" Square="true" Class="mb-2 mt-3">Default Square</MudAlert>
        <MudAlert Severity="Severity.Info" Variant="Variant.Filled" Square="true" Class="my-2">Info Square</MudAlert>
        <MudAlert Severity="Severity.Success" Variant="Variant.Filled" Square="true" Class="my-2">Success Square</MudAlert>
        <MudAlert Severity="Severity.Warning" Variant="Variant.Filled" Square="true" Class="my-2">Warning Square</MudAlert>
        <MudAlert Severity="Severity.Error" Variant="Variant.Filled" Square="true" Class="my-2">Error Square</MudAlert>
    </MudItem>
</MudGrid>
```

The component also accepts the `Elevation` property with a scale from 0 to 24.

```razor title="AlertElevationExample"
<MudAlert Severity="Severity.Normal" Variant="Variant.Filled" Elevation="@elevation" Class="mt-16">
    Elevated Alert, or is it?
</MudAlert>
<MudSlider @bind-Value="elevation" Min="0" Max="24" Class="my-4">Elevation</MudSlider>

@code {
    public int elevation = 1;
}
```

Set the `ContentAlignment` property to define the content alignment.

```razor title="AlertAlignmentExample"
<MudAlert Severity="Severity.Normal" ContentAlignment="HorizontalAlignment.Left">Left</MudAlert>
<MudAlert Severity="Severity.Info" ContentAlignment="HorizontalAlignment.Center">Center</MudAlert>
<MudAlert Severity="Severity.Success" ContentAlignment="HorizontalAlignment.Right">Right</MudAlert>
<MudAlert Severity="Severity.Warning" ContentAlignment="HorizontalAlignment.Start">Start</MudAlert>
<MudAlert Severity="Severity.Error" ContentAlignment="HorizontalAlignment.End">End</MudAlert>
```

Set the `ShowCloseIcon` property to `True` to display a Close icon.
 `CloseIconClicked` provides the EventCallback when clicking on the Close icon of the alert

```razor title="AlertCloseExample"
@if (showLeaveAlert)
{
    <MudAlert Severity="Severity.Info" ContentAlignment="HorizontalAlignment.Center" ShowCloseIcon="true" CloseIconClicked="(() => CloseMe(true))">Time to leave. Please close me!</MudAlert>
}
@if (showCallAlert)
{
    <MudAlert Severity="Severity.Success" ContentAlignment="HorizontalAlignment.Center" ShowCloseIcon="true" CloseIconClicked="(() => CloseMe(false))">Time to call. Please close me!</MudAlert>
}
@if (!showLeaveAlert && !showCallAlert)
{
    <div style="display: flex; justify-content: center;" class="mt-6">
        <MudButton @onclick="ShowAlerts" Variant="Variant.Filled" Color="Color.Primary">Show alerts</MudButton>
    </div>
}

@code { 
    private bool showCallAlert = true;
    private bool showLeaveAlert = true;

    private void CloseMe(bool value)
    {
        if (value)
        {
            showLeaveAlert = false;
        }
        else
        {
            showCallAlert = false;
        }
    }

    private void ShowAlerts()
    {
        showCallAlert = true;
        showLeaveAlert = true;
    }
}
```
