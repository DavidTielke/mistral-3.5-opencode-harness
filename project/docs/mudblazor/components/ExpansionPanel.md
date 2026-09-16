# ExpansionPanel

```razor title="ExpansionPanelSimpleExample"
<MudExpansionPanels>
    <MudExpansionPanel Text="Panel One" MaxHeight="150" Expanded="true">
        Panel One Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Two" MaxHeight="500">
        Panel Two Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Three" MaxHeight="1000">
        Panel Three Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Four">
        Panel Four Content
    </MudExpansionPanel>
</MudExpansionPanels>
```

Multiple expansion panels can be opened at the same time by setting `MultiExpansion`.

```razor title="ExpansionPanelMultiExample"
<MudExpansionPanels MultiExpansion="true">
    <MudExpansionPanel Text="Panel One">
        Panel One Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Two">
        Panel Two Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Three">
        Panel Three Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Four">
        Panel Four Content
    </MudExpansionPanel>
</MudExpansionPanels>
```

The panels inner collapsible won't expand until `@nameof(MudExpansionPanel.ExpandedChanged)` has completed, enabling smooth opening of expansion panels even if the data is not loaded when the header is clicked.

```razor title="ExpansionPanelAsyncExample"
<MudExpansionPanels>
    <MudExpansionPanel Text="Panel with async loaded contents" MaxHeight="1000" ExpandedChanged="OnExpandedChanged">
        @_panelContent
    </MudExpansionPanel>
</MudExpansionPanels>

@code {
    private RenderFragment _panelContent;

    private async Task OnExpandedChanged(bool newVal)
    {
        if (newVal)
        {
            await Task.Delay(600);
            _panelContent = _bigAsyncContent;
        }
        else
        {
            // Reset after a while to prevent sudden collapse.
            Task.Delay(350).ContinueWith(t => _panelContent = null).CatchAndLog(); 
        }
    }

    private RenderFragment _bigAsyncContent = __builder =>
    {
        <div>The expansion of the</div>
        <div>inner panel is done after</div>
        <div>ExpandedChanged</div>
        <div>has completed to allow for</div>
        <div>smooth opening of async data</div>
        <div>of initially unknown height.</div>
    };
}
```

```razor title="ExpansionPanelDisabledExample"
<MudExpansionPanels>
    <MudExpansionPanel Text="Panel One">
        Panel One Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Two" Disabled="true">
        Panel Two Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Three">
        Panel Three Content
    </MudExpansionPanel>
</MudExpansionPanels>
```

The padding of the panels can be controlled with `Gutters` and `Dense`. These can be set individually per panel or applied on all panels by setting them on the parent.

```razor title="ExpansionPanelPaddingExample"
<MudText Typo="Typo.h6" Class="mb-4">Default Gutters (Gutters="true")</MudText>
<MudExpansionPanels Class="mb-6">
    <MudExpansionPanel Text="Panel with Gutters" Gutters="true">
        <MudText>Both header and content have 24px horizontal padding (gutters).</MudText>
        <MudText>This is the default behavior when Gutters is not specified.</MudText>
    </MudExpansionPanel>
</MudExpansionPanels>

<MudText Typo="Typo.h6" Class="mb-4">No Gutters (Gutters="false")</MudText>
<MudExpansionPanels Class="mb-6">
    <MudExpansionPanel Text="Panel without Gutters" Gutters="false">
        <MudText>Both header and content have no horizontal padding.</MudText>
        <MudText>Notice how the text aligns to the left edge.</MudText>
    </MudExpansionPanel>
</MudExpansionPanels>

<MudText Typo="Typo.h6" Class="mb-4">Dense Panels</MudText>
<MudExpansionPanels Class="mb-6">
    <MudExpansionPanel Text="Dense with Gutters" Dense Gutters>
        Dense removes vertical padding from content while keeping horizontal gutters.
    </MudExpansionPanel>
    <MudExpansionPanel Text="Dense without Gutters" Dense Gutters="false">
        Dense with no gutters - minimal padding on all sides.
    </MudExpansionPanel>
</MudExpansionPanels>

<MudText Typo="Typo.h6" Class="mb-4">Parent Controls Gutters</MudText>
<MudExpansionPanels Dense Gutters="false">
    <MudExpansionPanel Text="Gutters inherited from parent">
        When the parent MudExpansionPanels has Gutters="false", all child panels inherit this setting.
    </MudExpansionPanel>
</MudExpansionPanels>
```

The `Outlined` property controls the borders around the panel.
For a flatter UI design, you might be prefer to set it to `false` along with `Elevation` set to 0.

```razor title="ExpansionPanelOutlinedExample"
<MudExpansionPanels Outlined="false" Elevation="0">
    <MudExpansionPanel Text="Panel One">
        Panel One Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Two">
        Panel Two Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Three">
        Panel Three Content
    </MudExpansionPanel>
</MudExpansionPanels>
```

```razor title="ExpansionPanelTitleExample"
<div class="mx-auto"  style="max-width: 400px;">
    <MudExpansionPanels>
        <MudExpansionPanel>
            <TitleContent>
                <div class="d-flex">
                    <MudIcon Icon="@Icons.Material.Filled.Info" class="mr-3"></MudIcon>
                    <MudText>Panel header as <strong>RenderFragment</strong></MudText>
                </div>
            </TitleContent>
            <ChildContent>
                Panel Content
            </ChildContent>
        </MudExpansionPanel>
        <MudExpansionPanel Text="The icon of this panel is hidden" HideIcon="true">
            Panel Content
        </MudExpansionPanel>
        <MudExpansionPanel HideIcon="true">
            <TitleContent>
                <div class="d-flex">
                    <MudText Class="mt-1">Inbox</MudText>
                    <MudBadge Content="3" Color="Color.Primary" Overlap="true" Class="d-flex ml-auto">
                        <MudIcon Icon="@Icons.Material.Filled.Email" Color="Color.Default" />
                    </MudBadge>
                </div>
            </TitleContent>
            <ChildContent>
                Panel Content
            </ChildContent>
        </MudExpansionPanel>
        <MudExpansionPanel @bind-Expanded="@open" HideIcon="true">
            <TitleContent>
                <div class="d-flex">
                    <MudText>Overriding standard icon with own icon</MudText>
                    <MudIcon Icon="@(open ? Icons.Material.Filled.Close : Icons.Material.Filled.Add)" class="ml-auto"></MudIcon>
                </div>
            </TitleContent>
            <ChildContent>
                Panel Content
            </ChildContent>
        </MudExpansionPanel>
    </MudExpansionPanels>
</div>

@code
{
    bool open;
}
```

## Further examples

```razor title="ExpansionPanelDisabledExpandIcon"
<MudExpansionPanels>
    <MudExpansionPanel Text="Title" HideIcon="true" Disabled="true">
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Two">
        Panel Two Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Three" HideIcon="true">
        Panel Three Content
    </MudExpansionPanel>
    <MudExpansionPanel Text="Panel Four" HideIcon="false">
        Panel Four Content
    </MudExpansionPanel>
</MudExpansionPanels>
```
