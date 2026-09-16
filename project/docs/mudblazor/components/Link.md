# Link

```razor title="LinkSimpleExample"
<MudLink Href="#">Default</MudLink>
<MudLink Href="#" Typo="Typo.subtitle1">Different typography</MudLink>
<MudLink Href="#" Disabled="true">Disabled link</MudLink>
```

```razor title="LinkInlineExample"
<MudText Typo="Typo.caption">
    Caption text with an <MudLink Href="#">inline link</MudLink> inherits the smaller typography.
</MudText>
```

```razor title="LinkUnderlineExample"
<MudLink Href="#">Default</MudLink>
<MudLink Href="#" Underline="Underline.Always">Always</MudLink>
<MudLink Href="#" Underline="Underline.None">None</MudLink>
```

Links can have icons at the start or end using the `StartIcon` and `EndIcon` properties.

```razor title="LinkIconExample"
<MudLink Href="https://mudblazor.com/" StartIcon="@Icons.Material.Filled.Home">Home</MudLink>
<MudLink Href="https://github.com/MudBlazor/MudBlazor" Target="_blank" EndIcon="@Icons.Custom.Brands.GitHub">GitHub</MudLink>
<MudLink Href="/" StartIcon="@Icons.Material.Filled.Link" EndIcon="@Icons.Material.Filled.OpenInNew">Internal Link</MudLink>
```

`OnClick` property provides a way to invoke an action instead of (or in conjunction with) `Href` navigation.

```razor title="LinkOnClickExample"
<MudLink OnClick="Count" Href="/components/link#onclick">Count and go</MudLink>
<MudLink OnClick="Count">Count</MudLink>
<MudText>Counter: @counter</MudText>

@code {
    private int counter = 0;

    private void Count() => counter++;
}
```
