'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlowUpPlan } from '@/types/plan'
import { TABS } from '@/lib/constants'
import MeshBackground from '@/components/MeshBackground'
import AuditSection from '@/components/dashboard/AuditSection'
import ScheduleSection from '@/components/dashboard/ScheduleSection'
import ProductsSection from '@/components/dashboard/ProductsSection'
import SkincareSection from '@/components/dashboard/SkincareSection'
import BodyHairSection from '@/components/dashboard/BodyHairSection'
import FaceGymSection from '@/components/dashboard/FaceGymSection'
import FoodSection from '@/components/dashboard/FoodSection'
import RecipesSection from '@/components/dashboard/RecipesSection'
import WorkoutSection from '@/components/dashboard/WorkoutSection'
import CalisthenicsSection from '@/components/dashboard/CalisthenicsSection'
import ProgressSection from '@/components/dashboard/ProgressSection'

export default function DashboardPage() {
  const router = useRouter()
  const [plan, setPlan] = useState<GlowUpPlan | null>(null)
  const [activeTab, setActiveTab] = useState('audit')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const storedPlan = sessionStorage.getItem('glowup_plan')
    const storedName = sessionStorage.getItem('glowup_user')
    if (!storedPlan || !storedName) { router.push('/'); return }
    try {
      setPlan(JSON.parse(storedPlan))
      setUserName(storedName)
    } catch { router.push('/') }
  }, [router])

  if (!plan) return (
    <main className="relative min-h-screen flex items-center justify-center">
      <MeshBackground />
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#7B2FFF]/25 border-t-[#7B2FFF] rounded-full animate-spin-slow" />
        <p className="text-white/35 text-sm">Loading your blueprint...</p>
      </div>
    </main>
  )

  const section = (() => {
    switch (activeTab) {
      case 'audit':        return <AuditSection data={plan.audit} />
      case 'schedule':     return <ScheduleSection data={plan.schedule} />
      case 'products':     return <ProductsSection data={plan.products} />
      case 'skincare':     return <SkincareSection data={plan.skincare} />
      case 'bodyHair':     return <BodyHairSection data={plan.bodyHair} />
      case 'faceGym':      return <FaceGymSection data={plan.faceGym} />
      case 'food':         return <FoodSection data={plan.food} />
      case 'recipes':      return <RecipesSection data={plan.recipes} />
      case 'workout':      return <WorkoutSection data={plan.workout} />
      case 'calisthenics': return <CalisthenicsSection data={plan.calisthenics} />
      case 'progress':     return <ProgressSection data={plan.progress} />
      default:             return <AuditSection data={plan.audit} />
    }
  })()

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <MeshBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-white/[0.04] backdrop-blur-[24px]">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.3em] text-white/30 font-bold">✦ GLOW-UP</span>
            <span className="text-white/35 text-xs hidden sm:block">AI Transformation Blueprint</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/[0.08] border border-white/[0.12] rounded-full px-4 py-1.5">
              <span className="text-sm font-medium">👤 {userName}</span>
            </div>
            <button onClick={() => { sessionStorage.clear(); router.push('/') }}
              className="text-white/25 hover:text-white/55 text-xs transition-colors">
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <div className="sticky top-16 z-40 border-b border-white/[0.04] bg-[#050510]/80 backdrop-blur-[20px]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex gap-2 py-3 overflow-x-auto" style={{scrollbarWidth:'none'}}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg'
                    : 'bg-white/[0.06] border border-white/[0.08] text-white/45 hover:text-white/75 hover:bg-white/[0.09]'
                }`}
                style={activeTab === tab.id ? {background:'linear-gradient(135deg,#7B2FFF,#2F6FFF)',boxShadow:'0 4px 16px rgba(123,47,255,0.35)'} : {}}
              >
                <span className="mr-1.5">{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div key={activeTab} className="animate-fade-in">
          {section}
        </div>
      </div>
    </main>
  )
}
