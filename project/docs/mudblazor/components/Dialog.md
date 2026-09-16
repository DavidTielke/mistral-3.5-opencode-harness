# Dialog

To use a dialog, define a `MudDialog` in a Razor component (e.g., TermsOfServiceDialog.razor).
 Show it by calling:
 
 `DialogService.Show<TermsOfServiceDialog`>("Terms");
 
 This approach lets you reuse dialogs throughout your app and pass parameters for customization.
 
 Tip: For best results, use MudDialog as the root element of your dialog component.

```razor title="DialogUsageExample"
@inject IDialogService DialogService

<MudButton @onclick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Open simple dialog
</MudButton>

@code {

    private Task OpenDialogAsync()
    {
        var options = new DialogOptions { CloseOnEscapeKey = true };

        return DialogService.ShowAsync<DialogUsageExample_Dialog>("Simple Dialog", options);
    }
}
```

```razor title="DialogUsageExample_Dialog"
<MudDialog>
    <TitleContent>
        Dialog Title
    </TitleContent>
    <DialogContent>
        Dialog Content
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="Submit">OK</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void Submit() => MudDialog.Close(DialogResult.Ok(true));

    private void Cancel() => MudDialog.Cancel();
}
```

You can change dialog behavior globally by setting parameters on `<MudDialogProvider/>`, or per dialog by passing a `DialogOptions` instance when opening a dialog.

Set options on `<MudDialogProvider/>` to affect all dialogs. See the [installation page](/getting-started/installation) for details.

```razor title="DialogConfigurationExample"
<MudDialogProvider
    FullWidth="true"
    MaxWidth="MaxWidth.ExtraSmall"
    CloseButton="true"
    BackdropClick="false"
    NoHeader="true"
    Position="DialogPosition.Center"
    CloseOnEscapeKey="true"
    BackgroundClass="my-custom-class"
    ReverseMessageBoxButtonOrder="true"/>
```

Pass a `DialogOptions` object when opening a dialog to override global settings for that instance.

```razor title="DialogOptionsExample"
@inject IDialogService Dialog

<MudButton OnClick="@(() => OpenDialogAsync(_maxWidth))">MaxWidth dialog</MudButton>
<MudButton OnClick="@(() => OpenDialogAsync(_closeButton))" Color="Color.Primary">Close Button dialog</MudButton>
<MudButton OnClick="@(() => OpenDialogAsync(_noHeader))" Color="Color.Secondary">No Header dialog</MudButton>
<MudButton OnClick="@(() => OpenDialogAsync(_backdropClick))" Color="Color.Tertiary">Disable Backdrop dialog</MudButton>
<MudButton OnClick="@(() => OpenDialogAsync(_fullScreen))" Color="Color.Info">Full Screen dialog</MudButton>
<MudButton OnClick="@(() => OpenDialogAsync(_topCenter))" Color="Color.Success">Top Center dialog</MudButton>


@code {
    private readonly DialogOptions _maxWidth = new() { MaxWidth = MaxWidth.Medium, FullWidth = true };
    private readonly DialogOptions _closeButton = new() { CloseButton = true };
    private readonly DialogOptions _noHeader = new() { NoHeader = true };
    private readonly DialogOptions _backdropClick = new() { BackdropClick = false };
    private readonly DialogOptions _fullScreen = new() { FullScreen = true, CloseButton = true };
    private readonly DialogOptions _topCenter = new() { Position = DialogPosition.TopCenter };

    private Task OpenDialogAsync(DialogOptions options)
    {
        return Dialog.ShowAsync<DialogUsageExample_Dialog>("Custom Options Dialog", options);
    }
}
```

```razor title="DialogOptionsExample_Dialog"
<MudDialog>
    <DialogContent>
        Dialog Content
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="Submit">OK</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void Submit() => MudDialog.Close(DialogResult.Ok(true));

    private void Cancel() => MudDialog.Cancel();
}
```

You can update the dialog's title and options from within the dialog component using `SetTitle` and `SetOptions` on the `MudDialogInstance`.

```razor title="DialogSetOptionsExample"
@inject IDialogService DialogService

<MudButton OnClick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Options dialog
</MudButton>

@code {

    private Task OpenDialogAsync()
    {
        return DialogService.ShowAsync<DialogSetOptionsExample_Dialog>("Options Dialog");
    }
}
```

