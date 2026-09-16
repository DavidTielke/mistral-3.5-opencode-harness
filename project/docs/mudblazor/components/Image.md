# Image

`MudImage` is used to embed an image in an HTML page. Images are not technically inserted into a page, but are linked to a file.

 The component represents the `<img>` tag and creates a holding space for the referenced image.

```razor title="ImageUsageExample"
<MudImage Src="images/mony.jpg" Alt="Mony the dog" Elevation="25" Class="rounded-lg"/>
```

If the `Src` image fails to load, the `FallbackSrc` will be loaded.

```razor title="ImageFallbackExample"
<MudTooltip Text="Valid source">
    <MudImage Src="images/jonny.jpg" Alt="Here's Johnny" Elevation="25" Class="rounded-lg ma-4" FallbackSrc="images/mony.jpg" />
</MudTooltip>
<MudTooltip Text="Invalid source (typo)">
    <MudImage Src="images/johnny.jpg" Alt="Here's Johnny" Elevation="25" Class="rounded-lg ma-4" FallbackSrc="images/mony.jpg" />
</MudTooltip>
```

Size can be set directly on the image with the `Width` and `Height` properties. This can be useful even for responsive images because setting them reserves space before the images load, which helps when pictures take a long time to appear.

```razor title="ImageSizeExample"
<MudImage Src="images/sweden.jpg" Width="200" Height="150" Alt="Swedish Farm House" Elevation="25" Class="rounded-lg ma-4"/>
<MudImage Src="images/sweden.jpg" Width="332" Height="250" Alt="Swedish Farm House" Elevation="25" Class="rounded-lg ma-4"/>
```

To get responsive images set the `Fluid` property to true. This applies max-width: 100%; and height: auto; so the image scales with the parent's width.

 Resize the example below to see how the image scales with the parent's width.

```razor title="ImageResponsiveExample"
<MudImage Fluid="true" Src="images/iceland.jpg" Alt="Swedish Farm House" Class="rounded-lg"/>
```

Use `ObjectFit` to control how an image should be resized.

```razor title="ImageFitExample"
<div class="d-flex justify-center">
    <MudImage ObjectFit="@ImageFit" Height="200" Width="400" Src="images/castle.jpg" Alt="Örebro Slott"  Elevation="25" Class="rounded-lg"/>
</div>

<MudChipSet T="string" CheckMark Class="mt-12">
    <MudChip Text="None" OnClick="@(() => SetImageFit(ObjectFit.None))" SelectedColor="Color.Primary" />
    <MudChip Text="Cover" OnClick="@(() => SetImageFit(ObjectFit.Cover))" SelectedColor="Color.Primary" Default="true"/>
    <MudChip Text="Contain" OnClick="@(() => SetImageFit(ObjectFit.Contain))" SelectedColor="Color.Primary" />
    <MudChip Text="Fill" OnClick="@(() => SetImageFit(ObjectFit.Fill))" SelectedColor="Color.Primary" />
    <MudChip Text="ScaleDown" OnClick="@(() => SetImageFit(ObjectFit.ScaleDown))" SelectedColor="Color.Primary" />
</MudChipSet>

@code {
    ObjectFit ImageFit = ObjectFit.Cover;

    void SetImageFit(ObjectFit value)
    {
        ImageFit = value;
    }
}
```

With the `ObjectPosition` property you can specify how an image should be positioned within its container.

```razor title="ImagePositionExample"
<div class="d-flex justify-center">
    <MudImage ObjectFit="ObjectFit.None" ObjectPosition="@ImagePosition" Height="200" Width="400" Src="images/iceland.jpg" Alt="Öxarárfoss, Iceland"  Elevation="25" Class="rounded-lg"/>
</div>

<MudChipSet T="string" CheckMark Class="mt-12">
    <MudChip Text="Center" OnClick="@(() => SetImagePosition(ObjectPosition.Center))" SelectedColor="Color.Primary" Default="true" />
    <MudChip Text="Top" OnClick="@(() => SetImagePosition(ObjectPosition.Top))" SelectedColor="Color.Primary" />
    <MudChip Text="Bottom" OnClick="@(() => SetImagePosition(ObjectPosition.Bottom))" SelectedColor="Color.Primary" />
    <MudChip Text="Left" OnClick="@(() => SetImagePosition(ObjectPosition.Left))" SelectedColor="Color.Primary" />
    <MudChip Text="Left Top" OnClick="@(() => SetImagePosition(ObjectPosition.LeftTop))" SelectedColor="Color.Primary" />
    <MudChip Text="Left Bottom" OnClick="@(() => SetImagePosition(ObjectPosition.LeftBottom))" SelectedColor="Color.Primary" />
    <MudChip Text="Right" OnClick="@(() => SetImagePosition(ObjectPosition.Right))" SelectedColor="Color.Primary" />
    <MudChip Text="Right Top" OnClick="@(() => SetImagePosition(ObjectPosition.RightTop))" SelectedColor="Color.Primary" />
    <MudChip Text="Right Bottom" OnClick="@(() => SetImagePosition(ObjectPosition.RightBottom))" SelectedColor="Color.Primary" />
</MudChipSet>

@code {
    ObjectPosition ImagePosition = ObjectPosition.Center;

    void SetImagePosition(ObjectPosition value)
    {
        ImagePosition = value;
    }
}
```

