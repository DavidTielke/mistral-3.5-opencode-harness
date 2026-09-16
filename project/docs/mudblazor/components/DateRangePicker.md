# DateRangePicker

Defines the earliest and latest calendar dates available from user selection

```razor title="DateRangePickerMinMaxDateExample"
<MudStack>
    <MudDateRangePicker @bind-DateRange="@_dateRange" MinDate="_minDate" MaxDate="@_maxDate" Margin="Margin.Dense" HelperText="@HelperText"
                        Variant="Variant.Outlined" Label="Range" />
</MudStack>

@code {
    private DateRange _dateRange { get; set; }
    private DateTime _minDate = DateTime.Now.Date;
    private DateTime _maxDate = DateTime.Now.Date.AddMonths(1);

    private string HelperText => $"Range: {_minDate:M} to {_maxDate:M}";
}
```

Defines the smallest and largest number of days that a user can select.

 For performance reasons, the component checks up to 50 years ahead, from the user-selected start date, to find valid dates that meet the `MaxDays` requirement. 
 To extend this limit, set the `MaxDate` property to a specific date.

```razor title="DateRangePickerMinMaxDaysExample"
<MudStack>
    <MudDateRangePicker @bind-DateRange="@_dateRange" MinDays="_minDays" MaxDays="@_maxDays" Margin="Margin.Dense" HelperText="@HelperText"
    Variant="Variant.Outlined" Label="Range" />
</MudStack>

@code {
    private DateRange _dateRange { get; set; }
    private int _minDays = 3;
    private int _maxDays = 7;

    private string HelperText => $"Range: {_minDays} to {_maxDays} days";
}
```

## Further examples

```razor title="DateRangePickerActionButtonsExample"
<MudStack>
    <MudDateRangePicker @ref="_picker" Label="With action buttons" @bind-DateRange="_dateRange" 
                        AutoClose="@_autoClose" PickerVariant="PickerVariant.Dialog">
        <PickerActions>
            <MudButton Class="mr-auto align-self-start" OnClick="@(() => _picker.ClearAsync())">Clear</MudButton>
            <MudButton OnClick="@(() => _picker.CloseAsync(false))">Cancel</MudButton>
            <MudButton Color="Color.Primary" OnClick="@(() => _picker.CloseAsync())">OK</MudButton>
        </PickerActions>
    </MudDateRangePicker>
    <MudSwitch @bind-Value="_autoClose" Color="Color.Secondary">AutoClose</MudSwitch>
</MudStack>

@code {
    private MudDateRangePicker _picker;
    private DateRange _dateRange = new DateRange(DateTime.Now.Date, DateTime.Now.AddDays(5).Date);
    private bool _autoClose;
}
```

```razor title="DateRangePickerBasicUsageExample"
<MudStack AlignItems="AlignItems.Center" Style="width:650px; height:450px">
    <MudDateRangePicker PickerVariant="@_variant" @bind-DateRange="@_dateRange" Margin="Margin.Dense" ShowAdjacentMonthDays="true" />
    <MudSpacer />
    <MudToggleGroup T="PickerVariant" SelectionMode="SelectionMode.SingleSelection" Value="@_variant" ValueChanged="@OnValueChanged" 
                    Color="Color.Primary" CheckMark="true" FixedContent="true">
        <MudToggleItem Value="@(PickerVariant.Inline)" Text="Inline" />
        <MudToggleItem Value="@(PickerVariant.Dialog)" Text="Dialog" />
        <MudToggleItem Value="@(PickerVariant.Static)" Text="Static" />
    </MudToggleGroup>
</MudStack>

@code {
    private PickerVariant _variant = PickerVariant.Static;
    private DateRange _dateRange { get; set; }

    private void OnValueChanged(PickerVariant variant)
    {
        _dateRange = null;
        _variant = variant;
    }
}
```

```razor title="DateRangePickerEditableExample"
<MudStack>
    <MudDateRangePicker @bind-DateRange="@_dateRange" Margin="Margin.Dense" ReadOnly="@(!_editable)" Clearable="@_clearable" 
                        PlaceholderStart="Start Date" PlaceholderEnd="End Date" Label="Range"/>

    <MudStack Row="true">
        <MudSwitch @bind-Value="_editable" Color="Color.Secondary">Editable</MudSwitch>
        <MudSwitch @bind-Value="_clearable" Color="Color.Secondary">Clearable</MudSwitch>
    </MudStack>
</MudStack>

@code {
    private bool _editable = true;
    private bool _clearable = true;
    private DateRange _dateRange { get; set; }
}
```

```razor title="DateRangePickerFormatExample"
<MudStack>
    <MudDateRangePicker @bind-DateRange="@_dateRange" DateFormat="dddd, dd MMMM, yyyy" TitleDateFormat="MMMM dd" Margin="Margin.Dense"
                        Variant="Variant.Filled" Label="Range"/>
</MudStack>

@code {
    private DateRange _dateRange { get; set; }
}
```
