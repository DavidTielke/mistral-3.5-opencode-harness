# List

`MudList` is used to display a collection of items which can contain an avatar, an icon, text or custom content.
 If you want the component to be readonly set parameter `ReadOnly` to true. You can also use the list for
 navigation if you set parameter `Href` on its `MudListItems`. Use
 MudDivider to separate groups of items.

 Because lists can manage a selected value of any type, you have to specify the type parameter `T` for the list and
 its items, even if you only use them for presentation purposes.

```razor title="ListSimpleExample"
<MudPaper Width="300px">
    <MudList T="string">
        <MudListItem Text="Inbox" Icon="@Icons.Material.Filled.Inbox" />
        <MudListItem Text="Sent" Icon="@Icons.Material.Filled.Send" />
        <MudListItem Text="Drafts" Disabled="true" IconColor="Color.Info" Icon="@Icons.Material.Filled.Drafts" />
        <MudDivider />
        <MudListItem Text="Trash" SecondaryText="Removed e-mails" />
        <MudListItem Text="Spam" SecondaryText="E-mails from common providers" />
    </MudList>
</MudPaper>
```

To create a nested list with multiple levels of nesting use the NestedList render fragment of the MudListItem.
 The nested lists inherit all settings of the top-level list. To initialize the expansion state of a nested list set the `@nameof(MudListItem.Expanded)` parameter. You can also bind
 it to control the sub-list expansion state. This example also shows how to appropriate the MudListSubheader as a footer.

```razor title="ListNestedExample"
<MudPaper Width="300px">
    <MudList T="string">
        <MudListSubheader>
            Nested List Items
        </MudListSubheader>
        <MudListItem Icon="@Icons.Material.Filled.Inbox" Text="Inbox" Expanded>
            <NestedList>
                <MudListItem Icon="@Icons.Material.Filled.StarRate">
                    Starred
                </MudListItem>
                <MudListItem Icon="@Icons.Material.Filled.WatchLater">
                    Snoozed
                </MudListItem>
            </NestedList>
        </MudListItem>
        <MudListItem Icon="@Icons.Material.Filled.Send" Text="Sent mail" @bind-Expanded="_expanded">
            <NestedList>
                <MudListItem>Re: Meeting tomorrow</MudListItem>
                <MudListItem>Fwd: JavaScript memes xD</MudListItem>
            </NestedList>
        </MudListItem>
        <MudListItem Icon="@Icons.Material.Filled.Drafts">
            Drafts
        </MudListItem>
        <MudDivider/>
        <MudListSubheader Class="mb-n3">
            <MudSwitch Color="Color.Primary" @bind-Value="_expanded">"Sent mail" Expansion</MudSwitch>
        </MudListSubheader>
    </MudList>
</MudPaper>

@code {
    bool _expanded;
}
```

A MudList which has its `SelectionMode` set to either `SelectionMode.SingleSelection` or 
 `SelectionMode.ToggleSelection` can be used to select a single value across all its nested lists.
 Use `@@bind-SelectedValue` to manipulate the selected value or receive updates when the user selects a value.

 Note: If you use the toggle selection and unselect the selected item the `SelectedValue` will become `default(T)`. If that
 collides with a valid choice (i.e. 0 for type `int`) you should use a nullable type (i.e. `T="int?"`).

 The value of a MudListItem is defined either via its `Text` or its `Value` parameter. 
 For `T="string"` setting only `Text` will suffice if the text you want to display is the same as the selectable value. If 
 you set `Value` you can set a different display text with `Text`. The example below demonstrates this.

 You can customize the selected item color via the `Color` parameter. If `ReadOnly` is set, the list will display the selected value but 
 you can't change it.

