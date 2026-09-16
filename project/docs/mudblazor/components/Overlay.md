# Overlay

Use the `AutoClose` property to allow users to close the overlay by clicking anywhere on it.

```razor title="OverlayUsageExample"
@inject ISnackbar Snackbar
 
<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="OpenOverlay">Show overlay</MudButton>

<MudOverlay @bind-Visible="_visible" DarkBackground AutoClose="true" OnClosed="OnOverlayClosed" />

@code {
    private bool _visible;

    public void OpenOverlay()
    {
        _visible = true;
        StateHasChanged();
    }
    
    public void OnOverlayClosed()
    {
        Snackbar.Add("Random message", Severity.Normal);
    }
}
```

The overlay can be contained inside its parent by setting the `Absolute` property along with the `relative` class (or CSS `position: relative` style). 
 
 An overlay with `Absolute` set is excluded from scaffolding and is rendered individually.

```razor title="OverlayAbsoluteExample"
<MudPaper Class="pa-8" Style="height: 300px; position: relative;">
    <MudButton Variant="Variant.Filled" Color="Color.Secondary" OnClick="@(e => ToggleOverlay(true))">Show overlay</MudButton>

    <MudOverlay Visible="visible" DarkBackground="true" Absolute="true">
        <MudButton Variant="Variant.Filled" Color="Color.Primary"  OnClick="@(e => ToggleOverlay(false))">Hide overlay</MudButton>
    </MudOverlay>
</MudPaper>



@code {
    private bool visible;

    public void ToggleOverlay(bool value)
    {
        visible = value;
    }
}
```

The overlay's default color is transparent, but you can adjust its appearance using either the `DarkBackground` or `LightBackground` properties.

```razor title="OverlayColorsExample"
<MudGrid>
    <MudItem xs="12" sm="6">
        <MudPaper Class="pa-4 my-2" Style="position:relative;">
            <MudOverlay Visible="lightVisible" LightBackground="true" Absolute="true" />
            <MudText>
                Det var en gång en spindel, som hette laban. Laban tyckte om kebab pizza, men det gjorde inte hans kompis åke.
                Åke och Laban skulle en dag ut och fiska. På vägen dit skrek Laban till, faaan du åke!!! det luktar kebab!!!
            </MudText>
            <MudButton Variant="Variant.Filled" Class="mt-2">Action</MudButton>
        </MudPaper>
        <MudSwitch @bind-Value="lightVisible" Label="Light Overlay" Color="Color.Primary"/>
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudPaper Class="pa-4 my-2" Style="position:relative;">
            <MudOverlay Visible="darkVisible" DarkBackground="true" Absolute="true" />
            <MudText>
                Det var en gång en spindel, som hette laban. Laban tyckte om kebab pizza, men det gjorde inte hans kompis åke.
                Åke och Laban skulle en dag ut och fiska. På vägen dit skrek Laban till, faaan du åke!!! det luktar kebab!!!
            </MudText>
            <MudButton Variant="Variant.Filled" Class="mt-2">Action</MudButton>
        </MudPaper>
        <MudSwitch @bind-Value="darkVisible" Label="Dark Overlay" Color="Color.Secondary" />
    </MudItem>
</MudGrid>


@code {
    private bool lightVisible;
    private bool darkVisible;
}
```

Use with caution when explicitly setting the ZIndex. MudBlazor's automatic scaffolding logic for `MudPopover` 
 will use whichever value is higher: the explicitly set `ZIndex` or its own calculated value.

```razor title="OverlayZIndexExample"
<MudButton Variant="Variant.Filled" Color="Color.Tertiary" OnClick="OpenOverlay">Show overlay</MudButton>

<MudOverlay @bind-Visible="_visible" DarkBackground="true" ZIndex="@(_setZIndex ? 9999 : 5)" AutoClose="true"/>

<div>
    <MudSwitch @bind-Value="_withPopover" Label="With Popover" />
    @if (_withPopover)
    {
        <MudPopover Open="_visible" AnchorOrigin="Origin.BottomLeft">
            <MudText Typo="Typo.h6">This Is a Popover</MudText>
        </MudPopover>
    }
</div>
<MudSwitch @bind-Value="_setZIndex" Label="Set ZIndex to 9999" />

@code {
    private bool _visible;
    private bool _setZIndex = true;
    private bool _withPopover;

    public void OpenOverlay()
    {
        _visible = true;
    }
}
```

The overlay can contain any child content but here it's used to display loading progress.
 
 An overlay that contains any `ChildContent` is excluded from scaffolding and is rendered individually.

