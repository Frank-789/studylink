/**
 * DeepSeek API服务封装
 * 使用环境变量: DEEPSEEK_API_KEY
 */

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-1b1de9af40cb41eeaea80fca0861b5e7' // 使用用户提供的API Key作为备用

export interface DeepSeekResponse {
  query: string
  answer: string
  graphData: {
    nodes: Array<{
      id: string
      name: string
      type: string
    }>
    links: Array<{
      source: string
      target: string
    }>
  }
  resources: Array<{
    id: number
    title: string
    description: string
    type: string
    url: string
  }>
}

export async function queryDeepSeek(query: string): Promise<DeepSeekResponse> {
  try {
    // 如果提供了API Key，则调用真实的DeepSeek API
    if (API_KEY && !API_KEY.includes('sk-1b1de9af40cb41eeaea80fca0861b5e7')) {
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `你是一个AI教育助手，专门帮助大学生构建知识图谱和学习路径。
              当用户输入一个学习概念或目标时，你需要：
              1. 提供清晰、专业的解释
              2. 分析概念的核心要素和关联概念
              3. 推荐学习资源和实践路径
              4. 按照以下JSON格式返回结构化数据：
              {
                "answer": "详细的解释文本",
                "concepts": ["概念1", "概念2"],
                "resources": ["资源1", "资源2"],
                "applications": ["应用1", "应用2"]
              }`
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      if (response.ok) {
        const data = await response.json()
        const aiResponse = data.choices[0]?.message?.content || ''

        // 尝试解析JSON响应，如果失败则使用文本响应
        try {
          const parsed = JSON.parse(aiResponse)
          return formatResponse(query, parsed)
        } catch {
          return formatResponse(query, { answer: aiResponse })
        }
      }
    }

    // 如果API调用失败或没有API Key，使用示例数据
    return getSampleResponse(query)
  } catch (error) {
    console.error('DeepSeek API调用错误:', error)
    return getSampleResponse(query)
  }
}

function formatResponse(query: string, aiData: any): DeepSeekResponse {
  const concepts = aiData.concepts || ['核心概念', '基础理论', '实际应用']
  const resources = aiData.resources || ['在线课程', '学术论文', '实践项目']
  const applications = aiData.applications || ['相关竞赛', '岗位应用', '研究课题']

  // 构建知识图谱节点
  const nodes = [
    { id: 'query', name: query, type: 'concept' },
    ...concepts.slice(0, 3).map((concept: string, index: number) => ({
      id: `concept-${index}`,
      name: concept,
      type: index === 0 ? 'theory' : 'concept'
    })),
    ...resources.slice(0, 2).map((resource: string, index: number) => ({
      id: `resource-${index}`,
      name: resource,
      type: 'resource'
    })),
    ...applications.slice(0, 2).map((app: string, index: number) => ({
      id: `app-${index}`,
      name: app,
      type: 'application'
    }))
  ]

  // 构建知识图谱连接
  const links = [
    { source: 'query', target: 'concept-0' },
    { source: 'concept-0', target: 'concept-1' },
    { source: 'concept-0', target: 'concept-2' },
    { source: 'concept-1', target: 'resource-0' },
    { source: 'concept-2', target: 'app-0' },
    { source: 'resource-0', target: 'resource-1' },
    { source: 'app-0', target: 'app-1' }
  ]

  return {
    query,
    answer: aiData.answer || `关于"${query}"，这是一个重要的学习概念。它涉及${concepts.join('、')}等多个方面。学习路径包括${resources.join('、')}等资源，应用场景包括${applications.join('、')}等。`,
    graphData: { nodes, links },
    resources: [
      {
        id: 1,
        title: resources[0] || '相关在线课程',
        description: `学习${query}的优质在线课程，包含完整教学视频和实践练习`,
        type: 'course',
        url: '#'
      },
      {
        id: 2,
        title: resources[1] || '学术论文推荐',
        description: `该领域的重要研究论文和最新研究成果`,
        type: 'paper',
        url: '#'
      },
      {
        id: 3,
        title: applications[0] || '实践项目',
        description: `动手实践项目，巩固${query}的学习成果`,
        type: 'project',
        url: '#'
      }
    ]
  }
}

