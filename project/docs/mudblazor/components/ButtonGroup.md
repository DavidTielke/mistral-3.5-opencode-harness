# ButtonGroup

```razor title="ButtonGroupBasicExample"
<MudButtonGroup Color="Color.Primary" Variant="Variant.Filled">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>

<MudButtonGroup Color="Color.Primary" Variant="Variant.Text">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>

<MudButtonGroup Color="Color.Primary" Variant="Variant.Outlined">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>
```

With `Vertical="true"` the buttons are displayed vertically.

```razor title="ButtonGroupVerticalExample"
<MudButtonGroup Color="Color.Primary" Variant="Variant.Filled" Vertical="true">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>

<MudButtonGroup Color="Color.Primary" Variant="Variant.Text" Vertical="true">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>

<MudButtonGroup Color="Color.Primary" Variant="Variant.Outlined" Vertical="true">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>
```

```razor title="ButtonGroupSizesColorsExample"
<MudButtonGroup Color="Color.Primary" Size="Size.Small" Variant="Variant.Filled">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>

<MudButtonGroup Color="Color.Secondary" Size="Size.Medium" Variant="Variant.Filled">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>

<MudButtonGroup Color="Color.Tertiary" Size="Size.Large" Variant="Variant.Filled">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>
```

`MudButtonGroup` can also make use of `MudIconButton` and `MudToggleIconButton`.

```razor title="ButtonGroupIconButtonExample"
<MudButtonGroup Color="Color.Primary" Variant="Variant.Outlined">
    <MudIconButton Icon="@Icons.Material.Filled.AccessAlarm"></MudIconButton>
    <MudToggleIconButton Icon="@Icons.Material.Filled.AlarmOff" Color="@Color.Error"
                         ToggledIcon="@Icons.Material.Filled.AlarmOn" ToggledColor="@Color.Success" />
    <MudButton StartIcon="@Icons.Material.Filled.AlarmAdd" IconColor="Color.Warning">Add alarm</MudButton>
</MudButtonGroup>
```

A `MudMenu` can be used to create a split button.

```razor title="ButtonGroupSplitButtonExample"
<MudButtonGroup Color="Color.Primary" Variant="Variant.Outlined">
    <MudButton>@_buttonText</MudButton>
    <MudMenu Icon="@Icons.Material.Filled.ArrowDropDown" Style="align-self: auto;">
        <MudMenuItem OnClick="() => SetButtonText(0)">Reply</MudMenuItem>
        <MudMenuItem OnClick="() => SetButtonText(1)">Reply All</MudMenuItem>
        <MudMenuItem OnClick="() => SetButtonText(2)">Forward</MudMenuItem>
        <MudMenuItem OnClick="() => SetButtonText(3)">Reply & Delete</MudMenuItem>
    </MudMenu>
</MudButtonGroup>
@code {
    private string _buttonText = "Reply";

    private void SetButtonText(int id)
    {
        switch (id)
        {
            case 0: _buttonText = "Reply";
                break;
            case 1:
                _buttonText = "Reply All";
                break;
            case 2:
                _buttonText = "Forward";
                break;
            case 3:
                _buttonText = "Reply & Delete";
                break;
        }
    }
}
```

With `DropShadow="false"` the drop shadow of button groups with `Variant="Variant.Filled"` is removed.

```razor title="ButtonGroupDropShadowExample"
<MudButtonGroup Color="Color.Primary" Variant="Variant.Filled" DropShadow="@_dropShadow">
    <MudButton>One</MudButton>
    <MudButton>Two</MudButton>
    <MudButton>Three</MudButton>
</MudButtonGroup>

<MudSwitch @bind-Value="_dropShadow" Label="Drop shadow" Color="Color.Primary" />

@code {
    private bool _dropShadow = false;
}
```

With `OverrideStyles="false"` the `MudButtonGroup` no longer overrides the styles of the individual buttons.

```razor title="ButtonGroupCustomStylesExample"
<MudButtonGroup Color="Color.Primary" Variant="Variant.Outlined" OverrideStyles="_overrideStyles">
    <MudButton Color="Color.Primary" Variant="Variant.Outlined">One</MudButton>
    <MudButton Color="Color.Warning" Variant="Variant.Outlined">Two</MudButton>
    <MudButton Color="Color.Secondary" Variant="Variant.Outlined">Three</MudButton>
</MudButtonGroup>

<MudSwitch @bind-Value="_overrideStyles" Label="Override styles" Color="Color.Primary" />

@code {
    private bool _overrideStyles;
}
```
