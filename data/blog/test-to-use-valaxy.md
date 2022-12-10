---
title: 尝试以 valaxy 框架搭建一个博客
date: '2022-12-10'
tags: []
draft: false
summary: 或许以后会用得上？但现在不知道为什么会报错呢...？（水文章）
images: ['/static/blog/test-to-use-valaxy/cover.png']
layout: PostLayout
canonicalUrl: test-to-use-valaxy
authors: ['default']
draft: true
---

![封面图](/static/blog/test-to-use-valaxy/cover.png)

## 废话前言

在 2022 年中旬的某一天，咱无意间从 [Github@Yunyoujun](https://github.com/YunYouJun) 中发现了一个比较有意思的仓库，[valaxy](https://github.com/YunYouJun/valaxy)

初看仓库的 README.md，觉得还挺有意思（还有热重载喔，这不得爽死），于是就按照文档上的说明在本地调试

不知道是不是因为框架尚且处于稍微简陋的状态，很多设置不知道怎么调，能找到的主题也就默认自带的

在调试了仅仅几小时之后便放弃了，毕竟...算了就止打住，咱可不会有感情的写文章

总之就是放弃之后也希望这个框架也能越来越完善就是x

那至于为什么今天还要再折腾这个呢，因为今天无意间访问到[云游君的小站](https://www.yunyoujun.cn/)时，发现他已经将框架从 Hexo 更改成 valaxy

这对咱来说意味着 valaxy 这个框架似乎已经到了能作为主要的静态博客框架的程度了？

于是就有了这篇文章，即便一开始咱也不知道写什么就是，或许是用来记录在尝试的时候遇到的坑？

---

## 开始

哦天...在开始之前，如果你对 valaxy 这个静态博客框架还不够了解的话，建议去 [Why Valaxy](https://valaxy.site/guide/why) 看看

如果已经了解，那么我们开始吧

按照 [Getting Started](https://valaxy.site/guide/getting-started) 所讲，我们可以在线试用

~~但咱偏不，就要本地！或许就能以此为契机来再迁移博客框架！（）~~

当然，在开始之前...请确保 Node.js 版本在 14.18 版本之后

如何开始？只需要打开命令行，执行以下命令：

````sh
npm init valaxy
````

按照文档里所说，更推荐使用 `pnpm create valaxy`，可使用 `npm i -g pnpm` 安装 pnpm

然后按照引导操作即可

~~有一说一，不用新建文件夹再进行初始化操作，这样就避免了文件夹套娃的问题（）~~

~~但这比在当前目录下进行初始化部署的 Hexo ...可能一开始会用得有点别扭吧，真的~~

初始化、安装组件之后，我们就得到了以下的~~基本~~文件架构：

````
|-- valaxy-blog
    |-- .dockerignore
    |-- .editorconfig
    |-- .gitignore
    |-- .npmrc
    |-- Dockerfile
    |-- netlify.toml
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- valaxy.config.ts
    |-- vercel.json
    |-- .github
    |   |-- workflows
    |       |-- gh-pages.yml
    |-- .vscode
    |   |-- extensions.json
    |   |-- settings.json
    |-- components
    |   |-- README.md
    |-- layouts
    |   |-- README.md
    |-- locales
    |   |-- en.yml
    |   |-- README.md
    |   |-- zh-CN.yml
    |-- pages
    |   |-- about
    |   |   |-- index.md
    |   |   |-- site.md
    |   |-- archives
    |   |   |-- index.md
    |   |-- categories
    |   |   |-- index.md
    |   |-- links
    |   |   |-- index.md
    |   |-- posts
    |   |   |-- hello-valaxy.md
    |   |-- tags
    |       |-- index.md
    |-- public
    |   |-- favicon.svg
    |   |-- pwa-192x192.png
    |   |-- pwa-512x512.png
    |   |-- safari-pinned-tab.svg
    |   |-- _headers
    |-- styles
        |-- css-vars.scss
        |-- index.scss
        |-- README.md
````

其中，`valaxy.config.ts` 用来自定义博客，剩下的可以看 [主要的文件夹](https://valaxy.site/guide/getting-started#%E4%B8%BB%E8%A6%81%E7%9A%84%E6%96%87%E4%BB%B6%E5%A4%B9) 这部分

---

## 配置

这部分是真的没什么好说的...修改文件的时候注意一下缩进换行逗号什么的就好

修改完之后记得保存（

有些配置默认没写在里面的，可以参考 [demo/yun/valaxy.config.ts](https://github.com/YunYouJun/valaxy/blob/main/demo/yun/valaxy.config.ts)、[yunyoujun.github.io/valaxy.config.ts](https://github.com/YunYouJun/yunyoujun.github.io/blob/valaxy/valaxy.config.ts) 这两个来补全开启需要的功能

评论的话好像还得要 import 来着，上面两个参考里都有，照葫芦画应该不会出什么差错的

---

## 本地调试

这个也非常的简单...只需要执行

````sh
npm run dev
# pnpm run dev
````

然后去喝杯水~~，或者眺望远方休息一下眼睛~~，基本上就好了（

终端会输出本地预览地址，一般来说都是 `http://localhost:4859/`

如果有多个网卡的话，下面还会列出相关的 IP 地址和端口号来访问部署

在终端按 `o` 即可打开网页， `r` 重新部署， `e` ... 目前还不知道有什么用

~~umm...怎么说呢...算了还是放图吧 qwq~~

![执行命令后终端显示内容](/static/blog/test-to-use-valaxy/run-dev.png)

访问之后是这样的（

![主界面](/static/blog/test-to-use-valaxy/YL.png)

~~好吧，这次部署就遇到了文章加载不出来的问题~~

~~好吧，解决了，找个默认配置复制粘贴进去就 ao 了~~

~~好吧又出问题了~~

![开发者工具中的简单报错信息](/static/blog/test-to-use-valaxy/error.png)

算了还是转线上测试吧 qwq

![依然还是报错](/static/blog/test-to-use-valaxy/error-again.png)

好吧，看来今天不适合测试.webp

---

## 最后

孩子整麻了，还是选择放弃了，还不如去玩会游戏（）

（打哈欠

只不过有一说一，或许是因为这个框架还在开发阶段，有 Bug 也挺正常

那么最后吧...或许以后可能会再尝试折腾这个框架？

最后的最后，祝这个项目开发顺利

~~ok，水文章+1~~