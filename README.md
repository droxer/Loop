# Loop · AI 学习闭环

基于 Expo Router + React Native + TypeScript 的多端应用。当前仓库处于初始化阶段，核心目标是实现“错题记录 → 弱点分析 → 个性化复习”的学习闭环。

## 快速开始

1. 安装依赖（需 Node.js 18+）：
   ```bash
   npm install
   ```
2. 启动 Expo 开发服务器：
   ```bash
   npm run start
   ```
3. 使用 Expo Go、iOS/Android 模拟器或 Web 浏览器预览应用。

> 由于当前环境无法联网安装依赖，以上命令需在本地拥有可用网络时执行。

## 环境变量

在根目录创建 `.env` 文件（或通过 shell 注入），提供 Supabase 连接信息：

```
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 路线图

- [x] 初始化 Expo Router 项目结构
- [x] 构建共享主题/状态层
- [x] 完成“错题记录” MVP（本地存储版）
- [ ] 接入 Supabase 实现云端同步
- [ ] 引入弱点分析与复习任务推荐

## 目录结构

```
app/                # Expo Router 路由页面
src/                # 业务逻辑、组件、hooks 等
```

## 错题记录 MVP

1. 进入 `记录错题` 页面（首页按钮或 `http://localhost:8081/records/new`）。  
2. 填写学科、知识点、题干、答案、原因等信息。  
3. 点击“保存错题”后，记录会存入本地 `AsyncStorage`，并自动计算下一次复习时间（依据难度 1-5 天不等）。  
4. 在成功提示卡片中可看到最近一次保存的错题条目摘要。

> 未来会将这些记录同步到 Supabase，并基于 `nextReviewAt` 推送复习任务。
