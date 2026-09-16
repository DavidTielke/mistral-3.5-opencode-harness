# Hotkey

There are 2 general usages: Render child components and/or use the
 `OnHotkeyPressed`
 event.

 If you want a global hotkey, add the
 `MudHotkey`
 to your
 `MainLayout.razor`
 .

The handler receives a `HotkeyEventArgs` identifying the
 `Key` and `KeyModifiers` that triggered it,
 plus the `MudHotkey` that raised it via `Sender`,
 so several hotkeys can share a single handler. Handlers that don't need it can stay
 parameterless.

```razor title="HotkeyExampleEventCallback"
@using MudBlazor.Utilities
@inject ISnackbar SnackbarService

<MudStack>
    <MudStack Row="true">
        <MudSelect T="JsKey" Label="Key" @bind-Value="@_selectedKey" Style="width: 200px;">
            @foreach (var key in Enum.GetValues<JsKey>())
            {
                <MudSelectItem T="JsKey" Value="@key">@Enum.GetName(typeof(JsKey), key)</MudSelectItem>
            }
        </MudSelect>
        <MudSelect T="JsKeyModifier" Label="Modifier" @bind-SelectedValues="@_selectedKeyModifiers" MultiSelection="true" Style="min-width: 200px;">
            @foreach (var keyModifier in Enum.GetValues<JsKeyModifier>())
            {
                <MudSelectItem T="JsKeyModifier" Value="@keyModifier">@Enum.GetName(typeof(JsKeyModifier), keyModifier)</MudSelectItem>
            }
        </MudSelect>
    </MudStack>
    <MudAlert Severity="Severity.Info">Press the selected key-combination to show the snackbar.</MudAlert>
</MudStack>

<MudHotkey Key="@_selectedKey" KeyModifiers="@_selectedKeyModifiers" OnHotkeyPressed="OnHotKey" />

@code {
    private JsKey _selectedKey = JsKey.KeyB;
    private IReadOnlyCollection<JsKeyModifier> _selectedKeyModifiers = [JsKeyModifier.ControlLeft];

    private void OnHotKey(HotkeyEventArgs args)
    {
        var modifiers = string.Join(" + ", args.KeyModifiers);
        var combination = string.IsNullOrEmpty(modifiers) ? $"{args.Key}" : $"{modifiers} + {args.Key}";
        SnackbarService.Add($"Hotkey pressed: {combination}", Severity.Success);
    }
}
```

## Further examples

```razor title="HotkeyExampleChildContent"
@using MudBlazor.Utilities

<MudStack>
    <MudStack Row="true">
        <MudSelect Label="Key" @bind-Value="@_selectedKey" Style="width: 200px;">
            @foreach (var key in Enum.GetValues<JsKey>())
            {
                <MudSelectItem Value="@key">@Enum.GetName(typeof(JsKey), key)</MudSelectItem>
            }
        </MudSelect>
        <MudSelect T="JsKeyModifier" Label="Modifier" @bind-SelectedValues="@_selectedKeyModifiers" MultiSelection="true" Style="min-width: 200px;">
            @foreach (var keyModifier in Enum.GetValues<JsKeyModifier>())
            {
                <MudSelectItem T="JsKeyModifier" Value="@keyModifier">@Enum.GetName(typeof(JsKeyModifier), keyModifier)</MudSelectItem>
            }
        </MudSelect>
        <MudStack Spacing="0">
            <MudCheckBox @bind-Value="@_hideChildContentOnRepress" Label="Hide child content on repress" Class="mt-n3"/>
            <MudCheckBox @bind-Value="@_disabled" Label="Disabled" Class="mt-n5"/>
        </MudStack>
    </MudStack>
    <MudAlert Severity="Severity.Info">Press the selected key-combination to toggle the button.</MudAlert>
    <MudHotkey Key="@_selectedKey" KeyModifiers="@_selectedKeyModifiers" HideChildContentOnRepress="@_hideChildContentOnRepress" Disabled="@_disabled">
        <MudButton EndIcon="@Icons.Material.Outlined.EmojiEmotions" Color="Color.Primary" Variant="Variant.Filled">
            I'm a button
        </MudButton>
    </MudHotkey>
</MudStack>

@code {
    private bool _disabled;
    private JsKey _selectedKey = JsKey.KeyA;
    private bool _hideChildContentOnRepress = true;
    private IReadOnlyCollection<JsKeyModifier> _selectedKeyModifiers = [JsKeyModifier.ControlLeft];
}
```
