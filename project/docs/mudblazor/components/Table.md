# Table

The default table displays your data in simple rows and is responsive, it breaks into mobile layout on `Breakpoint.Xs` unless changed.

 Add the `DataLabel` property to your `MudTd` cells to properly display the column label when the table has changed to mobile layout.

 The table can be prevented from breaking into mobile layout by setting the `Breakpoint` to `Breakpoint.None`.

```razor title="TableBasicExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable Items="@Elements.Take(4)" Hover="true" Breakpoint="Breakpoint.Sm" Loading="@_loading" LoadingProgressColor="Color.Info">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position" HideSmall="_hidePosition">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
</MudTable>

<MudSwitch @bind-Value="_hidePosition" Color="Color.Primary">Hide&nbsp;<b>position</b>&nbsp;when Breakpoint=Xs</MudSwitch>
<MudSwitch @bind-Value="_loading" Color="Color.Primary">Show Loading</MudSwitch>

@code { 
    private bool _hidePosition;
    private bool _loading;
    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

`RowClassFunc` can be used to customize the display of the selected row. Rows can be individually disabled by using the `RowDisabledFunc`. 
 In addition, the `RowClass` can be used to apply a general row style independent of the selection state and the `DisabledRowClass` can be used to customize disabled rows.

 `RowClickEvent` is triggered each time the row is clicked. `TableRowClickEventArgs.MouseEventArgs.Detail` can be used to find out whether it was a single or double click.

```razor title="TableRowClassFuncExample"
@using MudBlazor.Examples.Data.Models


<style>
    .selected {
        background-color: #1E88E5 !important;
    }

    .selected > td {
        color: white !important;
    }

    .selected > td .mud-input {
        color: white !important;
    }
</style>

<MudTable T="Element" @bind-SelectedItem="_selectedElement" Items="@Elements.Take(4)" Hover="true" Breakpoint="Breakpoint.Sm" RowClassFunc="@SelectedRowClassFunc"
          OnRowClick="@RowClickEvent" RowDisabledFunc="@(context => _rowTwoIsDisabled && context.Number == 2)">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
</MudTable>
<MudExpansionPanels Style="flex: 1;">
    <MudExpansionPanel Text="Show inline-clicked event log">
        @foreach (var message in _clickedEvents)
        {
            <MudText>@message</MudText>
        }
        @if (_clickedEvents.Count > 0)
        {
            <div class="d-flex">
                <MudSpacer/>
                <MudButton Class="mt-3" ButtonType="ButtonType.Button" Variant="Variant.Filled" OnClick="@(() => _clickedEvents.Clear())">Clear events</MudButton>
            </div>
        }
    </MudExpansionPanel>
</MudExpansionPanels>
<MudSwitch Label="Disable row 2" @bind-Value="_rowTwoIsDisabled" Color="Color.Primary"/>

@code {

    private static readonly IEnumerable<Element> Elements = new List<Element>
    {
        new() { Number = 1, Sign = "H", Name = "Hydrogen", Position = 0, Molar = 1.00794 },
        new() { Number = 2, Sign = "He", Name = "Helium", Position = 17, Molar = 4.002602 },
        new() { Number = 3, Sign = "Li", Name = "Lithium", Position = 0, Molar = 6.941 }
    };

    private Element _selectedElement;
    private int _selectedRowNumber = -1;
    private readonly List<string> _clickedEvents = [];
    private bool _rowTwoIsDisabled;

    private void RowClickEvent(TableRowClickEventArgs<Element> tableRowClickEventArgs)
    {
        _clickedEvents.Add($"Row has been clicked {tableRowClickEventArgs.MouseEventArgs.Detail} times");
    }

    private string SelectedRowClassFunc(Element element, int rowNumber)
    {
        if (_selectedRowNumber == rowNumber)
        {
            _selectedRowNumber = -1;
            _clickedEvents.Add("Selected Row: None");
            return string.Empty;
        }

        if (_selectedElement is not null && _selectedElement.Equals(element))
        {
            _selectedRowNumber = rowNumber;
            _clickedEvents.Add($"Selected Row: {rowNumber}");
            return "selected";
        }

        return string.Empty;
    }
}
```

`OnRowMouseEnter` is triggered when the row starts being hovered (onpointerenter event).
 `OnRowMouseLeave` is triggered when the row stops being hovered (onpointerleave event).

```razor title="TableRowHoverEventsExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable T="Element" Items="@elements.Take(3)" Hover="true" OnRowMouseEnter="RowMouseEnterEvent" OnRowMouseLeave="RowMouseLeaveEvent" Breakpoint="Breakpoint.Sm">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
</MudTable>

<MudText>Currently hovered: @(currentlyHoveredElement)</MudText>
<MudText>Last hovered: @(lastHoveredElement)</MudText>

@code {
    private IEnumerable<Element> elements = new List<Element>();

    private string currentlyHoveredElement;
    private string lastHoveredElement;

    protected override async Task OnInitializedAsync()
    {
        elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }

    private void RowMouseEnterEvent(TableRowHoverEventArgs<Element> eventArgs)
    {
        currentlyHoveredElement = eventArgs.Item.Name;
    }

    private void RowMouseLeaveEvent(TableRowHoverEventArgs<Element> eventArgs)
    {
        currentlyHoveredElement = "";
        lastHoveredElement = eventArgs.Item.Name;
    }
}
```

The `<MudTable>` component supports pagination, sorting and filtering of rows, as well as single and multiple row selection. To tell the table how to render your data, define a `<RowTemplate>`
 containing a `<MudTableCell>` or a `<td>` for every column. You can control where the pager is rendered using the `PagerPosition` property.

 Note: you can not fill this table in a conventional way, i.e. by defining multiple " /> tags. See [SimpleTable](/components/simpletable) if you want that. Instead, you
 pass the collection of items to be displayed to the table's `Items` parameter.

```razor title="TableExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable Items="@Elements" Dense="@dense" Hover="@hover" Bordered="@bordered" Striped="@striped" Filter="new Func<Element,bool>(FilterFunc1)" @bind-SelectedItem="selectedItem1" PagerPosition="@pagerPosition">
    <ToolBarContent>
        <MudText Typo="Typo.h6">Periodic Elements</MudText>
        <MudSpacer />
        <MudTextField @bind-Value="searchString1" Placeholder="Search" Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Search" IconSize="Size.Medium" Class="mt-0"></MudTextField>
    </ToolBarContent>
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <PagerContent>
        <MudTablePager />
    </PagerContent>
</MudTable>

<div class="d-flex flex-wrap mt-4">
    <MudSwitch @bind-Value="hover" Color="Color.Primary">Hover</MudSwitch>
    <MudSwitch @bind-Value="dense" Color="Color.Secondary">Dense</MudSwitch>
    <MudSwitch @bind-Value="striped" Color="Color.Tertiary">Striped</MudSwitch>
    <MudSwitch @bind-Value="bordered" Color="Color.Warning">Bordered</MudSwitch>
    <MudSelect @bind-Value="pagerPosition" Label="Pager position" Class="ml-4">
        <MudSelectItem Value="PagerPosition.Top">Top</MudSelectItem>
        <MudSelectItem Value="PagerPosition.Bottom">Bottom</MudSelectItem>
        <MudSelectItem Value="PagerPosition.TopAndBottom">Top And Bottom</MudSelectItem>
    </MudSelect>
    <MudSpacer />
    <div style="min-width:200px;">
        <MudText Class="align-self-center d-inline">Selected1: @selectedItem1?.Name</MudText>
    </div>
</div>

