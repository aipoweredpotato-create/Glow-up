export default function LoadingOrb({ text = 'Generating your blueprint...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-[#7B2FFF]/20 border-t-[#7B2FFF] animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border-2 border-[#2F6FFF]/20 border-b-[#2F6FFF] animate-spin-slow" style={{animationDirection:'reverse',animationDuration:'5s'}} />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] animate-pulse-glow" />
      </div>
      <p className="mt-5 text-white/35 text-sm">{text}</p>
    </div>
  )
}
