# GitHub Pages PWA 发布说明

这个项目现在可以作为 PWA 发布到 GitHub Pages。发布后，在 iPhone 或 iPad 的 Safari 中打开 HTTPS 地址，使用分享菜单里的“添加到主屏幕”，即可像 App 一样启动。

## 发布前检查

```bash
npm run pwa:check
```

检查会确认入口页面、manifest、service worker 和图标文件都存在，且关键图标尺寸正确。

## GitHub Pages 设置

1. 将仓库推送到 GitHub。
2. 在仓库的 Settings -> Pages 中选择部署来源。
3. 如果使用根目录发布，选择当前分支和 `/root`。
4. 等待 GitHub Pages 生成 HTTPS 地址。
5. 用 iPhone/iPad Safari 打开该地址，并添加到主屏幕。

## 注意事项

- 聊天接口请求仍走网络，不会被 service worker 缓存。
- API Key 仍存放在本机浏览器存储中，适合自用；公开给别人使用前建议改为后端代理。
- 如果以后 CDN 脚本在移动网络下不稳定，可以再把 marked 和 highlight.js 下载为同源静态文件。