@code {
    private bool dense = false;
    private bool hover = true;
    private bool striped = false;
    private bool bordered = false;
    private string searchString1 = "";
    private Element selectedItem1 = null;
    private HashSet<Element> selectedItems = new HashSet<Element>();
    private PagerPosition pagerPosition = PagerPosition.Bottom;

    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }

    private bool FilterFunc1(Element element) => FilterFunc(element, searchString1);

    private bool FilterFunc(Element element, string searchString)
    {
        if (string.IsNullOrWhiteSpace(searchString))
            return true;
        if (element.Sign.Contains(searchString, StringComparison.OrdinalIgnoreCase))
            return true;
        if (element.Name.Contains(searchString, StringComparison.OrdinalIgnoreCase))
            return true;
        if ($"{element.Number} {element.Position} {element.Molar}".Contains(searchString))
            return true;
        return false;
    }
}
```

The `TablePager` has many properties to customize it.
 The property `HorizontalAlignment` can be used to define the position.
 The properties `RowsPerPageString`, `InfoFormat` and `AllItemsText` can be used to customize the displayed text.
 The properties `HideRowsPerPage`, `HidePageNumber` and `HidePagination` can be used to hide the corresponding information.

 See [TablePager API](@ApiLink.GetApiLinkFor(typeof(MudTablePager))) for more information.
 
 `@("RowsPerPage")` parameter of MudTable is independent of `@("PageSizeOptions")` parameter of PagerContent. Therefore, the RowsPerPage value does not have
 to be one of the values in the PageSizeOptions list. If the table pager is shown you should make sure the value of RowsPerPage is also available in the PageSizeOptions list, otherwise the users can not go back to this RowsPerPage value once they have chosen another one.

 Specifying `int.MaxValue` in the `@("PageSizeOptions")` will render as "All" in the Page Size dropdown. Use it when you want users to be able to show all items at once, but be careful, as this can lead to poor performance.

```razor title="TablePagerExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable Items="@Elements">
    <ToolBarContent>
        <MudText Typo="Typo.h6">Periodic Elements</MudText>
    </ToolBarContent>
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <PagerContent>
            <MudTablePager PageSizeOptions="new int[] { 10, 25, 50, 100, int.MaxValue }"
                           RowsPerPageString="@rowsPerPageString"
                           InfoFormat="@infoFormat"
                           AllItemsText="@allItemsText"
                           HorizontalAlignment="@horizontalAlignment"
                           HideRowsPerPage="@hideRowsPerPage"
                           HidePageNumber="@hidePageNumber"
                           HidePagination="@hidePagination" />
    </PagerContent>
</MudTable>

<div class="d-flex flex-wrap mt-4">
    <MudSelect T="HorizontalAlignment" Label="HorizontalAlignment" @bind-Value="horizontalAlignment">
        <MudSelectItem Value="HorizontalAlignment.Center" />
        <MudSelectItem Value="HorizontalAlignment.Left" />
        <MudSelectItem Value="HorizontalAlignment.Right" />
        <MudSelectItem Value="HorizontalAlignment.Start" />
        <MudSelectItem Value="HorizontalAlignment.End" />
    </MudSelect>
</div>
<div class="d-flex flex-wrap mt-4">
    <MudTextField Label="RowsPerPageString" @bind-Value="rowsPerPageString" Immediate/>
     <MudTextField Class="ml-4" Label="AllItemsText" @bind-Value="allItemsText" Immediate />
     <MudTextField Class="ml-4" Label="InfoFormat" @bind-Value="infoFormat" Immediate />
</div>
<div class="d-flex flex-wrap mt-4">
     <MudSwitch @bind-Value="hideRowsPerPage" Color="Color.Tertiary">HideRowsPerPage</MudSwitch>
     <MudSwitch @bind-Value="hidePageNumber" Color="Color.Primary">HidePageNumber</MudSwitch>
     <MudSwitch @bind-Value="hidePagination" Color="Color.Secondary">HidePagination</MudSwitch>
</div>

@code {
    private HorizontalAlignment horizontalAlignment = HorizontalAlignment.Right;
    private bool hidePageNumber;
    private bool hidePagination;
    private bool hideRowsPerPage;
    private string rowsPerPageString = "Rows per page:";
    private string infoFormat = "{first_item}-{last_item} of {all_items}";
    private string allItemsText = "All";

    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

To enable sorting, add `<MudTableSortLabel>` to the header cells and define a function that simply returns the value which should be sorted by when sorting by the specific column.
 You can also specify whether default ordering direction should be ascending or descending by specifying the `<InitialDirection>` parameter of `<MudTableSortLabel>`.

 Click on a header to sort the table by that column, then click to cycle through sorting directions.
 By default, sorting directions are ascending, descending and unsorted; if you want to cycle through ascending and descending only, you need to specify the `<AllowUnsorted>` parameter of the `<MudTable>`.
 Sorting can be allowed and disallowed on the column level with the property `Enabled`.
 Set `FullWidth` on `<MudTableSortLabel>` to make the label fill the available header width.

```razor title="TableSortingExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable Items="@Elements" Hover="true" SortLabel="Sort By">
    <HeaderContent>
        <MudTh><MudTableSortLabel SortBy="new Func<Element, object>(x=>x.Number)">Nr</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel Enabled="@enabled" SortBy="new Func<Element, object>(x=>x.Sign)">Sign</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel InitialDirection="SortDirection.Ascending" SortBy="new Func<Element, object>(x=>x.Name)">Name</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortBy="new Func<Element, object>(x=>x.Position)">Position</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortBy="new Func<Element, object>(x=>x.Molar)">Mass</MudTableSortLabel></MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <PagerContent>
        <MudTablePager PageSizeOptions="new int[] { 10, 25, 50, 100 }" />
    </PagerContent>
</MudTable>

<MudSwitch @bind-Value="enabled" Color="Color.Info">Enable sorting on the Sign Column</MudSwitch>

@code {
    private bool enabled = true;
    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

To enable multiselection of rows using checkboxes, set `MultiSelection="true"`.

 To disable toggling the checkbox state on row-click, set `SelectOnRowClick="false"`.

 To prevent editing the current selection, set `SelectionChangeable="false"`.

```razor title="TableMultiSelectExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudText HtmlTag="span">Item: @_selectedItemText</MudText>
<MudText>Selected items (@selectedItems?.Count): @(selectedItems == null ? "" : string.Join(", ", selectedItems.OrderBy(x => x.Sign).Select(x => x.Sign)))</MudText>

<MudTable @ref="_table" T="Element" Items="@Elements" MultiSelection="true" SelectionChangeable="_selectionChangeable" Hover="true"
          @bind-SelectedItems="selectedItems" OnRowClick="@OnRowClick" SelectOnRowClick="@_selectOnRowClick">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <PagerContent>
        <MudTablePager PageSizeOptions="new int[] { 10, 25, 50, 100 }" />
    </PagerContent>
    <FooterContent>
        <MudTd colspan="5">Select All</MudTd>
    </FooterContent>
</MudTable>
<MudSwitch @bind-Value="_selectOnRowClick" Color="Color.Primary">Select on row click</MudSwitch>
<MudSwitch @bind-Value="_selectionChangeable" Color="Color.Primary">Selection is changeable</MudSwitch>

@code {
    private HashSet<Element> selectedItems = new HashSet<Element>();
    private IEnumerable<Element> Elements = new List<Element>();
    private bool _selectOnRowClick = true;
    private bool _selectionChangeable = true;
    private MudTable<Element> _table;
    private string _selectedItemText = "No row clicked";

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }

    void OnRowClick(TableRowClickEventArgs<Element> args)
    {
        _selectedItemText = $"{args.Item.Name} ({args.Item.Sign})";
    }
}
```

If you want to apply a particular style to all the cells in the table define a CSS class and use it in the `CellClass` parameter. 
 Separate multiple classes with spaces.

```razor title="TableCellClassExample"
<style>
    .mud-table-small-cell {
        padding: 4px !important;
        background-color: lightsteelblue;
    }
</style>

