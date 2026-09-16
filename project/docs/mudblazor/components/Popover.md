# Popover

You have full control over the popover's content and its open state.

```razor title="PopoverSimpleExample"
<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@ToggleOpen">Open</MudButton>
<MudSwitch @bind-Value="_open" Color="Color.Primary" />
<MudToggleIconButton @bind-Toggled="@_open" Icon="@Icons.Material.Filled.Fullscreen" Color="@Color.Primary" ToggledIcon="@Icons.Material.Filled.FullscreenExit" ToggledColor="@Color.Secondary" />

<MudPopover Open="@_open" Fixed="true" Class="px-4 pt-4">
    <div class="d-flex flex-column">
        <MudText>Content of the popover can be anything.</MudText>
        <MudButton OnClick="@ToggleOpen" Class="ml-auto mr-n3 mb-1" Color="Color.Error">Close</MudButton>
    </div>
</MudPopover>

@code{
    private bool _open;

    private void ToggleOpen() => _open = !_open;
}
```

Define the starting point and offset of the popover relative to its parent component.
 You can set the popover location either through custom CSS or directly via inline styles.

```razor title="PopoverLocationExample"
<MudGrid>
    <MudItem xs="3">
        <MudText Typo="Typo.h6">Anchor Origin</MudText>
        <MudRadioGroup T="Origin" @bind-Value="AnchorOrigin" Class="d-flex flex-column">
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.TopLeft">Top-Left</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.TopCenter">Top-Center</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.TopRight">Top-Right</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.CenterLeft">Center-Left</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.CenterCenter">Center-Center</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.CenterRight">Center-Right</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.BottomLeft">Bottom-Left</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.BottomCenter">Bottom-Center</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.BottomRight">Bottom-Right</MudRadio>
        </MudRadioGroup>
    </MudItem>
    <MudItem xs="6" Class="d-flex justify-center align-center">
            <MudBadge Origin="@AnchorOrigin" Color="Color.Primary" Dot="true" Overlap="true" Elevation="4" BadgeClass="ma-2">
                <MudPaper Elevation="0" Outlined="true" Class="pa-12">
                    <MudPopover OverflowBehavior="OverflowBehavior.FlipNever" Open="true" AnchorOrigin="@AnchorOrigin" TransformOrigin="@TransformOrigin" Class="pa-4">
                        <MudText Typo="Typo.body2" Class="px-4 py-1">The content of the popover</MudText>
                        <div class="@GetLocation()" style="top:0; left:0;">
                            <MudIcon Icon="@GetIcon()" Color="Color.Secondary" Class="" />
                        </div>
                    </MudPopover>
                </MudPaper>
            </MudBadge>
    </MudItem>
    <MudItem xs="3">
        <MudText Typo="Typo.h6">Transform Origin</MudText>
        <MudRadioGroup T="Origin" @bind-Value="TransformOrigin" Class="d-flex flex-column">
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.TopLeft">Top-Left</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.TopCenter">Top-Center</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.TopRight">Top-Right</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.CenterLeft">Center-Left</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.CenterCenter">Center-Center</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.CenterRight">Center-Right</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.BottomLeft">Bottom-Left</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.BottomCenter">Bottom-Center</MudRadio>
            <MudRadio Color="Color.Secondary" Dense="true" Value="Origin.BottomRight">Bottom-Right</MudRadio>
        </MudRadioGroup>
    </MudItem>
</MudGrid>

@code{
    public Origin TransformOrigin { get; set; } = Origin.TopLeft;
    public Origin AnchorOrigin { get; set; } = Origin.BottomLeft;

    public string GetIcon()
    {
        string icon = "";

        switch(TransformOrigin)
        {
            case Origin.TopLeft:
                icon = Icons.Material.Filled.SouthEast;
                break;
            case Origin.TopCenter:
                icon = Icons.Material.Filled.South;
                break;
            case Origin.TopRight:
                icon = Icons.Material.Filled.SouthWest;
                break;
            case Origin.CenterLeft:
                icon = Icons.Material.Filled.East;
                break;
            case Origin.CenterCenter:
                icon = Icons.Material.Filled.ZoomOutMap;
                break;
            case Origin.CenterRight:
                icon = Icons.Material.Filled.West;
                break;
            case Origin.BottomLeft:
                icon = Icons.Material.Filled.NorthEast;
                break;
            case Origin.BottomCenter:
                icon = Icons.Material.Filled.North;
                break;
            case Origin.BottomRight:
                icon = Icons.Material.Filled.NorthWest;
                break;
        }
        return icon;
    }

    public string GetLocation()
    {
        string align = "";
        string justify = "";
        string[] pos = TransformOrigin.ToStringFast(true).Split("-");

        if(pos[0] == "center")
        {
            align = "align-center";
        }
        else if(pos[0] == "top")
        {
            align = "align-start";
        }
        else if (pos[0] == "bottom")
        {
            align = "align-end";
        }
        if(pos[1] == "left")
        {
            justify = "justify-start";
        }
        else if (pos[1] == "right")
        {
            justify = "justify-end";
        }
        else if (pos[1] == "center")
        {
            justify = "justify-center";
        }

        return $"absolute mud-height-full mud-width-full d-flex {align} {justify}";
    }
}
```

