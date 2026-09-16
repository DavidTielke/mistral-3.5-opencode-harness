# Slider

Lets you select a value along the whole range.

```razor title="SliderBasicExample"
<MudSlider Value="@value">Volume</MudSlider>
<MudSlider Disabled="true" Value="@(20)">Disabled Slider</MudSlider>


@code {
    double value = 50.0;
}
```

The slider also supports `Variant.Filled` which fills the selected value's portion of the slider.

```razor title="SliderFilledExample"
<MudSlider Value="@value" Variant="Variant.Filled">Volume</MudSlider>

@code {
    double value = 50.0;
}
```

You can choose the increment with the `Step` prop.

```razor title="SliderStepsExample"
<MudSlider Step="10" Value="70" Color="Color.Success" />
<MudSlider Step="25" Value="50" Color="Color.Warning" />
```

With the `Min` and `Max` properties, you can set the minimum and maximum allowed value.

```razor title="SliderMinMaxExample"
<MudSlider @bind-Value="value1" Min="20" Max="80" Color="Color.Info">Value: @value1.ToString()</MudSlider>
<MudSlider @bind-Value="value2" Min="-1" Max="1" Step="0.05" Color="Color.Error">Value: @value2.ToString("F2")</MudSlider>


@code {
    public double value1 = 50;
    public double value2 = -0.75;
}
```

If undefined state is required use `@nameof(MudSlider.NullableValue)`.

```razor title="SliderNullableExample"
<MudSlider T="int" @bind-Value="@_value" @bind-NullableValue="@_nullableValue" />
<div class="d-flex flex-column align-center">
    <MudText Class="pb-4">@_value</MudText>
    <MudText Class="pb-4">Nullable Value: @(_nullableValue is null ? "null" : _nullableValue)</MudText>
    <MudButton @onclick="Reset" Variant="Variant.Filled" Color="Color.Primary">Reset to null</MudButton>
</div>

@code {
    private int _value;
    private int? _nullableValue;

    private void Reset() => _nullableValue = null;
}
```

Tick marks can be displayed with `TickMarks` property set to true, it's common that it's combined with the `Step` property as well.

```razor title="SliderTickMarkExample"
<MudSlider TickMarks="true" Step="10" Value="@value" />

@code {
    int value = 50;
}
```

Labels can be added to each tick by providing a string array to the `TickMarkLabels` property.

```razor title="SliderTickLabelExample"
<MudSlider TickMarks="true" TickMarkLabels="@labels" Step="10" Value="@value" />
<MudSlider TickMarks="true" TickMarkLabels="@labels" Step="25" Value="@value"/>

@code {
    int value = 50;
    string[] labels = new string[] { "Korv", "Fisk", "Äpple", "Groda", "Köttbullar", "Pizza" };
}
```

Use the slider below to see the value label, this can be used by setting `@nameof(MudSlider.ValueLabel)` property to true.

 Use `@nameof(MudSlider.ValueLabelFormat)` and `@nameof(MudSlider.Culture)` to change the formatting.

 For more customization use `@nameof(MudSlider.ValueLabelContent)` RenderFragment.

```razor title="SliderValueLabelExample"
@using System.Globalization


<MudSlider T="decimal" Value="@_value" ValueLabel="true" Step="0.5m" Culture="@_selectedCulture" ValueLabelFormat="@_selectedFormat" />

<MudSelect T="CultureInfo" @bind-Value="_selectedCulture">
    @foreach (var availableCulture in _availableCultures)
    {
        <MudSelectItem T="CultureInfo" Value="@availableCulture">@availableCulture.EnglishName</MudSelectItem>
    }
</MudSelect>

<MudSelect T="string" @bind-Value="_selectedFormat">
    <MudSelectItem Value="@("C")" />
    <MudSelectItem Value="@("00.00")" />
    <MudSelectItem Value="@("P1")" />
</MudSelect>

@code {
    private decimal _value = 50.0m;
    private string _selectedFormat = "C";
    private CultureInfo _selectedCulture = EnglishMoneyCulture;
    private List<CultureInfo> _availableCultures = new()
    {
        EnglishMoneyCulture,
        GermanMoneyCulture,
    };

    private static CultureInfo EnglishMoneyCulture
    {
        get
        {
            var culture = (CultureInfo)CultureInfo.GetCultureInfo("en").Clone();
            culture.NumberFormat.CurrencySymbol = "$";
            return culture;
        }
    }

    private static CultureInfo GermanMoneyCulture
    {
        get
        {
            var culture = (CultureInfo)CultureInfo.GetCultureInfo("de").Clone();
            culture.NumberFormat.CurrencySymbol = "€";
            return culture;
        }
    }
}
```

```razor title="SliderSizeExample"
<MudSlider Size="Size.Small" Value="@value"/>
<MudSlider Size="Size.Medium" Value="@value"/>
<MudSlider Size="Size.Large" Value="@value"/>

@code {
    int value = 50;
}
```

MudSlider can be displayed vertically with the `Vertical` property set to true.

```razor title="SliderVerticalExample"
<MudSlider Value="@value" Vertical="true">Vertical</MudSlider>
<MudSlider Value="@value" Vertical="true"/>


@code {
    double value = 50.0;
}
```
