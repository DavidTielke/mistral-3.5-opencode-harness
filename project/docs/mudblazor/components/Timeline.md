# Timeline

Basic timeline, displaying its `TimelineItem` vertically.

```razor title="TimelineBasicExample"
<MudTimeline>
    <MudTimelineItem>
        <MudText>Item A</MudText>
    </MudTimelineItem>
    <MudTimelineItem>
        <MudText Align="Align.End">Item B</MudText>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Primary">
        <MudText>Item C</MudText>
    </MudTimelineItem>
</MudTimeline>
```

The dot of each `TimelineItem` can be changed individually. And can contain conent, like icons and avatars.

```razor title="TimelineDotsExample"
<MudGrid>
    <MudItem xs="12" md="8" Class="my-auto">
        <MudTimeline Reverse="true">
            <MudTimelineItem>
                <MudText Align="Align.End">Static dot</MudText>
            </MudTimelineItem>
            <MudTimelineItem Color="@DotColor" Size="@DotSize" Variant="@DotVariant" Elevation="@DotElevation" HideDot="@HideDot">
                <ItemDot>
                    @if(DotConfig == 1)
                    {
                        <MudIcon Size="@DotSize" Icon="@Icons.Custom.Brands.MudBlazor"/>
                    }
                    else if(DotConfig == 2)
                    {
                        <MudAvatar Size="@DotSize">
                            <MudImage Src="images/mony.jpg" />
                        </MudAvatar>
                    }
                </ItemDot>
            </MudTimelineItem>
            <MudTimelineItem>
                <MudText Align="Align.End">Static dot</MudText>
            </MudTimelineItem>
        </MudTimeline>
    </MudItem>
    <MudItem xs="12" md="4">
        <MudPaper Class="pa-4" Elevation="0">
            <MudText Typo="Typo.h6">Dot Options</MudText>
            <MudSelect Label="Color" Dense="true" Margin="Margin.Dense" @bind-Value="DotColor" Class="mt-4">
                <MudSelectItem T="Color" Value="Color.Default">Default</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Primary">Primary</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Secondary">Secondary</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Tertiary">Tertiary</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Info">Info</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Success">Success</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Warning">Warning</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Error">Error</MudSelectItem>
                <MudSelectItem T="Color" Value="Color.Dark">Dark</MudSelectItem>
            </MudSelect>
            <MudSelect Label="Size" Dense="true" Margin="Margin.Dense" @bind-Value="DotSize" Class="mt-4">
                <MudSelectItem T="Size" Value="Size.Small">Small</MudSelectItem>
                <MudSelectItem T="Size" Value="Size.Medium">Medium</MudSelectItem>
                <MudSelectItem T="Size" Value="Size.Large">Large</MudSelectItem>
            </MudSelect>
            <MudSelect Label="Variant" Dense="true" Margin="Margin.Dense" @bind-Value="DotVariant" Class="mt-4">
                <MudSelectItem T="Variant" Value="Variant.Outlined">Outlined</MudSelectItem>
                <MudSelectItem T="Variant" Value="Variant.Filled">Filled</MudSelectItem>
            </MudSelect>
            <MudSlider @bind-Value="DotElevation" Step="1" Min="0" Max="25" Class="mt-2">Dot Elevation</MudSlider>
            <MudRadioGroup T="int" ValueChanged="DotConfigChanged">
                <MudRadio Value="0" Color="Color.Primary">Default</MudRadio>
                <MudRadio Value="1" Color="Color.Secondary">Icon</MudRadio>
                <MudRadio Value="2" Color="Color.Tertiary">Avatar</MudRadio>
                <MudRadio Value="3" Color="Color.Default">Hide</MudRadio>
            </MudRadioGroup>
        </MudPaper>
    </MudItem>
</MudGrid>


@code{
    public Size DotSize { get; set; } = Size.Medium;
    public Color DotColor { get; set; } = Color.Primary;
    public Variant DotVariant { get; set; } = Variant.Outlined;
    public int DotElevation { get; set; } = 1;
    public bool HideDot { get; set; }
    public int DotConfig;

    void DotConfigChanged(int value)
    {
        switch(value)
        {
            case 3:
                DotConfig = value;
                HideDot = true;
                break;
            default:
                DotConfig = value;
                HideDot = false;
                break;
        }
    }
}
```

