# Menu

```razor title="MenuSimpleExample"
<MudMenu Label="Open menu">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>
```

Dense menus are more compact than regular menus and open instantly, suitable for desktop platforms.

```razor title="MenuDenseExample"
<MudMenu Label="Open dense menu" Dense="true">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>
```

The activator is the element responsible for spawning the menu popover.

The default menu button provides many of the same options as a standard button.

```razor title="MenuCustomizationExample"
<MudMenu Label="Open Menu" Color="Color.Primary" Size="Size.Large" Variant="Variant.Filled">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>

<MudMenu Label="Open Menu" Color="Color.Secondary" Size="Size.Medium" Variant="Variant.Text">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>

<MudMenu Label="Open Menu" Color="Color.Tertiary" Size="Size.Small" Variant="Variant.Outlined">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>

<MudMenu Label="EndIcon" Variant="Variant.Filled" EndIcon="@Icons.Material.Filled.KeyboardArrowDown">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>

<MudMenu Label="EndIcon + IconColor" Variant="Variant.Filled" EndIcon="@Icons.Material.Filled.KeyboardArrowDown" IconColor="Color.Secondary">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>

<MudMenu Label="StartIcon + EndIcon" Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.Translate" EndIcon="@Icons.Material.Filled.KeyboardArrowDown">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>
```

When the `@nameof(MudMenu.Icon)` property is specified, the activator is rendered as a `MudIconButton` instead.
 Note: This is not the same as `@nameof(MudMenu.StartIcon)` or `@nameof(MudMenu.EndIcon)` which are used to add icons to the default button activator as seen above.

```razor title="MenuIconButtonsExample"
<MudMenu Icon="@Icons.Material.Filled.MoreVert"
         AriaLabel="Open user menu">
    <MudMenuItem Label="Profile" />
    <MudMenuItem Label="My account" />
    <MudMenuItem Label="Logout" />
</MudMenu>

<MudMenu Icon="@Icons.Material.Filled.Settings"
         Color="Color.Primary"
         AriaLabel="Open user menu">
    <MudMenuItem Label="Profile" />
    <MudMenuItem Label="My account" />
    <MudMenuItem Label="Logout" />
</MudMenu>

<MudMenu Icon="@Icons.Material.Filled.Favorite"
         Color="Color.Secondary"
         AriaLabel="Open user menu">
    <MudMenuItem Label="Profile" />
    <MudMenuItem Label="My account" />
    <MudMenuItem Label="Logout" />
</MudMenu>
```

Use `ActivatorContent` when the built-in activators are not enough.
 Wire click and right-click activators to the provided menu context; for hover, set `ActivationEvent` to `MouseEvent.MouseOver` and let `MudMenu` handle pointer events.
 Add `tabindex="0"` to activators generated from code or conditional markup so they can receive keyboard focus.

```razor title="MenuActivatorExample1"
<MudMenu>
    <ActivatorContent>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@context.ToggleAsync">Button</MudButton>
    </ActivatorContent>
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
    </ChildContent>
</MudMenu>

<MudMenu>
    <ActivatorContent>
        <MudChip T="string" Icon="@Icons.Material.Filled.Person" Color="Color.Primary" OnClick="@(() => context.ToggleAsync())">Chip</MudChip>
    </ActivatorContent>
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
    </ChildContent>
</MudMenu>

<MudMenu>
    <ActivatorContent>
        <div @onclick="@context.ToggleAsync" style="cursor: pointer">
            <MudAvatar>
                <MudImage Src="images/toiletvisit.jpg" />
            </MudAvatar>
        </div>
    </ActivatorContent>
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
    </ChildContent>
</MudMenu>

<MudMenu ActivationEvent="@MouseEvent.RightClick">
    <ActivatorContent>
        <div @oncontextmenu="@context.ToggleAsync" @oncontextmenu:preventDefault style="display: inline-flex">
            <MudChip T="string" Icon="@Icons.Material.Filled.Mouse" Color="Color.Primary">Right Click</MudChip>
        </div>
    </ActivatorContent>
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
    </ChildContent>
</MudMenu>

<MudMenu ActivationEvent="@MouseEvent.MouseOver" AnchorOrigin="Origin.BottomCenter" TransformOrigin="Origin.TopCenter">
    <ActivatorContent>
        <MudChip T="string" Icon="@Icons.Material.Filled.Mouse" Color="Color.Primary">Mouse Over</MudChip>
    </ActivatorContent>
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
    </ChildContent>
</MudMenu>
```

