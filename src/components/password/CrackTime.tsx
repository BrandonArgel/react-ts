interface CrackTimeProps {
  time: string
}

export const CrackTime = ({ time }: CrackTimeProps) => {
  // Lógica de color semántica
  const getStatusColor = () => {
    if (time.includes('seconds') || time.includes('Instantly') || time.includes('minutes'))
      return 'text-red-500 bg-red-500/10 border-red-500/20'
    if (time.includes('hours') || time.includes('days')) return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
    if (time.includes('years') && !time.includes('centuries'))
      return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
    return 'text-success bg-success/10 border-success/20'
  }

  return (
    <div className={`mt-4 p-4 rounded-xl border transition-all ${getStatusColor()}`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Time to Crack (2025 Est.)</span>
          <span className="text-xl font-black tracking-tight mt-1">{time}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] block font-mono opacity-60">Brute Force Rate:</span>
          <span className="text-[10px] font-bold">100B / sec</span>
        </div>
      </div>
    </div>
  )
}
