# TreeView

The TreeView component is designed to display hierarchical data structures. By default, each `MudTreeViewItem` displays its `Text` property.

 You can also associate a data value with each item using the `Value` property. If a `Value` is not provided, the item's `Text` will be used as its value. This sample demonstrates a read-only implementation where items are defined with either text, a value, or both, illustrating the basic display capabilities of the component.

```razor title="TreeViewBasicExample"
<MudTreeView T="string" ReadOnly>
    <MudTreeViewItem Text="Getting Started">
        <MudTreeViewItem Text="Installation" />
    </MudTreeViewItem>
    <MudTreeViewItem Value='"Components"'>
        <MudTreeViewItem Text="Avatar" Value='"MudAvatar"' />
        <MudTreeViewItem Text="Button" Value='"MudButton"' />
    </MudTreeViewItem>
</MudTreeView>
```

The TreeView's appearance and behavior can be controlled with several parameters:

 `Hover`: Applies a visual effect to an item on mouse-over.
 `Ripple`: Enables a ripple effect on item click, unless `ExpandOnDoubleClick` is active.
 `Dense`: Reduces the vertical padding of items for a more compact display.
 `Disabled`: Prevents all user interaction with the TreeView.
 `ExpandOnClick`: Allows expanding and collapsing of parent nodes with a single click.
 `ExpandOnDoubleClick`: Restricts expand and collapse functionality to a double-click action. Note that this property overrides `ExpandOnClick`.
 `OnDoubleClick`: This callback can be assigned to implement custom behavior for double-click events.

```razor title="TreeViewUsageExample"
<MudPaper Width="300px" Elevation="0">
    <MudTreeView T="string" ReadOnly="@ReadOnly" Hover="@Hover" Dense="@Dense" Disabled="@Disabled"
                 ExpandOnClick="@ExpandOnClick" ExpandOnDoubleClick="@ExpandOnDoubleClick">
        <MudTreeViewItem Text="Applications" Expanded>
            <MudTreeViewItem Text="Terminal" />
        </MudTreeViewItem>
        <MudTreeViewItem Text="Documents" Expanded>
            <MudTreeViewItem Text="MudBlazor" Expanded>
                <MudTreeViewItem Text="API" />
                <MudTreeViewItem Text="Components" />
                <MudTreeViewItem Text="Features" />
            </MudTreeViewItem>
        </MudTreeViewItem>
    </MudTreeView>
</MudPaper>

<MudStack Row Wrap="Wrap.Wrap" Justify="Justify.Center">
    <MudSwitch @bind-Value="ReadOnly" Color="Color.Primary">ReadOnly</MudSwitch>
    <MudSwitch @bind-Value="Hover" Color="Color.Primary">Hover</MudSwitch>
    <MudSwitch @bind-Value="Ripple" Color="Color.Primary">Ripple</MudSwitch>
    <MudSwitch @bind-Value="Dense" Color="Color.Primary">Dense</MudSwitch>
    <MudSwitch @bind-Value="Disabled" Color="Color.Primary">Disabled</MudSwitch>
    <MudSwitch @bind-Value="ExpandOnClick" Color="Color.Primary">ExpandOnClick</MudSwitch>
    <MudSwitch @bind-Value="ExpandOnDoubleClick" Color="Color.Primary">ExpandOnDoubleClick</MudSwitch>
</MudStack>

@code {
    public bool ReadOnly = true;
    public bool Hover = true;
    public bool Ripple;
    public bool Dense;
    public bool Disabled;
    public bool ExpandOnClick = true;
    public bool ExpandOnDoubleClick;
}
```

Enhance the visual presentation of TreeView items by assigning icons. The `Icon` and `IconColor` properties can be set for each `MudTreeViewItem`.

 This example defines a custom `ExpandButtonIcon` for parent nodes and provide an alternative icon for the expanded state via the `IconExpanded` property.

