# Tooltip

```razor title="TooltipSimpleExample"
<MudTooltip Text="Delete">
    <MudIconButton Icon="@Icons.Material.Filled.Delete" />
</MudTooltip>
<MudTooltip Text="Add">
    <MudFab StartIcon="@Icons.Material.Filled.Add" Color="Color.Secondary" />
</MudTooltip>
```

The tooltip can display arrows pointing to its activator, set the `Arrow` property to true to show them.

```razor title="TooltipArrowExample"
<MudTooltip Text="Arrow Left" Arrow="true" Placement="Placement.Left">
    <MudButton>Arrow Left</MudButton>
</MudTooltip>
<MudTooltip Text="Arrow Top" Arrow="true" Placement="Placement.Top">
    <MudButton>Arrow Top</MudButton>
</MudTooltip>
<MudTooltip Text="Arrow Bottom" Arrow="true" Placement="Placement.Bottom">
    <MudButton>Arrow Bottom</MudButton>
</MudTooltip>
<MudTooltip Text="Arrow Right" Arrow="true" Placement="Placement.Right">
    <MudButton>Arrow Right</MudButton>
</MudTooltip>
```

Tooltips can be displayed in different colors with the `Color` property.

```razor title="TooltipColorExample"
<MudTooltip Text="Secondary" Color="Color.Secondary" Placement="Placement.Top">
    <MudButton>Secondary</MudButton>
</MudTooltip>
<MudTooltip Text="Tertiary" Color="Color.Tertiary" Placement="Placement.Bottom" Arrow="true">
    <MudButton>Tertiary</MudButton>
</MudTooltip>
<MudTooltip Text="Primary" Color="Color.Primary" Placement="Placement.Top">
    <MudButton>Primary</MudButton>
</MudTooltip>
```

With the `TooltipContent` render fragment, you can specify custom HTML content for your tooltip.

```razor title="TooltipHtmlExample"
<MudTooltip>
    <ChildContent>
        <MudIconButton Icon="@Icons.Material.Filled.Delete" />
    </ChildContent>
    <TooltipContent>
        <MudText Typo="Typo.h6">h6 title</MudText>
        <MudText Typo="Typo.body2">body2 content</MudText>
        <MudIcon Icon="@Icons.Material.Filled.Star" />
    </TooltipContent>
</MudTooltip>
```

The tooltip's default delay can be set with `Delay` as a double in milliseconds.

```razor title="TooltipTransitionsExample"
<MudTooltip Delay="600" Text="Delayed: 600">
    <MudButton Color="Color.Primary">Delayed</MudButton>
</MudTooltip>
<MudTooltip Duration="1000" Text="Duration: 1000">
    <MudButton Color="Color.Primary">Duration</MudButton>
</MudTooltip>
<MudTooltip Duration="0" Text="Duration: 0">
    <MudButton Color="Color.Primary">Zero duration</MudButton>
</MudTooltip>
```

With the `ShowOnHover`, `ShowOnFocus` and `ShowOnClick` parameters, it is possible to choose which events activate and deactivate the tooltip.

```razor title="TooltipActivationExample"
<MudGrid>
    <MudItem xs="12" sm="6" md="9" Class="d-flex flex-column align-center justify-center">
        <MudButton Class="mb-4" tabindex="-1" Variant="Variant.Outlined" OnClick="@(async() => await _iconButton1.FocusAsync())">Focus the element</MudButton>
        <MudTooltip ShowOnClick="_click" ShowOnFocus="_focus" ShowOnHover="_hover" Text="Im Mud Tooltip">
            <MudIconButton @ref="_iconButton1" Icon="@Icons.Custom.Brands.MudBlazor" Color="Color.Primary" Size="Size.Large" />
        </MudTooltip>
    </MudItem>

    <MudItem xs="12" sm="6" md="3">
        <MudCheckBox @bind-Value="_focus" Label="Show On Focus" Color="Color.Primary" />
        <MudCheckBox @bind-Value="_hover" Label="Show On Hover" Color="Color.Primary" />
        <MudCheckBox @bind-Value="_click" Label="Click" Color="Color.Primary" />
    </MudItem>
</MudGrid>


@code {

    bool _click = false;
    bool _hover = true;
    bool _focus = true;

    MudIconButton _iconButton1;
}
```
