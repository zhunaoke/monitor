# API监控系统 123

## 1、技术框架

### 1.1、技术栈
>工具：WebStorm,NodeJS,AngularJS,Bower,Gulp,Git,Karma,Jasmine,Istanbul,cnpm

## 2、安装

### 2.1、NodeJS
>下载地址：官网[http://www.nodejs.org/download/](http://www.nodejs.org/download/)

### 2.2、cnpm
`$ npm install -g cnpm`

### 2.3、bower
`$ cnpm install -g bower`
>Bower是twitter 推出的一款包管理工具，基于nodejs的模块化思想，把功能分散到各个模块中，让模块和模块之间存在联系，通过 Bower 来管理模块间的这种联系,可以理解成资源下载器,类似Java的Maven

### 2.4、Gulp
>Gulp是一个项目构建系统，开发者可以使用它在网站开发过程中自动执行常见任务.如:js的压缩合并,less,sass的编译.html的压缩.它是基于Node.js构建的.语法简单.易于操作阅读.插件丰富.相比grunt,webpack等工具.容易上手.
#### 1.全局安装
`$ cnpm install --global gulp`
#### 2.在你的项目的 devDependencies 下安装gulp
`$ cnpm install gulp --save-dev`

### 2.5、Git(版本管理)
>下载地址:[http://git-scm.com/download/](http://git-scm.com/download/)
 项目gitlab服务器地址[https://git.chiqdata.com/FrontEnd/chop-platform.git](https://git.chiqdata.com/FrontEnd/chop-platform.git)

 ** 注意:项目下载之后，本地新建一个名为`dev`分支并切换到该分支(切记) **
 ** 如果项目不能下载,配置本地host文件 `10.3.30.59   git.chiqdata.com` **
 >该项目分为4个分支
 1. master(默认分支,不可删除)
 2. dev(开发分支)
 3. test(测试分支)
 4. pro(线上分支)

### 2.6、Karma
`$ cnpm install karma --save-dev`
>Karma是一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。该工具可用于测试所有主流Web浏览器，也可集成到CI（Continuous integration）工具，也可和其他代码编辑器一起使用。这个测试工具的一个强大特性就是，它可以监控(Watch)文件的变化，然后自行执行，通过console.log显示测试结果。

### 2.7、Jasmine
`$ cnpm install karma-jasmine --save-dev`
>Jasmine是单元测试框架，本单将介绍用Karma让Jasmine测试自动化完成。Jasmine的介绍，请参考文章：jasmine行为驱动,测试先行

### 2.8、Istanbul
`cnpm install -g karma-coverage`
>istanbul是一个单元测试代码覆盖率检查工具，可以很直观地告诉我们，单元测试对代码的控制程度。

## 3、运行
1.直接运行项目：`cnpm start`
2.做单元测试：`cnpm test`

>在package.json里，不管是直接运行还是进行测试，会根据下面所制定的顺序进行执行：
```js
  "scripts": {
    "preinstall":"gulp",
    "postinstall": "bower install",
    "prestart": "cnpm install",
    "start": "http-server -a localhost -p 8000 -d false  -c-1",
    "pretest": "cnpm install",
    "test": "karma start karma.conf.js",
    "test-single-run": "karma start karma.conf.js  --single-run"
  }
```






