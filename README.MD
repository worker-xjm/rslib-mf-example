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

create react app 从未测试


### app-mf-rsbuild

使用rsbuild创建的应用

运行地址 `http://localhost:4010/`

**启动预览**

```bash
pnpm run dev
```


**测试结果**

- [x] 使用 `rslib` `mf-manifest` (4000端口) 协议正常使用
- [x] 使用 `rsbuild`  `mf-manifest`(4070端口) 协议正常使用
- [ ] 使用 `rslib`  `remoteEntry.js`(4000端口) 远程文件报错
```text
index.cjs.cjs:21  Uncaught (in promise) Error: [ Federation Runtime ]: remoteEntryExports is undefined 
 {
  "alias": "provider",
  "name": "lib-mf-rslib",
  "entry": "http://localhost:4000/mf_provider.js",
  "externalType": "script",
  "shareScope": "default",
  "type": "global",
  "entryGlobalName": "lib-mf-rslib"
}
while loading "." from webpack/container/reference/provider
    at error (index.cjs.cjs:21:1)
    at assert (index.cjs.cjs:13:1)
    at Module.getEntry (index.cjs.cjs:1214:1)
    at async Module.get (index.cjs.cjs:1224:1)
    at async RemoteHandler.loadRemote (index.cjs.cjs:2575:1)
    at async Promise.all (:4010/index 4)
    at async Promise.all (:4010/index 2)
error @ index.cjs.cjs:21
assert @ index.cjs.cjs:13
getEntry @ index.cjs.cjs:1214
await in getEntry
get @ index.cjs.cjs:1224
loadRemote @ index.cjs.cjs:2575
await in loadRemote
loadRemote @ index.cjs.cjs:2911
loadRemote @ index.cjs.cjs:92
(匿名) @ index.cjs.cjs:98
Promise.then
onRemoteLoaded @ index.cjs.cjs:97
handleFunction @ index.cjs.cjs:62
(匿名) @ index.cjs.cjs:108
remotes @ index.cjs.cjs:32
(匿名) @ vendors-_module-federation_runtime_rspack_js_data_text_javascript_import___module_federation_-a602f5.js.map:1
(匿名) @ ensure_chunk:7
__webpack_require__.e @ ensure_chunk:6
fn.e @ hot_module_replacement:81
./src/index.tsx @ index.tsx:1
__webpack_require__ @ index.tsx:1
(匿名) @ remotes_loading:3
__webpack_require__.O @ on_chunk_loaded:27
(匿名) @ remotes_loading:3
(匿名) @ remotes_loading:3
[新] 使用 Edge 中的 Copilot 来解释控制台错误: 单击
```
- [x] 使用 `rsbuild` `remoteEntry.js` (4070端口) 远程文件正常使用
- [ ] 使用 `webpack` `remoteEntry.js` (4080端口) 远程文件报错

```text
remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
container_entry:12  Uncaught (in promise) Error: Module "." does not exist in container.
while loading "." from webpack/container/reference/provider
    at eval (container_entry:12:11)
    at async Module.get (index.cjs.cjs:1283:1)
    at async RemoteHandler.loadRemote (index.cjs.cjs:2575:1)
    at async Promise.all (:4010/index 4)
    at async Promise.all (:4010/index 2)
eval @ container_entry:12
Promise.then
get @ container_entry:11
get @ index.cjs.cjs:1283
await in get
loadRemote @ index.cjs.cjs:2575
await in loadRemote
loadRemote @ index.cjs.cjs:2911
loadRemote @ index.cjs.cjs:92
(匿名) @ index.cjs.cjs:98
Promise.then
onRemoteLoaded @ index.cjs.cjs:97
handleFunction @ index.cjs.cjs:62
(匿名) @ index.cjs.cjs:108
remotes @ index.cjs.cjs:32
(匿名) @ vendors-_module-federation_runtime_rspack_js_data_text_javascript_import___module_federation_-b5556d.js.map:1
(匿名) @ ensure_chunk:7
__webpack_require__.e @ ensure_chunk:6
fn.e @ hot_module_replacement:81
./src/index.tsx @ index.tsx:1
__webpack_require__ @ index.tsx:1
(匿名) @ remotes_loading:3
__webpack_require__.O @ on_chunk_loaded:27
(匿名) @ remotes_loading:3
(匿名) @ remotes_loading:3

```
### app-mf-rspack

基于 `rspack`  创建的 应用. 从未测试


### app-mf-vite

基于vite 创建的 应用

**启动开发预览**

```bash
pnpm run dev
```

运行地址 `http://localhost:5173/`


**测试结果**

