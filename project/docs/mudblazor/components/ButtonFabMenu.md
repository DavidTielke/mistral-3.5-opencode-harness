# ButtonFabMenu

When no `Variant` is set, the menu and its items use `Variant.Filled` by default.

```razor title="FabMenuExampleVariantDefault"
<MudFabMenu StartIcon="@Icons.Material.Outlined.Send" Color="Color.Primary">
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Slack" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Discord" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Gmail" Color="Color.Primary" />
</MudFabMenu>
```

Filled menus have elevation and a solid background. Use `DropShadow="false"` to remove the elevation.

```razor title="FabMenuExampleVariantFilled"
<MudFabMenu Variant="Variant.Filled" StartIcon="@Icons.Material.Outlined.Send" Color="Color.Primary">
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Slack" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Discord" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Gmail" Color="Color.Primary" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Filled" StartIcon="@Icons.Material.Outlined.Brush" Color="Color.Secondary">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatBold" Color="Color.Secondary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatItalic" Color="Color.Secondary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatUnderlined" Color="Color.Secondary" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Filled" StartIcon="@Icons.Material.Outlined.Share" Color="Color.Tertiary" DropShadow="false">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Link" Color="Color.Tertiary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.QrCode" Color="Color.Tertiary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Email" Color="Color.Tertiary" />
</MudFabMenu>
```

Outlined menus and items have a border that inherits its color from the `Color` property, with no background fill.

```razor title="FabMenuExampleVariantOutlined"
<MudFabMenu Variant="Variant.Outlined" StartIcon="@Icons.Material.Outlined.Send">
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Slack" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Discord" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Gmail" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Outlined" StartIcon="@Icons.Material.Outlined.Brush" Color="Color.Primary">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatBold" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatItalic" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatUnderlined" Color="Color.Primary" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Outlined" StartIcon="@Icons.Material.Outlined.Share" Color="Color.Secondary">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Link" Color="Color.Secondary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.QrCode" Color="Color.Secondary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Email" Color="Color.Secondary" />
</MudFabMenu>
```

Text menus and items have no background, border, or drop shadow. Only a hover effect is applied. Contrast against the underlying surface is the consumer's responsibility.

```razor title="FabMenuExampleVariantText"
<MudFabMenu Variant="Variant.Text" StartIcon="@Icons.Material.Outlined.Send">
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Slack" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Discord" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Gmail" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Text" StartIcon="@Icons.Material.Outlined.Brush" Color="Color.Primary">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatBold" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatItalic" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatUnderlined" Color="Color.Primary" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Text" StartIcon="@Icons.Material.Outlined.Share" Color="Color.Secondary">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Link" Color="Color.Secondary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.QrCode" Color="Color.Secondary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Email" Color="Color.Secondary" />
</MudFabMenu>
```

Menu items inherit the `Variant` from the parent `MudFabMenu` when no `Variant` is set on the item itself. This example shows all three variants applied at the menu level so items inherit accordingly.

```razor title="FabMenuExampleVariantInherited"
<MudFabMenu Variant="Variant.Filled" StartIcon="@Icons.Material.Outlined.Send" Color="Color.Primary">
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Slack" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Discord" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Gmail" Color="Color.Primary" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Outlined" StartIcon="@Icons.Material.Outlined.Brush" Color="Color.Primary">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatBold" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatItalic" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.FormatUnderlined" Color="Color.Primary" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Text" StartIcon="@Icons.Material.Outlined.Share" Color="Color.Primary">
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Link" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.QrCode" Color="Color.Primary" />
    <MudFabMenuItem StartIcon="@Icons.Material.Outlined.Email" Color="Color.Primary" />
</MudFabMenu>
```

Each `MudFabMenuItem` can have its own explicit `Variant`, allowing different styles within the same menu.

