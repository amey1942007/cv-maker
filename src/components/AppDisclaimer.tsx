import { APP_COPYRIGHT, APP_DISCLAIMER, MIT_NOTICE } from '../lib/legalDisclaimer'

export function AppDisclaimer() {
  return (
    <footer className="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-2.5">
      <p className="text-[10px] leading-snug text-gray-600 text-center max-w-5xl mx-auto">
        <strong>Disclaimer:</strong> {APP_DISCLAIMER}
      </p>
      <p className="text-[10px] text-gray-500 text-center mt-1">
        {APP_COPYRIGHT} {MIT_NOTICE}
      </p>
    </footer>
  )
}
