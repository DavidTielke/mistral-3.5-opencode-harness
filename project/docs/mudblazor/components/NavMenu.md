# NavMenu

```razor title="NavMenuExample"
<MudPaper Width="250px" Class="py-3" Elevation="0">
    <MudNavMenu>
        <MudText Typo="Typo.h6" Class="px-4">My Application</MudText>
        <MudText Typo="Typo.body2" Class="px-4 mud-text-secondary">Secondary Text</MudText>
        <MudDivider Class="my-2"/>
        <MudNavLink Href="/dashboard">Dashboard</MudNavLink>
        <MudNavLink Href="/servers">Servers</MudNavLink>
        <MudNavLink Href="/billing" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" Expanded="true">
            <MudNavLink Href="/users">Users</MudNavLink>
            <MudNavLink Href="/security">Security</MudNavLink>
        </MudNavGroup>
        <MudNavLink Href="/about">About</MudNavLink>
    </MudNavMenu>
</MudPaper>
```

MudNavGroup allows two-way binding in the `@nameof(MudNavGroup.Expanded)` property, so you can control what happens when expanded and collapsed.

```razor title="NavMenuTwoWayBindableExample"
<MudPaper Width="250px" Class="py-3 mb-4" Elevation="0">
    <MudNavMenu>
        <MudNavGroup Title="Settings" @bind-Expanded=_expanded>
            <MudNavLink Href="/users">Users</MudNavLink>
            <MudNavLink Href="/security">Security</MudNavLink>
        </MudNavGroup>
    </MudNavMenu>
</MudPaper>

<MudText>
    The MudNavGroup is
    @if (_expanded)
    {
        <b class="mud-theme-tertiary rounded pa-2 ml-2">expanded</b>
    }
    else
    {
        <b class="mud-theme-error rounded pa-2 ml-2">collapsed</b>
    }
</MudText>

@code{
    bool _expanded = true;
}
```

NavMenu can have up to `4` sub groups within `MudNavMenu` itself.

```razor title="NavMenuSubGroupExample"
<MudPaper Width="250px" Class="d-inline-flex py-3" Elevation="0">
    <MudNavMenu Class="mud-width-full">
        <MudText Typo="Typo.h6" Class="px-4">My Application</MudText>
        <MudText Typo="Typo.body2" Class="px-4 mud-text-secondary">Secondary Text</MudText>
        <MudDivider Class="my-2" />
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavGroup Title="Level 0" Icon="@Icons.Material.Filled.Settings" Expanded="true">
            <MudNavGroup Title="Level 1" Icon="@Icons.Material.Filled.AdminPanelSettings" Expanded="true">
                <MudNavGroup Title="Level 2" Icon="@Icons.Material.Filled.People" Expanded="true">
                    <MudNavGroup Title="Level 3" Icon="@Icons.Material.Filled.Lock" Expanded="true">
                        <MudNavLink Href="/delete" Icon="@Icons.Material.Filled.DeleteForever">Delete Password</MudNavLink>
                    </MudNavGroup>
                </MudNavGroup>
            </MudNavGroup>
        </MudNavGroup>
        <MudNavLink Href="/billing" Icon="@Icons.Material.Filled.Receipt">Billing</MudNavLink>
    </MudNavMenu>
</MudPaper>
```

You can use both the icons that come with MudBlazor or font icons. [Read more about icons here.](/components/icons)

```razor title="NavMenuIconExample"
<link href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" rel="stylesheet">


<MudPaper Width="250px" Class="d-inline-flex py-3" Elevation="0">
    <MudNavMenu Class="mud-width-full">
        <MudText Typo="Typo.h6" Class="px-4">Material</MudText>
        <MudText Typo="Typo.body2" Class="px-4 mud-text-secondary">Icons</MudText>
        <MudDivider Class="my-2" />
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Href="/servers" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/billing" Icon="@Icons.Material.Filled.Receipt" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" Icon="@Icons.Material.Filled.Settings" Expanded="true">
            <MudNavLink Href="/users" Icon="@Icons.Material.Filled.People" IconColor="Color.Success">Users</MudNavLink>
            <MudNavLink Href="/security" Icon="@Icons.Material.Filled.Security" IconColor="Color.Info">Security</MudNavLink>
        </MudNavGroup>
    </MudNavMenu>
</MudPaper>
<MudPaper Width="250px" Class="d-inline-flex py-3" Elevation="0">
    <MudNavMenu Class="mud-width-full">
        <MudText Typo="Typo.h6" Class="px-4">Font Awesome</MudText>
        <MudText Typo="Typo.body2" Class="px-4 mud-text-secondary">Icons</MudText>
        <MudDivider Class="my-2" />
        <MudNavLink Href="/dashboard" Icon="fas fa-chart-line">Dashboard</MudNavLink>
        <MudNavLink Href="/servers" Icon="fas fa-server">Servers</MudNavLink>
        <MudNavLink Href="/billing" Icon="fas fa-receipt" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" Icon="fas fa-cogs" Expanded="true">
            <MudNavLink Href="/users" Icon="fas fa-users" IconColor="Color.Success">Users</MudNavLink>
            <MudNavLink Href="/security" Icon="fas fa-user-shield" IconColor="Color.Info">Security</MudNavLink>
        </MudNavGroup>
    </MudNavMenu>
</MudPaper>
```