Configure the popover's overflow behavior using one of the following options:
 `FlipNever`, `FlipOnOpen`, or `FlipAlways`.

 When space is limited, the popover can flip its position to stay visible. In center mode, the popover flips vertically. Scroll the page to see this behavior in action.

```razor title="PopoverOverflowBehaviorExample"
<MudPaper Outlined="true" Class="px-12 py-6">
    <MudButton Variant="Variant.Filled" Color="Color.Primary" DropShadow="false" OnClick="@ToggleOpen">@(_open? "Close" : "Open")</MudButton>
    <MudPopover Open="_open" OverflowBehavior="OverflowBehavior.FlipAlways" AnchorOrigin="Origin.BottomCenter" TransformOrigin="Origin.TopCenter" Paper="false">
        <MudPaper Outlined="true" Class="px-4 py-8">
            <MudText>Scroll your browser to see effect.</MudText>
        </MudPaper>
    </MudPopover>
</MudPaper>

@code {
    private bool _open = true;

    private void ToggleOpen() => _open = !_open;
}
```

Popovers support complex content and adjust their position automatically to fit their surroundings, just like any other Blazor component.

Popovers can have their widths set relative to their activator or parent through the `DropdownWidth` enum:
 
 `Ignore` (default): Popover width adjusts independently of the activator.
 `Relative`: Popover width matches the activator’s width precisely.
 `Adaptive`: Minimum width matches activator or parent, but popover can grow wider as needed.

```razor title="PopoverRelativeWidthExample"
<div style="width: 250px;">
    <MudButton Variant="Variant.Filled" Color="Color.Primary" FullWidth OnClick="@ToggleOpen">Open</MudButton>
    <MudPopover Open="@_open" Class="pa-4" Fixed="true" RelativeWidth="@_dropdownWidth" AnchorOrigin="Origin.BottomLeft" TransformOrigin="Origin.TopLeft">
        <MudText>Content of the popover can be anything.</MudText>
        <MudButton OnClick="@ToggleOpen" Class="ml-auto mr-n3 mb-1" Color="Color.Error">Close</MudButton>
    </MudPopover>
</div>

<div style="width: 250px; margin-left: 150px;">
    <MudSelect T="DropdownWidth" Label="Dropdown Width" @bind-Value="@_dropdownWidth">
        <MudSelectItem Value="@DropdownWidth.Relative">Relative</MudSelectItem>
        <MudSelectItem Value="@DropdownWidth.Adaptive">Adaptive</MudSelectItem>
        <MudSelectItem Value="@DropdownWidth.Ignore">Ignore</MudSelectItem>
    </MudSelect>
</div>

@code{
    private bool _open;

    private DropdownWidth _dropdownWidth = DropdownWidth.Ignore;

    private void ToggleOpen() => _open = !_open;
}
```

Popovers can be nested within elements that already use a popover, such as tooltips inside menus.