```razor title="DialogSetOptionsExample_Dialog"
@using System.Web


@inject NavigationManager NavigationManager

<MudDialog>
    <DialogContent>
        <div class="d-flex flex-column py-1">
            <MudButton OnClick="ChangeTitleAsync">Change Title</MudButton>
            <MudButton OnClick="ToggleCloseButtonAsync">Toggle Close Button</MudButton>
            <MudButton OnClick="ToggleFullWidthAsync">Toggle Full Width</MudButton>
            <MudButton OnClick="ToggleHeaderAsync">Toggle Header</MudButton>
            <MudCheckBox TriState="true" T="bool?" Value="MudDialog.Options.CloseOnNavigation" ValueChanged="@(async v => await CloseOnNavigationChangedAsync(v))">Close On Navigation</MudCheckBox>
            <MudButton OnClick="ChangeUrl">Change Url</MudButton>
        </div>
    </DialogContent>
    <DialogActions>
        <MudButton Color="Color.Primary" OnClick="Close">OK</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    [SupplyParameterFromQuery(Name = "example")]
    public int? QueryParameterExample { get; set; }

    protected override void OnParametersSet() {
        QueryParameterExample ??= 0;
    }

    private void Close() => MudDialog.Close(DialogResult.Ok(true));

    private Task ChangeTitleAsync() => MudDialog.SetTitleAsync($"Current time is: {DateTime.Now}");

    private Task ToggleCloseButtonAsync()
    {
        var options = MudDialog.Options with
        {
            CloseButton = !(MudDialog.Options.CloseButton ?? false)
        };

        return MudDialog.SetOptionsAsync(options);
    }

    private Task ToggleFullWidthAsync()
    {
        var options = MudDialog.Options with
        {
            FullWidth = !(MudDialog.Options.FullWidth ?? true)
        };

        return MudDialog.SetOptionsAsync(options);
    }

    private Task ToggleHeaderAsync()
    {
        var options = MudDialog.Options with
        {
            NoHeader = !(MudDialog.Options.NoHeader ?? false)
        };

        return MudDialog.SetOptionsAsync(options);
    }

    private void ChangeUrl() {
        var uri = new Uri(NavigationManager.Uri);

        var query = HttpUtility.ParseQueryString(uri.Query);

        query["example"] = (QueryParameterExample + 1).ToString();

        var newUri = $"{uri.GetLeftPart(UriPartial.Path)}?{query}";

        NavigationManager.NavigateTo(newUri);
    }

    private Task CloseOnNavigationChangedAsync(bool? closeOnNavigation)
    {
        var options = MudDialog.Options with
        {
            CloseOnNavigation = closeOnNavigation
        };

        return MudDialog.SetOptionsAsync(options);
    }
}
```

Build a reusable dialog and pass simple data to it for different scenarios.

```razor title="DialogTemplateExample"
@inject IDialogService DialogService


<MudButton @onclick="DeleteUserAsync" Variant="Variant.Filled" Color="Color.Error">Delete records</MudButton>
<MudButton @onclick="ConfirmAsync" Variant="Variant.Filled" Color="Color.Success">Remove email</MudButton>
<MudButton @onclick="DownloadAsync" Variant="Variant.Filled" Color="Color.Warning">Slow computer</MudButton>

@code {

    private Task DeleteUserAsync()
    {
        var parameters = new DialogParameters<DialogTemplateExample_Dialog>
        {
            { x => x.ContentText, "Do you really want to delete these records? This process cannot be undone." },
            { x => x.ButtonText, "Delete" },
            { x => x.Color, Color.Error }
        };

        var options = new DialogOptions() { CloseButton = true, MaxWidth = MaxWidth.ExtraSmall };

        return DialogService.ShowAsync<DialogTemplateExample_Dialog>("Delete", parameters, options);
    }

    private Task ConfirmAsync()
    {
        var parameters = new DialogParameters<DialogTemplateExample_Dialog>
        {
            { x => x.ContentText, "Are you sure you want to remove thisguy@emailz.com from this account?" },
            { x => x.ButtonText, "Yes" },
            { x => x.Color, Color.Success }
        };

        return DialogService.ShowAsync<DialogTemplateExample_Dialog>("Confirm", parameters);
    }

    private Task DownloadAsync()
    {
        var parameters = new DialogParameters<DialogTemplateExample_Dialog>
        {
            { x => x.ContentText, "Your computer seems very slow, click the download button to download free RAM." },
            { x => x.ButtonText, "Download" },
            { x => x.Color, Color.Info }
        };

        return DialogService.ShowAsync<DialogTemplateExample_Dialog>("Slow Computer Detected", parameters);
    }
}
```

