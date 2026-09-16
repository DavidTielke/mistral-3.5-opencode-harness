# Stack

The default `@nameof(MudStack)` displays its items vertically in a column.

```razor title="StackBasicExample"
<MudStack>
    <MudPaper Class="pa-3">Item 1</MudPaper>
    <MudPaper Class="pa-3">Item 2</MudPaper>
    <MudPaper Class="pa-3">Item 3</MudPaper>
</MudStack>
```

With the `@nameof(MudStack.Row)` property set to true the items will be displayed horizontally in a row.

```razor title="StackDirectionExample"
<MudStack Row="true">
    <MudPaper Class="pa-3">Item 1</MudPaper>
    <MudPaper Class="pa-3">Item 2</MudPaper>
    <MudPaper Class="pa-3">Item 3</MudPaper>
</MudStack>
```

With the `@nameof(MudStack.Breakpoint)` property set, the state of the `@nameof(MudStack.Row)` property will be reversed based on the defined screen size breakpoint. For example, when set to a specific breakpoint such as `@nameof(Breakpoint.Md)`, the row state is reversed at that screen size. If set to a range like `@nameof(Breakpoint.MdAndUp)`, the row state will be reversed for all screen sizes greater than or equal to the specified breakpoint.

```razor title="StackBreakpointExample"
<MudGrid>
    <MudItem xs="12" md="8">
        <MudStack Row="@_row" Reverse="@_reverse" Breakpoint="@_breakpoint">
            <MudPaper Class="pa-3">Item 1</MudPaper>
            <MudPaper Class="pa-3">Item 2</MudPaper>
            <MudPaper Class="pa-3">Item 3</MudPaper>
        </MudStack>
    </MudItem>
    <MudItem xs="12" md="4">
        <MudStack>
            <MudSwitch Label="Row" @bind-Value="_row" />
            <MudSwitch Label="Reverse" @bind-Value="_reverse" />
            <MudSelect T="Breakpoint" @bind-Value="_breakpoint" Label="Breakpoint">
                @foreach (var value in Enum.GetValues(typeof(Breakpoint)).Cast<Breakpoint>()){
                    <MudSelectItem T="Breakpoint" Value="value">@value</MudSelectItem>
                }
            </MudSelect>
        </MudStack>
    </MudItem>
</MudGrid>

@code {
    private Breakpoint _breakpoint = Breakpoint.None;
    private bool _row = false;
    private bool _reverse = false;
}
```

The default spacing can be changed by setting any number between 0 and 16 with the `@nameof(MudStack.Spacing)` property.

```razor title="StackSpacingExample"
<MudStack Spacing="@_spacing" Row="true">
    <MudPaper Class="pa-3">Item 1</MudPaper>
    <MudPaper Class="pa-3">Item 2</MudPaper>
    <MudPaper Class="pa-3">Item 3</MudPaper>
</MudStack>

<MudSlider @bind-Value="_spacing" Min="0" Max="16">Spacing: @_spacing.ToString()</MudSlider>

@code {
    private int _spacing { get; set; } = 3;
}
```

The default wrap behavior can be changed by setting the `@nameof(MudStack.Wrap)` property.

```razor title="StackWrappingExample"
<MudPaper Outlined="true" Class="border-dashed pa-4">
    <MudStack Wrap="@_wrap" Spacing="4" Row="@_row" Style="@_size" AlignItems="AlignItems.Start">
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="" >Button 1</MudButton>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="" >Button 2</MudButton>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="" >Button 3</MudButton>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="" >Button 4</MudButton>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="" >Button 5</MudButton>
    </MudStack>
</MudPaper>

<MudSlider @bind-Value="_width" Min="100" Max="800">Width: @_width.ToString()px</MudSlider>
<MudSlider @bind-Value="_height" Min="100" Max="800">Height: @_height.ToString()px</MudSlider>

<MudStack Row AlignItems="AlignItems.Center">
    <MudSwitch @bind-Value="_row" Color="Color.Primary">Row</MudSwitch>
    <MudChipSet T="Wrap" CheckMark @bind-SelectedValue="_wrap">
        <MudChip T="Wrap" Text="No Wrap" Value="@(Wrap.NoWrap)" SelectedColor="Color.Primary" Variant="Variant.Text" Default="true"/>
        <MudChip T="Wrap" Text="Wrap" Value="@(Wrap.Wrap)" SelectedColor="Color.Primary" Variant="Variant.Text" />
        <MudChip T="Wrap" Text="Wrap Reverse" Value="@(Wrap.WrapReverse)" SelectedColor="Color.Primary" Variant="Variant.Text" />
    </MudChipSet>
</MudStack>

@code {
    private Wrap _wrap = Wrap.NoWrap;

    private int _width { get; set; } = 200;
    private int _height { get; set; } = 200;
    private bool _row { get; set; } = true;

    private string _size => $"width: {_width}px; height: {_height}px;";
}
```