```razor title="PopoverInceptionExampleExample"
<MudMenu Class="" Label="A menu with tooltip" Variant="Variant.Filled" Color="Color.Primary">
    <div class="d-flex align-center">
        <MudText Class="ml-4">1</MudText>
        <MudTooltip Text="1 is good option">
            <MudIconButton Class="mx-2" Icon="@Icons.Material.Outlined.Info" />
        </MudTooltip>
    </div>
    <div class="d-flex align-center">
        <MudText Class="ml-4">2</MudText>
        <MudMenu Icon="@Icons.Material.Outlined.Mouse" ActivationEvent="@MouseEvent.MouseOver" Class="mx-2">
            <ChildContent>
                <MudMenuItem Label="Profile" />
                <MudMenuItem Label="Theme" />
                <MudMenuItem Label="Usage" />
                <MudMenuItem Label="Sign Out" />
            </ChildContent>
        </MudMenu>
        <MudTooltip Text="2 can be a better option">
            <MudIconButton Class="mx-2" Icon="@Icons.Material.Outlined.Info" />
        </MudTooltip>
    </div>
    <div class="d-flex align-center">
        <MudText Class="ml-4">3</MudText>
        <MudTooltip Text="3 is one more than 2">
            <MudIconButton Class="mx-2" Icon="@Icons.Material.Outlined.Info" />
        </MudTooltip>
    </div>
</MudMenu>
```

Some components combine [MudPopover](/components/popover) with [MudOverlay](/components/overlay) 
 to manage item lists. For these components, appearance and behavior are configured via their dropdown-related parameters (such as `PopoverFixed`, 
 `AnchorOrigin`, `TransformOrigin`, and `RelativeWidth`), which map to the 
 underlying `MudPopover`. Global defaults for popover behavior can be configured via `AddMudServices` using 
 `PopoverOptions`, such as `ModalOverlay` and `OverflowBehavior`.

 `PopoverFixed = false` -- The popover does not remain fixed during scrolling.

 `RelativeWidth` -- Controls how the popover width relates to its activator.
 Accepts `DropdownWidth.Relative`,
 `DropdownWidth.Adaptive`, or
 `DropdownWidth.Ignore`.

 `AnchorOrigin` -- Determines the popover anchor position.
 `TransformOrigin` -- Determines the transform origin point.

 `OverflowBehavior` -- Adjusts popover behavior when space is limited.

 * Defaults to `PopoverOptions.OverflowBehavior`
 which is `FlipAlways` by default.
 Can be configured globally via
 `AddMudServices(options => options.PopoverOptions.OverflowBehavior = ...)`.

 `Modal` -- Prevents interaction with background elements.

 * Defaults to `PopoverOptions.ModalOverlay`
 which is `false` by default.
 Can be configured globally via
 `AddMudServices(options => options.PopoverOptions.ModalOverlay = ...)`.

