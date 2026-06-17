'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['progress'] }

export default function ProgressSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Progress Tracking</h2>
        <p className="text-white/45 text-sm mt-1">Milestone roadmap &amp; metrics system</p>
      </div>
      <GlassCard className="p-6">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-5">📅 MONTHLY MILESTONES</h3>
        <div className="relative pl-8">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/[0.08]" />
          <div className="space-y-5">
            {data.monthlyMilestones?.map((m, i) => (
              <div key={i} className="relative flex gap-4">
                <div className="absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-lg" style={{background:'linear-gradient(135deg,#7B2FFF,#2F6FFF)'}}>{m.month}</div>
                <div className="flex-1 bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                  <div className="mb-2">
                    <h4 className="text-[10px] text-white/30 font-semibold">TARGETS</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {m.targets?.map((t, j) => <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-[#7B2FFF]/15 text-[#7B2FFF]">{t}</span>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-white/30 font-semibold">ASSESSMENTS</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {m.assessments?.map((a, j) => <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-white/55">{a}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
      <GlassCard className="overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold">📊 METRICS TO TRACK</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Metric','Baseline','Target','Method'].map(h => (
                  <th key={h} className="text-left text-[10px] tracking-widest text-white/30 font-semibold px-5 py-3">{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.metrics?.map((m, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0">
                  <td className="px-5 py-3 text-sm font-semibold text-white/90">{m.metric}</td>
                  <td className="px-5 py-3 text-sm text-white/55">{m.baseline}</td>
                  <td className="px-5 py-3 text-sm font-bold text-[#7B2FFF]">{m.target}</td>
                  <td className="px-5 py-3 text-xs text-white/40">{m.trackingMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">📸 PHOTO GUIDE</h3>
          <div className="space-y-2">
            {data.photos?.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <p className="text-sm text-white/75">{p}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">🧠 MINDSET CUES</h3>
          <div className="space-y-2.5">
            {data.mindsetCues?.map((cue, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-[#7B2FFF]/12" style={{background:'linear-gradient(135deg,rgba(123,47,255,0.08),rgba(47,111,255,0.08))'}}>
                <span className="text-[#7B2FFF] font-bold text-lg leading-none mt-0.5">"</span>
                <span className="text-sm text-white/75 italic">{cue}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      {data.weeklyCheckIns?.length > 0 && (
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">WEEKLY CHECK-INS</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {data.weeklyCheckIns.map((c, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F6FFF] shrink-0" />
                <span className="text-sm text-white/65">{c}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}
