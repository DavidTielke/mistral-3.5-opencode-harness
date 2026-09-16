# IconButton

With the library's preloaded icons. Check out our [icon page](/features/icons) to find out what you can use.

```razor title="IconButtonSimpleExample"
<MudIconButton Icon="@Icons.Material.Filled.Delete" aria-label="delete" />
<MudIconButton Icon="@Icons.Custom.Brands.GitHub" Color="Color.Primary" aria-label="github" />
<MudIconButton Icon="@Icons.Material.Filled.Favorite" Color="Color.Secondary" aria-label="add to favorite" />
<MudIconButton Icon="@Icons.Material.Filled.Share" Disabled="true" aria-label="share" />
```

In this example, we are passing down [Font Awesome](https://fontawesome.com/icons) icon classes instead.

```razor title="IconButtonFontIconExample"
<link href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" rel="stylesheet">

<MudIconButton Icon="fas fa-atom" Color="Color.Error" />
<MudIconButton Icon="fas fa-fighter-jet" Color="Color.Dark" />
<MudIconButton Icon="fas fa-globe-europe" Color="Color.Tertiary" />
<MudIconButton Icon="fas fa-bug" Disabled="true" />
```

If preferred, it's possible to apply the same style of a text button using the `Variant` parameter.

```razor title="IconButtonStyleExample"
<MudIconButton Icon="@Icons.Material.Filled.Delete" Variant="Variant.Outlined" Color="Color.Primary" Size="Size.Small" />
<MudIconButton Icon="@Icons.Material.Filled.Delete" Variant="Variant.Outlined" Color="Color.Primary" Size="Size.Medium"/>
<MudIconButton Icon="@Icons.Material.Filled.Delete" Variant="Variant.Outlined" Color="Color.Primary" Size="Size.Large" />
<MudIconButton Icon="@Icons.Material.Filled.Delete" Variant="Variant.Filled" Color="Color.Primary" Size="Size.Large" />
<MudIconButton Icon="@Icons.Material.Filled.Delete" Variant="Variant.Filled" Color="Color.Primary" Size="Size.Medium" />
<MudIconButton Icon="@Icons.Material.Filled.Delete" Variant="Variant.Filled" Color="Color.Primary" Size="Size.Small" />
```
