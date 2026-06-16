'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['calisthenics'] }

export default function CalisthenicsSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Calisthenics</h2>
        <p className="text-white/45 text-sm mt-1">Bodyweight mastery &amp; skill progression</p>
      </div>
      <GlassCard className="p-6">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">SKILL PROGRESSION</h3>
        <div className="space-y-3">
          {data.skillProgression?.map((skill, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-sm font-bold text-white/95">{skill.skill}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#7B2FFF]/15 text-[#7B2FFF] font-medium shrink-0">{skill.timelineWeeks}w</span>
              </div>
              <p className="text-xs text-white/40 mb-2">{skill.currentLevel}</p>
              <div className="flex flex-wrap gap-1.5">
                {skill.progressionSteps?.map((step, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-white/55">→ {step}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-5">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">DAILY MOVEMENT</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.dailyMovement?.map((move, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white/90">{move.exercise}</span>
                <span className="text-xs text-[#00D4FF]">{move.sets}×{move.reps}</span>
              </div>
              <p className="text-xs text-white/45">{move.notes}</p>
            </div>
          ))}
        </div>
      </GlassCard>
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">🧘 MOBILITY WORK</h3>
          <div className="space-y-2">
            {data.mobilityWork?.map((m, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:'linear-gradient(to right,#2F6FFF,#00D4FF)'}} />
                <span className="text-sm text-white/65">{m}</span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">✅ FUNDAMENTALS</h3>
          <div className="space-y-2">
            {data.fundamentals?.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="text-[#7B2FFF] font-bold shrink-0">✓</span>
                <span className="text-sm text-white/65">{f}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