Use the `Icon` property on a menu item to show an icon and `IconColor` to change its color.

```razor title="MenuItemCustomizationExample"
<MudMenu Label="Open menu with icons">
    <MudMenuItem Icon="@Icons.Material.Filled.Chair" Label="Chair" />
    <MudMenuItem Icon="@Icons.Material.Filled.DoorFront" IconColor="Color.Secondary" Label="Door" />
    <MudMenuItem Icon="@Icons.Material.Filled.Window" IconColor="Color.Tertiary" Label="Window" />
</MudMenu>

<MudMenu Label="Open menu with dense icons" Dense>
    <MudMenuItem Icon="@Icons.Material.Filled.Chair" Label="Chair" />
    <MudMenuItem Icon="@Icons.Material.Filled.DoorFront" IconColor="Color.Secondary" Label="Door" />
    <MudMenuItem Icon="@Icons.Material.Filled.Window" IconColor="Color.Tertiary" Label="Window" />
</MudMenu>
```

You can insert a `MudDivider` between menu items to separate them.

```razor title="MenuDividerExample"
<MudMenu Label="Open menu with divider">
    <MudMenuItem Label="Preview" Icon="@Icons.Material.Filled.Visibility" />
    <MudMenuItem Label="Share" Icon="@Icons.Material.Filled.Share" />
    <MudMenuItem Label="Get Link" Icon="@Icons.Material.Filled.Link" />
    <MudDivider />
    <MudMenuItem Label="Remove" Icon="@Icons.Material.Filled.Delete" />
</MudMenu>
```

The menu's height is automatically restricted to the viewport if it gets too large,
 but if you need it to be a specific number of pixels you can use the `MaxHeight` property.

```razor title="MenuMaxHeightExample"
<MudMenu Label="Open scrollable menu" MaxHeight="200" FullWidth="true">
    <MudMenuItem Label="Long" />
    <MudMenuItem Label="List" />
    <MudMenuItem Label="Is" />
    <MudMenuItem Label="To" />
    <MudMenuItem Label="Long" />
    <MudMenuItem Label="Lets" />
    <MudMenuItem Label="Limit" />
    <MudMenuItem Label="Height" />
</MudMenu>
```

Cascading menus, also known as nested menus, allow users to navigate a wide range of options by presenting menus with multiple levels of hierarchy.
 Click or hover your mouse over submenus (denoted by an arrow icon) to open them.

```razor title="MenuWithNestingExample"
<MudMenu Label="Open nested menu" Dense>
    <MudMenuItem Label="Add reaction" />
    <MudMenuItem Label="Add bookmark" />

    <MudMenu Label="Format">
        <MudMenu Label="Text" StartIcon="@Icons.Material.Filled.FormatBold">
            <MudMenuItem Label="Bold" Icon="@Icons.Material.Filled.FormatBold" />
            <MudMenuItem Label="Italic" Icon="@Icons.Material.Filled.FormatItalic" />
            <MudMenuItem Label="Underline" Icon="@Icons.Material.Filled.FormatUnderlined" />

            <MudMenu Label="Size">
                <MudMenuItem Label="Increase font size" />
                <MudMenuItem Label="Decrease font size" />
            </MudMenu>
        </MudMenu>

        <MudMenu Label="Points">
            <MudMenuItem Label="Bullet" Icon="@Icons.Material.Filled.FormatListBulleted" IconColor="Color.Secondary" />
            <MudMenuItem Label="Number" Icon="@Icons.Material.Filled.FormatListNumbered" IconColor="Color.Secondary" />
        </MudMenu>

        <MudMenu Label="Alignment">
            <MudMenuItem Label="Left" Icon="@Icons.Material.Filled.FormatAlignLeft" IconColor="Color.Tertiary" />
            <MudMenuItem Label="Right" Icon="@Icons.Material.Filled.FormatAlignRight" IconColor="Color.Tertiary" />
        </MudMenu>

        <MudMenuItem Label="Clear formatting" />
        <MudMenuItem Label="Headers and footers" />
    </MudMenu>
</MudMenu>
```

