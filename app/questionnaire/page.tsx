'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MeshBackground from '@/components/MeshBackground'

const GOALS = ['Hypertrophy', 'Lean Out', 'Aesthetics', 'Strength', 'Endurance', 'Athletic Performance']
const EQUIPMENT = ['Barbell', 'Dumbbells', 'Cables', 'Machines', 'Resistance Bands', 'Pull-up Bar', 'Bodyweight Only', 'Full Gym Access']

interface FormData {
  age: string
  heightFt: string
  heightIn: string
  weightLbs: string
  bodyFat: string
  goals: string[]
  equipment: string[]
  daysPerWeek: number
  sessionDuration: number
  wakeTime: string
  sleepTime: string
}

export default function QuestionnairePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('User')
  const [form, setForm] = useState<FormData>({
    age: '', heightFt: '5', heightIn: '10', weightLbs: '', bodyFat: '',
    goals: [], equipment: [], daysPerWeek: 4, sessionDuration: 60,
    wakeTime: '07:00', sleepTime: '23:00',
  })

  useEffect(() => {
    const stored = sessionStorage.getItem('glowup_user')
    if (!stored) { router.push('/'); return }
    setName(stored)
  }, [router])

  const toggle = (field: 'goals' | 'equipment', val: string) =>
    setForm(f => ({ ...f, [field]: f[field].includes(val) ? f[field].filter((x: string) => x !== val) : [...f[field], val] }))

  const canProceed = () => {
    if (step === 1) return form.age && form.weightLbs && form.bodyFat
    if (step === 2) return form.goals.length > 0
    if (step === 3) return form.equipment.length > 0
    return true
  }

  const handleGenerate = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, ...form }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      sessionStorage.setItem('glowup_plan', JSON.stringify(data.plan))
      router.push('/dashboard')
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Generation failed'
      setError(msg)
      setLoading(false)
    }
  }

  const pillClass = (active: boolean, color = 'purple') =>
    `p-3 rounded-xl text-sm font-medium border transition-all text-left ${
      active
        ? color === 'blue'
          ? 'border-[#2F6FFF] bg-[#2F6FFF]/20 text-white'
          : 'border-[#7B2FFF] bg-[#7B2FFF]/20 text-white'
        : 'border-white/10 bg-white/[0.05] text-white/55 hover:bg-white/[0.09] hover:text-white/80'
    }`

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      <MeshBackground />
      <div className="w-full max-w-md px-4">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-white/35 mb-2">
            <span>Step {step} of 5</span>
            <span>{Math.round((step/5)*100)}% complete</span>
          </div>
          <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(step/5)*100}%`, background: 'linear-gradient(90deg,#7B2FFF,#00D4FF)' }} />
          </div>
        </div>

        <div className="glass-strong p-8">
          {step === 1 && (
            <div className="animate-slide-up space-y-4">
              <div><h2 className="text-2xl font-bold">Basic Info</h2><p className="text-white/45 text-sm mt-0.5">Your baseline metrics</p></div>
              {[{label:'AGE',key:'age',placeholder:'25',type:'number'},{label:'WEIGHT (LBS)',key:'weightLbs',placeholder:'175',type:'number'},{label:'BODY FAT %',key:'bodyFat',placeholder:'18',type:'number'}].map(f => (
                <div key={f.key}>
                  <label className="block text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as Record<string, string | number | string[]>)[f.key] as string}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full bg-white/[0.07] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#7B2FFF]/60 transition-all text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-1.5">HEIGHT</label>
                <div className="flex gap-2">
                  <input type="number" value={form.heightFt} onChange={e => setForm(f=>({...f,heightFt:e.target.value}))} placeholder="5"
                    className="w-1/2 bg-white/[0.07] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#7B2FFF]/60 transition-all text-sm" />
                  <input type="number" value={form.heightIn} onChange={e => setForm(f=>({...f,heightIn:e.target.value}))} placeholder="10"
                    className="w-1/2 bg-white/[0.07] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#7B2FFF]/60 transition-all text-sm" />
                </div>
                <p className="text-white/25 text-xs mt-1">Feet &amp; Inches</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slide-up">
              <div className="mb-5"><h2 className="text-2xl font-bold">Your Goals</h2><p className="text-white/45 text-sm mt-0.5">Select all that apply</p></div>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map(g => (
                  <button key={g} onClick={() => toggle('goals', g)} className={pillClass(form.goals.includes(g))}>
                    {form.goals.includes(g) && <span className="mr-1.5">✓</span>}{g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-slide-up">
              <div className="mb-5"><h2 className="text-2xl font-bold">Equipment</h2><p className="text-white/45 text-sm mt-0.5">What do you have access to?</p></div>
              <div className="grid grid-cols-2 gap-2">
                {EQUIPMENT.map(e => (
                  <button key={e} onClick={() => toggle('equipment', e)} className={pillClass(form.equipment.includes(e), 'blue')}>
                    {form.equipment.includes(e) && <span className="mr-1.5">✓</span>}{e}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-slide-up space-y-5">
              <div><h2 className="text-2xl font-bold">Schedule</h2><p className="text-white/45 text-sm mt-0.5">Your daily structure</p></div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-2">
                  TRAINING DAYS — <span className="text-[#7B2FFF]">{form.daysPerWeek} days/week</span>
                </label>
                <input type="range" min="3" max="6" step="1" value={form.daysPerWeek}
                  onChange={e => setForm(f=>({...f,daysPerWeek:Number(e.target.value)}))}
                  className="w-full accent-[#7B2FFF]" />
                <div className="flex justify-between text-xs text-white/25 mt-1"><span>3 days</span><span>6 days</span></div>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-2">
                  SESSION DURATION — <span className="text-[#2F6FFF]">{form.sessionDuration} min</span>
                </label>
                <input type="range" min="30" max="120" step="15" value={form.sessionDuration}
                  onChange={e => setForm(f=>({...f,sessionDuration:Number(e.target.value)}))}
                  className="w-full accent-[#2F6FFF]" />
                <div className="flex justify-between text-xs text-white/25 mt-1"><span>30 min</span><span>2 hours</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-1.5">WAKE TIME</label>
                  <input type="time" value={form.wakeTime} onChange={e=>setForm(f=>({...f,wakeTime:e.target.value}))}
                    className="w-full bg-white/[0.07] border border-white/[0.1] rounded-xl px-3 py-3 text-white outline-none focus:border-[#7B2FFF]/60 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-1.5">SLEEP TIME</label>
                  <input type="time" value={form.sleepTime} onChange={e=>setForm(f=>({...f,sleepTime:e.target.value}))}
                    className="w-full bg-white/[0.07] border border-white/[0.1] rounded-xl px-3 py-3 text-white outline-none focus:border-[#7B2FFF]/60 transition-all text-sm" />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-slide-up">
              <div className="mb-5"><h2 className="text-2xl font-bold">Ready to Launch</h2><p className="text-white/45 text-sm mt-0.5">Review your profile</p></div>
              <div className="space-y-2 mb-5">
                {[
                  {l:'Name',v:name},{l:'Age',v:`${form.age} yrs`},{l:'Height',v:`${form.heightFt}'${form.heightIn}"`},
                  {l:'Weight',v:`${form.weightLbs} lbs`},{l:'Body Fat',v:`${form.bodyFat}%`},
                  {l:'Goals',v:form.goals.join(', ')},{l:'Equipment',v:form.equipment.join(', ')},
                  {l:'Training',v:`${form.daysPerWeek}d/wk · ${form.sessionDuration}min`},
                ].map(i => (
                  <div key={i.l} className="flex justify-between bg-white/[0.04] rounded-xl px-4 py-2.5 gap-4">
                    <span className="text-white/40 text-sm shrink-0">{i.l}</span>
                    <span className="text-white text-sm font-medium text-right truncate">{i.v}</span>
                  </div>
                ))}
              </div>
              {error && <p className="text-[#FF2F7B] text-sm mb-4">{error}</p>}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <button onClick={() => setStep(s=>s-1)}
                className="flex-1 bg-white/[0.07] border border-white/[0.1] rounded-xl py-3 text-white/65 font-medium text-sm hover:bg-white/[0.12] transition-all">
                ← Back
              </button>
            )}
            {step < 5
              ? <button onClick={() => setStep(s=>s+1)} disabled={!canProceed()}
                  className="flex-1 gradient-btn rounded-xl py-3 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue →
                </button>
              : <button onClick={handleGenerate} disabled={loading}
                  className="flex-1 gradient-btn rounded-xl py-3 text-white font-semibold text-sm disabled:opacity-50">
                  {loading
                    ? <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
                        AI Crafting Blueprint...
                      </span>
                    : '✦ Generate My Blueprint'
                  }
                </button>
            }
          </div>
        </div>
      </div>
    </main>
  )
}
