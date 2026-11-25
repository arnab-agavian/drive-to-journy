let locationRequest

export function getVisitorLocation() {
  if (locationRequest) return locationRequest

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const locale = new Intl.Locale(navigator.language)
  const countryCode = locale.region
  const country = countryCode
    ? new Intl.DisplayNames([navigator.language], { type: 'region' }).of(countryCode)
    : undefined
  const fallbackLocation = {
    ...(country ? { country } : {}),
    ...(countryCode ? { countryCode } : {}),
    timezone,
  }

  if (!navigator.geolocation) {
    locationRequest = Promise.resolve(fallbackLocation)
    return locationRequest
  }

  locationRequest = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
          ...fallbackLocation,
          timezone,
        })
      },
      () => resolve(fallbackLocation),
      {
        enableHighAccuracy: false,
        maximumAge: 10 * 60 * 1000,
        timeout: 3000,
      },
    )
  })

  return locationRequest
}