The `Open` parameter supports two-way binding,
 allowing you to control the menu's visibility programmatically and synchronize its state with a boolean property.

```razor title="MenuTwoWayBindingExample"
<MudMenu Label="Open menu" @bind-Open="_open">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
</MudMenu>

<MudButton Color="Color.Primary" OnClick="OnOpen">Open for 1 second</MudButton>
<MudSwitch Color="Color.Primary" @bind-Value="_open" Label="Open" />

@code {
    private bool _open;

    private async Task OnOpen()
    {
        _open = true;
        await Task.Delay(1000);
        _open = false;
    }
}
```

Use `ActivationEvent` to choose which mouse event opens a menu with a built-in activator.
 With `ActivatorContent`, wire only events that are not handled automatically, such as custom right-click.
 Nested menus may handle activation differently.

```razor title="MenuActivatorExample2"
<MudMenu Label="Left Click" FullWidth="true" ActivationEvent="@MouseEvent.LeftClick" Variant="Variant.Filled" Color="Color.Primary">
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
        <MudMenuItem Label="Sign Out" />
    </ChildContent>
</MudMenu>

<MudMenu Label="Right Click" ActivationEvent="@MouseEvent.RightClick" Variant="Variant.Filled" Color="Color.Primary">
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
        <MudMenuItem Label="Sign Out" />
    </ChildContent>
</MudMenu>

<MudMenu Label="Mouse Over" FullWidth="true" ActivationEvent="@MouseEvent.MouseOver" Variant="Variant.Filled" Color="Color.Primary" AnchorOrigin="Origin.BottomCenter" TransformOrigin="Origin.TopCenter">
    <ChildContent>
        <MudMenuItem Label="Profile" />
        <MudMenuItem Label="Theme" />
        <MudMenuItem Label="Usage" />
        <MudMenuItem Label="Sign Out" />
    </ChildContent>
</MudMenu>
```

Enable the `PositionAtCursor` property to open the menu at the cursor's location.

```razor title="MenuActivatorOnMouseExample"
<MudMenu PositionAtCursor="true">
    <ActivatorContent>
        <div @onclick="@context.ToggleAsync" style="cursor: pointer">
            <MudCard>
                <MudCardMedia Image="images/door.jpg" Height="200" />
                <MudCardContent>
                    <MudText Typo="Typo.h5">Old Paint</MudText>
                    <MudText Typo="Typo.body2">Old paint found on a stone house door.</MudText>
                    <MudText Typo="Typo.body2">This photo was taken in a small village in Istra Croatia.</MudText>
                </MudCardContent>
            </MudCard>
        </div>
    </ActivatorContent>
    <ChildContent>
        <MudMenuItem Label="Undo" />
        <MudMenuItem Label="Redo" Disabled />
        <MudDivider />
        <MudMenuItem Label="Cut" />
        <MudMenuItem Label="Copy" />
        <MudMenuItem Label="Paste" />
    </ChildContent>
</MudMenu>
```

The previous example can be extended to create a contextual menu.
 When `Label`, `Icon`, and `ActivatorContent` are unset, no button is rendered and the menu can only be opened programmatically.

```razor title="MenuContextMenuExample"
<MudCard>
    <MudCardHeader>
        <CardHeaderContent>
            <MudText Typo="Typo.body1">Istra Croatia</MudText>
            <MudText Typo="Typo.body2">Peninsula in Europe</MudText>
        </CardHeaderContent>
    </MudCardHeader>
    <div @onclick="@(OpenContextMenu)" @oncontextmenu="@(OpenContextMenu)" @oncontextmenu:preventDefault @oncontextmenu:stopPropagation>
        <MudCardMedia Image="images/pilars.jpg" Height="250"/>
    </div>
    <MudCardContent>
        <MudText Typo="Typo.body2">Try left clicking or right clicking the image to open the menu.</MudText>
    </MudCardContent>
</MudCard>

<MudMenu PositionAtCursor @ref="_contextMenu">
    <MudMenuItem Label="Undo" />
    <MudMenuItem Label="Redo" Disabled />
    <MudDivider />
    <MudMenuItem Label="Cut" />
    <MudMenuItem Label="Copy" />
    <MudMenuItem Label="Paste" />
</MudMenu>

@code {
#nullable enable
    private MudMenu _contextMenu = null!;

    private async Task OpenContextMenu(MouseEventArgs args)
    {
        await _contextMenu.OpenMenuAsync(args);
    }
}
```

