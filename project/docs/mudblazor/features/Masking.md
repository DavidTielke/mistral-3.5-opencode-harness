# Masking

## Further examples

```razor title="BlockMaskExample"
<MudGrid Class="justify-space-between" Style="max-width: 400px;">
    <MudItem xs="12">
        <MudTextField Mask="@mask" Label="Flight number" 
                      @bind-Value="text"  Variant="@Variant.Outlined" Clearable />
    </MudItem>
    <MudItem xs="12">
        Flight number: <b>@text</b>
    </MudItem>
</MudGrid>

@code {
    public string text { get; set; }

    IMask mask = new BlockMask(delimiters:" ", new Block('a', 1,3), new Block('0', 1,4));
}
```

```razor title="CustomCharactersExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@mask1" Label="MAC Address"  HelperText="@mask1.Mask"
                      @bind-Value="mac1"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@mask2" Label="MAC with Placeholder" HelperText="@mask2.Mask"
                      @bind-Value="mac2"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        MAC Address: <b>@mac1</b>
    </MudItem>
    <MudItem xs="12" sm="6">
        Cleaned MAC Address: <b>@mac2</b>
    </MudItem>
</MudGrid>

@code {
    public string mac1, mac2;

    public PatternMask mask1 = new PatternMask("##:##:##:##:##:##") { 
        MaskChars = new[] { new MaskChar('#', @"[0-9a-fA-F]") } 
    };

    public PatternMask mask2 = new PatternMask("XX-XX-XX-XX-XX-XX") { 
        MaskChars = new[] { new MaskChar('X', @"[0-9a-fA-F]") },
        Placeholder = '_',
        CleanDelimiters = true,
        Transformation = AllUpperCase
    };
    
    // transform lower-case chars into upper-case chars
    private static char AllUpperCase(char c) => c.ToString().ToUpperInvariant()[0];

}
```

```razor title="DateMaskExample"
@using System.Globalization



<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem  xs="12" sm="6">
        <MudTextField Mask="@mask1" Label="ISO Date"  HelperText="@mask1.Mask"
                      @bind-Value="isoDate"  Variant="@Variant.Text" Clearable />
        ISO: <b>@isoDate</b>
    </MudItem>
    <MudItem  xs="12" sm="6">
        <MudTextField Mask="@mask2" Label="US" HelperText="@mask2.Mask"
                      @bind-Value="usDate"  Variant="@Variant.Text" Clearable />
        US: <b>@usDate</b>
    </MudItem>
    <MudItem  xs="12" sm="6">
        <MudTextField Mask="@mask3" Label="AT"  HelperText="@mask3.Mask"
                      @bind-Value="atDate"  Variant="@Variant.Text" Clearable />
        AT: <b>@atDate</b>
    </MudItem>
    <MudItem  xs="12" sm="6">
        <MudTextField Mask="@mask4" Label="Month" HelperText="@mask4.Mask"
                      @bind-Value="monthAndYear"  Variant="@Variant.Text" Clearable />
        MM/YY: <b>@monthAndYear</b>
    </MudItem>
</MudGrid>

@code {
    string isoDate, usDate, atDate;
    string monthAndYear;

    IMask mask1 = new DateMask("yyyy-MM-dd");
    IMask mask2 = new DateMask("MM/dd/yyyy");
    IMask mask3 = new DateMask("TT.MM.JJJJ", 'J', 'M', 'T');
    IMask mask4 = new DateMask("MM/YY", 'Y', 'M');
}
```

