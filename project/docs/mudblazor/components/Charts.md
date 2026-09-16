# Charts

```razor title="BarExample1"
<MudPaper Class="doc-section-component-container">
    <MudChart T="double" ChartType="ChartType.Bar" ChartSeries="@_series" @bind-SelectedIndex="_index" ChartLabels="@_xAxisLabels" ChartOptions="_axisChartOptions"
              Width="100%" Height="@($"{_height}px")" MatchBoundsToSize="@_matchBoundsToSize"></MudChart>
</MudPaper>

<MudGrid>
    <MudItem xs="6">
        <MudText Typo="Typo.body1" Class="py-3">Selected: @(_index < 0 ? "None" : _series[_index].Name)</MudText>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox @bind-Value="_matchBoundsToSize" Color="Color.Primary" Label="MatchBoundsToSize"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_height" Min="150" Max="500" Step="50">@($"Chart Height: {_height}px")</MudSlider>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_axisChartOptions.XAxisLabelRotation" Min="0" Max="90" Step="15">XAxis Label Rotation</MudSlider>
    </MudItem>
</MudGrid>

@code {

    private int _index = -1; //default value cannot be 0 -> first selectedindex is 0.
    private int _height = 350;
    private bool _matchBoundsToSize = false;
    private BarChartOptions _axisChartOptions = new BarChartOptions() 
    {
        XAxisTitle = "Months",
        YAxisTitle = "Sales",
        FixedBarWidth = 8,
    };
    private List<ChartSeries<double>> _series = new()
    {
        new() { Name = "United States", Data = new double[] { 40, 20, 25, 27, 46, 60, 48, 80, 15 } },
        new() { Name = "Germany", Data = new double[] { 19, 24, 35, 13, 28, 15, 13, 16, 31 } },
        new() { Name = "Sweden", Data = new double[] { 8, 6, 11, 13, 4, 16, 10, 16, 18 } },
    };
    private string[] _xAxisLabels = { "January", "February", "March", "April", "May", "June", "July", "August", "September" };
}
```

Set `ShowValues` in `BarChartOptions` to display the value above each bar.

```razor title="BarValueLabelsExample"
<MudChart T="double" ChartType="ChartType.Bar" ChartSeries="@_series" ChartLabels="@_xAxisLabels"
          ChartOptions="@_options" Width="100%" Height="350px" />

@code {
    private readonly BarChartOptions _options = new() { ShowValues = true };

    private readonly List<ChartSeries<double>> _series =
    [
        new() { Name = "United States", Data = new double[] { 40, 20, 25, 27, 46 } },
        new() { Name = "Germany", Data = new double[] { 19, 24, 35, 13, 28 } },
    ];

    private readonly string[] _xAxisLabels = { "Jan", "Feb", "Mar", "Apr", "May" };
}
```

## Further examples

```razor title="BarCustomGraphicsExample"
<MudChart T="double" ChartType="ChartType.Bar" ChartSeries="@Series" ChartLabels="@XAxisLabels" Width="100%" Height="350px">
    <CustomGraphics>
        <style>
            .heavy { font: bold 30px Helvetica; }
            .Rrrrr { font: italic 40px Helvetica; fill: rgb(62,44,221); }
        </style>
        <text x="80" y="35" class="heavy">I Love</text>
        <text x="105" y="70" class="Rrrrr">MudBlazor!</text>
    </CustomGraphics>
</MudChart>


@code {
    public List<ChartSeries<double>> Series = new()
    {
        new() { Name = "United States", Data = new double[] { 40, 20, 25, 27, 46, 60, 48, 80, 15 } },
        new() { Name = "Germany", Data = new double[] { 19, 24, 35, 13, 28, 15, 13, 16, 31 } },
        new() { Name = "Sweden", Data = new double[] { 8, 6, 11, 13, 4, 16, 10, 16, 18 } },
    };
    public string[] XAxisLabels = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" };
}
```

```razor title="DonutCustomGraphicsExample"
<MudChart T="int" ChartType="ChartType.Donut" Width="100%" Height="300px" ChartSeries="@Data.AsChartDataSet()" ChartLabels="@Labels">
    <CustomGraphics>
        <text class="mud-donut-text mud-typography-h3" x="50%" y="50%">@Data.Sum()</text>
    </CustomGraphics>
</MudChart>

@code {
    private static readonly int[] Data = [25, 77, 28, 5];
    private static readonly string[] Labels = ["Oil", "Coal", "Gas", "Biomass"];
}
```

```razor title="DonutExample1"
<MudPaper Class="pa-4">
    <MudChart T="double" ChartType="ChartType.Donut" Width="100%" Height="300px" @bind-SelectedIndex="Index" ChartSeries="@([data])" ChartLabels="@labels"></MudChart>
</MudPaper>
<MudPaper Class="pa-4 mt-2 d-flex justify-center">
    <MudButton OnClick="AddDataSize" Variant="Variant.Filled" Color="Color.Primary">Add</MudButton>
    <MudButton @onclick="RandomizeData" Variant="Variant.Filled" Class="mx-4">Randomize</MudButton>
    <MudButton OnClick="RemoveDataSize" Variant="Variant.Filled" Color="Color.Secondary">Remove</MudButton>  
</MudPaper>
<MudText Typo="Typo.h6">Selected portion of the chart: @Index</MudText>

@code {
    private int Index = -1; //default value cannot be 0 -> first selectedindex is 0.
    int dataSize = 4;
    public double[] data = { 50, 25, 20, 5 };
    public string[] labels = { "Fossil", "Nuclear", "Solar", "Wind", "Oil", "Coal", "Gas", "Biomass",
                                "Hydro", "Geothermal", "Nuclear Fusion", "Pumped Storage", "Solar", "Wind", "Oil",
                                "Coal", "Gas", "Biomass", "Hydro", "Geothermal" };

    Random random = new Random();

    void RandomizeData()
    {
        var new_data = new double[dataSize];
        for (int i = 0; i < new_data.Length; i++)
            new_data[i] = Math.Round(random.NextDouble() * 100, 2);
        data = new_data;
        StateHasChanged();
    }

    void AddDataSize()
    {
        if (dataSize < 20)
        {
            dataSize = dataSize + 1;
            RandomizeData();
        }
    }

    void RemoveDataSize()
    {
        if (dataSize > 0)
        {
            dataSize = dataSize - 1;
            RandomizeData();
        }
    }
}
```

```razor title="DonutExample2"
<MudChart T="double" ChartType="ChartType.Donut" LegendPosition="@LegendPosition" Width="100%" Height="300px"
          ChartSeries="@([data])" ChartLabels="@labels">
</MudChart>


<MudSelect Label="Legend Position" Variant="Variant.Outlined" Dense="true" T="@Position" ValueChanged="OnSelectedValue" Class="mt-4">
    <MudSelectItem T="Position" Value="Position.Top">Top</MudSelectItem>
    <MudSelectItem T="Position" Value="Position.Left">Left</MudSelectItem>
    <MudSelectItem T="Position" Value="Position.Right">Right</MudSelectItem>
    <MudSelectItem T="Position" Value="Position.Bottom">Bottom</MudSelectItem>
    <MudSelectItem T="Position" Value="Position.Start">Start</MudSelectItem>
    <MudSelectItem T="Position" Value="Position.End">End</MudSelectItem>
</MudSelect>

@code {
    public double[] data = { 25, 77, 28, 5 };
    public string[] labels = { "Oil", "Coal", "Gas", "Biomass" };

    public Position LegendPosition { get; set; } = Position.Bottom;

    private void OnSelectedValue(Position value)
    {
        switch(value)
        {
            case Position.Top:
                LegendPosition = Position.Top;
                break;
            case Position.Left:
                LegendPosition = Position.Left;
                break;
            case Position.Right:
                LegendPosition = Position.Right;
                break;
            case Position.Bottom:
                LegendPosition = Position.Bottom;
                break;
            case Position.Start:
                LegendPosition = Position.Start;
                break;
            case Position.End:
                LegendPosition = Position.End;
                break;
        }
    }
}
```

```razor title="DynamicChartExample1"
<MudPaper Class="doc-section-component-container mx-8">
    <MudToolBar>
        <MudMenu Modal="false" Variant="Variant.Outlined" EndIcon="@_menuIcons[_chartType]" IconColor="Color.Primary" Label="Chart Type">
            <MudMenuItem Icon="@_menuIcons[ChartType.Bar]" Label="Bar" OnClick="() => _chartType = ChartType.Bar" Disabled="@(_chartType == ChartType.Bar)"/>
            <MudMenuItem Icon="@_menuIcons[ChartType.StackedBar]" Label="Stacked Bar" OnClick="() => _chartType = ChartType.StackedBar" Disabled="@(_chartType == ChartType.StackedBar)" />
            <MudMenuItem Icon="@_menuIcons[ChartType.Line]" Label="Line" OnClick="() => _chartType = ChartType.Line" Disabled="@(_chartType == ChartType.Line)" />
            <MudMenuItem Icon="@_menuIcons[ChartType.Pie]" Label="Pie" OnClick="() => _chartType = ChartType.Pie" Disabled="@(_chartType == ChartType.Pie)" />
            <MudMenuItem Icon="@_menuIcons[ChartType.Donut]" Label="Donut" OnClick="() => _chartType = ChartType.Donut" Disabled="@(_chartType == ChartType.Donut)" />
            <MudMenuItem Icon="@_menuIcons[ChartType.Rose]" Label="Rose" OnClick="() => _chartType = ChartType.Rose" Disabled="@(_chartType == ChartType.Rose)"/>
            <MudMenuItem Icon="@_menuIcons[ChartType.Radar]" Label="Radar" OnClick="() => _chartType = ChartType.Radar" Disabled="@(_chartType == ChartType.Radar)"  />
        </MudMenu>
    </MudToolBar>

    <MudChart T="double" ChartType="_chartType"
              ChartSeries="_dataSet"
              ChartLabels="@_labels"
              Width="100%" Height="400px" CanHideSeries MatchBoundsToSize />
</MudPaper>

@code {
    private Dictionary<ChartType, string> _menuIcons = new()
    {
        { ChartType.Bar, Icons.Material.Filled.BarChart },
        { ChartType.StackedBar, Icons.Material.Filled.StackedBarChart },
        { ChartType.Line, Icons.Material.Filled.ShowChart },
        { ChartType.Pie, Icons.Material.Filled.PieChart },
        { ChartType.Donut, Icons.Material.Filled.DonutLarge },
        { ChartType.Rose, Icons.Material.Filled.DonutSmall },
        { ChartType.Radar, Icons.Material.Filled.Hub },
    };

    private ChartType _chartType = ChartType.Bar;
    private string[] _labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    private List<ChartSeries<double>> _dataSet =>
    [
            new() { Name = "United Kingdom", Data = new([60, 54, 23, 42, 67, 31]) },
            new() { Name = "United States",  Data = new([40, 12, 32, 58, 43, 65]) },
            new() { Name = "Greenland",      Data = new([47, 30, 43, 25, 59, 63]) },
            new() { Name = "Norway",         Data = new([14, 27, 65, 43, 21, 58]) },
    ];
}
```

