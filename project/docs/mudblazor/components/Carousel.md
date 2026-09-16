# Carousel

Default implementation.

```razor title="CarouselExample"
<MudCarousel Class="mud-width-full" Style="height:200px;" ShowArrows="@arrows" ShowBullets="@bullets" EnableSwipeGesture="@enableSwipeGesture" AutoCycle="@autocycle" TData="object">
    <MudCarouselItem Transition="transition" Color="@Color.Primary">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Transition="transition" Color="@Color.Secondary">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Transition="transition">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Color="@Color.Primary" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
</MudCarousel>
<MudSelect @bind-Value="transition" Label="Transition" Class="ma-2">
    <MudSelectItem Value="@Transition.Fade">Fade</MudSelectItem>
    <MudSelectItem Value="@Transition.Slide">Slide</MudSelectItem>
    <MudSelectItem Value="@Transition.None">None</MudSelectItem>
</MudSelect>
<MudSwitch @bind-Value="arrows" Color="Color.Primary">Show Arrows</MudSwitch>
<MudSwitch @bind-Value="bullets" Color="Color.Primary">Show Bullets</MudSwitch>
<MudSwitch @bind-Value="enableSwipeGesture" Color="Color.Primary">Enable Swipe Gesture</MudSwitch>
<MudSwitch @bind-Value="autocycle" Color="Color.Primary">Auto Cycle (Default: 5 secs)</MudSwitch>

@code{ 
    private bool arrows = true;
    private bool bullets = true;
    private bool enableSwipeGesture = true;
    private bool autocycle = true;
    private Transition transition = Transition.Slide;
}
```

You can One-Way Bind any IEnumerable list to the `ItemsSource` attribute, and use a template to show the data.

 You can also Two-Way Bind the `SelectedIndex` to read or write the current position.

```razor title="CarouselBindingExample"
<MudCarousel Class="mud-width-full" @ref="_carousel" ItemsSource="@_source" @bind-SelectedIndex="selectedIndex" Style="height:200px;" ShowArrows="@_arrows" ShowBullets="@_bullets" EnableSwipeGesture="@_enableSwipeGesture" AutoCycle="@_autocycle">
    <ItemTemplate>
        <div class="d-flex flex-column flex-column justify-center" style="height:100%">
            <MudIcon Class="mx-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
            <MudText Align="@Align.Center" Class="mx-auto">@context</MudText>
        </div>
    </ItemTemplate>
</MudCarousel>
<MudSwitch @bind-Value="_arrows" Color="Color.Primary">Show Arrows</MudSwitch>
<MudSwitch @bind-Value="_bullets" Color="Color.Primary">Show Bullets</MudSwitch>
<MudSwitch @bind-Value="_enableSwipeGesture" Color="Color.Primary">Enable Swap Gesture</MudSwitch>
<MudSwitch @bind-Value="_autocycle" Color="Color.Primary">Auto Cycle (Default: 5 secs)</MudSwitch>
<br />
<MudButton Class="ma-2" Variant="Variant.Filled" Color="Color.Primary" OnClick="AddAsync">Add</MudButton>
<MudButton Class="ma-2" Variant="Variant.Filled" Color="Color.Error" OnClick="@(async () => await DeleteAsync(_carousel.SelectedIndex))">Delete</MudButton>
<MudSelect @bind-Value="selectedIndex" Label="@($"Selected Item (index: {selectedIndex})")">
    @{
        int index = 0;
        foreach (var item in _source)
        {
            <MudSelectItem Value="@index">@item</MudSelectItem>

            index++;
        }
    }
</MudSelect>
@code {
    private MudCarousel<string> _carousel;
    private bool _arrows = true;
    private bool _bullets = true;
    private bool _enableSwipeGesture = true;
    private bool _autocycle = true;
    private IList<string> _source = new List<string>() { "Item 1", "Item 2", "Item 3", "Item 4", "Item 5" };
    private int selectedIndex = 2;

    private async Task AddAsync()
    {
        _source.Add($"Item {_source.Count + 1}");
        await Task.Delay(1);
        _carousel.MoveTo(_source.Count - 1);
    }

    private async Task DeleteAsync(int index)
    {
        if (_source.Any())
        {
            _source.RemoveAt(index);
            await Task.Delay(1);
            _carousel.MoveTo(System.Math.Max(System.Math.Min(index, _source.Count - 1), 0));
        }
    }
}
```

You can use your own classes for items transition.