You can force items onto the next line by adding a `MudFlexBreak`.

```razor title="StackBreakExample"
<MudPaper Outlined="true" Class="border-dashed pa-4">
    <MudStack Wrap="Wrap.Wrap" Spacing="4" Row Style="width: 500px" AlignItems="AlignItems.Start">
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="">Button 1</MudButton>
        <MudFlexBreak />
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="">Button 2</MudButton>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="">Button 3</MudButton>
        <MudFlexBreak />
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="">Button 4</MudButton>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="">Button 5</MudButton>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Style="">Button 6</MudButton>
    </MudStack>
</MudPaper>
```

Use the `@nameof(MudStack.HtmlTag)` property to choose which HTML element gets rendered by `@nameof(MudStack)`.

```razor title="StackHtmlTagExample"
<MudStack HtmlTag="ul" aria-label="Sample stack list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</MudStack>
```

Here are two simple examples to demonstrate what `@nameof(MudStack)` can be used for.

```razor title="StackUsageFormExample"
<MudStack>
    <MudPaper Class="pa-4">
        <MudStack Row="true">
            <MudAvatar Size="Size.Large">
                <MudImage Src="images/mony.jpg" />
            </MudAvatar>
            <MudStack Justify="Justify.Center" Spacing="0">
                <MudText Typo="Typo.body1">Mony Larsson</MudText>
                <MudText Typo="Typo.body2">onebiteonekill@mony.dog</MudText>
            </MudStack>
        </MudStack>
    </MudPaper>

    <MudPaper Class="pa-4">
        <MudStack Spacing="4">
            <MudTextField T="string" Label="Card number" Mask="@(new PatternMask("0000 0000 0000 0000"))" />
            <MudStack Row="true">
                <MudTextField T="string" Label="Expires" Mask="@(new DateMask("MM/YY", 'Y', 'M'))" />
                <MudTextField T="string" Label="CVC" Mask="@(new PatternMask("000"))" />
            </MudStack>
            <MudButton Variant="Variant.Filled" Color="Color.Primary" DropShadow="false">Pay Now</MudButton>
        </MudStack>
    </MudPaper>
</MudStack>
```

With the `@nameof(MudStack.Justify)` property you can define how the space between and around items along the main axis of the `@nameof(MudStack)`

```razor title="StackJustifyExample"
<MudPaper Outlined="true" Class="border-dashed">
    <MudStack Justify="@_justify" Row="true">
        <MudPaper Class="pa-3 mud-theme-primary">Item 1</MudPaper>
        <MudPaper Class="pa-3 mud-theme-primary">Item 2</MudPaper>
        <MudPaper Class="pa-3 mud-theme-primary">Item 3</MudPaper>
    </MudStack>
</MudPaper>

<MudChipSet T="string" CheckMark Class="d-flex justify-center mt-12">
    <MudChip Text="Start" OnClick="@(() => _justify = Justify.FlexStart)" SelectedColor="Color.Primary" />
    <MudChip Text="Center" OnClick="@(() => _justify = Justify.Center)" SelectedColor="Color.Primary" Default="true" />
    <MudChip Text="End" OnClick="@(() => _justify = Justify.FlexEnd)" SelectedColor="Color.Primary" />
    <MudChip Text="Space Around" OnClick="@(() => _justify = Justify.SpaceAround)" SelectedColor="Color.Primary" />
    <MudChip Text="Space Between" OnClick="@(() => _justify = Justify.SpaceBetween)" SelectedColor="Color.Primary" />
    <MudChip Text="Space Evenly" OnClick="@(() => _justify = Justify.SpaceEvenly)" SelectedColor="Color.Primary" />
</MudChipSet>


@code {
    Justify _justify = Justify.Center;
}
```

With the `@nameof(MudStack.AlignItems)` property you can control the alignment of items on the cross axis of the `@nameof(MudStack)`

