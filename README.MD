# module-federation 实验仓库


## 目录说明

**rsbuild-app**

由[Module Federation 快速上手](https://module-federation.io/zh/guide/start/quick-start.html) 以下命令,并选择application时产生

```bash

pnpm create module-federation@latest

```


**rsbuild-mf-components**

根据[rsbuild 快速上手](https://rsbuild.dev/zh/guide/start/quick-start),并[手动搭建](https://module-federation.io/zh/guide/basic/rsbuild.html)的 Module Federation 项目

**rslib-mf-components**


由[Module Federation 快速上手](https://module-federation.io/zh/guide/start/quick-start.html) 以下命令,并选择`lib`时产生

**vite-app**

由 `pnpm create viet `产生基本项目,并根据[Module Federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html) 结合`git@github.com:gioboa/react-microfrontend-demo.git`/`git@github.com:module-federation/module-federation-examples.git`产生


**vite-mf-components**

由 `pnpm create viet `产生基本项目,并根据[Module Federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html) 结合 [module-federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html) 产生



##  严重bug

1. @module-federation/rsbuild-plugin 在 0.14.0 时将无法使用模块联邦,除非全部更新一次依赖
2. [快速开始](https://module-federation.io/zh/guide/start/quick-start.html) 命令执行完后需要手动update一次才能使用最新的
3. remote/expose的key不能以包含- ,否则无法自动dev打包



## 项目说明


### app-mf-cra

create react app 未使用


### app-mf-rsbuild

使用rsbuild创建的应用

1. 运行端口 `4010`


### app-mf-rspack

基于 `rspack`  创建的 应用. 从未测试


### app-mf-vite

基于vite 创建的 应用

1. 运行端口 default: 5173


### app-mf-webpack

基于webpack创建的app

1. 运行端口 4090



### lib-mf-rsbuild

基于 `rsbuild` 的模块联邦项目

```bash
pnpm run dev
```

**基本信息**

1. 基于 rsbuild 创建的模块联邦远程模块项目
2. 使用插件 `@module-federation/rsbuild-plugin` 构建
3. 运行端口 `4070`

**导出模块**

模块名称 `rsbuild_mf_components`

1. 协议 http://localhost:4070/mf-manifest.json
2. 脚本 http://localhost:4070/remoteEntry.js


### lib-mf-rslib

运行实时编译:

```bash
pnpm run dev
```

运行预览服务器,暴漏远程模块(运行模块联邦)

```bash
pnpm run mf-dev
```


**基本信息**

1. 基于 rsbuild 创建的模块联邦远程模块项目
2. 使用插件 `@module-federation/rsbuild-plugin` 构建
3. 运行端口 4000


**导出模块**

模块名称 `mf_provider`

1. 协议 http://localhost:4000/mf-manifest.json
2. 脚本 http://localhost:4000/mf_provider.js


### lib-mf-vite

使用vite构建的模块联邦应用


运行预览,并暴漏模块联邦,请执行命令

```bash
pnpm run dev
```


**基本信息**

1. 基于 vitejs 创建的模块联邦远程模块项目
2. 使用插件 `@module-federation/vite` 构建
3. 开发服务器运行端口 4050
4. 预览服务器运行端口 4060


**导出模块**

模块名称 `vite_mf_components`

1. 协议 http://localhost:4050/mf-manifest.json
2. 脚本 http://localhost:4050/remoteEntry.js



### lib-mf-webpack

基于webpack 构建的模块联邦


**运行预览**

```bash
pnpm run start
```

**基本信息**

1. 基于 vitejs 创建的模块联邦远程模块项目
2. 使用插件webpack 内置模块联邦插件`webpack/container/ModuleFederationPlugin`构建
3. 预览服务器运行端口 4080


**导出模块**

模块名称 `mf_webpack`

1. 脚本 http://localhost:4080/remoteEntry.js

