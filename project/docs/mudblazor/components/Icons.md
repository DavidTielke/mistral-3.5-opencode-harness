# Icons

See the full list of all icons that comes preloaded here: [MudBlazor Icons](/features/icons)

The MudIcon component shows the specified icon with the chosen style. You can use the `Title` attribute to improve accessibility with screen readers and show a tooltip on hover.

```razor title="IconsUsageExample"
<MudIcon Icon="@Icons.Material.Filled.Favorite" Title="Favorite" />
<MudIcon Icon="@Icons.Material.Filled.Api" Title="API" />
<MudIcon Icon="@Icons.Material.Filled.AddCircle" Title="Add" />
<MudIcon Icon="@Icons.Custom.Brands.GitHub" Title="GitHub" />
<MudIcon Icon="@Icons.Custom.Brands.Google" Title="Google" />
<MudIcon Icon="@Icons.Custom.Brands.Reddit" Title="Reddit" />
```

```razor title="IconsColorExample"
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Default" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Primary" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Secondary" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Success" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Info" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Warning" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Error" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Dark" />
```

```razor title="IconsSizeExample"
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Size="Size.Small" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" />
<MudIcon Icon="@Icons.Custom.Uncategorized.Radioactive" Size="Size.Large" />
```

Material icons that comes loaded with MudBlazor by default is available in Filled, Outlined, Rounded, Sharp and TwoToned.

```razor title="IconsMaterialVariantsExample"
<MudIcon Icon="@Icons.Material.Filled.ThumbUp" Style="font-size: 4rem;" />
<MudIcon Icon="@Icons.Material.Outlined.ThumbUp"  Style="font-size: 4rem;" />
<MudIcon Icon="@Icons.Material.Rounded.ThumbUp"  Style="font-size: 4rem;" />
<MudIcon Icon="@Icons.Material.Sharp.ThumbUp"  Style="font-size: 4rem;" />
<MudIcon Icon="@Icons.Material.TwoTone.ThumbUp"  Style="font-size: 4rem;" />
```

MudIcon also supports icon fonts. It supports class-based font icons such as [Font Awesome](https://fontawesome.com/)
 and text-based icon fonts such as [Material Symbols](https://fonts.google.com/icons). MudIcon uses different syntax to 
 distinguish them as explained below. If you don't know the type of your font icon library just try out which syntax works.

 Note: you can use font icons also in other components such as MudIconButton, MudButton and many more.

Most font icon libraries such as [Font Awesome](https://fontawesome.com/) use two CSS classes for each icon. Pass these to the 
 `Icon` parameter using the syntax `icon-font-class icon-class`.

```razor title="IconsFontAwesomeExample"
<link href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" rel="stylesheet">

<MudIcon Icon="fas fa-database" Color="Color.Primary" />
<MudIcon Icon="fas fa-home" Color="Color.Secondary" />
<MudIcon Icon="fas fa-search" />
<MudIconButton Icon="fas fa-sync-alt" />
<MudButton StartIcon="fas fa-paper-plane" Color="Color.Info" Variant="Variant.Filled">Send</MudButton>
```

Some icon libraries such as [Material Symbols](https://fonts.google.com/icons) use the inner text of an HTML element to determine which icon to display. 
 `MudIcon` supports these also via the syntax `icon-font-class/icon-name`

```razor title="IconsFontMaterialSymbolsSyntaxExample"
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

<MudIcon Icon="material-symbols-outlined/database" Color="Color.Primary"/>
<MudIcon Icon="material-symbols-outlined/home" Color="Color.Secondary"/>
<MudIcon Icon="material-symbols-outlined/search" />
<MudIconButton Icon="material-symbols-outlined/refresh" aria-label="refresh"/>
<MudButton StartIcon="material-symbols-outlined/send" Color="Color.Info" Variant="Variant.Filled">Send</MudButton>
```

The icon parameter of MudIcon, MudButton and other components are just SVG strings. 
 So changing an icon programmatically is as easy as assigning a new string.

 Also, if the icon you need is not available in [MudBlazor's icon library](/features/icons) you can just assign your own SVG. 
 The cube icon in this example is `cube-outline` from [Material Design Icons](https://materialdesignicons.com).

```razor title="ChangeIconProgrammaticallyExample"
<MudIcon Icon="@icons[index]" Color="Color.Primary" />
<MudButton Variant="Variant.Filled" OnClick="CycleIcons" DropShadow="false" Size="Size.Small">Cycle icon</MudButton>


@code{
    private int index = 0;
    private string[] icons = { Icons.Custom.Brands.MudBlazor, cube, Icons.Custom.Brands.GitHub };

    private void CycleIcons()
    {
        index = (index + 1) % 3;
    }

    const string cube = @"<svg style=""width:24px;height:24px"" viewBox=""0 0 24 24"">
    <path fill=""currentColor"" d=""M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z"" />
</svg>";
}
```
