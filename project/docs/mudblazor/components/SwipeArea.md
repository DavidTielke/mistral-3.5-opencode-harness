# SwipeArea

Swipe your finger in different directions to see how the component works (`LeftToRight`, `RightToLeft`, `TopToBottom`, `BottomToTop`).

```razor title="SwipeDirectionsExample"
<MudSwipeArea OnSwipeEnd="@(e => _swipeDirection = e.SwipeDirection)" Style="width: 100%; height: 300px; background-color:var(--mud-palette-surface)">
    <MudText Style="user-select: none;" Typo="@Typo.body1">@_swipeDirection</MudText>
</MudSwipeArea>

@code {
    private SwipeDirection _swipeDirection;
}
```

You can control the process in real time with the `OnSwipeMove` event. This event uses the `MultiDimensionSwipeEventArgs` parameter instead of SwipeEventArgs for increased precision.

```razor title="RealTimeSwipeExample"
<MudSwipeArea @ref="@_swipeArea" Class="mud-background border-dashed border-2 mud-border-primary" Style="width: 100%; height: 300px" OnSwipeMove="HandleSwipeMove" OnSwipeEnd="@Reset" OnSwipeLeave="@OnSwipeLeave">
    <MudText Class="pa-2" Style="user-select: none;" Typo="@Typo.body1">@($"{_swipeDirection[1].ToString()} {_swipeDirection[0].ToString()}")</MudText>
</MudSwipeArea>

<MudStack Class="mud-height-full mud-width-full" Row Wrap="Wrap.Wrap" Justify="Justify.Center">
    <MudChip T="string" Style="user-select: none;" Color="Color.Primary">Left: @_leftSwipe</MudChip>
    <MudChip T="string" Style="user-select: none;" Color="Color.Primary">Right: @_rightSwipe</MudChip>
    <MudChip T="string" Style="user-select: none;" Color="Color.Primary">Top: @_topSwipe</MudChip>
    <MudChip T="string" Style="user-select: none;" Color="Color.Primary">Bottom: @_bottomSwipe</MudChip>
</MudStack>
<MudText Align="Align.Center">*Value resets if swipe goes out of area.</MudText>

@code {
    private double _leftSwipe;
    private double _rightSwipe;
    private double _topSwipe;
    private double _bottomSwipe;
    private MudSwipeArea _swipeArea = null!;
    private List<SwipeDirection> _swipeDirection = [SwipeDirection.None, SwipeDirection.None];

    private void HandleSwipeMove(MultiDimensionSwipeEventArgs e)
    {
        _swipeDirection = [e.SwipeDirections[0], e.SwipeDirections[1]];
        for (int i = 0; i < e.SwipeDirections.Count; i++)
        {
            if (e.SwipeDirections[i] == SwipeDirection.LeftToRight)
            {
                _rightSwipe += Math.Abs(e.SwipeDeltas[i] ?? 0);
            }
            else if (e.SwipeDirections[i] == SwipeDirection.RightToLeft)
            {
                _leftSwipe += Math.Abs(e.SwipeDeltas[i] ?? 0);
            }
            else if (e.SwipeDirections[i] == SwipeDirection.BottomToTop)
            {
                _topSwipe += Math.Abs(e.SwipeDeltas[i] ?? 0);
            }
            else if (e.SwipeDirections[i] == SwipeDirection.TopToBottom)
            {
                _bottomSwipe += Math.Abs(e.SwipeDeltas[i] ?? 0);
            }
        }
    }

    private void OnSwipeLeave()
    {
        _swipeArea.Cancel();
        Reset();
    }

    private void Reset()
    {
        _swipeDirection = [SwipeDirection.None, SwipeDirection.None];
        _leftSwipe = 0;
        _rightSwipe = 0;
        _topSwipe = 0;
        _bottomSwipe = 0;
        StateHasChanged();
    }
}
```

Browser will not scroll when `PreventDefault` is set to `true`.

```razor title="SwipeDirectionsPreventDefaultExample"
<MudSwipeArea @ref="_swipeArea" OnSwipeEnd="HandleSwipeEnd" Style="width: 100%; height: 300px; background-color:var(--mud-palette-surface)" Sensitivity="_sensitivity" PreventDefault="@_preventDefault">
    <MudText Style="user-select: none;" Typo="@Typo.body1">@($"{_swipeDirection} - Swiped: {_swipeDelta}px")</MudText>
</MudSwipeArea>
<MudSwitch @bind-Value="_preventDefault" Color="Color.Primary">Prevent Default</MudSwitch>
<MudNumericField @bind-Value="_sensitivity" Label="Sensitivity" Min="0" />

@code {
    private MudSwipeArea _swipeArea;
    private SwipeDirection _swipeDirection;
    private bool _preventDefault = true;
    private int _sensitivity = 100;
    private double? _swipeDelta;

    private void HandleSwipeEnd(SwipeEventArgs args)
    {
        _swipeDirection = args.SwipeDirection;
        _swipeDelta = args.SwipeDelta;
    }
}
```