```razor title="HeatMapExample1"
<MudPaper Class="pa-4">
    <MudChart T="double" ChartType="ChartType.HeatMap" ChartSeries="@_series" ChartOptions="@_options"
              ChartLabels="@_xLabels" Width="100%" Height="350px"></MudChart>
</MudPaper>
<MudPaper Class="pa-4 mt-2 d-flex justify-center">
    <MudButton OnClick="AddColor" Disabled="@(_colorCount >= 5)" Variant="Variant.Filled" Color="Color.Primary">Add Color</MudButton>
    <MudButton @onclick="RandomizeData" Variant="Variant.Filled" Class="mx-4">Randomize</MudButton>
    <MudButton OnClick="RemoveColor" Disabled="@(_colorCount <= 1)" Variant="Variant.Filled" Color="Color.Secondary">Remove Color</MudButton>
</MudPaper>

<MudStack Row Justify="Justify.Center">
    @for (var i = 0; i < _colors.Length; i++)
    {
        <MudPaper Class="pa-2 mx-1"
                  Style="@($"background-color: {_colors[i]}; width: 50px; height: 50px;{(i > _colorCount -1 ? string.Empty : "border: 2px solid black;" )}")">
        </MudPaper>
    }
</MudStack>

<MudText Align="Align.Center" Typo="Typo.h6">Number of Colors Selected: @_colorCount</MudText>

@code {
    private int _colorCount = 1;
    private readonly string[] _colors = ["#5AC8FA", "#34C759", "#007AFF", "#FFCC00", "#e03131"];
    private List<ChartSeries<double>> _series = [];
    private ChartOptions _options = new();
    private string[] _xLabels = [];

    protected override void OnInitialized()
    {
        base.OnInitialized();
        BuildOptions();
        RandomizeData();
    }

    private void AddColor()
    {
        _colorCount++;
        BuildOptions();
    }

    private void RemoveColor()
    {
        _colorCount--;
        BuildOptions();
    }

    private void BuildOptions()
    {
        var options = new ChartOptions
        {
            ShowToolTips = false,
            ChartPalette = _colors.Take(_colorCount).ToArray()
        };
        _options = options;
    }

    private void RandomizeData()
    {
        string[] xaxis = ["A", string.Empty, "C",];
        var heatMapSeries = new List<ChartSeries<double>>();
        var dataPoints = xaxis.Length;
        foreach (var x in xaxis)
        {
            var data = new double[dataPoints];
            for (int i = 0; i < dataPoints; i++)
            {
                data[i] = Math.Round(Random.Shared.NextDouble() * 100, 2);
            }
            heatMapSeries.Add(new ChartSeries<double> { Name = x, Data = data });
        }
        _xLabels = xaxis;
        _series = heatMapSeries;
        BuildOptions();
    }
}
```

```razor title="HeatMapExample2"
<MudPaper Class="pa-4">
    <MudChart T="double" ChartType="ChartType.HeatMap" ChartSeries="@_series" ChartOptions="@_options"
              ChartLabels="@_xLabels" Width="100%" Height="350px"></MudChart>
</MudPaper>
<MudPaper Class="pa-4 mt-2 d-flex justify-center">
    <MudGrid Spacing="2" Class="d-flex">
        <MudItem xs="4">
            <MudStack Row AlignItems="AlignItems.Center" Justify="Justify.Center">
                <MudText Class="pr-1">YAxis Labels</MudText>
                <MudSelect T="YAxisLabelPosition" @bind-Value="@_yAxisLabelPosition" @bind-Value:after="BuildOptions" FullWidth="true">
                    <MudSelectItem Value="YAxisLabelPosition.Left">Left</MudSelectItem>
                    <MudSelectItem Value="YAxisLabelPosition.Right">Right</MudSelectItem>
                    <MudSelectItem Value="YAxisLabelPosition.None">None</MudSelectItem>
                </MudSelect>
            </MudStack>
        </MudItem>
        <MudItem xs="4" Class="d-flex align-center justify-center">
            <MudButton @onclick="RandomizeData" Variant="Variant.Filled" Class="mx-4">Randomize</MudButton>
        </MudItem>
        <MudItem xs="4">
            <MudStack Row AlignItems="AlignItems.Center" Justify="Justify.Center">
                <MudText Class="pr-1">XAxis Labels</MudText>
                <MudSelect T="XAxisLabelPosition" @bind-Value="@_xAxisLabelPosition" @bind-Value:after="BuildOptions" FullWidth="true">
                    <MudSelectItem Value="XAxisLabelPosition.Top">Top</MudSelectItem>
                    <MudSelectItem Value="XAxisLabelPosition.Bottom">Bottom</MudSelectItem>
                    <MudSelectItem Value="XAxisLabelPosition.None">None</MudSelectItem>
                </MudSelect>
            </MudStack>
        </MudItem>
    </MudGrid>
</MudPaper>

@code {
    private readonly string[] _colors = ["#5AC8FA", "#34C759", "#007AFF"];
    private List<ChartSeries<double>> _series = [];
    private HeatMapChartOptions _options = new();
    private XAxisLabelPosition _xAxisLabelPosition = XAxisLabelPosition.Top;
    private YAxisLabelPosition _yAxisLabelPosition = YAxisLabelPosition.Left;
    private string[] _xLabels = [];

    protected override void OnInitialized()
    {
        base.OnInitialized();
        BuildOptions();
        RandomizeData();
    }

    private void BuildOptions()
    {
        var options = new HeatMapChartOptions
        {
            ChartPalette = _colors,
            XAxisLabelPosition = _xAxisLabelPosition,
            YAxisLabelPosition = _yAxisLabelPosition
        };
        _options = options;
    }

    private void RandomizeData()
    {
        string[] xaxis = ["A", "B", "C",];
        var heatMapSeries = new List<ChartSeries<double>>();
        var dataPoints = xaxis.Length;
        foreach (var x in xaxis)
        {
            var data = new double[dataPoints];
            for (int i = 0; i < dataPoints; i++)
            {
                data[i] = Math.Round(Random.Shared.NextDouble() * 100, 2);
            }
            heatMapSeries.Add(new ChartSeries<double> { Name = x, Data = data });
        }
        _xLabels = xaxis;
        _series = heatMapSeries;
        BuildOptions();
    }
}
```

```razor title="HeatMapExample3"
<MudPaper Class="pa-4">
    <MudChart T="double" ChartType="ChartType.HeatMap" ChartSeries="@_series" ChartOptions="@_options"
              ChartLabels="@_xLabels" Width="100%" Height="350px"></MudChart>
</MudPaper>
<MudPaper Class="pa-4 mt-2 d-flex justify-center">
    <MudItem xs="4" Class="d-flex align-center">
        <MudCheckBox T="bool" @bind-Value="_enableSmoothGradient" @bind-Value:after="BuildOptions" Color="Color.Primary">
            Smooth Gradient
        </MudCheckBox>
    </MudItem>
    <MudButton @onclick="RandomizeData" Variant="Variant.Filled" Class="mx-4">Randomize</MudButton>
</MudPaper>

@code {
    private bool _enableSmoothGradient = true;
    private readonly string[] _colors = ["#5AC8FA", "#34C759", "#007AFF"];
    private List<ChartSeries<double>> _series = [];
    private HeatMapChartOptions _options = new();
    private string[] _xLabels = [];

    protected override void OnInitialized()
    {
        base.OnInitialized();
        BuildOptions();
        RandomizeData();
    }

    private void BuildOptions()
    {
        var options = new HeatMapChartOptions
        {
            ChartPalette = _colors,
            EnableSmoothGradient = _enableSmoothGradient
        };
        _options = options;
    }

    private void RandomizeData()
    {
        string[] xaxis = ["A", string.Empty, "C",];
        var heatMapSeries = new List<ChartSeries<double>>();
        var dataPoints = xaxis.Length;
        foreach (var x in xaxis)
        {
            var data = new double[dataPoints];
            for (int i = 0; i < dataPoints; i++)
            {
                data[i] = Math.Round(Random.Shared.NextDouble() * 100, 2);
            }
            heatMapSeries.Add(new ChartSeries<double> { Name = x, Data = data });
        }
        _xLabels = xaxis;
        _series = heatMapSeries;
        BuildOptions();
    }
}
```

