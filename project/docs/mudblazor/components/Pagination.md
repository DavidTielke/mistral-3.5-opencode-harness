# Pagination

Pagination displays the number of pages based on the `Count` property, with prev and next buttons surrounding it.
 The selected index can be binded with `Selected` property.

```razor title="PaginationSimpleExample"
<MudPagination Color="Color.Primary" Count="4" @bind-Selected="@_selected"/>

<MudText Align="Align.Center">Selected page: @_selected</MudText>

@code {
    private int _selected = 1;
}
```

The default variant is `Text` but can be changed to both `Filled` and `Outlined`

Pagination can be disabled with the `Disabled` property.

```razor title="PaginationDisabledExample"
<MudPagination Disabled="true" Count="3" />
```

You can show/hide the `first`, `last`, `next` and `previous` buttons.

```razor title="PaginationControlButtonsExample"
<div class="d-flex flex-column align-center">
    <MudPagination ShowPreviousButton="false" ShowNextButton="false" Count="11"/>
    <MudPagination ShowFirstButton="true" ShowLastButton="true" Count="11" Class="mt-4"/>
</div>
```

Page numbers can be hidden with the `ShowPageButtons` property.

```razor title="PaginationHidePagesExample"
<div class="d-flex flex-column align-center gap-4">
    <MudPagination ShowPageButtons="false" Count="0"/>
    <MudPagination ShowPageButtons="false" Count="11"/>
    <MudPagination ShowPageButtons="false" ShowFirstButton="true" ShowLastButton="true" Count="11" />
</div>
```

The parameter `BoundaryCount` and `MiddleCount` specify the number of items displayed before, between, and after the ellipsis.

```razor title="PaginationItemCountExample"
<div class="d-flex flex-column align-center">
    <MudPagination BoundaryCount="1" MiddleCount="1" Count="22" @bind-Selected="@_selected" />
    <MudPagination BoundaryCount="2" MiddleCount="5" Count="22" @bind-Selected="@_selected" Class="mt-4" />
</div>

@code {
    private int _selected = 11;
}
```

The `SelectedChanged` event callback can be used to control a different component. This example shows how to navigate through the pages of a [MudTable](/components/table).

```razor title="PaginationTableExample"
@using MudBlazor.Examples.Data.Models
@inject HttpClient httpClient
@using System.Net.Http.Json

<MudTable @ref="@_table" Items="@_elements" RowsPerPage="4" Hover="true" Breakpoint="Breakpoint.Sm" LoadingProgressColor="Color.Info">
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
        <MudPagination SelectedChanged="PageChanged" Count="@((_table.GetFilteredItemsCount() + _table.RowsPerPage - 1) / _table.RowsPerPage)" Class="pa-4"/>
    </PagerContent>
</MudTable>

@code {
    private MudTable<Element> _table;
    private IEnumerable<Element> _elements = new List<Element>();

    protected override async Task OnInitializedAsync()
    {
        _elements = await httpClient.GetFromJsonAsync<List<Element>>("webapi/periodictable");
    }

    private void PageChanged(int i)
    {
        _table.NavigateTo(i - 1);
    }
}
```

## Further examples

```razor title="PaginationRectangularExample"
<div class="d-flex flex-column align-center">
    <MudPagination Rectangular="true" Variant="Variant.Text" Count="6" />
    <MudPagination Rectangular="true" Variant="Variant.Filled" Count="6" Class="my-4" />
    <MudPagination Rectangular="true" Variant="Variant.Outlined" Count="6" />
</div>
```

```razor title="PaginationSizesExample"
<div class="d-flex flex-column align-center">
    <MudPagination Size="Size.Small" Variant="Variant.Filled" Count="6"/>
    <MudPagination Size="Size.Medium" Variant="Variant.Filled" Count="6" Class="my-4"/>
    <MudPagination Size="Size.Large" Variant="Variant.Filled" Count="6"/>
</div>
```

```razor title="PaginationVariantsFilledExample"
<MudPagination Variant="Variant.Filled" Count="4"/>
```

```razor title="PaginationVariantsOutlinedExample"
<MudPagination Variant="Variant.Outlined" Count="4" />
```
