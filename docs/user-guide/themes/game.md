# Game主题
> 迁移自：[Game主题](https://docs.tangly1024.com/article/notionnext-game)
> 发布日期：2024-3-24
> 最后编辑：2024-11-5
> 原栏目：⭐ 主题参数


## 主题预览

![Game 主题预览](/images/themes-preview/game.webp)

::: tip 提示
年龄大了，只能玩得动一点小游戏。
:::

可以搭建网页小游戏网站的主题。在线预览：[https://games.tangly1024.com/](https://games.tangly1024.com/)。

对应示例数据库，完全开放可复制：

[Game1024 | Notion](https://www.notion.so/tanghh/57b2e3e1ba064b8991262e4daeee053c?v=bc6cf243e114496a982fe3ac5ef21b39&pvs=4)

Play Fee Online Game on Game1024


## 开启方式

更新代码至最新的4.4.1；并配置主题为game即可。

### Game 主题调色

Game 支持通过语义色变量调整页面背景、滚动条和主色：

```js
GAME_COLOR_BG: '#ffffff',
GAME_COLOR_SCROLLBAR: '#4e4e4e',
GAME_COLOR_PRIMARY: '#22c55e'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。


## Game 主题概要

特色：

- 支持在线预览游戏的视频

- 在线游玩

- 显示最近游戏记录

- 将游戏保存到桌面快捷方式（PWA）。


### 1.最近访问

顶栏会记录最近访问的页面，该数据存在浏览器的localstorage中

![Untitled](/legacy/59107f6461251ace.png)


### 2.数据库Ext字段

数据库新增字段ext，用来存放一些扩展的字段功能。

![Untitled](/legacy/8202f6679b2885da.png)

用json-string格式存放game的详细配置（`游戏地址`与`预览视频`）例如以下json：

```CSS
{
    "href": "/games-external/common/index.htm?n=https://unblocked-games.s3.amazonaws.com/games/2023/q/1/tap-tap-shots/index.html",
    "video": "https://videos.crazygames.com/tap-tap-shots/1/tap-tap-shots-494x276.mp4"
}
```

`href`是游戏播放的地址；`video`是鼠标悬停在游戏封面上的预览视频。


### 3.游戏内嵌功能

`href`默认填写外部地址，例如 “`https://unblocked-games.s3.amazonaws.com/games/2023/q/1/tap-tap-shots/index.html`” 就是一个可以直接嵌入的在线游戏地址。

为什么我的示例数据库中href是 **`/games-external/common/index.htm?n=`**`https://unblocked-games.s3.amazonaws.com/games/2023/q/1/tap-tap-shots/index.html` 这个格式呢？

`/games-external/common/index.htm?n=` 这一串代表什么？


### games-external 组件

我在项目的 `/public/games-external/common/index.htm` 中加入了一个**装饰脚本页面**，

访问此页面时加载路径中的` ``**?n=[外部域名]**`  会被当做一个iframe嵌入到页面中。通过装饰脚本页面的方式引入外部链接，可以方便后续**扩展做一些定制化**与**检测的功能**。

直接访问** [站点]/games-external/common/index.htm?n=[一个域名] **，可以直接将一个外部网址当做iframe嵌入到项目。例如 [https://games.tangly1024.com/games-external/common/index.htm?n=https://www.tangly1024.com](https://games.tangly1024.com/games-external/common/index.htm?n=https://www.tangly1024.com)  ，就是将 www.tangly1024.com这个网页当做iframe嵌入。

目前该脚本页面的唯一功能是：向嵌入的iframe添加了一个toggleFullscreen() 函数，便于我在NotionNext的文章详情页可以直接调用iframe的全屏功能:

![Untitled](/legacy/c1149e45272be5ae.png)

详情可以在源码中找到。

<details>
<summary>嵌入iframe相关源码</summary>

```HTML
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="robots" content="noindex, nofollow"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Full Screen iFrame&lt;/title&gt;
    &lt;style&gt;
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        #myIframe {
            width: 100%;
            height: 100%;
            border: none;
            /* 可选：移除边框 */
        }
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;!-- &lt;div style="position: absolute;
    right: 0px;
    bottom: 0px;
    background: white;"&gt;
        &lt;button onclick="toggleFullScreen()"&gt;Toggle Full Screen&lt;/button&gt;
    &lt;/div&gt; --&gt;

    &lt;iframe id="myIframe" allowfullscreen="allowfullscreen" allow="autoplay" scrolling="no"&gt;&lt;/iframe&gt;

    &lt;!-- https://letsplay247.github.io/cz.html?n=space-wars-battleground --&gt;
    &lt;script&gt;
        var myParam = location.search.split('n=')[1]
        document.getElementById("myIframe").src = myParam;
    &lt;/script&gt;
    &lt;script src="/js/fullscreen.js" type="text/javascript"&gt;&lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;
```
```JavaScript
window.toggleFullScreen = toggleFullScreen
function toggleFullScreen() {
  var iframe = document.getElementById('myIframe')

  if (!document.fullscreenElement) {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen()
    } else if (iframe.mozRequestFullScreen) {
      /* Firefox */
      iframe.mozRequestFullScreen()
    } else if (iframe.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      iframe.webkitRequestFullscreen()
    } else if (iframe.msRequestFullscreen) {
      /* IE/Edge */
      iframe.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen()
    }
  }
}
```

</details>


### 4. 支持保存到桌面快捷方式

采用渐进式WEB应用，PWA的方式，点击浏览器地址栏右侧的安装按钮，即可添加到桌面快捷方式，一键启动。

![Untitled](/legacy/0b7323090b528b9e.png)
![Untitled](/legacy/d76e9213034d9b85.png)


## 关于游戏


### 游戏来源

游戏主要来源于 crazygames , poki ,  gameis 和 iogames、regtrogames.cc 这些网站，更多游戏网站可以通过similarweb查找对标。


### 游戏推荐

- [拳皇97（风云再起）](https://games.tangly1024.com/game/the-king-of-fighters-97-plus-bootleg)
引入了retrogames的模拟器游戏，有趣的是支持创建房间、支持存档、联网对战,可以在游戏中设置键位，以及创建房间。
![Untitled](/legacy/4a4b86b33c1ea485.png)
![Untitled](/legacy/dbbdb7f4bba0b316.png)

- [Block Post](https://games.tangly1024.com/game/block-post)
一款像素风射击游戏。玩法丰富：炸弹模式、武器模式、团队死斗模式；体验流畅：游戏打开速度快、单局节奏快、对电脑配置要求低，对战的网速也不错。和CSGO这款老牌反恐枪战游戏有很多神似：peek闪身、预瞄、搜点、提前枪、爆头线、手雷道具、压枪、开箱子、各种皮肤武器在这里都能体验，老少皆宜。
![Untitled](/legacy/7a108c101b89957a.png)
![游戏中的开箱子画面](/legacy/c22a784c6c8ed702.png)

## 原文链接

https://docs.tangly1024.com/article/notionnext-game
