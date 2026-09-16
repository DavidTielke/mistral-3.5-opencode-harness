# Switch

```razor title="SwitchBasicExample"
<MudSwitch @bind-Value="Basic_Switch1" />
<MudSwitch @bind-Value="Basic_Switch2" Color="Color.Primary" />
<MudSwitch @bind-Value="Basic_Switch3" Color="Color.Secondary" />
<MudSwitch T="bool" Disabled="true" />

@code{
    public bool Basic_Switch1 { get; set; } = false;
    public bool Basic_Switch2 { get; set; } = true;
    public bool Basic_Switch3 { get; set; } = true;
}
```

```razor title="SwitchColorExample"
<MudSwitch @bind-Value="Basic_Switch1" Color="Color.Success" UncheckedColor="Color.Error" />
<MudSwitch @bind-Value="Basic_Switch2" Color="Color.Primary" UncheckedColor="Color.Secondary" />
<MudSwitch @bind-Value="Basic_Switch3" Color="Color.Info" UncheckedColor="Color.Warning" />
<MudSwitch T="bool" Disabled="true" UncheckedColor="Color.Default" />

@code{
    public bool Basic_Switch1 { get; set; } = false;
    public bool Basic_Switch2 { get; set; } = true;
    public bool Basic_Switch3 { get; set; } = true;
}
```

Text can be added using the `Label` property and its
 position can be specified using the `LabelPlacement` property

```razor title="SwitchWithLabelExample"
<MudSwitch @bind-Value="Label_Switch1" Label="Info" Color="Color.Info" />
<MudSwitch @bind-Value="Label_Switch2" Label="Success" Color="Color.Success" />
<MudSwitch @bind-Value="Label_Switch3" Label="Warning!" LabelPlacement="Placement.Start" Color="Color.Warning" />
<MudSwitch T="bool" Disabled="true" Label="Disabled" LabelPlacement="Placement.Start" />

@code{
    public bool Label_Switch1 { get; set; } = false;
    public bool Label_Switch2 { get; set; } = true;
    public bool Label_Switch3 { get; set; } = true;
}
```

An icon can be specified with the `ThumbIcon` parameter.

```razor title="SwitchWithIconExample"
<MudSwitch @bind-Value="_checked1" ThumbIcon="@Icons.Custom.Brands.MudBlazor">Basic</MudSwitch>
<MudSwitch @bind-Value="_checked2" ThumbIcon="@Icons.Custom.Brands.MudBlazor" ThumbIconColor="Color.Info">Colored</MudSwitch>
<MudSwitch @bind-Value="_checked3" ThumbIcon="@(_checked3==true ? Icons.Material.Filled.Done : Icons.Material.Filled.Close)" ThumbIconColor="@(_checked3==true ? Color.Success : Color.Error)">Changing</MudSwitch>

@code{
    bool _checked1 = false;
    bool _checked2 = false;
    bool _checked3 = false;
}
```

```razor title="SwitchConversionExample"
<MudSwitch @bind-Value="_boolean">bool: @_boolean</MudSwitch>
<MudSwitch @bind-Value="_nullableBoolean" Color="Color.Primary">bool?: @_nullableBoolean</MudSwitch>
<MudSwitch @bind-Value="_integer" Color="Color.Secondary">int: @_integer</MudSwitch>
<MudSwitch @bind-Value="_string" Color="Color.Tertiary">string: "@(_string)"</MudSwitch>
<MudSwitch @bind-Value="_customString" Color="Color.Error" Converter="@CustomStringToBoolConverter.Instance"> custom string: "@(_customString)"</MudSwitch>
<MudSwitch @bind-Value="_customObject" Color="Color.Dark" Converter="@ObjectToBoolConverter.Instance">object: "@(_customObject.ToString())"</MudSwitch>

@code{
    private bool _boolean = true;
    private bool? _nullableBoolean = true;
    private int _integer = 1;
    private string _string = "on";
    private string _customString = CustomStringToBoolConverter.FalseString;
    private object _customObject = false;

    private class ObjectToBoolConverter : IReversibleConverter<object, bool?>
    {
        public bool? Convert(object input)
        {
            return input switch
            {
                null => null,
                bool value => value,
                _ => throw new InvalidCastException("Unable to convert object to bool?.")
            };
        }

        public object ConvertBack(bool? output)
        {
            return output == true;
        }

        public static ObjectToBoolConverter Instance { get; } = new();
    }

    private class CustomStringToBoolConverter : IReversibleConverter<string, bool?>
    {
        public const string TrueString = "Yes, please";
        public const string FalseString = "No, at all";
        public const string NullString = "I don't know";

        public bool? Convert(string input)
        {
            return input switch
            {
                TrueString => true,
                FalseString => false,
                _ => null
            };
        }

        public string ConvertBack(bool? output)
        {
            return output switch
            {
                true => TrueString,
                false => FalseString,
                null => NullString
            };
        }

        public static CustomStringToBoolConverter Instance { get; } = new();
    }
}
```