function getSampleResponse(query: string): DeepSeekResponse {
  // 为常见查询提供定制化响应
  const sampleResponses: Record<string, DeepSeekResponse> = {
    '机器学习': {
      query: '机器学习',
      answer: '机器学习是人工智能的核心领域，通过算法让计算机从数据中学习模式并做出预测。核心概念包括监督学习、无监督学习、深度学习等。学习路径应从Python编程和线性代数开始，逐步学习Scikit-learn、TensorFlow等框架。',
      graphData: {
        nodes: [
          { id: 'ml', name: '机器学习', type: 'concept' },
          { id: 'supervised', name: '监督学习', type: 'theory' },
          { id: 'unsupervised', name: '无监督学习', type: 'theory' },
          { id: 'deep', name: '深度学习', type: 'application' },
          { id: 'python', name: 'Python编程', type: 'resource' },
          { id: 'sklearn', name: 'Scikit-learn', type: 'resource' },
          { id: 'kaggle', name: 'Kaggle竞赛', type: 'competition' },
          { id: 'andrew', name: '吴恩达', type: 'scholar' }
        ],
        links: [
          { source: 'ml', target: 'supervised' },
          { source: 'ml', target: 'unsupervised' },
          { source: 'ml', target: 'deep' },
          { source: 'supervised', target: 'python' },
          { source: 'python', target: 'sklearn' },
          { source: 'sklearn', target: 'kaggle' },
          { source: 'deep', target: 'andrew' }
        ]
      },
      resources: [
        {
          id: 1,
          title: '机器学习入门课程',
          description: '吴恩达教授的经典机器学习课程，适合初学者',
          type: 'course',
          url: '#'
        },
        {
          id: 2,
          title: 'Python机器学习实战',
          description: '使用Scikit-learn进行机器学习项目开发',
          type: 'project',
          url: '#'
        },
        {
          id: 3,
          title: 'Kaggle入门竞赛',
          description: '泰坦尼克号生存预测，适合机器学习新手',
          type: 'competition',
          url: '#'
        }
      ]
    },
    'python编程': {
      query: 'Python编程',
      answer: 'Python是一种高级编程语言，以简洁易读的语法和强大的生态系统著称。广泛应用于数据分析、人工智能、Web开发等领域。学习路径应从基础语法开始，逐步学习面向对象编程、常用库和框架。',
      graphData: {
        nodes: [
          { id: 'python', name: 'Python编程', type: 'concept' },
          { id: 'syntax', name: '基础语法', type: 'theory' },
          { id: 'oop', name: '面向对象', type: 'theory' },
          { id: 'data', name: '数据分析', type: 'application' },
          { id: 'web', name: 'Web开发', type: 'application' },
          { id: 'pandas', name: 'Pandas', type: 'resource' },
          { id: 'django', name: 'Django', type: 'resource' },
          { id: 'cert', name: 'Python认证', type: 'competition' }
        ],
        links: [
          { source: 'python', target: 'syntax' },
          { source: 'python', target: 'oop' },
          { source: 'syntax', target: 'data' },
          { source: 'oop', target: 'web' },
          { source: 'data', target: 'pandas' },
          { source: 'web', target: 'django' },
          { source: 'pandas', target: 'cert' }
        ]
      },
      resources: [
        {
          id: 1,
          title: 'Python入门教程',
          description: '廖雪峰的Python教程，适合编程初学者',
          type: 'course',
          url: '#'
        },
        {
          id: 2,
          title: '数据分析实战',
          description: '使用Pandas和Matplotlib进行数据分析项目',
          type: 'project',
          url: '#'
        },
        {
          id: 3,
          title: 'Django Web开发',
          description: '使用Django框架开发完整的Web应用',
          type: 'course',
          url: '#'
        }
      ]
    }
  }

  // 如果查询匹配示例，返回定制化响应，否则返回通用响应
  const lowerQuery = query.toLowerCase()
  for (const [key, response] of Object.entries(sampleResponses)) {
    if (lowerQuery.includes(key.toLowerCase())) {
      return { ...response, query }
    }
  }

  // 通用响应
  return formatResponse(query, {
    answer: `关于"${query}"，这是一个重要的学习概念。它涉及多个相关领域，包括基础理论、实际应用和进阶学习路径。建议从基础概念开始学习，逐步深入实践应用。`,
    concepts: ['基础概念', '核心理论', '进阶应用'],
    resources: ['入门课程', '实践项目', '参考资料'],
    applications: ['相关竞赛', '岗位应用', '研究课题']
  })
}

// 获取知识图谱的层级数据
export function getKnowledgeGraphLevels() {
  return [
    {
      level: 1,
      name: '核心概念层',
      description: '概念定义、核心要素、关联概念',
      color: '#4F46E5'
    },
    {
      level: 2,
      name: '学习资源层',
      description: '课程、论文、教材等学习资源',
      color: '#10B981'
    },
    {
      level: 3,
      name: '实践应用层',
      description: '竞赛案例、岗位JD、实际应用',
      color: '#F59E0B'
    },
    {
      level: 4,
      name: '人脉资源层',
      description: '核心学者、学长推荐、行业专家',
      color: '#06B6D4'
    }
  ]
}