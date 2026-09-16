# Converters

Converters are essential for binding input elements to your model.

When you bind a non-string value to a MudTextFieldT or any other input element that supports a value of type T, then a `Converter`
 converts that value to `string` for display and converts the user's input back to T. This happens automatically without you having to do anything special. 

 MudBlazor's `DefaultConverterT` is pretty capable as you can see below, but sometimes
 you'll want to use your own conversion functions. This page is all about that.

MudBlazor provides a small, composable converter API you can use to implement custom conversion logic.
 The primary contracts are:

 `IConverter<TIn, TOut>` — synchronous converter that maps a value from `TIn` to `TOut`. Implement this for simple one-way conversions.
 `IReversibleConverter<TIn, TOut>` — extends `IConverter` with `ConvertBack` so the converter can perform both forward and backward conversions.

 For composing converters you can use the fluent helpers in `Conversions` to build chains:
 
 `Conversions.From(IConverter)` or `Conversions.From(Func<TIn,TOut>)` — start a converter chain.
 `ConverterChain.Then(...)` — append additional steps to the chain. A reversible chain is created when both forward and backward delegates (or an `IReversibleConverter`) are provided.

 The built-in `DefaultConverter<T>` implements `IReversibleConverter<T?, string?>` and `ICultureAwareConverter`.
 It ships with conversions for primitives, numbers, dates, GUIDs, `BigInteger`, and nullable variants. When used inside components the component will auto-inject culture/format providers if the converter implements `ICultureAwareConverter`.

The default converter converts all primitive types and their nullable variants to and from `string`.
 Edit the textfields below to see how the default converter handles different values depending on the type.

By default, the `DefaultConverter` uses your local culture settings (from `CultureInfo.CurrentUICulture`). 
 If you want to change that, you can set the `Culture` parameter of individual input components or set the `Culture` property on custom converter instances.

 If you want to configure the date format of a DateTime value, you can set the `Format` parameter of MudTextField.

 Let's format the same date in different ways:

```razor title="TurkeyTestExample"
@using System.Globalization;

<MudGrid>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="en-US" Variant="Variant.Outlined" Culture="@en" @bind-Value="date" />
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="de-AT" Variant="Variant.Outlined" Culture="@de" @bind-Value="date"></MudTextField>
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="zh-CN" Variant="Variant.Outlined" Culture="@cn" @bind-Value="date"></MudTextField>
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="en-US: dddd, MMM dd" Variant="Variant.Outlined" Culture="@en" Format="dddd, MMM dd" @bind-Value="date" />
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="de-AT: dddd, dd. MM." Variant="Variant.Outlined" Culture="@de" Format="dddd, dd. MM." @bind-Value="date"></MudTextField>
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="zh-CN: yy年MM月dd日" Variant="Variant.Outlined" Culture="@cn" Format="yyyy年MM月dd日" @bind-Value="date"></MudTextField>
    </MudItem>
</MudGrid>

@code {
    CultureInfo en = @CultureInfo.GetCultureInfo("en-US");
    CultureInfo de = CultureInfo.GetCultureInfo("de-AT");
    CultureInfo cn = CultureInfo.GetCultureInfo("zh-CN");
    DateTime date = DateTime.Now;
}
```

If you need specialized binding conversion, you can implement a converter directly or use the fluent helpers in `Conversions` to create inline converters.
 For example, you can create a converter from two delegates.

```razor title="SpecialConverterExample"
<MudGrid>
    <MudItem xs="12" sm="6" md="4">
        <MudSwitch Color="Color.Primary" @bind-Value="_state">Flip the switch</MudSwitch>
    </MudItem>
    
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="Switch state" Variant="Variant.Outlined" Converter="@_converter" @bind-Value="_state" Immediate="true"/>
    </MudItem>

</MudGrid>

@code {
    private bool _state = true;

    private readonly IConverter<bool, string> _converter = Conversions
        .From((bool value) => value ? "ON" : "OFF",
            text => string.Equals(text, "on", StringComparison.InvariantCultureIgnoreCase));

}
```

```razor title="PointConverterExample"
@using System.Drawing
@using System.Globalization;
@using System.Text.Json
@using Color = MudBlazor.Color

<MudGrid>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="Point"
                      Variant="Variant.Outlined"
                      @bind-Value="_point"
                      Immediate="true"
                      Converter="_pointConverter"/>
    </MudItem>
    
    <MudItem xs="12" sm="6" md="4">
        <MudTextField Label="Mirrored point" 
                      Variant="Variant.Outlined"  
                      @bind-Value="_point" 
                      Immediate="true"
                      Converter="_pointConverter" />
    </MudItem>

</MudGrid>

@code {
    private Point _point;
    private readonly IConverter<Point, string> _pointConverter = Conversions.From(
        (Point x) => $"[{x.X}, {x.Y}]",
        x =>
        {
            var tmp = JsonSerializer.Deserialize<int[]>(x);
            return new Point(tmp[0], tmp[1]);
        });
}
```

You can register per-instance converters or create inline reversible converters with `Conversions.From`.
 The example demonstrates creating a converter using `Conversions.From` and wiring it directly to a `MudTextField` via the `Converter` parameter:

## Further examples

```razor title="CustomConverterExample"
<MudSimpleTable Elevation="0" Hover="false" Class="mt-4" Dense="false">
    <colgroup>
        <col style="width: 70%;" />
        <col style="width: 15%;" />
        <col style="width: 15%;" />
    </colgroup>
    <thead>
        <tr>
            <th>Mode</th>
            <th>TextField</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><CodeInline>Free decimal places (default)</CodeInline></td>
            <td>
                <MudTextField @bind-Value="_decimalValueFree" Class="mt-n1" Immediate="true" />
            </td>
            <td><MudText HtmlTag="span">@ToS(_decimalValueFree) </MudText></td>
        </tr>
        <tr>
            <td><CodeInline>No decimal places (what about int value?)</CodeInline></td>
            <td>
                <MudTextField Converter="@(Conversions.From((decimal e) => e.ToString("#0"), e => Math.Round(decimal.Parse(e), 0)))"
                              @bind-Value="_decimalValue0D" Class="mt-n1" Immediate="false" />
            </td>
            <td><MudText HtmlTag="span">@ToS(_decimalValue0D) </MudText></td>
        </tr>
        <tr>
            <td><CodeInline>Two decimal places</CodeInline></td>
            <td>
                <MudTextField Converter="@(Conversions.From((decimal e) => e.ToString("0.00"), e => Math.Round(decimal.Parse(e), 2)))"
                              @bind-Value="_decimalValue2D" Class="mt-n1" Immediate="false" />
            </td>
            <td><MudText HtmlTag="span">@ToS(_decimalValue2D) </MudText></td>
        </tr>
        <tr>
            <td><CodeInline>Three decimal places</CodeInline></td>
            <td>
                <MudTextField Converter="@(Conversions.From((decimal e) => e.ToString("0.000"), e => Math.Round(decimal.Parse(e), 3)))"
                              @bind-Value="_decimalValue3D" Class="mt-n1" Immediate="false" />
            </td>
            <td><MudText HtmlTag="span">@ToS(_decimalValue3D) </MudText></td>
        </tr>
    </tbody>
</MudSimpleTable>

@code {
    private decimal _decimalValueFree = 99.99999999m;
    private decimal _decimalValue0D = 99;
    private decimal _decimalValue2D = 99.99m;
    private decimal _decimalValue3D = 99.999m;

    private static string ToS(object value)
    {
        if (value == null)
            return "null";
        return "" + value;
    }
}
```
