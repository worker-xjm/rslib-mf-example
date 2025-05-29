# Module Federation 实验仓库

## 📁 目录说明

### 应用项目
- **app-mf-cra**: 由 `npx create-react-app my-app` 产生的基础项目，并执行 `pnpm eject` 的结果，项目从未测试
- **app-mf-rsbuild**: 由[Module Federation 快速上手](https://module-federation.io/zh/guide/start/quick-start.html)产生，具体执行以下命令，并选择 application 时产生
  ```bash
  pnpm create module-federation@latest
  ```
- **app-mf-rspack**: 根据 [rspack 文档](https://rspack.dev/zh/guide/start/quick-start#%E4%BD%BF%E7%94%A8-rspack-cli) 产生，从未使用/测试
- **app-mf-vite**: 由 `pnpm create viet` 产生基本项目，并根据[Module Federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html)结合`git@github.com:gioboa/react-microfrontend-demo.git`,`git@github.com:module-federation/module-federation-examples.git` 以及 `git@github.com:module-federation/vite.git` 产生
- **app-mf-webpack**: 由 AI 生成，可以运行，结合 [module-federation-plugin](https://webpack.docschina.org/plugins/module-federation-plugin/) 文档产生

### 库项目
- **lib-mf-rsbuild**: 根据[rsbuild 快速上手](https://rsbuild.dev/zh/guide/start/quick-start)，并[手动搭建](https://module-federation.io/zh/guide/basic/rsbuild.html)的 Module Federation 项目
- **lib-mf-rslib**: 由[Module Federation 快速上手](https://module-federation.io/zh/guide/start/quick-start.html)以下命令，并选择`lib`时产生
- **lib-mf-vite**: 由 `pnpm create viet` 产生基本项目，并根据[Module Federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html)结合产生
- **lib-mf-webpack**: 由 AI 生成，可以运行，结合 [module-federation-plugin](https://webpack.docschina.org/plugins/module-federation-plugin/) 文档产生，但其产生的 mf 不能被其他项目使用

## ⚠️ 严重 Bug

1. ~~由 `pnpm create module-federation@latest` 命令产生的 `初始项目` 依赖相互不匹配, 导致 `命令` 创建的项目不能直接使用, 除非 `全量` `update` 一次~~ (官方已修复)
2. mf vite plugin 和 基于 rspack 的插件使用体验完全不一致: 主要体现在 ts , 如果按照 webpack 模块联邦插件的用法, 则不会出现太大的问题


## 使用注意事项

remote/expose 的配置 key 不能包含 `-` (默认为var格式导致的) ，否则在基于 rslib 的项目自动打包时会报错并无法成功构建, 就算构建成功可能也无法在引用端正常使用,因此最好不要包含程序中使用的常见运算符, 最好就是纯字母

## 本仓库预览方法

要想正常启动本仓库中的案例, 并预览测试, 需要先启动以 `lib开头` 的 `预览mf服务器`

然后再启动 `app开头` 的 引用 `mf(模块联邦)`

其中以下目录的应用并未支持预览,需要自行配置

- app-mf-cra
- app-mf-rspack

下文介绍的运行命令, 是以假定预览用户执行命令的路径为项目根目录的前提的

### 启动lib开头的项目( mf 服务)


1. lib-mf-rsbuild
  
  ```bash
  pnpm --filter rsbuild_mf_components dev
  ```
2. lib-mf-rslib
  ```bash
  pnpm --filter lib-mf-rslib mf-dev
  ```
  另外,如果想尝试修改并享受到实时的编译便利, 还需要启动
  ```bash
  pnpm --filter lib-mf-rslib dev
  ```
3. lib-mf-vite
  ```bash
  pnpm --filter app-mf-vite dev
  ```
4. lib-mf-webpack
  ```bash
  pnpm --filter lib-mf-webpack start
  ```

### 启动app预览 mf 效果

1. app-mf-rsbuild
  ```bash
  pnpm --filter app_mf_rsbuild dev
  ```

2. app-mf-vite
  ```bash
  pnpm --filter app-mf-vite dev
  ```
3. app-mf-webpack
  ```bash
  pnpm --filter app-mf-webpack start
  ```


## 📋 项目说明

### app-mf-cra
create react app 从未测试

### app-mf-rsbuild
使用 rsbuild 创建的应用

运行地址：`http://localhost:4010/`

#### 启动预览
```bash
pnpm run dev
```

#### 测试结果
- ✅ 使用 `rslib` `mf-manifest` (4000端口) 协议正常使用
- ✅ 使用 `rsbuild` `mf-manifest`(4070端口) 协议正常使用
- ✅ 使用 `rslib` `remoteEntry.js`(4000端口) 远程文件报错
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
  ```
  导入名称错误
- ✅ 使用 `rsbuild` `remoteEntry.js` (4070端口) 远程文件正常使用
- ✅ 使用 `webpack` `remoteEntry.js` (4080端口) 远程文件报错
  ```text
  remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
  container_entry:12  Uncaught (in promise) Error: Module "." does not exist in container.
  while loading "." from webpack/container/reference/provider
  ```
  lib_mf_webpack 打包导出错误,如果要使用webpack 的 lib 需要关闭  shareStrategy 选项,关闭shareStrategy 可能导致引用 rslib mf 出现错误

- [ ] 使用 `vite` `remoteEntry.js` (4050) 远程文件报错
  ```text
  [ Federation Runtime ]: remoteEntryExports is undefined 
  {
    "alias": "vite_mf_components",
    "name": "vite_mf_components",
    "entry": "http://localhost:4060/remoteEntry.js",
    "externalType": "script",
    "shareScope": "default",
    "type": "global",
    "entryGlobalName": "vite_mf_components"
  }
  while loading "." from webpack/container/reference/vite_mf_components
  Error: [ Federation Runtime ]: remoteEntryExports is undefined 
  {
    "alias": "vite_mf_components",
    "name": "vite_mf_components",
    "entry": "http://localhost:4060/remoteEntry.js",
    "externalType": "script",
    "shareScope": "default",
    "type": "global",
    "entryGlobalName": "vite_mf_components"
  }
    at error (http://localhost:4010/static/js/vendors-_module-federation_runtime_rspack_js_data_text_javascript_import___module_federation_-ffb8fe.js:688:11)
    at assert (http://localhost:4010/static/js/vendors-_module-federation_runtime_rspack_js_data_text_javascript_import___module_federation_-ffb8fe.js:680:9)
    at Module.getEntry (http://localhost:4010/static/js/vendors-_module-federation_runtime_rspack_js_data_text_javascript_import___module_federation_-ffb8fe.js:1868:9)
    at async Module.get (http://localhost:4010/static/js/vendors-_module-federation_runtime_rspack_js_data_text_javascript_import___module_federation_-ffb8fe.js:1878:36)
    at async RemoteHandler.loadRemote (http://localhost:4010/static/js/vendors-_module-federation_runtime_rspack_js_data_text_javascript_import___module_federation_-ffb8fe.js:3232:37)
    at async Promise.all (index 4)
    at async Promise.all (index 2)
  ```
- [x] 使用 `vite` `mf-manifest` (4060) 远程文件报错 (已修复, vite 打包配置问题)

### app-mf-rspack
基于 `rspack` 创建的应用，从未测试

### app-mf-vite
基于 vite 创建的应用

#### 启动开发预览
```bash
pnpm run dev
```

运行地址：`http://localhost:5173/`

#### 测试结果
- ✅ 对 rslib mf-manifest (4000端口) 协议正常使用
- ✅ 对 rslib mf_provider.js (4000端口) 远程文件正常使用
- ✅ 对 rsbuild mf-manifest (4070端口) 协议正常使用
- ✅ 对 rsbuild remoteEntry.js (4070) 远程文件正常使用
- ✅ 使用 webpack remoteEntry.js (4080) 远程文件报错(_现已修复,webpack 配置文件错误_)
  ```text
  remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
  container_entry:12  Uncaught Error: Module "." does not exist in container.
  ```
- ✅ 对 vite mf-manifest (4050) 协议无法解析 (已修复,vite 打包问题)
- ❌ 对 vite remoteEntry.js (4050) 报错
  ```text
  [ Federation Runtime ]: remoteEntryExports is undefined 
  {
    "entryGlobalName": "http://localhost:4050/remoteEntry.js",
    "name": "vitemfc",
    "type": "var",
    "entry": "http://localhost:4050/remoteEntry.js",
    "shareScope": "default"
  }
  Error: [ Federation Runtime ]: remoteEntryExports is undefined 
  {
    "entryGlobalName": "http://localhost:4050/remoteEntry.js",
    "name": "vitemfc",
    "type": "var",
    "entry": "http://localhost:4050/remoteEntry.js",
    "shareScope": "default"
  }
    at error2 (http://localhost:5173/node_modules/.vite/deps/chunk-MQ6423JS.js?v=85b979db:1187:13)
    at assert2 (http://localhost:5173/node_modules/.vite/deps/chunk-MQ6423JS.js?v=85b979db:1179:9)
    at Module.getEntry (http://localhost:5173/node_modules/.vite/deps/chunk-MQ6423JS.js?v=85b979db:2299:9)
    at async Module.get (http://localhost:5173/node_modules/.vite/deps/chunk-MQ6423JS.js?v=85b979db:2309:36)
    at async RemoteHandler.loadRemote (http://localhost:5173/node_modules/.vite/deps/chunk-MQ6423JS.js?v=85b979db:3582:35)
    at async http://localhost:5173/node_modules/.vite/deps/vitemfc.js?v=85b979db:25:49
  ```

**vite插件使用注意事项**

详见 `vite.config.ts` 注释


### app-mf-webpack
基于 webpack 创建的 app

#### 运行预览
```bash
pnpm run start
```

预览地址：`http://localhost:4090/`

#### 测试结果
- ✅ 拉取 rslib mf_provider.js 正常运行
- ✅ rsbuild remoteEntry.js 正常运行
- ✅ webpack remoteEntry.js 报错(_已修复,lib-mf-webpack 配置错误_)
  ```text
  VM235 index.js:485 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  VM228 log.js:39 [HMR] Waiting for update signal from WDS...
  remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
  container_entry:12  Uncaught (in promise) Error: Module "." does not exist in container.
  while loading "." from webpack/container/reference/provider
  ```
- [ ] vite remoteEntry.js 报错
  ```text
  ERROR
  Script error.
      at handleError (webpack://app-mf-webpack/../node_modules/.pnpm/webpack-dev-server@4.15.2_webpack-cli@5.1.4_webpack@5.99.8/node_modules/webpack-dev-server/client/overlay.js?:251:58)
      at eval (webpack://app-mf-webpack/../node_modules/.pnpm/webpack-dev-server@4.15.2_webpack-cli@5.1.4_webpack@5.99.8/node_modules/webpack-dev-server/client/overlay.js?:270:7)
  ERROR
  Loading script failed.
  (missing: http://localhost:4050/remoteEntry.js)
  while loading "." from webpack/container/reference/provider
  ScriptExternalLoadError
      at webpack/container/reference/provider (http://localhost:4090/main.js:377:25)
      at __webpack_require__ (http://localhost:4090/main.js:417:32)
      at initExternal (http://localhost:4090/main.js:703:28)
      at __webpack_require__.I (http://localhost:4090/main.js:716:15)
      at http://localhost:4090/main.js:1213:47
      at webpack/sharing/consume/default/react/react (http://localhost:4090/main.js:1264:67)
      at __webpack_require__.m.<computed> (http://localhost:4090/main.js:1273:54)
      at __webpack_require__ (http://localhost:4090/main.js:417:32)
      at fn (http://localhost:4090/main.js:787:21)
      at eval (webpack://app-mf-webpack/./src/index.tsx?:2:63)
  ERROR
  Loading script failed.
  (missing: http://localhost:4050/remoteEntry.js)
  while loading "." from webpack/container/reference/provider
  ScriptExternalLoadError
      at webpack/container/reference/provider (http://localhost:4090/main.js:377:25)
      at __webpack_require__ (http://localhost:4090/main.js:417:32)
      at initExternal (http://localhost:4090/main.js:703:28)
      at __webpack_require__.I (http://localhost:4090/main.js:716:15)
      at http://localhost:4090/main.js:1213:47
      at webpack/sharing/consume/default/react/react (http://localhost:4090/main.js:1264:67)
      at __webpack_require__.m.<computed> (http://localhost:4090/main.js:1273:54)
      at __webpack_require__ (http://localhost:4090/main.js:417:32)
      at fn (http://localhost:4090/main.js:787:21)
      at eval (webpack://app-mf-webpack/./src/index.tsx?:2:63)
  ERROR
  Loading script failed.
  (missing: http://localhost:4050/remoteEntry.js)
  while loading "." from webpack/container/reference/provider
  ScriptExternalLoadError
      at webpack/container/reference/provider (http://localhost:4090/main.js:377:25)
      at __webpack_require__ (http://localhost:4090/main.js:417:32)
      at initExternal (http://localhost:4090/main.js:703:28)
      at __webpack_require__.I (http://localhost:4090/main.js:716:15)
      at http://localhost:4090/main.js:1213:47
      at webpack/sharing/consume/default/react/react (http://localhost:4090/main.js:1264:67)
      at __webpack_require__.m.<computed> (http://localhost:4090/main.js:1273:54)
      at __webpack_require__ (http://localhost:4090/main.js:417:32)
      at fn (http://localhost:4090/main.js:787:21)
      at eval (webpack://app-mf-webpack/./src/index.tsx?:2:63)
  ```
  

### lib-mf-rsbuild
基于 `rsbuild` 的模块联邦项目

#### 运行命令
```bash
pnpm run dev
```

#### 基本信息
1. 基于 rsbuild 创建的模块联邦远程模块项目
2. 使用插件 `@module-federation/rsbuild-plugin` 构建
3. 运行端口 `4070`

#### 导出模块
模块名称：`rsbuild_mf_components`

1. 协议：http://localhost:4070/mf-manifest.json
2. 脚本：http://localhost:4070/remoteEntry.js

### lib-mf-rslib

#### 运行命令
实时编译：
```bash
pnpm run dev
```

运行预览服务器，暴露远程模块（运行模块联邦）：
```bash
pnpm run mf-dev
```

#### 基本信息
1. 基于 rsbuild 创建的模块联邦远程模块项目
2. 使用插件 `@module-federation/rsbuild-plugin` 构建
3. 运行端口 4000

#### 导出模块
模块名称：`mf_provider`

1. 协议：http://localhost:4000/mf-manifest.json
2. 脚本：http://localhost:4000/mf_provider.js

### lib-mf-vite
使用 vite 构建的模块联邦应用

#### 运行命令
运行预览，并暴露模块联邦：
```bash
pnpm run dev
```

#### 基本信息
1. 基于 vitejs 创建的模块联邦远程模块项目
2. 使用插件 `@module-federation/vite` 构建
3. 开发服务器运行端口 4050
4. 预览服务器运行端口 4060

#### 导出模块
模块名称：`vite_mf_components`

1. 协议：http://localhost:4050/mf-manifest.json
2. 脚本：http://localhost:4050/remoteEntry.js

### lib-mf-webpack
基于 webpack 构建的模块联邦

#### 运行预览
```bash
pnpm run start
```

#### 基本信息
1. 基于 webpack 创建的模块联邦远程模块项目
2. 使用插件 webpack 内置模块联邦插件 `webpack/container/ModuleFederationPlugin` 构建
3. 预览服务器运行端口 4080

#### 导出模块
模块名称：`remote_mf_webpack`     

子包: app

1. 脚本：http://localhost:4080/remoteEntry.js





