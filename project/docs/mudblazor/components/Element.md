# Element

`MudElement` has an `HtmlTag` parameter that
 tells it which html element to render. It also accepts all possible html attributes and passes them on
 to the underlying element. Furthermore, you can set the parameters `Class` and
 `Style` for styling.

```razor title="MudElementSimpleExample"
Visit us on 
<MudElement HtmlTag="a"
            Class="ms-1"
            Style="color:red;font-weight:bold;"
            href="https://github.com/MudBlazor/MudBlazor"
            target="blank"
            rel="noopener noreferrer">
    GitHub
</MudElement>
```

In this example the rendered html element changes dynamically. This is the main use-case of
 `MudElement`.

```razor title="MudElementChangingExample"
<MudElement HtmlTag="@htmlTag"
            Class="reset-style"
            href="https://mudblazor.com"
            value="@($"The underlying tag is '{htmlTag}'")">
    The underlying tag is '@htmlTag'
</MudElement>

<MudButton OnClick="ChangeTag" Variant="Variant.Filled" Color="Color.Secondary">Change tag</MudButton>

@code{
    private string htmlTag = "a";
    private string[] tags = new[] { "a", "button", "input" };
    private int index = 0;

    private void ChangeTag()
    {
        index = (index + 1) % tags.Length;
        htmlTag = tags[index];
    }
}

<style>
    .reset-style, .reset-style * {
        all: revert;
    }
</style>
```

If you need access to the underlying element, you can two-way bind an `ElementReference`
 to `MudElement` which in turn passes it to the element it renders.

 Just make sure that you use use `@("@")bind-Ref` instead of just `Ref`
 so the underlying reference can be passed out into your variable.

```razor title="MudElementRefExample"
<MudElement HtmlTag="button" @onclick="Focus" Style="padding: 4px 12px 4px 12px; background-color: #0067b8; color: #fff;">
    Click to focus
</MudElement>

@*this element is going to be focused through JS via its reference*@

<MudElement @bind-Ref="myRef" HtmlTag="input" Style="border: solid 1px #869E9E; padding: 0px 8px; height:28px;"/>

@code{
    ElementReference myRef = new ElementReference();

    async Task Focus()
    {
        //this js snippet does `document.querySelector(myRef).focus();`
       await myRef.FocusAsync();
    }
}
```
