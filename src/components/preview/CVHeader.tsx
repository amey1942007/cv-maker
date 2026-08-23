import type { SocialLink } from '../../types/cv'

interface CVHeaderProps {
  name: string
  photoBase64?: string
  socials: SocialLink[]
  showIITLogo?: boolean
  showHeader?: boolean
}

function formatSocial(link: SocialLink): string {
  switch (link.type) {
    case 'email':
      return link.value.includes('@') ? link.value : `Email: ${link.value}`
    case 'linkedin':
      return link.value.startsWith('http') ? link.value : `LinkedIn: ${link.value}`
    case 'github':
      return link.value.startsWith('http') ? link.value : `GitHub: ${link.value}`
    case 'website':
      return link.value.startsWith('http') ? link.value : link.value
    case 'custom':
      return link.label ? `${link.label}: ${link.value}` : link.value
    default:
      return link.value
  }
}

export function CVHeader({
  name,
  photoBase64,
  socials,
  showIITLogo = true,
  showHeader = true,
}: CVHeaderProps) {
  if (!showHeader) {
    return (
      <div className="cv-block">
        <div className="cv-name">{name}</div>
      </div>
    )
  }

  const visibleSocials = socials.filter((s) => s.value.trim())

  return (
    <div className="cv-header-row">
      <div className="cv-header-logo">
        {showIITLogo ? (
          <img
            src={`${import.meta.env.BASE_URL}iit-delhi-logo.png`}
            alt="IIT Delhi"
            className="cv-logo"
          />
        ) : (
          <div className="cv-logo-spacer" aria-hidden="true" />
        )}
      </div>

      <div className="cv-header-center">
        <div className="cv-name">{name}</div>
        {visibleSocials.length > 0 && (
          <div className="cv-socials">
            {visibleSocials.map((link, i) => (
              <span key={link.id}>
                {i > 0 && ' | '}
                {link.type === 'email' && !link.value.startsWith('http') ? (
                  <a href={`mailto:${link.value}`}>{formatSocial(link)}</a>
                ) : link.value.startsWith('http') ? (
                  <a href={link.value} target="_blank" rel="noreferrer">
                    {formatSocial(link)}
                  </a>
                ) : (
                  formatSocial(link)
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="cv-header-photo">
        {photoBase64 ? (
          <img src={photoBase64} alt="Profile" className="cv-photo" />
        ) : (
          <div className="cv-photo-placeholder">Photo</div>
        )}
      </div>
    </div>
  )
}