- [x] 对 rslib mf-manifest (4000端口) 协议正常使用
- [x] 对 rsbuild  mf-manifest (4070端口) 协议正常使用
- [x] 对 rslib mf_provider.js (4000端口) 远程文件正常使用
- [x] 对 rsbuild remoteEntry.js (4070) 远程文件正常使用
- [ ] 对 vite mf-manifest (4050) 协议无法解析
- [ ] 对 vite remoteEntry.js (4050) 报错

```text
remoteEntry.js:2  Uncaught SyntaxError: Cannot use import statement outside a module (at remoteEntry.js:2:3)
index.cjs.js:21  Uncaught Error: [ Federation Runtime ]: remoteEntryExports is undefined 
 {
  "entryGlobalName": "vite_mf_components",
  "name": "mf_rsbuild_components",
  "type": "var",
  "entry": "http://localhost:4050/remoteEntry.js",
  "shareScope": "default"
}
    at error2 (index.cjs.js:21:11)
    at assert2 (index.cjs.js:13:9)
    at Module.getEntry (index.cjs.js:1217:9)
    at async Module.get (index.cjs.js:1227:36)
    at async RemoteHandler.loadRemote (index.cjs.js:2558:37)
    at async mf_rsbuild_components.js:24:1
error2 @ index.cjs.js:21
assert2 @ index.cjs.js:13
getEntry @ index.cjs.js:1217
await in getEntry
get @ index.cjs.js:1227
loadRemote @ index.cjs.js:2558
await in loadRemote
loadRemote @ index.cjs.js:2894
loadRemote @ index.cjs.js:29
(匿名) @ mf_rsbuild_components.js:16
Promise.then
node_modules/__mf__virtual/vite_mf_2_app__loadRemote__mf_rsbuild_components__loadRemote__.js @ mf_rsbuild_components.js:16
__require @ chunk-BUSYA2B4.js:3
(匿名) @ mf_rsbuild_components.js:24

```

- [ ] 使用webpack remoteEntry.js (4080) 远程文件报错

```text
remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
container_entry:12  Uncaught Error: Module "." does not exist in container.
    at eval (container_entry:12:11)
    at async Module.get (index.cjs.js:1277:29)
    at async RemoteHandler.loadRemote (index.cjs.js:2558:37)
    at async mf_webpack_components.js:24:1
eval @ container_entry:12
Promise.then
get @ container_entry:11
get @ index.cjs.js:1277
await in get
loadRemote @ index.cjs.js:2558
await in loadRemote
loadRemote @ index.cjs.js:2894
loadRemote @ index.cjs.js:29
(匿名) @ mf_webpack_components.js:16
Promise.then
node_modules/__mf__virtual/vite_mf_2_app__loadRemote__mf_webpack_components__loadRemote__.js @ mf_webpack_components.js:16
__require @ chunk-BUSYA2B4.js:3
(匿名) @ mf_webpack_components.js:24
```


### app-mf-webpack

基于webpack创建的app

运行预览

```bash
pnpm run start
```

预览地址: `http://localhost:4090/`

**测试结果**

- [x] 拉取 rslib mf_provider.js 正常运行
- [x] rsbuild remoteEntry.js 正常运行
- [ ]  webpack remoteEntry.js 报错

```text
VM235 index.js:485 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
VM228 log.js:39 [HMR] Waiting for update signal from WDS...
remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
container_entry:12  Uncaught (in promise) Error: Module "." does not exist in container.
while loading "." from webpack/container/reference/provider
    at eval (container_entry:12:11)
eval @ container_entry:12
Promise.then
get @ container_entry:11
handleFunction @ main.js:617
onInitialized @ main.js:629
(匿名) @ main.js:619
Promise.then
handleFunction @ main.js:619
onExternal @ main.js:628
(匿名) @ main.js:619
Promise.then
handleFunction @ main.js:619
(匿名) @ main.js:636
__webpack_require__.f.remotes @ main.js:599
(匿名) @ main.js:466
__webpack_require__.e @ main.js:465
fn.e @ main.js:776
eval @ index.tsx:1
./src/index.tsx @ main.js:365
__webpack_require__ @ main.js:416
(匿名) @ main.js:1870
(匿名) @ main.js:1872

```
- [ ] 运行


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

基于 webpack 构建的模块联邦


**运行预览**

```bash
pnpm run start
```

**基本信息**

1. 基于 webpack 创建的模块联邦远程模块项目
2. 使用插件webpack 内置模块联邦插件`webpack/container/ModuleFederationPlugin`构建
3. 预览服务器运行端口 4080


**导出模块**

模块名称 `mf_webpack`

1. 脚本 http://localhost:4080/remoteEntry.js

