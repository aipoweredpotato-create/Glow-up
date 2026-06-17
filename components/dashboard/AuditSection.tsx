'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['audit'] }

export default function AuditSection({ data }: Props) {
  const stats = [
    { label: 'BMI', value: String(data.bmi ?? '—'), sub: data.bmiCategory, color: '#00D4FF' },
    { label: 'Maintenance Cal', value: data.maintenanceCalories?.toLocaleString() ?? '—', sub: 'kcal / day', color: '#7B2FFF' },
    { label: 'Target Calories', value: data.targetCalories?.toLocaleString() ?? '—', sub: 'kcal / day', color: '#2F6FFF' },
    { label: 'Protein Target', value: data.proteinTarget ?? '—', sub: 'daily goal', color: '#FF2F7B' },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Body Audit</h2>
        <p className="text-white/45 text-sm mt-1">Baseline analysis &amp; key metrics</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <GlassCard key={s.label} variant="strong" className="p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-[2px] rounded-full" style={{background:s.color}} />
            <p className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-2 pl-3">{s.label.toUpperCase()}</p>
            <p className="text-3xl font-bold text-white pl-3">{s.value}</p>
            <p className="text-white/40 text-xs mt-1 pl-3">{s.sub}</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-6">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">KEY INSIGHTS</h3>
          <ul className="space-y-3">
            {data.keyInsights?.map((insight, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{background:'linear-gradient(to right,#7B2FFF,#00D4FF)'}} />
                <span className="text-white/65 text-sm leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">PRIORITY AREAS</h3>
          <div className="space-y-2">
            {data.priorityAreas?.map((area, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.04] rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{background:i===0?'#7B2FFF':i===1?'#2F6FFF':'#00D4FF'}}>
                  {i+1}
                </span>
                <span className="text-white/75 text-sm">{area}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
            <p className="text-[10px] text-white/30 font-medium">BODY FAT CATEGORY</p>
            <p className="text-white text-sm font-semibold mt-1">{data.bodyFatCategory}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