```razor title="TreeViewIconExample"
<MudTreeView T="string">
    <MudTreeViewItem Value='"All Mail"' Icon="@Icons.Material.Filled.Email" />
    <MudTreeViewItem Value='"Drafts"' Icon="@Icons.Material.Filled.Drafts" />
    <MudTreeViewItem Value='"Orders"' Icon="@Icons.Material.Filled.Label" IconColor="Color.Secondary" />
    <MudTreeViewItem Value='"Categories"' Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen" IconColor="Color.Info"
                     ExpandButtonIcon="@Icons.Material.Filled.ArrowRight" ExpandButtonIconColor="Color.Primary">
        <MudTreeViewItem Value='"Social"' Icon="@Icons.Material.Filled.Group" />
        <MudTreeViewItem Value='"Updates"' Icon="@Icons.Material.Filled.Info" IconColor="Color.Tertiary" />
        <MudTreeViewItem Value='"Forums"' Icon="@Icons.Material.Filled.QuestionAnswer" />
        <MudTreeViewItem Value='"Spam"' Icon="@Icons.Material.Filled.LocalOffer" />
    </MudTreeViewItem>
    <MudTreeViewItem Value='"Trash"' Icon="@Icons.Material.Filled.Delete" />
</MudTreeView>
```

To enable item selection, set the `SelectionMode` parameter:

 `SelectionMode.SingleSelection`: Allows only one item to be selected at a time across the entire tree.
 `SelectionMode.ToggleSelection`: Behaves like single selection, but allows a selected item to be deselected by clicking it again.

 Use `@@bind-SelectedValue` to programmatically get or set the currently selected item. The active item's color is controlled by the `Color` property.

```razor title="TreeViewSingleSelectionExample"
<MudPaper Width="300px" Elevation="0">
    <MudTreeView Hover ReadOnly="@ReadOnly" @bind-SelectedValue="SelectedValue" SelectionMode="@SelectionMode">
        <MudTreeViewItem Value="@("config")" Expanded Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
            <MudTreeViewItem Value='"launch.json"' Icon="@Icons.Custom.FileFormats.FileCode" />
            <MudTreeViewItem Value='"tasks.json"' Icon="@Icons.Custom.FileFormats.FileCode" />
        </MudTreeViewItem>
        <MudTreeViewItem Value="@("images")" Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
            <MudTreeViewItem Value="@("logo.png")" Icon="@Icons.Custom.FileFormats.FileImage" />
        </MudTreeViewItem>
    </MudTreeView>
</MudPaper>

<MudStack Row Justify="Justify.Center" Style="width: 100%" Wrap="Wrap.Wrap">
    <MudRadioGroup @bind-Value="SelectionMode">
        <MudRadio Value="SelectionMode.SingleSelection" Color="Color.Primary">SingleSelection</MudRadio>
        <MudRadio Value="SelectionMode.ToggleSelection" Color="Color.Primary">ToggleSelection</MudRadio>
    </MudRadioGroup>
    <MudChipSet T="string" @bind-SelectedValue="SelectedValue" Color="Color.Primary" Variant="Variant.Text">
        <MudChip Text="config"/>
        <MudChip Text="launch.json"/>
        <MudChip Text="tasks.json"/>
        <MudChip Text="images"/>
        <MudChip Text="logo.png"/>
    </MudChipSet>
    <MudSwitch @bind-Value="ReadOnly" Color="Color.Primary">ReadOnly</MudSwitch>    
</MudStack>

@code {
    public string SelectedValue = "tasks.json";
    public bool ReadOnly = false;
    public SelectionMode SelectionMode = SelectionMode.SingleSelection;
}
```

Set `SelectionMode` to `SelectionMode.MultiSelection` to allow users to select multiple items. Each selectable item will render a checkbox.
 Use `@@bind-SelectedValues` to manage the collection of selected items. The color of the checkboxes can be customized with the `CheckBoxColor` property.
 This example demonstrates how to bind the selection to a set of chips.

