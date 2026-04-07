import { NextRequest, NextResponse } from 'next/server'
import { queryDeepSeek } from '@/lib/deepseek'

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: '请输入有效的查询内容' },
        { status: 400 }
      )
    }

    // 设置响应头，支持CORS
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })

    // 调用DeepSeek API获取响应
    const response = await queryDeepSeek(query)

    // 记录API使用情况
    console.log(`API调用: ${query} - 响应时间: ${Date.now()}ms`)

    return NextResponse.json(response, { headers })
  } catch (error) {
    console.error('搜索API错误:', error)

    // 返回错误响应，但仍然提供示例数据
    const query = await request.json().then(data => data.query).catch(() => '未知查询')

    const fallbackResponse = {
      query,
      answer: `由于系统繁忙，暂时无法获取"${query}"的实时分析结果。以下是基于知识库的推荐分析：这是一个重要的学习概念，建议从基础理论开始学习，结合实际应用项目进行实践。`,
      graphData: {
        nodes: [
          { id: 'query', name: query, type: 'concept' },
          { id: 'theory', name: '基础理论', type: 'theory' },
          { id: 'application', name: '实际应用', type: 'application' },
          { id: 'resource', name: '学习资源', type: 'resource' },
          { id: 'competition', name: '相关竞赛', type: 'competition' }
        ],
        links: [
          { source: 'query', target: 'theory' },
          { source: 'query', target: 'application' },
          { source: 'theory', target: 'resource' },
          { source: 'application', target: 'competition' }
        ]
      },
      resources: [
        {
          id: 1,
          title: '相关学习课程',
          description: '推荐学习该概念的优质在线课程',
          type: 'course',
          url: '#'
        },
        {
          id: 2,
          title: '学术参考资料',
          description: '该领域的重要研究论文和学习资料',
          type: 'paper',
          url: '#'
        },
        {
          id: 3,
          title: '实践项目推荐',
          description: '动手实践项目，巩固学习成果',
          type: 'project',
          url: '#'
        }
      ]
    }

    return NextResponse.json(fallbackResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// 处理OPTIONS请求（CORS预检）
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    }
  )
}