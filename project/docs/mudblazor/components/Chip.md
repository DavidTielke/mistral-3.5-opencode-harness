# Chip

The Chips, when disabled, differ from other components. Instead of using the disabled color, the opacity is lowered.

```razor title="ChipBasicExample"
<MudChip T="string">Default</MudChip>
<MudChip T="string" Color="Color.Primary">Primary</MudChip>
<MudChip T="string" Color="Color.Secondary">Secondary</MudChip>
<MudChip T="string" Color="Color.Info">Info</MudChip>
<MudChip T="string" Color="Color.Success">Success</MudChip>
<MudChip T="string" Color="Color.Warning">Warning</MudChip>
<MudChip T="string" Color="Color.Error">Error</MudChip>
<MudChip T="string" Color="Color.Dark">Dark</MudChip>
<MudDivider />
<MudChip T="string" Disabled="true">Default</MudChip>
<MudChip T="string" Disabled="true" Color="Color.Primary">Primary</MudChip>
<MudChip T="string" Disabled="true" Color="Color.Secondary">Secondary</MudChip>
<MudChip T="string" Disabled="true" Color="Color.Info">Info</MudChip>
<MudChip T="string" Disabled="true" Color="Color.Success">Success</MudChip>
<MudChip T="string" Disabled="true" Color="Color.Warning">Warning</MudChip>
<MudChip T="string" Disabled="true" Color="Color.Error">Error</MudChip>
<MudChip T="string" Disabled="true" Color="Color.Dark">Dark</MudChip>
```

Text Chips also differ from other components where it has transparent background instead of fully transparent.

```razor title="ChipTextExample"
<MudChip T="string" Variant="Variant.Text">Default</MudChip>
<MudChip T="string" Variant="Variant.Text" Color="Color.Primary">Primary</MudChip>
<MudChip T="string" Variant="Variant.Text" Color="Color.Secondary">Secondary</MudChip>
<MudChip T="string" Variant="Variant.Text" Color="Color.Info">Info</MudChip>
<MudChip T="string" Variant="Variant.Text" Color="Color.Success">Success</MudChip>
<MudChip T="string" Variant="Variant.Text" Color="Color.Warning">Warning</MudChip>
<MudChip T="string" Variant="Variant.Text" Color="Color.Error">Error</MudChip>
<MudChip T="string" Variant="Variant.Text" Color="Color.Dark">Dark</MudChip>
<MudDivider />
<MudChip T="string" Disabled="true" Variant="Variant.Text">Default</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Text" Color="Color.Primary">Primary</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Text" Color="Color.Secondary">Secondary</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Text" Color="Color.Info">Info</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Text" Color="Color.Success">Success</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Text" Color="Color.Warning">Warning</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Text" Color="Color.Error">Error</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Text" Color="Color.Dark">Dark</MudChip>
```

This looks and feels like outlined normally do with a border and slightly transparent background on hover.

```razor title="ChipOutlinedExample"
<MudChip T="string" Variant="Variant.Outlined">Default</MudChip>
<MudChip T="string" Variant="Variant.Outlined" Color="Color.Primary">Primary</MudChip>
<MudChip T="string" Variant="Variant.Outlined" Color="Color.Secondary">Secondary</MudChip>
<MudChip T="string" Variant="Variant.Outlined" Color="Color.Info">Info</MudChip>
<MudChip T="string" Variant="Variant.Outlined" Color="Color.Success">Success</MudChip>
<MudChip T="string" Variant="Variant.Outlined" Color="Color.Warning">Warning</MudChip>
<MudChip T="string" Variant="Variant.Outlined" Color="Color.Error">Error</MudChip>
<MudChip T="string" Variant="Variant.Outlined" Color="Color.Dark">Dark</MudChip>
<MudDivider />
<MudChip T="string" Disabled="true" Variant="Variant.Outlined">Default</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Outlined" Color="Color.Primary">Primary</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Outlined" Color="Color.Secondary">Secondary</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Outlined" Color="Color.Info">Info</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Outlined" Color="Color.Success">Success</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Outlined" Color="Color.Warning">Warning</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Outlined" Color="Color.Error">Error</MudChip>
<MudChip T="string" Disabled="true" Variant="Variant.Outlined" Color="Color.Dark">Dark</MudChip>
```

You can change the close icon with the `CloseIcon` prop.

```razor title="ChipClosableExample"
<MudChip T="string" Color="Color.Default" OnClose="Closed">Closable</MudChip>
<MudChip T="string" Color="Color.Error" OnClose="Closed">Closable</MudChip>
<MudChip T="string" Color="Color.Primary" OnClose="Closed" CloseIcon="@Icons.Material.Filled.AlarmAdd">Closable</MudChip>
<MudChip T="string" Color="Color.Success" OnClose="Closed" CloseIcon="@Icons.Material.Filled.AlarmOn">Closable</MudChip>

@code {
    void Closed(MudChip<string> chip) {
        // react to chip closed
    }
}
```

