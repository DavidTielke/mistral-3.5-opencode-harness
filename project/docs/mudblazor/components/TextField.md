# TextField

Text fields allow users to enter text input. MudBlazor provides three visual variants: Text (standard), Filled, and Outlined.
 Filled text fields naturally draw more attention, making them ideal for dialogs and short forms where their visual emphasis is beneficial.
 In contrast, outlined text fields have a subtler appearance, which helps simplify the layout in longer forms by reducing visual clutter.

```razor title="TextFieldBasicExample"
<MudTextField @bind-Value="TextValue" Label="Standard" Variant="Variant.Text"></MudTextField>
<MudTextField @bind-Value="TextValue" Label="Filled" Variant="Variant.Filled"></MudTextField>
<MudTextField @bind-Value="TextValue" Label="Outlined" Variant="Variant.Outlined"></MudTextField>

@code {
    public string TextValue { get; set; }
}
```

These are the most frequently used properties that control the basic behavior and appearance of text fields.

Helper text provides additional context or instructions below the text field. Enable `HelperTextOnFocus` to only show it while the field is focused, reducing visual clutter.

```razor title="TextFieldHelperTextExample"
<MudTextField @bind-Value="_value" Label="Always visible" HelperText="Helper text is always shown" Variant="Variant.Outlined" />
<MudTextField @bind-Value="_valueOnFocus" Label="On focus only" HelperText="Helper text appears while focused" HelperTextOnFocus="true" Variant="Variant.Outlined" />

@code {
    private string _value;
    private string _valueOnFocus;
}
```

Disabled fields prevent all interaction, while read-only fields still allow users to select and copy the value but not modify it.

```razor title="TextFieldDisabledReadOnlyExample"
<MudTextField @bind-Value="_disabled" Label="Disabled" Variant="Variant.Outlined" Disabled="true" />
<MudTextField @bind-Value="_readOnly" Label="Read-only" Variant="Variant.Outlined" ReadOnly="true" />

@code {
    private string _disabled = "Disabled value";
    private string _readOnly = "Can't change me";
}
```

Enable the `Clearable` property to add a clear button that allows users to quickly empty the text field. This works alongside other adornments.

```razor title="TextFieldClearableAndInputTypeExample"
<MudTextField @bind-Value="_string" Label="Clearable Standard" Variant="Variant.Text" Clearable="true" Adornment="Adornment.End" AdornmentIcon="@Icons.Custom.Brands.MudBlazor" AdornmentColor="Color.Primary" Immediate="true" />
<MudTextField @bind-Value="_string" Label="Clearable Filled" Variant="Variant.Filled" Clearable="true" Immediate="true" />
<MudTextField @bind-Value="_string" Label="Clearable Outlined" Variant="Variant.Outlined" Clearable="true" />

@code {
    string _string;
}
```

Customize the visual appearance of text fields with `Margin="Margin.Dense"` to reduce the height for compact layouts,
 `Typo` to match different content hierarchies, and `ShrinkLabel` to keep the label in its reduced-size position instead of resting over an empty field.

```razor title="TextFieldAppearanceExample"
<MudTextField @bind-Value="_dense" Label="Dense" Variant="Variant.Outlined" Margin="Margin.Dense" />
<MudTextField Text="The quick brown fox" Label="Typo.h6" Variant="Variant.Outlined" Typo="Typo.h6" T="string" />
<MudTextField @bind-Value="_shrink" Label="Shrink label" Variant="Variant.Outlined" ShrinkLabel="true" />

@code {
    private string _dense;
    private string _shrink;
}
```

Adornments allow you to add icons, text, or buttons to the start or end of text fields. They're perfect for adding context, actions, or visual cues.
 Use `AdornmentColor` to tint an adornment independently from the rest of the field.

