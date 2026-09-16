# Services

MudBlazor provides several useful services.

Provides functionality to get the current view port size, to monitor the browser viewport size for any changes and to get the current breakpoint.

This requires to inherit from
 `IBrowserViewportObserver`
 .

```razor title="BrowserViewportServiceExampleInterface"
@using MudBlazor.Services
@inject IBrowserViewportService BrowserViewportService
@implements IBrowserViewportObserver
@implements IAsyncDisposable

<MudStack Spacing="2">
    <MudText>Browser width: @_currentBrowserWindowSize.Width px</MudText>
    <MudText>Browser height: @_currentBrowserWindowSize.Height px</MudText>
</MudStack>

@code {
    public Guid Id { get; } = Guid.NewGuid(); // The id of the observer
    public ResizeOptions ResizeOptions { get; } = new() // The observer options
    {
        NotifyOnBreakpointOnly = false
    };

    private BrowserWindowSize _currentBrowserWindowSize = new();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            await BrowserViewportService.SubscribeAsync(this, fireImmediately: true);
        }
    }

    public async ValueTask DisposeAsync()
    {
        await BrowserViewportService.UnsubscribeAsync(this);
    }

    public Task NotifyBrowserViewportChangeAsync(BrowserViewportEventArgs browserViewportEventArgs)
    {
        _currentBrowserWindowSize = browserViewportEventArgs.BrowserWindowSize;
        return InvokeAsync(StateHasChanged);
    }
}
```

