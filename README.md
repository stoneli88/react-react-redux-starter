# HeMiao Shopping Guider System.

禾苗商城导购系统，基于 React、Redux、Amaze UI Touch、React Router 及 Webpack 开发 SPA。

## 目录结构

项目文件放在 `app` 目录下：

```
.app
├── humans.txt
├── imgs              // 图片
├── index.html        // 入口 HTML
├── js                // JS
├── style             // 样式文件（编译任务中设置的是Sass，可以自行改用其他）
├── manifest.json
├── manifest.webapp
└── robots.txt
```

## 使用说明

### 环境配置

- 安装 [Node.js](https://nodejs.org/en/download/)
- 模块编译环境配置：[点击查看](https://github.com/nodejs/node-gyp#installation)

### 安装开发依赖

1. 克隆或下载本项目代码；
2. 进入项目目录，执行 `npm install`；

### 开发

```
npm start
```

### 构建生产环境版本

```
npm run build
```

如果想测试生产环境版本，可以执行以下命令构建并启动本地 HTTP 服务器预览：

```
npm run preview
```
