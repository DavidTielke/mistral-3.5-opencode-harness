# NumericField

Numeric fields are specialized input controls designed for collecting numeric values of any type. Built on the foundation of [fields](/components/field), they automatically restrict input to valid numbers and provide intuitive controls for incrementing and decrementing values.
 Use `Min` and `Max` to set boundaries, and `Step` to control increment amounts.

```razor title="NumericFieldBasicExample"
<MudNumericField @bind-Value="IntValue" Label="Standard" Variant="Variant.Text" Min="0" Max="10" />
<MudNumericField @bind-Value="DoubleValue" Label="Filled" Variant="Variant.Filled" Min="0.0" />
<MudNumericField @bind-Value="DecimalValue" Label="Outlined" Variant="Variant.Outlined" Step=".2M" />

@code {
    public int IntValue { get; set; }
    public double DoubleValue { get; set; }
    public decimal DecimalValue { get; set; }
}
```

Control the most frequently used properties to customize the behavior and appearance of numeric fields.

By default, numeric fields display up/down spin buttons for easy value adjustment. Set `HideSpinButtons="true"` to hide these controls while preserving keyboard navigation (arrow keys) and manual input.

```razor title="NumericFieldHideButtonsExample"
<MudNumericField HideSpinButtons="true" @bind-Value="IntValue" Label="Standard" Variant="Variant.Text" Min="0" Max="10" />
<MudNumericField HideSpinButtons="true" @bind-Value="DoubleValue" Label="Filled" Variant="Variant.Filled" Min="0.0" />
<MudNumericField HideSpinButtons="true" @bind-Value="DecimalValue" Label="Outlined" Variant="Variant.Outlined" Step=".2M" />

@code {
    public int IntValue { get; set; }
    public double DoubleValue { get; set; }
    public decimal DecimalValue { get; set; }
}
```

Numeric fields support different data binding patterns depending on your requirements for default values and empty states.

Value types always have a default value (e.g., `0` for `int`), so fields won't appear empty initially.
 Use nullable types (e.g., `int?`) when you want fields to start empty until the user enters a value.
 
 Tip: Do not assign null values to `Min`, `Max` and `Step` properties.

```razor title="NumericFieldBindingValueTypesExample"
<MudNumericField @bind-Value="intValue" Label="Enter an int" Variant="Variant.Outlined" />
<MudNumericField @bind-Value="doubleValue" Label="Enter a double" Format="F1" Variant="Variant.Outlined" />
<MudNumericField @bind-Value="nullableInt" Label="Enter an int" Variant="Variant.Outlined" />
<MudNumericField @bind-Value="nullableDouble" Label="Enter a double" Format="F1" Variant="Variant.Outlined" />

@code { 
    int intValue;
    double doubleValue;
    int? nullableInt;
    double? nullableDouble;
}
```

By default, numeric fields update the bound value on Enter or when focus is lost. Set `Immediate="true"` to update values as the user types.
 You can also use `DebounceInterval` to delay updates until the user stops typing, preventing excessive updates during input. The debounced example updates 500ms after typing stops.
 
 Note: Arrow key interactions are not debounced for immediate responsiveness.

```razor title="DebouncedNumericFieldExample"
<MudNumericField @bind-Value="_normal" Label="Normal" HelperText="@_normal.ToString()" Variant="Variant.Outlined" />
<MudNumericField @bind-Value="_immediate" Immediate="true" Label="Immediate" HelperText="@_immediate.ToString()" Variant="Variant.Outlined" />
<MudNumericField @bind-Value="_debounced" DebounceInterval="500" OnDebounceIntervalElapsed="HandleIntervalElapsed" Label="Debounced" HelperText="@_debounced.ToString()" Variant="Variant.Outlined"  />

@code {
    double _normal;
    double _immediate;
    double _debounced;

    void HandleIntervalElapsed(string debouncedText)
    {
        // At this stage, interval has elapsed.
    }
}
```

Customize how numeric values are displayed and parsed to match different cultural conventions and formatting requirements.

```razor title="NumericFieldCultureExample"
@using System.Globalization

<MudNumericField Immediate="false" Label="de-DE" Format="N2" Culture="@_de" T="double?" @bind-Value="_valueDe" HelperText="@_valueDe.ToString()"/>
<MudNumericField Immediate="false" Label="en-US" Format="N2" Culture="@_en" T="double?" @bind-Value="_valueEn" HelperText="@_valueEn.ToString()"/>

@code {
    public CultureInfo _de = CultureInfo.GetCultureInfo("de-DE");
    public CultureInfo _en = CultureInfo.GetCultureInfo("en-US");

    public double? _valueDe = 1234.56;
    public double? _valueEn = 1234.56;
}
```
