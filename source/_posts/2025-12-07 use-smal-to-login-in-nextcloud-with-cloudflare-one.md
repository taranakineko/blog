---
title: 使用 SAML 通过 Cloudflare One 登录 Nextcloud
date: 2025-12-07 05:07:50
updated:
tags:
  - CloudFlare
  - NextCloud
categories: 记录
description: 半夜脑子抽风整的
---

也不知道为什么半夜脑子抽风想给 NextCloud 配一个 SSO 登录了，毕竟 CloudFlare One 用了也是用了对吧~~，丢在一边都忘记有这玩意的程度了，还不用我自部署一个服务，缺点就是免费版自定义不了登录界面~~

看了一下 NextCloud 的应用商店，大概有几种方式吧，例如说：

  - OpenID Connect (OIDC)
  - SAML
  - LDAP

Cloudflare One 侧那边的添加 SaaS 应用支持 SAML 和 OIDC，折腾下来最后还是选择 SAML（因为看懂了）

别问为什么要写这篇，问就是(美丽赞扬)的 NextCloud SAML 登录相关内容放在[这里](https://portal.nextcloud.com/article/Authentication/Single-Sign-On-(SSO)/Configuring-Single-Sign-On)了，需要 Nextcloud Enterprise 订阅才能访问

---

## Cloudflare 侧

登录 [Cloudflare One 控制台](https://one.dash.cloudflare.com/)，选择账户后点击 访问控制 -> 创建应用程序 -> SaaS 下的“添加应用程序”

选中 SAML 后输入应用程序名称，输入完毕后点右下角的“添加应用程序”

在接下来的界面里填写这些信息：

| 标题 | 填写内容 |
| --- | --- |
| 实体 ID (Entity ID) | https://nextcloud.example.com/apps/user_saml/saml/metadata |
| 断言使用者服务 URL (Assertion Consumer Service URL) | https://nextcloud.example.com/apps/user_saml/saml/acs |

其他默认，保存后根据下一步的提示自定义内容即可

毕竟没有私钥，稍等在 NextCloud 上配置的时候可以通过 访问控制 -> 应用程序，在刚新建的应用程序里点击右边的三点 -> 编辑 就能看到

{% border 关于应用访问权限一事 color:red %}
默认是没有访问权限，需要自己配置，切记切记

关于这部分内容可阅读 [Access 策略文档](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)

还需要配置标识提供程序集成，具体可阅读 [标识提供程序文档](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/)

写好策略后记得给应用配置访问策略和验证方式~~，别怪我没提醒你~~
{% endborder %}

---

## NextCloud 侧

首先确保 SSO & SAML authentication 应用已经安装，如果没安装可以在右上角头像 -> 应用 -> 精选应用 里通过关键词 `saml` 搜索安装

安装后打开管理设置 -> SSO & SAML 认证，根据以下内容填写：

| 分类 | 标题 | 填写内容（或对应内容） |
| --- | --- | --- |
| 常规 | 映射到 UID 的属性。 | email |
| 身份提供者的数据 | IdP 实体的标识符（必须是URI） | Access 实体 ID 或颁发者 |
| | URL 的目标，其中 SP 将发送验证请求消息 | SSO 终结点 |
| | 公共 X.509 证书的 IdP | 公钥 |

某些选项看不到可以点击 `显示可选的身份提供者设置...` 来展示

一般而言会自动保存，全部输入完毕后，在 User filtering 分类下会显示一个 `元数据有效` 的提示，这时候就可以新开一个隐私窗口或者类似的做登录测试

因为是用 email 做映射，所以在登录的时候确保邮箱是自己在 NextCloud 上绑定的就行（通过第三方登录时一样）

~~要是被提示说没访问权限的话记得看有没有在 Cloudflare 那边配置访问策略~~

---

## 参考文献

[NextCloud SAML Integration](https://help.monofor.com/monosign/nextcloud-saml-integration#NextCloudSAMLIntegration-1-CreatinganApplicationonMonosign)