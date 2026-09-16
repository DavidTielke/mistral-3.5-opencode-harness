# ColorPicker

```razor title="ColorPickerBasicExample"
@using MudBlazor.Utilities


<MudColorPicker Label="Basic Color Picker" @bind-Text="_colorValue" Style="@($"color: {_colorValue};")" Placeholder="Select Color" />

@code {
    private string _colorValue;
}
```

All parts of the color picker can be removed individually if you only want certain features.

```razor title="ColorPickerPlaygroundExample"
<MudGrid>
    <MudItem md="8" Class="d-flex justify-center">
        <MudColorPicker ShowToolbar="ShowToolbar" ShowAlpha="ShowAlpha" ShowColorField="ShowColorField" ShowPreview="ShowPreview" ShowSliders="ShowSliders" ShowInputs="ShowInputs" ShowModeSwitch="ShowModeSwitch" 
                ColorPickerMode="ColorPickerMode" PickerVariant="PickerVariant.Static" />
    </MudItem>
    <MudItem md="4">
        <MudPaper Height="400px" Class="px-4 pt-2 pb-4">
            <MudText Typo="Typo.h6">Options</MudText>
            <MudCheckBox @bind-Value="ShowToolbar" Label="Show Toolbar" Color="Color.Primary" Dense="true" />
            <MudCheckBox @bind-Value="ShowAlpha" Label="Show Alpha" Color="Color.Primary" Dense="true" />
            <MudCheckBox @bind-Value="ShowColorField" Label="Show Color Field" Color="Color.Primary" Dense="true" />
            <MudCheckBox @bind-Value="ShowPreview" Label="Show Preview" Color="Color.Primary" Dense="true" />
            <MudCheckBox @bind-Value="ShowSliders" Label="Show Sliders" Color="Color.Primary" Dense="true" />
            <MudCheckBox @bind-Value="ShowInputs" Label="Show Inputs" Color="Color.Primary" Dense="true" />
            <MudCheckBox @bind-Value="ShowModeSwitch" Label="Show Mode Switch" Color="Color.Primary" Dense="true" />
            <MudSelect Label="Color Picker Mode" Variant="Variant.Outlined" Dense="true" Margin="Margin.Dense" @bind-Value="ColorPickerMode" Class="mt-4">
                <MudSelectItem T="ColorPickerMode" Value="ColorPickerMode.RGB">RGB</MudSelectItem>
                <MudSelectItem T="ColorPickerMode" Value="ColorPickerMode.HSL">HSL</MudSelectItem>
                <MudSelectItem T="ColorPickerMode" Value="ColorPickerMode.HEX">HEX</MudSelectItem>
            </MudSelect>
        </MudPaper>
    </MudItem>
</MudGrid>

@code {
    public bool ShowToolbar { get; set; } = true;
    public bool ShowAlpha { get; set; } = true;
    public bool ShowColorField { get; set; } = true;
    public bool ShowPreview { get; set; } = true;
    public bool ShowSliders { get; set; } = true;
    public bool ShowInputs { get; set; } = true;
    public bool ShowModeSwitch { get; set; } = true;

    public ColorPickerMode ColorPickerMode { get; set; }
}
```

The default view can be changed with `ColorPickerView`. This is useful if you want a minimal color picker or want to restrict the available colors.

```razor title="ColorPickerViewModeExample"
<MudColorPicker Label="Spectrum" ColorPickerView="ColorPickerView.Spectrum" />
<MudColorPicker Label="Palette" ColorPickerView="ColorPickerView.Palette" />
<MudColorPicker Label="Grid" ColorPickerView="ColorPickerView.Grid" />
<MudColorPicker Label="Compact Grid" ColorPickerView="ColorPickerView.GridCompact" />
```

You can set the default mode of the color picker with the `ColorPickerMode` property. Combine this with `ShowModeSwitch="false"` to force a specific color mode.

```razor title="ColorPickerColorModeExample"
<MudColorPicker Label="HSL" ColorPickerMode="ColorPickerMode.HSL" ShowModeSwitch="false" />
```

You can change the default palette with the `Palette` property. The first five colors appear in the quick view when clicking the color preview dot.

```razor title="ColorPickerPaletteExample"
@using MudBlazor.Utilities

<MudColorPicker PickerVariant="PickerVariant.Static" ColorPickerView="ColorPickerView.Palette" Palette="_customPalette" />

@code {
    private readonly IEnumerable<MudColor> _customPalette = new List<IEnumerable<MudColor>>
    {
        MudColor.GenerateTintShadePalette("#DC143C", shadeStep: 0),
        MudColor.GenerateTintShadePalette("#1E90FF", tintStep: 0),
        // Reverse for illustrative purposes
        MudColor.GenerateTintShadePalette("#8E24AA").Reverse(),
        MudColor.GenerateAnalogousPalette("#40E0D0"),
        MudColor.GenerateGradientPalette("#1E90FF", "#32CD32"),
        MudColor.GenerateMultiGradientPalette(["#FF4500", "#32CD32", "#8A2BE2"])
    }.SelectMany(palette => palette);
}
```