```razor title="FabMenuExampleVariantMixed"
<MudFabMenu Variant="Variant.Filled" StartIcon="@Icons.Material.Outlined.Share" Color="Color.Primary">
    <MudFabMenuItem Variant="Variant.Filled" StartIcon="@Icons.Custom.Brands.Slack" Color="Color.Primary" />
    <MudFabMenuItem Variant="Variant.Outlined" StartIcon="@Icons.Custom.Brands.Discord" Color="Color.Secondary" />
    <MudFabMenuItem Variant="Variant.Text" StartIcon="@Icons.Custom.Brands.Gmail" Color="Color.Tertiary" />
</MudFabMenu>

<MudFabMenu Variant="Variant.Outlined" StartIcon="@Icons.Material.Outlined.Brush" Color="Color.Secondary">
    <MudFabMenuItem Variant="Variant.Text" StartIcon="@Icons.Material.Outlined.FormatBold" Color="Color.Primary" />
    <MudFabMenuItem Variant="Variant.Outlined" StartIcon="@Icons.Material.Outlined.FormatItalic" Color="Color.Secondary" />
    <MudFabMenuItem Variant="Variant.Filled" StartIcon="@Icons.Material.Outlined.FormatUnderlined" Color="Color.Tertiary" />
</MudFabMenu>
```

## Further examples

```razor title="FabMenuExampleBasic"
<MudStack Row="true" Style="width: 300px;" Justify="Justify.SpaceBetween" AlignItems="AlignItems.Center">
    <MudStack Spacing="0">
        <MudSwitch @bind-Value="_open" Label="@(_open ? "Opened" : "Closed")" Color="Color.Primary"/>
        <MudSwitch @bind-Value="_fixed" Label="@(_fixed ? "Fixed" : "Relative")" Color="Color.Primary"/>
    </MudStack>
    <MudFabMenu StartIcon="@Icons.Material.Outlined.Send" Color="Color.Primary" @bind-Open="@_open" Fixed="@_fixed">
        <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Slack"/>
        <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Discord"/>
        <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Gmail"/>
    </MudFabMenu>
</MudStack>

@code
{
    private bool _open;
    private bool _fixed;
}
```

```razor title="FabMenuExampleDirection"
<MudStack Row Justify="Justify.SpaceBetween" AlignItems="AlignItems.Center" Style="width:400px;" Breakpoint="Breakpoint.SmAndDown">
    <MudStack>
        <MudText>Direction: @_direction</MudText>
        <MudToggleGroup T="Direction" SelectionMode="SelectionMode.SingleSelection" @bind-Value="_direction" Color="Color.Primary" CheckMark FixedContent Vertical>
            <MudToggleItem Value="@Direction.Top" Text="Top" />
            <MudToggleItem Value="@Direction.Right" Text="Right" />
            <MudToggleItem Value="@Direction.Bottom" Text="Bottom" />
            <MudToggleItem Value="@Direction.Left" Text="Left" />
        </MudToggleGroup>
    </MudStack>
    <MudFabMenu StartIcon="@Icons.Material.Outlined.Send" Color="Color.Primary" Direction="@_direction">
        <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Slack" Color="Color.Secondary" />
        <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Discord" Color="Color.Secondary" />
        <MudFabMenuItem StartIcon="@Icons.Custom.Brands.Gmail" Color="Color.Secondary" />
    </MudFabMenu>
</MudStack>


@code {
    private Direction _direction = Direction.Top;
}
```

```razor title="FabMenuExampleStyling"
<MudFabMenu StartIcon="@Icons.Material.Outlined.Settings" Color="Color.Primary" DampenItemsBackgroundColor="false" UseCloseIcon="false" Size="Size.Small">
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.LooksOne" Color="Color.Primary" Size="Size.Small"/>
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.LooksTwo" Color="Color.Primary" Size="Size.Small" />
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.Looks3" Color="Color.Primary" Size="Size.Small" />
</MudFabMenu>

<MudFabMenu StartIcon="@Icons.Material.Outlined.Send" Color="Color.Secondary" AlignItems="AlignItems.End">
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.LooksOne" Label="One" Color="Color.Secondary"/>
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.LooksTwo" Label="Two" Color="Color.Secondary"/>
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.Looks3" Label="Three" Color="Color.Secondary"/>
</MudFabMenu>

<MudFabMenu Label="Menu" Color="Color.Tertiary" AlignItems="AlignItems.End" OpenOnMouseHover="false" CloseOnMenuItemClicked="false">
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.LooksOne" Label="One" Color="Color.Tertiary" Style="color: rgb(33, 33, 33);"/>
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.LooksTwo" Label="Two" Color="Color.Tertiary" Style="color: rgb(33, 33, 33);"/>
    <MudFabMenuItem EndIcon="@Icons.Material.Outlined.Looks3" Label="Three" Color="Color.Tertiary" Style="color: rgb(33, 33, 33);"/>
</MudFabMenu>
```
