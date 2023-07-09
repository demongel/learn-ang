1. Node.js项目的package.json文件内容如下。
- 项目所使用的第三方依赖包的信息。
- 项目相关的执行命令，npm通过这些命令启动项目、运行脚本和安装依赖项。


2. 脚本命令
```
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
},
```
- scripts节点中的键对应执行npm命令行的缩写，如start键对应的是执行npm run start命令行，冒号右边的内容是执行的具体脚本命令。如执行npm run start命令对应的就是执行ng serve命令。

- Angular项目本身也是Node.js项目，它通过scripts节点将npm命令与Angular CLI命令对应起来，即左边对应的是npm命令，右边对应的是Angular CLI命令。

-  在npm中，仅有4个命令可以省略关键字run，这4个命令分别是npm test、npm start、npm restart和npm stop。