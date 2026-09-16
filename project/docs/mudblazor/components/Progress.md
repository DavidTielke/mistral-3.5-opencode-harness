# Progress

```razor title="ProgressCircularInterminateExample"
<MudProgressCircular Color="Color.Default" Indeterminate="true" />
<MudProgressCircular Color="Color.Primary" Indeterminate="true"/>
<MudProgressCircular Color="Color.Secondary" Indeterminate="true" />
<MudProgressCircular Color="Color.Success" Indeterminate="true" />
<MudProgressCircular Color="Color.Info" Indeterminate="true" />
```

```razor title="ProgressCircularDeterminateExample"
@using System;
@using System.Threading;

@implements IDisposable

<MudProgressCircular Color="Color.Default" Value="@Value" />
<MudProgressCircular Color="Color.Primary" Value="@Value" />
<MudProgressCircular Color="Color.Secondary" Value="@Value" />
<MudProgressCircular Color="Color.Success" Value="@Value" />
<MudProgressCircular Color="Color.Info" Value="@Value" />

@code {
    private bool _disposed;

    public int Value { get; set; }

    public async Task SimulateProgressAsync()
    {
        Value = 0;
        do
        {
            if (_disposed)
            {
                return;
            }

            Value += 4;
            StateHasChanged();
            await Task.Delay(500);

        } while (Value < 100);

        await SimulateProgressAsync();
    }

    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        await SimulateProgressAsync();
    }

    public void Dispose() => _disposed = true;
}
```

You can place any content in the middle of the circular progress using the `ChildContent` parameter.

```razor title="ProgressCircularPercentageExample"
@using System;
@using System.Threading;

@implements IDisposable

<MudProgressCircular Color="Color.Default" Value="@_value">
    <ChildContent>
        @_value
    </ChildContent>
</MudProgressCircular>
<MudProgressCircular Color="Color.Primary" Value="@_value" Size="Size.Large">
    <ChildContent>
        @_value %
    </ChildContent>
</MudProgressCircular>
<MudProgressCircular Style="height: 80px; width: 80px" Color="Color.Primary" Value="@_value">
    <ChildContent>
        <MudStack Spacing="0" AlignItems="AlignItems.Center" Justify="Justify.Center">
            <MudText Typo="Typo.subtitle2">Value</MudText>
            <MudText Typo="Typo.subtitle2">@_value</MudText>
        </MudStack>
    </ChildContent>
</MudProgressCircular>
<MudProgressCircular Style="height: 60px; width: 60px" Color="Color.Success" Value="@_doubleValue">
    <ChildContent>@_doubleValue.ToString("N2")</ChildContent>
</MudProgressCircular>
<MudProgressCircular Size="Size.Large" Indeterminate="true" Color="Color.Primary">
    <ChildContent>Mud</ChildContent>
</MudProgressCircular>

@code {
    private bool _disposed;
    private int _value;
    private double _doubleValue;

    public async Task SimulateProgressAsync()
    {
        _value = 0;
        _doubleValue = 0;
        do
        {
            if (_disposed)
            {
                return;
            }

            _value += 4;
            _doubleValue += 4.2d;
            StateHasChanged();
            await Task.Delay(500);

        } while (_value < 100);

        await SimulateProgressAsync();
    }

    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        await SimulateProgressAsync();
    }

    public void Dispose() => _disposed = true;
}
```

You can change the size with the pre-defined `Size` prop or change the `Width` and `Height` in css.

```razor title="ProgressCircularSizesExample"
<MudProgressCircular Color="Color.Primary" Size="Size.Small" Indeterminate="true"/>
<MudProgressCircular Color="Color.Primary" Size="Size.Medium" Indeterminate="true" />
<MudProgressCircular Color="Color.Primary" Size="Size.Large" Indeterminate="true" />
<MudProgressCircular Color="Color.Primary" Style="height:70px;width:70px;" Indeterminate="true" />
```

```razor title="ProgressCircularRoundedExample"
<MudProgressCircular Color="Color.Error" Rounded="true" Size="Size.Large" StrokeWidth="4" Value="25" />
<MudProgressCircular Color="Color.Warning" Rounded="true" Size="Size.Large" StrokeWidth="4" Value="50" />
<MudProgressCircular Color="Color.Success" Rounded="true" Size="Size.Large" StrokeWidth="4" Value="75" />
```

```razor title="ProgressLinearInterminateExample"
<MudProgressLinear Color="Color.Primary" Indeterminate="true" Class="my-7" />
<MudProgressLinear Color="Color.Secondary" Indeterminate="true" Class="my-7"/>
```

```razor title="ProgressLinearDeterminateExample"
<MudProgressLinear Color="Color.Primary" Value="@Value" Class="my-7" />
<MudProgressLinear Color="Color.Secondary" Value="@Value" Class="my-7" />

@code {
    private bool _disposed;

    public int Value { get; set; }

    public async Task SimulateProgressAsync()
    {
        Value = 0;
        do
        {
            if (_disposed)
            {
                return;
            }

            Value += 4;
            StateHasChanged();
            await Task.Delay(500);

        } while (Value < 100);

        await SimulateProgressAsync();
    }

    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        await SimulateProgressAsync();
    }

    public void Dispose() => _disposed = true;
}
```

