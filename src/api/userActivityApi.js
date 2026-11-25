const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

export async function postUserActivity(payload) {
  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured')
  }

  const response = await fetch(`${apiBaseUrl}/user-activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Activity request failed with status ${response.status}`)
  }

  if (response.status === 204) return null

  const contentType = response.headers.get('content-type')
  return contentType?.includes('application/json') ? response.json() : response.text()
}
