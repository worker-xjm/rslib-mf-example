# Module Federation 实验仓库

## 📁 目录说明

### 应用项目
- **app-mf-cra**: 由 `npx create-react-app my-app` 产生的基础项目，并执行 `pnpm eject` 的结果，项目从未测试
- **app-mf-rsbuild**: 由[Module Federation 快速上手](https://module-federation.io/zh/guide/start/quick-start.html)产生，具体执行以下命令，并选择 application 时产生
  ```bash
  pnpm create module-federation@latest
  ```
- **app-mf-rspack**: 根据 [rspack 文档](https://rspack.dev/zh/guide/start/quick-start#%E4%BD%BF%E7%94%A8-rspack-cli) 产生，从未使用/测试
- **app-mf-vite**: 由 `pnpm create viet` 产生基本项目，并根据[Module Federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html)结合`git@github.com:gioboa/react-microfrontend-demo.git`/`git@github.com:module-federation/module-federation-examples.git` 产生
- **app-mf-webpack**: 由 AI 生成，可以运行，结合 [module-federation-plugin](https://webpack.docschina.org/plugins/module-federation-plugin/) 文档产生

### 库项目
- **lib-mf-rsbuild**: 根据[rsbuild 快速上手](https://rsbuild.dev/zh/guide/start/quick-start)，并[手动搭建](https://module-federation.io/zh/guide/basic/rsbuild.html)的 Module Federation 项目
- **lib-mf-rslib**: 由[Module Federation 快速上手](https://module-federation.io/zh/guide/start/quick-start.html)以下命令，并选择`lib`时产生
- **lib-mf-vite**: 由 `pnpm create viet` 产生基本项目，并根据[Module Federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html)结合 [module-federation vite plugin](https://module-federation.io/zh/guide/basic/vite.html) 产生
- **lib-mf-webpack**: 由 AI 生成，可以运行，结合 [module-federation-plugin](https://webpack.docschina.org/plugins/module-federation-plugin/) 文档产生，但其产生的 mf 不能被其他项目使用

## ⚠️ 严重 Bug

1. 由 `pnpm create module-federation@latest` 命令产生的 初始项目 依赖相互之间不匹配, 导致 命令创建的项目不能直接使用, 除非 全量 `update` 一次
2. remote/expose 的配置 key 不能包含 `-`，否则在基于rspack的项目自动打包时会报错并无法成功构建,就算构建成功可能也无法在引用端正常使用

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
- ❌ 使用 `rslib` `remoteEntry.js`(4000端口) 远程文件报错
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
- ✅ 使用 `rsbuild` `remoteEntry.js` (4070端口) 远程文件正常使用
- ❌ 使用 `webpack` `remoteEntry.js` (4080端口) 远程文件报错
  ```text
  remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
  container_entry:12  Uncaught (in promise) Error: Module "." does not exist in container.
  while loading "." from webpack/container/reference/provider
  ```

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
- ✅ 对 rsbuild mf-manifest (4070端口) 协议正常使用
- ✅ 对 rslib mf_provider.js (4000端口) 远程文件正常使用
- ✅ 对 rsbuild remoteEntry.js (4070) 远程文件正常使用
- ❌ 对 vite mf-manifest (4050) 协议无法解析
- ❌ 对 vite remoteEntry.js (4050) 报错
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
  ```
- ❌ 使用 webpack remoteEntry.js (4080) 远程文件报错
  ```text
  remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
  container_entry:12  Uncaught Error: Module "." does not exist in container.
  ```

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
- ❌ webpack remoteEntry.js 报错
  ```text
  VM235 index.js:485 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  VM228 log.js:39 [HMR] Waiting for update signal from WDS...
  remoteEntry.js:163 [webpack-dev-server] Server started: Hot Module Replacement enabled, Live Reloading enabled, Progress disabled, Overlay enabled.
  remoteEntry.js:326 [HMR] Waiting for update signal from WDS...
  container_entry:12  Uncaught (in promise) Error: Module "." does not exist in container.
  while loading "." from webpack/container/reference/provider
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
模块名称：`mf_webpack`

1. 脚本：http://localhost:4080/remoteEntry.js

