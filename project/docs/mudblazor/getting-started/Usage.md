# Usage

Here's a quick example how to use MudBlazor. Try it out on your own.

This is literally all you need in your views to use MudBlazor components.

```razor title="BasicUsageExample"
<MudText Typo="Typo.h6">MudBlazor is @Text</MudText>
<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="ButtonOnClick">@ButtonText</MudButton>

@code {
    public string Text { get; set; } = "????";
    public string ButtonText { get; set; } = "Click Me";
    public int ButtonClicked { get; set; }

    void ButtonOnClick()
    {
        ButtonClicked += 1;
        Text = $"Awesome x {ButtonClicked}";
        ButtonText = "Click Me Again";
    }
}
```

## Further examples

```razor title="RightClickDrawerExample"
<div @oncontextmenu="ClickForDrawer" @oncontextmenu:preventDefault class="d-flex align-center justify-center" style="height: calc(100vh - 64px); background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);">
    <MudDrawer @bind-Open="@drawerOpen" Anchor="@Anchor.Right" Elevation="1" Variant="@DrawerVariant.Temporary" Overlay="false">
        <MudDrawerHeader>
            <MudText Typo="Typo.h6">My Drawer</MudText>
        </MudDrawerHeader>
        <MudCard>
            <MudCardContent>
                <MudButton Color="Color.Primary" Variant="Variant.Outlined">New record</MudButton>
            </MudCardContent>
        </MudCard>
        <MudList T="string">
            <MudListSubheader>List</MudListSubheader>
            <MudListItem Text="Item 1"></MudListItem>
        </MudList>
    </MudDrawer>

    <MudText Class="white-text" Typo="Typo.h6">Right click to somewhere!</MudText>
</div>

@code{
    bool drawerOpen;

    private void ClickForDrawer(MouseEventArgs arg)
    {
        if (drawerOpen == false)
        {
            drawerOpen = true;
        }
        else
        {
            drawerOpen = false;
        }
    }
}
```