```razor title="HeatMapExample4"
@using MudBlazor.Utilities


<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

<MudGrid>
    <MudItem xs="2" Class="d-flex align-center">
        <MudRadioGroup T="Position" Value="_showLegendPosition" ValueChanged="@((Position value) => ShowLegendPositionChanged(value))" Class="d-flex flex-column align-center justify-center">

            <!-- Top Radio -->
            <MudItem xs="12" Class="d-flex justify-center align-center">
                <MudRadio Color="Color.Primary" Value="Position.Top" LabelPlacement="Placement.Top" Dense>Top</MudRadio>
            </MudItem>

            <MudItem xs="12" Class="d-flex justify-center py-2">
                <MudGrid Class="align-center justify-center">
                    <!-- Left Radio -->
                    <MudItem xs="4" Class="d-flex align-center justify-center">
                        <MudRadio Color="Color.Primary" Value="Position.Left" LabelPlacement="Placement.Left" Dense>L</MudRadio>
                    </MudItem>

                    <!-- Center Badge -->
                    <MudItem xs="4" Class="d-flex align-center justify-center">
                        <MudBadge Origin="@_anchorOrigin" Color="Color.Primary" Dot="true" Overlap Elevation="4" BadgeClass="ma-2">
                            <MudPaper Elevation="0" Outlined="true" Class="pa-6">
                                <MudText Align="Align.Center">Heat Map</MudText>
                            </MudPaper>
                        </MudBadge>
                    </MudItem>

                    <!-- Right Radio -->
                    <MudItem xs="4" Class="d-flex align-center justify-center">
                        <MudRadio Color="Color.Primary" Value="Position.Right" Dense>R</MudRadio>
                    </MudItem>
                </MudGrid>
            </MudItem>

            <!-- Bottom Radio -->
            <MudItem xs="12" Class="d-flex justify-center align-center">
                <MudRadio Color="Color.Primary" Value="Position.Bottom" LabelPlacement="Placement.Bottom" Dense>Bottom</MudRadio>
            </MudItem>

        </MudRadioGroup>
    </MudItem>
    <MudItem xs="10">
        <MudChart T="double" ChartType="ChartType.HeatMap" ChartSeries="@_series" Height="400px" Width="100%"
                  ChartLabels="@_xAxisLabels" ChartOptions="@_options" LegendPosition="_showLegendPosition">
            <MudHeatMapCell Row="0" Column="0">
                <!-- Font Icons act differently and should resize dynamically without specifying width/height -->
                <MudIcon Icon="material-symbols-outlined/database" Color="Color.Primary" />
            </MudHeatMapCell>
            <MudHeatMapCell Row="1" Column="0" Value="72.192304983">
                <!-- text tag doesn't need resized so no width/height -->
                <text dominant-baseline="middle" text-anchor="middle" fill="black" font-family="Helvetica" font-size="14">N/A</text>
            </MudHeatMapCell>
            <MudHeatMapCell Row="2" Column="0" Width="24" Height="24">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <!-- Face Circle -->
                    <circle cx="12" cy="12" r="11" stroke="black" stroke-width="1" fill="#FFD700" />
                    <!-- Left Eye -->
                    <circle cx="8" cy="9" r="1.5" fill="black" />
                    <!-- Right Eye -->
                    <circle cx="16" cy="9" r="1.5" fill="black" />
                    <!-- Smile -->
                    <path d="M7,14 Q12,17 17,14" stroke="black" stroke-width="1" fill="none" />
                </svg>
            </MudHeatMapCell>
            <MudHeatMapCell Row="3" Column="0" Width="24" Height="24">
                <MudIcon Icon="@Icons.Material.Filled.Face" Color="Color.Secondary" />
            </MudHeatMapCell>
            <MudHeatMapCell Row="4" Column="0" Value="33.912384" />
            <MudHeatMapCell Row="5" Column="0">
                NO
            </MudHeatMapCell>
            <MudHeatMapCell Row="6" Column="0" MudColor="@(new MudColor("#FF5733"))" />
        </MudChart>
    </MudItem>
</MudGrid>
<MudGrid Spacing="2" Class="d-flex">
    <MudItem xs="2" Class="d-flex align-center">
        <MudButton OnClick="@RandomizeData" Variant="Variant.Filled">Randomize Data</MudButton>
    </MudItem>
    <MudItem xs="2" Class="d-flex align-center">
        <MudCheckBox T="bool" @bind-Value="_enableGradient" @bind-Value:after="BuildOptions" Color="Color.Primary">
            Smooth Gradient
        </MudCheckBox>
    </MudItem>
    <MudItem xs="2" Class="d-flex align-center justify-left">
        <MudSelect T="YAxisLabelPosition" @bind-Value="@_yAxisLabelPosition" @bind-Value:after="BuildOptions" FullWidth="true" Label="YAxis Labels">
            <MudSelectItem Value="YAxisLabelPosition.Left">Left</MudSelectItem>
            <MudSelectItem Value="YAxisLabelPosition.Right">Right</MudSelectItem>
            <MudSelectItem Value="YAxisLabelPosition.None">None</MudSelectItem>
        </MudSelect>
    </MudItem>
    <MudItem xs="2" Class="d-flex align-center justify-left">
        <MudSelect T="XAxisLabelPosition" @bind-Value="@_xAxisLabelPosition" @bind-Value:after="BuildOptions" FullWidth="true" Label="XAxis Labels">
            <MudSelectItem Value="XAxisLabelPosition.Top">Top</MudSelectItem>
            <MudSelectItem Value="XAxisLabelPosition.Bottom">Bottom</MudSelectItem>
            <MudSelectItem Value="XAxisLabelPosition.None">None</MudSelectItem>
        </MudSelect>
    </MudItem>
    <MudItem xs="2" Class="d-flex align-center">
        <MudNumericField Label="Number of Colors Used" @bind-Value="_colorCount" @bind-Value:after="BuildOptions" Min="1" Max="5" Step="1" />
    </MudItem>
    <MudItem xs="2"></MudItem>
    <MudItem xs="2" Class="d-flex align-center">
        <MudCheckBox T="bool" @bind-Value="@_legendVisible" @bind-Value:after="BuildOptions" Color="Color.Primary">
            Show Legend
        </MudCheckBox>
    </MudItem>
    <MudItem xs="3" Class="d-flex align-center">
        <MudCheckBox T="bool" @bind-Value="@_showLegendValues" @bind-Value:after="BuildOptions" Color="Color.Primary">
            Show Legend Values
        </MudCheckBox>
    </MudItem>
    <MudItem xs="2" Class="d-flex align-center">
        <MudCheckBox T="bool" @bind-Value="@_showValueLabels" @bind-Value:after="BuildOptions" Color="Color.Primary">
            Show Values
        </MudCheckBox>
    </MudItem>
    <MudItem xs="3" Class="d-flex align-center">
        <MudCheckBox T="bool" @bind-Value="@_showValueToolTips" @bind-Value:after="BuildOptions" Color="Color.Primary">
            Show Value Tooltips
        </MudCheckBox>
    </MudItem>
</MudGrid>

@code {
    private HeatMapChartOptions _options = new();
    private List<ChartSeries<double>> _series = [];
    private XAxisLabelPosition _xAxisLabelPosition = XAxisLabelPosition.Bottom;
    private YAxisLabelPosition _yAxisLabelPosition = YAxisLabelPosition.Left;
    private bool _enableGradient = false;
    private bool _showValueLabels = true;
    private bool _showLegendValues = true;
    private bool _showValueToolTips = true;
    private bool _legendVisible = true;
    private Position _showLegendPosition = Position.Bottom;
    private Origin _anchorOrigin = Origin.BottomCenter;
    private int _colorCount = 5;
    private readonly string[] _colors = ["#5AC8FA", "#34C759", "#007AFF", "#FFCC00", "#e03131"];
    private readonly List<ChartSeries<double>> _heatMapSeries =
        [
        new() { Name = "Mo", Data = new([90, 79, 72, 69, 62, 62, 55, 65, 70]) },
        new() { Name = "Te", Data = new([35, 41, 35, 51, 49, 62, 69, 91, 148]) },
        new() { Name = "We", Data = new([22, 90, 62, 32, 05, 42, 63, 43, 155]) },
        new() { Name = "Th", Data = new([35, 41, 35, 51, 49, 62, 69, 91, 148]) },
        new() { Name = "Fr", Data = new([22, 90, 62, 32, 05, 42, 63, 43, 155]) },
        new() { Name = "Sa", Data = new([35, 41, 35, 51, 49, 62, 69, 91, 148]) },
        new() { Name = "Su", Data = new([22, 90, 62, 32, 05, 42, 63, 43, 155]) }
    ];
    private string[] _xAxisLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

    protected override void OnInitialized()
    {
        base.OnInitialized();
        _series = _heatMapSeries;
        BuildOptions();
    }

    private void ShowLegendPositionChanged(Position value)
    {
        _showLegendPosition = value;
        _anchorOrigin = value switch
        {
            Position.Top => Origin.TopCenter,
            Position.Left => Origin.CenterLeft,
            Position.Right => Origin.CenterRight,
            Position.Bottom => Origin.BottomCenter,
            _ => _anchorOrigin
        };
        BuildOptions();
    }

    private void BuildOptions()
    {
        _options = new HeatMapChartOptions
        {
            XAxisLabelPosition = _xAxisLabelPosition,
            YAxisLabelPosition = _yAxisLabelPosition,
            EnableSmoothGradient = _enableGradient,
            ChartPalette = _colors.Take(_colorCount).ToArray(),
            ShowLabels = _showValueLabels,
            ShowLegend = _legendVisible,
            ShowLegendLabels = _showLegendValues,
            ShowToolTips = _showValueToolTips,
        };
        StateHasChanged();
    }

    private void RandomizeData()
    {
        var newSeries = new List<ChartSeries<double>>();
        string[] days = ["Mo", "Te", "We", "Th", "Fr", "Sa", "Su"];
        const int DataPoints = 9;

        foreach (var day in days)
        {
            var data = new double[DataPoints];
            for (int i = 0; i < DataPoints; i++)
            {
                data[i] = Random.Shared.NextDouble() * 100;
            }
            newSeries.Add(new() { Name = day, Data = data });
        }

        _series = newSeries;
    }
}
```

