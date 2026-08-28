import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import UserService from '../routes/userServiceRoutes'
import PlanterService from '../routes/planterServiceRoutes'

const AllUserMap = () => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [locations, setLocations] = useState([]);
  const [prices, setPrices] = useState([]);

  // Fetch data
  useEffect(() => {
    UserService.getLocations().then((res) => {
      setLocations(res.data.locations)
    })
  }, [])

  useEffect(() => {
    PlanterService.getAllPrices().then((res) => {
      setPrices(res.data.results);
    })
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([7.8731, 80.7718], 7.3)

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current)

      // ✅ Legend (add this right after tileLayer.addTo(mapInstanceRef.current))
      const legend = L.control({ position: 'bottomright' })

      legend.onAdd = function () {
        const div = L.DomUtil.create('div')

        div.innerHTML = `
          <div style="
            background:#0f1a13;
            padding:10px 12px;
            border-radius:10px;
            border:1px solid #1f3d2b;
            color:#e5e7eb;
            font-size:13px;
            box-shadow:0 0 8px rgba(0,0,0,0.5);
          ">
            <strong style="color:#9ae6b4;">User Roles</strong><br/>
            <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">
              <span style="width:12px; height:12px; background:#4ade80; border-radius:50%; display:inline-block;"></span>
              Planter
            </div>
            <div style="margin-top:4px; display:flex; align-items:center; gap:8px;">
              <span style="width:12px; height:12px; background:#3b82f6; border-radius:50%; display:inline-block;"></span>
              AgriOfficer
            </div>
            <div style="margin-top:4px; display:flex; align-items:center; gap:8px;">
              <span style="width:12px; height:12px; background:#a7c5b0; border-radius:50%; display:inline-block;"></span>
              Other Users
            </div>
          </div>
        `

        return div
      }

      legend.addTo(mapInstanceRef.current)
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
    
    // Open Google Maps directions from current location
    const openGoogleDirections = (lat, lng) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, "_blank");
    };

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

        // get this user's prices
        const userPrices = prices.filter(p => p.user_id === loc.user_id)


        // build price HTML
        let priceHtml = ''

        if (userPrices.length) {
          userPrices.forEach(p => {
            priceHtml += `
              <div style="margin-top:4px;">
                🥥 ${p.coconut_type} : <strong>${p.unit_price}</strong>
              </div>
            `
          })
        } else {
          priceHtml = `<div style="margin-top:4px; opacity:0.6;">No prices available</div>`
        }

        const markerId = `dir-${loc.user_id}-${loc.latitude}-${loc.longitude}`;

        circle.on('popupopen', () => {
          const btn = document.getElementById(markerId);
          if (btn) {
            btn.onclick = () => openGoogleDirections(loc.latitude, loc.longitude);
          }
        });

        circle.bindPopup(
          `<div style="background:#111f16; color:${color}; border:1px solid ${color}; padding:8px; border-radius:6px; min-width:180px;">
            <strong>${loc.first_name.toUpperCase()} ${loc.last_name.toUpperCase()}</strong><br/>
            Role: ${loc.role}
            ${priceHtml}

            <div style="margin-top:8px; text-align:center;">
              <button
                id="${markerId}"
                style="
                  background:#22c55e;
                  border:none;
                  padding:6px 10px;
                  border-radius:6px;
                  font-weight:600;
                  cursor:pointer;
                  color:white;
                "
              >
                🗺️ Directions in Google Maps
              </button>
            </div>
          </div>`
        );
      }
    })
  }, [locations])

  return (
    <div className="h-[450px] w-full">
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