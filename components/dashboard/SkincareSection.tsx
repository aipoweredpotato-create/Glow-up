'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['skincare'] }

export default function SkincareSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Skincare Routine</h2>
        <p className="text-white/45 text-sm mt-1">Personalized skin optimization protocol</p>
      </div>
      <GlassCard variant="strong" className="p-4 flex flex-wrap items-center gap-4">
        <div>
          <p className="text-[10px] tracking-widest text-white/35 font-semibold">SKIN TYPE</p>
          <p className="text-white font-bold mt-0.5">{data.skinType}</p>
        </div>
        <div className="flex flex-wrap gap-2 ml-auto">
          {data.keyIngredients?.map(ing => (
            <span key={ing} className="text-xs px-2.5 py-1 rounded-full bg-[#00D4FF]/12 border border-[#00D4FF]/25 text-[#00D4FF] font-medium">{ing}</span>
          ))}
        </div>
      </GlassCard>
      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">☀️ AM ROUTINE</h3>
          <div className="space-y-2.5">
            {data.morningRoutine?.map((s) => (
              <div key={s.step} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 text-white bg-[#FFB347]/30">{s.step}</span>
                <div>
                  <p className="text-sm font-semibold text-white/90">{s.product}</p>
                  <p className="text-xs text-white/45 mt-0.5">{s.technique} · {s.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">🌙 PM ROUTINE</h3>
          <div className="space-y-2.5">
            {data.eveningRoutine?.map((s) => (
              <div key={s.step} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 text-white bg-[#7B2FFF]/30">{s.step}</span>
                <div>
                  <p className="text-sm font-semibold text-white/90">{s.product}</p>
                  <p className="text-xs text-white/45 mt-0.5">{s.technique} · {s.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard className="p-5">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">WEEKLY TREATMENTS</h3>
        <div className="space-y-2">
          {data.weeklyTreatments?.map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <span className="text-xs px-2 py-1 rounded-full bg-[#FF2F7B]/15 text-[#FF2F7B] font-semibold shrink-0">{t.frequency}</span>
              <div>
                <p className="text-sm font-semibold text-white/90">{t.treatment}</p>
                <p className="text-xs text-white/45 mt-0.5">{t.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      {data.avoid?.length > 0 && (
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">AVOID</h3>
          <div className="flex flex-wrap gap-2">
            {data.avoid.map(item => (
              <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-[#FF2F7B]/10 border border-[#FF2F7B]/20 text-[#FF2F7B]">{item}</span>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}
