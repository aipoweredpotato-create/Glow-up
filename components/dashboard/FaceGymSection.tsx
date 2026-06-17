'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['faceGym'] }

export default function FaceGymSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Face Gym</h2>
        <p className="text-white/45 text-sm mt-1">Facial muscle training for jaw definition &amp; glow</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <GlassCard variant="strong" className="p-4 text-center">
          <div className="text-3xl font-bold" style={{background:'linear-gradient(135deg,#7B2FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{data.dailyRoutineMins}</div>
          <div className="text-xs text-white/45 mt-1">mins/day</div>
        </GlassCard>
        <GlassCard variant="strong" className="p-4 text-center">
          <div className="text-3xl font-bold text-white">{data.exercises?.length ?? 0}</div>
          <div className="text-xs text-white/45 mt-1">exercises</div>
        </GlassCard>
        <GlassCard variant="strong" className="p-4 col-span-2">
          <p className="text-[10px] text-white/35 font-semibold mb-2">TOOLS</p>
          <div className="flex flex-wrap gap-1.5">
            {data.tools?.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-[#7B2FFF]/15 border border-[#7B2FFF]/25 text-[#7B2FFF]">{t}</span>
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {data.exercises?.map((ex, i) => (
          <GlassCard key={i} hover className="p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-bold text-white/95">{ex.name}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#7B2FFF]/20 text-[#7B2FFF] font-semibold shrink-0">{ex.reps} × {ex.sets}</span>
            </div>
            <p className="text-xs text-white/45 mb-2">{ex.technique}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] inline-block">{ex.targetArea}</span>
          </GlassCard>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">WEEKLY SCHEDULE</h3>
          <p className="text-white/65 text-sm leading-relaxed">{data.weeklySchedule}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">BENEFITS</h3>
          <div className="space-y-2">
            {data.benefits?.map((b, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:'linear-gradient(to right,#7B2FFF,#2F6FFF)'}} />
                <span className="text-sm text-white/70">{b}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
