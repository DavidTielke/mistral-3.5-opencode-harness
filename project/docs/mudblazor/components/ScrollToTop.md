# ScrollToTop

If your website follows a normal flow and you have not limited the body or html height, you will not need to do anything to configure it, and the component will behave like the one you've probably already noticed on our website. If you put it at the layout level, it will run on all the pages of your site.

```razor title="DefaultScrollToTopExample"
<MudScrollToTop>
    <MudFab Color="Color.Tertiary" StartIcon="@Icons.Material.Filled.ArrowCircleUp" />
</MudScrollToTop>
```

If the element you want to scroll is not the root element, you can specify it with the `Selector` property. In this example, we are going to scroll in the container marked with the selector `#unique_id_scroll_section`. Notice how the button that appears at the bottom right of this container changes its color when you scroll.

```razor title="ScrollToTopExample"
<div id="unique_id_scroll_section" class="ma-0" style="height:300px;overflow: auto;">
    <MudPaper Elevation="0" Height="3500px" Class="d-flex flex-column justify-space-between py-6">
        <MudText Typo="Typo.h3" Align="Align.Center">Scroll inside this container</MudText>
        <MudText Typo="Typo.h3" Align="Align.Center">Some initial long text</MudText>
        <MudText Typo="Typo.h3" Align="Align.Center">Middle text</MudText>
        <MudText Typo="Typo.h3" Align="Align.Center">Bottom text</MudText>
        <MudScrollToTop TopOffset="100"
                        OnScroll="OnScroll"
                        Selector="#unique_id_scroll_section"
                        VisibleCssClass="visible absolute"
                        HiddenCssClass="invisible">
            <MudButton Variant="Variant.Filled" StartIcon="@Icons.Material.Filled.ArrowUpward" Color="Color">Go to top</MudButton>
        </MudScrollToTop>
    </MudPaper>
</div>

@code{
    Color Color = Color.Success;
    private void OnScroll(ScrollEventArgs e)
    {
        Color = (e.FirstChildBoundingClientRect.Top*-1) switch
        {
            var x when x<  500 => Color.Primary,
            var x when x < 1500 => Color.Secondary,
            var x when x < 2500 => Color.Tertiary,
            _=>Color.Error
        };
    }
}
```

In the example above, we have used a MudButton as a trigger for the back-to-top action, but we could have used pretty much anything. The root element of the component is just a transparent span element that allows you to use anything inside. In the next example, we show you how to use a custom button with custom transitions to show and hide.

```razor title="CustomScrollToTopExample"
<div id="another_unique_identifier" class="ma-0" style="height:300px;overflow: auto;">
    <MudPaper Elevation="0" Height="3500px" Class="d-flex flex-column justify-space-between py-6">
        <MudText Typo="Typo.h3" Align="Align.Center">Scroll inside this container</MudText>
        <MudText Typo="Typo.h3" Align="Align.Center">Some initial long text</MudText>
        <MudText Typo="Typo.h3" Align="Align.Center">Middle text</MudText>
        <MudText Typo="Typo.h3" Align="Align.Center">Bottom text</MudText>
        <MudScrollToTop TopOffset="100" 
                        Selector="#another_unique_identifier"
                        VisibleCssClass="visible absolute"
                        HiddenCssClass="hidden absolute">
            <div class="mud-theme-secondary px-3 py-6 mud-elevation-16 rounded-xl" style="bottom:20px;left:20px;">Scroll to top custom button</div>
        </MudScrollToTop>
    </MudPaper>
</div>
```
