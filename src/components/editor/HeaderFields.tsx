import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import { useCVStore } from '../../store/cvStore'
import type { CVDocument, SocialType } from '../../types/cv'

function isHeaderFilled(cv: CVDocument): boolean {
  const nameFilled = cv.name.trim().length > 0 && cv.name !== 'YOUR FULL NAME'
  const photoFilled = !!cv.photoBase64
  const socialsFilled = cv.socials.some((s) => s.value.trim())
  return nameFilled || photoFilled || socialsFilled
}

function headerSummary(cv: CVDocument): string {
  const parts: string[] = []
  if (cv.name.trim()) parts.push(cv.name)
  if (cv.showIITLogo) parts.push('IIT Logo')
  if (cv.photoBase64) parts.push('Photo')
  const filledSocials = cv.socials.filter((s) => s.value.trim()).length
  if (filledSocials > 0) parts.push(`${filledSocials} link${filledSocials > 1 ? 's' : ''}`)
  return parts.join(' · ') || 'Header'
}

export function HeaderFields() {
  const { cv, setName, setPhoto, setShowIITLogo, updateSocial, addSocial, removeSocial } =
    useCVStore()
  const filled = isHeaderFilled(cv)
  const [collapsed, setCollapsed] = useState(filled)
  const prevFilled = useRef(filled)

  useEffect(() => {
    if (filled && !prevFilled.current) {
      setCollapsed(true)
    }
    prevFilled.current = filled
  }, [filled])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const socialLabels: Record<SocialType, string> = {
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    website: 'Website',
    custom: 'Custom Link',
  }

  const existingTypes = new Set(cv.socials.map((s) => s.type))

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shrink-0">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
      >
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wide flex-1">
          Header
        </span>
        {collapsed && filled && (
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{headerSummary(cv)}</span>
        )}
        {collapsed ? <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 shrink-0" /> : <ChevronUp size={16} className="text-gray-500 dark:text-gray-400 shrink-0" />}
      </button>

      {!collapsed && (
        <div className="space-y-4 px-4 pb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              value={cv.name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2 text-sm uppercase"
              placeholder="YOUR FULL NAME"
            />
          </div>

          <div className="flex items-center justify-between gap-3 py-1">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">
                IIT Delhi Logo
              </label>
              <p className="text-xs text-gray-500">Show official logo on page 1 (top-left)</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={cv.showIITLogo ?? true}
              onClick={() => setShowIITLogo(!(cv.showIITLogo ?? true))}
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors ${
                cv.showIITLogo ?? true ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  cv.showIITLogo ?? true ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">CV Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full text-sm"
            />
            {cv.photoBase64 && (
              <button
                type="button"
                onClick={() => setPhoto(undefined)}
                className="flex items-center gap-1 text-xs text-red-600 mt-1 hover:underline"
              >
                <Trash2 size={12} /> Remove photo
              </button>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-600">Social Links</label>
            {cv.socials.map((social) => (
              <div key={social.id} className="flex gap-2 items-start">
                <span className="text-xs text-gray-500 w-20 pt-2 shrink-0">
                  {socialLabels[social.type]}
                </span>
                {social.type === 'custom' && (
                  <input
                    type="text"
                    value={social.label ?? ''}
                    onChange={(e) => updateSocial(social.id, social.value, e.target.value)}
                    placeholder="Label"
                    className="w-24 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-1.5 text-xs"
                  />
                )}
                <input
                  type="text"
                  value={social.value}
                  onChange={(e) => updateSocial(social.id, e.target.value, social.label)}
                  placeholder={
                    social.type === 'email'
                      ? 'email@example.com'
                      : social.type === 'custom'
                        ? 'URL or value'
                        : 'profile URL'
                  }
                  className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeSocial(social.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  title="Remove link"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {!existingTypes.has('email') && (
                <button
                  type="button"
                  onClick={() => addSocial('email')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <Plus size={12} /> Email
                </button>
              )}
              {!existingTypes.has('linkedin') && (
                <button
                  type="button"
                  onClick={() => addSocial('linkedin')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <Plus size={12} /> LinkedIn
                </button>
              )}
              {!existingTypes.has('github') && (
                <button
                  type="button"
                  onClick={() => addSocial('github')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <Plus size={12} /> GitHub
                </button>
              )}
              {!existingTypes.has('website') && (
                <button
                  type="button"
                  onClick={() => addSocial('website')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <Plus size={12} /> Website
                </button>
              )}
              <button
                type="button"
                onClick={() => addSocial('custom')}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
              >
                <Plus size={12} /> Custom link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
