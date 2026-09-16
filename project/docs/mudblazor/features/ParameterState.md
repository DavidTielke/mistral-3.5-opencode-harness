# ParameterState

## Further examples

```razor title="AccessParameterValueExample"
<MudContainer Class="mt-8" Style="justify-items: center">
    <MudPaper Class="mt-4 px-8">
        <MudStepper @ref="_stepper" NonLinear Class="mr-4">
            <ChildContent>
                <MudStep Title="Step 1" CompletedChanged="@(() => StateHasChanged())">Introductory Step</MudStep>
                <MudStep Title="Step 2" CompletedChanged="@(() => StateHasChanged())">More Details</MudStep>
                <MudStep Title="Step 3" CompletedChanged="@(() => StateHasChanged())">Wrap things up</MudStep>
            </ChildContent>
        </MudStepper>

        @if (_stepper is not null)
        {
            <MudStack Row Class="justify-center">
                @foreach (var step in _stepper.Steps)
                {
                    <MudChip T="string" Color="@GetColor(step.Completed)">
                        @step.Title
                    </MudChip>
                }
            </MudStack>

            <MudStack Row Class="justify-center">
                @foreach (var step in _stepper.Steps)
                {
                    <MudChip T="string" Color="@GetColor(step.Completed)">
                        @step.Title
                    </MudChip>
                }
            </MudStack>
        }
    </MudPaper>
</MudContainer>

@code {
    private MudStepper _stepper = null!;

    private static Color GetColor(bool completed) => completed ? Color.Success : Color.Error;
}
```

```razor title="IncorrectParameterModificationExample"
@code {
    private MudCollapse _collapseRef = null!;

#pragma warning disable BL0005
    private void Update()
    {
        //Parameter modifications such as this are ignored on components utilizing parameter state.
        _collapseRef.Expanded = true; // ❌ Not recommended
    }
#pragma warning restore BL0005
}
```

```razor title="ParameterStateUsageExample"
@using MudBlazor.State

@inherits ComponentBaseWithState

@code {
    private readonly ParameterState<bool> _expandedState; //separate field for storing parameter state

    [Parameter, ParameterState]
    public bool Expanded { get; set; }

    [Parameter]
    public EventCallback<bool> ExpandedChanged { get; set; }

    public ParameterStateUsageExample()
    {
        using var registerScope = CreateRegisterScope();
        _expandedState = registerScope.RegisterParameter<bool>(nameof(Expanded))
            .WithParameter(() => Expanded)
            .WithEventCallback(() => ExpandedChanged);
    }

    private Task ToggleAsync() => _expandedState.SetValueAsync(!_expandedState.Value); //✔ Do NOT modify parameters directly.
}
```

```razor title="ProblemUsageExample"
@code {
    [Parameter]
    public bool Expanded { get; set; }

    [Parameter]
    public EventCallback<bool> ExpandedChanged { get; set; }

    private Task ToggleAsync()
    {
        Expanded = !Expanded; // ❌ Modifies parameter directly
        return ExpandedChanged.InvokeAsync(Expanded);
    }
}
```

```razor title="TwoWayBindingExample"
<MudContainer Class="mt-8" Style="justify-items: center">
    <MudPaper Class="pa-4" MaxWidth="400px">
        <MudStack Spacing="2">
            <MudButton OnClick="Update">@(_isExpanded ? "Collapse" : "Expand")</MudButton>
            <MudDivider />
            <MudCollapse @bind-Expanded="@_isExpanded">
                This content is collapsible.
            </MudCollapse>
        </MudStack>
    </MudPaper>
</MudContainer>

@code {
    private bool _isExpanded;

    private void Update()
    {
        _isExpanded = !_isExpanded;
    }
}
```