```razor title="SwitchContentPlacementExample"
<MudGrid>
    <MudItem xs="12" md="1">
        <MudRadioGroup @bind-Value="Placement">
            <MudRadio Color="Color.Primary" Value="@(Placement.Top)">Top</MudRadio>
            <MudRadio Color="Color.Primary" Value="@(Placement.Bottom)">Bottom</MudRadio>
            <MudRadio Color="Color.Primary" Value="@(Placement.Start)">Start</MudRadio>
            <MudRadio Color="Color.Primary" Value="@(Placement.End)">End</MudRadio>
            <MudRadio Color="Color.Primary" Value="@(Placement.Left)">Left</MudRadio>
            <MudRadio Color="Color.Primary" Value="@(Placement.Right)">Right</MudRadio>
        </MudRadioGroup>
    </MudItem>
    <MudItem xs="12" md="9" Class="d-flex justify-center align-center my-auto">
        <MudRadioGroup T="string">
            <MudSwitch T="bool" LabelPlacement="@Placement" Color="Color.Secondary">Content Placement</MudSwitch>
        </MudRadioGroup>
    </MudItem>
    <MudItem xs="12" md="2" Style="width:100%"></MudItem>
</MudGrid>

@code {
    public Placement Placement { get; set; } = Placement.Right;
}
```

Setting `ReadOnly="true"` stops the switch control from listening to user input.

```razor title="SwitchReadOnlyExample"
<div class="d-flex flex-column align-center">
    <MudSwitch ReadOnly="@ReadOnly" @bind-Value="SwitchValue" Color="Color.Primary" Class="mr-n2 mb-6"/>
    <MudButton OnClick="@ToggleValue" Variant="Variant.Filled" DropShadow="false">Toggle Value</MudButton>
    <MudCheckBox @bind-Value="ReadOnly" Label="@(ReadOnly ? "readonly-mode" : "edit-mode")" />
</div>

@code {
    public bool SwitchValue { get; set; } = true;
    public bool ReadOnly { get; set; } = true;

    void ToggleValue()
    {
        SwitchValue = !SwitchValue;
    }
}
```

MudSwitch supports keyboard navigation.

 `Space` key to toggle state true/false
 `Delete` or `ArrowLeft` keys to set UnChecked
 `Enter` or `NumpadEnter` or `ArrowRight` keys to set Checked
 *Disabled or ReadOnly switches cannot be changed by keys.

```razor title="SwitchKeyboardNavigationExample"
<MudSwitch @bind-Value="Label_Switch1" Label="Switch With Key Navigation" />

@code{
    bool Label_Switch1 = false;
}
```

MudSwitch size can be changed with the `Size` parameter.

```razor title="SwitchSizeExample"
<MudSwitch T="bool" Label="Small" Size="Size.Small"/>
<MudSwitch T="bool" Label="Medium"/>
<MudSwitch T="bool" Label="Large" Size="Size.Large"/>
<MudSwitch @bind-Value="Label_Switch" T="bool" Label="Switches from small to large" Size="@(Label_Switch ? Size.Small : Size.Large)" ThumbIcon="@Icons.Material.Filled.Favorite" ThumbIconColor="Color.Error" />

@code{
    public bool Label_Switch { get; set; } = false;
}
```