The component uses [MudPopover](/components/popover) to place its menu. Adjust the
 `AnchorOrigin` and `TransformOrigin` properties to control the menu's position.
 For more details and examples, visit the [popover documentation page](/components/popover).

```razor title="MenuAdvancedPopoverExample"
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
        <MudBadge Origin="@AnchorOrigin" Color="Color.Primary" Icon="@GetIcon()" Overlap="true" Elevation="4">
            <MudMenu Label="Advanced Placement" Variant="Variant.Filled" AnchorOrigin="@AnchorOrigin" TransformOrigin="@TransformOrigin" Color="Color.Default" Size="Size.Large">
                <MudMenuItem Label="Enlist" />
                <MudMenuItem Label="Barracks" />
                <MudMenuItem Label="Armory" />
            </MudMenu>
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

        switch (TransformOrigin)
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

        if (pos[0] == "center")
        {
            align = "align-center";
        }
        else if (pos[0] == "top")
        {
            align = "align-start";
        }
        else if (pos[0] == "bottom")
        {
            align = "align-end";
        }
        if (pos[1] == "left")
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

        return $"absolute mud-height-full mud-width-full d-flex ma-n3 {align} {justify}";
    }
}
```

By default, the menu is modal, meaning that you cannot interact with other elements while it is open.
 To allow interactions with other elements, set the `Modal` property to `false`.

```razor title="MenuModalExample"
<MudMenu Label="Open non-modal menu">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
    <MudMenu Label="More">
        <MudMenuItem Label="Item 4" />
        <MudMenuItem Label="Item 5" />
        <MudMenuItem Label="Item 6" />
    </MudMenu>
</MudMenu>

<MudMenu Label="Open modal menu" Modal="true">
    <MudMenuItem Label="Item 1" />
    <MudMenuItem Label="Item 2" />
    <MudMenuItem Label="Item 3" />
    <MudMenu Label="More">
        <MudMenuItem Label="Item 4" />
        <MudMenuItem Label="Item 5" />
        <MudMenuItem Label="Item 6" />
    </MudMenu>
</MudMenu>
```

## Further examples

```razor title="MenuAnchorOriginExample"
<MudGrid>
    <MudItem xs="12" md="3">
        <MudText Typo="Typo.h6">Anchor Origin</MudText>
        <MudRadioGroup T="Origin" @bind-Value="AnchorOrigin" Class="d-flex flex-column my-2">
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.TopLeft">Top-Left</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.TopRight">Top-Right</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.BottomLeft">Bottom-Left</MudRadio>
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.BottomRight">Bottom-Right</MudRadio>
        </MudRadioGroup>
        <MudText Typo="Typo.h6">Transform Origin</MudText>
        <MudRadioGroup T="Origin" @bind-Value="TransformOrigin" Class="d-flex flex-column  my-2">
            <MudRadio Color="Color.Primary" Dense="true" Value="Origin.TopCenter" Disabled="true">Top-Center</MudRadio>
        </MudRadioGroup>
    </MudItem>
    <MudItem xs="12" md="9" Class="d-flex align-center justify-center flex-column">
        <MudMenu Label="Change Anchor Origin" Variant="Variant.Filled" Color="Color.Info" AnchorOrigin="@AnchorOrigin" TransformOrigin="@TransformOrigin">
            <MudMenuItem Label="1" />
            <MudMenuItem Label="2" />
            <MudMenuItem Label="3" />
        </MudMenu>
        <MudText Typo="Typo.overline">Click the button to see effect</MudText>
    </MudItem>
</MudGrid>

@code {
    public Origin AnchorOrigin { get; set; } = Origin.TopLeft;
    public Origin TransformOrigin { get; set; } = Origin.TopCenter;
}
```