```razor title="HeatMapExample5"
<MudPaper Class="pa-4">
    <MudChart T="double" ChartType="ChartType.HeatMap" ChartSeries="@_series" ChartOptions="@_options"
              ChartLabels="@_xLabels" Width="100%" Height="350px"></MudChart>
</MudPaper>
<MudPaper Class="pa-4 mt-2 d-flex justify-center">
    <MudGrid Spacing="2" Class="d-flex">
        <MudItem xs="4" Class="d-flex align-center">
            <MudCheckBox T="bool" @bind-Value="@_showValueLabels" @bind-Value:after="BuildOptions" Color="Color.Primary">
                Show Values
            </MudCheckBox>
        </MudItem>
        <MudItem xs="4" Class="d-flex align-center justify-center">
            <MudButton @onclick="RandomizeData" Variant="Variant.Filled" Class="mx-4">Randomize</MudButton>
        </MudItem>
        <MudItem xs="4" Class="d-flex align-center">
            <MudCheckBox T="bool" @bind-Value="@_showValueToolTips" @bind-Value:after="BuildOptions" Color="Color.Primary">
                Show Value Tooltips
            </MudCheckBox>
        </MudItem>
    </MudGrid>
</MudPaper>

@code {
    private readonly string[] _colors = ["#5AC8FA", "#34C759", "#007AFF"];
    private List<ChartSeries<double>> _series = [];
    private HeatMapChartOptions _options = new();
    private bool _showValueLabels = false;
    private bool _showValueToolTips = true;
    private string[] _xLabels = [];

    protected override void OnInitialized()
    {
        base.OnInitialized();
        BuildOptions();
        RandomizeData();
    }

    private void BuildOptions()
    {
        var options = new HeatMapChartOptions
        {
            ChartPalette = _colors,
            ShowLabels = _showValueLabels,
            ShowToolTips = _showValueToolTips
        };
        _options = options;
    }

    private void RandomizeData()
    {
        string[] xaxis = ["A", "B", "C",];
        var heatMapSeries = new List<ChartSeries<double>>();
        var dataPoints = xaxis.Length;
        foreach (var x in xaxis)
        {
            var data = new double[dataPoints];
            for (int i = 0; i < dataPoints; i++)
            {
                data[i] = Math.Round(Random.Shared.NextDouble() * 100, 2);
            }
            heatMapSeries.Add(new() { Name = x, Data = data });
        }
        _xLabels = xaxis;
        _series = heatMapSeries;
        BuildOptions();
    }
}
```

```razor title="HeatMapExample6"
@using MudBlazor.Utilities


<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

<MudPaper Class="pa-4">
    <MudChart T="int" ChartType="ChartType.HeatMap" ChartSeries="@_series" ChartOptions="@_options"
              ChartLabels="@_xLabels" Width="100%" Height="300px">
    <!-- Setting Value for weekend to 0 and weekday to 1 to let Color Palette do the magic -->
        <MudHeatMapCell Row="0" Column="0" Value="0">
            <MudIcon Icon="material-symbols-outlined/rainy" Color="Color.Secondary" />
        </MudHeatMapCell>
        <MudHeatMapCell Row="0" Column="1" Value="1">
            <MudIcon Icon="material-symbols-outlined/sunny" Color="Color.Secondary" />
        </MudHeatMapCell>
        <MudHeatMapCell Row="0" Column="2" Value="1">
            <MudIcon Icon="material-symbols-outlined/foggy" Color="Color.Secondary" />
        </MudHeatMapCell>
        <MudHeatMapCell Row="0" Column="3" Value="1" Width="24" MudColor="@(new MudColor("#FF5733"))">
            <MudIcon Icon="@Icons.Material.Outlined.Thunderstorm" Color="Color.Dark" />
        </MudHeatMapCell>
        <MudHeatMapCell Row="0" Column="4" Value="1">
            <MudIcon Icon="material-symbols-outlined/rainy" Color="Color.Secondary" />
        </MudHeatMapCell>
        <MudHeatMapCell Row="0" Column="5" Value="1">
            <MudIcon Icon="material-symbols-outlined/sunny" Color="Color.Secondary" />
        </MudHeatMapCell>
        <MudHeatMapCell Row="0" Column="6" Value="0">
            <MudIcon Icon="material-symbols-outlined/sunny" Color="Color.Secondary" />
        </MudHeatMapCell>
    </MudChart>
</MudPaper>

@code {
    private readonly string[] _colors = ["#5AC8FA", "#34C759", "#007AFF"];
    private List<ChartSeries<int>> _series = [];
    private HeatMapChartOptions _options = new();
    private string[] _xLabels = [];

    protected override void OnInitialized()
    {
        base.OnInitialized();
        WeeklyData();
        BuildOptions();
    }

    private void BuildOptions()
    {
        var options = new HeatMapChartOptions
        {
            ChartPalette = _colors,
            YAxisLabelPosition = YAxisLabelPosition.None,
            ShowLegend = false,
            XAxisLabelPosition = XAxisLabelPosition.Top,
            ShowToolTips = false,
            ShowLabels = false
        };
        _options = options;
    }

    private void WeeklyData()
    {
        string[] xaxis = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
        var heatMapSeries = new List<ChartSeries<int>>();
        var dataPoints = xaxis.Length;
        var data = new int[dataPoints];
        for (int i = 0; i < dataPoints; i++)
        {
            data[i] = i;
        }
        heatMapSeries.Add(new() { Name = string.Empty, Data = data });
        _xLabels = xaxis;
        _series = heatMapSeries;
    }
}
```

```razor title="HeatMapExample7"
<MudTabs Rounded ApplyEffectsToContainer TabPanelsClass="pa-6" Color="Color.Primary" Centered>
    <MudTabPanel Text="Example One">
        <MudChart T="double" ChartType="ChartType.HeatMap"
                    ChartSeries="@exampleOne"
                    ChartOptions="@chartOptions"
                    ChartLabels="@testLabels"
                    Width="100%" Height="300px">
            <MudHeatMapCell Row="0" Column="0" MinValue="@(_useOverride ? 0 : null)" MaxValue="@(_useOverride ? .95 : null)" />
        </MudChart>
    </MudTabPanel>
    <MudTabPanel Text="Example Two">
        <MudChart T="double" ChartType="ChartType.HeatMap"
                    ChartSeries="@exampleTwo"
                    ChartOptions="@chartOptions"
                    ChartLabels="@testLabels"
                    Width="100%" Height="300px">
            <MudHeatMapCell Row="0" Column="0" MinValue="@(_useOverride ? 0 : null)" MaxValue="@(_useOverride ? .95 : null)" />
        </MudChart>
    </MudTabPanel>
</MudTabs>
<MudStack Row Justify="Justify.Center" Spacing="5">
    <MudSwitch Class="mx-auto" Label="Include Override" @bind-Value="_useOverride" />
    <MudSwitch Class="mx-auto" Label="Show Legend" @bind-Value="_showLegend" @bind-Value:after="UpdateLegend" />
</MudStack>

@code {
    private const string COLOR_PERFECT = "#008f00";
    private const string COLOR_GOOD = "#66ff66";
    private const string COLOR_BAD = "#ff4d4d";
    private const string COLOR_HORRIBLE = "#b80000";
    private bool _useOverride;
    private bool _showLegend = true;

    private HeatMapChartOptions chartOptions = new()
    {
        ChartPalette = [COLOR_HORRIBLE, COLOR_BAD, COLOR_GOOD, COLOR_PERFECT],
        XAxisLabelPosition = XAxisLabelPosition.Top,
        ValueFormatString = "P0",
        ShowLegend = false,
        ShowToolTips = true,
    };

    private readonly string[] testLabels = ["Test 1", "Test 2", "Test 3", "Test 4"];

    private readonly List<ChartSeries<double>> exampleOne =
        [
        new() { Name = "Student 1", Data = new([.40, .72, .64, .92]) },
        new() { Name = "Student 2", Data = new([.80, .71, .97, .75]) },
        new() { Name = "Student 3", Data = new([.92, .84, .85, .97]) },
        new() { Name = "Student 4", Data = new([.79, .99, .87, .69]) },
    ];

    private readonly List<ChartSeries<double>> exampleTwo =
        [
        new() { Name = "Student 1", Data = new([.40, .52, .64, .32]) },
        new() { Name = "Student 2", Data = new([.32, .65, .48, .66]) },
        new() { Name = "Student 3", Data = new([.35, .34, .55, .67]) },
        new() { Name = "Student 4", Data = new([.30, .63, .36, .62]) },
    ];

    protected override void OnInitialized()
    {
        UpdateLegend();
    }

    private void UpdateLegend()
    {
        chartOptions.ShowLegend = _showLegend;
        StateHasChanged();
    }
}
```

