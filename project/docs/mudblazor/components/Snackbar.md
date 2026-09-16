# Snackbar

This is the simplest way of using the `Snackbar`. It provides the user with a brief floating message.

 It'll hide after some time unless the mouse is over it or it's the last thing touched on a touchscreen.

```razor title="SnackbarUsageExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" @onclick="@(() => Snackbar.Add("Simple Snackbar"))">
    Open snackbar
</MudButton>
```

`@nameof(MudBlazor.Snackbar)` messages can be rendered as HTML using `@nameof(MarkupString)`.

```razor title="SnackbarHtmlInMessageExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" @onclick="@(() => Snackbar.Add(new MarkupString($"<ul><li>Item {++count}</li><li>Item {++count}</li></ul>")))">
    Open Snackbar
</MudButton>

@code
{
    private int count = 0;
}
```

In addition to setting the `@nameof(MudBlazor.Snackbar)` message with a string, you can also use `@nameof(RenderFragment)` to
 create Snackbars with more complex content.

```razor title="SnackbarFromRenderFragmentExample"
@inject ISnackbar SnackbarService

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@OnClick">Show a RenderFragment snackbar</MudButton>

@code {
    private void OnClick()
    {
        SnackbarService.Add
        (
            @<div>
                <h3>Hi from a RenderFragment</h3>
                <ul>
                    <li>Here's a regular item</li>
                    <li>Here's a <strong>bold item</strong></li>
                    <li>Here's an <em>italicized item</em></li>
                </ul>
            </div>
        );
    }
}
```

You can also create messages containing a custom component. This example renders a message based on MudBlazor's
 `@nameof(MudChip)`, but you can use any component to define the content. Pass parameters to the component
 using the `componentParameters` argument.

```razor title="SnackbarFromCustomComponentExample"
@inject ISnackbar SnackbarService

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@OnClick">Show a snackbar with a custom component</MudButton>

@code {
    private void OnClick()
    {
        SnackbarService.Add<MudChip<T>>(new Dictionary<string, object>() {
            { "Text", "This is a snackbar with a chip!" },
            { "Color", Color.Primary }
        });
    }
}
```

By default, no `@nameof(SnackbarOptions.Severity)` property has to be passed and the snackbar uses the normal level.

 To change the snackbar into an alert snackbar, simply pass down the `@nameof(Severity)` enum after the message.

```razor title="SnackbarSeverityExample"
@inject ISnackbar Snackbar


<MudButton Color="Color.Dark" @onclick="@(() => Snackbar.Add("The reactor type is RBMK-1000", Severity.Normal))">Normal snackbar</MudButton>
<MudButton Color="Color.Info" @onclick="@(() => Snackbar.Add("The reactor was fired up successfully", Severity.Info))">Info snackbar</MudButton>
<MudButton Color="Color.Success" @onclick="@(() => Snackbar.Add("The reactor is running at optimum temperature", Severity.Success))">Success snackbar</MudButton>
<MudButton Color="Color.Warning" @onclick="@(() => Snackbar.Add("The reactor temperature exceeds the optimal range", Severity.Warning))">Warning snackbar</MudButton>
<MudButton Color="Color.Error" @onclick="@(() => Snackbar.Add("Reactor meltdown is imminent", Severity.Error))">Error snackbar</MudButton>
```

The Snackbar's default behavior can be changed in two ways, either globally when the service is registered or by passing down the `@nameof(SnackbarConfiguration)` class with the changes you want to make.

In `Program.cs`. See [installation page](/getting-started/installation) for more information regarding this.

This can be done in many ways, below is one of them and we will continue to use it further down on this page.

 Below, we pass along a modified configuration that differs from our globally-set `@nameof(SnackbarOptions.ShowCloseIcon)`. In this case, it's also the Snackbar's default value.

```razor title="SnackbarConfigurationExample"
@inject ISnackbar Snackbar

<MudButton @onclick="@(() => Snackbar.Add("My Close button is gone!", Severity.Normal, config => { config.ShowCloseIcon = false; }))" Variant="Variant.Filled" Color="Color.Primary">
    Open modified snackbar
</MudButton>
```