```razor title="DialogTemplateExample_Dialog"
<MudDialog>
    <DialogContent>
        <MudText>@ContentText</MudText>
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="@Color" Variant="Variant.Filled" OnClick="Submit">@ButtonText</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    [Parameter]
    public string ContentText { get; set; }

    [Parameter]
    public string ButtonText { get; set; }

    [Parameter]
    public Color Color { get; set; }

    private void Submit() => MudDialog.Close(DialogResult.Ok(true));

    private void Cancel() => MudDialog.Cancel();
}
```

Pass data to a dialog and use it for operations, such as confirming a delete action.

```razor title="DialogPassingDataExample"
@using MudBlazor.Examples.Data.Models

@inject IDialogService DialogService

<div class="d-flex flex-wrap">
    @foreach (var item in Servers)
    {
        <MudPaper Class="d-flex align-center pa-2 mx-2 my-2">
            <MudText>@item.Name</MudText>
            <MudButton Variant="Variant.Text" Color="Color.Error" OnClick="@((e) => DeleteServerAsync(item))">Delete</MudButton>
        </MudPaper>
    }
</div>

@code {

    private async Task DeleteServerAsync(Server server)
    {
        var parameters = new DialogParameters<DialogPassingDataExample_Dialog> { { x => x.Server, server } };

        var dialog = await DialogService.ShowAsync<DialogPassingDataExample_Dialog>("Delete Server", parameters);
        var result = await dialog.Result;

        if (!result.Canceled)
        {
            //In a real world scenario we would reload the data from the source here since we "removed" it in the dialog already.
            Guid.TryParse(result.Data.ToString(), out Guid deletedServer);
            Servers.RemoveAll(item => item.Id == deletedServer);
        }
    }

    //Pretend we are loading this data from a database or API
    public List<Server> Servers { get; } = new List<Server>
    {
        new Server{ Id = Guid.NewGuid(), Name = "Server1", Location = "Denmark", IpAddress = "193.254.123.1" },
        new Server{ Id = Guid.NewGuid(), Name = "Server2", Location = "Sweden", IpAddress = "127.0.0.1" },
        new Server{ Id = Guid.NewGuid(), Name = "Server3", Location = "Russia", IpAddress = "173.164.2.1" },
        new Server{ Id = Guid.NewGuid(), Name = "Server4", Location = "Germany", IpAddress = "193.168.1.1" },
    };
}
```

```razor title="DialogPassingDataExample_Dialog"
@using MudBlazor.Examples.Data.Models

@inject ISnackbar Snackbar

<MudDialog>
    <TitleContent>
        <MudText Typo="Typo.h6">
            <MudIcon Icon="@Icons.Material.Filled.DeleteForever" Class="mr-3 mb-n1"/>
            Delete server?
        </MudText>
    </TitleContent>
    <DialogContent>
        <MudTextField Value="@Server.Id.ToString()" Label="Server ID" ReadOnly="true"/>
        <MudTextField Value="@Server.Name" Label="Server Name" ReadOnly="true"/>
        <MudTextField Value="@Server.Location" Label="Location" ReadOnly="true"/>
        <MudTextField Value="@Server.IpAddress" Label="IP Address" ReadOnly="true"/>
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Error" OnClick="DeleteServer">Delete Server</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    [Parameter]
    public Server Server { get; set; } = new Server();

    private void Cancel() => MudDialog.Cancel();

    private void DeleteServer()
    {
        //In a real world scenario this bool would probably be a service to delete the item from api/database
        Snackbar.Add("Server Deleted", Severity.Success);
        MudDialog.Close(DialogResult.Ok(Server.Id));
    }
}
```

Dialogs automatically become scrollable if their content exceeds the available height.

