# Hidden

The following example shows all breakpoint options only if they match the screen size. Because it is more intuitive for this example, we inverted all the breakpoints so that you can see them only if they match.

```razor title="HiddenExample"
@using MudBlazor.Services


<MudHidden Breakpoint="Breakpoint.Xxl" Invert="true">
    <MudCard Class="pa-5">
        <MudText>XXL</MudText>
    </MudCard>
</MudHidden>
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
<MudHidden Breakpoint="Breakpoint.XlAndUp" Invert="true">
    <MudCard Class="pa-5">
        <MudText>XL and Up</MudText>
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
<MudHidden Breakpoint="Breakpoint.XlAndDown" Invert="true">
    <MudCard Class="pa-5">
        <MudText>XL and Down</MudText>
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
```

Directly listening to the screen size change events is the most expensive way to adapt to a resizing browser window. Use this only if the other breakpoint methods don't work for you.

```razor title="BrowserResizeEventExample"
@using MudBlazor.Services

@implements IBrowserViewportObserver
@implements IAsyncDisposable

<MudCard Class="pa-5">
    <MudText>
        Resize the window and see width and height change:<br />
        Browser window is @(_width)x@(_height)px
    </MudText>
</MudCard>

@code
{
    [Inject]
    private IBrowserViewportService BrowserViewportService { get; set; }

    private int _width = 0;
    private int _height = 0;

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
        ReportRate = 50,
        NotifyOnBreakpointOnly = false
    };

    Task IBrowserViewportObserver.NotifyBrowserViewportChangeAsync(BrowserViewportEventArgs browserViewportEventArgs)
    {
        _width = browserViewportEventArgs.BrowserWindowSize.Width;
        _height = browserViewportEventArgs.BrowserWindowSize.Height;

        return InvokeAsync(StateHasChanged);
    }
}
```
