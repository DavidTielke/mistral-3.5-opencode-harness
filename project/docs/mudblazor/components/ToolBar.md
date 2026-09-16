# ToolBar

```razor title="ToolBarExample"
<MudPaper Elevation="25">
    <MudToolBar>
        <MudIconButton Icon="@Icons.Material.Outlined.Menu" Color="Color.Inherit" Class="mr-5" />
        <MudIconButton Icon="@Icons.Material.Outlined.Add" />
        <MudIconButton Icon="@Icons.Material.Outlined.Edit" />
        <MudIconButton Icon="@Icons.Material.Outlined.Remove" />
        <MudIconButton Icon="@Icons.Material.Outlined.Notifications" />
        <MudIconButton Icon="@Icons.Material.Outlined.PeopleAlt" />
        <MudIconButton Icon="@Icons.Material.Outlined.MoreVert" Color="Color.Inherit" />
    </MudToolBar>

    <MudToolBar>
        <MudIconButton Icon="@Icons.Material.Outlined.Menu" Color="Color.Inherit" Class="mr-5" />
        <MudIconButton Icon="@Icons.Material.Outlined.Add" />
        <MudIconButton Icon="@Icons.Material.Outlined.Edit" />
        <MudIconButton Icon="@Icons.Material.Outlined.Remove" />
        <MudSpacer />
        <MudIconButton Icon="@Icons.Material.Outlined.Notifications" />
        <MudIconButton Icon="@Icons.Material.Outlined.PeopleAlt" />
        <MudIconButton Icon="@Icons.Material.Outlined.MoreVert" Color="Color.Inherit" />
    </MudToolBar>

    <MudToolBar Class="justify-space-between">
        <MudIconButton Icon="@Icons.Material.Outlined.Menu" Color="Color.Inherit" />
        <MudIconButton Icon="@Icons.Material.Outlined.Add" />
        <MudIconButton Icon="@Icons.Material.Outlined.Edit" />
        <MudIconButton Icon="@Icons.Material.Outlined.Remove" />
        <MudIconButton Icon="@Icons.Material.Outlined.Notifications" />
        <MudIconButton Icon="@Icons.Material.Outlined.PeopleAlt" />
        <MudIconButton Icon="@Icons.Material.Outlined.MoreVert" Color="Color.Inherit" />
    </MudToolBar>
</MudPaper>
```

The `WrapContent` property grants the ability to wrap the content based on the available space. If the content within the ToolBar exceeds the width of the container, it will automatically wrap onto the next line to ensure optimal display and prevent overflow.

```razor title="ToolBarWrapContentExample"
<MudPaper Elevation="25" MaxWidth="250px">
    <MudToolBar WrapContent="true">
        <MudIconButton Icon="@Icons.Material.Outlined.Menu" Color="Color.Inherit" />
        <MudIconButton Icon="@Icons.Material.Outlined.Add" />
        <MudIconButton Icon="@Icons.Material.Outlined.Edit" />
        <MudIconButton Icon="@Icons.Material.Outlined.Remove" />
        <MudIconButton Icon="@Icons.Material.Outlined.Notifications" />
        <MudIconButton Icon="@Icons.Material.Outlined.PeopleAlt" />
        <MudIconButton Icon="@Icons.Material.Outlined.MoreVert" Color="Color.Inherit" />
    </MudToolBar>
</MudPaper>
```
