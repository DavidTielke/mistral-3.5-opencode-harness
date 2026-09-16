# Installation

Getting started with MudBlazor for faster and easier .NET web development.

You can play with MudBlazor online directly in your browser with TryMudBlazor, no installation required.

To get started quickly, you can use our [dotnet templates](https://github.com/MudBlazor/Templates).
 They're based on the Microsoft Web App template but have been modified to include MudBlazor components.

 Open a terminal and install them using this command:

```razor title="InstallationTemplateInstallExample"
dotnet new install MudBlazor.Templates
```

Navigate to a folder where you want your project and run the following command to create a new project:

```razor title="InstallationTemplateUsageExampleAuto"
dotnet new mudblazor --interactivity Auto --name MyApplication --all-interactive
```

```razor title="InstallationTemplateUsageExampleWasm"
dotnet new mudblazor --interactivity WebAssembly --name MyApplication --all-interactive
```

```razor title="InstallationTemplateUsageExampleServer"
dotnet new mudblazor --interactivity Server --name MyApplication --all-interactive
```

You can run `dotnet new mudblazor --help` to see all available options.

If you already have a project and want to add MudBlazor to it, either from a default template or a working application.

Install the library through the NuGet Package Manager or with following command:

```razor title="InstallationManualPackageExample"
dotnet add package MudBlazor
```

After the package is added, you need to add the following in your `_Imports.razor`:

```razor title="InstallationManualImportsExample"
@using MudBlazor
```

Add the following to your HTML head section, it's either `index.html` or `_Layout.cshtml`/`_Host.cshtml`/`App.razor` depending on whether you're running WebAssembly or Server.

```razor title="InstallationManualCssFontsExample"
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
<link href="@Assets["_content/MudBlazor/MudBlazor.min.css"]" rel="stylesheet" />
```

```razor title="InstallationManualCssFontsExampleWasmStandalone"
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
<link href="_content/MudBlazor/MudBlazor.min.css" rel="stylesheet" />
```

Next, add the MudBlazor js file next to the default Blazor script at the end:

On .NET 9 or later, ensure that the `app.MapStaticAssets()` middleware
 is enabled so that `@@Assets[""]` can fingerprint the files. When upgrading from
 an earlier .NET release this does not happen automatically.

Please make sure you've implemented a suitable cache busting strategy for all scripts and stylesheets.
 Otherwise, your users will experience caching related issues when you update MudBlazor.

In the same file as above, the default Blazor template contains Bootstrap.
 This is no longer needed and can be removed.
 Delete the Bootstrap and open-iconic folder as well if you decide to get rid of Bootstrap from your project.
 The `site.css` file you can either keep or remove, just make sure you clear it out of any content.

Add the following in `Program.cs`:

Add the following components to your `MainLayout.razor`:

```razor title="InstallationManualComponentsExample"
@* Required *@
<MudThemeProvider />
<MudPopoverProvider />

@* Needed for dialogs *@
<MudDialogProvider />

@* Needed for snackbars *@
<MudSnackbarProvider />
```

If you experience issues such as certain components not responding to user interactions, or a logged
 `Missing <MudPopoverProvider />` error, your render mode may be configured incorrectly.
 Static rendering is not supported: these providers must render in the same interactive render mode as the components that use them.
 With global interactivity (the render mode set on `<Routes />` in `App.razor`) keep them here in `MainLayout.razor`.
 With per-page interactivity, `MainLayout.razor` renders statically, so add the providers to each interactive page instead.
 [Learn about render modes](https://learn.microsoft.com/aspnet/core/blazor/components/render-modes)
 or
 [view a related discussion](https://github.com/MudBlazor/MudBlazor/discussions/7430).

Now you know how to install MudBlazor, but a common pitfall is to jump straight into different components. We recommend that you read our Layout page to learn about basic project structure and different ways to use our main layout components.