```razor title="TextFieldAdornmentsExample"
<div class="d-flex">
    <MudTextField @bind-Value="Amount" Label="Amount" Variant="Variant.Outlined" Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.AttachMoney" AdornmentColor="Color.Primary" />
    <MudTextField @bind-Value="Weight" HelperText="Weight" Variant="Variant.Outlined" Adornment="Adornment.End" AdornmentText="Kg" AdornmentColor="Color.Secondary" Class="mx-8" />
    <MudTextField @bind-Value="Password" Label="Password" Variant="Variant.Outlined" InputType="@PasswordInput" Adornment="Adornment.End" AdornmentIcon="@PasswordInputIcon" OnAdornmentClick="TogglePasswordVisibility" AdornmentAriaLabel="Show Password" />
</div>

@code {
    public double? Amount { get; set; }
    public int? Weight { get; set; }
    public string Password { get; set; } = "superstrong123";

    private bool _isShow;
    private InputType PasswordInput = InputType.Password;
    private string PasswordInputIcon = Icons.Material.Filled.VisibilityOff;

    private void TogglePasswordVisibility()
    {
        if (_isShow)
        {
            _isShow = false;
            PasswordInputIcon = Icons.Material.Filled.VisibilityOff;
            PasswordInput = InputType.Password;
        }
        else
        {
            _isShow = true;
            PasswordInputIcon = Icons.Material.Filled.Visibility;
            PasswordInput = InputType.Text;
        }
    }
}
```

Display character counts and enforce length limits to help users stay within content boundaries. Set `Counter` to show the count,
 and combine with `MaxLength` to enforce limits at the input level.

```razor title="TextFieldCharacterCountExample"
<MudTextField T="string" Counter="25" HelperText="This field uses Counter prop" Immediate="true" Validation="@(new Func<string, IEnumerable<string>>(MaxCharacters))" Label="Regular" Variant="Variant.Text" />
<MudTextField T="string" Counter="25" MaxLength="25" HelperText="This field uses Counter and MaxLength prop" Immediate="true" Label="Limited" Variant="Variant.Text" />
<MudTextField T="string" Counter="0" HelperText="This field has Counter set to 0" Immediate="true" Label="Counter" Variant="Variant.Text" />
<MudTextField T="string" MaxLength="10" HelperText="This field uses MaxLength prop" Immediate="true" Label="Max Length" Variant="Variant.Text" />

@code {
    private IEnumerable<string> MaxCharacters(string ch)
    {
        if (!string.IsNullOrEmpty(ch) && 25 < ch?.Length)
            yield return "Max 25 characters";
    }
}
```

Text fields support comprehensive data binding patterns for different scenarios and data types.

Bind text fields to properties of objects (POCOs). Changes in the fields automatically update the model, and model changes reflect in the fields.
 Note: Always use two-way bindings (`@("@bind-Value")`) with text fields.

```razor title="TextFieldBindingExample"
<MudTextField @bind-Value="element.Name" Label="Name" Variant="Variant.Outlined" Margin="Margin.Dense"/>
<MudTextField @bind-Value="element.Mass" Label="Mass" Variant="Variant.Outlined" Margin="Margin.Dense"/>
<MudTextField @bind-Value="element.Electrons" Label="Electrons" Variant="Variant.Outlined" Margin="Margin.Dense"/>
<MudTextField @bind-Value="element.Changed" Format="yyyy/MM/dd" Label="Last Update" Variant="Variant.Outlined" Margin="Margin.Dense"/>

<div class="d-flex align-end justify-space-between mud-width-full">
    <div class="d-flex flex-column">
        <MudText><b>Name:</b> @element.Name</MudText>
        <MudText><b>Mass:</b> @element.Mass u</MudText>
        <MudText><b>Electrons:</b> @element.Electrons</MudText>
        <MudText><b>Last Update:</b> @element.Changed.ToShortDateString()</MudText>
    </div>
    <MudButton Variant="Variant.Filled" DropShadow="false" OnClick="Reset">Reset Model</MudButton>
</div>

@code {
    Atom element = new Atom { Name = "Hydrogen", Mass = 1.00794, Electrons = 1, Changed=DateTime.Today };

    // A typical POCO
    public class Atom
    {
        public string Name { get; set; }
        public double Mass { get; set; }
        public int Electrons { get; set; }
        public DateTime Changed { get; set; }
    }

    private void Reset()
    {
        element = new Atom { Name = "Hydrogen", Mass = 1.00794, Electrons = 1, Changed = DateTime.Today };
        StateHasChanged();
    }
}
```

Value types always have a default value (e.g., `0` for `int`), so text fields won't appear empty initially.
 Use nullable types (e.g., `int?`) when you want fields to start empty until the user enters a value.