```razor title="MultiMaskExample"
@using MudBlazor.Interfaces

<MudGrid Class="justify-space-between mb-3 mx-n3" Style="max-width: 800px;">
    <MudItem xs="12">
        <MudTextField Mask="@mask" Label="Credit Card Number" Style="max-width: 400px;"
                  @bind-Value="cardNumber" Variant="@Variant.Text" Clearable/>
    </MudItem>
    <MudItem xs="12">
        Credit Card: <b>@cardNumber</b>
    </MudItem>
</MudGrid>

@code {
    string cardNumber, cardType;

    MultiMask mask = new MultiMask("0000 0000 0000 0000",
        new MaskOption("American Express", "0000 000000 00000", @"^(34|37)"),
        new MaskOption("Diners Club", "0000 000000 0000", @"^(30[0-59])"),
        new MaskOption("JCB", "0000 0000 0000 0000", @"^(35|2131|1800)"),
        new MaskOption("VISA", "0000 0000 0000 0000", @"^4"),
        new MaskOption("MasterCard", "0000 0000 0000 0000", @"^(5[1-5]|2[2-7])"),
        new MaskOption("Discover", "0000 0000 0000 0000", @"^(6011|65|64[4-9])")
    );
    MaskOption? option = null;
    Dictionary<string, Variant> variants = new();
    MudElement element;

    protected override void OnInitialized()
    {
        base.OnInitialized();
        mask.OptionDetected += (o, input) =>
        {
            option = o;
            cardType = o == null ? "Unknown" : o.Value.Id;
            UpdateClasses();
            // re-render only MudElement's children
            (element as IMudStateHasChanged)?.StateHasChanged();
        };
        UpdateClasses();
    }

    void UpdateClasses()
    {
        foreach (var type in new[] { "American Express", "Diners Club", "JCB", "VISA", "MasterCard", "Discover" })
            variants[type] = type == cardType ? Variant.Filled : Variant.Outlined;
    }
}

@* Note: MudElement is used here to limit the render-update to this html tree  *@
<MudElement HtmlTag="div" @ref="element" Style="max-width: 800px;" Class="mud-width-full">
    <MudGrid Class="justify-space-between">
        <MudItem xs="12" sm="6">
            <MudAlert Variant="@variants["American Express"]" NoIcon Dense Class="mb-2">
                American Express: starts with 34/37<br/>
                <pre>34&#183;&#183; &#183;&#183;&#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183;&#183;</pre>
            </MudAlert>
            <MudAlert Variant="@variants["Diners Club"]" NoIcon Dense Class="mb-2">
                Diners Club: starts with 300-305/309<br/>
                <pre>300&#183; &#183;&#183;&#183;&#183;&#183;&#183; &#183;&#183;&#183;</pre>
            </MudAlert>
            <MudAlert Variant="@variants["JCB"]" NoIcon Dense Class="mb-2">
                JCB: starts with 35/2131/1800<br/>
                <pre>35&#183;&#183; &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183;</pre>
            </MudAlert>
        </MudItem>
        <MudItem xs="12" sm="6">
            <MudAlert Variant="@variants["VISA"]" NoIcon Dense Class="mb-2">
                VISA: starts with 4<br/>
                <pre>4&#183;&#183;&#183; &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183;</pre>
            </MudAlert>
            <MudAlert Variant="@variants["MasterCard"]" NoIcon Dense Class="mb-2">
                MasterCard: starts with 51-55/22-27<br/>
                <pre>51&#183;&#183; &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183;</pre>
            </MudAlert>
            <MudAlert Variant="@variants["Discover"]" NoIcon Dense Class="mb-2">
                Discover: starts with 6011/65/644-649<br/>
                <pre>6011 &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183; &#183;&#183;&#183;&#183;</pre>
            </MudAlert>
        </MudItem>
    </MudGrid>
    <MudText Class="mud-text-secondary" Typo="Typo.body2">Example inspired by Cleave.js</MudText>
</MudElement>
```

```razor title="PatternMaskExample"
<MudGrid Class="justify-space-between" Style="max-width: 400px;">
    <MudItem xs="12">
        <MudTextField Mask="@(new PatternMask("0000 0000 0000 0000"))" Label="Credit Card Number" 
                      @bind-Value="creditCard"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="4">
        <MudTextField Mask="@(new DateMask("MM/YY", 'Y', 'M'))" Label="Expires" 
                      @bind-Value="expiration"  Variant="@Variant.Text" />
    </MudItem>
    <MudItem xs="4"/>
    <MudItem xs="4">
        <MudTextField Mask="@(new PatternMask("000"))" Label="CVC" 
                      @bind-Value="cvc"  Variant="@Variant.Text" />
    </MudItem>
    <MudItem xs="12">
        Credit Card Number: <b>@creditCard</b><br/>
        Expiration Date: <b>@expiration</b><br/>
        CVC: <b>@cvc</b>
    </MudItem>
</MudGrid>

@code {
    private string creditCard;
    private string expiration;
    private string cvc;
}
```

```razor title="RegexMaskEmailExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@emailMask" Label="Email Address"  HelperText="@emailMask.Mask"
                      @bind-Value="email"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@emailCustomMask" Label="Email Address with Custom Mask"  HelperText="@emailCustomMask.Mask"
                      @bind-Value="email2"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        Email 1: <b>@email</b>
    </MudItem>
    <MudItem xs="12" sm="6">
        Email 2: <b>@email2</b>
    </MudItem>
</MudGrid>

@code {
    public string email;
    public string email2;
    public IMask emailMask = RegexMask.Email();
    public IMask emailCustomMask = RegexMask.Email("<user>@<domain.com>");
}
```

```razor title="RegexMaskExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem  xs="12" sm="6">
        <MudTextField Mask="@mask1" Label="Only digits (unlimited length)"  HelperText="@mask1.Mask"
                      @bind-Value="numbers"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem  xs="12" sm="6">
        <MudTextField Mask="@mask2" Label="Russian postal code" HelperText="@mask2.Mask"
                      @bind-Value="russianZip"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem  xs="12" sm="6">
        Number: <b>@numbers</b>
    </MudItem>
    <MudItem  xs="12" sm="6">
        Russian ZIP: <b>@russianZip</b>
    </MudItem>
</MudGrid>

@code {
    public string numbers, russianZip;

    public IMask mask1 = new RegexMask(@"^\d+$");

    public IMask mask2 = new RegexMask(@"^[1-6]\d{0,5}$");

}
```

```razor title="RegexMaskGuidExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@guidMask" Label="Identifier" HelperText="@guidMask.Mask"
                      @bind-Value="identifier" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        Identifier: <b>@identifier</b>
    </MudItem>
</MudGrid>

@code {
    public string identifier;
    public IMask guidMask = RegexMask.Guid();
}
```

