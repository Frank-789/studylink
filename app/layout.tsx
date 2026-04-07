import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '学脉 StudyLink - AI知识导航平台',
  description: '为大学生提供智能知识图谱与个性化学习路径的AI教育智能体',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-background text-text min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">学</span>
                </div>
                <h1 className="text-2xl font-bold text-primary">学脉 StudyLink</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-text hover:text-primary transition-colors">首页</a>
                <a href="#" className="text-text hover:text-primary transition-colors">知识图谱</a>
                <a href="#" className="text-text hover:text-primary transition-colors">学习路径</a>
                <a href="#" className="text-text hover:text-primary transition-colors">个人中心</a>
              </nav>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                开始使用
              </button>
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-border bg-white py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">学</span>
                    </div>
                    <span className="text-lg font-bold text-primary">学脉 StudyLink</span>
                  </div>
                  <p className="text-muted mt-2">AI知识导航平台，助力大学生成长</p>
                </div>
                <div className="text-muted text-sm">
                  <p>© 2024 学脉 StudyLink. 保留所有权利。</p>
                  <p className="mt-1">联系方式: contact@studylink.ai</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}