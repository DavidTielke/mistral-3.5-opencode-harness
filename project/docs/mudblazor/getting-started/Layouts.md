# Layouts

Getting started with MudBlazor for faster and easier web development.

MudBlazor comes with many components of varying functions and behaviours. Some are built to control the layout of your application, and others may be used to provide other key functions, behaviours and operations for these components.

 Notably, the four most important providers are `@nameof(MudThemeProvider)`, `@nameof(MudPopoverProvider)`, `@nameof(MudDialogProvider)` and `@nameof(MudSnackbarProvider)`. If you have followed the installation guide, these will already be in your MainLayout page.

 `MudThemeProvider` is the component which provides your app with theme settings such as colors, fonts, shadows and other layout properties. It provides the MudBlazor theme by default. There should only exist one instance of the `MudThemeProvider` in your project.

 Another two notable layout components are `MudLayout` and `MudMainContent`. `MudLayout` should be placed in the root of your application within the MainLayout page. Directly inside `MudLayout` you can place `MudMainContent` - this is where your page body will reside.

 To better illustrate this, let's open the `MainLayout.razor` page and create a basic MudBlazor layout.

```razor title="LayoutBasicMudBlazorExample"
@inherits LayoutComponentBase


<MudThemeProvider/>
<MudPopoverProvider/>
<MudDialogProvider/>
<MudSnackbarProvider/>

<MudLayout>
    <MudMainContent>
        @Body
    </MudMainContent>
</MudLayout>
```

Before `MudMainContent` we can add `MudAppBar` and `MudDrawer` components so they are included in all pages using this layout.

```razor title="LayoutBasicAppbarExample"
@inherits LayoutComponentBase


<MudThemeProvider/>
<MudPopoverProvider/>
<MudDialogProvider/>
<MudSnackbarProvider/>

<MudLayout>
    <MudAppBar>
        My Application
    </MudAppBar>
    <MudDrawer Open="true">

    </MudDrawer>
    <MudMainContent>
        @Body
    </MudMainContent>
</MudLayout>
```

Because we added the components directly inside `MudLayout`, `MudMainContent` takes the height of our `MudAppBar` and uses that as top padding. If `MudDrawer` is open, the main content has the correct left or right margin applied.

 Now to add some basic functionality. Adding a `MudIconButton` will open and close the drawer, whilst adding a `NavMenu` will provide some basic navigation.

```razor title="LayoutBasicFunctionalityExample"
@inherits LayoutComponentBase


<MudThemeProvider />
<MudPopoverProvider />
<MudDialogProvider />
<MudSnackbarProvider />

<MudLayout>
    <MudAppBar>
        <MudIconButton Icon="@Icons.Material.Filled.Menu" Color="Color.Inherit" Edge="Edge.Start" OnClick="@((e) => DrawerToggle())" />
        My Application
    </MudAppBar>
    <MudDrawer @bind-Open="@_drawerOpen">
        <MyNavMenu/>
    </MudDrawer>
    <MudMainContent>
        @Body
    </MudMainContent>
</MudLayout>

@code {
    bool _drawerOpen = true;

    void DrawerToggle()
    {
        _drawerOpen = !_drawerOpen;
    }
}
```

And our `MyNavMenu.razor` looks like this.

```razor title="LayoutBasicNavMenuExample"
<MudNavMenu>
    <MudNavLink Href="/" Match="NavLinkMatch.All">Dashboard</MudNavLink>
    <MudNavLink Href="/servers" Match="NavLinkMatch.Prefix">Servers</MudNavLink>
    <MudNavGroup Title="Settings" Expanded="true">
        <MudNavLink Href="/users"  Match="NavLinkMatch.Prefix">Users</MudNavLink>
        <MudNavLink Href="/security"  Match="NavLinkMatch.Prefix">Security</MudNavLink>
    </MudNavGroup>
    <MudNavLink Href="/about"  Match="NavLinkMatch.Prefix">About</MudNavLink>
</MudNavMenu>
```

Before you go on and add content to your pages, depending on what you are building you may want to make use of the `MudContainer` component to center some content and add some gutters to your page. This can be done either directly in your `MainLayout.razor` page, or, alternatively, do this in each individual page.

```razor title="LayoutBasicContainerExample"
@inherits LayoutComponentBase


<MudMainContent>
    <MudContainer MaxWidth="MaxWidth.Medium">
        @Body
    </MudContainer>
</MudMainContent>
```

## Further examples

```razor title="MyNavMenu"
@code {
    
}
```