```razor title="RegexMaskHexColorExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@hexColorMask" Label="Color" HelperText="@hexColorMask.Mask"
                      @bind-Value="hexColor" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6" Class="d-flex align-center">
        Color: <b class="ml-1">@hexColor</b>
        <MudPaper Class="ml-2" Elevation="0" Style="@($"width: 24px; height: 24px; background: {hexColor};")" />
    </MudItem>
</MudGrid>

@code {
    public string hexColor = "#594AE2";
    public IMask hexColorMask = RegexMask.HexColor();
}
```

```razor title="RegexMaskIPv4Example"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@ipv4Mask" Label="IPv4 Address"  HelperText="@ipv4Mask.Mask"
                      @bind-Value="ip"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@ipv4PortMask" Label="IPv4 Address with Port"  HelperText="@ipv4PortMask.Mask"
                      @bind-Value="ipPort"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        IPv4: <b>@ip</b>
    </MudItem>
    <MudItem xs="12" sm="6">
        IPv4 w/Port: <b>@ipPort</b>
    </MudItem>
</MudGrid>

@code {
    public string ip;
    public string ipPort;
    public IMask ipv4Mask = RegexMask.IPv4();
    public IMask ipv4PortMask = RegexMask.IPv4(true);
}
```

```razor title="RegexMaskIPv6Example"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@ipv6Mask" Label="IPv6 Address"  HelperText="@ipv6Mask.Mask"
                      @bind-Value="ip"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@ipv6PortMask" Label="IPv6 Address with Port"  HelperText="@ipv6PortMask.Mask"
                      @bind-Value="ipPort"  Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        IPv4: <b>@ip</b>
    </MudItem>
    <MudItem xs="12" sm="6">
        IPv4 w/Port: <b>@ipPort</b>
    </MudItem>
</MudGrid>

@code {
    public string ip;
    public string ipPort;
    public IMask ipv6Mask = RegexMask.IPv6();
    public IMask ipv6PortMask = RegexMask.IPv6(true);
}
```

```razor title="RegexMaskMacAddressExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@macAddressMask" Label="MAC Address" HelperText="@macAddressMask.Mask"
                      @bind-Value="macAddress" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@macAddressDashMask" Label="MAC Address with Dashes" HelperText="@macAddressDashMask.Mask"
                      @bind-Value="macAddressDash" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        MAC: <b>@macAddress</b>
    </MudItem>
    <MudItem xs="12" sm="6">
        MAC w/Dashes: <b>@macAddressDash</b>
    </MudItem>
</MudGrid>

@code {
    public string macAddress;
    public string macAddressDash;
    public IMask macAddressMask = RegexMask.MacAddress();
    public IMask macAddressDashMask = RegexMask.MacAddress(separator: '-');
}
```

```razor title="RegexMaskProgressiveExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@blocked" Label="Blocks input: ^[0-9]{5}$"
                      HelperText="Exact length {5} never matches a shorter prefix, so every keystroke is rejected."
                      @bind-Value="a" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@works" Label="Accepts input: ^[0-9]{0,5}$"
                      HelperText="Bounded-from-zero matches every prefix, so up to 5 digits can be typed."
                      @bind-Value="b" Variant="@Variant.Text" Clearable />
    </MudItem>
</MudGrid>

@code {
    public string a, b;

    // Blocks all input: prefixes "1", "12" do not match ^[0-9]{5}$
    public IMask blocked = new RegexMask(@"^[0-9]{5}$");

    // Works: every prefix ("", "1", ... "12345") matches ^[0-9]{0,5}$
    public IMask works = new RegexMask(@"^[0-9]{0,5}$");
}
```

```razor title="RegexMaskTime24Example"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@timeMask" Label="Time" HelperText="@timeMask.Mask"
                      @bind-Value="time" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@timeWithSecondsMask" Label="Time with Seconds" HelperText="@timeWithSecondsMask.Mask"
                      @bind-Value="timeWithSeconds" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        Time: <b>@time</b>
    </MudItem>
    <MudItem xs="12" sm="6">
        Time w/Seconds: <b>@timeWithSeconds</b>
    </MudItem>
</MudGrid>

@code {
    public string time;
    public string timeWithSeconds;
    public IMask timeMask = RegexMask.Time24();
    public IMask timeWithSecondsMask = RegexMask.Time24(includeSeconds: true);
}
```

```razor title="RegexMaskUsZipCodeExample"
<MudGrid Class="justify-space-between" Style="max-width: 800px;">
    <MudItem xs="12" sm="6">
        <MudTextField Mask="@zipCodeMask" Label="ZIP Code" HelperText="@zipCodeMask.Mask"
                      @bind-Value="zipCode" Variant="@Variant.Text" Clearable />
    </MudItem>
    <MudItem xs="12" sm="6">
        ZIP Code: <b>@zipCode</b>
    </MudItem>
</MudGrid>

@code {
    public string zipCode;
    public IMask zipCodeMask = RegexMask.UsZipCode();
}
```
