# Card

```razor title="CardSimpleExample"
<MudCard>
    <MudCardContent>
        <MudText>Story of the day</MudText>
        <MudText Typo="Typo.body2">The quick, brown fox jumps over a lazy dog.</MudText>
    </MudCardContent>
    <MudCardActions>
        <MudButton Variant="Variant.Text" Color="Color.Primary">Learn more</MudButton>
    </MudCardActions>
</MudCard>
```

```razor title="CardOutlinedExample"
<MudCard Outlined="true">
    <MudCardContent>
        <MudText>Story of the day</MudText>
        <MudText Typo="Typo.body2">The quick, brown fox jumps over a lazy dog.</MudText>
    </MudCardContent>
    <MudCardActions>
        <MudButton Variant="Variant.Text" Color="Color.Primary">Learn more</MudButton>
    </MudCardActions>
</MudCard>
```

```razor title="CardHeaderExample"
<MudCard>
    <MudCardHeader>
        <CardHeaderContent>
            <MudText Typo="Typo.h6">The Story Book</MudText>
        </CardHeaderContent>
        <CardHeaderActions>
            <MudIconButton Icon="@Icons.Material.Filled.Settings" Color="Color.Default" />
        </CardHeaderActions>
    </MudCardHeader>
    <MudCardContent>
        <MudText>This day everything happened.</MudText>
        <MudText Typo="Typo.body2">The quick, brown fox jumps over a lazy dog.</MudText>
    </MudCardContent>
    <MudCardActions>
        <MudButton Variant="Variant.Text" Color="Color.Primary">Read more</MudButton>
    </MudCardActions>
</MudCard>
```

```razor title="CardMediaExample"
<MudCard>
    <MudCardMedia Image="images/door.jpg" Height="200" />
    <MudCardContent>
        <MudText Typo="Typo.h5">Old Paint</MudText>
        <MudText Typo="Typo.body2">Old paint found on a stone house door.</MudText>
        <MudText Typo="Typo.body2">This photo was taken in a small village in Istra Croatia.</MudText>
    </MudCardContent>
    <MudCardActions>
        <MudButton Variant="Variant.Text" Color="Color.Primary">Share</MudButton>
        <MudButton Variant="Variant.Text" Color="Color.Primary">Learn more</MudButton>
    </MudCardActions>
</MudCard>
```

```razor title="CardCombinedExample"
<MudCard>
    <MudCardHeader>
        <CardHeaderAvatar>
            <MudAvatar Color="Color.Secondary">I</MudAvatar>
        </CardHeaderAvatar>
        <CardHeaderContent>
            <MudText Typo="Typo.body1">Istra Croatia</MudText>
            <MudText Typo="Typo.body2">Peninsula in Europe</MudText>
        </CardHeaderContent>
        <CardHeaderActions>
            <MudIconButton Icon="@Icons.Material.Filled.Settings" Color="Color.Default" />
        </CardHeaderActions>
    </MudCardHeader>
    <MudCardMedia Image="images/pilars.jpg" Height="250" />
    <MudCardContent>
        <MudText Typo="Typo.body2">This photo was taken in a small village in Istra Croatia.</MudText>
    </MudCardContent>
    <MudCardActions>
        <MudIconButton Icon="@Icons.Material.Filled.Favorite" Color="Color.Default" />
        <MudIconButton Icon="@Icons.Material.Filled.Share" Color="Color.Default" />
    </MudCardActions>
</MudCard>
```