```razor title="NavMenuBorderedExample"
<MudPaper Width="250px" Elevation="0" Class="py-3">
    <MudNavMenu Bordered="true">
        <MudNavLink Href="/dashboard">Dashboard</MudNavLink>
        <MudNavLink Match="NavLinkMatch.Prefix" Href="/components/navmenu">Servers</MudNavLink>
        <MudNavLink Href="/billing" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" Expanded="true">
            <MudNavLink Href="/users">Users</MudNavLink>
            <MudNavLink Href="/security">Security</MudNavLink>
        </MudNavGroup>
        <MudNavLink Href="/about">About</MudNavLink>
    </MudNavMenu>
</MudPaper>
```

```razor title="NavMenuColorExample"
<MudPaper Width="250px" Elevation="0" Class="py-3">
    <MudNavMenu Color="Color.Info">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Href="/components/navmenu" Match="NavLinkMatch.Prefix" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/billing" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" Expanded="true">
            <MudNavLink Href="/users">Users</MudNavLink>
            <MudNavLink Href="/security">Security</MudNavLink>
        </MudNavGroup>
        <MudNavLink Href="/about">About</MudNavLink>
    </MudNavMenu>
</MudPaper>
<MudPaper Width="250px" Elevation="0" Class="py-3">
    <MudNavMenu Color="Color.Success" Bordered="true">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Href="/components/navmenu" Match="NavLinkMatch.Prefix" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/billing" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" Expanded="true">
            <MudNavLink Href="/users">Users</MudNavLink>
            <MudNavLink Href="/security">Security</MudNavLink>
        </MudNavGroup>
        <MudNavLink Href="/about">About</MudNavLink>
    </MudNavMenu>
</MudPaper>
```

```razor title="NavMenuMarginExample"
<MudPaper Width="250px" Elevation="0" Class="py-1">
    <MudNavMenu Margin="Margin.Dense" Color="Color.Warning">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Match="NavLinkMatch.Prefix" Href="/components/navmenu" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/thelab" Icon="@Icons.Material.Filled.Science">The Lab</MudNavLink>
    </MudNavMenu>
</MudPaper>
<MudPaper Width="250px" Elevation="0" Class="py-1">
    <MudNavMenu Margin="Margin.Normal" Color="Color.Error">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Match="NavLinkMatch.Prefix" Href="/components/navmenu" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/thelab" Icon="@Icons.Material.Filled.Science">The Lab</MudNavLink>
    </MudNavMenu>
</MudPaper>
```

```razor title="NavMenuRoundedExample"
<MudPaper Width="250px" Elevation="0">
    <MudNavMenu Rounded="true" Margin="Margin.Dense" Color="Color.Primary" Class="pa-2">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Match="NavLinkMatch.Prefix" Href="/components/navmenu" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/thelab" Icon="@Icons.Material.Filled.Science">The Lab</MudNavLink>
    </MudNavMenu>
</MudPaper>
<MudPaper Width="250px" Elevation="0">
    <MudNavMenu Rounded="true" Margin="Margin.Normal" Color="Color.Tertiary" Class="pa-2">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Match="NavLinkMatch.Prefix" Href="/components/navmenu" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/thelab" Icon="@Icons.Material.Filled.Science">The Lab</MudNavLink>
    </MudNavMenu>
</MudPaper>
```

