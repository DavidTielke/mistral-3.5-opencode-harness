# Skeleton

The component can take the shape of 3 different variants.

```razor title="SkeletonVariantsExample"
<MudSkeleton />
<MudSkeleton SkeletonType="SkeletonType.Circle" Width="50px" Height="50px" />
<MudSkeleton SkeletonType="SkeletonType.Rectangle" Width="200px" Height="110px" />
```

The default animation is pulse, but you can disable it or change to wave.

```razor title="SkeletonAnimationsExample"
<MudSkeleton />
<MudSkeleton Animation="Animation.False" />
<MudSkeleton Animation="Animation.Wave" />
```

```razor title="SkeletonPulsateExample"
<MudCard>
    <MudSkeleton SkeletonType="SkeletonType.Rectangle" Height="200px"/>
    <MudCardContent>
        <MudSkeleton Width="30%" Height="42px;" />
        <MudSkeleton Width="80%" />
        <MudSkeleton Width="100%" />
    </MudCardContent>
    <MudCardActions>
        <MudSkeleton Width="64px" Height="40px" Class="ml-2" />
        <MudSkeleton Width="105px" Height="40px" Class="ml-3" />
    </MudCardActions>
</MudCard>

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

```razor title="SkeletonWaveExample"
<MudCard>
    <MudCardHeader>
        <CardHeaderAvatar>
            <MudSkeleton SkeletonType="SkeletonType.Circle" Animation="Animation.Wave" Height="40px" Width="40px"/>
        </CardHeaderAvatar>
        <CardHeaderContent>
            <MudSkeleton Animation="Animation.Wave" Width="40%" />
            <MudSkeleton Animation="Animation.Wave" Width="60%" />
        </CardHeaderContent>
    </MudCardHeader>
    <MudSkeleton SkeletonType="SkeletonType.Rectangle" Animation="Animation.Wave" Height="250px" />
    <MudCardContent>
        <MudSkeleton Animation="Animation.Wave" />
    </MudCardContent>
    <MudCardActions>
        <MudSkeleton SkeletonType="SkeletonType.Circle" Animation="Animation.Wave" Height="30px" Width="30px" Class="ml-2 mb-2" />
        <MudSkeleton SkeletonType="SkeletonType.Circle" Animation="Animation.Wave" Height="30px" Width="30px" Class="ml-3 mb-2" />
    </MudCardActions>
</MudCard>


<MudCard>
    <MudCardHeader>
        <CardHeaderAvatar>
            <MudAvatar>I</MudAvatar>
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
