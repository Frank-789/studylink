'use client'

import { useState } from 'react'
import { Search, Mic } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = 'zh-CN'
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        onSearch(transcript)
      }
      recognition.start()
    } else {
      alert('您的浏览器不支持语音输入')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入任何学习概念、课程名称或职业目标..."
          className="input-primary pl-12 pr-24 py-4 text-lg"
          disabled={isLoading}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="语音输入"
          >
            <Mic size={20} className="text-muted" />
          </button>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="btn-primary px-6 py-2"
          >
            {isLoading ? '搜索中...' : '智能搜索'}
          </button>
        </div>
      </div>
      <div className="mt-4 text-sm text-muted flex justify-between">
        <span>支持中文关键词、完整问题、学习目标</span>
        <span>示例：机器学习入门、参加数学建模竞赛、数据分析师技能</span>
      </div>
    </form>
  )
}