# SplitPanel

Note that the background of a panel automatically becomes transparent if no content was added.

```razor title="SplitPanelOverlayExample"
<MudPaper Class="mud-width-full mud-height-full relative">
    <MudSplitPanel Class="mud-height-full"
                   UseAsOverlay="true"
                   Elevation="8"
                   FirstPanelInitialSize="150"
                   MinPanelSize="150"
                   Padding="4"
                   Rounded="true">
        <FirstPanel>
            <div style="display: grid; grid-template-rows: auto 1fr;" class="mud-height-full">
                <MudText Typo="Typo.h6">Toolbox</MudText>
                <MudStack Row="true" Wrap="Wrap.Wrap" Class="overflow-y-auto mt-2" AlignItems="AlignItems.Start" Style="align-content: flex-start;">
                    @for (var i = 0; i < 20; i++)
                    {
                        var iLocal = i;
                        <MudText>Some item @iLocal</MudText>
                    }
                </MudStack>
            </div>
        </FirstPanel>
    </MudSplitPanel>
    <MudStack Class="pa-4" Style="margin-left: 150px;">
        <MudText Typo="Typo.h6">Content</MudText>
        <MudText>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum
            dolor sit amet.
        </MudText>
    </MudStack>
</MudPaper>
```

## Further examples

```razor title="SplitPanelBasicExample"
<MudStack Class="mud-width-full mud-height-full" Justify="Justify.Center" AlignItems="AlignItems.Center" Style="height: 500px;">
    <MudSplitPanel @ref="_splitPanel"
                   Class="mud-width-full mud-height-full"
                   Horizontal="_horizontal"
                   ResetOnDoubleClick="_resetOnDoubleClick"
                   Rounded="_rounded"
                   Transparent="_transparent"
                   Elevation="@(_elevation ? 1 : 0)">
        <FirstPanel>
            <MudStack Justify="Justify.Center" AlignItems="AlignItems.Center" Class="mud-width-full mud-height-full">
                <MudText Typo="Typo.h6">First Panel</MudText>
            </MudStack>
        </FirstPanel>
        <SecondPanel>
            <MudStack Justify="Justify.Center" AlignItems="AlignItems.Center" Class="mud-width-full mud-height-full">
                <MudText Typo="Typo.h6">Second Panel</MudText>
            </MudStack>
        </SecondPanel>
    </MudSplitPanel>
    <MudButtonGroup Variant="Variant.Filled">
        <MudTooltip Text="Toggle orientation">
            <MudToggleIconButton @bind-Toggled="_horizontal" Icon="@Icons.Material.Outlined.Pause" ToggledIcon="@Icons.Material.Outlined.DragHandle" ToggledColor="@Color.Info"/>
        </MudTooltip>
        <MudTooltip Text="Reset on double click">
            <MudToggleIconButton @bind-Toggled="_resetOnDoubleClick" Icon="@Icons.Material.Outlined.RestartAlt" ToggledColor="@Color.Info"/>
        </MudTooltip>
        <MudTooltip Text="Rounded">
            <MudToggleIconButton @bind-Toggled="_rounded" Icon="@Icons.Material.Outlined.RoundedCorner" ToggledColor="@Color.Info"/>
        </MudTooltip>
        <MudTooltip Text="Elevation">
            <MudToggleIconButton @bind-Toggled="_elevation" Icon="@Icons.Material.Outlined.Landscape" ToggledColor="@Color.Info"/>
        </MudTooltip>
        <MudTooltip Text="Transparent">
            <MudToggleIconButton @bind-Toggled="_transparent" Icon="@Icons.Material.Outlined.Visibility" ToggledColor="@Color.Info"/>
        </MudTooltip>
        <MudTooltip Text="Reset sizes">
            <MudIconButton OnClick="@_splitPanel.ResetDividerPositionAsync" Icon="@Icons.Material.Outlined.Replay" Variant="Variant.Filled"/>
        </MudTooltip>
    </MudButtonGroup>
</MudStack>

@code {
    private MudSplitPanel _splitPanel;
    private bool _horizontal;
    private bool _resetOnDoubleClick = true;
    private bool _rounded = true;
    private bool _elevation = true;
    private bool _transparent;
}
```

```razor title="SplitPanelFunctionsExample"
<MudStack Class="mud-width-full mud-height-full" Justify="Justify.Center" AlignItems="AlignItems.Center" Style="height: 500px;">
    <MudSplitPanel @ref="_splitPanel" Class="mud-width-full mud-height-full">
        <FirstPanel>
            <MudStack Justify="Justify.Center" AlignItems="AlignItems.Center" Class="mud-width-full mud-height-full">
                <MudText Typo="Typo.h6">First Panel</MudText>
            </MudStack>
        </FirstPanel>
        <SecondPanel>
            <MudStack Justify="Justify.Center" AlignItems="AlignItems.Center" Class="mud-width-full mud-height-full">
                <MudText Typo="Typo.h6">Second Panel</MudText>
            </MudStack>
        </SecondPanel>
    </MudSplitPanel>
    <MudNumericField @bind-Value="_size" Label="Size [px]"/>
    <MudStack Row="true">
        <MudButton OnClick="@GetPositionAsync" Variant="Variant.Filled" EndIcon="@Icons.Material.Outlined.Download">Get Pos.</MudButton>
        <MudButton OnClick="@SetPositionAsync" Variant="Variant.Filled" EndIcon="@Icons.Material.Outlined.Upload">Set Pos.</MudButton>
        <MudButton OnClick="@ResetPositionAsync" Variant="Variant.Filled" EndIcon="@Icons.Material.Outlined.Replay">Reset Pos.</MudButton>
    </MudStack>
</MudStack>

@code {
    private MudSplitPanel _splitPanel;
    private int _size;

    private async Task GetPositionAsync()
    {
        _size = await _splitPanel.GetDividerPositionAsync();
    }

    private async Task SetPositionAsync()
    {
        await _splitPanel.SetDividerPositionAsync(_size);
    }

    private async Task ResetPositionAsync()
    {
        await _splitPanel.ResetDividerPositionAsync();
    }
}
```

```razor title="SplitPanelInsideSplitPanelExample"
<MudSplitPanel Class="mud-width-full mud-height-full" Horizontal="true" Transparent="true" Rounded="true" Elevation="1">
    <FirstPanel>
        <MudSplitPanel Class="mud-width-full mud-height-full" Rounded="true" Elevation="1">
            <FirstPanel>
                <MudStack Style="height: 100%; min-height: 200px;" AlignItems="AlignItems.Center" Justify="Justify.Center">
                    <MudText Typo="Typo.h6">Content 1</MudText>
                </MudStack>
            </FirstPanel>
            <SecondPanel>
                <MudStack Style="height: 100%; min-height: 200px;" AlignItems="AlignItems.Center" Justify="Justify.Center">
                    <MudText Typo="Typo.h6">Content 2</MudText>
                </MudStack>
            </SecondPanel>
        </MudSplitPanel>
    </FirstPanel>
    <SecondPanel>
        <MudPaper Class="mud-height-full mud-width-full" Style="background-color: var(--mud-palette-surface);">
            <MudStack Style="height: 100%; min-height: 200px;" AlignItems="AlignItems.Center" Justify="Justify.Center">
                <MudText Typo="Typo.h6">Content 3</MudText>
            </MudStack>
        </MudPaper>
    </SecondPanel>
</MudSplitPanel>
```