```razor title="NavMenuDenseExample"
<MudPaper Width="250px" Class="py-3" Elevation="0">
    <MudNavMenu Dense="true" Color="Color.Info">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
            <MudNavLink Href="/components/navmenu" Match="NavLinkMatch.Prefix" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
            <MudNavLink Href="/billing" Disabled="true">Billing</MudNavLink>
            <MudNavGroup Title="Settings" Expanded="true">
                <MudNavLink Href="/users">Users</MudNavLink>
                <MudNavLink Href="/security">Security</MudNavLink>
            </MudNavGroup>
            <MudNavLink Href="/about">About</MudNavLink>
    </MudNavMenu>
</MudPaper>
<MudPaper Width="250px" Class="py-3" Elevation="0">
    <MudNavMenu Dense="true" Rounded="true" Margin="Margin.Dense" Color="Color.Secondary" Class="pa-2">
        <MudNavLink Href="/dashboard" Icon="@Icons.Material.Filled.Dashboard">Dashboard</MudNavLink>
        <MudNavLink Href="/components/navmenu" Match="NavLinkMatch.Prefix" Icon="@Icons.Material.Filled.Storage">Servers</MudNavLink>
        <MudNavLink Href="/billing" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" Expanded="true">
            <MudNavLink Href="/users">Users</MudNavLink>
            <MudNavLink Href="/security">Security</MudNavLink>
        </MudNavGroup>
        <MudNavLink Href="/about">About</MudNavLink>
    </MudNavMenu>
</MudPaper>
```

```razor title="NavMenuGroupTitleExample"
<MudPaper Width="250px" Class="py-3" Elevation="0">
    <MudNavMenu>
        <MudText Typo="Typo.h6" Class="px-4">My Application</MudText>
        <MudText Typo="Typo.body2" Class="px-4 mud-text-secondary">Secondary Text</MudText>
        <MudDivider Class="my-2" />
        <MudNavLink Href="/dashboard">Dashboard</MudNavLink>
        <MudNavLink Href="/servers">Servers</MudNavLink>
        <MudNavLink Href="/billing" Disabled="true">Billing</MudNavLink>
        <MudNavGroup Title="Settings" HeaderClass="settings-error" Expanded="true">
            <TitleContent>
                <MudBadge Icon="@Icons.Material.Filled.ErrorOutline" 
                          Color="Color.Error" 
                          Origin="@(RightToLeft ? Origin.CenterLeft : Origin.CenterRight)" 
                          BadgeClass="mx-2">
                    Settings
                </MudBadge>
            </TitleContent>
            <ChildContent>
                <MudNavLink Href="/users">Users</MudNavLink>
                <MudNavLink Href="/security">
                    <MudBadge Content="3" 
                              Color="Color.Error" 
                              Origin="@(RightToLeft ? Origin.CenterLeft : Origin.CenterRight)" 
                              BadgeClass="mx-2">
                        Security
                    </MudBadge>
                </MudNavLink>
            </ChildContent>
        </MudNavGroup>
        <MudNavLink Href="/about">About</MudNavLink>
    </MudNavMenu>
</MudPaper>

@code {
    [CascadingParameter(Name = "RightToLeft")] public bool RightToLeft { get; set; }
}

<style>    
    .settings-error {
        color: red;
    }
</style>
```

The `OnClick` handler provides a way to invoke an action instead of (or in conjunction with) `Href` navigation.

```razor title="NavMenuOnClickExample"
@inject ISnackbar Snackbar

<MudPaper Width="250px" Class="py-3" Elevation="0">
    <MudNavMenu Dense>
        <MudNavGroup Title="Settings" Expanded="true">
            <MudNavLink OnClick="@(() => GoTo("Settings/Users"))">Users</MudNavLink>
            <MudNavLink OnClick="@(() => GoTo("Settings/Security"))">Security</MudNavLink>
        </MudNavGroup>
        <MudNavLink OnClick="@(() => GoTo("About"))">About</MudNavLink>
    </MudNavMenu>
</MudPaper>

@code {
    private void GoTo(string page) => Snackbar.Add($"Clicked {page}");
}
```

The `MultiExpansion` property controls whether only one navigation group can be expanded at a time.
 Only top-level `MudNavGroup` components participate in this behavior.

```razor title="NavMenuMultiExpansionExample"
<MudPaper Width="250px" Class="py-3" Elevation="0">
    <MudNavMenu MultiExpansion="false">
        <MudNavGroup Title="Projects" Expanded="true">
            <MudNavLink Href="/active-projects">Active Projects</MudNavLink>
            <MudNavLink Href="/archived-projects">Archived Projects</MudNavLink>
        </MudNavGroup>

        <MudNavGroup Title="Team">
            <MudNavLink Href="/members">Members</MudNavLink>
            <MudNavLink Href="/permissions">Permissions</MudNavLink>
        </MudNavGroup>

        <MudNavGroup Title="Settings">
            <MudNavLink Href="/profile">Profile</MudNavLink>
            <MudNavLink Href="/notifications">Notifications</MudNavLink>
        </MudNavGroup>
    </MudNavMenu>
</MudPaper>
```