```razor title="DialogScrollableExample"
@inject IDialogService DialogService

<MudButton OnClick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Scrollable Dialog
</MudButton>

@code {
    private bool _licenseAccepted = false;

    private async Task OpenDialogAsync()
    {
        var dialog = await DialogService.ShowAsync<DialogScrollableExample_Dialog>("MudBlazor License");
        var result = await dialog.Result;

        if (!result.Canceled)
        {
            _licenseAccepted = (bool)(result.Data ?? false);
        }
    }
}
```

```razor title="DialogScrollableExample_Dialog"
<MudDialog Style="height: 400px">
    <DialogContent>
        @if (_loading)
        {
            <MudProgressCircular Indeterminate="true"></MudProgressCircular>
        }
        else
        {
            <MudText Style="white-space: pre-wrap;">@_licenseText</MudText>
        }
    </DialogContent>
    <DialogActions>
        <MudButton Color="Color.Primary" OnClick="Ok">Accept</MudButton>
    </DialogActions>
</MudDialog>


@code {
    private string _licenseText;
    private bool _loading;

    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    [Inject]
    private HttpClient HttpClient { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        _loading = true;
        var response = await HttpClient.GetAsync("https://raw.githubusercontent.com/MudBlazor/MudBlazor/master/LICENSE");
        _licenseText = await response.Content.ReadAsStringAsync();
        _loading = false;
    }

    private void Ok() => MudDialog.Close(DialogResult.Ok(true));
}
```

Customize the dialog background using the `BackgroundClass` option.

```razor title="DialogBlurryExample"
@inject IDialogService DialogService


<MudButton @onclick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Open blurry dialog
</MudButton>

<style>
    .my-custom-class {
        backdrop-filter: blur(10px);
    }
</style>

@code {

    private Task OpenDialogAsync()
    {
        var options = new DialogOptions { BackgroundClass = "my-custom-class" };

        return DialogService.ShowAsync<DialogBlurryExample_Dialog>("Simple Dialog", options);
    }
}
```

```razor title="DialogBlurryExample_Dialog"
<MudDialog>
    <DialogContent>
        Dialog Content
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="Submit">OK</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void Submit() => MudDialog.Close(DialogResult.Ok(true));

    private void Cancel() => MudDialog.Cancel();
}
```

You can place a `MudDialog` directly in another component. This is useful for small, non-reusable dialogs and allows easy sharing of data and code. You can also override the dialog title with a render fragment.

```razor title="DialogInlineExample"
<div class="d-flex">
    <MudButton OnClick="OpenDialog" Variant="Variant.Filled" Color="Color.Primary">
        Edit rating
    </MudButton>
    <MudRating SelectedValue="_rating" Disabled="true" Class="mt-1 ml-3" />
</div>

<MudDialog @bind-Visible="_visible" Options="_dialogOptions">
    <TitleContent>
        <MudText Typo="Typo.h6">
            <MudIcon Icon="@Icons.Material.Filled.Edit" Class="mr-3" /> Edit rating
        </MudText>
    </TitleContent>
    <DialogContent>
        <p>How awesome are inline dialogs?</p>
        <MudRating @bind-SelectedValue="_rating" Class="mt-3" />
    </DialogContent>
    <DialogActions>
        <MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="Submit" Class="px-10">Close</MudButton>
    </DialogActions>
</MudDialog>

@code {
    private bool _visible;
    private int _rating;
    private readonly DialogOptions _dialogOptions = new() { FullWidth = true };

    private void OpenDialog() => _visible = true;

    private void Submit() => _visible = false;
}
```

Inline dialogs can be nested within each other. This example demonstrates both single and multiple levels of nesting.

