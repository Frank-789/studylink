'use client'

import { useState } from 'react'
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label
} from 'recharts'

interface Node {
  id: string
  name: string
  type: string
  x?: number
  y?: number
}

interface Link {
  source: string
  target: string
}

interface KnowledgeGraphProps {
  data: {
    nodes: Node[]
    links: Link[]
  }
}

interface GraphNode {
  name: string
  type: string
  connections: number
  importance: number
}

interface GraphLink {
  source: string
  target: string
  value: number
}

export default function KnowledgeGraph({ data }: KnowledgeGraphProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // 转换数据为图表格式
  const graphData: GraphNode[] = data.nodes.map(node => ({
    name: node.name,
    type: node.type,
    connections: data.links.filter(link => link.source === node.id || link.target === node.id).length,
    importance: Math.random() * 100 // 实际项目中应该基于算法计算
  }))

  const links: GraphLink[] = data.links.map(link => ({
    source: link.source,
    target: link.target,
    value: 1
  }))

  const nodeColors: Record<string, string> = {
    concept: '#4F46E5', // 主色 - 概念
    theory: '#10B981',  // 辅色 - 理论
    application: '#F59E0B', // 强调色 - 应用
    resource: '#8B5CF6', // 紫色 - 资源
    competition: '#EF4444', // 红色 - 竞赛
    scholar: '#06B6D4', // 青色 - 学者
  }

  const nodeTypes = [
    { type: 'concept', label: '核心概念', color: nodeColors.concept },
    { type: 'theory', label: '基础理论', color: nodeColors.theory },
    { type: 'application', label: '实际应用', color: nodeColors.application },
    { type: 'resource', label: '学习资源', color: nodeColors.resource },
    { type: 'competition', label: '相关竞赛', color: nodeColors.competition },
  ]

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(selectedNode === node.name ? null : node.name)
  }

  return (
    <div className="space-y-4">
      {/* 图例 */}
      <div className="flex flex-wrap gap-3">
        {nodeTypes.map(({ type, label, color }) => (
          <div key={type} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-sm text-muted">{label}</span>
          </div>
        ))}
      </div>

      {/* 知识图谱可视化 */}
      <div className="relative h-full border border-border rounded-lg bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              fontSize={12}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis
              label={{
                value: '重要性',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                fontSize: 12,
                fill: '#6B7280'
              }}
              fontSize={12}
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const node = payload[0].payload as GraphNode
                  return (
                    <div className="bg-white p-4 border border-border rounded-lg shadow-lg">
                      <p className="font-bold text-text">{node.name}</p>
                      <p className="text-sm text-muted">类型: {
                        nodeTypes.find(t => t.type === node.type)?.label || node.type
                      }</p>
                      <p className="text-sm text-muted">关联概念: {node.connections}个</p>
                      <p className="text-sm text-muted">重要性评分: {node.importance.toFixed(1)}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="importance"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props
                const node = payload as GraphNode
                const isSelected = selectedNode === node.name
                return (
                  <g>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 8 : 6}
                      fill={nodeColors[node.type] || '#4F46E5'}
                      stroke={isSelected ? '#1F2937' : 'white'}
                      strokeWidth={isSelected ? 2 : 1}
                      className="cursor-pointer hover:r-8 transition-all"
                      onClick={() => handleNodeClick(node)}
                    />
                    {isSelected && (
                      <text
                        x={cx}
                        y={cy}
                        dy={-15}
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight="bold"
                        fill="#1F2937"
                      >
                        {node.name}
                      </text>
                    )}
                  </g>
                )
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 详细信息面板 */}
      {selectedNode && (
        <div className="mt-6 animate-fade-in">
          <div className="card">
            <h3 className="text-lg font-bold text-text mb-4">节点详细信息</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-text">核心概念层</h4>
                <p className="text-muted text-sm mt-1">
                  这是知识体系的核心概念，理解这个概念是学习其他相关知识的基石。
                </p>
              </div>
              <div>
                <h4 className="font-medium text-text">学习资源层</h4>
                <ul className="text-muted text-sm mt-1 list-disc list-inside">
                  <li>相关在线课程推荐</li>
                  <li>经典教材和参考书</li>
                  <li>学术论文和研究成果</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-text">实践应用层</h4>
                <ul className="text-muted text-sm mt-1 list-disc list-inside">
                  <li>相关竞赛和项目</li>
                  <li>实际工作应用场景</li>
                  <li>案例分析和解决方案</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-text">人脉资源层</h4>
                <ul className="text-muted text-sm mt-1 list-disc list-inside">
                  <li>领域专家学者</li>
                  <li>相关学校教授</li>
                  <li>行业从业者推荐</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 说明文字 */}
      <div className="text-center text-sm text-muted mt-4">
        <p>知识图谱展示了概念间的关联关系，点击节点查看详细信息</p>
        <p className="mt-1">节点大小表示重要性，颜色表示不同类型</p>
      </div>
    </div>
  )
}