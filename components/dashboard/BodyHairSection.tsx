'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['bodyHair'] }

export default function BodyHairSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Body &amp; Hair</h2>
        <p className="text-white/45 text-sm mt-1">Head-to-toe grooming protocol</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">💧 HAIR CARE</h3>
          <div className="space-y-2.5">
            {data.hairCareRoutine?.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#00D4FF]/15 text-[#00D4FF] font-medium shrink-0 mt-0.5">{item.frequency}</span>
                <div>
                  <p className="text-sm font-semibold text-white/90">{item.action}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.product}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">🧴 BODY CARE</h3>
          <div className="space-y-2.5">
            {data.bodyCare?.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white/90">{item.area}</span>
                  <span className="text-xs text-white/35">{item.frequency}</span>
                </div>
                <p className="text-xs text-white/50">{item.routine}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard className="p-5">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">🗓️ GROOMING SCHEDULE</h3>
        <div className="divide-y divide-white/[0.05]">
          {data.groomingSchedule?.map((g, i) => (
            <div key={i} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-white/80">{g.task}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FF2F7B]/12 border border-[#FF2F7B]/20 text-[#FF2F7B]">{g.frequency}</span>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-5">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">HAIR GROWTH TIPS</h3>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {data.hairGrowthTips?.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{background:'linear-gradient(135deg,#7B2FFF,#2F6FFF)'}}>{i+1}</span>
              <span className="text-sm text-white/70">{tip}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
