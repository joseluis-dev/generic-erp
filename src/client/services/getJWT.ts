export const getAuth = (): string | null => {
  if (typeof window !== 'undefined') {
    const jwt = window.localStorage.getItem('security-token')
    return `Bearer ${jwt ?? ''}`
  }
  return null
}

export const getOrgAuth = (): string | null => {
  if (typeof window !== 'undefined') {
    const jwt = window.localStorage.getItem('organization-token')
    return `Bearer ${jwt ?? ''}`
  }
  return null
}

export const getJWT = (): string | null => {
  if (typeof window !== 'undefined') {
    const jwt = window.localStorage.getItem('security-token')
    return jwt
  }
  return null
}

export const getOrgJWT = (): string | null => {
  if (typeof window !== 'undefined') {
    const jwt = window.localStorage.getItem('organization-token')
    return jwt
  }
  return null
}
