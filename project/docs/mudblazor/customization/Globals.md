# Globals

Static properties that let you control the default behavior of some parts of MudBlazor.

You can find default setting overrides of some MudBlazor features in the static class.
 These defaults should be set when your application initializes, such as when adding MudBlazor services.
 If they are set after the app has started, they may not take effect until the next page load, or may not take effect at all.

 Note: The `MudGlobal` class is being phased out for visual and theming properties.

 Most styling should be done directly through component parameters (for one-off tweaks) or through the theme system and CSS (for app-wide customization).

 See the [removal issue](https://github.com/MudBlazor/MudBlazor/issues/12046), or feel free to [share feedback](https://github.com/MudBlazor/MudBlazor/discussions) on migration or missing theme hooks.

You can handle MudBlazor component exceptions using `MudGlobal.UnhandledExceptionHandler`.

```razor title="GlobalExceptionHandlerExample"
// Add MudBlazor services
Services.AddMudServices();

// Send all exceptions to the console
MudGlobal.UnhandledExceptionHandler = (exception) => Console.WriteLine(exception);
```
