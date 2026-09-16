# ButtonFAB

The simplest FAB with no variant set, using the default `Variant.Filled`.

```razor title="FabSimpleExample"
<MudFab Color="Color.Primary" StartIcon="@Icons.Material.Filled.Add" />
<MudFab Color="Color.Secondary" StartIcon="@Icons.Material.Filled.Edit" />
<MudFab Color="Color.Tertiary" StartIcon="@Icons.Material.Filled.ShoppingCart" DropShadow="false" />
<MudFab StartIcon="@Icons.Material.Filled.Bookmark" Label="Bookmark" />
<MudFab StartIcon="@Icons.Material.Filled.Save" Disabled="true" />
```

Filled FABs have elevation (box shadow) and are raised on click by default.

```razor title="FabFilledExample"
<MudFab Variant="Variant.Filled" Color="Color.Primary" StartIcon="@Icons.Material.Filled.Add" />
<MudFab Variant="Variant.Filled" Color="Color.Secondary" StartIcon="@Icons.Material.Filled.Edit" />
<MudFab Variant="Variant.Filled" Color="Color.Tertiary" StartIcon="@Icons.Material.Filled.ShoppingCart" DropShadow="false" />
<MudFab Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.Bookmark" Label="Bookmark" />
<MudFab Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.Save" Disabled="true" />
```

Text FABs have no drop shadow, background or border and only a hover effect is used. The `Color` property only applies to the icon and label. Because there is no background container, contrast against the surface the FAB floats over is the consumer's responsibility.

```razor title="FabTextExample"
<MudFab Variant="Variant.Text" StartIcon="@Icons.Material.Filled.Add" />
<MudFab Variant="Variant.Text" Color="Color.Primary" StartIcon="@Icons.Material.Filled.Edit" />
<MudFab Variant="Variant.Text" Color="Color.Secondary" StartIcon="@Icons.Material.Filled.ShoppingCart" />
<MudFab Variant="Variant.Text" Color="Color.Primary" StartIcon="@Icons.Material.Filled.Bookmark" Label="Bookmark" />
<MudFab Variant="Variant.Text" StartIcon="@Icons.Material.Filled.Save" Disabled="true" />
```

Outlined FABs are similar to Text FABs except for the border that inherits its color from the set `Color` property. As with Text FABs, there is no background container, so contrast against the underlying surface is the consumer's responsibility.

```razor title="FabOutlinedExample"
<MudFab Variant="Variant.Outlined" StartIcon="@Icons.Material.Filled.Add" />
<MudFab Variant="Variant.Outlined" Color="Color.Primary" StartIcon="@Icons.Material.Filled.Edit" />
<MudFab Variant="Variant.Outlined" Color="Color.Secondary" StartIcon="@Icons.Material.Filled.ShoppingCart" />
<MudFab Variant="Variant.Outlined" Color="Color.Primary" StartIcon="@Icons.Material.Filled.Bookmark" Label="Bookmark" />
<MudFab Variant="Variant.Outlined" StartIcon="@Icons.Material.Filled.Save" Disabled="true" />
```

```razor title="FabSizeExample"
<MudFab Color="Color.Secondary" StartIcon="@Icons.Material.Filled.Add" Size="Size.Small" />
<MudFab Color="Color.Secondary" StartIcon="@Icons.Material.Filled.Add" Size="Size.Medium" />
<MudFab Color="Color.Secondary" StartIcon="@Icons.Material.Filled.Add" Size="Size.Large" />
```
