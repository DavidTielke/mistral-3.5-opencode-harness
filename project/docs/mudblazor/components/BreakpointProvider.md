# BreakpointProvider

The breakpoint provider offers a cascading parameter that exposes the window's current breakpoint (xs,sm,md,lg,xl).
 These features improve the performance if your layout heavily relies on such features or if you don't want to use the BreakpointListenerService directly in your own components.

 If a MudHidden is used within a MudBreakpointProvider, it will use the provided value instead of relying on the IBreakpointListenerService.
 That would reduce the number of render cycles if a change of the browser size occurred.

```razor title="BreakpointProviderPageHiddenExample"
@using MudBlazor.Services


<MudBreakpointProvider>
    @for (int i = 0; i < _amountOfRows; i++)
    {
        <MudHidden Breakpoint="Breakpoint.Xl" Invert="true">
            <MudCard Class="pa-5">
                <MudText>XL</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.Lg" Invert="true">
            <MudCard Class="pa-5">
                <MudText>LG</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.Md" Invert="true">
            <MudCard Class="pa-5">
                <MudText>MD</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.Sm" Invert="true">
            <MudCard Class="pa-5">
                <MudText>SM</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.Xs" Invert="true">
            <MudCard Class="pa-5">
                <MudText>XS</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.LgAndUp" Invert="true">
            <MudCard Class="pa-5">
                <MudText>LG and Up</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.MdAndUp" Invert="true">
            <MudCard Class="pa-5">
                <MudText>MD and Up</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.SmAndUp" Invert="true">
            <MudCard Class="pa-5">
                <MudText>SM and Up</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.LgAndDown" Invert="true">
            <MudCard Class="pa-5">
                <MudText>LG and Down</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.MdAndDown" Invert="true">
            <MudCard Class="pa-5">
                <MudText>MD and Down</MudText>
            </MudCard>
        </MudHidden>
        <MudHidden Breakpoint="Breakpoint.SmAndDown" Invert="true">
            <MudCard Class="pa-5">
                <MudText>SM and Down</MudText>
            </MudCard>
        </MudHidden>
    }
</MudBreakpointProvider>

<MudSlider @bind-Value="_amountOfRows" Min="1" Max="100"></MudSlider>
<MudText>Rows: @_amountOfRows</MudText>

@code {
    private int _amountOfRows = 2;
}
```

The IBrowserViewportService is the service that powers the MudBreakpoint Provider. It can be used in own components

```razor title="BreakpointListenerExample"
@using MudBlazor.Services

@implements IBrowserViewportObserver
@implements IAsyncDisposable

<MudCard Class="pa-5">
    <MudText>Size started with @_start</MudText>
    @if (_breakpointHistory.Count > 0)
    {
        <MudText>And continued with: </MudText>
        <MudList T="string" Dense="_breakpointHistory.Count > 10">
            @foreach (var item in _breakpointHistory)
            {
                <MudListItem Text="@item.ToString()"></MudListItem>
            }
        </MudList>
    }
</MudCard>

@code
{
    [Inject]
    private IBrowserViewportService BrowserViewportService { get; set; }

    private List<Breakpoint> _breakpointHistory = new();
    private Breakpoint _start;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await BrowserViewportService.SubscribeAsync(this, fireImmediately: true);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public async ValueTask DisposeAsync() => await BrowserViewportService.UnsubscribeAsync(this);

    Guid IBrowserViewportObserver.Id { get; } = Guid.NewGuid();

    ResizeOptions IBrowserViewportObserver.ResizeOptions { get; } = new()
    {
        ReportRate = 250,
        NotifyOnBreakpointOnly = true
    };

    Task IBrowserViewportObserver.NotifyBrowserViewportChangeAsync(BrowserViewportEventArgs browserViewportEventArgs)
    {
        if (browserViewportEventArgs.IsImmediate)
        {
            _start = browserViewportEventArgs.Breakpoint;
        }
        else
        {
            _breakpointHistory.Add(browserViewportEventArgs.Breakpoint);
        }

        return InvokeAsync(StateHasChanged);
    }
}
```