```razor title="ListSingleSelectionExample"
<MudPaper Width="300px">
<MudList T="string" @bind-SelectedValue="SelectedValue" SelectionMode="@SelectionMode" ReadOnly="@ReadOnly" Color="@Color.Info">
        <MudListSubheader>
            Your drink:
        <MudChip Color="@Color.Info">
            @(SelectedValue ?? "You are dry")
        </MudChip>
        </MudListSubheader>
        <MudListItem Text="Milk" />
        <MudListItem Text="Sparkling Water" Value='"Carbonated H²O"' />
        <MudListItem Text="Teas">
            <NestedList>
                <MudListItem Text="English Tea" Value='"Earl Grey"' />
                <MudListItem Text="Chinese Tea" Value='"Gunpowder Tea"' />
                <MudListItem Text="Bubble Tea" />
            </NestedList>
        </MudListItem>
        <MudListItem Text="Coffees">
            <NestedList>
                <MudListItem Text="Irish Coffee" />
                <MudListItem Text="Double Espresso" />
                <MudListItem Text="Cafe Latte" />
            </NestedList>
        </MudListItem>
    </MudList>
</MudPaper>

<MudStack Row Justify="Justify.Center" Style="width: 100%" Wrap="Wrap.Wrap">
    <MudRadioGroup @bind-Value="SelectionMode">
        <MudRadio Value="SelectionMode.SingleSelection" Color="Color.Primary">SingleSelection</MudRadio>
        <MudRadio Value="SelectionMode.ToggleSelection" Color="Color.Primary">ToggleSelection</MudRadio>
    </MudRadioGroup>
    <MudChipSet T="string" @bind-SelectedValue="SelectedValue" SelectionMode="@SelectionMode" Color="Color.Info" Variant="Variant.Text">
        <MudChip Text="Milk" />
        <MudChip Text="Carbonated H²O" />
        <MudChip Text="Earl Grey" />
        <MudChip Text="Gunpowder Tea" />
        <MudChip Text="Bubble Tea" />
        <MudChip Text="Irish Coffee" />
        <MudChip Text="Double Espresso" />
        <MudChip Text="Cafe Latte" />
    </MudChipSet>
    <MudSwitch @bind-Value="ReadOnly" Color="Color.Primary">ReadOnly</MudSwitch>    
</MudStack>



@code
{
    public string SelectedValue = "Milk";
    public SelectionMode SelectionMode = SelectionMode.SingleSelection;
    public bool ReadOnly;
}
```

MudList can also be used to select multiple values if the `SelectionMode` is set to `SelectionMode.MultiSelection`. 
 To manipulate the selected values or to receive updates when the user changes the selection use `@@bind-SelectedValues` (note the 's' at the end).

```razor title="ListMultiSelectionExample"
<MudPaper Width="300px">
    <MudList T="string" @bind-SelectedValues="SelectedValues" SelectionMode="SelectionMode.MultiSelection" ReadOnly="@ReadOnly" CheckBoxColor="Color.Tertiary">
        <MudListSubheader>
            Select your favourite drinks:
        </MudListSubheader>
        <MudListItem Text="Milk" />
        <MudListItem Text="Sparkling Water" Value='"Carbonated H²O"' />
        <MudListItem Text="Teas">
            <NestedList>
                <MudListItem Text="English Tea" Value='"Earl Grey"' />
                <MudListItem Text="Chinese Tea" Value='"Gunpowder Tea"' />
                <MudListItem Text="Bubble Tea" />
            </NestedList>
        </MudListItem>
        <MudListItem Text="Coffees">
            <NestedList>
                <MudListItem Text="Irish Coffee" />
                <MudListItem Text="Double Espresso" />
                <MudListItem Text="Cafe Latte" />
            </NestedList>
        </MudListItem>
    </MudList>
</MudPaper>

<MudStack Row Justify="Justify.Center" Style="width: 100%" Wrap="Wrap.Wrap">
    <MudChipSet T="string" @bind-SelectedValues="SelectedValues" SelectionMode="SelectionMode.MultiSelection" Color="Color.Tertiary" Variant="Variant.Text">
        <MudChip Text="Milk"/>
        <MudChip Text="Carbonated H²O"/>
        <MudChip Text="Earl Grey"/>
        <MudChip Text="Gunpowder Tea" />
        <MudChip Text="Bubble Tea" />
        <MudChip Text="Irish Coffee" />
        <MudChip Text="Double Espresso"/>
        <MudChip Text="Cafe Latte"/>
    </MudChipSet>
    <MudSwitch @bind-Value="ReadOnly" Color="Color.Info">ReadOnly</MudSwitch>    
</MudStack>

@code
{
    public IReadOnlyCollection<string> SelectedValues = ["Milk", "Cafe Latte"];
    public bool ReadOnly;
}
```

To make the list non-interactive you can set the ReadOnly parameter. In this mode it will still display the selected item. 
 In Disabled mode the selection is not shown at all.

