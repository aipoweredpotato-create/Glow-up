'use client'
import { useState } from 'react'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['workout'] }

export default function WorkoutSection({ data }: Props) {
  const [activeDay, setActiveDay] = useState(0)
  const plan = data.weeklyPlan?.[activeDay]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Workout Plan</h2>
        <p className="text-white/45 text-sm mt-1">Personalized training program</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>
        {data.weeklyPlan?.map((day, i) => (
          <button key={i} onClick={() => setActiveDay(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
              activeDay === i
                ? 'text-white'
                : 'bg-white/[0.05] border-white/[0.08] text-white/45 hover:text-white/75'
            }`}
            style={activeDay === i ? {background:'linear-gradient(135deg,#7B2FFF,#2F6FFF)',border:'1px solid rgba(123,47,255,0.4)',boxShadow:'0 0 16px rgba(123,47,255,0.3)'} : {}}
          >
            {day.day}
          </button>
        ))}
      </div>
      {plan && (
        <div key={activeDay} className="space-y-4 animate-fade-in">
          <GlassCard variant="strong" className="p-4 flex items-center gap-3">
            <span className="text-2xl">🏋️</span>
            <div>
              <p className="text-lg font-bold text-white">{plan.focus}</p>
              <p className="text-xs text-white/40">{plan.day}</p>
            </div>
          </GlassCard>
          {plan.warmup?.length > 0 && (
            <GlassCard className="p-4">
              <h4 className="text-[10px] font-bold text-white/35 tracking-widest mb-2">WARMUP</h4>
              <div className="flex flex-wrap gap-2">
                {plan.warmup.map((w,i) => <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#FFB347]/12 border border-[#FFB347]/20 text-[#FFB347]">{w}</span>)}
              </div>
            </GlassCard>
          )}
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Exercise','Sets','Reps','Rest','Notes'].map(h => (
                      <th key={h} className="text-left text-[10px] tracking-widest text-white/35 font-semibold px-5 py-3">{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plan.exercises?.map((ex, i) => (
                    <tr key={i} className="border-b border-white/[0.04] last:border-0">
                      <td className="px-5 py-3 text-sm font-semibold text-white/90">{ex.name}</td>
                      <td className="px-5 py-3 text-sm font-bold text-[#7B2FFF]">{ex.sets}</td>
                      <td className="px-5 py-3 text-sm text-white/75">{ex.reps}</td>
                      <td className="px-5 py-3 text-xs text-white/40">{ex.rest}</td>
                      <td className="px-5 py-3 text-xs text-white/35">{ex.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
          {plan.cooldown?.length > 0 && (
            <GlassCard className="p-4">
              <h4 className="text-[10px] font-bold text-white/35 tracking-widest mb-2">COOLDOWN</h4>
              <div className="flex flex-wrap gap-2">
                {plan.cooldown.map((c,i) => <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF]">{c}</span>)}
              </div>
            </GlassCard>
          )}
        </div>
      )}
      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <h4 className="text-[10px] font-bold text-white/35 tracking-widest mb-2">📈 PROGRESSION</h4>
          <p className="text-sm text-white/65">{data.progressionModel}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <h4 className="text-[10px] font-bold text-white/35 tracking-widest mb-2">🔄 DELOAD</h4>
          <p className="text-sm text-white/65">{data.deloadProtocol}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <h4 className="text-[10px] font-bold text-white/35 tracking-widest mb-2">🏆 KEY LIFTS</h4>
          <div className="space-y-1">
            {data.keyLifts?.map(lift => (
              <div key={lift} className="flex items-center gap-2 text-sm text-white/65">
                <span className="text-[#FF2F7B]">›</span>{lift}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
