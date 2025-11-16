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

export function TimeZoneMapRealistic({ fromCity, toCity, fromOffset, toOffset }: TimeZoneMapProps) {
  if (!fromCity || !toCity) {
    return (
      <div className="w-full h-[300px] md:h-[400px] rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
        <div className="text-center space-y-2 p-4">
          <MapPin className="w-12 h-12 text-white/40 mx-auto" />
          <p className="text-white/60 text-sm">
            Select departure and destination to view route map
          </p>
        </div>
      </div>
    );
  }

  const fromCoords = cityCoordinates[fromCity] || [0, 0];
  const toCoords = cityCoordinates[toCity] || [0, 0];

  // Convert lat/lng to SVG coordinates (100x100 viewBox)
  const fromX = ((fromCoords[1] + 180) / 360) * 100;
  const fromY = ((90 - fromCoords[0]) / 180) * 100;
  const toX = ((toCoords[1] + 180) / 360) * 100;
  const toY = ((90 - toCoords[0]) / 180) * 100;

  // Create curved path for flight
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  const curveHeight = distance * 0.15;
  const controlY = midY - curveHeight;

  const pathData = `M ${fromX} ${fromY} Q ${midX} ${controlY} ${toX} ${toY}`;

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

      <div className="w-full aspect-[2/1] max-h-[400px] rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl bg-gradient-to-b from-[#0a1628] via-[#0d1b2e] to-[#0a1628]">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Definitions */}
          <defs>
            {/* Ocean gradient */}
            <radialGradient id="oceanGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(18,35,65,0.95)" />
              <stop offset="100%" stopColor="rgba(10,22,40,0.98)" />
            </radialGradient>
            
            {/* Land gradient */}
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(130,190,255,0.50)" />
              <stop offset="100%" stopColor="rgba(90,150,230,0.40)" />
            </linearGradient>

            {/* Flight gradient */}
            <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f86f7" />
              <stop offset="50%" stopColor="#7b68ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Ocean background */}
          <rect width="100" height="100" fill="url(#oceanGradient)" />

          {/* Subtle latitude/longitude grid */}
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.15">
            {/* Latitude lines */}
            <line x1="0" y1="16.67" x2="100" y2="16.67" /> {/* 60°N */}
            <line x1="0" y1="27.78" x2="100" y2="27.78" /> {/* 45°N */}
            <line x1="0" y1="38.89" x2="100" y2="38.89" /> {/* 30°N */}
            <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.2" /> {/* Equator */}
            <line x1="0" y1="61.11" x2="100" y2="61.11" /> {/* 30°S */}
            <line x1="0" y1="72.22" x2="100" y2="72.22" /> {/* 45°S */}
            {/* Longitude lines */}
            <line x1="25" y1="0" x2="25" y2="100" /> {/* 90°W */}
            <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.2" /> {/* Prime Meridian */}
            <line x1="75" y1="0" x2="75" y2="100" /> {/* 90°E */}
          </g>

          {/* COUNTRIES WITH BORDERS - Ultra-detailed */}
          <g fill="url(#landGradient)" stroke="rgba(200,230,255,0.5)" strokeWidth="0.25" strokeLinejoin="round">
            
            {/* ========== NORTH AMERICA ========== */}
            
            {/* CANADA - Large northern country */}
            <path d="M 8,15 L 10,13 L 13,12 L 16,13 L 19,14 L 21,16 L 23,17 L 25,18 L 27,19 L 28,21 L 29,23 L 28,25 L 27,26 L 26,25 L 25,24 L 23,24 L 22,25 L 21,26 L 20,26 L 19,25 L 18,24 L 17,24 L 16,25 L 15,26 L 14,25 L 13,24 L 12,23 L 11,22 L 10,21 L 9,19 L 8,17 Z" 
              strokeWidth="0.3" stroke="rgba(255,200,150,0.6)" />
            
            {/* USA - Contiguous 48 states */}
            <path d="M 10,26 L 11,27 L 13,28 L 15,29 L 17,30 L 19,31 L 21,32 L 23,33 L 25,34 L 26,35 L 27,36 L 26,37 L 25,38 L 23,39 L 21,39 L 19,38 L 17,37 L 15,36 L 13,35 L 11,34 L 10,33 L 9,31 L 9,29 L 9,27 Z" 
              strokeWidth="0.3" stroke="rgba(255,180,120,0.6)" />
            
            {/* ALASKA */}
            <path d="M 3,18 L 4,17 L 6,17 L 8,19 L 9,21 L 8,22 L 6,23 L 4,22 L 3,20 Z" 
              strokeWidth="0.25" />
            
            {/* MEXICO */}
            <path d="M 15,39 L 17,40 L 19,41 L 20,42 L 21,44 L 22,46 L 21,47 L 19,48 L 17,47 L 15,46 L 14,44 L 14,42 L 14,40 Z" 
              strokeWidth="0.3" stroke="rgba(255,160,100,0.6)" />
            
            {/* ========== CENTRAL AMERICA ========== */}
            
            {/* Central America strip (Guatemala, Honduras, Nicaragua, Costa Rica, Panama) */}
            <path d="M 19,48 L 20,49 L 21,50 L 22,51 L 21.5,52 L 21,52.5 L 20,52 L 19,51 L 18,50 L 18,49 Z" 
              strokeWidth="0.2" stroke="rgba(255,200,120,0.5)" />
            
            {/* ========== CARIBBEAN ========== */}
            
            {/* Cuba */}
            <ellipse cx="22.5" cy="43" rx="1.2" ry="0.4" strokeWidth="0.2" />
            
            {/* Caribbean islands */}
            <ellipse cx="23" cy="44" rx="0.3" ry="0.2" />
            <ellipse cx="24" cy="44.5" rx="0.3" ry="0.2" />
            
            {/* ========== SOUTH AMERICA ========== */}
            
            {/* BRAZIL - Largest South American country */}
            <path d="M 22,52 L 24,53 L 26,55 L 27,58 L 28,61 L 28,64 L 27,67 L 26,69 L 24,71 L 22,72 L 20,71 L 19,69 L 18,66 L 18,63 L 18,60 L 19,57 L 20,54 L 21,52 Z" 
              strokeWidth="0.3" stroke="rgba(150,255,150,0.6)" />
            
            {/* ARGENTINA */}
            <path d="M 19,68 L 20,70 L 21,73 L 21,76 L 20,78 L 19,79 L 18,78 L 17,76 L 16,73 L 16,70 L 17,68 Z" 
              strokeWidth="0.3" stroke="rgba(120,200,255,0.6)" />
            
            {/* CHILE - Narrow coastal strip */}
            <path d="M 15,69 L 15.5,72 L 16,75 L 16,78 L 15.5,79 L 15,78.5 L 14.5,76 L 14.5,73 L 14.5,70 L 15,69 Z" 
              strokeWidth="0.25" stroke="rgba(255,150,150,0.6)" />
            
            {/* PERU */}
            <path d="M 17,57 L 18,58 L 19,60 L 19,62 L 18,64 L 17,65 L 16,64 L 15,62 L 15,60 L 16,58 Z" 
              strokeWidth="0.25" />
            
            {/* COLOMBIA */}
            <path d="M 18,51 L 19,52 L 20,53 L 20,55 L 19,56 L 18,56 L 17,55 L 17,53 L 17,52 Z" 
              strokeWidth="0.25" />
            
            {/* VENEZUELA */}
            <path d="M 20,53 L 21,54 L 22,55 L 22,56 L 21,57 L 20,56 L 19,55 L 19,54 Z" 
              strokeWidth="0.25" />
            
            {/* ========== GREENLAND ========== */}
            
            <path d="M 32,8 L 34,7 L 36,8 L 38,10 L 39,12 L 38,14 L 36,16 L 34,17 L 32,16 L 30,14 L 29,12 L 30,10 Z" 
              strokeWidth="0.3" stroke="rgba(255,255,255,0.7)" />
            
            {/* ========== EUROPE ========== */}
            
            {/* ICELAND */}
            <ellipse cx="42" cy="17" rx="0.6" ry="0.4" strokeWidth="0.2" />
            
            {/* UK */}
            <path d="M 43,20 L 44,19.5 L 44.5,20 L 45,21 L 44.5,22 L 44,22.5 L 43,22 L 42.5,21 L 43,20 Z" 
              strokeWidth="0.25" stroke="rgba(255,180,180,0.6)" />
            
            {/* IRELAND */}
            <ellipse cx="42" cy="21" rx="0.4" ry="0.5" strokeWidth="0.2" />
            
            {/* FRANCE */}
            <path d="M 45,22 L 46,21 L 47,21 L 48,22 L 48,24 L 47,25 L 46,25 L 45,24 Z" 
              strokeWidth="0.25" stroke="rgba(150,150,255,0.6)" />
            
            {/* SPAIN */}
            <path d="M 44,24 L 45,24 L 46,25 L 47,26 L 46,27 L 45,27 L 44,26 L 43,25 Z" 
              strokeWidth="0.25" stroke="rgba(255,200,100,0.6)" />
            
            {/* PORTUGAL */}
            <path d="M 43,25 L 43.5,24 L 44,24.5 L 44,26 L 43.5,26.5 L 43,26 Z" 
              strokeWidth="0.2" />
            
            {/* GERMANY */}
            <path d="M 47.5,20 L 48.5,19 L 49.5,19 L 50,20 L 50,22 L 49.5,23 L 48.5,23 L 47.5,22 Z" 
              strokeWidth="0.25" stroke="rgba(200,200,100,0.6)" />
            
            {/* ITALY */}
            <path d="M 49,24 L 49.5,23 L 50,24 L 50.5,26 L 50.5,28 L 50,29 L 49.5,28 L 49,27 L 48.5,25 Z" 
              strokeWidth="0.25" stroke="rgba(150,255,150,0.6)" />
            
            {/* NORWAY */}
            <path d="M 48,12 L 49,11 L 50,11 L 51,12 L 52,14 L 52,16 L 51,17 L 50,17 L 49,16 L 48,14 Z" 
              strokeWidth="0.25" stroke="rgba(255,150,150,0.6)" />
            
            {/* SWEDEN */}
            <path d="M 50,13 L 51,12 L 52,13 L 53,15 L 53,17 L 52,18 L 51,18 L 50,17 L 49,15 Z" 
              strokeWidth="0.25" />
            
            {/* POLAND */}
            <path d="M 51,20 L 52,19 L 53,19 L 54,20 L 54,22 L 53,23 L 52,23 L 51,22 Z" 
              strokeWidth="0.25" />
            
            {/* GREECE */}
            <path d="M 52,27 L 53,26 L 54,27 L 54,28 L 53,29 L 52,28 Z" 
              strokeWidth="0.2" />
            
            {/* ========== AFRICA ========== */}
            
            {/* MOROCCO/ALGERIA */}
            <path d="M 44,29 L 46,28 L 48,29 L 49,30 L 49,32 L 48,33 L 46,33 L 44,32 L 43,31 L 43,30 Z" 
              strokeWidth="0.25" stroke="rgba(200,180,120,0.6)" />
            
            {/* LIBYA/EGYPT */}
            <path d="M 49,31 L 51,30 L 53,31 L 54,32 L 55,34 L 54,35 L 52,35 L 50,34 L 49,33 Z" 
              strokeWidth="0.25" stroke="rgba(220,200,140,0.6)" />
            
            {/* EGYPT (distinct) */}
            <path d="M 54,32 L 55,31 L 56,32 L 56,34 L 55,35 L 54,34 Z" 
              strokeWidth="0.25" />
            
            {/* WEST AFRICA (Nigeria, Ghana, etc) */}
            <path d="M 46,35 L 48,34 L 50,35 L 51,37 L 51,39 L 50,40 L 48,40 L 46,39 L 45,37 L 45,36 Z" 
              strokeWidth="0.25" stroke="rgba(150,200,100,0.6)" />
            
            {/* CENTRAL AFRICA (DRC, Congo) */}
            <path d="M 50,40 L 52,39 L 54,40 L 55,42 L 55,45 L 54,47 L 52,47 L 50,46 L 49,44 L 49,42 Z" 
              strokeWidth="0.25" stroke="rgba(100,180,100,0.6)" />
            
            {/* EAST AFRICA (Kenya, Tanzania) */}
            <path d="M 55,40 L 57,39 L 58,40 L 58,43 L 58,46 L 57,47 L 55,47 L 54,45 L 54,42 Z" 
              strokeWidth="0.25" stroke="rgba(180,200,120,0.6)" />
            
            {/* ETHIOPIA */}
            <path d="M 56,37 L 57,36 L 58,37 L 58,39 L 57,40 L 56,39 Z" 
              strokeWidth="0.2" />
            
            {/* SOUTH AFRICA */}
            <path d="M 50,60 L 52,59 L 54,60 L 55,62 L 55,64 L 54,65 L 52,66 L 50,65 L 49,63 L 49,61 Z" 
              strokeWidth="0.3" stroke="rgba(255,200,100,0.6)" />
            
            {/* MADAGASCAR */}
            <path d="M 59,54 L 60,53 L 61,54 L 61,57 L 60,58 L 59,57 L 58,55 Z" 
              strokeWidth="0.25" stroke="rgba(150,255,150,0.6)" />
            
            {/* ========== MIDDLE EAST ========== */}
            
            {/* TURKEY */}
            <path d="M 54,28 L 56,27 L 58,28 L 59,29 L 58,30 L 56,30 L 54,29 Z" 
              strokeWidth="0.25" stroke="rgba(255,180,150,0.6)" />
            
            {/* SAUDI ARABIA */}
            <path d="M 56,32 L 58,31 L 60,32 L 61,34 L 61,36 L 60,37 L 58,37 L 56,36 L 55,34 Z" 
              strokeWidth="0.25" stroke="rgba(255,220,180,0.6)" />
            
            {/* IRAN */}
            <path d="M 60,30 L 62,29 L 64,30 L 65,32 L 65,34 L 64,35 L 62,35 L 60,34 L 59,32 Z" 
              strokeWidth="0.25" stroke="rgba(200,220,180,0.6)" />
            
            {/* IRAQ */}
            <path d="M 58,31 L 59,30 L 60,31 L 60,33 L 59,34 L 58,33 Z" 
              strokeWidth="0.2" />
            
            {/* ========== ASIA ========== */}
            
            {/* RUSSIA - Massive country */}
            <path d="M 60,15 L 65,14 L 70,15 L 75,17 L 80,19 L 85,21 L 88,23 L 90,25 L 91,27 L 90,29 L 88,30 L 85,30 L 82,29 L 78,28 L 74,27 L 70,26 L 66,25 L 62,24 L 58,23 L 56,22 L 55,20 L 56,18 L 58,16 Z" 
              strokeWidth="0.35" stroke="rgba(255,180,180,0.6)" />
            
            {/* KAZAKHSTAN */}
            <path d="M 62,26 L 65,25 L 68,26 L 70,27 L 70,29 L 68,30 L 65,30 L 62,29 L 61,28 Z" 
              strokeWidth="0.25" />
            
            {/* MONGOLIA */}
            <path d="M 75,24 L 78,23 L 81,24 L 83,26 L 83,28 L 81,29 L 78,29 L 75,28 L 74,26 Z" 
              strokeWidth="0.25" stroke="rgba(255,200,150,0.6)" />
            
            {/* CHINA - Large country */}
            <path d="M 75,28 L 78,27 L 82,28 L 85,30 L 87,33 L 88,36 L 87,39 L 85,41 L 82,42 L 78,42 L 75,41 L 72,39 L 70,37 L 69,34 L 70,31 L 72,29 Z" 
              strokeWidth="0.3" stroke="rgba(255,200,200,0.6)" />
            
            {/* INDIA */}
            <path d="M 65,39 L 67,38 L 69,39 L 70,41 L 71,44 L 70,46 L 69,47 L 67,48 L 65,47 L 64,45 L 63,43 L 64,41 Z" 
              strokeWidth="0.3" stroke="rgba(255,180,100,0.6)" />
            
            {/* PAKISTAN */}
            <path d="M 63,35 L 65,34 L 67,35 L 68,37 L 67,39 L 65,39 L 63,38 L 62,36 Z" 
              strokeWidth="0.25" />
            
            {/* AFGHANISTAN */}
            <path d="M 62,33 L 64,32 L 66,33 L 66,35 L 65,36 L 63,36 L 62,34 Z" 
              strokeWidth="0.2" />
            
            {/* THAILAND */}
            <path d="M 73,43 L 74,42 L 75,43 L 75,46 L 74,48 L 73,48 L 72,47 L 72,45 L 72,44 Z" 
              strokeWidth="0.2" />
            
            {/* VIETNAM */}
            <path d="M 75,41 L 76,40 L 77,41 L 77,44 L 77,47 L 76,48 L 75,47 L 75,44 L 75,42 Z" 
              strokeWidth="0.2" />
            
            {/* MYANMAR (Burma) */}
            <path d="M 71,40 L 72,39 L 73,40 L 73,43 L 72,44 L 71,43 L 70,41 Z" 
              strokeWidth="0.2" />
            
            {/* MALAYSIA */}
            <path d="M 74,49 L 75,48 L 76,49 L 77,50 L 76,51 L 75,51 L 74,50 Z" 
              strokeWidth="0.2" />
            
            {/* INDONESIA - Island chain */}
            <g strokeWidth="0.2">
              <ellipse cx="75" cy="51" rx="0.8" ry="0.4" />
              <ellipse cx="77" cy="51.5" rx="0.6" ry="0.3" />
              <ellipse cx="79" cy="52" rx="0.7" ry="0.4" />
              <ellipse cx="81" cy="52" rx="0.5" ry="0.3" />
            </g>
            
            {/* PHILIPPINES */}
            <g strokeWidth="0.2">
              <ellipse cx="79" cy="43" rx="0.4" ry="0.8" />
              <ellipse cx="80" cy="44" rx="0.3" ry="0.5" />
            </g>
            
            {/* JAPAN - Island chain */}
            <path d="M 86,28 L 87,27 L 88,28 L 88,30 L 88,32 L 87,33 L 86,32 L 86,30 L 86,29 Z" 
              strokeWidth="0.25" stroke="rgba(255,150,150,0.6)" />
            
            {/* KOREA (North & South) */}
            <path d="M 82,30 L 83,29 L 84,30 L 84,32 L 83,33 L 82,32 Z" 
              strokeWidth="0.2" />
            
            {/* ========== OCEANIA ========== */}
            
            {/* AUSTRALIA - States visible */}
            <g strokeWidth="0.3" stroke="rgba(255,200,150,0.6)">
              {/* Western Australia */}
              <path d="M 78,60 L 80,59 L 82,60 L 83,62 L 83,65 L 83,68 L 82,70 L 80,71 L 78,70 L 77,68 L 76,65 L 76,62 Z" />
              
              {/* Northern Territory / South Australia */}
              <path d="M 83,60 L 85,59 L 87,60 L 88,63 L 88,66 L 87,68 L 85,69 L 83,68 L 82,65 L 82,62 Z" />
              
              {/* Queensland */}
              <path d="M 88,60 L 90,59 L 91,61 L 92,64 L 92,67 L 91,69 L 89,70 L 88,68 L 87,65 L 87,62 Z" />
              
              {/* New South Wales / Victoria */}
              <path d="M 87,69 L 89,68 L 91,69 L 92,71 L 91,72 L 89,73 L 87,72 L 86,71 L 86,70 Z" />
            </g>
            
            {/* TASMANIA */}
            <ellipse cx="87" cy="74" rx="0.6" ry="0.4" strokeWidth="0.2" />
            
            {/* NEW ZEALAND */}
            <g strokeWidth="0.25" stroke="rgba(150,255,150,0.6)">
              <path d="M 95,71 L 96,70 L 96.5,71 L 97,73 L 96.5,74 L 96,74 L 95,73 Z" /> {/* North Island */}
              <path d="M 95,75 L 96,74.5 L 96.5,75 L 97,77 L 96.5,78 L 96,78 L 95,77 Z" /> {/* South Island */}
            </g>
            
            {/* ========== ANTARCTICA ========== */}
            
            <path d="M 5,88 Q 15,87 25,88 L 35,89 Q 45,90 55,89 L 65,88 Q 75,87 85,88 L 95,89 Q 96,91 95,93 L 85,94 Q 75,95 65,94 L 55,93 Q 45,92 35,93 L 25,94 Q 15,95 5,94 Z" 
              strokeWidth="0.3" stroke="rgba(255,255,255,0.6)" />
            
          </g>

          {/* Ocean labels */}
          <g fill="rgba(110,160,210,0.45)" fontSize="2.2" fontFamily="Inter, sans-serif" textAnchor="middle" fontStyle="italic">
            <text x="15" y="35">ATLANTIC</text>
            <text x="15" y="38">OCEAN</text>
            
            <text x="72" y="35">PACIFIC</text>
            <text x="72" y="38">OCEAN</text>
            
            <text x="68" y="55">INDIAN</text>
            <text x="68" y="58">OCEAN</text>
            
            <text x="50" y="92">SOUTHERN OCEAN</text>
          </g>

          {/* Major country/region labels - selective */}
          <g fill="rgba(230,245,255,0.85)" fontSize="1.4" fontFamily="Inter, sans-serif" textAnchor="middle">
            <text x="17" y="25">CANADA</text>
            <text x="19" y="34">USA</text>
            <text x="22" y="62">BRAZIL</text>
            <text x="35" y="12">GREENLAND</text>
            <text x="48" y="23">EUROPE</text>
            <text x="51" y="48">AFRICA</text>
            <text x="70" y="24">RUSSIA</text>
            <text x="80" y="35">CHINA</text>
            <text x="67" y="43">INDIA</text>
            <text x="85" y="66">AUSTRALIA</text>
          </g>

          {/* Equator line */}
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.3"
            strokeDasharray="2,2"
          />

          {/* Flight path with glow effect */}
          <g>
            {/* Glow layer */}
            <path
              d={pathData}
              fill="none"
              stroke="url(#flightGradient)"
              strokeWidth="1.5"
              opacity="0.3"
              filter="blur(2px)"
            />
            {/* Main path */}
            <path
              d={pathData}
              fill="none"
              stroke="url(#flightGradient)"
              strokeWidth="0.8"
              strokeDasharray="3,2"
              opacity="0.9"
            />
          </g>

          {/* Departure marker with pulse */}
          <g>
            <circle
              cx={fromX}
              cy={fromY}
              r="2.5"
              fill="#4f86f7"
              stroke="white"
              strokeWidth="0.5"
            />
            <circle
              cx={fromX}
              cy={fromY}
              r="3.5"
              fill="none"
              stroke="#4f86f7"
              strokeWidth="0.4"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                from="2.5"
                to="6"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.6"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Destination marker with pulse */}
          <g>
            <circle
              cx={toX}
              cy={toY}
              r="2.5"
              fill="#a855f7"
              stroke="white"
              strokeWidth="0.5"
            />
            <circle
              cx={toX}
              cy={toY}
              r="3.5"
              fill="none"
              stroke="#a855f7"
              strokeWidth="0.4"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                from="2.5"
                to="6"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.6"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Animated plane */}
          <g>
            <text fontSize="3.5" fill="#ffffff" filter="drop-shadow(0 0 2px rgba(79,134,247,0.8))">
              <animateMotion dur="8s" repeatCount="indefinite" path={pathData} />
              ✈
            </text>
          </g>
        </svg>
      </div>

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
        Realistic world map with country borders and geographic detail
      </p>
    </div>
  );
}