Set the `Icon` property on a `TimelineItem` to display an icon inside its dot. For full control, use the `ItemDot` render fragment instead, which takes precedence over `Icon`.

```razor title="TimelineDotIconExample"
<MudTimeline>
    <MudTimelineItem Icon="@Icons.Material.Filled.Rocket" Color="Color.Primary" Variant="Variant.Filled" Size="Size.Large">
        <MudText>Kickoff</MudText>
    </MudTimelineItem>
    <MudTimelineItem Icon="@Icons.Material.Filled.Code" Color="Color.Info" Variant="Variant.Filled" Size="Size.Large">
        <MudText Align="Align.End">Development</MudText>
    </MudTimelineItem>
    <MudTimelineItem Icon="@Icons.Material.Filled.BugReport" Color="Color.Warning" Variant="Variant.Filled" Size="Size.Large">
        <MudText>Testing</MudText>
    </MudTimelineItem>
    <MudTimelineItem Icon="@Icons.Material.Filled.Verified" Color="Color.Success" Variant="Variant.Filled" Size="Size.Large">
        <MudText Align="Align.End">Release</MudText>
    </MudTimelineItem>
</MudTimeline>
```

The style of each `TimelineItem` dot can be set individually using the `DotClass` attribute with CSS classes.

```razor title="TimelineDotsStyleExample"
<style>
    .timeline-red-dot {
        background-color: var(--mud-palette-error);
    }
</style>

<MudItem>
    <MudTimeline Reverse="true">
        <MudTimelineItem>
            <MudText Align="Align.End">Static dot</MudText>
        </MudTimelineItem>
        <MudTimelineItem DotClass="timeline-red-dot">
            <MudText Align="Align.End">Red dot</MudText>
        </MudTimelineItem>
        <MudTimelineItem>
            <MudText Align="Align.End">Static dot</MudText>
        </MudTimelineItem>
    </MudTimeline>
</MudItem>
```

`TimelineOrientation` can determine which direction the timeline should go, and `TimelinePosition` sets the lines position.

```razor title="TimelineOrientationPositionExample"
<MudGrid>
    <MudItem xs="12" sm="5">
        <MudSelect T="TimelineOrientation" ValueChanged="OnOrientationChange" Label="TimelineOrientation" Dense="true" Variant="Variant.Outlined">
            <MudSelectItem T="TimelineOrientation" Value="TimelineOrientation.Vertical">Vertical</MudSelectItem>
            <MudSelectItem T="TimelineOrientation" Value="TimelineOrientation.Horizontal">Horizontal</MudSelectItem>
        </MudSelect>
    </MudItem>
    <MudItem xs="12" sm="5">
        <MudSelect T="TimelinePosition" @bind-Value="_position" Label="TimelinePosition" Dense="true" Variant="Variant.Outlined">
            @if(_orientation == TimelineOrientation.Vertical)
            {
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.Start">Start</MudSelectItem>
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.Left">Left</MudSelectItem>
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.Alternate">Alternate</MudSelectItem>
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.Right">Right</MudSelectItem>
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.End">End</MudSelectItem>
            }
            else if(_orientation == TimelineOrientation.Horizontal)
            {
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.Top">Top</MudSelectItem>
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.Alternate">Alternate</MudSelectItem>
                <MudSelectItem T="TimelinePosition" Value="TimelinePosition.Bottom">Bottom</MudSelectItem>
            }
        </MudSelect>
    </MudItem>
    <MudItem xs="12" sm="2">
        <MudSwitch Label="Reverse" @bind-Value="_reverse" Disabled="IsSwitchDisabled()" Color="Color.Primary" />
    </MudItem>
</MudGrid>

<MudTimeline TimelineOrientation="_orientation" TimelinePosition="_position" Reverse="_reverse">
    <MudTimelineItem Color="Color.Success" Variant="Variant.Filled">
        <ItemContent>
            <MudAlert Severity="Severity.Success">The reactor is running at optimum temperature</MudAlert>
        </ItemContent>
        <ItemOpposite>
            <MudText Color="Color.Success">13:37</MudText>
        </ItemOpposite>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Warning" Variant="Variant.Filled">
        <ItemContent>
            <MudAlert Severity="Severity.Warning">The reactor temperature exceeds the optimal range</MudAlert>
        </ItemContent>
        <ItemOpposite>
            <MudText Color="Color.Warning">14:08</MudText>
        </ItemOpposite>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Error" Variant="Variant.Filled">
        <ItemContent>
            <MudAlert Severity="Severity.Error">Meltdown is imminent</MudAlert>
        </ItemContent>
        <ItemOpposite>
            <MudText Color="Color.Error">15:00</MudText>
        </ItemOpposite>
    </MudTimelineItem>
</MudTimeline>


@code {
    private TimelinePosition _position { get; set; } = TimelinePosition.Start;
    private TimelineOrientation _orientation { get; set; } = TimelineOrientation.Vertical;
    private bool _reverse { get; set; }

    private void OnOrientationChange(TimelineOrientation value)
    {
        _orientation = value;
        switch (value)
        {
            case TimelineOrientation.Vertical:
                if (_position is TimelinePosition.Top or TimelinePosition.Bottom)
                    _position = TimelinePosition.Start;
                break;
            case TimelineOrientation.Horizontal:
                if (_position is TimelinePosition.Start or TimelinePosition.Left or TimelinePosition.Right or TimelinePosition.End)
                    _position = TimelinePosition.Top;
                break;
        }
    }

    bool IsSwitchDisabled()
    {
        if (_position == TimelinePosition.Alternate)
            return false;
        else
            _reverse = false;
        return true;
    }
}
```

