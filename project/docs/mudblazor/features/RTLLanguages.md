# RTLLanguages

Right-to-Left (RTL) specific styling options

Right-to-Left script is used in languages like Arabic and Hebrew where writing starts from the right of the page and continues to the left. The UI has to be mirrored horizontally because of that.

Wrap your code inside a `MudRTLProvider`.
 Note that `MudThemeProvider`, `MudDialogProvider` and `MudSnackbarProvider` must be children of
 `MudRTLProvider` in order to support RTL. Your `MainLayout.razor` should look something like this.

```razor title="RTLLanguagesMRtlProviderExample"
@inherits LayoutComponentBase


<MudRTLProvider>
    <MudThemeProvider/>
    <MudPopoverProvider/>
    <MudDialogProvider/>
    <MudSnackbarProvider/>
    <MudLayout>
        <MudMainContent>
            @Body
        </MudMainContent>
    </MudLayout>
</MudRTLProvider>
```

By setting `RightToLeft="true"` you can change the layout to RTL.

```razor title="RTLLanguagesLayoutExample"
<MudRTLProvider RightToLeft="@_rightToLeft">
    <MudCard Class="mb-2" Style="width: 400px">
        <MudCardHeader>
            <CardHeaderAvatar>
                <MudAvatar Color="Color.Secondary">@Localizer("CardAvatarLetter")</MudAvatar>
            </CardHeaderAvatar>
            <CardHeaderContent>
                <MudText Typo="Typo.body1">@Localizer("CardHeader")</MudText>
                <MudText Typo="Typo.body2">@Localizer("CardSubHeader")</MudText>
            </CardHeaderContent>
            <CardHeaderActions>
                <MudIconButton Icon="@Icons.Material.Filled.Settings" Color="Color.Default" />
            </CardHeaderActions>
        </MudCardHeader>
        <MudCardMedia Image="_content/MudBlazor.Docs/images/pilars.jpg" Height="250" />
        <MudCardContent>
            <MudText Typo="Typo.body2">@Localizer("CardDescription")</MudText>
        </MudCardContent>
        <MudCardActions>
            <MudIconButton Icon="@Icons.Material.Filled.Favorite" Color="Color.Default" />
            <MudIconButton Icon="@Icons.Material.Filled.Share" Color="Color.Default" />
        </MudCardActions>
    </MudCard>
</MudRTLProvider>
<MudSwitch @bind-Value="_rightToLeft" Label="Toggle Right to Left" Color="Color.Primary"/>

@code {
    private bool _rightToLeft = true;

    //This translation is for demonstration purposes only. In a real application, you should use a IStringLocalizer etc.
    private string Localizer(string key)
    {
        //This is just a google translation. If you have a better translation, feel free to share it with us  :)
        if (key.Equals("CardAvatarLetter"))
            return _rightToLeft ? "ا" : "I";
        else if (key.Equals("CardHeader"))
            return _rightToLeft ? "استريا كرواتيا" : "Istra Croatia";
        else if (key.Equals("CardSubHeader"))
            return _rightToLeft ? "شبه الجزيرة في أوروبا" : "Peninsula in Europe";
        else if (key.Equals("CardDescription"))
            return _rightToLeft ? "التقطت هذه الصورة في قرية صغيرة في استرا كرواتيا" : "This photo was taken in a small village in Istra Croatia.";
        return "";
    }
}
```

Text Fields with `InputType.Email` or `InputType.Telephone` remain left-aligned, with the label remaining right-aligned.

```razor title="RTLLanguagesTextfieldExample"
<MudRTLProvider RightToLeft="true">
    <MudGrid>
        <MudItem xs="12" sm="4">
            <MudText Align="Align.Left">Text</MudText>
            <MudTextField Label="الاسم الأول" Variant="Variant.Outlined" @bind-Value="_name" Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Person"></MudTextField>
        </MudItem>
        <MudItem xs="12" sm="4">
            <MudText Align="Align.Left">Telephone</MudText>
            <MudTextField InputType="InputType.Telephone" Label="رقم الهاتف" Variant="Variant.Outlined" @bind-Value="_telephone" Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Smartphone"></MudTextField>
        </MudItem>
        <MudItem xs="12" sm="4">
            <MudText Align="Align.Left">Email</MudText>
            <MudTextField InputType="InputType.Email" Label="البريد الإلكتروني" Variant="Variant.Outlined" @bind-Value="_email" Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Email"></MudTextField>
        </MudItem>
    </MudGrid>
</MudRTLProvider>

@code {
    private string _name { get; set; } = "John Smith";
    private string _email { get; set; } = "mail@example.com";
    private long? _telephone { get; set; } = 1618033988;
}
```

If your application needs to support both left-to-right and right-to-left languages, make use of
 `start` and `end` border radiuses instead of `left` and `right`.
 Some other components like [MudDrawer](/components/drawer) also support `start` and `end` properties.

```razor title="RTLLanguagesBorderRadiusExample"
<div class="mud-theme-primary py-4 px-6 mx-4 rounded-s-xl">
    <MudText Align="Align.Center">.rounded-s-xl</MudText>
</div>
<div class="mud-theme-secondary py-4 px-6 mx-4 rounded-e-xl">
    <MudText Align="Align.Center">.rounded-e-xl</MudText>
</div>
<div class="mud-theme-tertiary py-4 px-6 mx-4 rounded-ts-xl">
    <MudText Align="Align.Center">.rounded-ts-xl</MudText>
</div>
<div class="mud-theme-info py-4 px-6 mx-4 rounded-te-xl">
    <MudText Align="Align.Center">.rounded-te-xl</MudText>
</div>
<div class="mud-theme-warning py-4 px-6 mx-4 rounded-bs-xl">
    <MudText Align="Align.Center">.rounded-bs-xl</MudText>
</div>
<div class="mud-theme-error py-4 px-6 mx-4 rounded-be-xl">
    <MudText Align="Align.Center">.rounded-be-xl</MudText>
</div>
```