```razor title="TreeViewMultiSelectionExample"
<MudPaper Width="300px" Elevation="0">
    <MudTreeView Hover ReadOnly="@ReadOnly" TriState="@TriState" AutoSelectParent="@AutoSelectParent" @bind-SelectedValues="SelectedValues" SelectionMode="SelectionMode.MultiSelection"
                 CheckBoxColor="Color.Info">
        <MudTreeViewItem Text="bundle.zip" Expanded Icon="@Icons.Material.Filled.FolderZip">
            <MudTreeViewItem Text="config" Expanded Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
                <MudTreeViewItem Value='"launch.json"' Icon="@Icons.Custom.FileFormats.FileCode" />
                <MudTreeViewItem Value='"tasks.json"' Icon="@Icons.Custom.FileFormats.FileCode" />
            </MudTreeViewItem>
            <MudTreeViewItem Text="images" Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
                <MudTreeViewItem Value="@("logo.png")" Icon="@Icons.Custom.FileFormats.FileImage" />
            </MudTreeViewItem>
        </MudTreeViewItem>
    </MudTreeView>
</MudPaper>

<MudStack Row Justify="Justify.Center" Style="width: 100%" Wrap="Wrap.Wrap">
    <MudChipSet T="string" @bind-SelectedValues="SelectedValues" SelectionMode="SelectionMode.MultiSelection" Color="Color.Info" Variant="Variant.Text">
        <MudChip Text="bundle.zip"/>
        <MudChip Text="config"/>
        <MudChip Text="launch.json"/>
        <MudChip Text="tasks.json"/>
        <MudChip Text="images"/>
        <MudChip Text="logo.png"/>
    </MudChipSet>
    <MudSwitch @bind-Value="TriState" Color="Color.Info">TriState</MudSwitch>
    <MudSwitch @bind-Value="AutoSelectParent" Color="Color.Info">AutoSelectParent</MudSwitch>
    <MudSwitch @bind-Value="ReadOnly" Color="Color.Info">ReadOnly</MudSwitch>    
</MudStack>

@code {
    public IReadOnlyCollection<string> SelectedValues = ["tasks.json", "launch.json"];
    public bool ReadOnly = false;
    public bool TriState = true;
    public bool AutoSelectParent = true;
}
```

You can directly bind the `Selected` and `Expanded` parameters on individual `MudTreeViewItem` components.

 While managing selection is typically done on the parent `MudTreeView` via `@@bind-SelectedValue` or `@@bind-SelectedValues`, direct item binding is particularly useful when creating custom interactions within an item template.

```razor title="TreeViewBindItemsExample"
<MudPaper Width="300px" Elevation="0">
    <MudTreeView T="string" Hover SelectionMode="@SelectionMode.ToggleSelection" Color="Color.Tertiary">
        <MudTreeViewItem Text="config" @bind-Expanded="ConfigExpanded" Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
            <MudTreeViewItem Text="launch.json" @bind-Selected="LaunchSelected"  Icon="@Icons.Custom.FileFormats.FileCode" />
            <MudTreeViewItem Text="tasks.json" @bind-Selected="TasksSelected" Icon="@Icons.Custom.FileFormats.FileCode" />
        </MudTreeViewItem>
        <MudTreeViewItem Text="images" @bind-Expanded="ImagesExpanded" Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
            <MudTreeViewItem Text="logo.png" @bind-Selected="LogoSelected" Icon="@Icons.Custom.FileFormats.FileImage" />
        </MudTreeViewItem>
    </MudTreeView>
</MudPaper>

<MudStack Row Justify="Justify.Center" AlignItems="AlignItems.Center" Style="width: 100%" Wrap="Wrap.Wrap">
    <MudSwitch @bind-Value="ConfigExpanded" Color="Color.Tertiary">config</MudSwitch>
    <MudSwitch @bind-Value="ImagesExpanded" Color="Color.Tertiary">images</MudSwitch>
    <MudCheckBox @bind-Value="LaunchSelected" Color="Color.Tertiary">launch.json</MudCheckBox>
    <MudCheckBox @bind-Value="TasksSelected" Color="Color.Tertiary">tasks.json</MudCheckBox>
    <MudCheckBox @bind-Value="LogoSelected" Color="Color.Tertiary">logo.png</MudCheckBox>
</MudStack>

@code {
    public bool ConfigExpanded;
    public bool ImagesExpanded;
    public bool LaunchSelected = true;
    public bool TasksSelected;
    public bool LogoSelected;
}
```