```razor title="SnackbarPositionExample"
@inject ISnackbar Snackbar

<MudButton @onclick="@(() => ChangePosition("Top-Start", Defaults.Classes.Position.TopStart))" Color="Color.Primary" >Top-Start</MudButton>
<MudButton @onclick="@(() => ChangePosition("Top-Left", Defaults.Classes.Position.TopLeft))" Color="Color.Primary" >Top-Left</MudButton>
<MudButton @onclick="@(() => ChangePosition("Top-Center", Defaults.Classes.Position.TopCenter))" Color="Color.Primary" >Top-Center</MudButton>
<MudButton @onclick="@(() => ChangePosition("Top-Right", Defaults.Classes.Position.TopRight))" Color="Color.Primary" >Top-Right</MudButton>
<MudButton @onclick="@(() => ChangePosition("Top-End", Defaults.Classes.Position.TopEnd))" Color="Color.Primary" >Top-End</MudButton>
<MudDivider />
<MudButton @onclick="@(() => ChangePosition("Bottom-Start", Defaults.Classes.Position.BottomStart))" Color="Color.Default" >Bottom-Start</MudButton>
<MudButton @onclick="@(() => ChangePosition("Bottom-Left", Defaults.Classes.Position.BottomLeft))" Color="Color.Default" >Bottom-Left</MudButton>
<MudButton @onclick="@(() => ChangePosition("Bottom-Center", Defaults.Classes.Position.BottomCenter))" Color="Color.Default" >Bottom-Center</MudButton>
<MudButton @onclick="@(() => ChangePosition("Bottom-Right", Defaults.Classes.Position.BottomRight))" Color="Color.Default" >Bottom-Right</MudButton>
<MudButton @onclick="@(() => ChangePosition("Bottom-End", Defaults.Classes.Position.BottomEnd))" Color="Color.Default" >Bottom-End</MudButton>

@code {
    void ChangePosition(string message, string position)
    {
        Snackbar.Clear();
        Snackbar.Configuration.PositionClass = position;
        Snackbar.Add(message, Severity.Normal);
    }
}
```

```razor title="SnackbarVariantsExample"
@inject ISnackbar Snackbar

<MudButton @onclick="@(() => ShowVariant("Text Snackbar", Variant.Text))" Color="Color.Primary">Open text snackbar variants</MudButton>
<MudButton @onclick="@(() => ShowVariant("Filled Snackbar", Variant.Filled))" Color="Color.Secondary">Open filled snackbar variants</MudButton>
<MudButton @onclick="@(() => ShowVariant("Outlined Snackbar", Variant.Outlined))" Color="Color.Tertiary">Open outlined snackbar variants</MudButton>

@code {
    void ShowVariant(string message, Variant variant)
    {
        Snackbar.Configuration.MaxDisplayedSnackbars = 10;
        Snackbar.Add($"Normal {message}", Severity.Normal, c => c.SnackbarVariant = variant);
        Snackbar.Add($"Info {message}", Severity.Info, c => c.SnackbarVariant = variant);
        Snackbar.Add($"Success {message}", Severity.Success, c => c.SnackbarVariant = variant);
        Snackbar.Add($"Warning {message}", Severity.Warning, c => c.SnackbarVariant = variant);
        Snackbar.Add($"Error {message}", Severity.Error, c => c.SnackbarVariant = variant);
    }
}
```

The snackbar's default behavior is to remain visible until the user closes the snackbar. When `@nameof(SnackbarOptions.CloseAfterNavigation)` is set to `true` a snackbar will close after a user navigates away from the current page. Click both snackbars in the example and then navigate to another component to see this example in action.

