# Highlighter

The highlighter can be used in combination with any other component.

```razor title="HighlighterWithListExample"
<MudPaper Elevation="0">
    <MudList T="string">
        <MudListSubheader>
            <MudTextField @bind-Value="searchTerm" AdornmentIcon="@Icons.Material.Filled.Brush"
                          Adornment="Adornment.End" Immediate="true" Variant="Variant.Outlined" />
        </MudListSubheader>

        @foreach (var sentence in sentences)
        {
            <MudListItem @key="sentence" Icon="@Icons.Material.Filled.Folder">
                <MudHighlighter Text="@sentence" HighlightedText="@searchTerm" />
            </MudListItem>
        }
    </MudList>
</MudPaper>

@code {
    string searchTerm = "item";
    IEnumerable<string> sentences = new List<string>
    {
        "This is the first item", "This is the second item", "This is the third item"
    };
}
```

```razor title="HighlighterWithTableExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable Items="@GetElements()">
    <ToolBarContent>
        <MudText Typo="Typo.h6">Periodic Elements</MudText>
        <MudSpacer />
        <MudTextField @bind-Value="_searchTerm" Placeholder="Search" Adornment="Adornment.End" AdornmentIcon="@Icons.Material.Filled.Search" IconSize="Size.Medium" Class="mt-0" Immediate="true"></MudTextField>
    </ToolBarContent>

    <HeaderContent>
        <MudTh>Name</MudTh>
    </HeaderContent>

    <RowTemplate>
        <MudTd DataLabel="Name">
            <MudHighlighter Text="@context.Name" HighlightedText="@_searchTerm" />
        </MudTd>
    </RowTemplate>
</MudTable>

@code {
    private string _searchTerm = "H";
    private IEnumerable<Element> _elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        _elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }

    private IEnumerable<Element> GetElements() => _elements.Where(e => e.Name.Contains(_searchTerm));
}
```

Set the UntilNextBoundary property to true if you want to highlight the text until the next regex boundary occurs.

Set the CaseSensitive property to true to perform a case-sensitive highlight.

Set the Markup property to true to render markup content as a RenderFragment.

```razor title="HighlighterUntilNextBoundaryExample"
<MudTextField Style="max-width:250px" @bind-Value="highlightedText" Immediate="true" Label="Highlighted Text" />
<MudPaper Class="pa-4 mt-4" Elevation="0">
    @foreach (var paragraph in paragraphs)
    {
        <MudText @key="paragraph" Class="ma-2">
            <MudHighlighter Text="@paragraph"
                         HighlightedText="@highlightedText"
                         UntilNextBoundary="@untilNextBoundary"
                         CaseSensitive="@caseSensitive"
                         Markup="@markup"
                         Class="@(untilNextBoundary ? "pa-1 mud-elevation-2 mud-theme-primary":"")" />
        </MudText>
    }

</MudPaper>
<MudSwitch @bind-Value="untilNextBoundary" Label="UntilNextBoundary" Color="Color.Primary" />
<MudSwitch @bind-Value="caseSensitive" Label="CaseSensitive" Color="Color.Primary" />
<MudSwitch @bind-Value="markup" Label="Markup" Color="Color.Primary" />

@code{
   string highlightedText = "mud";
   bool untilNextBoundary;
   bool caseSensitive;
   bool markup;
   IEnumerable<string> paragraphs = new List<string>
    {
        $"<i>MudBlazor</i> is an ambitious <span style='color:{Colors.Purple.Default}'>Material Design</span> component framework for Blazor with an <span style='color:{Colors.Green.Default}'>emphasis</span> on <em>ease of use and clear structure</em>.",
        $"MudLists are easily <span style='color:{Colors.Orange.Default}'>customizable</span> and <span style='color:{Colors.Red.Default}'>scrollable</span> lists. Make them suit your needs with <i>avatars</i>, <i>icons</i>, or something like <i>checkboxes</i>.",
        $"Use <b>mud</b>-* classes to <span style='color:{Colors.Blue.Default}'>customize your MudBlazor components</span>."
    };
}
```

Style it with the Class or Style properties.

```razor title="HighlighterWithCustomStyleExample"
<MudPaper Elevation="0">
    <MudList T="string">
        <MudListSubheader>
            <MudTextField @bind-Value="searchTerm" AdornmentIcon="@Icons.Material.Filled.Brush"
                          Adornment="Adornment.End" Immediate="true" Variant="Variant.Outlined" />
        </MudListSubheader>

        @foreach (var sentence in sentences)
        {
            <MudListItem @key="sentence" Icon="@Icons.Material.Filled.Folder">
                <MudHighlighter Class="mud-primary-text"
                             Style="background-color:transparent;font-weight:bold"
                             Text="@sentence"
                             HighlightedText="@searchTerm" />
            </MudListItem>
        }
    </MudList>
</MudPaper>

@code {
    string searchTerm = "it";
    IEnumerable<string> sentences = new List<string>
    {
        "This is the first item", "This is the second item", "This is the third item"
    };
}
```

In addition to HighlightedText property which accepts a single text fragment in the form of an string, the HighlightedTexts property accepts an enumerable of strings which can be used to highlight several text fragments.

```razor title="HighlighterWithListMultipleExample"
<MudPaper Elevation="0">
    <MudList T="string">
        <MudListSubheader>
            <MudTextField @bind-Value="searchTerm" AdornmentIcon="@Icons.Material.Filled.People"
                          Adornment="Adornment.End" Immediate="true" Variant="Variant.Outlined"
                          Label="Names to search"/>
        </MudListSubheader>

        @{
            string[] searchTerms = searchTerm.Split(split);
            for (int i = 0; i < searchTerms.Length; i++)
                searchTerms[i] = searchTerms[i].Trim();
        }
        @foreach (var name in names)
        {
            <MudListItem @key="name" Icon="@Icons.Material.Filled.Person">
                <MudHighlighter Text="@name" HighlightedTexts="@searchTerms" />
            </MudListItem>
        }
    </MudList>
</MudPaper>

@code {
    string searchTerm = "William Jordan, Oliver";
    IEnumerable<string> names = new List<string>
    {
        "William Jordan", "Oliver Jones", "William Johnson", "Daniel Williams", "Oliver Simpson"
    };
    static readonly char[] split = new char[] { ';', ',', '.' };
}
```