```razor title="LineExample1"
@using MudBlazor.Charts;



<MudPaper Class="doc-section-component-container">
    <MudChart T="double" ChartType="ChartType.Line" ChartSeries="@_series" ChartLabels="@_xAxisLabels" ChartOptions="@_options" Width="100%" Height="@($"{_height}px")"
              @bind-SelectedIndex="_index" MatchBoundsToSize="_matchBoundsToSize"/>
</MudPaper>

<MudGrid>
    <MudItem md="6" xs="12">
        <MudText Typo="Typo.body1" Class="py-3">Selected: @(_index < 0 ? "None" : _series[_index].Name)</MudText>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox @bind-Value="_matchBoundsToSize" Label="MatchBoundsToSize"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_height" Min="150" Max="500">@($"Chart Height: {_height}px")</MudSlider>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_options.LineStrokeWidth" Min="1" Max="10">Line Width: @_options.LineStrokeWidth.ToString()</MudSlider>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox T="bool" ValueChanged="(v)=> _options.SeriesDisplayOverrides[_series[0]].LineDisplayType = v ? LineDisplayType.Area : LineDisplayType.Line" Label="Fossil as Area"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox T="bool" ValueChanged="(v)=> _options.SeriesDisplayOverrides[_series[1]].LineDisplayType = v ? LineDisplayType.Area : LineDisplayType.Line" Label="Renewable as Area"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_options.XAxisLabelRotation" Min="0" Max="90" Step="15">XAxis Label Rotation</MudSlider>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox T="bool" ValueChanged="(v)=> _options.ShowDataMarkers = v" Label="Show Data Markers"></MudCheckBox>
    </MudItem>
</MudGrid>

@code {
    private int _index = -1; //default value cannot be 0 -> first selectedindex is 0.
    private LineChartOptions _options = new LineChartOptions()
    {
        XAxisTitle = "Months",
        YAxisTitle = "Sales",
    };

    private int _height = 350;
    private bool _matchBoundsToSize = false;

    private List<ChartSeries<double>> _series = new List<ChartSeries<double>>()
    {
        new ChartSeries<double>() { Name = "Fossil", Data = new double[] { 90, 79, 72, 69, 62, 62, 55, 65, 70 } },
        new ChartSeries<double>() { Name = "Renewable", Data = new double[] { 10, 41, 35, 51, 49, 62, 69, 91, 148 } },
    };
    private string[] _xAxisLabels = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" };

    protected override void OnInitialized()
    {
        base.OnInitialized();

        _options.SeriesDisplayOverrides = new Dictionary<IChartSeries, SeriesDisplayOverride>()
        {
            { _series[0], new SeriesDisplayOverride() },
            { _series[1], new SeriesDisplayOverride() }
        };
    }
}
```

```razor title="LineExampleHideLines"
<div>
    <MudChart T="double" ChartType="ChartType.Line" ChartSeries="@Series" ChartLabels="@XAxisLabels" Width="100%" Height="350px" CanHideSeries/>
    <MudButton Variant="Variant.Filled" @onclick="RandomizeData">Randomize data</MudButton>
</div>

@code {

    protected override void OnInitialized()
    {
        base.OnInitialized();
        RandomizeData();
    }

    public List<ChartSeries<double>> Series = new List<ChartSeries<double>>();
    public string[] XAxisLabels = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" };

    Random random = new Random();
    public void RandomizeData()
    {
        var newSeries = new List<ChartSeries<double>>();
        for (int s = 1; s <= 10; s++)
        {
            var series = new ChartSeries<double>() { Name = $"Series {s}", Data = new double[9] };
            for (int i = 0; i < 9; i++)
                series.Data[i].Y = random.NextDouble() * 100;
            newSeries.Add(series);
        }
        Series = newSeries;
        StateHasChanged();
    }
}
```

```razor title="LineExampleInterpolation"
<div>
    <MudChart T="double" ChartType="ChartType.Line" ChartSeries="@Series" ChartLabels="@ChartLabels" Width="100%" Height="350" ChartOptions="_options"></MudChart>
    <MudButton @onclick="RandomizeData">Randomize Data</MudButton>
    <MudMenu Label="Interpolation Algorithm" FullWidth="true">
        <MudMenuItem OnClick="() => OnClickMenu(InterpolationOption.Straight)">Straight</MudMenuItem>
        <MudMenuItem OnClick="() => OnClickMenu(InterpolationOption.NaturalSpline)">Natural Spline</MudMenuItem>
        <MudMenuItem OnClick="() => OnClickMenu(InterpolationOption.EndSlope)">End Slope</MudMenuItem>
        <MudMenuItem OnClick="() => OnClickMenu(InterpolationOption.Periodic)">Periodic</MudMenuItem>
    </MudMenu>
    <MudCheckBox T="bool" ValueChanged="(v)=> _options.ShowDataMarkers = v" Label="Show Data Markers"></MudCheckBox>
</div>

@code {
    private LineChartOptions _options = new LineChartOptions();
    public List<ChartSeries<double>> Series = new List<ChartSeries<double>>()
    {
        new ChartSeries<double>() { Name = "Series 1", Data = new double[] { 90, 79, 72, 69, 62, 62, 55, 65, 70 } },
        new ChartSeries<double>() { Name = "Series 2", Data = new double[] { 35, 41, 35, 51, 49, 62, 69, 91, 148 } },
    };
    public string[] ChartLabels = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" };

    Random random = new Random();
    protected override void OnInitialized()
    {
        _options.InterpolationOption = InterpolationOption.NaturalSpline;
        _options.YAxisFormat = "c2";
    }

    public void RandomizeData()
    {
        foreach (var series in Series)
        {
            for (int i = 0; i < series.Data.Values.Count; i++)
            {
                series.Data[i].Y = random.NextDouble() * 100 + 10;
            }
        }

        StateHasChanged();
    }

    void OnClickMenu(InterpolationOption interpolationOption)
    {
        _options.InterpolationOption = interpolationOption;
        StateHasChanged();
    }
}
```

```razor title="LineExampleYAxisTicks"
<div>
    <MudChart T="double" ChartType="ChartType.Line" ChartSeries="@_series" ChartLabels="@_xAxisLabels" ChartOptions="@_options" Width="100%" Height="350px"></MudChart>
    <MudSlider @bind-Value="_options.YAxisTicks" Min="10" Max="400" Step="10" Color="Color.Info">Y-Axis Ticks: @_options.YAxisTicks.ToString()</MudSlider>
</div>

@code {
    private readonly List<ChartSeries<double>> _series = new();
    private readonly LineChartOptions _options = new();
    private readonly string[] _xAxisLabels = { "1986-04-20", "1986-04-21", "1986-04-22", "1986-04-23", "1986-04-24", "1986-04-25", "1986-04-26" };

    protected override void OnInitialized()
    {
        double[] data1 = { 65, 68, 70, 74, 74, 72, 74 };
        double[] data2 = { 88, 90, 91, 92, 91, 90, 90 };
        double[] data3 = { 89, 91, 92, 92, 92, 92, 91 };
        double[] data4 = { 85, 86, 90, 90, 92, 99, 0 };

        _series.Add(new ChartSeries<double> { Name = "Chernobyl-1", Data = data1 });
        _series.Add(new ChartSeries<double> { Name = "Chernobyl-2", Data = data2 });
        _series.Add(new ChartSeries<double> { Name = "Chernobyl-3", Data = data3 });
        _series.Add(new ChartSeries<double> { Name = "Chernobyl-4", Data = data4 });

        _options.YAxisTicks = 50;

        StateHasChanged();
    }
}
```

```razor title="MixedChartExample1"
@using MudBlazor.Charts

<MudPaper Class="doc-section-component-container">
    <MudChart T="double" ChartType="ChartType.StackedBar" ChartSeries="@StackedDataSet" ChartOptions="@_barChartOptions" MatchBoundsToSize="true" Width="100%" Height="500px">
        <Line ChartSeries="@LineDataSet" ChartOptions="@_lineChartOptions" />
    </MudChart>
</MudPaper>

@code {
    private List<ChartSeries<double>> StackedDataSet =>
    [
        new() { Name = "New", Data = new([400, 380, 350, 300, 320, 380, 390, 400, 420, 450, 400, 500, 1200, 450, 480, 400, 420, 450, 460, 480, 500, 580, 600, 650, 700, 600, 450, 500, 550, 580, 600, 620, 550]) },
        new() { Name = "Upgrade", Data = new([300, 250, 200, 150, 180, 120, 130, 150, 180, 200, 220, 250, 200, 150, 180, 200, 220, 150, 180, 200, 220, 250, 280, 300, 250, 200, 230, 250, 280, 220, 250, 200, 280]) },
        new() { Name = "Churn", Data = new([-1, -60, -60, -40, -70, -100, -80, -120, -130, -140, -150, -150, -200, -600, -150, -180, -190, -200, -210, -220, -230, -300, -320, -350, -380, -400, -500, -450, -420, -400, -450, -480, -500]) },
        new() { Name = "Downgrade", Data = new([-1, -20, -30, -20, -40, -50, -60, -70, -70, -80, -90, -150, -200, -100, -80, -100, -110, -120, -130, -140, -150, -180, -150, -180, -200, -220, -250, -180, -150, -130, -150, -160, -180]) },
    ];

    private StackedBarChartOptions _barChartOptions = new StackedBarChartOptions()
    {
        ChartPalette = ["#4A89C2", "#80B5E2", "#E17C45", "#F4B183"],
        BarWidthRatio = .95,
        YAxisTicks = 400,
        YAxisSuggestedMax = 1600,
    };

    private List<ChartSeries<double>> LineDataSet =>
    [
        new() { Name = "Overall Change", Data = new([ 650, 550, 450, 380, 300, 320, 350, 400, 380, 420, 350, 650, 880, -300, 400, 250, 300, 320, 280, 350, 300, 400, 380, 420, 750, 600, 200, 300, 400, 380, 350, 400, 200 ]) }
    ];

    private LineChartOptions _lineChartOptions = new LineChartOptions()
    {
        ChartPalette = ["#512DA8"],
        ShowDataMarkers = true,
        LineStrokeWidth = 1.8,
    };
}
```