<MudTable Items="@Elements.Take(4)" Hover="true" Breakpoint="Breakpoint.Sm" MultiSelection="@multiSelection" CellClass="@(applyCellClass? "mud-table-small-cell" : "")">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
        <MudTh>Action</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
        <MudTd DataLabel="Action">
            <div @onclick="@(() => ShowCell(context))">@(context.ShowCell ? "Hide Cell" : "Show Cell")</div>
        </MudTd>
    </RowTemplate>
    <ChildRowContent>
        @if (context.ShowCell)
        {
            <MudTr>
                <td colspan="6">
                    <div class="d-flex justify-center">
                        <MudText Typo="Typo.body1"><strong>The cell is shown</strong></MudText>
                    </div>
                </td>
            </MudTr>
        }
    </ChildRowContent>
</MudTable>
<MudSwitch @bind-Value="@multiSelection" Color="Color.Primary">Show checkboxes cells</MudSwitch>
<MudSwitch @bind-Value="@applyCellClass" Color="Color.Primary">Apply Cell Class</MudSwitch>
@code {
    private bool multiSelection;
    private bool applyCellClass;

    private void ShowCell(Element element)
    {
        element.ShowCell = !element.ShowCell;
    }

    public class Element
    {
        public string Number { get; set; }
        public string Sign { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public decimal Molar { get; set; }
        public bool ShowCell { get; set; }

        public Element(string number, string sign, string name, string position, decimal molar)
        {
            Number = number;
            Sign = sign;
            Name = name;
            Position = position;
            Molar = molar;
        }
    }

    private List<Element> Elements = new List<Element>()
    {
        new Element("1", "H", "Hydrogen", "0", 1.00794M),
        new Element("1", "He", "Helium", "17", 4.002602M),
        new Element("1", "Li", "Lithium", "0", 6.941M),
        new Element("1", "Be", "Beryllium", "1", 9.012182M)
    };
}
```

Set `FixedHeader="true"` to make the header sticky when scrolling the table.

 The same for `FixedFooter="true"` to show the footer even when the table is not scrolled all the way down.

 The table will scroll if you constrain its height using `Height="400px"`, for instance.

```razor title="TableFixedHeaderExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable Items="@Elements" FixedHeader="@fixed_header" FixedFooter="@fixed_footer" Height="@(fixed_header || fixed_footer ?"400px":"")">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <FooterContent>
        <MudTd>Nr</MudTd>
        <MudTd>Sign</MudTd>
        <MudTd>Name</MudTd>
        <MudTd>Position</MudTd>
        <MudTd>Molar mass</MudTd>
    </FooterContent>
    <PagerContent>
        <MudTablePager PageSizeOptions="new int[]{50, 100}" />
    </PagerContent>
</MudTable>

<MudSwitch @bind-Value="fixed_header" Color="Color.Primary">Fixed Header</MudSwitch>
<MudSwitch @bind-Value="fixed_footer" Color="Color.Primary">Fixed Footer</MudSwitch>

@code {
    bool fixed_header = true;
    bool fixed_footer = false;

    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

Specifies a group of one or more columns in a table for formatting.

```razor title="TableColGroupExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<MudTable Items="@Elements">
    <ColGroup>
        <col style="width: 60px;" />
        <col />
        <col style="width: 60%;" />
        <col style="width: 60px;" />
        <col />
    </ColGroup>
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh Style="text-align:center">Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass" Style="text-align:right">@context.Molar</MudTd>
    </RowTemplate>
    <PagerContent>
        <MudTablePager />
    </PagerContent>
</MudTable>

@code {
    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    } 
}
```

Provides input elements for Selected Row. A click on a row makes the row editable.
 A Cancel button appears and can be used if `CanCancelEdit="true"`.
 In this case, the `RowEditPreview` and `RowEditCancel` methods must be defined to save and retrieve the initial values of the edited item.
 `RowEditCommit` method can be used to handle the commit of the item.

```razor title="TableInlineEditExample"
@using System.Net.Http.Json
@using MudBlazor
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient
@inject ISnackbar Snackbar

<MudTable Items="@Elements" Dense="@dense" Hover="@hover" ReadOnly="@ronly" CanCancelEdit="@canCancelEdit" Filter="new Func<Element,bool>(FilterFunc)"
          @bind-SelectedItem="selectedItem1" SortLabel="Sort By" CommitEditTooltip="Commit Edit"
          OnCommitEditClick="@(() => Snackbar.Add("Commit Edit Handler Invoked"))" RowEditPreview="BackupItem" RowEditCancel="ResetItemToOriginalValues"
          RowEditCommit="ItemHasBeenCommitted" IsEditRowSwitchingBlocked="@blockSwitch" ApplyButtonPosition="@applyButtonPosition" EditButtonPosition="@editButtonPosition" EditTrigger="@editTrigger">
    <ToolBarContent>
        <MudText Typo="Typo.h6">Periodic Elements</MudText>
        <MudSpacer />
        <MudTextField @bind-Value="searchString" Placeholder="Search" Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Search" IconSize="Size.Medium" Class="mt-0"></MudTextField>
    </ToolBarContent>
    <ColGroup>
        @if (applyButtonPosition.DisplayApplyButtonAtStart() || (editButtonPosition.DisplayEditButtonAtStart() && editTrigger == TableEditTrigger.EditButton))
        {
            <col style="width:50px;" />
        }
        <col style="width:50px;" />
        <col style="width:80px;" />
        <col style="width:50%;" />
        <col />
        <col />
        @if (applyButtonPosition.DisplayApplyButtonAtEnd() || (editButtonPosition.DisplayEditButtonAtEnd() && editTrigger == TableEditTrigger.EditButton))
        {
            <col style="width:50px;" />
        }
    </ColGroup>
    <HeaderContent>
        <MudTh><MudTableSortLabel SortBy="new Func<Element, object>(x=>x.Number)">Nr</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortBy="new Func<Element, object>(x=>x.Sign)">Sign</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel InitialDirection="SortDirection.Ascending" SortBy="new Func<Element, object>(x=>x.Name)">Name</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortBy="new Func<Element, object>(x=>x.Position)">Position</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortBy="new Func<Element, object>(x=>x.Molar)">Mass</MudTableSortLabel></MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <RowEditingTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">
            <MudTextField @bind-Value="context.Sign" Required />
        </MudTd>
        <MudTd DataLabel="Name">
            <MudTextField @bind-Value="context.Name" Required />
        </MudTd>
        <MudTd DataLabel="Position">
            <MudNumericField @bind-Value="context.Position" Required Min="1" />
        </MudTd>
        <MudTd DataLabel="Molar mass">
            <MudTextField @bind-Value="context.Molar" Required />
        </MudTd>
    </RowEditingTemplate>
    <PagerContent>
        <MudTablePager />
    </PagerContent>
    <EditButtonContent Context="button">
        <MudIconButton Size="@Size.Small" Icon="@Icons.Material.Outlined.Edit" Class="pa-0" OnClick="@button.ButtonAction" Disabled="@button.ButtonDisabled" />
    </EditButtonContent>
</MudTable>

<MudSwitch @bind-Value="hover" Color="Color.Primary">Hover</MudSwitch>
<MudSwitch @bind-Value="dense" Color="Color.Secondary">Dense</MudSwitch>
<MudSwitch @bind-Value="ronly" Color="Color.Tertiary">Read Only</MudSwitch>
<MudSwitch @bind-Value="canCancelEdit" Color="Color.Info">Can Cancel Edit</MudSwitch>
<MudSwitch @bind-Value="blockSwitch" Color="Color.Success">Block Edit Row Switching</MudSwitch>
<MudGrid>
    <MudItem xs="12" md="4">
        <MudSelect Label="Edit Trigger" T="TableEditTrigger" @bind-Value="editTrigger">
            <MudSelectItem Value="TableEditTrigger.RowClick">Row Click</MudSelectItem>
            <MudSelectItem Value="TableEditTrigger.EditButton">Edit Button</MudSelectItem>
        </MudSelect>
    </MudItem>
    @if (editTrigger == TableEditTrigger.EditButton)
    {
        <MudItem xs="12" md="4">
            <MudSelect Label="Edit Button Position" T="TableEditButtonPosition" @bind-Value="editButtonPosition">
                <MudSelectItem Value="TableEditButtonPosition.Start">Start</MudSelectItem>
                <MudSelectItem Value="TableEditButtonPosition.End">End</MudSelectItem>
                <MudSelectItem Value="TableEditButtonPosition.StartAndEnd">Start and End</MudSelectItem>
            </MudSelect>
        </MudItem>
    }
    <MudItem xs="12" md="4">
        <MudSelect Label="Apply Button Position" T="TableApplyButtonPosition" @bind-Value="applyButtonPosition">
            <MudSelectItem Value="TableApplyButtonPosition.Start">Start</MudSelectItem>
            <MudSelectItem Value="TableApplyButtonPosition.End">End</MudSelectItem>
            <MudSelectItem Value="TableApplyButtonPosition.StartAndEnd">Start and End</MudSelectItem>
        </MudSelect>
    </MudItem>
</MudGrid>

<MudText HtmlTag="span">Selected1: @selectedItem1?.Name</MudText>

<MudExpansionPanels Style="flex: 1;">
    <MudExpansionPanel Text="Show inline-edit event log">
        @foreach (var message in editEvents)
        {
            <MudText>@message</MudText>
        }
        @if (editEvents.Count > 0)
        {
            <div class="d-flex">
                <MudSpacer />
                <MudButton Class="mt-3" ButtonType="ButtonType.Button" Variant="Variant.Filled" OnClick="ClearEventLog">Clear event log</MudButton>
            </div>
        }
    </MudExpansionPanel>
</MudExpansionPanels>

@code {
    private List<string> editEvents = new();
    private bool dense = false;
    private bool hover = true;
    private bool ronly = false;
    private bool canCancelEdit = false;
    private bool blockSwitch = false;
    private string searchString = "";
    private Element selectedItem1 = null;
    private Element elementBeforeEdit;
    private HashSet<Element> selectedItems1 = new HashSet<Element>();
    private TableApplyButtonPosition applyButtonPosition = TableApplyButtonPosition.End;
    private TableEditButtonPosition editButtonPosition = TableEditButtonPosition.End;
    private TableEditTrigger editTrigger = TableEditTrigger.RowClick;
    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }

    private void ClearEventLog()
    {
        editEvents.Clear();
    }

    private void AddEditionEvent(string message)
    {
        editEvents.Add(message);
        StateHasChanged();
    }

    private void BackupItem(object element)
    {
        elementBeforeEdit = new()
            {
                Sign = ((Element)element).Sign,
                Name = ((Element)element).Name,
                Molar = ((Element)element).Molar,
                Position = ((Element)element).Position
            };
        AddEditionEvent($"RowEditPreview event: made a backup of Element {((Element)element).Name}");
    }

    private void ItemHasBeenCommitted(object element)
    {
        AddEditionEvent($"RowEditCommit event: Changes to Element {((Element)element).Name} committed");
    }

    private void ResetItemToOriginalValues(object element)
    {
        ((Element)element).Sign = elementBeforeEdit.Sign;
        ((Element)element).Name = elementBeforeEdit.Name;
        ((Element)element).Molar = elementBeforeEdit.Molar;
        ((Element)element).Position = elementBeforeEdit.Position;
        AddEditionEvent($"RowEditCancel event: Editing of Element {((Element)element).Name} canceled");
    }

    private bool FilterFunc(Element element)
    {
        if (string.IsNullOrWhiteSpace(searchString))
            return true;
        if (element.Sign.Contains(searchString, StringComparison.OrdinalIgnoreCase))
            return true;
        if (element.Name.Contains(searchString, StringComparison.OrdinalIgnoreCase))
            return true;
        if ($"{element.Number} {element.Position} {element.Molar}".Contains(searchString))
            return true;
        return false;
    }
}
```

Set `ServerData` to load data from the backend that is filtered, sorted and paginated. The table will call this async function whenever the user navigates
 the pager or changes sorting by clicking on the sort header icons. In this example, we also show how to force the table to update when the search textfield blurs, so that the table reloads server-filtered data.
 
 Note: with a `ServerData` func you don't need `Items` and `Filter`.

```razor title="TableServerSidePaginateExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models
@using System.Threading

@inject HttpClient httpClient

<MudTable ServerData="ServerReload" Dense="true" Hover="true" @ref="table">
    <ToolBarContent>
        <MudText Typo="Typo.h6">Periodic Elements</MudText>
        <MudSpacer />
        <MudTextField T="string" ValueChanged="@(s=>OnSearch(s))" Placeholder="Search" Adornment="Adornment.Start"
                      AdornmentIcon="@Icons.Material.Filled.Search" IconSize="Size.Medium" Class="mt-0"></MudTextField>
    </ToolBarContent>
    <HeaderContent>
        <MudTh><MudTableSortLabel SortLabel="nr_field" T="Element">Nr</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="sign_field" T="Element">Sign</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="name_field" T="Element">Name</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="position_field" T="Element">Position</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="mass_field" T="Element">Molar mass</MudTableSortLabel></MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <NoRecordsContent>
        <MudText>No matching records found</MudText>
    </NoRecordsContent>
    <LoadingContent>
        <MudText>Loading...</MudText>
    </LoadingContent>
    <PagerContent>
        <MudTablePager />
    </PagerContent>
</MudTable>

@code {
    private IEnumerable<Element> pagedData;
    private MudTable<Element> table;

    private int totalItems;
    private string searchString = null;

    /// <summary>
    /// Here we simulate getting the paged, filtered and ordered data from the server
    /// </summary>
    private async Task<TableData<Element>> ServerReload(TableState state, CancellationToken token)
    {
        IEnumerable<Element> data = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable", token);
        await Task.Delay(300, token);
        data = data.Where(element =>
        {
            if (string.IsNullOrWhiteSpace(searchString))
                return true;
            if (element.Sign.Contains(searchString, StringComparison.OrdinalIgnoreCase))
                return true;
            if (element.Name.Contains(searchString, StringComparison.OrdinalIgnoreCase))
                return true;
            if ($"{element.Number} {element.Position} {element.Molar}".Contains(searchString))
                return true;
            return false;
        }).ToArray();
        totalItems = data.Count();
        switch (state.SortLabel)
        {
            case "nr_field":
                data = data.OrderByDirection(state.SortDirection, o => o.Number);
                break;
            case "sign_field":
                data = data.OrderByDirection(state.SortDirection, o => o.Sign);
                break;
            case "name_field":
                data = data.OrderByDirection(state.SortDirection, o => o.Name);
                break;
            case "position_field":
                data = data.OrderByDirection(state.SortDirection, o => o.Position);
                break;
            case "mass_field":
                data = data.OrderByDirection(state.SortDirection, o => o.Molar);
                break;
        }

        pagedData = data.Skip(state.Page * state.PageSize).Take(state.PageSize).ToArray();
        return new TableData<Element>() {TotalItems = totalItems, Items = pagedData};
    }

    private void OnSearch(string text)
    {
        searchString = text;
        table.ReloadServerData();
    }
}
```

Use the `CancellationToken` to detect when a request for data has been superseded by a new request. By forwarding the token to methods which support it,
 such as common `HttpClient` or `DbContext` methods, the table can perform well even with frequent updates.
 
 Note: When using `ServerData`, you don't need `Items` or `Filter`.

```razor title="TableServerSideCancellationTokenExample"
@using MudBlazor.Examples.Data.Models
@using System.Net.Http.Json
@using System.Threading

@inject HttpClient httpClient

<MudTable ServerData="ServerReload" Dense="true" Hover="true">
    <ToolBarContent>
        <MudText Typo="Typo.h6">Periodic Elements</MudText>
    </ToolBarContent>
    <HeaderContent>
        <MudTh><MudTableSortLabel SortLabel="nr_field" T="Element">Nr</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="sign_field" T="Element">Sign</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="name_field" T="Element">Name</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="position_field" T="Element">Position</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="mass_field" T="Element">Molar mass</MudTableSortLabel></MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <NoRecordsContent>
        <MudText>No matching records found</MudText>
    </NoRecordsContent>
    <LoadingContent>
        <MudText>Loading...</MudText>
    </LoadingContent>
    <PagerContent>
        <MudTablePager />
    </PagerContent>
</MudTable>

@code {
    /// <summary>
    /// Here we simulate getting the paged, filtered and ordered data from the server, with a token for canceling this request
    /// </summary>
    private async Task<TableData<Element>> ServerReload(TableState state, CancellationToken token)
    {
        // Forward the provided token to methods which support it
        var data = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable", token);
        // Simulate a long-running operation
        await Task.Delay(300, token);
        // Get the total count
        var totalItems = data.Count();
        // Get the paged data
        var pagedData = data.Skip(state.Page * state.PageSize).Take(state.PageSize).ToList();
        // Return the data
        return new TableData<Element>() { TotalItems = totalItems, Items = pagedData };
    }
}
```

Use `LoadingContent` to define what is shown when data is loading and no rows are currently available.
 This renders inside a single table row with one spanning cell, which makes it simple for messages or placeholders but not suitable for simulating multiple rows or columns.

 For more complex layouts, use `LoadingContentBody`.
 This renders directly in the table body and gives you full control to create rows and columns (e.g., with `MudTr` and `MudTd`), without affecting the loading animation itself.

```razor title="TableServerSidePaginateBodyExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models
@using System.Threading

@inject HttpClient httpClient

<MudTable ServerData="ServerReload" Dense="true" Hover="true"
    LoadingContent="@(useLoadingContentBody ? null : loadingContent)"
    LoadingContentBody="@(useLoadingContentBody ? loadingContentBody : null)">
    <ToolBarContent>
        <MudText Typo="Typo.h6">Periodic Elements</MudText>
    </ToolBarContent>
    <HeaderContent>
        <MudTh><MudTableSortLabel SortLabel="nr_field" T="Element">Nr</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="sign_field" T="Element">Sign</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="name_field" T="Element">Name</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="position_field" T="Element">Position</MudTableSortLabel></MudTh>
        <MudTh><MudTableSortLabel SortLabel="mass_field" T="Element">Molar mass</MudTableSortLabel></MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <NoRecordsContent>
        <MudText>No records found</MudText>
    </NoRecordsContent>
    <PagerContent>
        <MudTablePager />
    </PagerContent>
</MudTable>
<MudSwitch @bind-Value="@useLoadingContentBody">Use Loading Content Body</MudSwitch>

@code {
    private bool useLoadingContentBody = true;

    private readonly RenderFragment loadingContent = @<MudSkeleton/>;
    private readonly RenderFragment loadingContentBody = @<text>
        @for (int r = 0; r < 4; r++) // 4 fake rows
        {
            <MudTr>
                @for (int c = 0; c < 5; c++) // 5 columns as above
                {
                    <MudTd><MudSkeleton/></MudTd>
                }
            </MudTr>
        }
    </text>;

    /// <summary>
    /// Here we simulate a perpetual loading for the purpose of the example.
    /// </summary>
    private async Task<TableData<Element>> ServerReload(TableState state, CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            await Task.Delay(1000, token);
        }
        return new TableData<Element>() { TotalItems = 0, Items = Enumerable.Empty<Element>() };
    }
}
```

By default, mutable `record` types do not work with multi-selection or editing. This is due to the way record equality works. To support multi-selection or editing of records in a `MudTable`,
 you must define a custom `Comparer` that implements `IEqualityComparer<T>`.
 The example below demonstrates multi-selection and paging while modifying a `record` type on `SelectedItemsChanged`.

```razor title="TableRecordComparerExample"
@using System.Net.Http.Json
@using System.Text.Json.Serialization;
@using MudBlazor.Examples.Data.Models
@inject HttpClient httpClient

<MudTable Items="@Elements" MultiSelection="true" T="Element" SelectedItemsChanged="OnSelectedItemsChanged" Comparer="Comparer">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <PagerContent>
        <MudTablePager PageSizeOptions="new int[] { 10, 25, 50, 100 }" />
    </PagerContent>
    <FooterContent>
        <MudTd colspan="5">Select All</MudTd>
    </FooterContent>
</MudTable>

<MudText HtmlTag="span">Selected items: @(selectedItems1 == null ? "" : string.Join(", ", selectedItems1.OrderBy(x => x.Sign).Select(x => x.Sign)))</MudText>

@code {
    private HashSet<Element> selectedItems1 = new HashSet<Element>();

    private List<Element> Elements = new List<Element>();

    private ElementComparer Comparer = new();

    private void OnSelectedItemsChanged(HashSet<Element> elements)
    {
        if (elements.Any())
            elements.First().Name = "Changed";
    }

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }

    class ElementComparer : IEqualityComparer<Element>
    {
        public bool Equals(Element a, Element b) => a?.Number == b?.Number;
        public int GetHashCode(Element x) => HashCode.Combine(x?.Number);
    }

    public record Element
    {
        public string Group { get; set; }
        public int Position { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }

        [JsonPropertyName("small")]
        public string Sign { get; set; }
        public double Molar { get; set; }
        public IList<int> Electrons { get; set; }

        public override string ToString() => $"{Sign} - {Name}";
    }
}
```

By default, you can put a list of `<MudTh>` inside `<HeaderContent>` and `<MudTd>` inside `<FooterContent>`, MudTable will automatically manage the table row for you, including the select-all column and adding an empty column for editable tables.

 If you need to customize the behavior, as well as rendering multiple header or footer rows, you can set the `CustomHeader` and `CustomFooter` attributes to true.

 Then setting a list of `<MudTHeadRow>` or `<MudTFootRow>` with their respective cells will render exactly what's required inside the table header and footer.
 
 Note: Unless you specify the attribute `@nameof(MudTr.Checkable)` for a specific row, MudTable won't render a checkbox in case of a multi-selection table.
 Attributes `IgnoreCheckbox` and `IgnoreEditable` won't render an empty cell either, requiring you to do it manually (for example for a colspan on the entire row).

```razor title="TableHeaderAndFooterExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<style type="text/css">
    .mud-table-head .header-centered th {
        text-align: center;
        font-size: 1.2em;
    }

   .mud-table-foot .bold-text .mud-table-cell {
       font-weight: 500;
   }
</style>

<MudTable Items="@Elements.Take(10)" MultiSelection="true" @bind-SelectedItems="selectedItems" Hover="true" Breakpoint="Breakpoint.Sm" Striped="true" Bordered="true"
          CustomHeader="true" CustomFooter="true" HeaderClass="table-head-bordered" FooterClass="table-foot-bordered">
    <HeaderContent>
        <MudTHeadRow IgnoreCheckbox="true" Class="header-centered">
            <MudTh colspan="6">Periodic Elements Info</MudTh>
        </MudTHeadRow>
        <MudTHeadRow Class="header-centered">
            <MudTh colspan="2">Basic</MudTh>
            <MudTh colspan="3">Extended</MudTh>
        </MudTHeadRow>
        <MudTHeadRow Checkable="true">
            <MudTh>Nr</MudTh> 
            <MudTh>Sign</MudTh>
            <MudTh>Name</MudTh>
            <MudTh>Position</MudTh>
            <MudTh>Molar mass</MudTh>
        </MudTHeadRow>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position" HideSmall="_hidePosition">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <FooterContent>
        <MudTFootRow Class="bold-text">
            <MudTd>Nr</MudTd>
            <MudTd>Sign</MudTd>
            <MudTd>Name</MudTd>
            <MudTd>Position</MudTd>
            <MudTd>Molar mass</MudTd>
        </MudTFootRow>
        <MudTFootRow Checkable="true">
            <MudTd colspan="5">Selected: @selectedItems.Count</MudTd>
        </MudTFootRow>
    </FooterContent>
</MudTable>
<MudSwitch @bind-Value="_hidePosition" Color="Color.Primary">Hide <b>position</b> when Breakpoint=Xs</MudSwitch>

@code {
    private bool _hidePosition;
    private IEnumerable<Element> Elements = new List<Element>();
    private HashSet<Element> selectedItems = new HashSet<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

Making use of the `<ChildRowContent>` allows more control over the layout for scenarios such as showing the related address data for each person below.

```razor title="TableRelationalExample"
<MudTable Items="@People" Hover="true" Breakpoint="Breakpoint.Sm">
    <ColGroup>
        <col style="width:300px;" />
        <col style="width:100px;" />
        <col />
        <col style="width:100px;" />
    </ColGroup>
    <HeaderContent>
        <MudTh></MudTh>
        <MudTh>Nr</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Age</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd><MudButton Variant="Variant.Outlined" Size="Size.Small" OnClick="@(() => ShowBtnPress(context.Number))">@((context.ShowDetails == true)? "Hide" : "Show") Address Details</MudButton></MudTd>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Age">@context.Age</MudTd>
    </RowTemplate>
    <ChildRowContent>
        @if (context.ShowDetails)
        {
            <MudTr>
                <td colspan="4">
                    <MudCard Elevation="0">
                        <MudCardHeader>
                            <CardHeaderContent>
                                <MudText Typo="Typo.body1">Address Details for <strong>@context.Name</strong></MudText>
                            </CardHeaderContent>
                        </MudCardHeader>
                        <MudCardContent Class="pa-0">
                            <MudTable Items="@context.Addresses" Context="AddressContext" Hover="true" Breakpoint="Breakpoint.Sm" Elevation="0">
                                <ColGroup>
                                    <col />
                                    <col />
                                    <col style="width:200px;" />
                                </ColGroup>
                                <HeaderContent>
                                    <MudTh>Address Line 1</MudTh>
                                    <MudTh>Address Line 2</MudTh>
                                    <MudTh>Postal Code</MudTh>
                                </HeaderContent>
                                <RowTemplate>
                                    <MudTd DataLabel="Address Line 1">@AddressContext.Address_Line_1</MudTd>
                                    <MudTd DataLabel="Address Line 2">@AddressContext.Address_Line_2</MudTd>
                                    <MudTd DataLabel="Postal Code">@AddressContext.Postal_Code</MudTd>
                                </RowTemplate>
                            </MudTable>
                        </MudCardContent>
                    </MudCard>
                </td>
            </MudTr>
        }
    </ChildRowContent>
</MudTable>

@code
{
    protected override void OnInitialized()
    {
        FillPeople();
    }

    public class Address
    {
        public string Address_Line_1 { get; set; }
        public string Address_Line_2 { get; set; }
        public int Postal_Code { get; set; }
    }

    public class Person
    {
        public bool ShowDetails { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public IList<Address> Addresses { get; set; }
    }

    private void FillPeople()
    {
        IList<Person> people = new List<Person>();
        IList<Address> addresses = new List<Address>();
        addresses.Add(new Address { Address_Line_1 = "4 Privet Drive", Address_Line_2 = "Little Whinging", Postal_Code = 111 });
        addresses.Add(new Address { Address_Line_1 = "12 Grimmauld Place", Address_Line_2 = "The Burrow", Postal_Code = 333 });
        people.Add(new Person
        {
            ShowDetails = false,
            Number = 1,
            Name = "Harry Potter",
            Age = 11,
            Addresses = addresses
        });

        addresses = new List<Address>();
        addresses.Add(new Address { Address_Line_1 = "123 Pikachu Lane", Address_Line_2 = "Pallet Town", Postal_Code = 777 });
        addresses.Add(new Address { Address_Line_1 = "456 Mew Street", Address_Line_2 = "Pallet Town", Postal_Code = 999 });
        people.Add(new Person
        {
            ShowDetails = false,
            Number = 2,
            Name = "Ash Ketchum",
            Age = 18,
            Addresses = addresses
        });
        People = people;

        addresses = new List<Address>();
        addresses.Add(new Address { Address_Line_1 = "123 Shire Lane", Address_Line_2 = "Bag End", Postal_Code = 223 });
        addresses.Add(new Address { Address_Line_1 = "456 Shire Street", Address_Line_2 = "Bag End", Postal_Code = 445 });
        addresses.Add(new Address { Address_Line_1 = "789 Shire Avenue", Address_Line_2 = "Bag End", Postal_Code = 667 });
        people.Add(new Person
        {
            ShowDetails = true,
            Number = 3,
            Name = "Frodo Baggins",
            Age = 24,
            Addresses = addresses
        });
        People = people;
    }

    private static IEnumerable<Person> People { get; set; }

    private void ShowBtnPress(int nr)
    {
        Person tmpPerson = People.First(f => f.Number == nr);
        tmpPerson.ShowDetails = !tmpPerson.ShowDetails;
    }
}
```

If too many columns are displayed, setting `HorizontalScrollbar="true"` will allow the user to scroll the content horizontally.

```razor title="TableHorizontalScrollExample"
<MudTable Items="_items" Height="350px" Breakpoint="Breakpoint.Sm" HorizontalScrollbar="true">
    <HeaderContent>
        <MudTh>Column1</MudTh>
        <MudTh>Column2</MudTh>
        <MudTh>Column3</MudTh>
        <MudTh>Column4</MudTh>
        <MudTh>Column5</MudTh>
        <MudTh>Column6</MudTh>
        <MudTh>Column7</MudTh>
        <MudTh>Column8</MudTh>
        <MudTh>Column9</MudTh>
        <MudTh>Column10</MudTh>
        <MudTh>Column11</MudTh>
        <MudTh>Column12</MudTh>
        <MudTh>Column13</MudTh>
        <MudTh>Column14</MudTh>
        <MudTh>Column15</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Column1">@context.Column1</MudTd>
        <MudTd DataLabel="Column2">@context.Column2</MudTd>
        <MudTd DataLabel="Column3">@context.Column3</MudTd>
        <MudTd DataLabel="Column4">@context.Column4</MudTd>
        <MudTd DataLabel="Column5">@context.Column5</MudTd>
        <MudTd DataLabel="Column6">@context.Column6</MudTd>
        <MudTd DataLabel="Column7">@context.Column7</MudTd>
        <MudTd DataLabel="Column8">@context.Column8</MudTd>
        <MudTd DataLabel="Column9">@context.Column9</MudTd>
        <MudTd DataLabel="Column10">@context.Column10</MudTd>
        <MudTd DataLabel="Column11">@context.Column11</MudTd>
        <MudTd DataLabel="Column12">@context.Column12</MudTd>
        <MudTd DataLabel="Column13">@context.Column13</MudTd>
        <MudTd DataLabel="Column14">@context.Column14</MudTd>
        <MudTd DataLabel="Column15">@context.Column15</MudTd>
    </RowTemplate>
</MudTable>

@code {
    public class TestItem{
        public string Column1 {get;set;}
        public string Column2 {get;set;}
        public string Column3 {get;set;}
        public string Column4 {get;set;}
        public string Column5 {get;set;}
        public string Column6 {get;set;}
        public string Column7 {get;set;}
        public string Column8 {get;set;}
        public string Column9 {get;set;}
        public string Column10 {get;set;}
        public string Column11 {get;set;}
        public string Column12 {get;set;}
        public string Column13 {get;set;}
        public string Column14 {get;set;}
        public string Column15 {get;set;}
    }
    
    
    private List<TestItem> _items;

    protected override void OnInitialized() {
        _items = new List<TestItem>();
        for (int i = 0; i < 20; i++) {
            _items.Add(new TestItem {
                Column1 = $"Value_{i}",
                Column2 = $"Value_{i}",
                Column3 = $"Value_{i}",
                Column4 = $"Value_{i}",
                Column5 = $"Value_{i}",
                Column6 = $"Value_{i}",
                Column7 = $"Value_{i}",
                Column8 = $"Value_{i}",
                Column9 = $"Value_{i}",
                Column10 = $"Value_{i}",
                Column11 = $"Value_{i}",
                Column12 = $"Value_{i}",
                Column13 = $"Value_{i}",
                Column14 = $"Value_{i}",
                Column15 = $"Value_{i}"
            });
        }
    }
}
```

You can virtualize the results of a table to increase rendering speed.

```razor title="TableVirtualizationExample"
<MudTable Items="_items" Height="350px" Breakpoint="Breakpoint.Sm" Virtualize="true" FixedHeader="true">
    <HeaderContent>
        <MudTh>Column1</MudTh>
        <MudTh>Column2</MudTh>
        <MudTh>Column3</MudTh>
        <MudTh>Column4</MudTh>
        <MudTh>Column5</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Column1">@context.Column1</MudTd>
        <MudTd DataLabel="Column2">@context.Column2</MudTd>
        <MudTd DataLabel="Column3">@context.Column3</MudTd>
        <MudTd DataLabel="Column4">@context.Column4</MudTd>
        <MudTd DataLabel="Column5">@context.Column5</MudTd>
    </RowTemplate>
</MudTable>

@code {
    public class TestItem
    {
        public string Column1 { get; set; }
        public string Column2 { get; set; }
        public string Column3 { get; set; }
        public string Column4 { get; set; }
        public string Column5 { get; set; }
    }

    private List<TestItem> _items;

    protected override void OnInitialized()
    {
        _items = new List<TestItem>();
        for (int i = 0; i < 20000; i++)
        {
            _items.Add(new TestItem
            {
                Column1 = $"Value_{i}",
                Column2 = $"Value_{i}",
                Column3 = $"Value_{i}",
                Column4 = $"Value_{i}",
                Column5 = $"Value_{i}",
            });
        }
    }

}
```

The MudTable component provides methods to programmatically control scrolling to specific items and focusing on individual cells. 
 
 These methods are accessible via a `@("@ref")` to the table instance.

 Scroll To Item - Scrolls the table to bring the specified data item (row) into view. This is useful for navigating to a specific item in a large or virtualized table.

 Focus Cell - Scrolls to the row corresponding to the specified data item and sets focus to a specific cell within that row.

```razor title="TableScrollFocusExample"
@inject ISnackbar Snackbar

<MudTable @ref="_table" T="Element" Items="@Elements" @bind-SelectedItem="_selectedElement"
          RowEditPreview="BackupItem" 
          RowEditCancel="ResetItemValues"
          EditTrigger="TableEditTrigger.RowClick"
          RowClassFunc="@SelectedRowClassFunc"
          Virtualize FixedHeader 
          RowsPerPage="100"
          Height="300px" >
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <RowEditingTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">
            <MudTextField @bind-Value="context.Sign" Required />
        </MudTd>
        <MudTd DataLabel="Name">
            <MudTextField @bind-Value="context.Name" Required />
        </MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd DataLabel="Molar mass">@context.Molar</MudTd>
    </RowEditingTemplate>
    <PagerContent>
        <MudTablePager />
    </PagerContent>
</MudTable>

<MudStack Row AlignItems="AlignItems.Center" Justify="Justify.Center">
    <MudSpacer />
    <MudNumericField @bind-Value="_scrollToRow" Label="Scroll to Row Number" Min="1" Max="@(Elements.Count)" For="@(() => _scrollToRow)" Class="mr-2 mb-2" />
    <MudButton OnClick="ScrollToElementByIndex" Variant="Variant.Filled" Color="Color.Primary" Class="mr-4 mb-2" Style="align-self: center;">Scroll to Element</MudButton>
    <MudButton OnClick="@(() => FocusOnCellOfSelectedElement(1))" Variant="Variant.Filled" Color="Color.Secondary" Disabled="@(_selectedElement == null)" Class="mb-2" Style="align-self: center;">Edit Sign</MudButton>
    <MudButton OnClick="@(() => FocusOnCellOfSelectedElement(2))" Variant="Variant.Filled" Color="Color.Secondary" Disabled="@(_selectedElement == null)" Class="mb-2" Style="align-self: center;">Edit Name</MudButton>
    <MudSpacer />
</MudStack>

@code {
    #nullable enable

    private MudTable<Element> _table = null!;
    private List<Element> Elements = new List<Element>();
    private Element? _selectedElement;
    private int _scrollToRow = 10;
    private int _editRowNumber = -1;

    protected override void OnInitialized()
    {
        // Populate Elements with sample data
        for (int i = 0; i < 100; i++)
        {
            Elements.Add(new Element { Number = i + 1, Sign = "E" + i, Name = "Element " + i, Position = i % 10, Molar = (i * 1.23).ToString("F2") });
        }
    }

    private async Task ScrollToElementByIndex()
    {
        if (_scrollToRow > 0 && _scrollToRow <= Elements.Count)
        {
            _selectedElement = Elements[_scrollToRow - 1];
            await _table.ScrollToItemAsync(_selectedElement);
            Snackbar.Add($"Scrolled to: {_selectedElement.Name} Row {_scrollToRow}", Severity.Info);
        }
        else
        {
            Snackbar.Add("Index out of bounds.", Severity.Warning);
        }
    }

    private async Task FocusOnCellOfSelectedElement(int column)
    {
        if (_selectedElement != null)
        {
            _editRowNumber = _selectedElement.Number - 1;
            await _table.FocusCellAsync(_selectedElement, column);
        }
        else
        {
            Snackbar.Add("Please select an element from the table first by clicking on a row.", Severity.Error);
        }
    }

    private string SelectedRowClassFunc(Element element, int rowNumber)
    {
        if (_selectedElement != null && _selectedElement.Equals(element))
        {
            return _editRowNumber == rowNumber ? "" : "selected";
        }
        else
        {
            return string.Empty;
        }
    }

    public class Element
    {
        public int Number { get; set; }
        public string? Sign { get; set; }
        public string? Name { get; set; }
        public int Position { get; set; }
        public string? Molar { get; set; }
    }

    private Element? elementBeforeEdit;

    private void BackupItem(object element)
    {
        elementBeforeEdit = new()
        {
            Sign = ((Element)element).Sign,
            Name = ((Element)element).Name,
        };
    }

    private void ResetItemValues(object element)
    {
        ((Element)element).Sign = elementBeforeEdit?.Sign;
        ((Element)element).Name = elementBeforeEdit?.Name;
    }
}

<style>
    .selected {
        background-color: #1E88E5 !important;
    }
    .selected > td {
        color: white !important;
    }
    .selected > td .mud-input {
        color: white !important;
    }
</style>
```

Displays items in a grouped way, with Header and Footer by every group, allowing summaries on both.

 NOTE: Grouping and Virtualization should not be used together.

```razor title="TableBasicGroupingExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<style>
    .mud-table-cell-custom-group {
        font-weight: 500;
    }

    .mud-table-cell-custom-group-footer {
        padding-bottom: 50px;
        text-align: right;
    }
</style>

<MudTable Hover="true" Breakpoint="Breakpoint.Sm" Height="500px" FixedHeader="true"
          Items="@Elements"
          Virtualize="@_virtualize"
          GroupBy="@_groupDefinition"
          GroupHeaderStyle="background-color:var(--mud-palette-background-gray)"
          GroupFooterClass="mb-4"
          Dense="_dense"
          MultiSelection="_multiSelect">
    <ColGroup>
        @if (_multiSelect)
        {
            <col style="width: 60px;" />
        }
        @if (_groupDefinition.Expandable)
        {
            <col style="width: 60px;" />
        }
        <col />
        <col />
        <col />
        <col />
        <col />
    </ColGroup>
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <GroupHeaderTemplate>
        <MudTh Class="mud-table-cell-custom-group" colspan="5">@($"{context.GroupName}: {context.Key}")</MudTh>
    </GroupHeaderTemplate>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd Style="text-align: right" DataLabel="Molar mass">@context.Molar"</MudTd>
    </RowTemplate>
    <GroupFooterTemplate>
        <MudTh Class="mud-table-cell-custom-group mud-table-cell-custom-group-footer" colspan="5">Total Mass: @context.Items.Sum((e) => e.Molar)</MudTh>
    </GroupFooterTemplate>
</MudTable>

<MudSwitch @bind-Value="_dense" Color="Color.Primary">Dense</MudSwitch>
<MudSwitch @bind-Value="_multiSelect" Color="Color.Primary">MultiSelect</MudSwitch>
<MudSwitch @bind-Value="_virtualize" Color="Color.Primary">Virtualize</MudSwitch>
<MudSwitch @bind-Value="_groupDefinition.Indentation" Color="Color.Primary">Indentation</MudSwitch>
<MudSwitch @bind-Value="_groupDefinition.Expandable" Color="Color.Primary">Expandable</MudSwitch>

@code { 
    private bool _dense = false;
    private bool _multiSelect = true;
    private bool _virtualize = false;    

    private TableGroupDefinition<Element> _groupDefinition = new()
    {
        GroupName = "Group",
        Indentation = false,
        Expandable = false,
        Selector = (e) => e.Group
    };

    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

Displays items in a grouped way, but the groups are all collapsed by default. 

 Groups can be expanded or collapsed all at once by calling `ExpandAllGroups()` or `CollapseAllGroups()`.

```razor title="TableBasicGroupingInitiallyCollapsedExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<style>
    .mud-table-cell-custom-group {
        font-weight: 500;
    }

    .mud-table-cell-custom-group-footer {
        padding-bottom: 50px;
        text-align: right;
    }
</style>

<MudTable Hover="true" Breakpoint="Breakpoint.Sm" Height="500px" FixedHeader="true"
          Items="@Elements"
          GroupBy="@_groupDefinition"
          GroupHeaderStyle="background-color:var(--mud-palette-background-gray)"
          GroupFooterClass="mb-4"
          Dense="true"
          @ref="_tableRef">
    <ColGroup>
        <col style="width: 60px;" />
        <col />
        <col />
        <col />
        <col />
        <col />
    </ColGroup>
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <GroupHeaderTemplate>
        <MudTh Class="mud-table-cell-custom-group" colspan="5">@($"{context.GroupName}: {context.Key}") </MudTh>
    </GroupHeaderTemplate>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd Style="text-align: right" DataLabel="Molar mass">@context.Molar"</MudTd>
    </RowTemplate>
    <GroupFooterTemplate>
        <MudTh Class="mud-table-cell-custom-group mud-table-cell-custom-group-footer" colspan="5">Total Mass: @context.Items.Sum((e) => e.Molar)</MudTh>
    </GroupFooterTemplate>
</MudTable>

<MudButton Variant="Variant.Filled" Color="Color.Primary" Class="mt-3" OnClick="@((args) => _tableRef?.ExpandAllGroups())">Expand all groups</MudButton>
<MudButton Variant="Variant.Filled" Color="Color.Secondary" Class="mt-3 ml-3" OnClick="@((args) => _tableRef?.CollapseAllGroups())">Collapse all groups</MudButton>

@code {
    private MudTable<Element> _tableRef;

    private TableGroupDefinition<Element> _groupDefinition = new()
        {
            GroupName = "Group",
            Indentation = false,
            Expandable = true,
            IsInitiallyExpanded = false,
            Selector = (e) => e.Group
        };

    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

Displays items recursively grouped.

```razor title="TableMultiGroupingExample"
@using System.Net.Http.Json
@using MudBlazor.Examples.Data.Models

@inject HttpClient httpClient

<style>
    .mud-table-cell-custom-group {
        font-weight: 500;
    }

    .mud-table-cell-custom-group-footer {
        padding-bottom: 50px;
        text-align: right;
    }

    .mud-table-cell-custom-group-header-outer {
        background-color: var(--mud-palette-background-gray);
    }

    .mud-table-cell-custom-group-header-inner {
        background-color: var(--mud-palette-primary-hover);
    }
</style>

<MudText>Total items: @Elements?.Count() - Selected items: @selectedItems?.Count</MudText>

<MudTable Hover="true" Breakpoint="Breakpoint.Sm" Height="500px" FixedHeader="true"
          Items="@Elements"
          GroupBy="@_groupDefinition"
          GroupFooterClass="mb-4"
          Dense="_dense"
          MultiSelection="_multiSelect"
          @bind-SelectedItems="selectedItems">
    <HeaderContent>
        <MudTh>Nr</MudTh>
        <MudTh>Sign</MudTh>
        <MudTh>Name</MudTh>
        <MudTh>Group</MudTh>
        <MudTh>Position</MudTh>
        <MudTh>Molar mass</MudTh>
    </HeaderContent>
    <GroupHeaderTemplate>
        <MudTh Class="mud-table-cell-custom-group" colspan="6">@($"{context.GroupName}: {context.Key}")</MudTh>
    </GroupHeaderTemplate>
    <RowTemplate>
        <MudTd DataLabel="Nr">@context.Number</MudTd>
        <MudTd DataLabel="Sign">@context.Sign</MudTd>
        <MudTd DataLabel="Name">@context.Name</MudTd>
        <MudTd DataLabel="Group">@context.Group</MudTd>
        <MudTd DataLabel="Position">@context.Position</MudTd>
        <MudTd Style="text-align:right" DataLabel="Molar mass">@context.Molar</MudTd>
    </RowTemplate>
    <GroupFooterTemplate>
        <MudTh Class="mud-table-cell-custom-group mud-table-cell-custom-group-footer" colspan="6">Total Mass: @context.Items.Sum((e) => e.Molar)</MudTh>
    </GroupFooterTemplate>
</MudTable>
<MudSwitch @bind-Value="_dense" Color="Color.Primary">Dense</MudSwitch>
<MudSwitch @bind-Value="_multiSelect" Color="Color.Primary">MultiSelect</MudSwitch>
<MudSwitch @bind-Value="_groupDefinition.Indentation" Color="Color.Primary">Indentation</MudSwitch>
<MudSwitch @bind-Value="_groupDefinition.Expandable" Color="Color.Primary">Expandable (Root Level)</MudSwitch>
<MudSwitch @bind-Value="_groupDefinition.InnerGroup.Expandable" Color="Color.Primary">Expandable (Second Level)</MudSwitch>

@code {
    private bool _dense = false;
    private bool _multiSelect = true;
    private HashSet<Element> selectedItems = new HashSet<Element>();

    private TableGroupDefinition<Element> _groupDefinition = new TableGroupDefinition<Element>()
    {
        GroupName = "Group",
        Indentation = false,
        Expandable = false,
        Selector = (e) => e.Group,
        GroupHeaderClass = "mud-table-cell-custom-group-header-outer",
        InnerGroup = new TableGroupDefinition<Element>()
        {
            GroupName = "Position",
            Expandable = false,
            Selector = (e) => e.Position,
            GroupHeaderClass = "mud-table-cell-custom-group-header-inner"
        }

    };


    private IEnumerable<Element> Elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        Elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }
}
```

Set `aria-label` or `aria-labelledby` in the
 `TableAttributes` parameter to provide an accessible name for the HTML
 `<table>` element. This helps screen readers announce the purpose of the table.

```razor title="TableAriaLabelExample"
<MudTable T="string" Items="@_items" TableAttributes="TableAttributes" Hover="true" Breakpoint="Breakpoint.Sm">
    <HeaderContent>
        <MudTh>Fruit</MudTh>
    </HeaderContent>
    <RowTemplate>
        <MudTd DataLabel="Fruit">@context</MudTd>
    </RowTemplate>
</MudTable>

@code {
    private readonly string[] _items = new[] { "Apple", "Banana", "Cherry" };

    private Dictionary<string, object> TableAttributes { get; set; } = new()
    {
        ["aria-label"] = "Fruits table"
    };

}
```
