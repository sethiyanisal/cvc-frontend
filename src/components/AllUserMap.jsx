import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import UserService from '../routes/userServiceRoutes'

const AllUserMap = () => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [locations, setLocations] = useState([])

  // 👉 Fetch data from DB
  useEffect(() => {
    UserService.
    getLocations()
    .then((res) =>{
      setLocations(res.data.locations);
    })
  }, [])

  // 👉 Initialize map
  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([7.8731, 80.7718], 9)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstanceRef.current)
    }
  }, [])

  // 👉 Add markers when data loads
  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Optional: clear old markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer)
      }
    })

    // 👉 Add markers
    locations.forEach((loc) => {
      if (loc.latitude && loc.longitude) {
        L.marker([loc.latitude, loc.longitude])
          .addTo(mapInstanceRef.current)
          .bindPopup(`User ID: ${loc.first_name}`)
      }
    })
  }, [locations])

  return (
    <div className="h-[700px] w-full">
      <div ref={mapRef} className="h-full w-full"></div>
    </div>
  )
}

export default AllUserMap