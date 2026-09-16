# SimpleTable

Inside the component, you can use all the regular table elements such as " />, " />, " />, " /> or " />.

```razor title="SimpleTableExample"
<MudSimpleTable Style="overflow-x: auto;">
    <thead>
        <tr>
            @foreach (var h in headings)
            {
                <th>@h</th>
            }
        </tr>
    </thead>
    <tbody>
        @foreach (var row in rows)
        {
            <tr>
                @foreach (var x in row.Split())
                {
                    <td>@x</td>
                }
            </tr>
        }
    </tbody>
</MudSimpleTable>

@code {
    string[] headings = { "ID", "Name", "Email", "Gender", "IP Address" };
    string[] rows = {
        @"1 Ruby ruby_wood@example.org Female 192.0.2.77",
        @"2 Elias elias.doyle+us@example.net Male 198.51.100.88",
        @"3 Aria aria.lopez-training@example.com Female 203.0.113.99",
        @"4 Miles miles_smith2025@example.net Male 192.0.2.110",
        @"5 Eva eva.murphy-ops@example.org Female 198.51.100.121",
        @"6 Leo leo.williams+dev@example.com Male 203.0.113.132",
    };
}
```

Simple Table also supports hover and dense options.

```razor title="SimpleTableHoverDenseExample"
<MudSimpleTable Dense="@dense" Hover="@hover" Bordered="@bordered" Striped="@striped" Style="overflow-x: auto;">
    <thead>
        <tr>
            @foreach (var h in headings)
            {
                <th>@h</th>
            }
        </tr>
    </thead>
    <tbody>
        @foreach (var row in rows)
        {
            <tr>
                @foreach (var x in row.Split())
                {
                    <td>@x</td>
                }
            </tr>
        }
    </tbody>
</MudSimpleTable>
<MudToolBar>
    <MudSwitch @bind-Value="hover" Color="Color.Primary">Hover</MudSwitch>
    <MudSwitch @bind-Value="dense" Color="Color.Secondary">Dense</MudSwitch>
    <MudSwitch @bind-Value="striped" Color="Color.Tertiary">Striped</MudSwitch>
    <MudSwitch @bind-Value="bordered" Color="Color.Warning">Bordered</MudSwitch>
</MudToolBar>

@code {
    private bool dense = false;
    private bool hover = true;
    private bool striped = false;
    private bool bordered = false;

    string[] headings = { "ID", "Name", "Email", "Gender", "IP Address" };
    string[] rows = {
        @"1 Clara clara.jones+team@example.com Female 192.0.2.11",
        @"2 Felix felix_martin88@example.net Male 198.51.100.22",
        @"3 Isla isla-fernandez@example.org Female 203.0.113.33",
        @"4 Jonah jonah.brown_dev@example.com Male 192.0.2.44",
        @"5 Mia mia.chen-marketing@example.net Female 198.51.100.55",
        @"6 Hugo hugo.taylor123@example.org Male 203.0.113.66",
    };
}
```

Set `FixedHeader="true"` to make the header sticky when scrolling the table. The table will scroll if you set style to `height:300px;`, for instance.

```razor title="SimpleTableFixedHeaderExample"
<MudSimpleTable Hover="true" Dense="true" FixedHeader="@fixedheader" Style="@(fixedheader?"height:300px;":"")">
    <thead>
        <tr>
            @foreach (var h in headings)
            {
                <th>@h</th>
            }
        </tr>
    </thead>
    <tbody>
        @foreach (var row in rows)
        {
            <tr>
                @foreach (var x in row.Split())
                {
                    <td>@x</td>
                }
            </tr>
        }
    </tbody>
</MudSimpleTable>
<MudSwitch @bind-Value="fixedheader" Color="Color.Primary">Fixed Header</MudSwitch>

@code {
    bool fixedheader = true;
    string[] headings = { "ID", "Name", "Email", "Gender", "IP Address" };
    string[] rows = {
        @"1 Aiden a.reed+work@example.com Male 192.0.2.10",
        @"2 Mason mason_gray-1@example.net Male 192.0.2.21",
        @"3 Leo leo.hart1990@example.org Male 198.51.100.32",
        @"4 Zara zara.armstrong.sales+eu@example.com Female 198.51.100.43",
        @"5 Rowan rowan.phillips_team@example.net Male 198.51.100.54",
        @"6 Iris iris_morgan@example.org Female 203.0.113.65",
        @"7 Ethan ethan.brooks+dev@example.com Male 203.0.113.76",
        @"8 Noah n.carter-hr@example.net Male 203.0.113.87",
        @"9 Lily lily_green123@example.org Female 192.0.2.98",
        @"10 Nina nina.olsen+news@example.com Female 192.0.2.109",
        @"11 Owen owen.davis_uk@example.net Male 198.51.100.111",
        @"12 Emma emma.klein-ops@example.org Female 203.0.113.122",
    };
}
```
