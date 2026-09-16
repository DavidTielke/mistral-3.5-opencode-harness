# ExitPrompt

Prevent accidental navigation loss by showing a confirmation when users leave a page.
 Use `Disabled` to enable protection conditionally, and `UseNativePrompt` to choose between MudBlazor and browser-native prompts.

```razor title="ExitPromptExample"
<MudExitPrompt Disabled="!_enabled" UseNativePrompt="_useNativePrompt"/>

<MudStack Spacing="2">
    <MudSwitch Label="Enabled" @bind-Value="_enabled" Color="Color.Primary"/>
    <MudSwitch Label="Use native prompt" @bind-Value="_useNativePrompt" Color="Color.Primary"/>
    <MudButton Variant="Variant.Outlined" Color="Color.Primary" Href="/components/exitprompt">Test navigation</MudButton>
</MudStack>

@code {
    private bool _enabled;
    private bool _useNativePrompt;
}
```
