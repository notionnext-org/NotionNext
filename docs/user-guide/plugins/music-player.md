# 音乐播放器
> 迁移自：[音乐播放器](https://docs.tangly1024.com/article/notion-next-plugin-music-player)
> 发布日期：2023-8-4
> 最后编辑：2026-11-9
> 原栏目：🧷 外部扩展

## 开启方式

后台添加环境变量 `NEXT_PUBLIC_MUSIC_PLAYER`  值为 `true`，即可打开音乐播放器功能。

更多关于播放器配置说明，可以参考APlayer官网

[APlayer](https://aplayer.js.org/)

```JavaScript
// 音乐播放插件
  MUSIC_PLAYER: process.env.NEXT_PUBLIC_MUSIC_PLAYER || false, // 是否使用音乐播放插件
  MUSIC_PLAYER_VISIBLE: process.env.NEXT_PUBLIC_MUSIC_PLAYER_VISIBLE || true, // 是否在左下角显示播放和切换，如果使用播放器，打开自动播放再隐藏，就会以类似背景音乐的方式播放，无法取消和暂停
  MUSIC_PLAYER_AUTO_PLAY: process.env.NEXT_PUBLIC_MUSIC_PLAYER_AUTO_PLAY || true, // 是否自动播放，不过自动播放时常不生效（移动设备不支持自动播放）
  MUSIC_PLAYER_SHOW_LRC: process.env.NEXT_PUBLIC_MUSIC_PLAYER_SHOW_LRC || false, // 是否展示歌词（前提是有配置歌词路径，对 meting 无效）
  MUSIC_PLAYER_CDN_URL: process.env.NEXT_PUBLIC_MUSIC_PLAYER_CDN_URL || 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.js',
  MUSIC_PLAYER_ORDER: 'list', // 默认播放方式，顺序 list，随机 random
  MUSIC_PLAYER_AUDIO_LIST: [ // 示例音乐列表。除了以下配置外，还可配置歌词，具体配置项看此文档 https://aplayer.js.org/#/zh-Hans/
    {
      name: '风を共に舞う気持ち',
      artist: 'Falcom Sound Team jdk',
      url: 'https://music.163.com/song/media/outer/url?id=731419.mp3',
      cover: 'https://p2.music.126.net/kn6ugISTonvqJh3LHLaPtQ==/599233837187278.jpg'
    },
    {
      name: '王都グランセル',
      artist: 'Falcom Sound Team jdk',
      url: 'https://music.163.com/song/media/outer/url?id=731355.mp3',
      cover: 'https://p1.music.126.net/kn6ugISTonvqJh3LHLaPtQ==/599233837187278.jpg'
    }
  ],
  MUSIC_PLAYER_METING: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING || false, // 是否要开启 MetingJS，从平台获取歌单。会覆盖自定义的 MUSIC_PLAYER_AUDIO_LIST，更多配置信息：https://github.com/metowolf/MetingJS
  MUSIC_PLAYER_METING_SERVER: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_SERVER || 'netease', // 音乐平台，[netease, tencent, kugou, xiami, baidu]
  MUSIC_PLAYER_METING_ID: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_ID || '60198', // 对应歌单的 id
  MUSIC_PLAYER_METING_LRC_TYPE: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_LRC_TYPE || '1', // 可选值： 3 | 1 | 0（0：禁用 lrc 歌词，1：lrc 格式的字符串，3：lrc 文件 url）
```

## 自定义 Meting API 地址

MetingJS 默认使用 `https://api.i-meto.com/meting/api` 获取歌单和歌曲播放地址。如果默认服务无法访问，或希望使用其他兼容服务，可以通过环境变量指定自定义 API 地址，无需修改 `components/Player.js`。

在 Vercel、Cloudflare Pages 等部署平台的环境变量设置中添加：

```dotenv
NEXT_PUBLIC_MUSIC_PLAYER_METING_API=https://your-meting-api.example.com/meting/api?server=:server&type=:type&id=:id&r=:r
```

配置要求：

- 地址需要兼容 [MetingJS API](https://github.com/metowolf/MetingJS) 的请求格式，并支持 `server`、`type`、`id`、`r` 等参数占位符。
- 自定义 API 服务需要允许博客域名跨域访问（CORS），否则浏览器无法请求接口。
- 未设置该环境变量时，继续使用默认的 i-meto 地址，不影响现有配置。
- `NEXT_PUBLIC_` 环境变量会在构建时写入前端资源；修改后需要重新部署站点。
- 如果自定义服务需要鉴权，请注意该变量会暴露给浏览器，不要在其中放置需要保密的密钥。

## 原文链接

https://docs.tangly1024.com/article/notion-next-plugin-music-player
