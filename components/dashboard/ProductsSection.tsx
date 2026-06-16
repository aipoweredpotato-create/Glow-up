'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['products'] }

export default function ProductsSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <p className="text-white/45 text-sm mt-1">Recommended skincare, supplements &amp; tools</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">✨ SKINCARE</h3>
          <div className="space-y-3">
            {data.skincare?.map((p, i) => (
              <div key={i} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{p.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00D4FF]/15 text-[#00D4FF] shrink-0">{p.timing}</span>
                </div>
                <p className="text-xs text-white/45 mb-1">{p.purpose}</p>
                <p className="text-xs text-white/30">{p.howToUse}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">💊 SUPPLEMENTS</h3>
          <div className="space-y-3">
            {data.supplements?.map((s, i) => (
              <div key={i} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{s.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7B2FFF]/15 text-[#7B2FFF] shrink-0">{s.dosage}</span>
                </div>
                <p className="text-xs text-white/45 mb-1">{s.timing}</p>
                <p className="text-xs text-white/30">{s.benefit}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">🛠️ TOOLS</h3>
          <div className="space-y-3">
            {data.tools?.map((t, i) => (
              <div key={i} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                <p className="text-sm font-semibold text-white mb-1">{t.name}</p>
                <p className="text-xs text-white/45">{t.use}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