```razor title="PieExample1"
<MudPaper Class="pa-4">
    <MudChart T="double" ChartType="ChartType.Pie" ChartSeries="@data.AsChartDataSet()" @bind-SelectedIndex="Index" ChartLabels="@labels" Width="100%" Height="300px" />
</MudPaper>
<MudPaper Class="pa-4 mt-2 d-flex justify-center">
    <MudButton OnClick="AddDataSize" Variant="Variant.Filled" Color="Color.Primary">Add</MudButton>
    <MudButton @onclick="RandomizeData" Variant="Variant.Filled" Class="mx-4">Randomize</MudButton>
    <MudButton OnClick="RemoveDataSize" Variant="Variant.Filled" Color="Color.Secondary">Remove</MudButton>  
</MudPaper>
<MudText Typo="Typo.h6">Selected portion of the chart: @Index</MudText>

@code {
    private int Index = -1; //default value cannot be 0 -> first selectedindex is 0.
    int dataSize = 4;
    double[] data = { 77 };
    string[] labels = { "Uranium", "Plutonium", "Thorium", "Caesium", "Technetium", "Promethium",
                        "Polonium", "Astatine", "Radon", "Francium", "Radium", "Actinium", "Protactinium",
                        "Neptunium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Mudblaznium" };

    Random random = new Random();

    void RandomizeData()
    {
        var new_data = new double[dataSize];
        for (int i = 0; i < new_data.Length; i++)
            new_data[i] = Math.Round(random.NextDouble() * 100, 2);
        data = new_data;
        StateHasChanged();
    }

    void AddDataSize()
    {
        if (dataSize < 20)
        {
            dataSize = dataSize + 1;
            RandomizeData();
        }
    }

    void RemoveDataSize()
    {
        if (dataSize > 0)
        {
            dataSize = dataSize - 1;
            RandomizeData();
        }
    }
}
```

```razor title="RadarChartExample1"
@using MudBlazor.Charts

<MudPaper Class="doc-section-component-container">
    <MudChart T="double" @ref="_chart" ChartType="ChartType.Radar" ChartSeries="@_series" ChartLabels="@_chartLabels" ChartOptions="@_options" Width="100%" Height="400px" MatchBoundsToSize>
        <CustomGraphics>
            <text class="mud-chart-selected-text"
                  x="90%"
                  y="30"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="@_options.ChartPalette[0]">
                @(_selectedIndex >= 0 ? $"Selected: {_chartLabels[_selectedIndex]}" : "")
            </text>
        </CustomGraphics>
    </MudChart>
</MudPaper>

@code {
    private MudChart<double> _chart;
    private int _selectedIndex => (_chart?.ChartReference as Radar<double>)?.SelectedPointIndex ?? -1;
    private string[] _chartLabels = { "A", "B", "C", "D", "E" };
    private List<ChartSeries<double>> _series = new()
    {
        new ChartSeries<double>() { Name = "Development", Data = new double[] { 90, 80, 60, 70, 85 } },
    };

    private RadarChartOptions _options = new RadarChartOptions
    {
        ShowDataMarkers = true,
        DataPointRadius = 4,
        ShowAxisLabels = true,
        FillOpacity = 0.3,
        AngleOffset = 0,
        TooltipTitleFormat = "{{X_VALUE}}",
    };
}
```

```razor title="RadarChartExample2"
@using MudBlazor.Charts

<MudPaper Class="doc-section-component-container mx-8">
    <MudChart T="double" ChartType="ChartType.Radar" ChartSeries="@_series" ChartLabels="@_chartLabels" ChartOptions="@_options" Width="100%" Height="500px" MatchBoundsToSize CanHideSeries />
</MudPaper>

@code {
    private string[] _chartLabels = { "Strength", "Agility", "Intelligence", "Charisma", "Stamina", "Luck" };
    private List<ChartSeries<double>> _series = new List<ChartSeries<double>>()
    {
        new() { Name = "Warrior", Data = new double[] { 12, 5, 3, 5, 9, 2 } },
        new() { Name = "Mage", Data = new double[] { 3, 3, 12, 7, 4, 7 } },
        new() { Name = "Rogue", Data = new double[] { 4, 12, 6, 3, 6, 5 } }
    };

    private RadarChartOptions _options = new RadarChartOptions
    {
        ShowGridLines = true,
        GridLevels = 3,
        GridLineColor = "rgba(128,128,128,0.3)",
        ShowAxisLabels = true,
        AxisLineColor = "navy",
        AxisLineWidth = 1.5,
        FillOpacity = 0.3,
        StrokeWidth = 2.5,
        ShowDataMarkers = true,
        DataPointRadius = 5,
        AngleOffset = 30,
        TooltipTitleFormat = "{{SERIES_NAME}}: {{X_VALUE}}",
    };
}
```

```razor title="RoseChartExample1"
<MudPaper Class="doc-section-component-container">
    <MudChart T="double" ChartType="ChartType.Rose" ChartSeries="@_series" @bind-SelectedIndex="_selectedIndex" ChartOptions="@_options" Width="100%" Height="300px">
        <CustomGraphics>
            <text x="50"
                  y="25"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="@_options.ChartPalette[Math.Max(0, _selectedIndex)]">@(_selectedIndex == -1 ? "" : $"Selected: {_series[0].Data[_selectedIndex].Y}")</text>
        </CustomGraphics>
    </MudChart>
</MudPaper>

<div>Selected Index: @_selectedIndex</div>

@code {
    private int _selectedIndex = -1;
    private List<ChartSeries<double>> _series = new() { new() { Name = "Single Series", Data = new double[] { 70, 20, 40, 50, 80 } } };
    private RoseChartOptions _options = new RoseChartOptions
    {
        ShowValues = true,
        AngleOffset = 45,
        ScaleFactor = 0.8,
        ShowToolTips = false,
    };
}
```

```razor title="RoseChartExample2"
<MudPaper Class="doc-section-component-container mx-8">
    <MudChart T="double" ChartType="ChartType.Rose" ChartSeries="@_series" ChartOptions="@_options" Width="100%" Height="400px" ChartLabels="@_labels" />
</MudPaper>

@code {
    private List<ChartSeries<double>> _series = new List<ChartSeries<double>>()
    {
        new ChartSeries<double>() { Name = "Sales Q1", Data = new double[] { 10, 40, 20, 30 } },
        new ChartSeries<double>() { Name = "Sales Q2", Data = new double[] { 15, 35, 25, 35 } }
    };
    private string[] _labels = { "Product A", "Product B", "Product C", "Product D" };
    private RoseChartOptions _options = new RoseChartOptions
    {
        AngleOffset = 90,
        ScaleFactor = 1.0,
        ShowAsPercentage = true,
        AggregationOption = Charts.AggregationOption.GroupByDataSet
    };
}
```

```razor title="SankeyExample1"
@using MudBlazor.Charts



<MudPaper Class="doc-section-component-container">
    <MudChart T="int" ChartType="ChartType.Sankey" Width="650px" Height="350px" ChartSeries="@_series"/>
</MudPaper>

@code {

    private List<ChartSeries<int>> _series = new()
    {
        new()
        { 
            Name = "Income Flow", 
            Data = new List<SankeyEdge<int>> 
            {
                //Income
                new("Income", "Expenses", 2800),
                new("Income", "Savings", 400),

                // Expenses
                new("Expenses", "Housing", 1200),
                new("Expenses", "Food", 500),
                new("Expenses", "Insurance", 250),
                new("Expenses", "Mobility", 125),
                new("Expenses", "Travel", 425),
                new("Expenses", "Leisure", 300),
                // Savings
                new("Savings", "Interest", 10),
                new("Savings", "Stocks", 390),

                // Housing
                new("Housing", "Rent", 950),
                new("Housing", "Other", 250),
                // Insurance
                new("Insurance", "Home insurance", 50),
                new("Insurance", "Car insurance", 75),
                new("Insurance", "Health insurance", 125),
                // Travel
                new("Travel", "Car", 300),
                new("Travel", "Public transport", 125),
            },
        }
    };
}
```

