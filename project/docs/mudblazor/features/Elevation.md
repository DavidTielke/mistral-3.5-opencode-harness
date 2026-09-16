# Elevation

Elevation is the relative distance between two surfaces along the z-axis.

Below, we are using different levels of elevation in two different ways. All our components that have elevation also have the `Elevation` property where the elevation level (shadow) can be set.

 The same elevation types can be used with our predefined CSS classes.
 
Note: Elevation is disabled when a component supports and uses the `Outlined` property.

```razor title="ElevationUsageExample"
<MudPaper Elevation="0" Class="py-8 px-10">0</MudPaper>
<MudPaper Elevation="1" Class="py-8 px-10">1</MudPaper>
<MudPaper Elevation="4" Class="py-8 px-10">4</MudPaper>
<MudPaper Elevation="4" Outlined="true" Class="py-8 px-10">4</MudPaper>

<div class="mud-elevation-0 py-8 px-10 rounded white">0</div>
<div class="mud-elevation-1 py-8 px-10 rounded white">1</div>
<div class="mud-elevation-4 py-8 px-10 rounded white">4</div>
```

```razor title="ElevationPlaygroundExample"
<MudGrid>
    <MudItem xs="12" md="8" Class="d-flex justify-center align-center" Style="height:500px;">
        <MudPaper Style="@($"background-color:{ColorValue};")" Elevation="@Elevation" Outlined="@Outlined" Height="@($"{PaperHeight}px")" Width="@($"{PaperWidth}px")" />
    </MudItem>
    <MudItem xs="12" md="4">
        <MudPaper Class="pa-4 mt-6 mt-lg-16" Elevation="0">
            <MudText Typo="Typo.h6">Options</MudText>
            <MudText><b>Elevation:</b> @Elevation</MudText>
            <MudSlider @bind-Value="Elevation" Max="25" Min="0" Color="Color.Primary" />
            <MudText><b>Outlined:</b> @Outlined</MudText>
            <MudSwitch @bind-Value="Outlined" Color="Color.Primary" />
            <MudText><b>Color:</b> @ColorValue</MudText>
            <MudColorPicker Class="mb-2" @bind-Text="ColorValue" Variant="Variant.Outlined" Margin="Margin.Dense" />
            <MudText><b>Width:</b> @($"{PaperWidth}px")</MudText>
            <MudSlider @bind-Value="PaperWidth" Max="400" Min="0" Color="Color.Primary" />
            <MudText><b>Height:</b> @($"{PaperHeight}px")</MudText>
            <MudSlider @bind-Value="PaperHeight" Max="400" Min="0" Color="Color.Primary" />
        </MudPaper>
    </MudItem>
</MudGrid>

@code {
    public int PaperHeight { get; set; } = 300;
    public int PaperWidth { get; set; } = 300;
    public int Elevation { get; set; } = 5;
    public bool Outlined { get; set; } = false;
    public string ColorValue { get; set; } = "#f9f9f9";
}
```

Every component that has the `Elevation` property takes values in the range of 0 - 25, or you can access them with the CSS classes displayed below.
 
Note: Elevation 25 is a custom value past the original 0-24 values from Material Design, and it is intended to not continue the increasing values of the others.

```razor title="ElevationAllExample"
<MudPaper Elevation="0" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-0</MudPaper>
<MudPaper Elevation="1" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-1</MudPaper>
<MudPaper Elevation="2" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-2</MudPaper>
<MudPaper Elevation="3" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-3</MudPaper>
<MudPaper Elevation="4" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-4</MudPaper>
<MudPaper Elevation="5" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-5</MudPaper>
<MudPaper Elevation="6" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-6</MudPaper>
<MudPaper Elevation="7" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-7</MudPaper>
<MudPaper Elevation="8" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-8</MudPaper>
<MudPaper Elevation="9" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-9</MudPaper>
<MudPaper Elevation="10" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-10</MudPaper>
<MudPaper Elevation="11" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-11</MudPaper>
<MudPaper Elevation="12" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-12</MudPaper>
<MudPaper Elevation="13" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-13</MudPaper>
<MudPaper Elevation="14" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-14</MudPaper>
<MudPaper Elevation="15" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-15</MudPaper>
<MudPaper Elevation="16" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-16</MudPaper>
<MudPaper Elevation="17" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-17</MudPaper>
<MudPaper Elevation="18" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-18</MudPaper>
<MudPaper Elevation="19" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-19</MudPaper>
<MudPaper Elevation="20" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-20</MudPaper>
<MudPaper Elevation="21" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-21</MudPaper>
<MudPaper Elevation="22" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-22</MudPaper>
<MudPaper Elevation="23" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-23</MudPaper>
<MudPaper Elevation="24" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-24</MudPaper>
<MudPaper Elevation="25" Height="84px" Width="150px" Class="d-flex align-center justify-center ma-8">.mud-elevation-25</MudPaper>
```
