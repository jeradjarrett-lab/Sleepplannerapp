import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface TimeZoneMapProps {
  fromCity: string;
  toCity: string;
  fromOffset: number;
  toOffset: number;
}

// City coordinates lookup - comprehensive coverage for all timezones
const cityCoordinates: { [key: string]: [number, number] } = {
  // UTC-12 to UTC-11
  'Baker Island': [0.1936, -176.4769],
  'Pago Pago': [-14.2756, -170.7022],
  'Niue': [-19.0544, -169.8672],
  
  // UTC-10
  'Honolulu': [21.3099, -157.8581],
  'Rarotonga': [-21.2367, -159.7777],
  'Tahiti': [-17.6509, -149.4260],
  
  // UTC-9:30
  'Marquesas': [-9.7679, -139.0817],
  
  // UTC-9
  'Anchorage': [61.2181, -149.9003],
  'Juneau': [58.3019, -134.4197],
  'Gambier': [-23.1309, -134.9692],
  
  // UTC-8
  'Los Angeles': [34.0522, -118.2437],
  'San Francisco': [37.7749, -122.4194],
  'Seattle': [47.6062, -122.3321],
  'Vancouver': [49.2827, -123.1207],
  'Portland': [45.5152, -122.6784],
  'Las Vegas': [36.1699, -115.1398],
  'Tijuana': [32.5149, -117.0382],
  
  // UTC-7
  'Denver': [39.7392, -104.9903],
  'Phoenix': [33.4484, -112.0740],
  'Calgary': [51.0447, -114.0719],
  'Edmonton': [53.5461, -113.4938],
  'Salt Lake City': [40.7608, -111.8910],
  'Chihuahua': [28.6353, -106.0889],
  
  // UTC-6
  'Chicago': [41.8781, -87.6298],
  'Mexico City': [19.4326, -99.1332],
  'Dallas': [32.7767, -96.7970],
  'Houston': [29.7604, -95.3698],
  'Winnipeg': [49.8951, -97.1384],
  'Guatemala City': [14.6349, -90.5069],
  'San Salvador': [13.6929, -89.2182],
  'Managua': [12.1364, -86.2514],
  'San José': [9.9281, -84.0907],
  'Tegucigalpa': [14.0723, -87.1921],
  
  // UTC-5
  'New York': [40.7128, -74.0060],
  'Toronto': [43.6532, -79.3832],
  'Boston': [42.3601, -71.0589],
  'Miami': [25.7617, -80.1918],
  'Philadelphia': [39.9526, -75.1652],
  'Atlanta': [33.7490, -84.3880],
  'Washington DC': [38.9072, -77.0369],
  'Montreal': [45.5017, -73.5673],
  'Ottawa': [45.4215, -75.6972],
  'Lima': [-12.0464, -77.0428],
  'Bogotá': [4.7110, -74.0721],
  'Quito': [-0.1807, -78.4678],
  'Panama City': [8.9824, -79.5199],
  'Havana': [23.1136, -82.3666],
  'Kingston': [17.9714, -76.7931],
  
  // UTC-4
  'Santiago': [-33.4489, -70.6693],
  'Caracas': [10.4806, -66.9036],
  'La Paz': [-16.5000, -68.1500],
  'Halifax': [44.6488, -63.5752],
  'Santo Domingo': [18.4861, -69.9312],
  'San Juan': [18.4655, -66.1057],
  'Bridgetown': [13.1132, -59.6105],
  'Martinique': [14.6415, -61.0242],
  'Manaus': [-3.1190, -60.0217],
  
  // UTC-3:30
  'St. Johns': [47.5615, -52.7126],
  
  // UTC-3
  'Buenos Aires': [-34.6037, -58.3816],
  'São Paulo': [-23.5505, -46.6333],
  'Rio de Janeiro': [-22.9068, -43.1729],
  'Montevideo': [-34.9011, -56.1645],
  'Asunción': [-25.2637, -57.5759],
  'Cayenne': [4.9381, -52.3258],
  'Paramaribo': [5.8520, -55.2038],
  'Nuuk': [64.1814, -51.6941],
  
  // UTC-2
  'South Georgia': [-54.2832, -36.5082],
  'Fernando de Noronha': [-3.8549, -32.4233],
  
  // UTC-1
  'Azores': [38.7223, -27.2207],
  'Praia': [14.9331, -23.5133],
  
  // UTC+0
  'London': [51.5074, -0.1278],
  'Dublin': [53.3498, -6.2603],
  'Lisbon': [38.7223, -9.1393],
  'Reykjavik': [64.1466, -21.9426],
  'Dakar': [14.7167, -17.4677],
  'Accra': [5.6037, -0.1870],
  'Casablanca': [33.5731, -7.5898],
  
  // UTC+1
  'Paris': [48.8566, 2.3522],
  'Berlin': [52.5200, 13.4050],
  'Rome': [41.9028, 12.4964],
  'Madrid': [40.4168, -3.7038],
  'Amsterdam': [52.3676, 4.9041],
  'Brussels': [50.8503, 4.3517],
  'Vienna': [48.2082, 16.3738],
  'Prague': [50.0755, 14.4378],
  'Warsaw': [52.2297, 21.0122],
  'Budapest': [47.4979, 19.0402],
  'Stockholm': [59.3293, 18.0686],
  'Oslo': [59.9139, 10.7522],
  'Copenhagen': [55.6761, 12.5683],
  'Zurich': [47.3769, 8.5417],
  'Lagos': [6.5244, 3.3792],
  'Kinshasa': [-4.3217, 15.3125],
  'Algiers': [36.7538, 3.0588],
  'Tunis': [36.8065, 10.1815],
  
  // UTC+2
  'Athens': [37.9838, 23.7275],
  'Istanbul': [41.0082, 28.9784],
  'Cairo': [30.0444, 31.2357],
  'Jerusalem': [31.7683, 35.2137],
  'Helsinki': [60.1695, 24.9354],
  'Bucharest': [44.4268, 26.1025],
  'Kyiv': [50.4501, 30.5234],
  'Johannesburg': [-26.2041, 28.0473],
  'Cape Town': [-33.9249, 18.4241],
  'Harare': [-17.8292, 31.0522],
  'Beirut': [33.8886, 35.4955],
  'Amman': [31.9454, 35.9284],
  'Damascus': [33.5138, 36.2765],
  
  // UTC+3
  'Moscow': [55.7558, 37.6173],
  'Nairobi': [-1.2864, 36.8172],
  'Riyadh': [24.7136, 46.6753],
  'Kuwait City': [29.3759, 47.9774],
  'Baghdad': [33.3152, 44.3661],
  'Doha': [25.2854, 51.5310],
  'Manama': [26.0667, 50.5577],
  'Addis Ababa': [9.0320, 38.7469],
  'Dar es Salaam': [-6.7924, 39.2083],
  'Mogadishu': [2.0469, 45.3182],
  'Minsk': [53.9045, 27.5615],
  
  // UTC+3:30
  'Tehran': [35.6892, 51.3890],
  
  // UTC+4
  'Dubai': [25.2048, 55.2708],
  'Abu Dhabi': [24.4539, 54.3773],
  'Muscat': [23.5880, 58.3829],
  'Baku': [40.4093, 49.8671],
  'Tbilisi': [41.7151, 44.8271],
  'Yerevan': [40.1792, 44.4991],
  'Port Louis': [-20.1609, 57.5012],
  'Victoria': [-4.6191, 55.4513],
  
  // UTC+4:30
  'Kabul': [34.5553, 69.2075],
  
  // UTC+5
  'Karachi': [24.8607, 67.0011],
  'Islamabad': [33.6844, 73.0479],
  'Tashkent': [41.2995, 69.2401],
  'Malé': [4.1755, 73.5093],
  'Ashgabat': [37.9601, 58.3261],
  
  // UTC+5:30
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.7041, 77.1025],
  'Bangalore': [12.9716, 77.5946],
  'Kolkata': [22.5726, 88.3639],
  'Chennai': [13.0827, 80.2707],
  'Colombo': [6.9271, 79.8612],
  
  // UTC+5:45
  'Kathmandu': [27.7172, 85.3240],
  
  // UTC+6
  'Dhaka': [23.8103, 90.4125],
  'Almaty': [43.2220, 76.8512],
  'Thimphu': [27.4728, 89.6393],
  'Bishkek': [42.8746, 74.5698],
  
  // UTC+6:30
  'Yangon': [16.8661, 96.1951],
  'Cocos Islands': [-12.1642, 96.8710],
  
  // UTC+7
  'Bangkok': [13.7563, 100.5018],
  'Jakarta': [-6.2088, 106.8456],
  'Hanoi': [21.0285, 105.8542],
  'Ho Chi Minh City': [10.8231, 106.6297],
  'Phnom Penh': [11.5564, 104.9282],
  'Vientiane': [17.9757, 102.6331],
  
  // UTC+8
  'Singapore': [1.3521, 103.8198],
  'Hong Kong': [22.3193, 114.1694],
  'Beijing': [39.9042, 116.4074],
  'Shanghai': [31.2304, 121.4737],
  'Taipei': [25.0330, 121.5654],
  'Manila': [14.5995, 120.9842],
  'Kuala Lumpur': [3.1390, 101.6869],
  'Perth': [-31.9505, 115.8605],
  'Macau': [22.1987, 113.5439],
  'Bandar Seri Begawan': [4.9031, 114.9398],
  'Ulaanbaatar': [47.8864, 106.9057],
  
  // UTC+8:45
  'Eucla': [-31.6782, 128.8683],
  
  // UTC+9
  'Tokyo': [35.6762, 139.6503],
  'Seoul': [37.5665, 126.9780],
  'Pyongyang': [39.0392, 125.7625],
  'Dili': [-8.5569, 125.5603],
  'Palau': [7.5150, 134.5825],
  
  // UTC+9:30
  'Adelaide': [-34.9285, 138.6007],
  'Darwin': [-12.4634, 130.8456],
  
  // UTC+10
  'Sydney': [-33.8688, 151.2093],
  'Melbourne': [-37.8136, 144.9631],
  'Brisbane': [-27.4698, 153.0251],
  'Canberra': [-35.2809, 149.1300],
  'Port Moresby': [-9.4438, 147.1803],
  'Guam': [13.4443, 144.7937],
  
  // UTC+10:30
  'Lord Howe': [-31.5526, 159.0772],
  
  // UTC+11
  'Noumea': [-22.2758, 166.4580],
  'Honiara': [-9.4280, 159.9495],
  'Port Vila': [-17.7333, 168.3273],
  
  // UTC+12
  'Auckland': [-36.8485, 174.7633],
  'Wellington': [-41.2865, 174.7762],
  'Suva': [-18.1248, 178.4501],
  'Majuro': [7.1315, 171.1845],
  'Nauru': [-0.5228, 166.9315],
  'Funafuti': [-8.5211, 179.1962],
  'Wake Island': [19.2823, 166.6470],
  'Wallis and Futuna': [-13.2687, -176.1761],
  
  // UTC+12:45
  'Chatham Islands': [-43.9497, -176.5569],
  
  // UTC+13
  'Nukuʻalofa': [-21.1393, -175.2188],
  'Apia': [-13.8333, -171.7667],
  'Tokelau': [-9.1667, -171.8167],
  
  // UTC+14
  'Kiritimati': [1.8721, -157.3597],
};

