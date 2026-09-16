# Divider

```razor title="DividerListExample"
<MudPaper Width="300px" Square="true">
    <MudList T="string">
        <MudListItem>Inbox</MudListItem>
        <MudDivider />
        <MudListItem>Sent</MudListItem>
        <MudDivider />
        <MudListItem>Drafts</MudListItem>
        <MudDivider />
        <MudListItem>Spam</MudListItem>
    </MudList>
</MudPaper>
```

Adds a margin to the left side of the divider.

```razor title="DividerInsertExample"
<MudPaper Width="300px" Square="true">
    <MudList T="string">
        <MudListItem Icon="@Icons.Material.Filled.TrendingUp">
            Trending
        </MudListItem>
        <MudDivider DividerType="DividerType.Inset" />
        <MudListItem Icon="@Icons.Material.Filled.StarRate">
            Most Stars
        </MudListItem>
        <MudDivider DividerType="DividerType.Inset" />
        <MudListItem Icon="@Icons.Material.Filled.History">
            History
        </MudListItem>
    </MudList>
</MudPaper>
```

Middle dividers have margin on both left and right side.

```razor title="DividerMiddleExample"
<MudCard>
    <MudCardHeader>
        <CardHeaderContent>
            <MudText Typo="Typo.h5">Uranium-235</MudText>
        </CardHeaderContent>
    </MudCardHeader>
    <MudCardContent>
        <MudText>This is the type of uranium used in the RBMK reactors.</MudText>
        <MudDivider DividerType="DividerType.Middle" Class="my-6"/>
        <MudText GutterBottom="true">Select Reactor Type</MudText>
        <MudChip T="string" Color="Color.Secondary">RBMK-1000</MudChip><MudChip T="string">RBMK-1500</MudChip><MudChip T="string">RBMKP-2400</MudChip>
    </MudCardContent>
    <MudCardActions>
        <MudButton Variant="Variant.Text" Color="Color.Primary">Read more</MudButton>
    </MudCardActions>
</MudCard>
```

Vertical dividers can be used inside parents with a set height. If the parent doesn't have a set height but is displayed with flex, use the `Flexitem` property.

```razor title="DividerVerticalExample"
<MudPaper Square="true" Class="d-flex justify-space-around">
    <MudIconButton Icon="@Icons.Material.Filled.FormatAlignRight" Color="Color.Dark" Class="rounded-0" />
    <MudIconButton Icon="@Icons.Material.Filled.FormatAlignCenter" Color="Color.Dark" Class="rounded-0" />
    <MudIconButton Icon="@Icons.Material.Filled.FormatAlignLeft" Color="Color.Dark" Class="rounded-0" />

    <MudDivider Vertical="true" FlexItem="true" />

    <MudIconButton Icon="@Icons.Material.Filled.FormatBold" Color="Color.Dark" Class="rounded-0" />
    <MudIconButton Icon="@Icons.Material.Filled.FormatItalic" Color="Color.Dark" Class="rounded-0" />
    <MudIconButton Icon="@Icons.Material.Filled.FormatUnderlined" Color="Color.Dark" Class="rounded-0" />
</MudPaper>
```
