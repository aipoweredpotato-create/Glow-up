export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050510]" />
      <div className="absolute orb-1" style={{top:'-10%',left:'-5%',width:'50%',height:'50%',background:'radial-gradient(circle, rgba(123,47,255,0.35) 0%, transparent 70%)',filter:'blur(60px)'}} />
      <div className="absolute orb-2" style={{bottom:'-10%',right:'-5%',width:'45%',height:'55%',background:'radial-gradient(circle, rgba(47,111,255,0.3) 0%, transparent 70%)',filter:'blur(60px)'}} />
      <div className="absolute orb-3" style={{top:'20%',right:'10%',width:'35%',height:'40%',background:'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',filter:'blur(60px)'}} />
      <div className="absolute orb-4" style={{bottom:'20%',left:'5%',width:'40%',height:'45%',background:'radial-gradient(circle, rgba(255,47,123,0.2) 0%, transparent 70%)',filter:'blur(60px)'}} />
    </div>
  )
}
