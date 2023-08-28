---
title: 通过 UUP 手动制作 msu 更新包并更新 Windows
date: 2023-08-28 15:43:23
updated: 2023-08-29 03:16:56
tags: Windows
categories: 记录
description: 我知道你很急，但你先别急着冲最新最热 Beta
---

这几天微软发布了 Windows 11 Insider Preview Build 22621.2262 / 22631.2262，总算是是把桌面图标空白和任务栏图标错位的问题解决好了

but 无论怎么检查更新，它就是不吐新版本，这给千畔急的啊

~~其实倒也正差，毕竟才发布更新没几天而已~~

于是就想到了用 UUP 来生成个 iso 并且手动升级，但似乎不知道哪个步骤出错了，就...

{% image /static/blog/use-uup-update-beta-system/photo_2023-08-27_23-52-42.jpg 完了，好像倒着升到正式版了 fancybox:true width:350px %}

当然后面有个热心群友提供了他自己打包的更新包（是 [msu](https://support.microsoft.com/zh-cn/topic/windows-%E4%B8%ADwindows-%E6%9B%B4%E6%96%B0%E7%8B%AC%E7%AB%8B%E5%AE%89%E8%A3%85%E7%A8%8B%E5%BA%8F%E7%9A%84%E8%AF%B4%E6%98%8E-799ba3df-ec7e-b05e-ee13-1cdae8f23b19)，但只能通过 [DISM](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/what-is-dism?view=windows-11) 安装），就好奇这东西是怎么制作出来的

当然经过摸索，大概知道了流程是这样的

---

## 下载 UUP 集

我们可以在 https://uup.rg-adguard.net/ 或者 https://www.uupdump.cn/ 中下载到 “下载 UUP 集的下载包”

~~说人话就是 UUP 下载脚本~~

~~当然至于为什么没列举其他有可能的 UUP 下载站，那是因为咱就找到了这两个（~~

~~至于怎么下载不用咱说了吧（~~

假设咱下的是 22631.2262 这个版本的 UUP 包，那么下载完之后应当会有以下文件：

 - 具有相同名字的 cab 文件和 psf 文件，例如 `Windows11.0-KB5029339-x64.cab` 和 `Windows11.0-KB5029339-x64.psf`
 - 以 `.AggregatedMetadata.cab` 为结尾的 cab 文件
 - `DesktopDeployment.cab` 或者以 `SSU` 为开头的 cab 文件

## 开始制作

在开始制作之前，下载工具是必要的

{% link https://github.com/abbodi1406/WHD/tree/master/scripts desc:true %}

↑ 链接在上面，进去后找到 `PSFX_MSU` 字样的 zip 压缩包并下载解压，就会得到~~起码~~一份 bat 文件

~~在写这篇文章的时候咱看着是有三个压缩包，下哪个都行吧...? 这里咱是下 PSFX_MSU_3.zip，如果制作过程中出现什么问题可以尝试换一个来尝试~~

好的那么此时打开你的终端（cmd 也好 PowerShell 也好总之哪个都行），切换到解压出来的那目录

假设咱要打包的是 `KB5029339` ，上一步中下载的 UUP 文件在 `D:\22631.2262_amd64_cab_zh-cn_a71a9e8a_\cabs`

那么命令就大概是这么输的：

```cmd
PSFX2MSU.cmd D:\22631.2262_amd64_cab_zh-cn_a71a9e8a_\cabs
```

~~当然其实你可以直接把 bat 文件复制一份到那下载好的 UUP 所在文件夹，然后双击打开~~

回车后，坐和放宽，不过半小时就制作出来了，此时制作出来的文件名应该是以 `msu` 为结尾，例如 `Windows11.0-KB5029339-x64.msu`

## 安装更新

虽说制作出来的是 [msu](https://support.microsoft.com/zh-cn/topic/windows-%E4%B8%ADwindows-%E6%9B%B4%E6%96%B0%E7%8B%AC%E7%AB%8B%E5%AE%89%E8%A3%85%E7%A8%8B%E5%BA%8F%E7%9A%84%E8%AF%B4%E6%98%8E-799ba3df-ec7e-b05e-ee13-1cdae8f23b19)，但此时双击安装会发现安装失败，~~因为上文已经说过了只能通过 [DISM](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/what-is-dism?view=windows-11) 安装，但咱不知道为什么，总之就是这么写和这么提示的~~

以管理员运行终端，然后输入以下命令：

```powershell
DISM /Online /Add-Package=<这里写刚刚制作好的 msu 包路径>
```

回车后，坐和放宽，不出意外的话应该会安装成功并提示重启，重启就好

---

## 后续：补充一个安装更新的方法？

后面躺床准备睡觉前看了一眼基安，发现可以通过 Dism++ 安装下载好的 UUP 集中的更新包（就是那个 cab）

就是先添加 SSU 开头的那文件，然后再添加那 cab 文件

但鉴于已经更新好了，咱也懒得开虚拟机尝试这种方法的可行性，所以最后还是...算了先简单写下吧下次更新再试试（

总之就这样，that is all.