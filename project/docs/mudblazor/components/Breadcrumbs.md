# Breadcrumbs

```razor title="BreadcrumbsBasicExample"
<MudBreadcrumbs Items="_items"></MudBreadcrumbs>

@code {
    private List<BreadcrumbItem> _items =
    [
        new("Home", href: "#"),
        new("Link 1", href: "#"),
        new("Link 2", href: null, disabled: true)
    ];
}
```

```razor title="BreadcrumbsSeparatorExample"
<MudBreadcrumbs Items="_items" Separator=">"></MudBreadcrumbs>

@code {
    private List<BreadcrumbItem> _items =
    [
        new("Home", href: "#"),
        new("Link 1", href: "#"),
        new("Link 2", href: null, disabled: true)
    ];
}
```

It is also possible to provide a `RenderFragment` as a template.

```razor title="BreadcrumbsSeparatorTemplateExample"
<MudBreadcrumbs Items="_items">
    <SeparatorTemplate>
        <MudIcon Icon="@Icons.Material.Filled.ArrowForward" Size="Size.Small" />
    </SeparatorTemplate>
</MudBreadcrumbs>

@code {
    private List<BreadcrumbItem> _items =
    [
        new("Home", href: "#"),
        new("Link 1", href: "#"),
        new("Link 2", href: null, disabled: true)
    ];
}
```

```razor title="BreadcrumbsItemIconsExample"
<MudBreadcrumbs Items="_items"></MudBreadcrumbs>

@code {
    private List<BreadcrumbItem> _items =
    [
        new("Home", href: "#", icon: Icons.Material.Filled.Home),
        new("Videos", href: "#", icon: Icons.Material.Filled.VideoLibrary),
        new("Create", href: null, disabled: true, icon: Icons.Material.Filled.Create)
    ];
}
```

If you use the `ItemTemplate` parameter, MudBlazor doesn't wrap the content in anchors.

```razor title="BreadcrumbsItemTemplateExample"
<MudBreadcrumbs Items="_items">
    <ItemTemplate Context="item">
        <MudLink Href="@item.Href">@item.Text.ToUpper()</MudLink>
    </ItemTemplate>
</MudBreadcrumbs>

@code {
    private List<BreadcrumbItem> _items =
    [
        new("Home", href: "#"),
        new("Link 1", href: "#"),
        new("Link 2", href: null, disabled: true)
    ];
}
```

You can set the `MaxItems` parameter in order to automatically collapse the breadcrumbs when it exceeds a number of items.

```razor title="BreadcrumbsCollapsedExample"
<MudBreadcrumbs Items="_items" MaxItems="4"></MudBreadcrumbs>

@code {
    private List<BreadcrumbItem> _items =
    [
        new("Home", href: "#"),
        new("Link 1", href: "#"),
        new("Link 2", href: "#"),
        new("Link 3", href: "#"),
        new("Link 4", href: null, disabled: true)
    ];
}
```
