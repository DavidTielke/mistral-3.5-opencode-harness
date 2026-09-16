# TimePicker

Note: Always use the two-way binding `@@bind-Time` to bind to a field of type `TimeSpan?`

```razor title="TimePickerBasicUsageExample"
<MudTimePicker Label="12 hours" AmPm="true" @bind-Time="_time" />
<MudTimePicker Label="12 hours custom format" AmPm="true" TimeFormat="h:mm tt" @bind-Time="_time" />
<MudTimePicker Label="24 hours" @bind-Time="_time" />
<MudTimePicker Label="24 hours (editable)" Editable="true" @bind-Time="_time" />

@code{
    private TimeSpan? _time = new TimeSpan(00, 45, 00);
}
```

If `ReadOnly` is set to true, the TimePicker can be used but the value will remain unchanged regardless of the actions performed or the values entered.

```razor title="TimePickerReadOnlyExample"
<MudTimePicker Label="12 hours" AmPm="true" @bind-Time="_time" ReadOnly="@_readOnly" />
<MudSwitch @bind-Value="_readOnly" Color="Color.Tertiary">ReadOnly</MudSwitch>

@code{
    private TimeSpan? _time = new TimeSpan(00, 45, 00);
    private bool _readOnly;
}
```

You can add buttons by using the `PickerActions` render fragment. If `AutoClose` is set to true and PickerActions are defined, the hour and the minutes can be selected and the drop-down will close without having to click any of the action buttons.

```razor title="TimePickerActionButtonsExample"
<MudTimePicker @ref="_picker" Label="With action buttons" AutoClose="@_autoClose">
    <PickerActions>
        <MudButton Class="mr-auto align-self-start" OnClick="@(() => _picker.ClearAsync())">Clear</MudButton>
        <MudButton OnClick="@(() => _picker.CloseAsync(false))">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="@(() => _picker.CloseAsync())">OK</MudButton>
    </PickerActions>
</MudTimePicker>
<MudSwitch @bind-Value="_autoClose" Color="Color.Secondary">AutoClose</MudSwitch>

@code{
    private MudTimePicker _picker;
    private readonly TimeSpan? _time = new TimeSpan(00, 45, 00);
    private bool _autoClose;
}
```

```razor title="TimePickerDialogExample"
<MudTimePicker PickerVariant="PickerVariant.Dialog" Label="12 hours" AmPm="true" @bind-Time="_time" />
<MudTimePicker PickerVariant="PickerVariant.Dialog" Label="24 hours" @bind-Time="_time" />

@code{
    private TimeSpan? _time = new TimeSpan(00, 45, 00);
}
```

```razor title="TimePickerStaticExample"
<MudTimePicker PickerVariant="PickerVariant.Static" @bind-Time="_time" AmPm="true" />
<MudHidden Breakpoint="@Breakpoint.Xs">
    <MudTimePicker PickerVariant="PickerVariant.Static" Orientation="Orientation.Landscape" @bind-Time="_time" />
</MudHidden>

@code{
    private TimeSpan? _time = new TimeSpan(13, 37, 00);
}
```

By default, MudTimePicker opens the hours editor and then switches into the minutes editor. By setting `OpenTo="OpenTo.Minutes"`, it will open the minutes editor instead.

```razor title="TimePickerViewsExample"
<MudTimePicker Label="Minutes" Text="13:37" OpenTo="OpenTo.Minutes" />
```

By setting the `TimeEditMode`, you can restrict editing of the time value to allow only changing hours or minutes.

```razor title="TimePickerTimeEditModeExample"
<MudTimePicker Label="Normal" @bind-Time="_time" TimeEditMode="TimeEditMode.Normal" />
<MudTimePicker Label="OnlyHours" @bind-Time="_time" TimeEditMode="TimeEditMode.OnlyHours" />
<MudTimePicker Label="OnlyMinutes" @bind-Time="_time" TimeEditMode="TimeEditMode.OnlyMinutes" />

@code{

    private TimeSpan? _time = new TimeSpan(13, 37, 00);
}
```

```razor title="TimePickerColorExample"
<MudTimePicker PickerVariant="PickerVariant.Static" Color="Color.Success" Rounded="true" Text="03:37 PM" AmPm="true" />
<MudTimePicker PickerVariant="PickerVariant.Static" Color="Color.Secondary" Rounded="true" Text="13:37"/>
```

You can change the elevation with the `Elevation` parameter. The default level is 8 for Inline, and 0 for Static or Dialog.

```razor title="TimePickerElevationExample"
<MudTimePicker PickerVariant="PickerVariant.Static" Color="Color.Success" Rounded="true" Elevation="1" Text="03:37 PM" AmPm="true" />
<MudTimePicker PickerVariant="PickerVariant.Static" Color="Color.Secondary" Rounded="true" Elevation="12" Text="13:37" />
```

You can change the granularity of selectable times with the `MinuteSelectionStep` parameter.

```razor title="TimePickerStepExample"
<MudTimePicker PickerVariant="PickerVariant.Static" Color="Color.Primary" MinuteSelectionStep="1" Text="03:37 PM" OpenTo="OpenTo.Minutes" />
<MudTimePicker PickerVariant="PickerVariant.Static" Color="Color.Secondary" MinuteSelectionStep="5" Text="03:35 PM" OpenTo="OpenTo.Minutes" />
<MudTimePicker PickerVariant="PickerVariant.Static" Color="Color.Tertiary" MinuteSelectionStep="15" Text="03:45 PM" OpenTo="OpenTo.Minutes" />
```

MudTimePicker supports keyboard navigation.

 `Escape` or `Alt+ArrowUp` keys to close dropdown
 `Enter` or `NumpadEnter` or `ArrowDown` or `ArrowUp` keys to open dropdown
 `Space` key to toggle open/close the picker (when it is not editable)
 `ArrowUp` or `Ctrl+ArrowRight` keys to increase hour by 1
 `ArrowDown` or `Ctrl+ArrowLeft` keys to decrease hour by 1
 `ArrowRight` and `ArrowLeft` keys to increase/decrease minute by 1
 `Shift+ArrowRight` and `Shift+ArrowLeft` keys to increase/decrease minute by 5
 `Ctrl+Shift+Backspace` keys to reset (validation)

```razor title="TimePickerKeyboardNavigationExample"
<MudTimePicker Label="12 hours" AmPm="true" @bind-Time="_time" />
<MudTimePicker Label="24 hours" @bind-Time="_time" />
<MudTimePicker Label="With action buttons">
    <PickerActions>
        <MudButton Class="mr-auto align-self-start" OnClick="@(() => context.ClearAsync())">Clear</MudButton>
        <MudButton OnClick="@(() => context.CloseAsync(false))">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="@(() => context.CloseAsync())">OK</MudButton>
    </PickerActions>
</MudTimePicker>

@code{
    private TimeSpan? _time = new TimeSpan(00, 45, 00);
}
```
