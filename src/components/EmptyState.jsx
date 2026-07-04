
export default function EmptyState({ title, description, children }) {
  return (
    <div className="rounded-lg border border-dashed border-hairline bg-station/50 p-10 text-center">
      <p className="font-display font-semibold text-ink">{title}</p>
      {description && <p className="text-sm text-inkmuted mt-1.5">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
