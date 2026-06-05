export function SponsoredBanner() {
  return (
    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 text-sm">
      <span className="shrink-0 font-semibold text-amber-700 uppercase tracking-wide text-xs">Sponsored</span>
      <span className="text-amber-800">
        This post contains sponsored content. All opinions remain my own.
      </span>
    </div>
  );
}