export function TimeZoneMapInteractive({ fromCity, toCity, fromOffset, toOffset }: TimeZoneMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!fromCity || !toCity || !mapContainerRef.current) {
      return;
    }

    const fromCoords = cityCoordinates[fromCity];
    const toCoords = cityCoordinates[toCity];

    if (!fromCoords || !toCoords) {
      setMapError(true);
      return;
    }

    // Dynamically load Leaflet CSS and JS
    const loadLeaflet = async () => {
      try {
        // Load CSS
        if (!document.getElementById('leaflet-css')) {
          const cssLink = document.createElement('link');
          cssLink.id = 'leaflet-css';
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          cssLink.crossOrigin = '';
          document.head.appendChild(cssLink);
        }

        // Load JS
        if (!(window as any).L) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
            script.crossOrigin = '';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const L = (window as any).L;

        // Clean up existing map instance
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // Clear container
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
        }

        // Calculate bounds to fit both cities
        const bounds = L.latLngBounds([fromCoords, toCoords]);

        // Create map
        const map = L.map(mapContainerRef.current, {
          scrollWheelZoom: false,
          dragging: true,
          zoomControl: true,
          attributionControl: true,
        }).fitBounds(bounds, { padding: [50, 50] });

        // Store map instance for cleanup
        mapInstanceRef.current = map;

        // Add OpenStreetMap tiles (Mapcarta-style)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Custom icon for departure (blue)
        const departureIcon = L.divIcon({
          html: `<div style="
            background: #4f86f7;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
          ">📍</div>`,
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        // Custom icon for arrival (purple)
        const arrivalIcon = L.divIcon({
          html: `<div style="
            background: #a855f7;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
          ">📍</div>`,
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        // Add departure marker
        L.marker(fromCoords, { icon: departureIcon })
          .addTo(map)
          .bindPopup(`<strong>${fromCity}</strong><br/>Departure`);

        // Add arrival marker
        L.marker(toCoords, { icon: arrivalIcon })
          .addTo(map)
          .bindPopup(`<strong>${toCity}</strong><br/>Arrival`);

        // Draw curved flight path
        const latlngs = [
          L.latLng(fromCoords[0], fromCoords[1]),
          L.latLng(toCoords[0], toCoords[1])
        ];

        // Create curved path using quadratic bezier simulation
        const curvedPath: [number, number][] = [];
        const steps = 50;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const lat = fromCoords[0] + t * (toCoords[0] - fromCoords[0]);
          const lng = fromCoords[1] + t * (toCoords[1] - fromCoords[1]);
          
          // Add curve offset (higher in the middle)
          const curveOffset = Math.sin(t * Math.PI) * 10;
          curvedPath.push([lat + curveOffset, lng]);
        }

        // Draw the path
        L.polyline(curvedPath, {
          color: '#4f86f7',
          weight: 3,
          opacity: 0.7,
          dashArray: '10, 10',
        }).addTo(map);

        // Function to calculate bearing between two points
        const calculateBearing = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
          const dLng = (lng2 - lng1) * Math.PI / 180;
          const lat1Rad = lat1 * Math.PI / 180;
          const lat2Rad = lat2 * Math.PI / 180;
          
          const y = Math.sin(dLng) * Math.cos(lat2Rad);
          const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
                    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
          
          const bearing = Math.atan2(y, x) * 180 / Math.PI;
          return (bearing + 360) % 360;
        };

        // Function to update plane icon with rotation
        const updatePlaneIcon = (rotation: number) => {
          return L.divIcon({
            html: `<div style="
              font-size: 24px;
              transform: rotate(${rotation}deg);
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
              transition: transform 0.1s linear;
            ">✈️</div>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });
        };

        // Initial bearing
        const initialBearing = calculateBearing(
          fromCoords[0], fromCoords[1],
          toCoords[0], toCoords[1]
        );

        const planeMarker = L.marker(fromCoords, { 
          icon: updatePlaneIcon(initialBearing) 
        }).addTo(map);

        // Animate plane along path
        let step = 0;
        let animationTimeout: NodeJS.Timeout | null = null;
        
        const animatePlane = () => {
          if (step < curvedPath.length && mapInstanceRef.current) {
            // Update position
            planeMarker.setLatLng(curvedPath[step]);
            
            // Calculate rotation for next segment
            if (step < curvedPath.length - 1) {
              const currentPoint = curvedPath[step];
              const nextPoint = curvedPath[step + 1];
              const rotation = calculateBearing(
                currentPoint[0], currentPoint[1],
                nextPoint[0], nextPoint[1]
              );
              planeMarker.setIcon(updatePlaneIcon(rotation));
            }
            
            step++;
            animationTimeout = setTimeout(animatePlane, 100);
          } else if (mapInstanceRef.current) {
            // Reset animation
            step = 0;
            animationTimeout = setTimeout(animatePlane, 2000);
          }
        };
        animatePlane();

        setMapError(false);
      } catch (error) {
        console.error('Error loading map:', error);
        setMapError(true);
      }
    };

    loadLeaflet();

    return () => {
      // Cleanup map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [fromCity, toCity]);

  if (!fromCity || !toCity) {
    return (
      <div className="w-full h-[300px] md:h-[400px] rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
        <div className="text-center space-y-2 p-4">
          <MapPin className="w-12 h-12 text-white/40 mx-auto" />
          <p className="text-white/60 text-sm">
            Select departure and destination to view interactive map
          </p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full h-[300px] md:h-[400px] rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
        <div className="text-center space-y-2 p-4">
          <MapPin className="w-12 h-12 text-white/40 mx-auto" />
          <p className="text-white/60 text-sm">
            Unable to load interactive map
          </p>
        </div>
      </div>
    );
  }

  const timeDiff = Math.abs(toOffset - fromOffset);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <div className="w-3 h-3 rounded-full bg-[#4f86f7] border-2 border-white shadow-lg"></div>
          <span>{fromCity}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>{toCity}</span>
          <div className="w-3 h-3 rounded-full bg-[#a855f7] border-2 border-white shadow-lg"></div>
        </div>
      </div>

      <div 
        ref={mapContainerRef}
        className="w-full h-[400px] rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl bg-gradient-to-b from-[#0a1628] via-[#0d1b2e] to-[#0a1628]"
        style={{ minHeight: '400px' }}
      />

      {/* Info bar */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
        <div className="flex justify-between items-center text-sm">
          <div>
            <div className="text-white/60 text-xs">Time Difference</div>
            <div className="text-white">{timeDiff} hour{timeDiff !== 1 ? 's' : ''}</div>
          </div>
          <div className="text-right">
            <div className="text-white/60 text-xs">Route</div>
            <div className="text-white">{fromCity} → {toCity}</div>
          </div>
        </div>
      </div>

      <p className="text-xs text-white/40 text-center">
        Interactive map powered by OpenStreetMap • Drag to explore • Zoom to see details
      </p>
    </div>
  );
}