```razor title="TextFieldBindingValueTypesExample"
<MudGrid>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField @bind-Value="intValue" Label="Enter an int" />
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField @bind-Value="doubleValue" Label="Enter a double" Format="F1"/>
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField @bind-Value="enumValue" Label="Enum (Yes|No|Maybe)" />
    </MudItem>
</MudGrid>
<MudGrid>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField @bind-Value="nullableInt" HelperText="Enter an int" />
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField @bind-Value="nullableDouble" HelperText="Enter a double" Format="F1" />
    </MudItem>
    <MudItem xs="12" sm="6" md="4">
        <MudTextField @bind-Value="nullableEnum" HelperText="Enum (Yes|No|Maybe)" />
    </MudItem>
</MudGrid>


@code { 
    int intValue;
    double doubleValue;
    YesNoMaybe enumValue;
    int? nullableInt;
    double? nullableDouble;
    YesNoMaybe? nullableEnum;

    public enum YesNoMaybe { Maybe, Yes, No }
}
```

By default, text fields update on Enter or blur using the OnChange event. 
 To get input events instantly, set Immediate to true and component will use OnInput events.
 To wait for a user to stop typing and then receive input events, set the Debounce Interval to a non-zero value.

```razor title="DebouncedTextFieldExample"
<MudStack Row>
    <MudTextField @bind-Value="@_normalText" Immediate="@_immediate" DebounceInterval="@_debounceInterval"
                  OnDebounceIntervalElapsed="@HandleIntervalElapsed"
                  Variant="Variant.Outlined"
                  Adornment="Adornment.End"
                  AdornmentIcon="@Icons.Material.Filled.Search"
                  HelperText="@_normalText"/>

    @switch (_immediate)
    {
        case false when _debounceInterval <= 0:
            <MudText>
                I update when the user presses enter or the field loses focus.
            </MudText>
            break;
        case true when _debounceInterval <= 0:
            <MudText>
                I update as soon as there is any change to the input.
            </MudText>
            break;
        default:
        {
            <MudText>
                I update @_debounceInterval milliseconds after the user stops typing!
            </MudText>
            break;
        }
    }
</MudStack>

<MudStack Row>
    <MudTooltip>
        <ChildContent>
            <MudSwitch @bind-Value="@_immediate" Label="Immediate"/>
        </ChildContent>
        <TooltipContent>
            <MudText Typo="Typo.h6">Immediate</MudText>
            <MudText>If true then this component will fire <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event">input events</a>, if
                false then this component fires <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event">change events</a>
                instead.
            </MudText>
        </TooltipContent>
    </MudTooltip>

    <MudTooltip>
        <ChildContent>
            <MudNumericField @bind-Value="@_debounceInterval" DebounceInterval="500" Label="Debounce Interval"/>
        </ChildContent>
        <TooltipContent>
            <MudText Typo="Typo.h6">Debounce Interval</MudText>
            <MudText>Determines how long this component should wait before firing an input event.</MudText>
            <MudText Typo="Typo.body2">Note: setting the Debounce Interval will automatically force use of <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event">input events</a>.
            </MudText>
        </TooltipContent>
    </MudTooltip>
</MudStack>

@code {
    private string _normalText = "Try me!";
    private bool _immediate;
    private double _debounceInterval;

    private void HandleIntervalElapsed(string debouncedText)
    {
        // at this stage, interval has elapsed
    }
}
```

