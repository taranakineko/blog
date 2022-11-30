---
title: 关于从 Hexo 迁移到 Next.js 以及不算连环踩坑的这件事(?)
date: 2022.11.29 03:24:00
summary: '迁移迁到咱原地爆炸！——写在第二次迁移之路时'
tags: ['Hexo', 'Next.js']
images: ['/static/blog/hexo-to-nextjs.png']
draft: false
---

![文章封面图，虽说是自己糊的](/static/blog/hexo-to-nextjs.png)

## 前言

好久不见，甚是想念（什

开门见山，至于咱为什么说要迁移博客框架，主要还是感觉 Hexo 用腻了 ~~，或者这样说吧，纯属无聊~~

~~加上羡慕某猫猫的博客有图片优化和本地预览热更新（好吧 Hexo 有，但...不好说）~~

于是在某猫猫的推荐（甚至都不算推荐，而是随口一提）下...

于是就决定尝试迁移，主题（应该是这么称呼吧？）使用的则是 [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)

~~现在编写这一篇文章的时候已经北京时间 3 点多了，还是第二次尝试迁移，问就是从 18 点多整到 23 点人整炸了，于是 give up~~

~~至于为什么是第二次，是因为第一次失败之后也尝试了其他的，结果要不不太好看，要不调试的时候这样报错那样报错（叹气~~

---

## 如何迁移？

咱博客文件是托管在 Github 上，使用 Git 进行版本控制

所以最初打算就是 新建分支->迁移文章和配置->调试->提交->合并

~~当然实际上，就现在来说，是新开了个文件夹然后按照 README.md 的操作方法初始化完毕的，然后再新建分支并拷贝然后再继续的~~

虽说这次的迁移对象和目标，文章都有使用 Markdown 来完成编写，也就方便了许多

但是但是，坑还是有的，不止一个，对咱来说

---

## 踩坑记录以及解决方案

这里记录的是迁移过程中遇到的奇奇怪怪的问题以及部分探索出来的解决方案，希望对你来说有用

### Html 注释渲染报错

当咱把文章拷贝进去并按照要求修改好 Front-matter 内容后，本以为就完了

But，点进去文章一看，Error

查看控制台，输出如下

```shell
 > _mdx_bundler_entry_point-69f21335-281c-44cc-b042-69486d439282.mdx:45:1: error: [plugin: esbuild-xdm] Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)
    45 │ <!-- 自适应代码来源：https://ray233.pages.dev/webpage-embed-auto-size-iframe-video/
       ╵  ^

wait  - compiling /_error (client and server)...
event - compiled client and server successfully in 177 ms (420 modules)
error - Error: Build failed with 1 error:
_mdx_bundler_entry_point-69f21335-281c-44cc-b042-69486d439282.mdx:45:1: error: [plugin: esbuild-xdm] Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)
```

当然，解决方案也非常简单，就是使用 `{/* 注释内容 */}` 代替 `<!-- 注释内容 -->` 即可

~~就是 Ctrl+H 的事~~

### 文章内 \<style> 失效问题

在[Twitter 与 Mastodon 之间的比较](twitter-and-mastodon/index)中，咱引用了 iframe 来展示表格列表

但是默认插入后只有很小一片，于是就在网络上找到了一段适应代码并抄进去，像下面这样

```html
<style type="text/css">
  .iframe-container {
    /* 
  padding-top 为高/宽的值
  16:9 为 9/16=56.25%
  */
    padding-top: 56.25%;
    position: relative;
  }
  .iframe-container iframe {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
</style>
<!-- 自适应代码来源：https://ray233.pages.dev/webpage-embed-auto-size-iframe-video/ 
谢谢！
-->
<div class="iframe-container">
  <iframe
    src="https://onedrive.live.com/embed?cid=4A8148EC7FFBF4D4&resid=4A8148EC7FFBF4D4%215734&authkey=AMfo7VhuO2qliQ0&em=2"
  ></iframe>
</div>
```

在迁移到 Next.js 架构的时候，会遇到下面的报错

```shell
 > _mdx_bundler_entry_point-ad4ebb27-776b-4ec8-9b87-2f5741a7cd6e.mdx:29:19: error: [plugin: esbuild-xdm] Could not parse expression with acorn: Unexpected content after expression
    29 │ .iframe-container {
       ╵                    ^

error - Error: Build failed with 1 error:
_mdx_bundler_entry_point-ad4ebb27-776b-4ec8-9b87-2f5741a7cd6e.mdx:29:91: error: [plugin: esbuild-xdm] Could not parse expression with acorn: Unexpected content after expression
```

~~当然，第一次迁移的时候就是因为这个问题把自己修炸了就放弃适应代码了~~

解决方法也很简单，去掉原有的呗，然后一个元素一个元素对应重写

记得把原有的 class 删去，要不然会报 `Warning: Invalid DOM property 'class'. Did you mean 'className'?` 提示了

修改后的代码如下