When `AutoExpand` is set to true, any collapsed parent node that contains a selected item will automatically expand to reveal it.
 This is useful for ensuring the context of a programmatically selected item is visible to the user.

 To expand or collapse all nodes at once, you can call the public `ExpandAll()` and `CollapseAll()` methods on the TreeView instance.

```razor title="TreeViewAutoExpandExample"
<MudPaper Width="300px" Elevation="0">
    <MudTreeView @ref="TreeView" Hover AutoExpand="@AutoExpand" @bind-SelectedValue="SelectedValue" SelectionMode="@SelectionMode.ToggleSelection">
        <MudTreeViewItem Value="@("C:")" Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
            <MudTreeViewItem Value="@("config")" Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
                <MudTreeViewItem Value='"launch.json"' Icon="@Icons.Custom.FileFormats.FileCode" />
                <MudTreeViewItem Value='"tasks.json"' Icon="@Icons.Custom.FileFormats.FileCode" />
            </MudTreeViewItem>
            <MudTreeViewItem Value="@("images")" Icon="@Icons.Custom.Uncategorized.Folder" IconExpanded="@Icons.Custom.Uncategorized.FolderOpen">
                <MudTreeViewItem Value="@("logo.png")" Icon="@Icons.Custom.FileFormats.FileImage" />
            </MudTreeViewItem>
        </MudTreeViewItem>
    </MudTreeView>
</MudPaper>

<MudStack Row Justify="Justify.Center" Style="width: 100%" Wrap="Wrap.Wrap">
    <MudButton Color="Color.Primary" OnClick="@(()=>TreeView.ExpandAllAsync())" Variant="Variant.Filled">Expand all</MudButton>
    <MudButton Color="Color.Dark" OnClick="@(()=>TreeView.CollapseAllAsync())" Variant="Variant.Filled">Collapse all</MudButton>
    <MudChipSet T="string" @bind-SelectedValue="SelectedValue" Color="Color.Primary" Variant="Variant.Text" SelectionMode="@SelectionMode.ToggleSelection">
        <MudChip Text="config"/>
        <MudChip Text="launch.json"/>
        <MudChip Text="tasks.json"/>
        <MudChip Text="images"/>
        <MudChip Text="logo.png"/>
    </MudChipSet>
    <MudSwitch @bind-Value="AutoExpand" Color="Color.Primary">AutoExpand</MudSwitch>
</MudStack>

@code {
    public MudTreeView<string> TreeView;
    public string SelectedValue = null;
    public bool AutoExpand = true;
}
```

Use the `ItemTemplate` to dynamically generate TreeView items from a hierarchical data source.
 This approach simplifies rendering complex or data-driven trees by defining a template for each item's structure and its children.

