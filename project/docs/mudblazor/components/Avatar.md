# Avatar

Basic avatars, normally used to display text or numbers.`MudAvatar` can be colored with the `Color` property.

```razor title="AvatarBasicExample"
<MudAvatar Color="Color.Primary">M</MudAvatar>
<MudAvatar Color="Color.Secondary">U</MudAvatar>
<MudAvatar Color="Color.Tertiary">D</MudAvatar>
```

By default, the avatar is filled but can be changed with the `Variant` property.

```razor title="AvatarOutlinedExample"
<MudAvatar Color="Color.Info" Variant="Variant.Outlined">M</MudAvatar>
<MudAvatar Color="Color.Success" Variant="Variant.Outlined">U</MudAvatar>
<MudAvatar Color="Color.Warning" Variant="Variant.Outlined">D</MudAvatar>
```

To create an icon avatar, just add an `MudIcon` inside it.

```razor title="AvatarIconExample"
<MudAvatar Color="Color.Warning" Variant="Variant.Filled">
    <MudIcon Color="Color.Dark" Icon="@Icons.Custom.Uncategorized.Radioactive" Size="Size.Large" />
</MudAvatar>
<MudAvatar Color="Color.Primary" Variant="Variant.Outlined">
    <MudIcon Icon="@Icons.Custom.Brands.MudBlazor" />
</MudAvatar>
<MudAvatar Color="Color.Secondary" Variant="Variant.Outlined">
    <MudIcon Icon="@Icons.Material.Filled.FormatListNumbered" />
</MudAvatar>
```

Avatars can display images using a `MudImage` within the `MudAvatar`.

```razor title="AvatarImageExample"
<MudAvatar>
    <MudImage Src="images/mony.jpg"></MudImage>
</MudAvatar>
<MudAvatar>
    <MudImage Src="images/mony.jpg" Alt="An image of the best dog ever!"></MudImage>
</MudAvatar>
<MudAvatar>
    <MudImage Src="images/toiletvisit.jpg"></MudImage>
</MudAvatar>
```

You can change the size with the pre-defined `Size` prop or change the `Width` and `Height` in CSS.

```razor title="AvatarSizeExample"
<MudAvatar Size="Size.Small" Color="Color.Primary">A</MudAvatar>
<MudAvatar Size="Size.Medium" Color="Color.Primary">A</MudAvatar>
<MudAvatar Size="Size.Large" Color="Color.Primary">A</MudAvatar>
<MudAvatar Style="height:70px; width:70px; font-size:2rem;" Color="Color.Primary">A</MudAvatar>
<MudAvatar Style="height:70px; width:70px; font-size:2rem;" Color="Color.Primary" Variant="Variant.Outlined">A</MudAvatar>
<MudAvatar Size="Size.Large" Color="Color.Primary" Variant="Variant.Outlined">A</MudAvatar>
<MudAvatar Size="Size.Medium" Color="Color.Primary" Variant="Variant.Outlined">A</MudAvatar>
<MudAvatar Size="Size.Small" Color="Color.Primary" Variant="Variant.Outlined">A</MudAvatar>
```

With the `Rounded` and `Square` props, you can change the border radius.

```razor title="AvatarShapesExample"
<MudAvatar Square="true">N</MudAvatar>
<MudAvatar Rounded="true" Color="Color.Secondary">
    <MudIcon Icon="@Icons.Material.Filled.FormatListNumbered" />
</MudAvatar>
<MudAvatar Color="Color.Primary">
    <MudIcon Icon="@Icons.Material.Filled.Comment" />
</MudAvatar>
<MudAvatar Square="true" Variant="Variant.Outlined">N</MudAvatar>
<MudAvatar Rounded="true" Color="Color.Secondary"  Variant="Variant.Outlined">
    <MudIcon Icon="@Icons.Material.Filled.FormatListNumbered" />
</MudAvatar>
<MudAvatar Color="Color.Primary" Variant="Variant.Outlined">
    <MudIcon Icon="@Icons.Material.Filled.Comment" />
</MudAvatar>
```

You can group or stack avatars with `MudAvatarGroup`

```razor title="AvatarGroupExample"
<MudAvatarGroup Max="@max" Spacing="@spacing" MaxColor="Color.Primary">
    <MudAvatar>
        <MudImage Src="images/jonny.jpg" />
    </MudAvatar>
    <MudAvatar>
        <MudImage Src="images/mony.jpg" />
    </MudAvatar>
    <MudAvatar>
        <MudImage Src="images/toiletvisit.jpg" />
    </MudAvatar>
    <MudAvatar>
        <MudImage Src="images/jonny.jpg" />
    </MudAvatar>
    <MudAvatar>
        <MudImage Src="images/mony.jpg" />
    </MudAvatar>
    <MudAvatar>
        <MudImage Src="images/toiletvisit.jpg" />
    </MudAvatar>
</MudAvatarGroup>

<MudGrid>
    <MudItem xs="12" sm="6">
        <MudSlider Min="0" Max="6" Step="0" @bind-Value="max" Color="Color.Info">Max Avatars</MudSlider>
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudSlider Min="0" Max="16" Step="0" @bind-Value="spacing" Color="Color.Error">Spacing</MudSlider>
    </MudItem>
</MudGrid>

@code {
    int max = 3;
    int spacing = 3;
}
```

```razor title="AvatarBadgeExample"
<MudBadge Color="Color.Success" Overlap="true" Bordered="true">
    <MudAvatar>
        <MudImage Src="images/jonny.jpg" />
    </MudAvatar>
</MudBadge>
<MudBadge Color="Color.Warning" Overlap="true" Bordered="true">
    <MudAvatar>
        <MudImage Src="images/mony.jpg" />
    </MudAvatar>
</MudBadge>
<MudBadge Color="Color.Error" Icon="@Icons.Material.Filled.Remove" Overlap="true" Bordered="true">
    <MudAvatar>
        <MudImage Src="images/toiletvisit.jpg" />
    </MudAvatar>
</MudBadge>
```