Disable the alpha slider and its text field by setting `ShowAlpha="false"`. This removes transparency and outputs RGB, HSL, or HEX instead of RGBA, HSLA, or HEXA.

```razor title="ColorPickerAlphaExample"
<MudColorPicker Label="Disabled Alpha" ShowAlpha="false" />
```

Switch Mode lets users switch between RGB, HSL, and HEX. You can disable the button with `ShowModeSwitch="false"` if you want to control the input/output type.

```razor title="ColorPickerSwitchModeExample"
<MudColorPicker Label="Switch Disabled" ShowModeSwitch="false" />
```

```razor title="ColorPickerDialogExample"
<MudColorPicker ShowToolbar="true" Label="Dialog Picker" PickerVariant="PickerVariant.Dialog" />
```

```razor title="ColorPickerInlineExample"
<MudColorPicker ShowToolbar="true" Label="Dialog Picker" PickerVariant="PickerVariant.Inline" />
```

```razor title="ColorPickerStaticExample"
<MudColorPicker PickerVariant="PickerVariant.Static" />
```

You can change the elevation with the `Elevation` parameter. The default is 8 for Inline, and 0 for Static or Dialog.

```razor title="ColorPickerElevationExample"
<MudColorPicker PickerVariant="PickerVariant.Static" Rounded="true" Elevation="1"/>
<MudColorPicker PickerVariant="PickerVariant.Static" Rounded="true" Elevation="12" />
```

```razor title="ColorPickerExampleUsageExample"
@using MudBlazor.Utilities


<MudPaper Elevation="0" Class="mud-width-full mud-height-full d-flex justify-center align-end pb-8" MinHeight="600px" Style="@($"background-image:linear-gradient({_degrees}deg, {_gradientPrimary.ToString(MudColorOutputFormats.RGBA)} 0%, {_gradientSecondary.ToString(MudColorOutputFormats.RGBA)} 100%);")">
    <MudPaper Class="d-flex">
        <MudColorPicker Rounded="true" Class="rounded-tr-0" PickerVariant="PickerVariant.Static" ShowModeSwitch="false" Value="_pickerColor" ValueChanged="UpdateSelectedColor" />
        <div class="pa-2">
            <MudText Typo="Typo.h6" Class="mx-1">Gradient Colors</MudText>

            <MudList T="string" SelectedValueChanged="ChangeSelectedColor">
                <MudListItem Text="1">
                    <div class="mud-width-full rounded py-4" style="@($"background-color:{_gradientPrimary};")"></div>
                </MudListItem>
                <MudListItem Text="2">
                    <div class="mud-width-full rounded py-4" style="@($"background-color:{_gradientSecondary};")"></div>
                </MudListItem>
            </MudList>
            <MudSlider Min="0" Max="360" Step="1" @bind-Value="_degrees" Class="px-2">Degrees</MudSlider>
        </div>
    </MudPaper>
</MudPaper>


@code {
    private MudColor _gradientPrimary = "#594AE2";
    private MudColor _gradientSecondary = "#FF4081";
    private MudColor _pickerColor = "#594AE2";

    private int _degrees = 90;

    bool _isFirstColor = true;

    public void ChangeSelectedColor(string item)
    {
        if (item == "1")
        {
            _isFirstColor = true;
            _pickerColor = _gradientPrimary;
            UpdateSelectedColor(_gradientPrimary);
        }
        else if (item == "2")
        {
            _isFirstColor = false;
            _pickerColor = _gradientSecondary;
            UpdateSelectedColor(_gradientSecondary);
        }
    }

    public void UpdateSelectedColor(MudColor value)
    {
        _pickerColor = value;

        if (_isFirstColor)
        {
            _gradientPrimary = value;
        }
        else
        {
            _gradientSecondary = value;
        }
    }
}
```

The `ThrottleInterval` property controls how long to wait before updating the color while dragging in the spectrum view.
 If `DragEffect` is set to false, the color selector (circle) will not follow the pointer.

```razor title="ColorPickerDragExample"
<MudStack>
    <MudColorPicker ThrottleInterval="Interval" DragEffect="@Draggable" PickerVariant="PickerVariant.Static" />

    <MudNumericField T="int" @bind-Value="Interval" Label="Throttle interval" />

    <MudCheckBox T="bool" @bind-Value="Draggable" Label="Allow dragging the pointer" />
</MudStack>

@code {
    public int Interval { get; set; } = 100;
    public bool Draggable { get; set; } = true;
}
```
