---
title: "在 Typography 主题尝试使用 Noto Color Emoji"
date: 2022-10-04 19:03:44
updated: 2022-10-04 19:40:00
tags:
desc: "有一说一，比微软家的自带的 Emoji 好看一些"
---

麻烦，不想写开头了，直接进入主题得了

虽说咱觉得谷歌家的 Noto Color Emoji 比微软和苹果的好看多了就是

---

在某猫猫 Moe 的建议下，尝试在 head 里添加以下内容

````html
<link href="https://fonts.googleapis.com/css?family=Noto%20Color%20Emoji&display=swap" rel="stylesheet" data-optimized-fonts="true">
````

结果等咱兴高采烈地打开，然后发现，用的还是默认的微软家的 Emoji（这里没截图，因为实在没什么好截图的）

挺奇怪的，[Moe 的友链](https://moe23333.vercel.app)页面也是用相同的办法，怎么她的可以咱的不行

怪

---

link 方式行不通，咱就去主题文件夹里翻翻找找了

然后就是尝试在 style.scss 里修改成如下内容了

````css
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:100,300,400,600");
@import url("https://fonts.googleapis.com/css?family=Noto%20Color%20Emoji&display=swap");
@import "animation";
````

当然结果还是失败的

---

在修改一番之后算是修改成了，当然还是在 style.scss 里修改

先准备好 Noto Color Emoji 的 ttf 文件并放在主题文件夹下的 /source/fonts 文件夹里（文件自己找，这里懒得给了）

~~当然你想用 woff2 格式的文件也可以，记得下面那修改一下，要不然 404 了就没效果了x~~

在 style.scss 文件开头插入下面的内容

````css
@font-face {
  font-family: 'Noto Color Emoji';
  src: url('/fonts/NotoColorEmoji.ttf');
}
````

然后再修改 `$fontList` 和 `$titleFontList` ，就像这样

````css
$fontList: "Source Sans Pro", "Roboto", "Helvetica", "Helvetica Neue",
  "Source Han Sans SC", "Source Han Sans TC", "PingFang SC", "PingFang HK",
  "PingFang TC", "Noto Color Emoji", sans-serif !default;
$titleFontList: "HiraMinProN-W6", "Source Han Serif CN", "Source Han Serif SC",
  "Source Han Serif TC", "Noto Color Emoji", serif !default;
````

这样就能算是完美的使用了谷歌家的 Noto Color Emoji 了

~~要是把 `"Noto Color Emoji"` 调到字体列表最前面（大概也就是在冒号加空格后面的位置吧）的话，就会造成字符之间的间距过大的问题，所以这里是调整到稍后的位置，既能确保原先主题使用的字体正常显示，也能保证 Emoji 完整显示~~

---

文章的最后也放几个 Emoji 测试一下显示效果

🌌🍥😊🤣❤️🥰😶‍🌫️🙄🤤😇
