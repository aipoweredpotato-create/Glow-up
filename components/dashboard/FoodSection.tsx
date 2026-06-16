'use client'
import { GlowUpPlan, Meal } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['food'] }

const MEAL_CONFIG = [
  { key: 'breakfast',    label: 'Breakfast',       icon: '🌅', color: '#FFB347' },
  { key: 'morningSnack', label: 'Morning Snack',   icon: '🍎', color: '#00D4FF' },
  { key: 'lunch',        label: 'Lunch',           icon: '🥗', color: '#2F6FFF' },
  { key: 'afternoonSnack', label: 'Afternoon Snack', icon: '🥜', color: '#7B2FFF' },
  { key: 'dinner',       label: 'Dinner',          icon: '🍽️', color: '#FF2F7B' },
] as const

function MacroBar({ label, val, total, color }: {label:string;val:number;total:number;color:string}) {
  const pct = total > 0 ? Math.round((val / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/40 w-14 shrink-0">{label}</span>
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{width:`${pct}%`,background:color}} />
      </div>
      <span className="text-xs font-semibold text-white/60 w-8 text-right">{val}g</span>
    </div>
  )
}

export default function FoodSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Nutrition Plan</h2>
        <p className="text-white/45 text-sm mt-1">Personalized daily meal protocol</p>
      </div>
      <GlassCard variant="strong" className="p-4 flex flex-wrap items-center gap-4">
        <span className="text-sm text-white/60">💧 Hydration: <span className="text-[#00D4FF] font-bold">{data.hydration}</span></span>
      </GlassCard>
      <div className="space-y-3">
        {MEAL_CONFIG.map(({ key, label, icon, color }) => {
          const meal = data.dailyMealPlan?.[key as keyof typeof data.dailyMealPlan] as Meal | undefined
          if (!meal) return null
          const { macros } = meal
          const total = (macros?.protein ?? 0) + (macros?.carbs ?? 0) + (macros?.fat ?? 0)
          return (
            <GlassCard key={key} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{label}</p>
                    <p className="text-xs text-white/45 mt-0.5">{meal.meal} · {meal.prepTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{macros?.calories ?? 0}</p>
                  <p className="text-xs text-white/35">kcal</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <MacroBar label="Protein" val={macros?.protein ?? 0} total={total} color="#7B2FFF" />
                <MacroBar label="Carbs" val={macros?.carbs ?? 0} total={total} color="#2F6FFF" />
                <MacroBar label="Fat" val={macros?.fat ?? 0} total={total} color="#FF2F7B" />
              </div>
            </GlassCard>
          )
        })}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">✅ FOODS TO EAT</h3>
          <div className="flex flex-wrap gap-2">
            {data.foodsToEat?.map(f => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-[#7B2FFF]/12 border border-[#7B2FFF]/20 text-[#7B2FFF] font-medium">{f}</span>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-3">🚫 FOODS TO AVOID</h3>
          <div className="flex flex-wrap gap-2">
            {data.foodsToAvoid?.map(f => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-[#FF2F7B]/10 border border-[#FF2F7B]/20 text-[#FF2F7B] font-medium">{f}</span>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard className="p-5">
        <h3 className="text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-4">MEAL PREP TIPS</h3>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {data.mealPrepTips?.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <span className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{background:'linear-gradient(135deg,#7B2FFF,#2F6FFF)'}}>{i+1}</span>
              <span className="text-sm text-white/65">{tip}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
