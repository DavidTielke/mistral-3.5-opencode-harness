# Colors

Each palette color gets converted to a class with the color as background and its contrast, but also separate classes for only background or text color. The CSS class is bound to the MudBlazor theme and updated if you change the theme dynamically. 

 You can read more about theming [MudBlazor here.](/customization/overview)

Here we add each class to the divs to change the background color, text color and both background and text color with one class only.

```razor title="ColorsMudBlazorExample"
<MudPaper Class="pa-4 mud-info">.mud-info</MudPaper>
<MudPaper Class="pa-4 mud-secondary-text">.mud-secondary-text</MudPaper>
<MudPaper Class="pa-4 mud-theme-primary">.mud-theme-primary</MudPaper>
```

You can also access the colors with Blazor directly like we do in this example.

```razor title="ColorsMudBlazorCodeExample"
<MudPaper Class="pa-4" Style="@($"color:{Theme.PaletteLight.Dark}; background:{Theme.PaletteLight.Warning};")">
    Warning with Dark text
</MudPaper>
<MudPaper Class="pa-4" Style="@($"color:{Theme.PaletteLight.SuccessLighten}; background:{Theme.PaletteLight.Dark};")">
    Dark with Success lighten
</MudPaper>

@code {
    private MudTheme Theme = new MudTheme();
}
```

All Material colors, as well as background and text variants, are available for use in your application.

Here we add each class to the divs to change the background color, text color and both background and text color with one class only.

```razor title="ColorsMaterialExample"
<MudPaper Class="pa-4 red-text text-accent-4">
    .red-text .text-accent-4
</MudPaper>
<MudPaper Class="pa-4 blue darken-1 shades-text text-white">
    .blue .darken-1 .shades-text .text-white
</MudPaper>
```

You can also access the material colors with Blazor directly like we did above with the MudBlazor palette colors.

```razor title="ColorsMaterialCodeExample"
<MudPaper Class="pa-4" Style="@($"color:{Colors.Purple.Accent3};")">
    Colors.Purple.Accent3
</MudPaper>
<MudPaper Class="pa-4" Style="@($"color:{Colors.LightGreen.Accent3}; background:{Colors.BlueGray.Darken4};")">
    Colors.BlueGray.Darken4 Colors.LightGreen.Accent3
</MudPaper>
```

Below is a list of the Material Design color palette grouped by primary color.