```razor title="ProgressLinearSizeExample"
<MudProgressLinear Color="Color.Dark" Size="Size.Small" Value="25" />
<MudProgressLinear Color="Color.Info" Size="Size.Medium" Value="50" Class="my-7" />
<MudProgressLinear Color="Color.Tertiary" Size="Size.Large" Value="75" />
```

By default, the value range is between 0 and 100. If you have a custom range, set `Min` and `Max` accordingly.

```razor title="ProgressLinearMinMaxExample"
<MudProgressLinear Value="-2" Min="-7" Max="7" />
<MudProgressLinear Value="17.75" Min="17.0" Max="18.0" Class="my-7" />
<MudProgressLinear Value="100" Min="0" Max="100" />
```

When setting `Buffer` to true you also have to give it a `BufferValue`. You can use any combination of buffer-value and value to achieve your design.

```razor title="ProgressLinearBufferExample"
<MudProgressLinear Color="Color.Primary" Buffer="true" Value="@Value" BufferValue="@BufferValue" Class="my-7" />
<MudProgressLinear Color="Color.Secondary" Buffer="true" Value="@Value" BufferValue="@BufferValue" Class="my-7" />
<MudProgressLinear Color="Color.Tertiary" Buffer="true" Value="@Value" BufferValue="@BufferValue" Class="my-7" />
<MudProgressLinear Color="Color.Info" Buffer="true" Value="@Value" BufferValue="@BufferValue" Class="my-7" />
<MudProgressLinear Color="Color.Warning" Buffer="true" Value="@Value" BufferValue="@BufferValue" Class="my-7" />
<MudProgressLinear Color="Color.Error" Buffer="true" Value="@Value" BufferValue="@BufferValue" Class="my-7" />
@code {
    private bool _disposed;

    public int Value { get; set; }

    public int BufferValue { get; set; }

    public async Task SimulateProgressAsync()
    {
        Value = 5;
        BufferValue = 10;

        do
        {
            if (_disposed)
            {
                return;
            }

            Value += 4;
            BufferValue += 5;
            StateHasChanged();
            await Task.Delay(500);

        } while (Value < 100);

        await SimulateProgressAsync();
    }

    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        await SimulateProgressAsync();
    }

    public void Dispose() => _disposed = true;
}
```

Sets the border radius on the progress linear to the set theme value.

```razor title="ProgressLinearRoundedExample"
<MudProgressLinear Color="Color.Error" Rounded="true" Size="Size.Small" Value="25" />
<MudProgressLinear Color="Color.Warning" Rounded="true" Size="Size.Medium" Value="50" Class="my-7" />
<MudProgressLinear Color="Color.Success" Rounded="true" Size="Size.Large" Value="75" />
```

Applies a striped background over the progress bar.

```razor title="ProgressLinearStripedExample"
<MudProgressLinear Color="Color.Secondary" Striped="true" Size="Size.Medium" Value="50" Class="my-7" />
<MudProgressLinear Color="Color.Primary" Striped="true" Size="Size.Large" Value="75" Class="my-7" />
```

While using the `ChildContent` of the component you can add a text to display current value.

```razor title="ProgressLinearLabelsExample"
<MudProgressLinear Color="Color.Info" Size="Size.Large" Value="25" Class="my-7">
    <MudText Typo="Typo.subtitle1" Color="Color.Dark">
        <b>25%</b>
    </MudText>
</MudProgressLinear>
```

Vertical progress bars works exactly the same way as the default horizontal ones.

```razor title="ProgressLinearVerticalExample"
<MudPaper Height="360px" Class="d-flex justify-space-around mud-width-full" Elevation="0">
    <MudProgressLinear Vertical="true" Color="Color.Primary" Size="Size.Small" Indeterminate="true" />
    <MudProgressLinear Vertical="true" Color="Color.Primary" Size="Size.Medium" Value="@Value" />
    <MudProgressLinear Vertical="true" Color="Color.Primary" Size="Size.Medium" Value="25">
        <MudText Typo="Typo.subtitle1" Color="Color.Dark"><b>25</b></MudText>
    </MudProgressLinear>
    <MudProgressLinear Vertical="true" Color="Color.Primary" Size="Size.Small" Buffer="true" Value="@Value" BufferValue="@BufferValue" />
    <MudProgressLinear Vertical="true" Color="Color.Primary" Striped="true" Size="Size.Large" Value="@Value" />
</MudPaper>

@code {
    private bool _disposed;

    public int Value { get; set; }

    public int BufferValue { get; set; }

    public async Task SimulateProgressAsync()
    {
        Value = 5;
        BufferValue = 10;

        do
        {
            if (_disposed)
            {
                return;
            }

            Value += 4;
            BufferValue += 5;
            StateHasChanged();
            await Task.Delay(500);

        } while (Value < 100);

        await SimulateProgressAsync();
    }

    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        await SimulateProgressAsync();
    }

    public void Dispose() => _disposed = true;
}
```

## Further examples

```razor title="ProgressLinearBackgroundExample"
<MudProgressLinear Color="Color.Primary" Value="75" Class="my-4" />
<MudProgressLinear Color="Color.Primary" Value="75" Class="my-4" ShowBackground="false" />
```