```razor title="StackAlignExample"
<MudPaper Outlined="true" Class="border-dashed">
    <MudStack AlignItems="_align" Row="true" Style="height:200px;">
        <MudPaper Class="py-1 px-3 mud-theme-primary">Item 1</MudPaper>
        <MudPaper Class="py-3 px-3 mud-theme-primary">Item 2</MudPaper>
        <MudPaper Class="py-5 px-3 mud-theme-primary">Item 3</MudPaper>
    </MudStack>
</MudPaper>

<MudChipSet T="string" CheckMark Class="d-flex justify-center mt-12">
    <MudChip Text="Start" OnClick="@(() => _align = AlignItems.Start)" SelectedColor="Color.Primary" Default="true" />
    <MudChip Text="Center" OnClick="@(() => _align = AlignItems.Center)" SelectedColor="Color.Primary" />
    <MudChip Text="End" OnClick="@(() => _align = AlignItems.End)" SelectedColor="Color.Primary" />
    <MudChip Text="Stretch" OnClick="@(() => _align = AlignItems.Stretch)" SelectedColor="Color.Primary" />
    <MudChip Text="Baseline" OnClick="@(() => _align = AlignItems.Baseline)" SelectedColor="Color.Primary" />
</MudChipSet>


@code {
    AlignItems _align = AlignItems.Start;
}
```

If `@nameof(MudStack)` is in `@nameof(MudStack.Row)` mode or not, the behavior of `@nameof(MudStack.Justify)` and `@nameof(MudStack.AlignItems)` can almost be described as they switched as the axis they control are changed.

 In the example bellow swap between column and row and see how `@nameof(MudStack.Justify)` and `@nameof(MudStack.AlignItems)` behaves differently.

```razor title="StackCombinedExample"
<MudPaper Outlined="true" Class="border-dashed">
    <MudStack Justify="_justify" AlignItems="_align" Row="_row" Style="height:200px;">
        <MudPaper Class="py-1 px-3 mud-theme-primary">Item 1</MudPaper>
        <MudPaper Class="py-3 px-3 mud-theme-primary">Item 2</MudPaper>
        <MudPaper Class="py-5 px-3 mud-theme-primary">Item 3</MudPaper>
    </MudStack>
</MudPaper>

<MudStack Row="true" Justify="Justify.Center">
    <MudRadioGroup T="bool" @bind-Value="@_row">
        <MudRadio Value="false" Dense="true">Column</MudRadio>
        <MudRadio Value="true" Dense="true">Row</MudRadio>
    </MudRadioGroup>
</MudStack>

<MudStack Row="true">
    <MudChipSet T="string" CheckMark Class="d-flex justify-center">
        <MudChip Text="Justify Start" OnClick="@(() => _justify = Justify.FlexStart)" SelectedColor="Color.Primary" Variant="Variant.Text" Default="true" />
        <MudChip Text="Justify End" OnClick="@(() => _justify = Justify.FlexEnd)" SelectedColor="Color.Primary" Variant="Variant.Text" />
    </MudChipSet>
    <MudChipSet T="string" CheckMark Class="d-flex justify-center">
        <MudChip Text="Align Start" OnClick="@(() => _align = AlignItems.Start)" SelectedColor="Color.Secondary" Variant="Variant.Text" Default="true" />
        <MudChip Text="Align End" OnClick="@(() => _align = AlignItems.End)" SelectedColor="Color.Secondary" Variant="Variant.Text" />
    </MudChipSet>
</MudStack>


@code {
    bool _row = true;
    Justify _justify = Justify.FlexStart;
    AlignItems _align = AlignItems.Start;
}
```

The `@nameof(MudStack.StretchItems)` property allows for control over how child components are sized along the main axis within a `@nameof(MudStack)`.
 This feature provides the flexibility to specify which children should expand to fill additional space.

```razor title="StackStretchItemsExample"
<MudPaper Outlined Class="border-dashed">
    <MudStack StretchItems="@stretch" Row>
        <MudPaper Class="pa-3 mud-theme-primary">Item 1</MudPaper>
        <MudPaper Class="pa-3 mud-theme-primary">Item 2</MudPaper>
        <MudPaper Class="pa-3 mud-theme-primary">Item 3</MudPaper>
    </MudStack>
</MudPaper>

<MudChipSet @bind-SelectedValue="@stretch" Class="mt-12" >
    <MudChip Value="StretchItems.None" Text="Do Not Stretch" SelectedColor="Color.Primary" />
    <MudChip Value="StretchItems.Start" Text="Stretch First" SelectedColor="Color.Primary" Default="true" />
    <MudChip Value="StretchItems.StartAndEnd" Text="Stretch First and Last" SelectedColor="Color.Primary" />
    <MudChip Value="StretchItems.End" Text="Stretch Last" SelectedColor="Color.Primary" />
    <MudChip Value="StretchItems.Middle" Text="Stretch Middle" SelectedColor="Color.Primary" />
    <MudChip Value="StretchItems.All" Text="Stretch All" SelectedColor="Color.Primary" />
</MudChipSet>

@code {
    StretchItems stretch = StretchItems.Start;
}
```

