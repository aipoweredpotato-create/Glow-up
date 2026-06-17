'use client'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['schedule'] }
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function ScheduleSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Daily Schedule</h2>
        <p className="text-white/45 text-sm mt-1">Optimized daily &amp; weekly structure</p>
      </div>
      <GlassCard className="p-6">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-5">DAILY TIMELINE</h3>
        <div>
          {data.dailyRoutine?.map((item, i) => (
            <div key={i} className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[#7B2FFF]/15 border border-[#7B2FFF]/35 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#7B2FFF]" />
                </div>
                {i < (data.dailyRoutine?.length ?? 0) - 1 && <div className="w-px flex-1 bg-white/[0.06] my-1" />}
              </div>
              <div className="pb-4 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-0.5">
                  <span className="text-[#7B2FFF] text-sm font-bold shrink-0">{item.time}</span>
                  <span className="text-white font-medium text-sm">{item.activity}</span>
                  <span className="text-white/30 text-xs ml-auto shrink-0">{item.duration}</span>
                </div>
                {item.notes && <p className="text-white/35 text-xs">{item.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">WEEKLY STRUCTURE</h3>
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day, i) => (
            <div key={day} className="text-center">
              <div className="text-[10px] text-white/30 mb-2 font-semibold">{day}</div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-2 min-h-[56px] flex items-center justify-center">
                <p className="text-white/55 text-[11px] leading-tight">{data.weeklyStructure?.[i] ?? '—'}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-6">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">☀️ MORNING RITUAL</h3>
          <ol className="space-y-2">
            {data.morningRitual?.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#7B2FFF]/20 border border-[#7B2FFF]/35 text-[#7B2FFF] text-xs flex items-center justify-center font-bold shrink-0">{i+1}</span>
                <span className="text-white/65 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">🌙 EVENING RITUAL</h3>
          <ol className="space-y-2">
            {data.eveningRitual?.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#2F6FFF]/20 border border-[#2F6FFF]/35 text-[#2F6FFF] text-xs flex items-center justify-center font-bold shrink-0">{i+1}</span>
                <span className="text-white/65 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </div>
    </div>
  )
}