Using `ItemOpposite` renderfragment allows for content to be displayed on both sides. Note that opposite content only is displayed in alternate mode for both vertical and horizontal timelines.

```razor title="TimelineOppositeExample"
<MudTimeline>
    <MudTimelineItem Color="Color.Info" Size="Size.Small">
        <ItemOpposite>
            <MudText Color="Color.Info" Typo="Typo.h5">1970</MudText>
        </ItemOpposite>
        <ItemContent>
            <MudText Color="Color.Info" Typo="Typo.h6" GutterBottom="true">Atom Towns</MudText>
            <MudText>Construction of the town of Pripyat, one of 9 “atom towns” begins, to be inhabited by future employees of the nuclear power plants.</MudText>
        </ItemContent>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Success" Size="Size.Small">
        <ItemOpposite>
            <MudText Color="Color.Success" Typo="Typo.h5">1977</MudText>
        </ItemOpposite>
        <ItemContent>
            <MudText Color="Color.Success" Typo="Typo.h6" GutterBottom="true">Operational</MudText>
            <MudText>The first of the Chernobyl Nuclear Power Plants four reactors is ready to operate followed by number 2 in 1978.</MudText>
        </ItemContent>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Error" Size="Size.Small">
        <ItemOpposite>
            <MudText Color="Color.Error" Typo="Typo.h5">1979</MudText>
        </ItemOpposite>
        <ItemContent>
            <MudText Color="Color.Error" Typo="Typo.h6" GutterBottom="true">Pripyat</MudText>
            <MudText>Pripyat officially proclaimed as a city.<br />The Chernobyl Atomic Power Station reaches its first 10 billion kilowatt-hours of electical output.</MudText>
        </ItemContent>
    </MudTimelineItem>
</MudTimeline>
```

Timeline items have item modifiers that append to its content. Modifiers can be turned off with `Modifiers="false"`.
If you place a `MudCard` inside the `TimelineItem` a caret will be added to the side of the card.

```razor title="TimelineItemModifiersExample"
<MudSwitch @bind-Value="Outlined" Label="Outlined Card" Color="Color.Primary" />
<MudSwitch @bind-Value="Modifiers" Label="Modifiers" Color="Color.Secondary" />

<MudTimeline TimelinePosition="TimelinePosition.Start" Modifiers="@Modifiers">
    <MudTimelineItem Size="Size.Medium" Color="Color.Info" Elevation="@(Outlined ? 0 : 25)">
        <MudCard Outlined="@Outlined" Elevation="25">
            <MudCardContent>
                <MudText Typo="Typo.h6">Kopparberg</MudText>
                <MudText Typo="Typo.body2">Kopparberg is a locality and the seat of Ljusnarsberg, Örebro County, Sweden, with 4,200 inhabitants in 2015.</MudText>
                <MudText Typo="Typo.body2">It is famous for Kopparberg Cider, now one of the best selling ciders in the UK and worldwide.</MudText>
            </MudCardContent>
        </MudCard>
    </MudTimelineItem>
</MudTimeline>

@code{
    public bool Modifiers { get; set; } = true;
    public bool Outlined { get; set; }
}
```

