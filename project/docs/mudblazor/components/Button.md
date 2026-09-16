# Button

Filled Buttons have elevation (box shadow) and is raised on click by default.

```razor title="ButtonFilledExample"
<MudButton Variant="Variant.Filled">Default</MudButton>
<MudButton Variant="Variant.Filled" Color="Color.Primary">Primary</MudButton>
<MudButton Variant="Variant.Filled" Color="Color.Secondary">Secondary</MudButton>
<MudButton Variant="Variant.Filled" Disabled="true">Disabled</MudButton>
```

The drop shadow, sometimes also called elevation, can be controlled with the `DropShadow` bool.`Color` property only applies to the text.

```razor title="ButtonDropShadowExample"
<MudButton Variant="Variant.Filled" DropShadow="false" Color="Color.Primary">Disable elevation</MudButton>
```

Text Buttons have no drop shadow, background or border and only hover effect is used. The `Color` property only applies to the text.

```razor title="ButtonTextExample"
<MudButton Variant="Variant.Text">Default</MudButton>
<MudButton Variant="Variant.Text" Color="Color.Primary">Primary</MudButton>
<MudButton Variant="Variant.Text" Color="Color.Secondary">Secondary</MudButton>
<MudButton Variant="Variant.Text" Disabled="true">Disabled</MudButton>
```

Outlined Buttons are similar to Text Buttons except for the border that inherits its color from the set `Color` property.

```razor title="ButtonOutlinedExample"
<MudButton Variant="Variant.Outlined">Default</MudButton>
<MudButton Variant="Variant.Outlined" Color="Color.Primary">Primary</MudButton>
<MudButton Variant="Variant.Outlined" Color="Color.Secondary">Secondary</MudButton>
<MudButton Variant="Variant.Outlined" Disabled="true">Disabled</MudButton>
```

The default button size is `Size.Medium` and, by default, the icon size uses the button size.

```razor title="ButtonSizeExample"
<MudButton Variant="Variant.Filled" Size="Size.Small"  Color="Color.Primary">Small</MudButton>
<MudButton Variant="Variant.Filled" Size="Size.Medium" Color="Color.Secondary">Medium</MudButton>
<MudButton Variant="Variant.Filled" Size="Size.Large"  Color="Color.Tertiary">Large</MudButton>
```

Buttons that have `FullWidth=true` extend to 100% of available width.

```razor title="ButtonFullWidthExample"
<MudButton Variant="Variant.Filled" Color="Color.Primary" FullWidth="true">Full Width Button</MudButton>
```

You can define an icon for either the start or the end.

 Use `IconSize` to set a different icon size.

```razor title="ButtonIconLabelExample"
<MudButton Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.Delete" Color="Color.Error">Delete</MudButton>
<MudButton Variant="Variant.Filled" EndIcon="@Icons.Material.Filled.Send" Color="Color.Primary">Send</MudButton>
<MudButton Variant="Variant.Filled" StartIcon="@Icons.Custom.Uncategorized.Radioactive" Color="Color.Warning">Warning</MudButton>
<MudButton Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.Mic" IconColor="Color.Error">Talk</MudButton>
<MudButton Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.Save" Color="Color.Info"  Size="Size.Small">Save</MudButton>
<MudButton Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.Save" IconColor="Color.Secondary" Size="Size.Large">Save</MudButton>
```

```razor title="ButtonCustomizedExample"
<MudButton Variant="Variant.Filled" EndIcon="@Icons.Material.Filled.ArrowDownward" Style="background-color: yellowgreen; color: white; width: 200px; height: 60px;">
    Download now
</MudButton>
```

```razor title="ButtonLoadingExample"
<MudButton Disabled="@_processing" OnClick="ProcessSomething" Variant="Variant.Filled" Color="Color.Primary">
    @if (_processing)
    {
        <MudProgressCircular Class="ms-n1" Size="Size.Small" Indeterminate="true"/>
        <MudText Class="ms-2">Processing</MudText>
    }
    else
    {
        <MudText>Click me</MudText>
    }
</MudButton>

@code {
    private bool _processing = false;

    async Task ProcessSomething()
    {
        _processing = true;
        await Task.Delay(2000);
        _processing = false;
    }
}
```

A `MudMenu` and `MudButtonGroup` can be used to create a split button.

Set the `Href` parameter and the MudButton will render an anchor element. If you also set the `Target` parameter to `_blank`, the component will add `rel="noopener"` automatically.
 If you set the `Disabled` parameter to `true`, the component will render a button with no `href` attribute.

```razor title="ButtonLinkExample"
<MudButton Href="https://github.com/MudBlazor/MudBlazor"
           Target="_blank"
           Variant="Variant.Filled"
           EndIcon="@Icons.Custom.Brands.GitHub"
           Color="Color.Primary"
           Disabled=@disabled>
    GitHub Link
</MudButton>
<MudButton Href="https://github.com/MudBlazor/MudBlazor"
           Target="_blank"
           Variant="Variant.Text"
           EndIcon="@Icons.Custom.Brands.GitHub"
           Color="Color.Secondary"
           Style="text-transform:none"
           Disabled=@disabled>
    GitHub Link
</MudButton>
<MudButton Href="https://github.com/MudBlazor/MudBlazor"
           Target="_blank"
           Variant="Variant.Outlined"
           EndIcon="@Icons.Custom.Brands.GitHub"
           Color="Color.Tertiary"
           Disabled=@disabled>
    GitHub Link
</MudButton>
<br />
<MudSwitch Color="Color.Primary" @bind-Value=@(disabled) Label="Disable" />

@code{
    bool disabled = false;
}
```

If you set a non-null string to `Rel` parameter, the component will add `rel` to the rendered button with the value you specified. This overrides the automatic addition of `rel="noopener"` when setting `Target` to `_blank`. If you want to preserve `noopener`, add it manually along with your custom `Rel` value, for example `rel="nofollow noopener"`.

```razor title="ButtonNofollowExample"
<MudButton Href="https://github.com/MudBlazor/MudBlazor"
           Rel="nofollow"
           Variant="Variant.Filled"
           EndIcon="@Icons.Custom.Brands.GitHub"
           Color="Color.Primary">
    GitHub Link
</MudButton>
<MudButton Href="https://github.com/MudBlazor/MudBlazor"
           Target="_blank"
           Rel="nofollow noopener"
           Variant="Variant.Outlined"
           EndIcon="@Icons.Custom.Brands.GitHub"
           Color="Color.Tertiary">
    GitHub Link
</MudButton>
```
