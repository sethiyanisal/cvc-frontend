import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const Map = ({ onLocationSelect }) => {
  const mapContainerRef = useRef(null)
  const markerRef = useRef(null) // 👉 store marker

  useEffect(() => {
    const map = L.map(mapContainerRef.current).setView([6.9271, 79.8612], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    map.on('click', (e) => {
      const { lat, lng } = e.latlng

      onLocationSelect({ lat, lng })

      // 👉 Remove previous marker if exists
      if (markerRef.current) {
        map.removeLayer(markerRef.current)
      }

      // 👉 Add new marker
      markerRef.current = L.marker([lat, lng])
        .addTo(map)
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className="h-[400px] w-full">
      <div ref={mapContainerRef} className="h-full w-full"></div>
    </div>
  )
}

export default Map