```razor title="TreeViewItemTemplateExample"
<MudPaper Width="300px" Elevation="0">
    <MudTreeView Items="@TreeItems" SelectionMode="SelectionMode.MultiSelection" @bind-SelectedValues="SelectedValues">
        <ItemTemplate>
            @{
                // Casting context from TreeItemData<string> to our own derived class TreeItemPresenter
                // for convenient usage in the template
                var presenter = context as TreeItemPresenter;
            }
            <MudTreeViewItem @bind-Expanded="@context.Expanded" Items="@context.Children" Value="@context.Value"
                             Icon="@context.Icon" Text="@context.Text" EndText="@presenter?.Number?.ToString()" EndTextTypo="@Typo.caption" />
        </ItemTemplate>
    </MudTreeView>
</MudPaper>

<MudStack Row Justify="Justify.Center" Style="width: 100%">
    <MudText Typo="@Typo.subtitle1">Sum of selected items: <MudChip T="string">@GetSelectedSum()</MudChip></MudText>
</MudStack>

@code {
    public IReadOnlyCollection<string> SelectedValues { get; set; }

    public List<TreeItemData<string>> TreeItems { get; set; } = new();
    public Dictionary<string, int?> ValueMap { get; set; }

    public class TreeItemPresenter : TreeItemData<string>
    {
        public int? Number { get; set; }

        public TreeItemPresenter(string text, string icon, int? number = null) : base(text)
        {
            Text = text;
            Icon = icon;
            Number = number;
        }
    }

    protected override void OnInitialized()
    {
        TreeItems.Add(new TreeItemPresenter("All Mail", Icons.Material.Filled.Email));
        TreeItems.Add(new TreeItemPresenter("Trash", Icons.Material.Filled.Delete));
        TreeItems.Add(new TreeItemPresenter("Categories", Icons.Material.Filled.Label) {
            Expanded = true,
            Children = [
                    new TreeItemPresenter("Social", Icons.Material.Filled.Group, 90),
                    new TreeItemPresenter("Updates", Icons.Material.Filled.Info, 2294),
                    new TreeItemPresenter("Forums", Icons.Material.Filled.QuestionAnswer, 3566),
                    new TreeItemPresenter("Promotions", Icons.Material.Filled.LocalOffer, 733)
                ]
        });
        TreeItems.Add(new TreeItemPresenter("History", Icons.Material.Filled.Label));
        ValueMap = TreeItems.Concat(TreeItems.SelectMany(x => x.Children ?? [])).OfType<TreeItemPresenter>().ToDictionary(x => x.Value, x => x.Number);
    }

    public int GetSelectedSum()
    {
        if (SelectedValues is null)
            return 0;
        return SelectedValues.Select(x => ValueMap.GetValueOrDefault(x, 0)).Sum(i => i ?? 0);
    }
}
```

For large datasets, you can load data on-demand using `ServerData`.
 This function is invoked when a user expands a node, allowing efficient lazy-loading of child items.

 The loading indicator's icon and color can be customized with `LoadingIcon` and `LoadingIconColor`.
 If you know a specific item has no children and should not trigger a server call, you can prevent the loading behavior by setting its `CanExpand` property to false.

```razor title="TreeViewServerExample"
@using System.Collections.ObjectModel


<MudPaper Width="300px" Elevation="0">
    <MudTreeView ServerData="@LoadServerData" Items="@InitialTreeItems">
        <ItemTemplate>
            <MudTreeViewItem 
                Value="@context.Value" 
                @bind-Items="context.Children" 
                @bind-Expanded="@context.Expanded"
                CanExpand="@context.Expandable"
                Icon="@context.Icon" 
                LoadingIconColor="Color.Info" 
                />
        </ItemTemplate>
    </MudTreeView>
</MudPaper>

@code {

    private List<TreeItemData<string>> InitialTreeItems { get; set; } = new();
    private int _idCounter=1; // <- the counter makes sure the generated items are unique

    protected override void OnInitialized()
    {
        // MudTreeView initially only gets these top-level items
        InitialTreeItems.Add(new TreeItemData<string> {
            Value = "All Mail", Icon = Icons.Material.Filled.Label,
            Expanded = true,
            Children = [
                new TreeItemData<string> { Value = "Promotions", Icon = Icons.Material.Filled.Group, },
                new TreeItemData<string> { Value = "Updates", Icon = Icons.Material.Filled.Info, },
                new TreeItemData<string> { Value = "Forums", Icon = Icons.Material.Filled.QuestionAnswer, Expandable = false },
                new TreeItemData<string> { Value = "Social", Icon = Icons.Material.Filled.LocalOffer, Expandable = false }
            ] });
        InitialTreeItems.Add(new TreeItemData<string> { Value = "Trash", Icon = Icons.Material.Filled.Delete });
    }

    public async Task<IReadOnlyCollection<TreeItemData<string>>> LoadServerData(string parentValue)
    {
        // wait 500ms to simulate a server load
        await Task.Delay(500);
        // normally you would use the parentValue to query your server for the children of the given parent
        // but for the sake of this example we will just return some hardcoded children
        return [
            new TreeItemData<string> { Value = $"More Spam ({_idCounter++})", Icon = Icons.Material.Filled.Group, },
            new TreeItemData<string> { Value = $"L.E.D Door Mats ({_idCounter++})", Icon = Icons.Material.Outlined.Lightbulb, Expandable = false },
            new TreeItemData<string> { Value = $"Car Beauty Salon ({_idCounter++})", Icon = Icons.Material.Filled.CarRepair, Expandable = false },
            new TreeItemData<string> { Value = $"Fakedoors.com ({_idCounter++})", Icon = Icons.Material.Outlined.DoorFront, Expandable = false },
            new TreeItemData<string> { Value = $"Bluetooth Toilet ({_idCounter++})", Icon = Icons.Material.Filled.Wc, Expandable = false }
        ];        
    }

}
```

