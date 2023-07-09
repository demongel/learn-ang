
1. 在Angular中，片段（fragment）是URL中的一部分，它以#符号开始，用于标识页面中的一个锚点（anchor）。你可以使用片段来导航到页面中的某个位置，或者获取URL中的一些信息。例如，你可以有一个这样的URL：

- http://example.com/content#section1

- 这个URL中的片段是section1，它表示页面中有一个id为section1的元素，你可以通过点击这个URL或者使用路由器的方法来跳转到这个元素的位置。你也可以在你的组件中订阅片段的变化，或者获取当前的片段值，来执行一些逻辑。

- Angular提供了一些工具和选项来处理URL中的片段，例如：

- **ActivatedRoute**服务的**fragment**属性，它是一个Observable，你可以订阅它来获取片段的值或者监听它的变化。
- **Router**服务的**navigate**方法和**routerLink**指令，它们都接受一个**fragment**选项，你可以用它来指定要导航到的片段。
- **RouterLinkActive**指令，它可以根据当前激活的路由和片段来添加或移除一个CSS类。
- **ExtraOptions**接口，它定义了一些路由器配置选项，例如**anchorScrolling**和**scrollPositionRestoration**，它们可以控制导航到片段时页面的滚动行为。

2. navigate 参数

- 路由器的**navigate**方法可以接收两个参数，一个是**commands**数组，一个是可选的**extras**对象。

- **commands**数组是一个表示导航目标的序列，它可以包含以下元素：
  - 字符串：表示路由的路径或别名。
  - 对象：表示路由的参数或数据。
  - 空值：表示不改变当前的路径或参数。
- **extras**对象是一个包含一些导航选项的配置对象，它可以包含以下属性：
  - **relativeTo**：表示相对于哪个激活的路由来解析命令数组，默认是当前激活的路由。
  - **queryParams**：表示要附加到URL的查询参数对象。
  - **fragment**：表示要附加到URL的片段字符串。
  - **queryParamsHandling**：表示如何合并当前的查询参数和新的查询参数，可以是'preserve'（保留当前的查询参数），'merge'（合并当前的和新的查询参数）或空值（忽略当前的查询参数）。
  - **preserveFragment**：表示是否保留当前的片段，默认为false。
  - **skipLocationChange**：表示是否跳过改变浏览器历史记录，默认为false。
  - **replaceUrl**：表示是否替换当前的历史记录条目，默认为false。
  - **state**：表示要附加到历史记录条目的自定义状态对象。

例如，如果你想要相对于某个激活的路由导航到'/abc/xyz'，并且带上查询参数'order=popular'和片段'section1'，你可以这样写：

```typescript
this.router.navigate(['/abc', 'xyz'], {
  relativeTo: someActivatedRoute,
  queryParams: { order: 'popular' },
  fragment: 'section1'
});
```

这样就会导航到类似这样的URL：
http://example.com/abc/xyz?order=popular#section1


3. ActivatedRoute 作用 
ActivatedRoute 是一个服务，它提供了关于与一个组件相关联的路由的信息。你可以在你的组件中注入这个服务，然后使用它来遍历路由器状态树和从节点中提取信息。例如，你可以使用ActivatedRoute来获取以下信息：

snapshot：表示当前路由的快照，它包含了一些静态的属性，如URL段，参数，查询参数，片段，数据等。
url：表示一个可观察对象（Observable），它发出当前路由匹配的URL段的数组。
params：表示一个可观察对象，它发出当前路由的矩阵参数（matrix parameters）。
queryParams：表示一个可观察对象，它发出所有路由共享的查询参数（query parameters）。
fragment：表示一个可观察对象，它发出所有路由共享的片段（fragment）。
data：表示一个可观察对象，它发出当前路由的静态数据和解析数据（resolved data）。
outlet：表示当前路由的出口（outlet）名称，它是一个常量。
component：表示当前路由的组件，它是一个常量。
routeConfig：表示用于匹配当前路由的配置，它是一个常量。
root：表示路由器状态树的根节点。
parent：表示当前路由在路由器状态树中的父节点。
firstChild：表示当前路由在路由器状态树中的第一个子节点。
children：表示当前路由在路由器状态树中的所有子节点的数组。
pathFromRoot：表示从根节点到当前节点的路径数组。
你可以使用这些信息来执行一些逻辑，例如导航到其他路由，显示或隐藏一些元素，调用一些服务等
