## 安装

`nvm`可以在我们的项目中指定`node`的版本号，先来看看`nvm`怎么安装：

`nvm`的`windows`下载地址：

```
https://github.com/coreybutler/nvm-windows/releases
```

选择第二个`nvm-setup.zip`，这样安装方便些。

将下载的文件进行解压：`nvm-setup.exe`，单击开始安装，直接点击下一步解可以，当然我们需要注意一下两个界面：
设置`nvm`中`root`路径(相当于`setting.txt`中的`root`)

设置`nvm`中`path`路径(相当于`setting.txt`中的`path`)

安装完成.

## 配置

```
/**
*node下载源
*/
nvm node_mirror https://npm.taobao.org/mirrors/node/
/**
*npm下载源
*/
nvm npm_mirror  https://npm.taobao.org/mirrors/npm/
```

## `windows`下的命令

```
nvm arch                         查看当前系统的位数和当前nodejs的位数
nvm install <version> [arch]     安装制定版本的node 并且可以指定平台 version 版本号  arch 平台
nvm list [available]         
  - nvm list   查看已经安装的版本
  - nvm list installed 查看已经安装的版本
  - nvm list available 查看网络可以安装的版本
nvm on                           打开nodejs版本控制
nvm off                          关闭nodejs版本控制
nvm proxy [url]                  查看和设置代理
nvm node_mirror [url]            设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
nvm npm_mirror [url]             设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是：https://github.com/npm/npm/archive/.
nvm uninstall <version>          卸载制定的版本
nvm use [version] [arch]         切换制定的node版本和位数
nvm root [path]                  设置和查看root路径
nvm version                      查看当前的版本
```

如几个常用的简单命令：

```
nvm install 8.9.1 64-bit
nvm use 8.9.1
nvm list 或 nvm ls//查看以己经安装的
```