```razor title="ImagePlaygroundExample"
<MudGrid>
    <MudItem xs="12" md="8" Class="d-flex justify-center align-center" Style="height:500px;">
        <MudImage ObjectFit="ImageFit" Height="@(SetHeight ? ImageHeight : null)" Width="@(SetWidth ? ImageWidth : null)" Src="@($"images/{Image}")" Alt="Mony the dog" Elevation="25" Class="rounded-lg"/>
    </MudItem>
    <MudItem xs="12" md="4">
        <MudPaper Class="pa-4 mt-6 mt-lg-16" Elevation="0">
            <MudText Typo="Typo.h6">Options</MudText>
            <MudSelect Label="Image" Dense="true" Margin="Margin.Dense" @bind-Value="Image" Class="mt-4">
                <MudSelectItem T="string" Value="@("tractor.jpg")">Tractor</MudSelectItem>
                <MudSelectItem T="string" Value="@("door.jpg")">Door</MudSelectItem>
                <MudSelectItem T="string" Value="@("castle.jpg")">Castle</MudSelectItem>
                <MudSelectItem T="string" Value="@("iceland.jpg")">Iceland</MudSelectItem>
                <MudSelectItem T="string" Value="@("pilars.jpg")">Pilars</MudSelectItem>
                <MudSelectItem T="string" Value="@("sweden.jpg")">Sweden</MudSelectItem>
            </MudSelect>
            <MudSelect Label="Image Fit" Dense="true" Margin="Margin.Dense" @bind-Value="ImageFit" Class="mt-4">
                <MudSelectItem T="ObjectFit" Value="ObjectFit.None">None</MudSelectItem>
                <MudSelectItem T="ObjectFit" Value="ObjectFit.Cover">Cover</MudSelectItem>
                <MudSelectItem T="ObjectFit" Value="ObjectFit.Contain">Contain</MudSelectItem>
                <MudSelectItem T="ObjectFit" Value="ObjectFit.Fill">Fill</MudSelectItem>
                <MudSelectItem T="ObjectFit" Value="ObjectFit.ScaleDown">ScaleDown</MudSelectItem>
            </MudSelect>
            <div class="d-flex justify-space-between align-center mt-4">
                <MudText>Width: @(SetWidth ? $"{ImageWidth}px" : "Auto")</MudText>
                <MudSwitch @bind-Value="SetWidth" Color="Color.Primary" Class="mr-0" />
            </div>
            <MudSlider @bind-Value="ImageWidth" Disabled="@(!SetWidth)" Max="400" Color="Color.Primary"/>
            <div class="d-flex justify-space-between align-center mt-4">
                <MudText>Height: @(SetHeight ? $"{ImageHeight}px" : "Auto")</MudText>
                <MudSwitch @bind-Value="SetHeight" Color="Color.Secondary" Class="mr-0" />
            </div>
            <MudSlider @bind-Value="ImageHeight" Disabled="@(!SetHeight)" Max="350" Color="Color.Secondary"/>
        </MudPaper>
    </MudItem>
</MudGrid>

@code {
    public string Image { get; set; } = "tractor.jpg";
    
    public bool SetHeight { get; set; } = false;
    public bool SetWidth { get; set; } = true;
    
    public int ImageHeight { get; set; } = 300;
    public int ImageWidth { get; set; } = 300;

    public ObjectFit ImageFit { get; set; } = ObjectFit.Cover;
}
```