```razor title="SankeyExample2"
@using MudBlazor.Charts



<MudStack Row="true" Justify="Justify.Center" Class="mud-width-full">
    <MudPaper Class="pa-4">
        <MudStack Row="true">
            <MudNumericField @bind-Value="_nodeCount" Label="Nodes" Min="2" Max="500"/>
            <MudNumericField @bind-Value="_columnCount" Label="Columns" Min="2" Max="5"/>
            <MudButton OnClick="@(() => GenerateData())" StartIcon="@Icons.Material.Outlined.Refresh" Color="Color.Primary" Variant="Variant.Outlined">Generate</MudButton>
        </MudStack>
    </MudPaper>
</MudStack>

<MudPaper Class="doc-section-component-container">
    <MudChart T="double" ChartType="ChartType.Sankey" ChartSeries="@_series" Width="@($"{_width}px")" Height="@($"{_height}px")" ChartOptions="@_options"/>
</MudPaper>

<MudGrid>
    <MudItem xs="12" Class="d-flex justify-center">
        <MudButtonGroup Color="Color.Primary" Variant="Variant.Outlined" Class="pt-4">
            <MudTooltip Text="Show edge values">
                <MudToggleIconButton Icon="@Icons.Material.Filled.ShortText" Color="@Color.Dark" ToggledColor="@Color.Primary" @bind-Toggled="_options.ShowEdgeLabels"/>
            </MudTooltip>
            <MudTooltip Text="Show labels">
                <MudToggleIconButton Icon="@Icons.Material.Filled.Textsms" Color="@Color.Dark" ToggledColor="@Color.Primary" @bind-Toggled="_options.ShowLabels"/>
            </MudTooltip>
            <MudTooltip Text="Show node values">
                <MudToggleIconButton Icon="@Icons.Material.Filled.Money" Color="@Color.Dark" ToggledColor="@Color.Primary" @bind-Toggled="_options.ShowNodeValues"/>
            </MudTooltip>
            <MudTooltip Text="Highlight on hover">
                <MudToggleIconButton Icon="@Icons.Material.Filled.Highlight" Color="@Color.Dark" ToggledColor="@Color.Primary" @bind-Toggled="_options.HighlightOnHover"/>
            </MudTooltip>
            <MudTooltip Text="Hide nodes with no edges">
                <MudToggleIconButton Icon="@Icons.Material.Filled.DisabledVisible" Color="@Color.Dark" ToggledColor="@Color.Primary" @bind-Toggled="_options.HideNodesWithNoEdges"/>
            </MudTooltip>
            <MudTooltip Text="Order nodes by value">
                <MudToggleIconButton Icon="@Icons.Material.Filled.Sort" Color="@Color.Dark" ToggledColor="@Color.Primary" @bind-Toggled="_options.OrderNodesByValue"/>
            </MudTooltip>
        </MudButtonGroup>
    </MudItem>
    <MudItem xs="12" md="4">
        <MudSlider @bind-Value="_options.NodeWidth" Max="50" ValueLabel="true">Node width</MudSlider>
    </MudItem>
    <MudItem xs="12" md="4">
        <MudSlider @bind-Value="_options.MinVerticalSpacing" Max="30" ValueLabel="true">Min. vertical spacing</MudSlider>
    </MudItem>
    <MudItem xs="12" md="4">
        <MudSlider @bind-Value="_options.EdgeOpacity" Step="0.01" Max="1" ValueLabel="true">Edge opacity</MudSlider>
    </MudItem>
    <MudItem xs="12" md="6">
        <MudSlider @bind-Value="_width" ValueLabel="true" Max="2000">Chart width</MudSlider>
    </MudItem>
    <MudItem xs="12" md="6">
        <MudSlider @bind-Value="_height" ValueLabel="true" Max="2000">Chart height</MudSlider>
    </MudItem>
    <MudItem xs="12" md="6">
        <MudColorPicker Label="Highlighting color" @bind-Text="@_options.HighlightColor"/>
    </MudItem>
    <MudItem xs="12" md="6">
        <MudNumericField @bind-Value="_options.HideNodesSmallerThan" Label="Hide nodes smaller than"/>
    </MudItem>
    <MudItem xs="12" md="6">
        <MudSelect @bind-Value="_options.LabelFontSize" Label="Label font size">
            <MudSelectItem Value="@("0.25rem")">0.25rem</MudSelectItem>
            <MudSelectItem Value="@("0.33rem")">0.33rem</MudSelectItem>
            <MudSelectItem Value="@("0.5rem")">0.5rem</MudSelectItem>
            <MudSelectItem Value="@("0.66rem")">0.66rem</MudSelectItem>
            <MudSelectItem Value="@("0.75rem")">0.75rem</MudSelectItem>
            <MudSelectItem Value="@("1rem")">1rem</MudSelectItem>
            <MudSelectItem Value="@("1.25rem")">1.25rem</MudSelectItem>
        </MudSelect>
    </MudItem>
    <MudItem xs="12" md="6">
        <MudNumericField @bind-Value="_options.LabelPadding" Label="Label padding"/>
    </MudItem>
</MudGrid>

@code {
    private List<SankeyNode> _nodes = [];
    private List<SankeyEdge<double>> _edges = [];
    private List<ChartSeries<double>> _series = [];

    private readonly SankeyChartOptions _options = new()
    {
        NodeWidth = 5,
        MinVerticalSpacing = 5,
        LabelFontSize = "0.33rem",
        LabelPadding = 2,
        OrderNodesByValue = true,
        HideNodesSmallerThan = 1
    };

    private int _width = 1000;
    private int _height = 550;
    private int _nodeCount = 50;
    private int _columnCount = 3;

    protected override void OnAfterRender(bool firstRender)
    {
        base.OnAfterRender(firstRender);
        if (firstRender) GenerateData();
    }

    private void GenerateData(double minEdgePercentage = 0.15, double maxEdgePercentage = 0.7)
    {
        var rnd = new Random();
        _nodes = [];
        _edges = [];

        var nodesPerColumn = (int)Math.Ceiling((double)_nodeCount / _columnCount);
        for (var col = 0; col < _columnCount; col++)
        {
            var nodesInCurrentColumn = Math.Min(nodesPerColumn, _nodeCount - _nodes.Count);
            for (var i = 0; i < nodesInCurrentColumn; i++)
            {
                var nodeName = $"Node_{col}_{i}";
                _nodes.Add(new SankeyNode(nodeName, col));
            }
        }

        var nodesByColumn = _nodes.GroupBy(n => n.Column)
            .OrderBy(g => g.Key)
            .Select(g => g.ToList())
            .ToList();
        var nodeOutputs = new Dictionary<string, double>();
        var nodeInputs = new Dictionary<string, double>();
        foreach (var node in _nodes)
        {
            nodeOutputs[node.Name] = 0;
            nodeInputs[node.Name] = 0;
        }

        for (var colI = 0; colI < nodesByColumn.Count - 1; colI++)
        {
            var sourceNodes = nodesByColumn[colI];
            var targetNodes = nodesByColumn[colI + 1];

            if (colI == 0)
            {
                foreach (var sourceNode in sourceNodes)
                {
                    nodeOutputs[sourceNode.Name] = rnd.Next(1, 1000);
                }
            }

            foreach (var sourceNode in sourceNodes)
            {
                var remainingEdgeValue = nodeOutputs[sourceNode.Name];
                var edgeCount = rnd.Next(1, Math.Min(targetNodes.Count, 3) + 1);
                var selectedTargets = targetNodes.OrderBy(_ => rnd.Next()).Take(edgeCount).ToList();

                for (var i = 0; i < selectedTargets.Count; i++)
                {
                    var targetNode = selectedTargets[i];
                    double edgeValue;

                    if (i == selectedTargets.Count - 1)
                    {
                        edgeValue = remainingEdgeValue;
                    }
                    else
                    {
                        var maxEdgeValue = remainingEdgeValue - (selectedTargets.Count - i - 1) * 10;
                        edgeValue = rnd.NextDouble() * maxEdgeValue * maxEdgePercentage + maxEdgeValue * minEdgePercentage;
                        remainingEdgeValue -= edgeValue;
                    }

                    _edges.Add(new SankeyEdge<double>(sourceNode.Name, targetNode.Name, Math.Round(edgeValue)));
                    nodeInputs[targetNode.Name] += edgeValue;
                }
            }

            foreach (var targetNode in targetNodes)
            {
                nodeOutputs[targetNode.Name] = nodeInputs[targetNode.Name];
            }
        }

        _edges.RemoveAll(e => e.Weight <= 0);

        _series = new List<ChartSeries<double>>()
        {
            new()
            {
                Name = "Generated Data",
                Data = _edges
            }
        };

        _options.NodeOverrides = _nodes;

        StateHasChanged();
    }
}
```

```razor title="SankeyExample3"
@using MudBlazor.Charts



<MudPaper Class="doc-section-component-container">
    <MudChart T="int" @ref="_mudChart" ChartType="ChartType.Sankey" ChartSeries="@Series.AsList()" Width="@_width" Height="@_height" @bind-SelectedIndex="_selectedIndex"/>
</MudPaper>

<MudGrid>
    <MudItem xs="12">
        <MudText>Node selected: @(_selectedIndex >= 0 ? Chart.Nodes.ElementAt(_selectedIndex).Name : "")</MudText>
    </MudItem>
</MudGrid>

@code {
    private MudChart<int> _mudChart = null!;
    private string _width = "650px";
    private string _height = "350px";
    private int _selectedIndex = -1;

    public Sankey<int> Chart => _mudChart.ChartReference as Sankey<int>;

    private readonly List<SankeyEdge<int>> _edges =
    [
        new("Balls", "Soccer ball", 20),
        new("Balls", "Football", 10),
        new("Balls", "Tennis ball", 30),
        
        new("Soccer ball", "Good condition", 17),
        new("Soccer ball", "Bad condition", 3),
        new("Football", "Good condition", 5),
        new("Football", "Bad condition", 5),
        new("Tennis ball", "Good condition", 10),
        new("Tennis ball", "Bad condition", 20),
    ];

    private ChartSeries<int> Series => new() { Name = "Ball Catalog", Data = _edges };
}
```

```razor title="ScatterPlotExample1"
@using MudBlazor.Charts;



<MudPaper Class="doc-section-component-container">
    <MudChart T="double"
              ChartType="ChartType.ScatterPlot"
              ChartSeries="@_series"
              @bind-SelectedIndex="_index"
              CanHideSeries="true"
              Width="100%"
              Height="@_height"
              ChartOptions="@_options" />
</MudPaper>

<MudGrid>
    <MudItem xs="12">
        <MudText Typo="Typo.body1" Class="py-3">Selected: @(_index < 0 ? "None" : _series[_index].Name)</MudText>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox T="bool" @bind-Value="_options.ShowDataLabels" Color="Color.Primary" Label="Show Data Labels" />
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox T="bool" @bind-Value="_options.ShowToolTips" Color="Color.Primary" Label="Show Tooltips" />
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_options.PointRadius" Min="2" Max="12" Step="1">Point Radius: @_options.PointRadius</MudSlider>
    </MudItem>
</MudGrid>

@code {
    private int _index = -1;
    private string _height = "350px";

    private ScatterPlotChartOptions _options = new()
    {
        XAxisTitle = "Age (years)",
        YAxisTitle = "Blood Pressure (mmHg)",
        XAxisTicks = 10,
        YAxisTicks = 10,
        XAxisLines = true,
        ShowToolTips = true,
        PointRadius = 5,
    };

    private readonly List<ChartSeries<double>> _series =
    [
        new()
        {
            Name = "Group A (Treated)",
            Data = new([(20, 112), (20, 118), (30, 119), (30, 124), (40, 122), (40, 130), (50, 128), (50, 135), (60, 133), (60, 140)]),
        },
        new()
        {
            Name = "Group B (Control)",
            Data = new([(20, 125), (20, 130), (30, 132), (30, 138), (40, 138), (40, 145), (50, 142), (50, 150), (60, 150), (60, 158)]),
        },
    ];
}
```