The TreeView nodes can be filtered using the `Filter` function, which accepts a custom filter delegate.
 This function is applied to every item, setting its `Visible` property based on whether it matches the filter criteria.

 This example demonstrates how to implement a text-based filter that dynamically shows or hides nodes based on user input.

```razor title="TreeViewFilteringExample"
<MudPaper Width="300px" Elevation="0">
    <MudStack AlignItems="AlignItems.Center">
        <MudTextField T="string" Label="Search" Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Search" TextChanged="OnTextChanged" Immediate="true" Clearable="true" />
        <MudTreeView Items="@_treeItemData" @ref="_treeView" FilterFunc="MatchesName">
            <ItemTemplate>
                <MudTreeViewItem @bind-Expanded="@context.Expanded" Items="@context.Children" Value="@context.Value"
                                 Icon="@context.Icon" Text="@context.Text" Visible="@context.Visible" />
            </ItemTemplate>
        </MudTreeView>
    </MudStack>
</MudPaper>

@code {
    private List<TreeItemData<string>> _treeItemData = [];

    private MudTreeView<string> _treeView;

    private string _searchPhrase;

    public class TreeItemPresenter : TreeItemData<string>
    {
        public TreeItemPresenter(string text, string icon) : base(text)
        {
            Text = text;
            Icon = icon;
        }
    }

    protected override void OnInitialized()
    {
        _treeItemData.Add(new TreeItemPresenter("All Mail", Icons.Material.Filled.Email));
        _treeItemData.Add(new TreeItemPresenter("Trash", Icons.Material.Filled.Delete));
        _treeItemData.Add(new TreeItemPresenter("Categories", Icons.Material.Filled.Label)
        {
            Expanded = true,
            Children =
            [
                new TreeItemPresenter("Social", Icons.Material.Filled.Group),
                new TreeItemPresenter("Updates", Icons.Material.Filled.Info),
                new TreeItemPresenter("Forums", Icons.Material.Filled.QuestionAnswer),
                new TreeItemPresenter("Promotions", Icons.Material.Filled.LocalOffer)
            ]
        });
        _treeItemData.Add(new TreeItemPresenter("History", Icons.Material.Filled.Label));
    }

    private async void OnTextChanged(string searchPhrase) 
    {
        _searchPhrase = searchPhrase;
        await _treeView.FilterAsync();
    }

    private Task<bool> MatchesName(ITreeItemData<string> item)
    {
        if (string.IsNullOrEmpty(item.Text))
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(item.Text.Contains(_searchPhrase, StringComparison.OrdinalIgnoreCase));
    }
}
```

For full control over rendering and behavior, use the `Content` render fragment.
 This replaces the default `MudTreeViewItem` markup with your own custom implementation.

 This example demonstrates creating a non-standard multi-selection behavior where selecting a parent node does not affect its children.
 It also shows how to make only specific items selectable.
 To enable scrolling, as seen in this sample, constrain the container's `height` or `max-height` and set `overflow-y` to auto or scroll.

