# 学脉 StudyLink - AI教育智能体

> AI知识导航平台，为大学生提供智能知识图谱与个性化学习路径

## 🚀 快速开始

### 本地开发
```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 访问应用
# 打开浏览器访问 http://localhost:3000
```

### 环境配置
创建 `.env.local` 文件：
```env
DEEPSEEK_API_KEY=sk-1b1de9af40cb41eeaea80fca0861b5e7
```

## 🌟 核心功能

### 1. 智能知识图谱
- **四层知识结构可视化**
  - 核心概念层：概念定义与核心要素
  - 学习资源层：课程、论文、教材推荐
  - 实践应用层：竞赛案例、岗位JD、实际案例
  - 人脉资源层：核心学者、学长推荐、行业专家

### 2. AI智能搜索
- 支持关键词搜索和语音输入
- DeepSeek AI智能分析与回答
- 语义理解与意图识别

### 3. 个性化学习路径
- AI生成14天学习计划
- 每日任务清单与里程碑
- 学习进度跟踪与调整

### 4. 资源推荐系统
- 基于专业+兴趣的竞赛推荐
- 升学信息（考研/保研/留学）
- 岗位匹配与技能分析

## 🏗️ 技术架构

### 前端技术栈
- **框架**: Next.js 15 + TypeScript
- **样式**: Tailwind CSS + Framer Motion
- **图表**: Recharts（知识图谱可视化）
- **图标**: Lucide React

### API集成
- **AI模型**: DeepSeek API
- **搜索API**: `/api/search` 路由
- **数据源**: 本地示例数据 + 实时AI生成

### 项目结构
```
studylink/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 应用布局
│   ├── page.tsx           # 首页/搜索页
│   └── api/search/        # 搜索API路由
├── components/            # React组件
│   ├── SearchBar.tsx     # 搜索组件
│   ├── KnowledgeGraph.tsx # 知识图谱
│   ├── ResourceCard.tsx  # 资源卡片
│   └── AIChatCard.tsx    # AI回答卡片
├── lib/                   # 工具库
│   └── deepseek.ts       # DeepSeek API封装
├── data/                  # 数据文件
│   └── samples.json      # 示例数据
└── public/                # 静态资源
```

## 🎨 设计系统

### 配色方案
- **主色**: `#4F46E5`（靛蓝色）- 知识、专业
- **辅色**: `#10B981`（翠绿色）- 成长、活力
- **强调色**: `#F59E0B`（琥珀色）- 重点、提醒
- **背景**: `#F9FAFB`
- **文字**: `#1F2937`

### 响应式设计
- 移动优先，适配所有设备
- 断点：sm (640px)、md (768px)、lg (1024px)、xl (1280px)
- 触摸友好，交互流畅

## 🚀 部署指南

### 部署到Vercel（推荐）

#### 步骤1：初始化Git仓库
```bash
git init
git add .
git commit -m "feat: 初始提交 - 学脉AI教育智能体MVP"
```

#### 步骤2：推送到GitHub
1. 在GitHub创建新仓库 `studylink`
2. 添加远程仓库：
```bash
git remote add origin https://github.com/你的用户名/studylink.git
git branch -M main
git push -u origin main
```

#### 步骤3：部署到Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击"New Project"，导入`studylink`仓库
4. 配置环境变量：
   - `DEEPSEEK_API_KEY` = `sk-1b1de9af40cb41eeaea80fca0861b5e7`
5. 点击"Deploy"，等待部署完成

#### 步骤4：绑定自定义域名（可选）
1. 在Vercel项目设置中添加自定义域名 `www.studylink.ai`
2. 按照提示配置DNS记录
3. 等待SSL证书自动签发

### 其他部署选项
- **Netlify**: 类似Vercel的流程
- **Railway**: 适合全栈应用
- **Docker容器**: 适合企业部署

## 📊 数据模型

### 知识图谱节点类型
- **concept**: 核心概念
- **theory**: 基础理论
- **application**: 实际应用
- **resource**: 学习资源
- **competition**: 竞赛
- **scholar**: 学者

### 关系类型
- PREREQUISITE: 前置关系
- CONTAINS: 包含关系
- RELATES_TO: 相关关系
- APPLIES_TO: 应用关系

## 🔧 开发指南

### 添加新的示例数据
在 `data/samples.json` 中添加新的查询响应：
```json
{
  "query": "新概念",
  "answer": "详细解释...",
  "concepts": ["概念1", "概念2"],
  "resources": [...],
  "applications": [...]
}
```

### 自定义知识图谱样式
修改 `components/KnowledgeGraph.tsx` 中的：
- `nodeColors`: 节点颜色映射
- `nodeTypes`: 节点类型配置
- 图表布局和交互逻辑

### 扩展AI提示词
修改 `lib/deepseek.ts` 中的系统提示词，优化AI响应格式和质量。

## 🐛 故障排除

### 常见问题
1. **API调用失败**
   - 检查 `.env.local` 中的 `DEEPSEEK_API_KEY`
   - 验证网络连接
   - 检查API额度是否充足

2. **开发服务器无法启动**
   ```bash
   # 清理缓存
   rm -rf .next node_modules
   npm install
   npm run dev
   ```

3. **样式不生效**
   ```bash
   # 重新构建Tailwind
   npx tailwindcss -i ./app/globals.css -o ./app/output.css --watch
   ```

### 调试工具
- **Next.js Dev Tools**: 浏览器开发者工具
- **React DevTools**: 组件树调试
- **Network Tab**: API调用监控

## 📈 未来路线图

### 阶段2：FastAPI后端（2-3周）
- 独立的Python后端服务
- PostgreSQL + Neo4j + Redis数据库
- 完整的REST API接口

### 阶段3：功能扩展（3-4周）
- 个性化学习路径生成算法
- 竞赛/岗位智能推荐系统
- 用户系统与社交登录
- 数据爬虫与知识库扩展

### 阶段4：高级功能（4-6周）
- 实时协作学习空间
- 智能导师与问答系统
- 学习分析与报告生成
- 移动端应用开发

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📞 联系方式

- **项目主页**: [www.studylink.ai](https://www.studylink.ai)
- **邮箱**: contact@studylink.ai
- **GitHub Issues**: [报告问题](https://github.com/你的用户名/studylink/issues)

---

**学脉 StudyLink** - 让知识导航更智能，让学习成长更高效 🚀