```razor title="StackInteractiveExample"
<MudPaper Outlined="true" Class="border-dashed">
    <MudStack Justify="@justify" AlignItems="@align" StretchItems="@stretch" Row="@row" Reverse="@reverse" Spacing="@spacing" Style="height:300px;">
        <MudPaper Class="py-1 px-3 mud-theme-primary">Item 1</MudPaper>
        <MudPaper Class="py-3 px-3 mud-theme-primary">Item 2</MudPaper>
        <MudPaper Class="py-5 px-3 mud-theme-primary">Item 3</MudPaper>
    </MudStack>
</MudPaper>

<MudStack Row="true" AlignItems="AlignItems.Center">
    <MudSwitch @bind-Value="row" Label="Row" Color="Color.Primary" />
    <MudSwitch @bind-Value="reverse" Label="Reverse" Color="Color.Primary" />
    <MudText>Spacing:</MudText>
    <MudSlider @bind-Value="spacing" Min="0" Max="16"/>
</MudStack>

<MudStack>
    <MudChipSet @bind-SelectedValue="@justify" CheckMark>
        <MudChip Value="Justify.FlexStart" Text="Justify Start" SelectedColor="Color.Primary" Variant="Variant.Text" />
        <MudChip Value="Justify.Center" Text="Justify Center" SelectedColor="Color.Primary" Variant="Variant.Text" Default="true" />
        <MudChip Value="Justify.FlexEnd" Text="Justify End" SelectedColor="Color.Primary" Variant="Variant.Text" />
        <MudChip Value="Justify.SpaceAround" Text="Justify Space Around" SelectedColor="Color.Primary" Variant="Variant.Text" />
        <MudChip Value="Justify.SpaceBetween" Text="Justify Space Between" SelectedColor="Color.Primary" Variant="Variant.Text" />
        <MudChip Value="Justify.SpaceEvenly" Text="Justify Space Evenly" SelectedColor="Color.Primary" Variant="Variant.Text" />
    </MudChipSet>

    <MudChipSet @bind-SelectedValue="@align" CheckMark>
        <MudChip Value="AlignItems.Start" Text="Align Start" SelectedColor="Color.Secondary" Variant="Variant.Text" />
        <MudChip Value="AlignItems.Center" Text="Align Center" SelectedColor="Color.Secondary" Variant="Variant.Text" Default="true" />
        <MudChip Value="AlignItems.End" Text="Align End" SelectedColor="Color.Secondary" Variant="Variant.Text" />
        <MudChip Value="AlignItems.Stretch" Text="Align Stretch" SelectedColor="Color.Secondary" Variant="Variant.Text" />
        <MudChip Value="AlignItems.Baseline" Text="Align Baseline" SelectedColor="Color.Secondary" Variant="Variant.Text" />
    </MudChipSet>

    <MudChipSet @bind-SelectedValue="@stretch" CheckMark>
        <MudChip Value="StretchItems.None" Text="Do Not Stretch" SelectedColor="Color.Tertiary" Variant="Variant.Text" Default="true" />
        <MudChip Value="StretchItems.Start" Text="Stretch First" SelectedColor="Color.Tertiary" Variant="Variant.Text" />
        <MudChip Value="StretchItems.End" Text="Stretch Last" SelectedColor="Color.Tertiary" Variant="Variant.Text" />
        <MudChip Value="StretchItems.StartAndEnd" Text="Stretch First and Last" SelectedColor="Color.Tertiary" Variant="Variant.Text" />
        <MudChip Value="StretchItems.Middle" Text="Stretch Middle" SelectedColor="Color.Tertiary" Variant="Variant.Text" />
        <MudChip Value="StretchItems.All" Text="Stretch All" SelectedColor="Color.Tertiary" Variant="Variant.Text" />
    </MudChipSet>
</MudStack>

@code {
    Justify justify = Justify.Center;
    AlignItems align = AlignItems.Center;
    StretchItems stretch = StretchItems.None;
    bool row = false;
    bool reverse = false;
    int spacing = 3;
}
```

## Further examples