By setting the `TimelineAlign` on individual `TimelineItems` you can specify what side the item should be on when `Alternate` position is being used.

```razor title="TimelineItemAlignExample"
<MudTimeline>
    <MudTimelineItem Color="Color.Info">
        <MudText Typo="Typo.button">Packaging Process Started</MudText>
        <MudText Typo="Typo.body2" Class="mud-text-secondary">Yesterday: 16:33</MudText>
    </MudTimelineItem>
    <MudTimelineItem TimelineAlign="TimelineAlign.End">
        <MudText Typo="Typo.body2">Packaging complete</MudText>
        <MudText Typo="Typo.body2" Class="mud-text-secondary">Yesterday: 17:10</MudText>
    </MudTimelineItem>
    <MudTimelineItem TimelineAlign="TimelineAlign.End">
        <MudText Typo="Typo.body2">Waiting for pickup</MudText>
        <MudText Typo="Typo.body2" Class="mud-text-secondary">Yesterday: 17:15</MudText>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Error">
        <MudAlert Severity="Severity.Error">Package missed last pickup time.</MudAlert>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Success">
        <MudText Typo="Typo.button">Package picked up by driver</MudText>
        <MudText Typo="Typo.body2" Class="mud-text-secondary">Today: 17:00</MudText>
    </MudTimelineItem>
    <MudTimelineItem TimelineAlign="TimelineAlign.End">
        <MudText Typo="Typo.button">Package In Transit</MudText>
    </MudTimelineItem>
</MudTimeline>
```

You can set from which direction the dots should start from by changing the `TimelineAlign` on the `Timeline` component itself.

```razor title="TimelineAlignExample"
<MudSelect T="TimelineAlign" @bind-Value="_timelineAlign" Label="Timeline Align" Dense="true" Variant="Variant.Outlined">
    <MudSelectItem T="TimelineAlign" Value="TimelineAlign.Start">Start</MudSelectItem>
    <MudSelectItem T="TimelineAlign" Value="TimelineAlign.Default">Default</MudSelectItem>
    <MudSelectItem T="TimelineAlign" Value="TimelineAlign.End">End</MudSelectItem>
</MudSelect>

<MudTimeline TimelineAlign="_timelineAlign">
    <MudTimelineItem Color="Color.Dark" Elevation="25">
        <ItemOpposite>
            <MudText Color="Color.Dark" Typo="Typo.h6">Aug 2020</MudText>
        </ItemOpposite>
        <ItemContent>
            <MudPaper Elevation="0" Class="mt-n1">
                <MudText Color="Color.Dark" Typo="Typo.h6" GutterBottom="true">MudBlazor Emerges</MudText>
                <MudText Typo="Typo.body2">A repository pops up on GitHub named MudBlazor.</MudText>
                <MudText Typo="Typo.body2">The development has already started and the most common components can be found already.</MudText>
            </MudPaper>
        </ItemContent>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Primary" Elevation="25" TimelineAlign="TimelineAlign.End">
        <ItemOpposite>
            <MudText Color="Color.Primary" Typo="Typo.h6">Oct 2020</MudText>
        </ItemOpposite>
        <ItemContent>
            <MudPaper Elevation="0" Class="mt-n1">
                <MudText Color="Color.Primary" Typo="Typo.h6" GutterBottom="true">MudBlazor Unleashed!</MudText>
                <MudText Typo="Typo.body2">The first version is released and uploaded as v1.0.7.</MudText>
            </MudPaper>
        </ItemContent>
    </MudTimelineItem>
    <MudTimelineItem Color="Color.Secondary" Elevation="25">
        <ItemOpposite>
            <MudText Color="Color.Secondary" Typo="Typo.h6" GutterBottom="true">Nov 2020</MudText>
        </ItemOpposite>
        <ItemContent>
            <MudPaper Elevation="0" Class="mt-n1">
                <MudText Color="Color.Secondary" Typo="Typo.h6" GutterBottom="true">First Minor</MudText>
                <MudText Typo="Typo.body2">MudBlazor gets its first minor with version 1.1.0.</MudText>
                <MudText Typo="Typo.body2">TimerPicker, AutoComplete and Charts join the library as well as T versions of our inputs and selects.</MudText>
            </MudPaper>
        </ItemContent>
    </MudTimelineItem>
</MudTimeline>

@code{
    private TimelineAlign _timelineAlign { get; set; } = TimelineAlign.Start;
}
```
