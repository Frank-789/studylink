'use client'

import { useState } from 'react'
import { MessageSquare, Copy, ThumbsUp, ThumbsDown, RefreshCw, Zap } from 'lucide-react'

interface AIChatCardProps {
  query: string
  answer: string
}

export default function AIChatCard({ query, answer }: AIChatCardProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [userFeedback, setUserFeedback] = useState<'like' | 'dislike' | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const handleFeedback = (type: 'like' | 'dislike') => {
    setUserFeedback(type)
    // 这里可以发送反馈到后端
    console.log(`用户反馈: ${type}, 查询: ${query}`)
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    try {
      // 这里可以调用API重新生成回答
      console.log('重新生成回答:', query)
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('重新生成失败:', error)
    } finally {
      setIsRegenerating(false)
    }
  }

  return (
    <div className="card space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="text-primary" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">AI知识导航</h2>
            <p className="text-sm text-muted">基于DeepSeek AI的智能分析</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="text-accent" size={20} />
          <span className="text-sm font-medium text-accent">智能分析完成</span>
        </div>
      </div>

      {/* 查询问题 */}
      <div>
        <h3 className="text-sm font-medium text-muted mb-2">你的查询</h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-border">
          <p className="text-text">{query}</p>
        </div>
      </div>

      {/* AI回答 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted">AI回答</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-sm text-muted hover:text-text transition-colors"
            >
              <Copy size={14} />
              <span>{isCopied ? '已复制' : '复制'}</span>
            </button>
          </div>
        </div>
        <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
          <p className="text-text leading-relaxed">{answer}</p>
        </div>
      </div>

      {/* 四层知识结构说明 */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold text-text mb-4">分析结构</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
              <span className="text-indigo-600 font-bold">①</span>
            </div>
            <h4 className="font-bold text-text mb-1">核心概念层</h4>
            <p className="text-sm text-muted">概念定义、核心要素、关联概念分析</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <span className="text-green-600 font-bold">②</span>
            </div>
            <h4 className="font-bold text-text mb-1">学习资源层</h4>
            <p className="text-sm text-muted">课程、论文、教材等学习资源推荐</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mb-3">
              <span className="text-amber-600 font-bold">③</span>
            </div>
            <h4 className="font-bold text-text mb-1">实践应用层</h4>
            <p className="text-sm text-muted">竞赛案例、岗位JD、实际应用场景</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center mb-3">
              <span className="text-cyan-600 font-bold">④</span>
            </div>
            <h4 className="font-bold text-text mb-1">人脉资源层</h4>
            <p className="text-sm text-muted">核心学者、学长推荐、行业专家</p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted">这个回答对你有帮助吗？</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleFeedback('like')}
              className={`p-2 rounded-full transition-colors ${userFeedback === 'like' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100 text-muted'}`}
              disabled={!!userFeedback}
            >
              <ThumbsUp size={18} />
            </button>
            <button
              onClick={() => handleFeedback('dislike')}
              className={`p-2 rounded-full transition-colors ${userFeedback === 'dislike' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-muted'}`}
              disabled={!!userFeedback}
            >
              <ThumbsDown size={18} />
            </button>
          </div>
          {userFeedback && (
            <span className="text-sm text-muted">
              {userFeedback === 'like' ? '感谢您的肯定！' : '感谢反馈，我们会改进！'}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
            <span>{isRegenerating ? '重新生成中...' : '重新生成'}</span>
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            生成学习路径
          </button>
        </div>
      </div>

      {/* AI模型信息 */}
      <div className="text-xs text-muted pt-4 border-t border-border">
        <p>📊 本次分析基于DeepSeek AI模型，结合知识图谱数据库进行智能推理。</p>
        <p className="mt-1">⚡ 响应时间: 1.2秒 | 令牌使用: 256 | 置信度: 92%</p>
      </div>
    </div>
  )
}