```razor title="TreeViewCustomExample"
<MudStack>
    <MudPaper Width="400px" MaxHeight="400px" Class="overflow-y-auto" Elevation="2">
        <MudTreeView Items="@TreeItems" ReadOnly>
            <ItemTemplate>
                @{                
                    var product = context.Value; // for convenient usage in the template
                }
                <MudTreeViewItem @bind-Expanded="@context.Expanded" Items="@context.Children" Value="@context.Value">
                    <Content>
                        <MudTreeViewItemToggleButton @bind-Expanded="@context.Expanded" Visible="@context.HasChildren" />
                        @if (product?.Price is not null) {
                            <MudCheckBox T="bool" Size="Size.Small" Value="@context.Selected" ValueChanged="@((v)=> OnCheckboxChanged(v, context))" />
                        }
                        <MudIcon Icon="@product?.Icon" Class="ml-0 mr-2" Color="@Color.Default" />
                        <MudText>@product?.Name</MudText>
                        @if (product?.Price is not null) {
                            <MudChip Class="ml-1">@product.Price.Value.ToString("C")</MudChip>
                        }
                    </Content>
                </MudTreeViewItem>
            </ItemTemplate>
        </MudTreeView>
    </MudPaper>
    <MudStack Class="mt-3" Style="width: 400px">
        <MudText Typo="@Typo.subtitle1" Inline>Selected items: @(string.Join(", ", (SelectedValues ?? []).Select(x => x.Name)))</MudText>
        <MudStack>
            <MudText Typo="@Typo.subtitle1">Sum: <MudChip T="string">@GetSelectedSum().ToString("C")</MudChip></MudText>
        </MudStack>
    </MudStack>
</MudStack>

@code {
    public void OnCheckboxChanged(bool selected, ITreeItemData<Product> context)
    {
        context.Selected = selected;
        if (context.Value?.Price is null)
            return;
        if (context.Selected)
            SelectedValues.Add(context.Value);
        else
            SelectedValues.Remove(context.Value);
    }

    public HashSet<Product> SelectedValues { get; set; } = new();

    public List<TreeItemData<Product>> TreeItems { get; set; } = new();

    public class Product : IEquatable<Product>
    {
        public decimal? Price { get; set; }
        public string Name { get; init; }
        public string Icon { get; set; }

        public Product(string name, string icon, decimal? price = null)
        {
            Name = name;
            Icon = icon;
            Price = price;
        }

        public bool Equals(Product other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Name == other.Name;
        }

        public override bool Equals(object obj) => ReferenceEquals(this, obj) || obj is Product other && Equals(other);

        public override int GetHashCode() => Name?.GetHashCode() ?? 0;
    }

    protected override void OnInitialized()
    {
        TreeItems.Add(new TreeItemData<Product> { 
            Value=new Product("Coffee Makers", Icons.Material.Filled.Label), 
            Expanded = true,
            Children = [
                new TreeItemData<Product> { Value=new Product("Moka Pot", Icons.Material.Filled.LocalOffer, 36.99m),  },
                new TreeItemData<Product> { 
                    Value=new Product("French Press", Icons.Material.Filled.LocalOffer, 19.99m),
                    Expanded = true,
                    Children = [ 
                        new TreeItemData<Product> { Value = new Product("Spare Sieve", Icons.Material.Filled.LocalOffer, 6.00m) },
                        new TreeItemData<Product> { Value = new Product("Cleaning Kit", Icons.Material.Filled.LocalOffer, 17.59m) }
                    ]
                }
            ]
        });
        TreeItems.Add(new TreeItemData<Product> {
            Value = new Product("Tea Pots", Icons.Material.Filled.Label),
            Expanded = true,
            Children = [
                new TreeItemData<Product> {
                    Value=new Product("Glass Teapot", Icons.Material.Filled.LocalOffer, 36.99m),
                    Expanded = true,
                    Children = [ 
                        new TreeItemData<Product> { Value = new Product("Glass Infuser", Icons.Material.Filled.LocalOffer, 2.99m) }, 
                        new TreeItemData<Product> { Value = new Product("Stainless Steel Infuser", Icons.Material.Filled.LocalOffer, 5.99m) }
                    ]
                },
                new TreeItemData<Product> { Value = new Product("Stainless Steel Teapot", Icons.Material.Filled.LocalOffer, 14.15m) },
                new TreeItemData<Product> { Value = new Product("Japanese Cast Iron Teapot", Icons.Material.Filled.LocalOffer, 26.39m) },
                new TreeItemData<Product> { Value = new Product("Porcelain Teapot", Icons.Material.Filled.LocalOffer, 38.00m) }
            ]
        });
    }

    public decimal GetSelectedSum()
    {
        if (SelectedValues is null)
            return 0;
        return SelectedValues.Sum(p => p.Price ?? 0);
    }
}
```