```razor title="SnackbarNavigationExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" @onclick="@AddCloseAfterNavSnackbar">
   Closes after navigation
</MudButton>

<MudButton Variant="Variant.Filled" Color="Color.Primary" @onclick="@AddSnackbar">
    Default snackbar
</MudButton>

@code{
    public void AddSnackbar()
    {
        Snackbar.Add("Remains open after navigation.", Severity.Normal);
    }

    public void AddCloseAfterNavSnackbar()
    {
        Snackbar.Add("Will close after navigation.", Severity.Normal, (options) =>
        {
            options.CloseAfterNavigation = true;
        });
    }
}
```

A `@nameof(Snackbar)` becomes clickable when a handler is defined in the `@nameof(SnackbarOptions.OnClick)` property of the `@nameof(SnackbarOptions)` object.

```razor title="SnackbarOnClickExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@Show">
    Open clickable snackbar
</MudButton>

@code {

    void Show()
    {
        Snackbar.Add("I got a message for you", Severity.Normal, config =>
        {
            config.OnClick = snackbar =>
            {
                SayHello();
                return Task.CompletedTask;
            };
        });
    }

    public void SayHello()
    {
        Snackbar.Add("Hello World!");
    }
}
```

Alternatively, the `@nameof(SnackbarOptions.OnClick)` handler can be attached to an action button by setting a label in the `@nameof(SnackbarOptions.Action)` property.

```razor title="SnackbarActionButtonExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@Show">
    Open action snackbar
</MudButton>

@code {

    void Show()
    {
        Snackbar.Add("Ooops. Something really bad happened!", Severity.Normal, config =>
        {
            config.Action = "Help";
            config.ActionColor = Color.Primary;
            config.OnClick = snackbar =>
            {
                Help();
                return Task.CompletedTask;
            };
        });
    }

    public void Help()
    {
        Snackbar.Add("Please check the reactor temperature and try again");
    }
}
```

A `@nameof(MudBlazor.Snackbar)` can also invoke the attached `@nameof(SnackbarOptions.CloseButtonClickFunc)` task when a user clicks on the close button.

```razor title="SnackbarOnCloseExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="Show">
    Do something on close
</MudButton>

@code {
    private void Show()
    {
        Snackbar.Add("Close me using the close button.", Severity.Normal, config =>
        {
            config.RequireInteraction = true;
            config.CloseButtonClickFunc = SayGoodbye;
        });
    }

    private Task SayGoodbye(Snackbar snackbar)
    {
        Snackbar.Add("Sorry to see you go!");
        return Task.CompletedTask;
    }
}
```

Snackbars that define an action button stay visible until the user interacts with them. Use the `@nameof(CommonSnackbarOptions.RequireInteraction)` property to enforce this behavior for all snackbars or to opt out when actions should still dismiss automatically.

```razor title="SnackbarRequireInteractionExample"
@inject ISnackbar Snackbar

<div class="pa-0 ma-0">
    <MudAlert Severity="Severity.Warning" Dense="true" Class="rounded-0 rounded-t">The reactor temperature exceeds the optimal range</MudAlert>
    <MudAlert Severity="Severity.Error" Dense="true" Class="rounded-0">Reactor meltdown is imminent!</MudAlert>
    <div class="d-flex flex-column" style="height: 200px;">
        <div class="align-self-center mt-12">
            <MudText Typo="Typo.h6">Fuel Rod Temperature: @FuelRodTemperature.ToString()C</MudText>
        </div>
        <div class="align-self-center mt-6">
            <MudTooltip Text="Reactor Shutdown">
                <MudButton Variant="Variant.Filled" DropShadow="false" Color="Color.Error" @onclick="@(() => ShutDown())">Scram Button</MudButton>
            </MudTooltip>
        </div>
    </div>
    <MudAlert Severity="Severity.Info" Dense="true" Class="rounded-0 rounded-b">The reactor is about to have a meltdown deputy chief-engineer! You must act now!</MudAlert>
</div>

@code {

    public int FuelRodTemperature { get; set; } = 600;

    void ShutDown()
    {
        string message = "Scram Initiated!";
        Snackbar.Add(message, Severity.Success, config =>
        {
            config.RequireInteraction = true;
            config.ShowCloseIcon = false;
            config.OnClick = snackbar =>
            {
                UpdateTemperature();
                return Task.CompletedTask;
            };
        });
    }

    public void UpdateTemperature()
    {
        FuelRodTemperature += 100;
        Snackbar.Add("Temperature is still going up!", Severity.Warning);
        StateHasChanged();
    }
}
```

