# FocusTrap

By default, when the component is created or enabled, focus is set on the first tabbable child element. This behavior can be modified by using the `DefaultFocus` property.
 If still enabled, the focus is restored to the original element when the component is disposed.

Take note that the focus trap is only for TAB key management; it does not prevent setting the focus elsewhere with the mouse, so you may use an `Overlay` to prevent this.

```razor title="FocusTrapUsageExample"
<div class="d-flex mb-4">
    <MudCheckBox @bind-Value="Disabled" Label="Disabled"></MudCheckBox>
    <MudSelect @bind-Value="DefaultFocus" Label="Default Focus" Dense="true" Class="ml-4">
        <MudSelectItem Value="DefaultFocus.None">None</MudSelectItem>
        <MudSelectItem Value="DefaultFocus.Element">Element</MudSelectItem>
        <MudSelectItem Value="DefaultFocus.FirstChild">FirstChild</MudSelectItem>
        <MudSelectItem Value="DefaultFocus.LastChild">LastChild</MudSelectItem>
    </MudSelect>
</div>

<MudTextField T="string" Variant="Variant.Outlined"></MudTextField>

<MudPaper Class="pa-4">
    <MudFocusTrap Disabled="Disabled" DefaultFocus="DefaultFocus">
        <MudTextField T="string" Variant="Variant.Outlined"></MudTextField>
        <MudTextField T="string" Variant="Variant.Outlined"></MudTextField>
        <MudTextField T="string" Variant="Variant.Outlined"></MudTextField>
    </MudFocusTrap>
</MudPaper>

<MudTextField T="string" Variant="Variant.Outlined"></MudTextField>

@code {

    bool Disabled { get; set; }

    DefaultFocus DefaultFocus { get; set; } = DefaultFocus.FirstChild;
 }
```