```razor title="DialogNestedInlineExample"
@inject IDialogService DialogService

<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="Open">Open inline</MudButton>
<MudButton Variant="Variant.Filled" Color="Color.Primary" OnClick="Open2Async">Open with show</MudButton>

@*Outer inline dialog*@
<MudDialog @bind-Visible="_visible">
    <DialogContent>
        <MudText>Hi There, I'm an inline dialog!</MudText>
        <MudButton Variant="Variant.Filled" Color="Color.Tertiary" OnClick="OpenNested">Open nested</MudButton>
        @*Nested inline dialog*@
        <MudDialog @bind-Visible="_nestedVisible">
            <DialogContent>
                <MudText Class="nested">Nested inline dialog!</MudText>
            </DialogContent>
            <DialogActions>
                <MudButton Color="Color.Primary" OnClick="CloseNested">Close</MudButton>
            </DialogActions>
        </MudDialog>
    </DialogContent>
    <DialogActions>
        <MudButton Color="Color.Primary" OnClick="Close">Close</MudButton>
    </DialogActions>
</MudDialog>

@code {
    private bool _visible;
    private bool _nestedVisible;

    private void Open() => _visible = true;

    private void Close() => _visible = false;

    private void OpenNested() => _nestedVisible = true;

    private void CloseNested() => _nestedVisible = false;

    @*Open a non-inline dialog component that nests an inline dialog*@
    private Task Open2Async() => DialogService.ShowAsync<DialogNestedInlineExample_Dialog>();
}
```

```razor title="DialogNestedInlineExample_Dialog"
@*Outer dialog*@
<MudDialog>
    <DialogContent>
        <MudText>Hi There, I'm a regular dialog!</MudText>
        <MudButton Variant="Variant.Filled" Color="Color.Tertiary" OnClick="OpenNested">Open Nested</MudButton>
        @*Nested dialog*@
        <MudDialog @bind-Visible="_nestedVisible">
            <DialogContent>
                <MudText Class="nested">Nested inline dialog!</MudText>
            </DialogContent>
            <DialogActions>
                <MudButton Color="Color.Primary" OnClick="CloseNested">Close</MudButton>
            </DialogActions>
        </MudDialog>
    </DialogContent>
    <DialogActions>
        <MudButton Color="Color.Primary" OnClick="(() => MudDialog.Close())">Close</MudButton>
    </DialogActions>
</MudDialog>

@code {
    private bool _nestedVisible;

    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void OpenNested() => _nestedVisible = true;

    private void CloseNested() => _nestedVisible = false;
}
```

You can open multiple dialogs at once. This example also shows how to open a second dialog and close all dialogs simultaneously.

```razor title="DialogNestedExample"
@inject IDialogService DialogService

<MudButton @onclick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Open simple dialog
</MudButton>

@code {
    private Task OpenDialogAsync()
    {
        var options = new DialogOptions { CloseOnEscapeKey = true };

        return DialogService.ShowAsync<DialogNestedExample_Dialog>("First Level Dialog", options);
    }
}
```

```razor title="DialogNestedExample_Dialog"
@inject IDialogService DialogService

<MudDialog>
    <DialogContent>
        Dialog Content
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="OpenSecondDialogAsync">Open Second Dialog</MudButton>
    </DialogActions>
</MudDialog>


@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void Cancel() => MudDialog.Cancel();

    private Task OpenSecondDialogAsync()
    {
        return DialogService.ShowAsync<DialogNestedExample_Dialog2>("Second Level Dialog");
    }
}
```

```razor title="DialogNestedExample_Dialog2"
<MudDialog>
    <DialogContent>
        Dialog Content
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="CancelAll">Close All</MudButton>
    </DialogActions>
</MudDialog>


@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void Cancel() => MudDialog.Cancel();

    private void CancelAll() => MudDialog.CancelAll();
}
```

MudDialog supports closing with the `Escape` key if `@(nameof(DialogOptions.CloseOnEscapeKey))` is enabled.
 When closed with Escape, the dialog returns `DialogResult.Cancel()`.
 For custom keyboard handling, use `OnKeyDown` and `OnKeyUp` event handlers. The example below returns a value on Enter only if a selection is made.

```razor title="DialogKeyboardNavigationExample"
@inject IDialogService DialogService


<MudButton @onclick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Select coffee
</MudButton>
<MudChip T="string">@_returnValue</MudChip>

@code {

    string _returnValue = "Dialog return value (not yet set)";

    private async Task OpenDialogAsync()
    {    
        var options = new DialogOptions { CloseOnEscapeKey = true };
        var dialogReference = await DialogService.ShowAsync<DialogKeyboardNavigationExample_Dialog>("Dialog Keyboard Accessibility Demo", options);
        _returnValue = "Waiting for dialog to conclude ...";
        StateHasChanged();
        var dialogResult = await dialogReference.Result;
        if (dialogResult.Canceled) {
            _returnValue = "Dialog was canceled";
            StateHasChanged();
        }
        else {
            _returnValue = $"Dialog returned '{dialogResult.Data}'";
            StateHasChanged();
        }
    }
}
```

