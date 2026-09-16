# Rating

```razor title="BasicRatingExample"
<MudRating SelectedValue="2" />
```

A disabled component cannot change its state. Use the `Disabled` parameter to disable a component.

```razor title="RatingDisabledExample"
<MudRating Disabled="true" SelectedValue="2" />
```

A read-only component doesn't allow interactions. Use the `ReadOnly` parameter to mark a component as read-only.

```razor title="RatingReadonlyExample"
<MudRating ReadOnly="true" SelectedValue="2" />
```

```razor title="RatingSizesExample"
<div class="d-flex flex-column align-center">
    <MudRating SelectedValue="2" Size="Size.Small" />
    <MudRating SelectedValue="2" Size="Size.Medium" />
    <MudRating SelectedValue="2" Size="Size.Large" />
</div>
```

```razor title="RatingMaxValueExample"
<div class="d-flex flex-column align-center">
    <MudRating SelectedValue="1" MaxValue="3" />
    <MudRating SelectedValue="2" />
    <MudRating SelectedValue="3" MaxValue="10" />
</div>
```

Icons and colors can be set separately for Empty and Full icons. Icons can be set using `FullIcon` and `EmptyIcon` properties, while Color can be set using `Color` attribute for both icons, or separately for full/empty icons using `FullIconColor` and `EmptyIconColor` properties. If one of those is not set, the component will use the value set in `Color` property for both empty and full.

```razor title="RatingIconsAndColorExample"
<div class="d-flex flex-column align-center">
    <MudRating SelectedValue="2" FullIcon="@Icons.Material.Filled.Visibility" EmptyIcon="@Icons.Material.Filled.VisibilityOff" />
    <MudRating SelectedValue="2" FullIcon="@Icons.Material.Filled.Favorite" EmptyIcon="@Icons.Material.Filled.FavoriteBorder" Color="Color.Secondary" />
    <MudRating SelectedValue="2" FullIcon="@Icons.Material.Filled.Square" EmptyIcon="@Icons.Material.Filled.Square" FullIconColor="Color.Primary" EmptyIconColor="Color.Tertiary" />
</div>
```

The `MudRating` component provides value binding and events for changed selected value or hover. E.g you can display a label on hover to help users pick the correct rating value, using parameters like `HoveredValueChanged`, `SelectedValueChanged` and `bind-SelectedValue`.

```razor title="RatingBindingsExample"
<div class="d-flex flex-column align-center">
    <MudRating @bind-SelectedValue="selectedVal" HoveredValueChanged="HandleHoveredValueChanged" />
    <MudText Typo="Typo.subtitle2" Class="deep-purple-text mt-2">@LabelText</MudText>
</div>


@code {
    private int selectedVal = 0;
    private int? activeVal;

    private void HandleHoveredValueChanged(int? val) => activeVal = val;

    private string LabelText => (activeVal ?? selectedVal) switch
    {
        1 => "Very bad",
        2 => "Bad",
        3 => "Sufficient",
        4 => "Good",
        5 => "Awesome!",
        _ => "Rate our product!"
    };
}
```

A `MudRating` accepts the following shortcuts:

 Keys
 Action

 `ArrowLeft`
 
 Decrease rating by 1

 `ArrowRight`
 
 Increase rating by 1

 `Shift+ArrowLeft`
 
 Set rating to 0

 `Shift+ArrowRight`
 
 Set rating to max value

 Note: `@nameof(MudRating.Disabled)` and `@nameof(MudRating.ReadOnly)` ratings are unaffected by these shortcuts

```razor title="RatingKeyboardNavigationExample"
<div class="d-flex flex-column align-center">
    <MudRating SelectedValue="2" />
    <MudRating SelectedValue="3" MaxValue="10" />
</div>
```