You can change the InputType of MudTextField to use the native browser implementation of the
 [HTML input element](https://developer.mozilla.org/docs/Web/HTML/Element/input).
 Note that any Placeholder will be ignored where the browser provides a default placeholder.

 All inputs can be bound to `string` types; alternatively, input types `Date` and `DateTimeLocal`
 can be bound to a nullable `DateTime?`. When binding to a `DateTime?` you must set the `Format` property to `yyyy-MM-dd` for input type `Date`, and you
 must set the `Format` property to `s` ([ISO 8601](https://docs.microsoft.com/dotnet/standard/base-types/standard-date-and-time-format-strings#Sortable)) for input type `DateTimeLocal`.

```razor title="TextFieldNativeInputsExample"
<MudTextField T="string" Label="Color"  InputType="InputType.Color" />
<MudTextField T="DateTime?" Format="yyyy-MM-dd" Label="Date"  InputType="InputType.Date"/>
<MudTextField T="DateTime?" Format="s" Label="DateTimeLocal" InputType="InputType.DateTimeLocal"/>
<MudTextField T="string" Label="Month" InputType="InputType.Month"/>
<MudTextField T="string" Label="Time" InputType="InputType.Time"/>
<MudTextField T="string" Label="Week" InputType="InputType.Week"/>
```

Text fields can be expanded to accommodate multiple lines of text by setting the `Lines` property.
 Use `Sizing` to control whether the field grows with content.

```razor title="TextFieldMultilineExample"
<MudGrid>
    <MudItem xs="12" sm="6">
        <MudStack Spacing="4">
            <MudText Typo="Typo.h6">Fixed Sizing</MudText>
            <MudTextField T="string"
                          Label="Fixed (3 lines)"
                          Variant="Variant.Outlined"
                          Lines="3"
                          Sizing="InputSizing.Fixed"
                          Text="@_fixedText" />
            
            <MudTextField T="string"
                          Label="Fixed (5 lines)"
                          Variant="Variant.Filled"
                          Lines="5"
                          Sizing="InputSizing.Fixed"
                          Text="@_fixedText2" />
        </MudStack>
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudStack Spacing="4">
            <MudText Typo="Typo.h6">Auto Sizing</MudText>
            <MudTextField T="string"
                          Label="Auto (3 to 6 lines)"
                          Variant="Variant.Outlined"
                          Lines="3"
                          MaxLines="6"
                          Sizing="InputSizing.Auto"
                          Placeholder="Type to see it grow..." />

            <MudTextField T="string"
                          Label="Auto (Starts at 1, Max 10)"
                          Variant="Variant.Text"
                          MaxLines="10"
                          Sizing="InputSizing.Auto"
                          Placeholder="This one starts small but can grow large." />
        </MudStack>
    </MudItem>
</MudGrid>

@code {
    private string _fixedText = "I am a multiline text area\nWith exactly three lines\nNo more, no less.";
    private string _fixedText2 = "Standard multiline behavior\nFixed height\nSet by the 'Lines' parameter.";
}
```

If you set the `Mask` property, the text field will apply formatting rules or input restrictions on-the-fly
 while the user is typing.

 Check out the [Masking](features/masking) page for more info and examples.

 In this example we apply a `PatternMask` with a mask string of
 `"0000 0000 0000 0000"` prompting for blocks of digits and
 refusing invalid input. Note how the cursor automatically
 jumps over delimiters so you don't have to type them. You can also try pasting the test credit card number 4543474002249996.

Capture a text field with `@@ref` to control it from code. `FocusAsync()` sets focus;
 `SelectAsync()` selects all text and `SelectRangeAsync(start, end)` selects a specific range;
 and `GetCurrentCaretPositionAsync()`, `InsertTextAtCurrentCaretPositionAsync()` and `InsertTextAsync(text, position)` read the caret and insert text.

```razor title="TextFieldProgrammaticExample"
<MudTextField @ref="_textField" T="string" Label="Programmatic control" Lines="3" Variant="Variant.Outlined" Text="@SampleText" HelperText="@($"Caret position: {_caretPosition}")" />
<MudStack Row="true" Wrap="Wrap.Wrap" Class="mt-2">
    <MudButton OnClick="FocusFieldAsync" Color="Color.Primary">Focus</MudButton>
    <MudButton OnClick="SelectAllAsync" Color="Color.Primary">Select all</MudButton>
    <MudButton OnClick="SelectRangeAsync" Color="Color.Primary">Select 5-10</MudButton>
    <MudButton OnClick="GetCaretPositionAsync" Color="Color.Primary">Get caret</MudButton>
    <MudButton OnClick="InsertAtCaretAsync" Color="Color.Primary">Insert at caret</MudButton>
    <MudButton OnClick="InsertAtPositionAsync" Color="Color.Primary">Insert at 56</MudButton>
</MudStack>

@code {
    private const string SampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    private MudTextField<string> _textField;
    private int _caretPosition = -1;

    private async Task FocusFieldAsync() => await _textField.FocusAsync();

    private async Task SelectAllAsync() => await _textField.SelectAsync();

    private async Task SelectRangeAsync() => await _textField.SelectRangeAsync(5, 10);

    private async Task GetCaretPositionAsync() => _caretPosition = await _textField.GetCurrentCaretPositionAsync();

    private async Task InsertAtCaretAsync() => await _textField.InsertTextAtCurrentCaretPositionAsync(" [inserted at caret] ");

    private async Task InsertAtPositionAsync() => await _textField.InsertTextAsync(" [inserted at position 56] ", 56);
}
```

MudInput is the underlying component that powers MudTextField, providing a simpler interface without labels or helper text for when you need basic input functionality.

```razor title="TextFieldInputsExample"
<MudInput Value="@("Basic Input")" />
<MudInput T="string" Placeholder="Placeholder" />
<MudInput Value="@("Disabled")" Disabled="true" />
<MudInput Value="@("Error")" Error="true" />
```