```jsx
<div style={{ paddingTop: '56.25%', position: 'relative' }}>
  <iframe
    src="https://onedrive.live.com/embed?cid=4A8148EC7FFBF4D4&resid=4A8148EC7FFBF4D4%215734&authkey=AMfo7VhuO2qliQ0&em=2"
    style={{ position: 'absolute', height: '100%', width: '100%', top: '0', left: '0' }}
  />
</div>
```

## 引用的 imframe 白屏不加载问题

~~这个说实话，现在还没来得及解决，后面再补充吧呜呜呜~~

~~况且不知道提交上去之后有没有用就是了...嗯~~

~~本地预览没有 https，iframe 加载的是 https 内容，使用 https 的内容拒绝了使用 http 加载的网页请求这个资源~~

~~解决方案只有个，上 https ！~~

后面查了一下，由于使用的模板启用了[内容安全策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

所以我们只需要在 `next.config.js` 中配置相关设置即可，见 [Embedding videos \#116](https://github.com/timlrx/tailwind-nextjs-starter-blog/discussions/116)

咱是这样设置的

```js
const ContentSecurityPolicy = `
  (此处略过)
  frame-src giscus.app onedrive.live.com
`
```

### 自定义页不生成

这个倒是咱在迁移 Links 页时最头疼的问题了，死活不生成

最后还是选择去看看使用的实例有没有公开源代码，顺便抄一下作业就 ao 了

~~感谢 https://www.einargudni.com/ 的持有者 Einar Guðni Guðjónsson 叔叔公开仓库~~

不用感谢了，因为后面是照着 About 页写 ~~(删)~~ 出来的的

**请注意，以下代码仅适用于以 [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 为模板所构建的博客**

```js
// page/links.js
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PostSimple' // 这里按照自己喜欢修改成其他的，对应 layouts 文件夹内的文件名称

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('', ['links'])
  // '' 内是路径，['']是文件名
  // 咱的 links 页是放在 data/links.mdx（相当于 links/），所以才会这样写
  return { props: { authorDetails } }
}

export default function links({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
```

### RSS 不输出文章内容

说真，这个实在想不出来怎么修复

抱歉了 ​( ´\_ゝ｀)

孩子已经整疯了啊啊啊啊啊啊啊啊啊，没技术力啊啊啊啊啊啊啊啊

### 添加其他社交链接

咱使用的默认只有 email github twitter 等几个常见的，虽说可以手动添加

除了在 README.md 中提到的步骤之外，还有这两个地方

```js
// layouts/AuthorLayout.js
(此处略过)
<SocialIcon kind="linkedin" href={linkedin} />
<SocialIcon kind="twitter" href={twitter} />
<SocialIcon kind="mastodon" href={mastodon} />
```

```js
// components/Footer.js
(此处略过)
<SocialIcon kind="github" href={siteMetadata.github} size="6" />
<SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
<SocialIcon kind="mastodon" href={siteMetadata.mastodon} size="6" />
```

完成.webp

~~这么简单的问题竟然还折腾了咱差不多一个小时~~

---

## 结束

当咱写完发现的最后一个问题时，已经是东京时间 07:26 了

然后咱也不知道该说什么了，只知道一件事

奶奶顺带说了咱通宵熬夜（噗

虽说咱还得上网课就是，那就不睡觉啦！好欸！

（）

~~后面尝试像某猫猫插入图片后疯狂报错，刚刚(北京时间 10:27)几分钟前翻阅了一下文档，直接按照默认的插入即可...~~

嘛，当然，Logo 可能会考虑自己做的，但也有可能咕咕咕咕咕咕就是）

好啦，写到最后，希望这篇文章能给屏幕前的你有所帮助

最后，Thank to read! See you next time!

~~哦天，咱还没配置完呜呜呜~~

---

## 能不能再给咱说一次后话（

虽说迁移是迁移了，过程...还好吧？

哦不对，不是还好，本来说已经迁移好了就没事了对吧

但是呢，第二天就去尝试作死魔改了，直到现在为止也就才实现了部分页面自定义和深浅切换动画什么的（

~~两个字，简陋~~

中途还因为操作失误导致存魔改工程的文件夹大大滴被破坏了（

就...可能以后还会选择继续折腾吧，或者说早点搬家去其他地方（）

~~目前： Github + Next.JS + [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) + Netlify~~

但有一说一，因为连续熬夜魔改导致这几天早上被班主任微信电话提醒几次了（）

~~因为熬夜完之后就睡觉去了，结果一睡睡过头了 2333~~

~~所以咱在说什么胡话呢，有谁知道？~~

~~然后咱就没话可说了~~

所以，最后的最后，现在是 2022 年 12 月 1 日 0:30

再次 see you next time!

祝大家晚安，好梦

~~欸？已经 12 月了？~~

---

## 参考资料：

- [MDX 中文文档](https://www.mdxjs.cn/)
- [Front-matter | Hexo](https://hexo.io/zh-cn/docs/front-matter)
- [Embedding videos \#116](https://github.com/timlrx/tailwind-nextjs-starter-blog/discussions/116)
- Microsoft Edge DevTools
