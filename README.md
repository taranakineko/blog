# blog

A new blog, yet?

[![Netlify Status](https://api.netlify.com/api/v1/badges/e82e01eb-23dd-49f3-8db3-f6b33f4e6c30/deploy-status)](https://app.netlify.com/sites/clinquant-baklava-b59292/deploys)

---

## 开始

安装依赖

```
npm install
```

一键本地调试（生成运行一条龙）

```
npm run test
```

---

## 修改地方记录

主题 / source / css / _custom.styl

```styl
@import ('https://fastly.jsdelivr.net/npm/inter-ui@3.19.3/inter.min.css')

$ff-body = 'Inter var', 'Noto Color Emoji', $font-face, sans-serif, sans
```

主题 / layout / components / head.jsx

```jsx
<meta name="theme-color" content="#f3f3f3"/>
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#202020" />
```

主题 / layout / components / scripts.jsx

```jsx
<script async defer data-website-id="80e637e6-9cdd-4675-a19d-519785bdb3a8" src="https://umami.nekoq.eu.org/script.js" data-do-not-track="true" data-domains="taranakineko.pages.dev,nekoq.eu.org"></script>
```

---
## blog 主题色

默认（蓝色调）

```yaml
style:
  color:
    common:
      accent: '#ff5722' # 强调色
      button: '#0078d4' # 按钮颜色
      hover: '#0078d4' # 按钮高亮颜色
    light:
      mix: '#eff4f9' # 浅色背景颜色
      block: '#EEF0F2' # 块背景颜色
      card: '#fafbfd' # 卡片背景颜色
    dark:
      mix: '#313438' # 深色背景颜色
      card: '#282a39' # 卡片背景颜色
```

春天（绿色调）

```yaml
style:
  color:
    common:
      accent: '#00cc6a' # 强调色
      button: '#00cc6a' # 按钮颜色
      hover: '#00cc6a' # 按钮高亮颜色
    light:
      theme: '#00cc6a' #主体颜色
      background: '#f3f3f3 radial-gradient(#F5FFF8 75%, #f3f3f3 100%) no-repeat fixed' # 背景颜色
      mix: '#F5FFF8' # 浅色背景颜色
    dark:
      theme: '#00cc6a'
      mix: '#1a3526' #'#313438' # 深色背景颜色
      background: '#202020 radial-gradient(#1a3526 25%, #202020 100%) no-repeat fixed' # 背景颜色
      card: '#30453c' # 卡片背景颜色



```

秋天（橙色调）

```yaml
style:
  color:
    common:
      accent: '#ff8c00' # 强调色
      button: '#ff8c00' # 按钮颜色
      hover: '#ff8c00' # 按钮高亮颜色
    light:
      theme: '#ff8c00' # 主体颜色
      background: '#f3f3f3 radial-gradient(#f9f6ef 75%, #f3f3f3 100%) no-repeat fixed' # 网页背景颜色
      mix: '#f9f6ef' # 浅色背景颜色
    dark:
      theme: '#ff8c00' # 主体颜色
      mix: '#35341a' #'#313438' # 深色背景颜色
      background: '#202020 radial-gradient(#35341a 25%, #202020 100%) no-repeat fixed' # 网页背景颜色
      card: '#454330' # 卡片背景颜色
```

冬天（灰色调）

```yaml
style:
  darkmode: auto # auto / always / false
  color:
    common:
      accent: '#AEC9D0' # 强调色
      button: '#AEC9D0' # 按钮颜色
      hover: '#AEC9D0' # 按钮高亮颜色
    light:
      theme: '#AEC9D0' #主体颜色
      background: '#f3f3f3 radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed' # 背景颜色
      mix: '#eff4f9' # 浅色背景颜色
      card: '#fbfbfd' # 卡片背景颜色
    dark:
      theme: '#AEC9D0'
      mix: '#262830' # 深色背景颜色
      background: '#202020 radial-gradient(#262830 25%, #202020 100%) no-repeat fixed' # 背景颜色
      card: '#353535' # 卡片背景颜色
```