```razor title="OverlayLoaderExample"
<MudCard Class="my-2" Style="position:relative;">
    @if (!dataLoaded)
    {
        <MudSkeleton SkeletonType="SkeletonType.Rectangle" Height="200px" />
        <MudCardContent>
            <MudSkeleton Width="30%" Height="42px;" />
            <MudSkeleton Width="80%" />
            <MudSkeleton Width="100%" />
        </MudCardContent>
        <MudCardActions>
            <MudSkeleton Width="64px" Height="40px" Class="ml-2" />
            <MudSkeleton Width="105px" Height="40px" Class="ml-3" />
        </MudCardActions>
        <MudOverlay Visible="visible" DarkBackground="true" Absolute="true">
            <MudProgressCircular Color="Color.Secondary" Indeterminate="true" />
        </MudOverlay>
    }
    else
    {
        <MudCardMedia Image="images/door.jpg" Height="200" />
        <MudCardContent>
            <MudText Typo="Typo.h5">Old Paint</MudText>
            <MudText Typo="Typo.body2">Old paint found on a stone house door.</MudText>
            <MudText Typo="Typo.body2">This photo was taken in a small village in Istra Croatia.</MudText>
        </MudCardContent>
        <MudCardActions>
            <MudButton Variant="Variant.Text" Color="Color.Primary">Share</MudButton>
            <MudButton Variant="Variant.Text" Color="Color.Primary">Learn more</MudButton>
        </MudCardActions>
    }
</MudCard>

<MudToolBar Gutters="false">
    <MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="OpenOverlay" EndIcon="@Icons.Material.Filled.Refresh">Refresh data</MudButton>
    <MudSpacer/>
    <MudButton Variant="Variant.Filled" OnClick="ResetExample">Reset example</MudButton>
</MudToolBar>

@code { 
    private bool visible;
    private bool dataLoaded;

    public async void OpenOverlay()
    {
        visible = true;
        dataLoaded = false;
        await Task.Delay(3000);
        dataLoaded = true;
        visible = false;
        StateHasChanged();
    }

    public void ResetExample()
    {
        dataLoaded = false;
    }
}
```

By default, `MudOverlay` is scaffolded into the `MudPopoverProvider`, producing a singleton stack where the most recently created overlay sits on top and stacks back down in reverse creation order as overlays close.
 In this context, an "overlay view" simply means a scaffolded overlay instance (the scrim/backdrop) that gets added to the stack by a component such as a popover, menu, or select.
 The scaffolded ZIndex will be the higher value between the explicit `ZIndex` parameter and the internally calculated value. This means an explicit `ZIndex` does not automatically override the scaffolded value if the latter is higher.
 
 Set `Absolute="true"` to scope the overlay to its parent (excluded from scaffolding).
 Apply `mud-skip-overlay-section` to opt out of the global overlay stack (excluded from scaffolding).
 Provide `ChildContent` to render custom content; overlays with `ChildContent` are excluded from scaffolding.
 
 Theme defaults: Unpaired overlays default to ZIndex 5; common theme values are AppBar 1300, Drawer 1100, Popover 1200.

```razor title="OverlayPositionExample"
<MudGrid>
    <MudItem xs="12" md="6" class="pa-4">
        <MudButton @onclick="() => TogglePopover(true)"
                   Variant="Variant.Filled"
                   Color="Color.Primary">
            Open Calendar with Override
        </MudButton>
        <MudButton @onclick="() => TogglePopover(false)"
                   Variant="Variant.Filled"
                   Color="Color.Primary">
            Open Calendar without Override
        </MudButton>
    </MudItem>
</MudGrid>
<MudPopover Open="@_isPopoverOpen" 
            AnchorOrigin="Origin.BottomCenter" 
            TransformOrigin="Origin.TopCenter">
    <MudDatePicker Label="Publish Date" Class="pa-2"
                    MinDate="new DateTime(1950, 1, 1)"
                    @bind-Date="@_selectedDate"
                    Variant="Variant.Outlined"
                    AdornmentIcon="@Icons.Material.Filled.CalendarToday" />
</MudPopover>
<MudOverlay DarkBackground="true" Class="@_className" AutoClose="true"
            OnClosed="@(() => TogglePopover(false))"
            Visible="@_isPopoverOpen" />

@code {
    private bool _isPopoverOpen = false;
    private DateTime? _selectedDate { get; set; } = DateTime.Today;
    private string _className = string.Empty;

    private void TogglePopover(bool overRide)
    {        
        if (overRide)
        {
            _className = "mud-skip-overlay-section";
        }
        else
        {
            _className = string.Empty;
        }
        _isPopoverOpen = !_isPopoverOpen;
    }    
}
```
