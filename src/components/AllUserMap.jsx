import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import UserService from '../routes/userServiceRoutes'

const AllUserMap = () => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [locations, setLocations] = useState([])

  // Fetch data
  useEffect(() => {
    UserService.getLocations().then((res) => {
      setLocations(res.data.locations)
    })
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([7.8731, 80.7718], 7.5)

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current)
    }
  }, [])

  // Add markers
  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Remove old markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        mapInstanceRef.current.removeLayer(layer)
      }
    })

    locations.forEach((loc) => {
      if (loc.latitude && loc.longitude) {
        // Blue for AgriOfficer, Green for Planter
        const color =
          loc.role === 'Planter'
            ? '#4ade80' // green
            : loc.role === 'AgriOfficer'
            ? '#3b82f6' // blue
            : '#a7c5b0' // muted for others

        const circle = L.circleMarker([loc.latitude, loc.longitude], {
          radius: 6, // smaller size
          color: color,
          fillColor: color,
          fillOpacity: 0.8,
          weight: 1.5,
          className: 'subtle-glow',
        }).addTo(mapInstanceRef.current)

        circle.bindPopup(
          `<div style="background:#111f16; color:${color}; border:1px solid ${color}; padding:6px; border-radius:6px;">
            <strong>${loc.first_name} ${loc.last_name}</strong><br/>
            Role: ${loc.role}<br/>
            ${loc.email || ''}
          </div>`
        )
      }
    })
  }, [locations])

  return (
    <div className="h-[700px] w-full">
      <div
        ref={mapRef}
        className="h-full w-full rounded-xl overflow-hidden border border-green-900"
      ></div>

      {/* Subtle glow effect */}
      <style>{`
        .subtle-glow {
          filter: drop-shadow(0 0 3px rgba(255,255,255,0.3));
        }
      `}</style>
    </div>
  )
}

export default AllUserMap