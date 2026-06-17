'use client'
import { useState } from 'react'
import { GlowUpPlan } from '@/types/plan'
import GlassCard from '@/components/GlassCard'

interface Props { data: GlowUpPlan['recipes'] }

const CAT_COLORS: Record<string, string> = {
  breakfast: '#FFB347',
  lunch: '#2F6FFF',
  dinner: '#7B2FFF',
  snack: '#00D4FF',
}

function RecipeCard({ recipe, index }: { recipe: GlowUpPlan['recipes'][0]; index: number }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLORS[recipe.category] ?? '#7B2FFF'
  return (
    <GlassCard className="overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full p-5 text-left">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <p className="text-sm font-bold text-white/95">{recipe.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full capitalize font-medium" style={{background:`${color}20`,color}}>{recipe.category}</span>
              <span className="text-xs text-white/35">⏱ {recipe.prepTime}</span>
            </div>
          </div>
          <span className="text-white/35 text-sm">{open ? '▲' : '▼'}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-white/55">🔥 {recipe.calories} kcal</span>
          {[
            {l:'P',v:recipe.macros?.protein,c:'#7B2FFF'},
            {l:'C',v:recipe.macros?.carbs,c:'#2F6FFF'},
            {l:'F',v:recipe.macros?.fat,c:'#FFB347'},
          ].map(({l,v,c}) => (
            <span key={l} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{background:`${c}20`,color:c}}>{l}: {v}g</span>
          ))}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
          <div>
            <h4 className="text-[10px] font-bold text-white/35 tracking-widest mb-2">INGREDIENTS</h4>
            <ul className="space-y-1">
              {recipe.ingredients?.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-white/35 tracking-widest mb-2">INSTRUCTIONS</h4>
            <ol className="space-y-2">
              {recipe.instructions?.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                  <span className="w-5 h-5 rounded-full bg-[#2F6FFF]/25 text-[#2F6FFF] flex items-center justify-center text-[11px] font-bold shrink-0">{i+1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          {recipe.glowUpTip && (
            <div className="p-3 rounded-xl border border-[#7B2FFF]/20 bg-[#7B2FFF]/08">
              <span className="text-xs font-bold text-[#7B2FFF]">✦ Glow-Up Tip: </span>
              <span className="text-xs text-white/60">{recipe.glowUpTip}</span>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  )
}

export default function RecipesSection({ data }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Recipe Book</h2>
        <p className="text-white/45 text-sm mt-1">High-protein, glow-up approved meals</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {data?.map((recipe, i) => <RecipeCard key={i} recipe={recipe} index={i} />)}
      </div>
    </div>
  )
}
