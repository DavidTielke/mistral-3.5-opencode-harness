# Analyzers

Identifies attributes set on MudBlazor components that don't match a defined pattern.
 This helps prevent component parameter errors due to typos or changes in MudBlazor.
 The warning will only indicate the correct .razor file, not the exact location.
 Configure the analyzer by adding the code below to your
 `.csproj`
 file.

The HTMLAttributes option can use a custom list of attributes.
 Configure this by adding the code below to your
 `.csproj`
 file.

When the unknown attribute is a parameter that an earlier major version removed, the same MUD0002 warning also names its replacement, so you do not have to search the migration guides.
 The tables below list every removal the analyzer explains.
 Everything else, including changes that move a setting to another component or replace several parameters with one enum, is covered by the [v7](https://github.com/MudBlazor/MudBlazor/discussions/12658), [v8](https://github.com/MudBlazor/MudBlazor/discussions/12659), and [v9](https://github.com/MudBlazor/MudBlazor/issues/12666) migration guides.
