import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  variant?: 'default' | 'strong' | 'subtle'
  hover?: boolean
  animated?: boolean
}

export default function GlassCard({ children, className = '', variant = 'default', hover = false }: Props) {
  const base =
    variant === 'strong' ? 'glass-strong' :
    variant === 'subtle' ? 'bg-white/[0.03] border border-white/[0.06] rounded-2xl relative' :
    'glass'
  const hoverCls = hover ? ' hover:scale-[1.01] transition-all duration-200 cursor-pointer' : ''
  return (
    <div className={`${base}${hoverCls} ${className}`}>
      {children}
    </div>
  )
}