```razor title="DialogKeyboardNavigationExample_Dialog"
<MudDialog OnKeyDown="OnKeyDownAsync">
    <DialogContent>
        <MudText>Select your favourite coffee. Hit Enter to accept or Escape to cancel.</MudText>
        <MudSelect T="string" Label="Favorite Coffee" @bind-Value="_returnValue">
            <MudSelectItem Value="@("Cappuccino")" />
            <MudSelectItem Value="@("Cafe Latte")" />
            <MudSelectItem Value="@("Espresso")" />
            <MudSelectItem Value="@("Irish Coffee")" />
        </MudSelect>
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="Submit">OK</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [Inject] 
    private IDialogService DialogService { get; set; } // for MessageBox

    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private string _returnValue;

    private void Submit() => MudDialog.Close(DialogResult.Ok(_returnValue));

    private void Cancel() => MudDialog.Cancel();

    private async Task OnKeyDownAsync(KeyboardEventArgs args)
    {
        switch(args.Key) {
            case "Enter":
            case "NumpadEnter":
                if (string.IsNullOrEmpty(_returnValue)) {
                    await DialogService.ShowMessageBoxAsync(
                        "Sorry",
                        @"You must either select a coffee and close with Enter or cancel with Escape!", 
                        yesText:"Got it", 
                        options: new DialogOptions() { CloseOnEscapeKey = true });
                    return;
                }
                Submit();
                break;
        }
    }

}
```

Dialogs use a focus trap to keep keyboard focus inside. By default, the first element is focused, but you can change this with the `DefaultFocus` option.

```razor title="DialogFocusExample"
@inject IDialogService DialogService


<MudButton @onclick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Open dialog
</MudButton>

@code {

    private Task OpenDialogAsync()
    {
        var options = new DialogOptions { CloseOnEscapeKey = true };

        return DialogService.ShowAsync<DialogFocusExample_Dialog>("Last element focused", options);
    }
}
```

```razor title="DialogFocusExample_Dialog"
<MudDialog DefaultFocus="DefaultFocus.LastChild">
    <DialogContent>
        Dialog content
    </DialogContent>
    <DialogActions>
        <MudButton OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="Submit">OK</MudButton>
        <MudButton Color="Color.Success" >Focused Button</MudButton>
    </DialogActions>
</MudDialog>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void Submit() => MudDialog.Close(DialogResult.Ok(true));

    private void Cancel() => MudDialog.Cancel();
}
```

You can apply custom classes to the dialog's title, content, actions, or the dialog itself for advanced styling.

```razor title="DialogStylingExample"
@inject IDialogService DialogService

<MudButton @onclick="OpenDialogAsync" Variant="Variant.Filled" Color="Color.Primary">
    Open custom styled dialog
</MudButton>

@code {
    private Task OpenDialogAsync()
    {
        var options = new DialogOptions { CloseOnEscapeKey = true, CloseButton = true };

        return DialogService.ShowAsync<DialogStylingExample_Dialog>("Styling Example Dialog", options);
    }
}
```

```razor title="DialogStylingExample_Dialog"
<MudDialog Class="blur dialog-background" TitleClass="blur dialog-background-title" ContentClass="dialog-background-surface py-10" ActionsClass="dialog-background-surface">
    <DialogContent>
        Dialog Content
    </DialogContent>
    <DialogActions>
        <MudButton Color="Color.Error" OnClick="Cancel">Cancel</MudButton>
        <MudButton Color="Color.Primary" OnClick="Submit">OK</MudButton>
    </DialogActions>
</MudDialog>

<style>
    .blur {
        backdrop-filter: blur(10px);
    }

    .dialog-background {
        background-color: transparent;
    }

    .dialog-background-title {
        background: rgba(var(--mud-palette-info-rgb), 0.5);
        color: var(--mud-palette-white);
    }

    .dialog-background-surface {
        background: rgba(var(--mud-palette-surface-rgb), 0.75);
    }
</style>

@code {
    [CascadingParameter]
    private IMudDialogInstance MudDialog { get; set; }

    private void Submit() => MudDialog.Close(DialogResult.Ok(true));

    private void Cancel() => MudDialog.Cancel();
}
```
