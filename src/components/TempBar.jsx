
export default function TempBar({ min, max, current, scaleMin = -10, scaleMax = 40 }) {
  const clamp = (v) => Math.min(1, Math.max(0, (v - scaleMin) / (scaleMax - scaleMin)))
  const minPct = clamp(min) * 100
  const maxPct = clamp(max) * 100
  const curPct = clamp(current) * 100

  return (
    <div className="w-full">
      <div className="relative h-1.5 rounded-full bg-hairline/70">
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-steel to-coral"
          style={{ left: `${minPct}%`, width: `${Math.max(2, maxPct - minPct)}%` }}
        />
        <div
          className="absolute -top-1 w-3.5 h-3.5 rounded-full bg-ink border-2 border-station shadow-card"
          style={{ left: `calc(${curPct}% - 7px)` }}
          title={`Actuellement ${Math.round(current)}°`}
        />
      </div>
      <div className="flex justify-between mt-1.5 font-mono text-xs text-inkmuted">
        <span>{Math.round(min)}°</span>
        <span>{Math.round(max)}°</span>
      </div>
    </div>
  )
}
