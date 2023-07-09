
●Angular CLI可以创建新的Angular应用程序。
●Angular CLI可以通过实时、重新加载及更新来运行和开发服务器。
●Angular CLI可以添加功能到现有的Angular应用程序中。
●Angular CLI可以运行应用程序的单元测试和端到端（e2e）测试。
●Angular CLI可以构建应用程序。
●Angular CLI可以打包和部署应用程序。

1. 安装
- npm install -g angular-cli
- ng version 

2. 卸载和更新
- npm uninstall -g @angular/cli # 卸载Angular CLI
- npm install -g @angular/cli # 安装最新版本的Angular CLI

3. 创建
- ng new < name > --routing=false--style=css
- name 是项目名称 不能以数字开头

4. 启动
- ng serve



Angular CLI的命令ng new负责创建并初始化一个新的项目。该命令可提供交互式提示，以提供可选配置。初始化命令格式为ng new <name> [options]，可以简写为ng n <name>[options]。选项name是创建项目的名称，options选项除了在示例cli-ex100中介绍的两个参数外，下面的一些参数也是经常使用的。

●--inlineTemplate=true|false：是否使用内联模板生成组件。组件模板标记将在组件内生成，而不是在单独的文件中生成。
●--inlineStyle=true|false：是否生成具有内联样式的组件。组件样式将在组件内生成，而不是在单独的文件中生成。
●--skipTests=true|false：如果为true，则不会为新项目生成spec.ts测试文件。
●--minimal=true|false：如果为true，则相当于--inlineTemplate=true--inlineStyle=true--skipTests=true以及不含e2e测试文件。
●--interactive=true|false：如果为false，则禁用交互式输入提示，相当于--routing=false--style=css。
●--defaults=true|false：如果为true，同--interactive=true。

创建命令和选项创建命令的格式为ng generate <type> [options]，可以简写为ng g <type>[options]。


支持的类型	    用法
Component	        ng g component my-new-component
Directive	        ng g directive my-new-directive
Pipe	            ng g pipe my-new-pipe
Service	            ng g service my-new-service
Class	            ng g class my-new-class
Interface	        ng g interface my-new-interface
Enum	            ng g enum my-new-enum
Module	            ng g module my-module
Route	            ng g route my-route当前已禁用


不同的type有不同的options与之相对应，如component所对应的选项如下。
●--inlineStyle=true|false：默认值为false。为true时，生成具有内联样式的组件。组件样式将在组件内生成，而不是在单独的文件中生成。
●--inlineTemplate=true|false：默认值为false。为true时，使用内联模板生成组件。组件模板标记将在组件内生成，而不是在单独的文件中生成。
●--skipTests=true|false：默认值为false。为true时，不为新组件创建spec.ts测试文件。
●--flat=true|false：默认值为false。为true时，则在当前项目的根目录下创建新文件。
