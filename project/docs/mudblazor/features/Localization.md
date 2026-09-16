# Localization

Localization allows the text in some components to be translated.

MudBlazor itself provides English language strings for texts found in e.g. the `MudDataGrid` filter options.
 By registering a custom `MudLocalizer` implementation as a Service, you can provide custom translations.

 Note: if `Thread.CurrentThread.CurrentUICulture` is English, the included English translations will be used.

 Note: Some components don't support localization yet. Contributions are welcome!

You can help us translate MudBlazor into your language by contributing to our
 [Weblate Project](https://hosted.weblate.org/engage/mudblazor/).
 Visit the [Translations Repository](https://github.com/MudBlazor/Translations) for more information.

 The crowdsourced translations are provided via the separate NuGet package `MudBlazor.Translations`.

 Open a terminal and install it with this command.

Add the following in `Program.cs` to register the crowdsourced translations.

Add the following in `Program.cs` to register your custom localization service.
 `AddTransient` can be replaced with `TryAddTransient` and the scope can be changed to `Scoped` or `Singleton` depending on your exact implementation.

An example `MudLocalizer` implementation using Microsoft default `IStringLocalizer`.
 Using ResX, you'll have to leave the default culture translations file empty if you want to use English as the fallback language for missing translations. Otherwise, the default culture values will be used as a fallback for all non-English languages.

An example implementing `MudLocalizer` using a hardcoded dictionary for the translations.
 Note that `LocalizedString.ResourceNotFound` should be true, if there is no custom translation for a given key.
 If `LocalizedString.ResourceNotFound` is true, the included English localization will be used.

The interface `ILocalizationInterceptor` can be used to fully customize the translations.
 For example if you don't need the default English translation, or you want to get the translation from other source.

The current default English language localization strings:

 x.Key as string" Title="Translation Key" InitialDirection="SortDirection.Ascending"/>
 x.Value as string" Title="English Translation"/>