```razor title="PopoverIndividualSettingsExample"
<MudGrid>
    <MudItem md="4">
        <MudSelect T="string"
                   Label="MudSelect"
                   PopoverFixed="@_fixed"
                   AnchorOrigin="@_anchor"
                   TransformOrigin="@_transform"
                   RelativeWidth="_dropdownWidth"
                   Variant="Variant.Outlined"
                   AdornmentIcon="@Icons.Material.Filled.Search"
                   AdornmentColor="Color.Primary">
            <MudSelectItem Value="@("foo")">Foo</MudSelectItem>
            <MudSelectItem Value="@("bar")">Bar</MudSelectItem>
            <MudSelectItem Value="@("bar")">Lorem ipsum dolor sit amet, consectetur adipiscing elit</MudSelectItem>
        </MudSelect>
    </MudItem>

    <MudItem md="4"
             Class="d-flex justify-center align-center">
        <MudMenu Label="MudMenu"
                 Variant="Variant.Filled"
                 Color="Color.Primary"
                 PopoverFixed="@_fixed"
                 AnchorOrigin="@_anchor"
                 TransformOrigin="@_transform"
                 RelativeWidth="_dropdownWidth">
            <MudMenuItem Label="Enlist" />
            <MudMenuItem Label="Barracks" />
            <MudMenuItem Label="Armory" />
            <MudMenuItem Label="The quick brown fox jumps over the lazy dog" />
        </MudMenu>
    </MudItem>

    <MudItem md="4">
        <MudAutocomplete SearchFunc="Search"
                         Variant="Variant.Outlined"
                         Label="MudAutocomplete"
                         PopoverFixed="@_fixed"
                         AnchorOrigin="@_anchor"
                         TransformOrigin="@_transform"
                         RelativeWidth="_dropdownWidth" />
    </MudItem>

    <MudItem md="1" />

    <MudItem md="2"
             Class="d-flex align-center justify-center">
        <MudSwitch @bind-Value="@_fixed"
                   Label="Fixed"
                   LabelPlacement="Placement.Right" />
    </MudItem>

    <MudItem md="2">
        <MudSelect T="Origin"
                   Label="Anchor Origin"
                   @bind-Value="@_anchor"
                   PopoverFixed="@_fixed">
            <MudSelectItem Value="@Origin.TopLeft">Top Left</MudSelectItem>
            <MudSelectItem Value="@Origin.TopCenter">Top Center</MudSelectItem>
            <MudSelectItem Value="@Origin.TopRight">Top Right</MudSelectItem>
            <MudSelectItem Value="@Origin.BottomLeft">Bottom Left</MudSelectItem>
            <MudSelectItem Value="@Origin.BottomCenter">Bottom Center</MudSelectItem>
            <MudSelectItem Value="@Origin.BottomRight">Bottom Right</MudSelectItem>
            <MudSelectItem Value="@Origin.CenterLeft">Center Left</MudSelectItem>
            <MudSelectItem Value="@Origin.CenterCenter">Center Center</MudSelectItem>
            <MudSelectItem Value="@Origin.CenterRight">Center Right</MudSelectItem>
        </MudSelect>
    </MudItem>

    <MudItem md="2">
        <MudSelect T="Origin"
                   Label="Transform Origin"
                   @bind-Value="@_transform">
            <MudSelectItem Value="@Origin.TopLeft">Top Left</MudSelectItem>
            <MudSelectItem Value="@Origin.TopCenter">Top Center</MudSelectItem>
            <MudSelectItem Value="@Origin.TopRight">Top Right</MudSelectItem>
            <MudSelectItem Value="@Origin.BottomLeft">Bottom Left</MudSelectItem>
            <MudSelectItem Value="@Origin.BottomCenter">Bottom Center</MudSelectItem>
            <MudSelectItem Value="@Origin.BottomRight">Bottom Right</MudSelectItem>
            <MudSelectItem Value="@Origin.CenterLeft">Center Left</MudSelectItem>
            <MudSelectItem Value="@Origin.CenterCenter">Center Center</MudSelectItem>
            <MudSelectItem Value="@Origin.CenterRight">Center Right</MudSelectItem>
        </MudSelect>
    </MudItem>

    <MudItem md="2">
        <MudSelect T="DropdownWidth"
                   Label="Dropdown Width"
                   @bind-Value="@_dropdownWidth">
            <MudSelectItem Value="@DropdownWidth.Relative">Relative (equal to activator width)</MudSelectItem>
            <MudSelectItem Value="@DropdownWidth.Adaptive">Adaptive (min = activator width)</MudSelectItem>
            <MudSelectItem Value="@DropdownWidth.Ignore">Ignore (independent width)</MudSelectItem>
        </MudSelect>
    </MudItem>

</MudGrid>


@code {

    private Origin _anchor = Origin.BottomLeft;
    private Origin _transform = Origin.TopLeft;
    private bool _fixed = false;
    private DropdownWidth _dropdownWidth = DropdownWidth.Relative;

    private string[] _states =
    {
        "Alabama", "Alaska", "Arizona", "Arkansas", "California",
        "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
        "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
        "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
        "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin", "Wyoming"
    };

    private async Task<IEnumerable<string>> Search(string value, CancellationToken token)
    {
        // In real life use an asynchronous function for fetching data from an api.
        await Task.Delay(5, token);

        // if text is null or empty, show complete list
        if (string.IsNullOrEmpty(value))
            return _states;

        return _states.Where(x => x.Contains(value, StringComparison.InvariantCultureIgnoreCase));
    }
}
```

## Further examples

```razor title="PopoverComplexContentExample"
<div class="d-flex">
    <MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@ToggleOpen">
        @(_open? "Close" : "Open")
    </MudButton>
    <MudPopover Open="@_open" AnchorOrigin="Origin.BottomCenter" TransformOrigin="Origin.TopCenter">
        <div class="d-flex flex-column pa-1">
            <PopoverDynamicContentExample />
        </div>
    </MudPopover>
</div>

@code {

    public bool _open;

    public void ToggleOpen()
    {
        if (_open)
            _open = false;
        else
            _open = true;
    }
}
```

```razor title="PopoverDynamicContentExample"
<MudButton OnClick="@AddMoreContent" Color="Color.Error">Add another line</MudButton>
@foreach (var item in _content)
{
    <MudText Class="pa-2" Align="Align.Center">@item</MudText>
}

@code {

    private List<String> _content = new();

    public void AddMoreContent()
    {
        _content.Add("line of text");
    }
}
```