The
 `ResizeObserver`
 is similar to
 [BrowserViewportService](features/services#ibrowserviewportservice)
 but for elements instead of the browser window.
 
 Don't inject the
 `IResizeObserver`
 directly. Always use the
 `IResizeObserverFactory`
 instead.

```razor title="ResizeObserverExample"
@using MudBlazor.Interop
@using MudBlazor.Services
@inject IResizeObserverFactory ResizeObserverFactory
@implements IAsyncDisposable

<div @ref="_divReference" style="width: 100%; text-align: center;">
    <MudText>This div is @_divWidth px wide</MudText>
</div>

@code {
    private IResizeObserver _resizeObserver;
    private ElementReference _divReference;
    private double _divWidth;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            _resizeObserver = ResizeObserverFactory.Create();
            _resizeObserver.OnResized += ResizeObserverOnResized;
            await _resizeObserver.Observe(_divReference);
            _divWidth = _resizeObserver.GetWidth(_divReference);
            StateHasChanged();
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_resizeObserver != null) await _resizeObserver.DisposeAsync();
    }

    private void ResizeObserverOnResized(IDictionary<ElementReference, BoundingClientRect> changes)
    {
        _divWidth = changes.Values.LastOrDefault()?.Width ?? 0;
        StateHasChanged();
    }
}
```

This service provides general scroll functionality for scrolling.

```razor title="ScrollManagerExample"
@inject IScrollManager ScrollManager

<MudStack Row="true">
    <MudButton OnClick="@ToggleScrollLockAsync" Variant="Variant.Filled" EndIcon="@LockScrollBtIcon">@LockScrollBtText</MudButton>
    <MudButton OnClick="@(() => ScrollManager.ScrollIntoViewAsync("#iresizeobserver", ScrollBehavior.Smooth))" Variant="Variant.Filled">Scroll to resize observer</MudButton>
</MudStack>

@code {
    private bool _scrollIsLocked;
    private string LockScrollBtText => _scrollIsLocked ? "Unlock scroll" : "Lock scroll";
    private string LockScrollBtIcon => _scrollIsLocked ? Icons.Material.Outlined.LockOpen : Icons.Material.Outlined.Lock;

    private async Task ToggleScrollLockAsync()
    {
        if (_scrollIsLocked) await ScrollManager.UnlockScrollAsync();
        else await ScrollManager.LockScrollAsync();

        _scrollIsLocked = !_scrollIsLocked;
    }
}
```

Provides functionality to listen for scroll events for a specific element.
 
 Don't inject the
 `IScrollListener`
 directly. Always use the
 `IScrollListenerFactory`
 instead.

This example shows how
 `ScrollManager`
 and
 `ScrollListener`
 can be used in conjunction.

```razor title="ScrollListenerExampleAdvanced"
@inject IScrollListenerFactory ScrollListenerFactory
@inject IScrollManager ScrollManager
@implements IAsyncDisposable

<!--suppress CssUnresolvedCustomProperty -->
<style>
    .scroll_wrapper {
        width: 50%;
        height: 100%;
    }

    #scroll_advanced {
        padding: 16px;
        overflow-y: scroll;
        scrollbar-width: none;
        height: 20rem;
        width: 100%;
    }
</style>

<MudStack Class="scroll_wrapper" Row="true" AlignItems="AlignItems.Center" Spacing="0">
    <MudPaper id="scroll_advanced" Class="d-flex flex-column gap-4">
        @for (var i = 0; i < 100; i++)
        {
            <MudPaper Class="pa-8" Style="@($"background-color: {ColorPalette[i % ColorPalette.Length]};")" Outlined="true"/>
        }
    </MudPaper>
    <MudStack Class="mud-width-full">
        <MudSlider @bind-Value="_scrollBarValue" @bind-Value:after="OnScrollBarValueChanged" Step="0.1" Vertical="true"/>
    </MudStack>
</MudStack>

@code {

    private static readonly string[] ColorPalette =
    [
        Colors.Blue.Accent3, Colors.Teal.Accent3, Colors.Amber.Accent3, Colors.Orange.Accent3, Colors.Red.Accent3,
        Colors.DeepPurple.Accent3, Colors.Green.Accent3, Colors.LightBlue.Accent3, Colors.Teal.Lighten1, Colors.Amber.Lighten1,
        Colors.Orange.Lighten1, Colors.Red.Lighten1, Colors.DeepPurple.Lighten1, Colors.Green.Lighten1, Colors.LightBlue.Lighten1,
        Colors.Amber.Darken2, Colors.Orange.Darken2, Colors.Red.Darken2, Colors.DeepPurple.Darken2, Colors.Gray.Darken2
    ];

    private IScrollListener _scrollListener;
    private double _scrollBarValue = 100;
    private double _scrollHeight;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (firstRender)
        {
            _scrollListener = ScrollListenerFactory.Create("#scroll_advanced", 0);
            _scrollListener.OnScroll += ScrollListenerOnScroll;

            var scrollData = await _scrollListener.GetCurrentScrollDataAsync();
            ScrollListenerOnScroll(null, scrollData);
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_scrollListener != null)
        {
            await _scrollListener.DisposeAsync();
        }
    }

    private void ScrollListenerOnScroll(object sender, ScrollEventArgs e)
    {
        var maxScroll = e.ScrollHeight - e.ClientHeight;
        var scrollPercentage = maxScroll > 0 ? e.ScrollTop / maxScroll * 100 : 0;
        _scrollBarValue = 100 - scrollPercentage;
        _scrollHeight = e.ScrollHeight;
        StateHasChanged();
    }

    private void OnScrollBarValueChanged()
    {
        var scrollTo = (100 - _scrollBarValue) / 100 * _scrollHeight;
        ScrollManager.ScrollToAsync("#scroll_advanced", 0, Convert.ToInt32(scrollTo), ScrollBehavior.Auto);
    }
}
```

## Further examples

```razor title="BrowserViewportServiceExampleLambda"
@using MudBlazor.Services
@inject IBrowserViewportService BrowserViewportService
@implements IAsyncDisposable

<MudStack Spacing="2">
    <MudText>Browser width: @_currentBrowserWindowSize.Width px</MudText>
    <MudText>Browser height: @_currentBrowserWindowSize.Height px</MudText>
</MudStack>

@code {
    private readonly Guid _observerId = Guid.NewGuid();
    private BrowserWindowSize _currentBrowserWindowSize = new();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            await BrowserViewportService.SubscribeAsync(_observerId, args =>
            {
                _currentBrowserWindowSize = args.BrowserWindowSize;
                StateHasChanged();
            });
        }
    }

    public async ValueTask DisposeAsync()
    {
        await BrowserViewportService.UnsubscribeAsync(_observerId);
    }
}
```

```razor title="ScrollListenerExampleSimple"
@inject IScrollListenerFactory ScrollListenerFactory
@implements IAsyncDisposable

<!--suppress CssUnresolvedCustomProperty -->
<style>
    #scroll_simple {
        height: 5rem;
        width: 100%;
        overflow-y: scroll;
        scrollbar-width: auto;
        border-radius: var(--mud-default-borderradius);
    }

    .scroll_stack {
        color: var(--mud-palette-text-primary);
        background-color: var(--mud-palette-background);
    }
</style>

<MudStack>
    <MudText>You can attach the scroll listener to any element:</MudText>
    <MudStack>
        <MudText>Rectangle scroll position: @_scrollTopRectangle px</MudText>
        <div id="scroll_simple">
            <MudStack Spacing="0" Class="scroll_stack px-4">
                @for (var i = 0; i < 100; i++)
                {
                    var iLocal = i;
                    <MudText>Line @iLocal</MudText>
                }
            </MudStack>
        </div>
    </MudStack>
</MudStack>


@code {
    private double _scrollTopRectangle;
    private IScrollListener _scrollListener;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (firstRender)
        {
            _scrollListener = ScrollListenerFactory.Create("#scroll_simple");
            _scrollListener.OnScroll += ScrollListenerOnScroll;
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_scrollListener != null)
        {
            await _scrollListener.DisposeAsync();
        }
    }

    private void ScrollListenerOnScroll(object sender, ScrollEventArgs e)
    {
        _scrollTopRectangle = e.ScrollTop;
        StateHasChanged();
    }
}
```