```razor title="ScatterPlotExampleRegressionLine"
@using MudBlazor.Charts

<MudPaper Class="doc-section-component-container">
    <MudChart T="double"
              ChartType="ChartType.ScatterPlot"
              ChartSeries="@_series"
              Width="100%"
              Height="350px"
              ChartOptions="@_options" />
</MudPaper>

@code {
    private ChartSeries<double> _data = new()
    {
        Name = "Measurements",
        Data = new([(1, 1.8), (1, 2.4), (2, 3.5), (2, 2.9), (3, 3.1), (4, 5.1), (4, 4.5), (5, 4.8), (6, 6.4), (6, 7.0), (7, 7.2), (8, 8.0), (8, 9.1), (9, 8.6), (10, 10.1)]),
    };

    private ChartSeries<double> _regression = new()
    {
        Name = "Regression",
        Data = new([(1, 1.5), (10, 10.5)]),
    };

    private List<ChartSeries<double>> _series = default!;

    private ScatterPlotChartOptions _options = default!;

    protected override void OnInitialized()
    {
        _series = [_data, _regression];

        _options = new ScatterPlotChartOptions
        {
            XAxisTitle = "Input Voltage (V)",
            YAxisTitle = "Measured Output (mV)",
            XAxisTicks = 1,
            YAxisTicks = 1,
            XAxisLines = true,
            ShowToolTips = true,
            PointRadius = 5,
            SeriesDisplayOverrides = new Dictionary<IChartSeries, SeriesDisplayOverride>
            {
                [_regression] = new ScatterSeriesDisplayOverride
                {
                    ScatterSeriesType = ScatterSeriesType.Line,
                    StrokeOpacity = 0.75,
                }
            }
        };
    }
}
```

```razor title="StackedBarCustomGraphicsExample"
<MudChart T="double" ChartType="ChartType.StackedBar" ChartSeries="@Series" ChartLabels="@XAxisLabels" Width="100%" Height="350px">
    <CustomGraphics>
        <style>
            .heavy { font: bold 30px Helvetica; }
            .Rrrrr { font: italic 40px Helvetica; fill: rgb(62,44,221); }
        </style>
        <text x="80" y="35" class="heavy">I Love</text>
        <text x="105" y="70" class="Rrrrr">MudBlazor!</text>
    </CustomGraphics>
</MudChart>


@code {
    public List<ChartSeries<double>> Series = new List<ChartSeries<double>>()
    {
        new() { Name = "United States", Data = new double[] { 40, 20, 25, 27, 46, 46, 48, 44, 15 } },
        new() { Name = "Germany", Data = new double[] { 19, 24, 35, 13, 28, 15, 13, 16, 40 } },
        new() { Name = "Sweden", Data = new double[] { 8, 6, 11, 13, 4, 16, 10, 16, 20 } },
    };
    public string[] XAxisLabels = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" };
}
```

```razor title="StackedBarExample1"
<MudPaper Class="doc-section-component-container">
    <MudChart T="double" ChartType="ChartType.StackedBar" ChartSeries="@_series" LegendPosition="@_legendPosition" ChartLabels="@_xAxisLabels" Width="100%" Height="350px" ChartOptions="_axisChartOptions"
              @bind-SelectedIndex="_index" MatchBoundsToSize="_matchBoundsToSize"/>
</MudPaper>

<MudGrid>
    <MudItem md="6" xs="12">
        <MudText Typo="Typo.body1" Class="py-3">Selected: @(_index < 0 ? "None" : _series[_index].Name)</MudText>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox @bind-Value="_matchBoundsToSize" Color="Color.Primary" Label="MatchBoundsToSize"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_axisChartOptions.XAxisLabelRotation" Min="0" Max="90" Step="15">XAxis Label Rotation</MudSlider>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_axisChartOptions.BarWidthRatio" Min="0.1" Max="1" Step="0.1">Bar Width Ratio</MudSlider>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudStack>
            <MudText Typo="Typo.body1">Legend Position</MudText>
            <MudRadioGroup T="Position" @bind-Value="_legendPosition">
                <MudRadio Value="@(Position.Bottom)" Color="Color.Primary">Bottom</MudRadio>
                <MudRadio Value="@(Position.Top)" Color="Color.Primary">Top</MudRadio>
                <MudRadio Value="@(Position.Left)" Color="Color.Primary">Left</MudRadio>
                <MudRadio Value="@(Position.Right)" Color="Color.Primary">Right</MudRadio>
                <MudRadio Value="@(Position.Start)" Color="Color.Primary">Start</MudRadio>
                <MudRadio Value="@(Position.End)" Color="Color.Primary">End</MudRadio>
            </MudRadioGroup>
        </MudStack>
    </MudItem>
</MudGrid>

@code {
    private int _index = -1; //default value cannot be 0 -> first selectedindex is 0.
    private bool _matchBoundsToSize = false;
    private StackedBarChartOptions _axisChartOptions = new() 
    { 
        BarWidthRatio = 0.5,
        XAxisTitle = "Months",
        YAxisTitle = "Sales",
    };

    private Position _legendPosition = Position.Bottom;

    private List<ChartSeries<double>> _series = new List<ChartSeries<double>>()
    {
        new ChartSeries<double>() { Name = "United States", Data = new double[] { 40, 20, 25, 27, 46, 60, 48, 80, 15 } },
        new ChartSeries<double>() { Name = "Germany", Data = new double[] { 19, 24, 35, 13, 28, 15, 13, 16, 31 } },
        new ChartSeries<double>() { Name = "Sweden", Data = new double[] { 8, 6, 11, 13, 4, 16, 10, 16, 18 } },
    };
    private string[] _xAxisLabels = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" };
}
```

```razor title="StackedBarValueLabelsExample"
<MudChart T="double" ChartType="ChartType.StackedBar" ChartSeries="@_series" ChartLabels="@_xAxisLabels"
          ChartOptions="@_options" Width="100%" Height="350px" />

@code {
    private readonly StackedBarChartOptions _options = new() { ShowValues = true };

    private readonly List<ChartSeries<double>> _series =
    [
        new() { Name = "United States", Data = new double[] { 40, 20, 25, 27, 46 } },
        new() { Name = "Germany", Data = new double[] { 19, 24, 35, 13, 28 } },
        new() { Name = "Sweden", Data = new double[] { 8, 6, 11, 13, 4 } },
    ];

    private readonly string[] _xAxisLabels = { "Jan", "Feb", "Mar", "Apr", "May" };
}
```

```razor title="TimeSeriesExample1"
@using MudBlazor.Charts;



<MudPaper Class="doc-section-component-container">
    <MudChart T="double" ChartType="ChartType.Timeseries"
              ChartSeries="@_series"
              @bind-SelectedIndex="_index"
              MatchBoundsToSize="@_matchBoundsToSize"
              CanHideSeries="true"
              Width="@_width"
              Height="@_height"
              ChartOptions="_options" />
</MudPaper>

<MudGrid>
    <MudItem xs="12">
        <MudText Typo="Typo.body1" Class="py-3">Selected: @(_index < 0 ? "None" : _series[_index].Name)</MudText>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox @bind-Value="_options.TimeLabelSpacingRounding" Color="Color.Primary" Label="TimeLabelSpacing Rounding"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox @bind-Value="_options.TimeLabelSpacingRoundingPadSeries" Color="Color.Primary" Label="TimeLabelSpacing Rounding - Pad Series"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox @bind-Value="_matchBoundsToSize" Color="Color.Primary" Label="MatchBoundsToSize"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudCheckBox T="bool" @bind-Value="_options.ShowDataMarkers" Color="Color.Primary" Label="Show Data Markers"></MudCheckBox>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_options.XAxisLabelRotation" Min="0" Max="90" Step="15">XAxis Label Rotation</MudSlider>
    </MudItem>
    <MudItem md="6" xs="12">
        <MudSlider @bind-Value="_options.LineStrokeWidth" Min="1" Max="10">Line Width: @_options.LineStrokeWidth.ToString()</MudSlider>
    </MudItem>
</MudGrid>

@code
{
    private int _index = -1; //default value cannot be 0 -> first selectedindex is 0.
    private TimeSeriesChartOptions _options = new TimeSeriesChartOptions
        {
            YAxisLines = false,
            YAxisTicks = 500,
            MaxNumYAxisTicks = 10,
            YAxisRequireZeroPoint = true,
            XAxisLines = false,
            LineStrokeWidth = 1,
            ShowDataMarkers = false,
            TooltipTimeLabelFormat = "yyyy MMM dd HH:mm:ss",
            TimeLabelSpacing = TimeSpan.FromMinutes(5),
            XAxisTitle = "Time",
            YAxisTitle = "Values",
        };

    private ChartSeries<double> _chart1 = new();
    private ChartSeries<double> _chart2 = new();
    private ChartSeries<double> _chart3 = new();

    private List<ChartSeries<double>> _series = new();

    private readonly Random _random = new Random();

    private bool _matchBoundsToSize = false;

    private string _width = "100%";
    private string _height = "350px";

    protected override void OnInitialized()
    {
        base.OnInitialized();

        var now = DateTime.Now;
        _chart1 = new ChartSeries<double>
            {
                Name = "Series 1",
                Data = Enumerable.Range(-360, 360).Select(x => new TimeValue<double>(now.AddSeconds(x * 10), _random.Next(6000, 15000))).ToArray(),
                Visible = true,
            };

        _chart2 = new ChartSeries<double>
            {
                Name = "Series 2",
                Data = Enumerable.Range(-360, 360).Select(x => new TimeValue<double>(now.AddSeconds(x * 10), _random.Next(0, 7000))).ToArray(),
                Visible = true,
            };

        _chart3 = new ChartSeries<double>
            {
                Name = "Series 3",
                Data = Enumerable.Range(-90, 60).Select(x => new TimeValue<double>(now.AddSeconds(x * 30), _random.Next(4000, 10000))).ToArray(),
                Visible = true,
            };

        _options.SeriesDisplayOverrides = new Dictionary<IChartSeries, SeriesDisplayOverride>()
        {
            [_chart2] = new SeriesDisplayOverride
            {
                LineDisplayType = LineDisplayType.Area,
            }
        };

        _series.Add(_chart1);
        _series.Add(_chart2);
        _series.Add(_chart3);

        StateHasChanged();
    }
}
```