```razor title="StackLayoutExample"
<MudStack AlignItems="AlignItems.Center">

    <MudStack Spacing="0" StretchItems="StretchItems.Middle" Class="stack-main mud-elevation-25 stack-adorner">

        @* Title Bar *@
        <MudStack Row AlignItems="AlignItems.Center" Justify="Justify.SpaceBetween" Class="mud-paper mud-paper-square stack-adorner">
            <MudIcon Icon="@Icons.Custom.Brands.MudBlazor" Color="Color.Primary" Class="ml-3 my-1 hideable" />
            <MudText Class="hideable">MudBlazor</MudText>
            <MudButton Color="Color.Error" Variant="Variant.Filled" Class="rounded-0 hideable" Style="min-width: 0;" DropShadow="false" OnClick="()=>counter=0">✕</MudButton>
        </MudStack>

        @* Middle Section *@
        <MudStack Row StretchItems="StretchItems.End" AlignItems="AlignItems.Stretch" Spacing="0" Style="height: 0px;" Class="stack-adorner">
            @* Side Menu *@
            <MudStack Justify="Justify.SpaceBetween" Spacing="0" Class="mud-theme-dark stack-adorner">
                <MudStack Spacing="0" Class="stack-adorner">
                    <MudButton Color="Color.Inherit" Class="pa-3 rounded-0 hideable" Style="min-width: 0;" OnClick="Count"><MudIcon Icon="@Icons.Material.Outlined.FileCopy" /></MudButton>
                    <MudButton Color="Color.Inherit" Class="pa-3 rounded-0 hideable" Style="min-width: 0;" OnClick="Count"><MudIcon Icon="@Icons.Material.Filled.Search" /></MudButton>
                    <MudButton Color="Color.Inherit" Class="pa-3 rounded-0 hideable" Style="min-width: 0;" OnClick="Count"><MudIcon Icon="@Icons.Material.Outlined.AltRoute" /></MudButton>
                </MudStack>
                <MudStack Spacing="0" Class="stack-adorner">
                    <MudButton Color="Color.Inherit" Class="pa-3 rounded-0 hideable" Style="min-width: 0;" OnClick="Count"><MudIcon Icon="@Icons.Material.Outlined.AccountCircle" /></MudButton>
                    <MudButton Color="Color.Inherit" Class="pa-3 rounded-0 hideable" Style="min-width: 0;" OnClick="Count"><MudIcon Icon="@Icons.Material.Outlined.Settings" /></MudButton>
                </MudStack>
            </MudStack>
            @* Main *@
            <MudStack Class="mud-background-gray stack-adorner" Style="overflow-x: auto;">
                <MudText Class="ma-6 hideable">
                    The MudStack provides flexibility in layout management, enabling the creation of elegant and responsive designs with minimal effort. Despite its simple design, it is powerful, making it perfect for both - simple and complex layouts. MudStack can perfectly complement and enhance your application's UI.
                </MudText>
            </MudStack>
        </MudStack>

        @* Status Bar *@
        <MudStack Row Spacing="0" Justify="Justify.SpaceBetween" Class="mud-theme-info stack-adorner">
            <MudButton Size="Size.Small" Color="Color.Inherit" StartIcon="@Icons.Material.Outlined.MarkChatRead" Class="hideable" OnClick="Count">Ready</MudButton>
            <MudStack Row Spacing="0" AlignItems="AlignItems.Center" Class="stack-adorner">
                <MudButton Size="Size.Small" Color="Color.Inherit" Class="hideable" OnClick="Count">MudBlazor</MudButton>
                <MudBadge Content="@counter" Overlap Class="mr-3 hideable">
                    <MudIconButton Size="Size.Small" Color="Color.Inherit" Icon="@Icons.Material.Outlined.Notifications" OnClick="Count" />
                </MudBadge>
            </MudStack>
        </MudStack>

    </MudStack>

    <MudStack Row>
        <MudSwitch @bind-Value="showAdorners" Color="Color.Primary">Inspect MudStacks</MudSwitch>
        <MudSwitch @bind-Value="hideContent" Color="Color.Primary">Hide content</MudSwitch>
    </MudStack>

</MudStack>

<style>
    .stack-main {
        width: 380px;
        height: 320px;
        min-height: 310px;
        min-width: 300px;
        max-height: 420px;
        max-width: 520px;
        resize: both;
        overflow: hidden;
    }

    .mud-badge {
        font-size: 10px;
        height: 11px;
        min-width: 11px;
        padding: 1px 4px;
    }
</style>
@if (showAdorners)
{
    <style>
        .stack-adorner:hover {
            outline: 2px dashed var(--mud-palette-secondary);
            z-index: 100;
        }
    </style>
}
@if (hideContent)
{
    <style>
        .hideable {
            opacity: 0;
        }
    </style>
}
@code {
    bool showAdorners;
    bool hideContent;
    int counter = 2;
    void Count()
    {
        counter++;
    }
}
```
