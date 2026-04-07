'use client'

import { BookOpen, FileText, Code, Trophy, Briefcase, Users } from 'lucide-react'

interface ResourceCardProps {
  resource: {
    id: number
    title: string
    description: string
    type: string
    url: string
  }
}

const typeConfig: Record<string, { icon: any, color: string, bgColor: string, label: string }> = {
  course: {
    icon: BookOpen,
    color: '#10B981',
    bgColor: 'bg-green-50',
    label: '课程'
  },
  paper: {
    icon: FileText,
    color: '#4F46E5',
    bgColor: 'bg-indigo-50',
    label: '论文'
  },
  project: {
    icon: Code,
    color: '#F59E0B',
    bgColor: 'bg-amber-50',
    label: '项目'
  },
  competition: {
    icon: Trophy,
    color: '#EF4444',
    bgColor: 'bg-red-50',
    label: '竞赛'
  },
  job: {
    icon: Briefcase,
    color: '#8B5CF6',
    bgColor: 'bg-purple-50',
    label: '岗位'
  },
  scholar: {
    icon: Users,
    color: '#06B6D4',
    bgColor: 'bg-cyan-50',
    label: '学者'
  }
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const config = typeConfig[resource.type] || typeConfig.course
  const Icon = config.icon

  return (
    <div className="group relative">
      <div className="card hover:shadow-lg transition-shadow duration-300 hover:border-primary/50">
        <div className="flex items-start space-x-4">
          {/* 图标 */}
          <div className={`w-12 h-12 rounded-lg ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon size={24} style={{ color: config.color }} />
          </div>

          {/* 内容 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full text-white" style={{ backgroundColor: config.color }}>
                  {config.label}
                </span>
                <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
              </div>
              <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                查看详情 →
              </button>
            </div>

            <p className="text-muted mb-4">
              {resource.description}
            </p>

            {/* 标签和操作 */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">
                  推荐度: 90%
                </span>
                <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">
                  难度: 中等
                </span>
                <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">
                  时间: 20小时
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button className="text-sm text-muted hover:text-text transition-colors">
                  收藏
                </button>
                <button className="text-sm text-muted hover:text-text transition-colors">
                  分享
                </button>
                <button className="px-3 py-1.5 text-sm rounded-md text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: config.color }}>
                  开始学习
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 进度条（如果适用） */}
        {(resource.type === 'course' || resource.type === 'project') && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted mb-1">
              <span>学习进度</span>
              <span>25%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: '25%', backgroundColor: config.color }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 悬停效果 */}
      <div className="absolute inset-0 border-2 border-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}