Use the `BodyContent` render fragment when you want to customize the main content area of a tree item but retain the built-in icons, indentation, and expansion buttons.
 This provides a balance between customization and leveraging the default item structure.

```razor title="TreeViewBodyContentExample"
<MudPaper Width="400px" Elevation="2">
    <MudTreeView Items="@TreeItems" Hover="true">
        <ItemTemplate Context="item">
            <MudTreeViewItem Items="@item.Children" Icon="@item.Icon">
                <BodyContent>
                    <div style="display: grid; grid-template-columns: 1fr auto; align-items: center; width: 100%">
                        <MudText Style="justify-self: start;">@item.Text</MudText>
                        <div style="justify-self: end;">
                            <MudIconButton Icon="@Icons.Material.Filled.Edit" Size="Size.Medium" Color="Color.Inherit" />
                            <MudIconButton Icon="@Icons.Material.Filled.Delete" Size="Size.Medium" Color="Color.Inherit" />
                        </div>
                    </div>
                </BodyContent>
            </MudTreeViewItem>
        </ItemTemplate>
    </MudTreeView>
</MudPaper>

@code {

    private List<TreeItemData<string>> TreeItems { get; set; } = [];

    public class TreeItemData : TreeItemData<string>
    {
        public TreeItemData(string text, string icon) : base(text)
        {
            Text = text;
            Icon = icon;
        }
    }

    protected override void OnInitialized()
    {
        TreeItems.Add(new TreeItemData(".github", Icons.Custom.Brands.GitHub));
        TreeItems.Add(new TreeItemData(".vscode", Icons.Custom.Brands.MicrosoftVisualStudio));
        TreeItems.Add(new TreeItemData("content", Icons.Custom.FileFormats.FileDocument));
        TreeItems.Add(new TreeItemData("src", Icons.Custom.FileFormats.FileCode) {
                Children = [
                    new TreeItemData("MudBlazor", Icons.Custom.Brands.MudBlazor),
                    new TreeItemData("MudBlazor.Docs", Icons.Custom.FileFormats.FileDocument) {
                        Children = [
                            new TreeItemData("_Imports.razor", Icons.Material.Filled.AlternateEmail),
                            new TreeItemData("compilerconfig.json", Icons.Custom.FileFormats.FileImage),
                            new TreeItemData("MudBlazor.Docs.csproj", Icons.Custom.Brands.MicrosoftVisualStudio),
                            new TreeItemData("NewFilesToBuild.txt", Icons.Custom.FileFormats.FileDocument)
                        ]
                    },

                    new TreeItemData("MudBlazor.Docs.Client", Icons.Material.Filled.Folder),
                    new TreeItemData("MudBlazor.Docs.Compiler", Icons.Material.Filled.Folder),
                    new TreeItemData("MudBlazor.Docs.Server", Icons.Material.Filled.Folder),
                    new TreeItemData("MudBlazor.UnitTests", Icons.Material.Filled.Folder),
                    new TreeItemData(".editorconfig", Icons.Custom.FileFormats.FileCode),
                    new TreeItemData("MudBlazor.sln", Icons.Custom.Brands.MicrosoftVisualStudio)
                ]
        });
        TreeItems.Add(new TreeItemData("History", Icons.Material.Filled.Folder));
    }
}
```