```razor title="CarouselCustomTransitionExample"
@*Keyframes by https://animate.style/*@
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
<style type="text/css">

    .bounceIn {
        opacity: 0;
        animation-delay: 0.5s;
        animation-duration: 0.5s;
        animation-name: bounceIn;
        animation-fill-mode: forwards;
    }

    .bounceOut {
        animation-duration: 0.5s;
        animation-name: bounceOut;
        animation-fill-mode: forwards;
    }

    .backInDown {
        opacity: 0;
        animation-delay: 0.5s;
        animation-duration: 0.5s;
        animation-name: backInDown;
        animation-fill-mode: forwards;
    }

    .backOutDown {
        animation-duration: 0.5s;
        animation-name: backOutDown;
        animation-fill-mode: forwards;
    }

    .rotateIn {
        opacity: 0;
        animation-delay: 0.5s;
        animation-duration: 0.5s;
        animation-name: rotateIn;
        animation-fill-mode: forwards;
    }

    .rotateOut {
        animation-duration: 0.5s;
        animation-name: rotateOut;
        animation-fill-mode: forwards;
    }

</style>

<MudCarousel Class="mud-width-full" Style="height:200px;" TData="object" AutoCycle="false">
    <MudCarouselItem Color="@Color.Primary" Transition="Transition.Custom" CustomTransitionEnter="@AnimationEntrance" CustomTransitionExit="@AnimationExit">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Color="@Color.Secondary" Transition="Transition.Custom" CustomTransitionEnter="@AnimationEntrance" CustomTransitionExit="@AnimationExit">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Transition="Transition.Custom" CustomTransitionEnter="@AnimationEntrance" CustomTransitionExit="@AnimationExit">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Color="@Color.Primary" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
</MudCarousel>

<MudTextField @bind-Value="AnimationEntrance" Label="Entrance Class (copy and paste from style tag)" Class="ma-2" />
<MudTextField @bind-Value="AnimationExit" Label="Exit Class (copy and paste from style tag)" Class="ma-2"/>

@code{ 
    private string AnimationEntrance = "bounceIn";
    private string AnimationExit = "bounceOut"; 
}
```

Transitions are set per page.

```razor title="CarouselPerPageTransitionExample"
@*Keyframes by https://animate.style/*@
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
<style type="text/css">

    .bounceIn {
        opacity: 0;
        animation-delay: 0.5s;
        animation-duration: 0.5s;
        animation-name: bounceIn;
        animation-fill-mode: forwards;
    }

    .bounceOut {
        animation-duration: 0.5s;
        animation-name: bounceOut;
        animation-fill-mode: forwards;
    }

    .backInDown {
        opacity: 0;
        animation-delay: 0.5s;
        animation-duration: 0.5s;
        animation-name: backInDown;
        animation-fill-mode: forwards;
    }

    .backOutDown {
        animation-duration: 0.5s;
        animation-name: backOutDown;
        animation-fill-mode: forwards;
    }

    .rotateIn {
        opacity: 0;
        animation-delay: 0.5s;
        animation-duration: 0.5s;
        animation-name: rotateIn;
        animation-fill-mode: forwards;
    }

    .rotateOut {
        animation-duration: 0.5s;
        animation-name: rotateOut;
        animation-fill-mode: forwards;
    }
</style>

<MudCarousel Class="mud-width-full" Style="height:200px;" TData="object" AutoCycle="false">
    <MudCarouselItem Color="@Color.Primary" Transition="Transition.Slide">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Color="@Color.Secondary" Transition="Transition.Fade">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Color="@Color.Tertiary" Transition="Transition.Custom" CustomTransitionEnter="bounceIn" CustomTransitionExit="bounceOut">
        <div class="d-flex" style="height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Transition="Transition.Custom" CustomTransitionEnter="backInDown" CustomTransitionExit="backOutDown">
        <div class="d-flex" style="background-color:lightgray; height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Color="@Color.Primary" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
    <MudCarouselItem Transition="Transition.Custom" CustomTransitionEnter="rotateIn" CustomTransitionExit="rotateOut">
        <div class="d-flex" style="background-color:lightgray; height:100%">
            <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Color="@Color.Secondary" Size="@Size.Large" />
        </div>
    </MudCarouselItem>
</MudCarousel>
```

Custom arrows or bullets templates:

```razor title="CarouselTemplatesExample"
<MudCarousel Class="mud-width-full" Style="height:200px;" AutoCycle="false" TData="object">
    <BulletTemplate Context="selected">
        <div Class="mud-button-root mud-icon-button mud-icon-button-color-inherit mud-ripple mud-ripple-icon">
            <span class="mud-icon-button-label">
                <MudIcon Icon="@(selected ? Icons.Material.Filled.CheckCircle : Icons.Material.Filled.Circle)" Color="@Color.Inherit" />
            </span>
        </div>
    </BulletTemplate>
    <PreviousButtonTemplate>
        <div Class="mud-button-root mud-icon-button mud-icon-button-color-inherit mud-ripple mud-ripple-icon">
            <span class="mud-icon-button-label">
                <MudIcon Class="mud-ripple mud-ripple-icon mud-icon-button-size-medium" Icon="@Icons.Material.Filled.SkipPrevious" Color="@Color.Inherit" />
            </span>
        </div>
    </PreviousButtonTemplate>
    <NextButtonTemplate>
        <div Class="mud-button-root mud-icon-button mud-icon-button-color-inherit mud-ripple mud-ripple-icon">
            <span class="mud-icon-button-label">
                <MudIcon Class="mud-ripple mud-ripple-icon mud-icon-button-size-medium" Icon="@Icons.Material.Filled.SkipNext" Color="@Color.Inherit" />
            </span>
        </div>
    </NextButtonTemplate>
    <ChildContent>
        <MudCarouselItem Color="@Color.Primary">
            <div class="d-flex" style="height:100%">
                <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
            </div>
        </MudCarouselItem>
        <MudCarouselItem Color="@Color.Secondary">
            <div class="d-flex" style="height:100%">
                <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Size="@Size.Large" />
            </div>
        </MudCarouselItem>
        <MudCarouselItem>
            <div class="d-flex" style="height:100%">
                <MudIcon Class="mx-auto my-auto" Icon="@Icons.Custom.Brands.MudBlazor" Color="@Color.Primary" Size="@Size.Large" />
            </div>
        </MudCarouselItem>
    </ChildContent>
</MudCarousel>
```
