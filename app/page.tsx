'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AUTHORIZED_NAMES } from '@/lib/constants'
import MeshBackground from '@/components/MeshBackground'

export default function NameGatePage() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    const ok = AUTHORIZED_NAMES.some(n => n.toLowerCase() === trimmed.toLowerCase())
    if (!ok) {
      setError('Access denied. Name not recognized.')
      setShaking(true)
      setTimeout(() => setShaking(false), 450)
      return
    }
    setLoading(true)
    sessionStorage.setItem('glowup_user', trimmed)
    router.push('/questionnaire')
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MeshBackground />
      <div className={`w-full max-w-sm px-4 animate-slide-up ${shaking ? 'animate-shake' : ''}`}>
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.4em] text-white/25 mb-3 font-semibold">✦ GLOW-UP</p>
          <h1 className="text-4xl font-bold gradient-text">Access Portal</h1>
          <p className="text-white/45 mt-2 text-sm">Your AI transformation blueprint awaits</p>
        </div>

        <div className="glass-strong p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-white/35 font-semibold mb-2">YOUR NAME</label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setError('') }}
                placeholder="Enter authorized name..."
                className="w-full bg-white/[0.07] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-white placeholder:text-white/25 outline-none focus:border-[#7B2FFF]/60 focus:bg-white/[0.1] transition-all text-sm"
                autoFocus
              />
              {error && <p className="text-[#FF2F7B] text-xs mt-2 font-medium">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="w-full gradient-btn rounded-2xl py-3.5 text-white font-semibold text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
                    Verifying...
                  </span>
                : 'Unlock Dashboard →'
              }
            </button>
          </form>
        </div>
        <p className="text-center text-white/15 text-xs mt-6">Authorized access only</p>
      </div>
    </main>
  )
}
