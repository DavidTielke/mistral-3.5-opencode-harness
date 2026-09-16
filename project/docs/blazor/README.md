# Blazor reference documentation

Official ASP.NET Core Blazor documentation, mirrored from the `dotnet/AspNetCore.Docs`
repository on 2026-09-16. These are the source Markdown files behind
learn.microsoft.com, so they are authoritative and current for .NET 10.

**Do not read a whole file.** Every file below is tens of thousands of bytes. Find the
line number with `grep -n`, then read that range. The "read this when" column tells you
which file to search first.

Files carry `:::moniker range="..."` markers. Content inside a marker applies only to the
versions it names — check the marker before trusting a snippet, because these files still
contain sections for .NET 3.x through 9.

| File | Read this when | Applies to | Size |
| --- | --- | --- | --- |
| `components-render-modes.md` | A page has no interactivity: @onclick does nothing, @bind does not update. Start here. | >= aspnetcore-8.0 | 49 KB |
| `components-prerender.md` | Component initialisation appears to run twice, or state is lost after the first render. | >= aspnetcore-8.0 | 10 KB |
| `forms-binding.md` | A submitted form saves empty or default values instead of what was typed. | >= aspnetcore-3.1 | 33 KB |
| `forms-index.md` | Building an EditForm: submission, handlers, antiforgery. | >= aspnetcore-3.1 | 31 KB |
| `forms-input-components.md` | InputText, InputNumber, InputSelect and friends. | >= aspnetcore-3.1 | 24 KB |
| `forms-validation.md` | Validation attributes, ValidationSummary, custom validators. | >= aspnetcore-3.1 | 121 KB |
| `blazor-ef-core.md` | Using EF Core from Blazor: why DbContextFactory, context lifetime, concurrency. | >= aspnetcore-3.1 | 11 KB |
| `components-data-binding.md` | @bind, @bind:event, two-way binding between components. | >= aspnetcore-3.1 | 48 KB |
| `components-event-handling.md` | @onclick and friends, event arguments, async handlers. | >= aspnetcore-3.1 | 35 KB |
| `components-lifecycle.md` | OnInitializedAsync, OnParametersSetAsync, StateHasChanged, render order. | >= aspnetcore-3.1 | 48 KB |
| `components-index.md` | Razor component fundamentals: parameters, _Imports, namespaces, folders. | >= aspnetcore-3.1 | 85 KB |
| `components-quickgrid.md` | QuickGrid component for tabular data with sorting and paging. | >= aspnetcore-8.0 | 69 KB |
| `project-structure.md` | Where files belong in a Blazor Web App: Components/, Layout/, Pages/, Routes.razor. | >= aspnetcore-3.1 | 59 KB |
| `fundamentals-routing.md` | @page routes, route parameters, NavigationManager, NotFound handling. | >= aspnetcore-3.1 | 33 KB |
| `fundamentals-dependency-injection.md` | Service lifetimes in Blazor, scoped services and the circuit. | >= aspnetcore-3.1 | 40 KB |
| `fundamentals-handle-errors.md` | Error boundaries, unhandled exceptions, circuit failures. | >= aspnetcore-3.1 | 51 KB |
| `state-management-index.md` | Keeping state across renders, navigation and reconnects. | >= aspnetcore-3.1 | 7 KB |
| `call-web-api.md` | Calling HTTP APIs from components, HttpClient setup. | >= aspnetcore-3.1 | 81 KB |
| `security-index.md` | Authentication and authorisation overview. | >= aspnetcore-3.1 | 104 KB |
| `hosting-models.md` | Server, WebAssembly, Auto: what each costs and implies. | >= aspnetcore-3.1 | 33 KB |
| `performance-index.md` | Rendering performance and common pitfalls. | >= aspnetcore-3.1 | 5 KB |
| `tooling.md` | dotnet new templates and options for Blazor. | >= aspnetcore-3.1 | 29 KB |
| `index.md` | Blazor overview. | >= aspnetcore-3.1 | 13 KB |

23 files, 1027 KB total.