```razor title="SnackbarNoIconExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" @onclick="@(() => Snackbar.Add("Snackbar with no icon.", Severity.Success, config => { config.HideIcon = true; }))">
    Open snackbar
</MudButton>
```

```razor title="SnackbarCustomIconExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" @onclick="@(() =>
    Snackbar.Add("Snackbar with a custom icon, color and size.", Severity.Info, config =>
        {
            config.Icon = Icons.Custom.Brands.GitHub;
            config.IconColor = Color.Warning;
            config.IconSize = Size.Large;
        }))">

    Open snackbar
</MudButton>
```

Using the injected @nameof(ISnackbar), you can use the `@nameof(ISnackbar.Remove)` method to remove a `@nameof(MudBlazor.Snackbar)` programmatically.

```razor title="SnackbarRemoveExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@Show">
    Open snackbar
</MudButton>
<MudButton Variant="Variant.Filled" Color="Color.Error" OnClick="@Hide">
    Hide snackbar
</MudButton>

@code {
    private Snackbar _snackbar;

    void Show()
    {
        _snackbar = Snackbar.Add("Now click hide snackbar", Severity.Normal, config =>
        {
            config.VisibleStateDuration = int.MaxValue;
        });
    }

    void Hide() {
        if (_snackbar is null) return;
        Snackbar.Remove(_snackbar);
    }
}
```

Alternatively, you can use the `@nameof(ISnackbar.RemoveByKey)` method to remove the Snackbars by key programmatically.
 It will remove all the Snackbars with the specified key, including those that are not displayed due to `@nameof(SnackbarConfiguration.MaxDisplayedSnackbars)`.

```razor title="SnackbarRemoveByKeyExample"
@inject ISnackbar Snackbar

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@Show">
    Open snackbar
</MudButton>
<MudButton Variant="Variant.Filled" Color="Color.Error" OnClick="@Hide">
    Hide snackbar
</MudButton>

@code {
    private const string Key = "Same";

    void Show()
    {
        var config = (SnackbarOptions options) =>
        {
            options.VisibleStateDuration = int.MaxValue;
            options.DuplicatesBehavior = SnackbarDuplicatesBehavior.Allow;
        };

        Snackbar.Add($"Now click hide snackbar. Key: {Key}", Severity.Normal, config, Key);
        Snackbar.Add($"Now click hide snackbar. Key: {Key}", Severity.Normal, config, Key);
    }

    void Hide()
    {
        Snackbar.RemoveByKey(Key);
    }
}
```

`@nameof(SnackbarService)` can prevent more than one snackbar with identical message content from appearing. It does
 this by default when you call `@nameof(ISnackbar.Add)` with a `string`. If you want to prevent duplication of
 a `@nameof(MudBlazor.Snackbar)` created with a `@nameof(RenderFragment)` or a custom component, pass a key to `@nameof(ISnackbar.Add)`.

```razor title="SnackbarPreventDuplicatesExample"
@inject ISnackbar SnackbarService

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="@OnClick">Prevent duplicate snackbars</MudButton>

@code {
    private void OnClick()
    {
        // We'll set all three of these snackbars to prevent duplicates and give them
        // all the same key ("mudblazor")
        var config = (SnackbarOptions options) =>
        {
            options.DuplicatesBehavior = SnackbarDuplicatesBehavior.Prevent;
        };

        // Then we try to show all three in quick succession, but only the first pops!
        SnackbarService.Add("This is the only snackbar that will be shown", configure: config, key: "mudblazor");
        SnackbarService.Add(@<span>This one has the same key</span>, configure: config, key: "mudblazor");
        SnackbarService.Add<MudChip<T>>(new Dictionary<string, object>() {
            { "Text", "This one also has the same key" }
        }, configure: config, key: "mudblazor");
    }
}
```
