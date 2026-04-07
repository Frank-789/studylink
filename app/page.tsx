'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import KnowledgeGraph from '@/components/KnowledgeGraph'
import ResourceCard from '@/components/ResourceCard'
import AIChatCard from '@/components/AIChatCard'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    setSearchQuery(query)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (response.ok) {
        const data = await response.json()
        setSearchResults(data)
      } else {
        throw new Error('搜索失败')
      }
    } catch (error) {
      console.error('搜索错误:', error)
      // 使用示例数据作为备选
      setSearchResults(getSampleData(query))
    } finally {
      setIsLoading(false)
    }
  }

  const getSampleData = (query: string) => {
    // 示例数据，后续从data文件导入
    return {
      query,
      answer: `关于"${query}"，这是一个重要的学习概念。它涉及多个相关领域，包括基础理论、实际应用和进阶学习路径。`,
      graphData: {
        nodes: [
          { id: '核心概念', name: query, type: 'concept' },
          { id: '基础理论', name: '基础理论', type: 'theory' },
          { id: '实际应用', name: '实际应用', type: 'application' },
          { id: '学习资源', name: '学习资源', type: 'resource' },
          { id: '相关竞赛', name: '相关竞赛', type: 'competition' },
        ],
        links: [
          { source: '核心概念', target: '基础理论' },
          { source: '核心概念', target: '实际应用' },
          { source: '基础理论', target: '学习资源' },
          { source: '实际应用', target: '相关竞赛' },
        ]
      },
      resources: [
        {
          id: 1,
          title: '相关在线课程',
          description: '推荐学习该概念的优质在线课程',
          type: 'course',
          url: '#'
        },
        {
          id: 2,
          title: '学术论文推荐',
          description: '该领域的重要研究论文',
          type: 'paper',
          url: '#'
        },
        {
          id: 3,
          title: '实践项目',
          description: '动手实践项目，巩固学习成果',
          type: 'project',
          url: '#'
        }
      ]
    }
  }

  const sampleKeywords = ['机器学习', 'Python编程', '数学建模', '数据分析', '人工智能']

  return (
    <div className="space-y-8">
      {/* 英雄区域 */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
          输入关键词，解锁<span className="text-primary">知识图谱</span>
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          为大学生提供智能知识导航，连接概念、课程、竞赛与职业路径
        </p>

        {/* 搜索框 */}
        <div className="max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* 示例关键词 */}
          <div className="mt-6">
            <p className="text-muted mb-3">试试搜索:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {sampleKeywords.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => handleSearch(keyword)}
                  className="px-4 py-2 bg-white border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 搜索结果区域 */}
      {searchResults && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：AI回答和知识图谱 */}
            <div className="lg:col-span-2 space-y-8">
              <AIChatCard
                query={searchResults.query}
                answer={searchResults.answer}
              />

              <div className="card">
                <h2 className="text-2xl font-bold text-text mb-6">知识图谱</h2>
                <div className="h-96">
                  <KnowledgeGraph data={searchResults.graphData} />
                </div>
                <div className="mt-4 text-sm text-muted">
                  <p>点击节点查看详细信息，拖拽图谱进行探索</p>
                </div>
              </div>
            </div>

            {/* 右侧：资源推荐 */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-bold text-text mb-6">学习资源推荐</h2>
                <div className="space-y-4">
                  {searchResults.resources.map((resource: any) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-text mb-4">学习路径建议</h3>
                <p className="text-muted mb-4">
                  根据你的搜索，我们建议以下14天学习路径：
                </p>
                <button className="w-full btn-secondary">
                  生成个性化学习路径
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 功能特性展示 */}
      {!searchResults && (
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center text-text mb-12">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-text mb-3">智能知识图谱</h3>
              <p className="text-muted">可视化展示概念关联，构建系统化知识网络</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-text mb-3">个性化学习路径</h3>
              <p className="text-muted">AI生成定制化学习计划，高效达成学习目标</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-text mb-3">竞赛岗位推荐</h3>
              <p className="text-muted">匹配专业兴趣，推荐优质竞赛和职业机会</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}