```razor title="ListInteractiveExample"
<MudGrid>
    <MudItem xs="12" md="6">
        <MudPaper Width="100%">
            <MudList T="string" ReadOnly="@ReadOnly" Dense="@Dense" Gutters="@Gutters" Disabled="@Disabled" Padding="@Padding">
                <MudListSubheader>Important Isotopes</MudListSubheader>
                <MudListItem Text="Hydrogen (H-1) - stable" Icon="@StableIcon" IconColor="@StableColor" Expanded>
                    <NestedList>
                        <MudListItem Text="Deuterium (H-2) - stable" Icon="@StableIcon" IconColor="@StableColor" />
                        <MudListItem Text="Tritium (H-3) - radioactive" Icon="@RadioactiveIcon" IconColor="@RadioactiveColor" />
                    </NestedList>
                </MudListItem>
                <MudListItem Text="Uranium (U-92) - radioactive" Icon="@RadioactiveIcon" IconColor="@RadioactiveColor">
                    <NestedList>
                        <MudListItem Text="Uranium (U-234) - radioactive" Icon="@RadioactiveIcon" IconColor="@RadioactiveColor" />
                        <MudListItem Text="Uranium (U-235) - radioactive" Icon="@RadioactiveIcon" IconColor="@RadioactiveColor" />
                        <MudListItem Text="Uranium (U-238) - radioactive" Icon="@RadioactiveIcon" IconColor="@RadioactiveColor" />
                    </NestedList>
                </MudListItem>
            </MudList>
        </MudPaper>
    </MudItem>
    <MudItem xs="12" md="12" Class="d-flex">
        <MudCheckBox @bind-Value="Dense" Label="Dense"/>
        <MudCheckBox @bind-Value="ReadOnly" Label="ReadOnly"/>
        <MudCheckBox @bind-Value="Gutters" Label="Gutters"/>
        <MudCheckBox @bind-Value="Padding" Label="Padding"/>
        <MudCheckBox @bind-Value="Icon" Label="Icon"/>
        <MudCheckBox @bind-Value="IconColor" Label="IconColor"/>
        <MudCheckBox @bind-Value="Disabled" Label="Disabled"/>
    </MudItem>
</MudGrid>



@code {
    public bool Dense { get; set; }
    public bool ReadOnly { get; set; }
    public bool Gutters { get; set; } = true;
    public bool Padding { get; set; } = true;
    public bool Disabled { get; set; }
    public bool Icon { get; set; } = true;
    public bool IconColor { get; set; } = true;

    public string StableIcon => Icon ? Icons.Material.Filled.RadioButtonChecked : null;
    public string RadioactiveIcon => Icon ? "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><title>radioactive-circle-outline</title><path d=\"M12 4C16.4 4 20 7.6 20 12S16.4 20 12 20 4 16.4 4 12 7.6 4 12 4M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M15 17.2L13.2 14.2C12.8 14.4 12.4 14.5 12 14.5S11.1 14.4 10.8 14.2C10.3 15.1 9.6 16.2 9 17.2C9.9 17.7 10.9 18 12 18S14.1 17.7 15 17.2M15 6.8L13.2 9.8C13.9 10.2 14.5 11 14.5 12H18C18 9.8 16.8 7.8 15 6.8M12 13C12.6 13 13 12.6 13 12S12.6 11 12 11 11 11.4 11 12 11.4 13 12 13M6 12H9.5C9.5 11.1 10 10.3 10.8 9.8C10.3 8.9 9.6 7.8 9 6.8C7.2 7.8 6 9.8 6 12Z\" /></svg>" : null;

    public Color StableColor => IconColor ? Color.Primary : default;
    public Color RadioactiveColor => IconColor ? Color.Tertiary : default;
}
```

List items can either display an icon via the `Icon` parameter or an avatar via the AvatarContent render fragment.
 The content inside AvatarContent doesn't necessarily have to be an [Avatar](/components/avatar) it can be 
 anything you want to render in place of an avatar or icon. 

 Note: when you define AvatarContent the `Icon` parameter is ignored. Also, you'll need to use the
 ChildContent render fragment for the other content such as the item text.

```razor title="ListAvatarExample"
<MudPaper Width="300px">
    <MudList T="string">
        <MudListItem>
            <AvatarContent>
                <MudAvatar>
                    <MudImage Src="images/mony.jpg"/>
                </MudAvatar>
            </AvatarContent>
            <ChildContent>
                Photos
            </ChildContent>
        </MudListItem>
        <MudListItem>
            <AvatarContent>
                <MudAvatar>
                    <MudIcon Icon="@Icons.Material.Filled.Work" Color="Color.Primary" />
                </MudAvatar>
            </AvatarContent>
            <ChildContent>
                Work
            </ChildContent>            
        </MudListItem>
        <MudListItem>
            <AvatarContent>
                <MudAvatar Color="Color.Tertiary">V</MudAvatar>
            </AvatarContent>
            <ChildContent>
                Vacation
            </ChildContent>              
        </MudListItem>
    </MudList>
</MudPaper>
```

Interactive lists use listbox semantics and roving keyboard focus. When the list is read-only it falls back to list semantics for screen readers.
 Use the following shortcuts when focus is inside an interactive list:

 `Tab` enters or leaves the list using the current active item.
 `Arrow Up` and `Arrow Down` move between items in the current list level.
 `Home` and `End` jump to the first or last enabled item.
 `Space` toggles the focused item in multi-select lists and expands nested items.
 `Enter` activates the focused item.