The `OnClick` handler provides the EventCallback for clicking on the body of the chip.

```razor title="ChipClickableExample"
<MudChip T="string" OnClick="OnChipClicked" Color="Color.Default">Clicked @ClickCount times</MudChip>

@code {
    private int ClickCount { get; set; }

    private void OnChipClicked()
    {
        ClickCount++;
    }
}
```

```razor title="ChipIconExample"
<MudChip T="string" Icon="@Icons.Material.Filled.Dangerous" IconColor="Color.Error">Extensions</MudChip>
<MudChip T="string" Icon="@Icons.Material.Filled.Extension" Color="Color.Dark">Extensions</MudChip>
<MudChip T="string" Icon="@Icons.Material.Filled.Person" Color="Color.Primary">Account</MudChip>
<MudChip T="string" Icon="@Icons.Material.Filled.FlightTakeoff" Color="Color.Secondary">Your flight times</MudChip>
<MudChip T="string" Icon="@Icons.Material.Filled.VerifiedUser" Color="Color.Info">Verified User</MudChip>
```

```razor title="ChipAvatarExample"
<MudChip T="string">
    <AvatarContent>
        <MudAvatar>
            <MudImage Src="images/toiletvisit.jpg"></MudImage>
        </MudAvatar>
    </AvatarContent>
    <ChildContent>Avatar</ChildContent>
</MudChip>

<MudChip T="string">
    <AvatarContent>
        <MudAvatar>MK</MudAvatar>
    </AvatarContent>
    <ChildContent>Avatar</ChildContent>
</MudChip>
```

Label Chips use the default theme border-radius.

```razor title="ChipLabelExample"
<MudChip T="string" Label="true">Default</MudChip>
<MudChip T="string" Icon="@Icons.Custom.Brands.MudBlazor" Label="true" Color="Color.Primary">MudBlazor</MudChip>
<MudChip T="string" Icon="@Icons.Custom.Brands.Twitter" Label="true" Color="Color.Info" OnClose="CloseChip">New Tweets</MudChip>
<MudChip T="string" Icon="@Icons.Custom.Uncategorized.Radioactive" Label="true" Color="Color.Warning" Style="color:black;">Radioactive Areas</MudChip>

@code {
    void CloseChip()
    {
        // Code..
    }
}
```

```razor title="ChipSizeExample"
<MudChip T="string" Size="Size.Small">Small</MudChip>
<MudChip T="string" Size="Size.Medium">Medium</MudChip>
<MudChip T="string" Size="Size.Large">Large</MudChip>
```

Set the `Href` parameter to render the chip as an anchor element.
 `rel="noopener"` will be added automatically if `Target == "_blank"`.
 Link chips cannot use a close button.
 The browser handles their click, so they do not raise `OnClick` and cannot be selected in a `MudChipSet`.

```razor title="ChipLinkExample"
<MudChip T="string"
         Href="https://github.com/MudBlazor/MudBlazor"
         Target="_blank"
         Variant="Variant.Filled"
         Icon="@Icons.Custom.Brands.GitHub"
         Disabled="_disabled">
    GitHub
</MudChip>

<MudChip T="string"
         Href="https://github.com/MudBlazor/MudBlazor"
         Target="_blank"
         Variant="Variant.Filled"
         Icon="@Icons.Custom.Brands.GitHub"
         Disabled="_disabled">
    With Icon
</MudChip>

<MudChip T="string"
         Href="https://github.com/MudBlazor/MudBlazor"
         Target="_blank"
         Variant="Variant.Filled"
         Icon="@Icons.Custom.Brands.GitHub"
         Disabled="_disabled">
    <AvatarContent>
        <MudAvatar>GH</MudAvatar>
    </AvatarContent>
    <ChildContent>With Avatar</ChildContent>
</MudChip>

<br />

<MudSwitch Color="Color.Primary" @bind-Value="_disabled" Label="Disable" />

@code {
    bool _disabled = false;
}
```

The relationship between a linked resource and the current document can be defined using the `Rel` property.
 This overrides the automatic addition of `rel="noopener"` when setting `Target` to `_blank` and so you have to specify it manually if desired.

```razor title="ChipLinkRelExample"
<MudChip T="string"
         Href="https://github.com/MudBlazor/MudBlazor"
         Rel="nofollow"
         Icon="@Icons.Custom.Brands.GitHub"
         Color="Color.Secondary">
    Link with rel="nofollow"
</MudChip>

<MudChip T="string"
         Href="https://github.com/MudBlazor/MudBlazor"
         Target="_blank"
         Rel="nofollow noopener"
         Icon="@Icons.Custom.Brands.GitHub"
         Color="Color.Tertiary">
    Link with rel="nofollow noopener"
</MudChip>
```