Swipe `LeftToRight`/`RightToLeft` to open and close the drawer.

```razor title="SwipeDrawerExample"
<MudSwipeArea OnSwipeEnd="@OnSwipeEnd" Style="width: 100%;">
    <MudPaper Height="200px" Style="overflow:hidden; position:relative;">
        <MudDrawer @bind-Open="@_drawerOpen" Fixed="false" Elevation="1" Variant="@DrawerVariant.Persistent" Color="Color.Primary">
            <MudDrawerHeader>
                <MudText Typo="Typo.h6">My App</MudText>
            </MudDrawerHeader>
            <MudNavMenu>
                <MudNavLink Match="NavLinkMatch.All" Icon="@Icons.Material.Filled.Dashboard" IconColor="Color.Inherit">Store</MudNavLink>
                <MudNavLink Match="NavLinkMatch.All" Icon="@Icons.Material.Filled.Dashboard" IconColor="Color.Inherit">Library</MudNavLink>
                <MudNavLink Match="NavLinkMatch.All" Icon="@Icons.Material.Filled.Dashboard" IconColor="Color.Inherit">Community</MudNavLink>
            </MudNavMenu>
        </MudDrawer>
    </MudPaper>
</MudSwipeArea>

@code {
    private bool _drawerOpen = true;

    public void OnSwipeEnd(SwipeEventArgs e)
    {
        if (e.SwipeDirection == SwipeDirection.LeftToRight && !_drawerOpen)
        {
            _drawerOpen = true;
            StateHasChanged();
        }
        else if (e.SwipeDirection == SwipeDirection.RightToLeft && _drawerOpen)
        {
            _drawerOpen = false;
            StateHasChanged();
        }
    }
}
```

Swipe `LeftToRight`/`RightToLeft` to change months.

```razor title="SwipeDatePickerExample"
@using System.Globalization


<MudSwipeArea OnSwipeEnd="@OnSwipeEnd">
    <div style="user-select: none;">
        <MudDatePicker PickerVariant="PickerVariant.Static" Date="@(DateTime.Today.AddDays(1))" @bind-PickerMonth="@_pickerMonth"/>
    </div>
</MudSwipeArea>

@code {
    private DateTime? _pickerMonth = DateTime.Now.StartOfMonth(CultureInfo.CurrentCulture);

    public void OnSwipeEnd(SwipeEventArgs e)
    {
        if (e.SwipeDirection == SwipeDirection.LeftToRight)
        {
            _pickerMonth = _pickerMonth?.AddMonths(-1);
            StateHasChanged();
        }
        else if (e.SwipeDirection == SwipeDirection.RightToLeft)
        {
            _pickerMonth = _pickerMonth?.AddMonths(1);
            StateHasChanged();
        }
    }
}
```

Try to drag this Swipe Box!

```razor title="SwipeBoxExample"
<div style="height: 400px; width: 300px; position: relative; background-color: var(--mud-palette-background)">
    <div style="height: 56px; width: 56px; border-radius: 50%; cursor: grab; z-index: 9999; position: absolute; left: @(_leftPadding)px; top: @(_topPadding)px;">
        <MudSwipeArea Class="mud-height-full mud-width-full mud-theme-primary d-flex align-center justify-center rounded-circle" OnSwipeMove="HandleSwipeMove">
            @if (_showIcon)
            {
                <MudIcon Style="width: 80%; height: 80%;" Icon="@Icons.Custom.Brands.MudBlazor" />
            }
        </MudSwipeArea>
    </div>
</div>

@code {
    private double _leftPadding;
    private double _topPadding;
    private bool _showIcon = false;

    private void HandleSwipeMove(MultiDimensionSwipeEventArgs e)
    {
        _leftPadding -= e.SwipeDeltas[0] ?? 0;
        _topPadding -= e.SwipeDeltas[1] ?? 0;

        if (_leftPadding < 0 || _topPadding < 0 || _leftPadding > 244 || _topPadding > 344)
        {
            _showIcon = true;
        }
        else
        {
            _showIcon = false;
        }
    }
}
```
