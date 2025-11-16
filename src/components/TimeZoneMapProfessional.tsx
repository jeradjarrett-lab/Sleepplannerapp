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

export function TimeZoneMapProfessional({ fromCity, toCity, fromOffset, toOffset }: TimeZoneMapProps) {
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
          {/* Ocean gradient background */}
          <defs>
            <radialGradient id="oceanGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(15,30,60,0.8)" />
              <stop offset="100%" stopColor="rgba(8,20,45,0.9)" />
            </radialGradient>
            
            <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f86f7" />
              <stop offset="50%" stopColor="#7b68ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Continent gradients for depth */}
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(120,180,255,0.45)" />
              <stop offset="100%" stopColor="rgba(80,140,220,0.35)" />
            </linearGradient>
          </defs>

          {/* Ocean base */}
          <rect width="100" height="100" fill="url(#oceanGradient)" />

          {/* Subtle latitude lines */}
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="0.15">
            <line x1="0" y1="16.67" x2="100" y2="16.67" /> {/* 60°N */}
            <line x1="0" y1="27.78" x2="100" y2="27.78" /> {/* 45°N */}
            <line x1="0" y1="38.89" x2="100" y2="38.89" /> {/* 30°N */}
            <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.25" /> {/* Equator - slightly brighter */}
            <line x1="0" y1="61.11" x2="100" y2="61.11" /> {/* 30°S */}
            <line x1="0" y1="72.22" x2="100" y2="72.22" /> {/* 45°S */}
          </g>

          {/* REALISTIC CONTINENT SHAPES */}
          <g fill="url(#landGradient)" stroke="rgba(180,220,255,0.7)" strokeWidth="0.4" strokeLinejoin="round">
            
            {/* NORTH AMERICA - Realistic shape */}
            <path d="M 8,15 Q 10,12 13,12 L 17,13 Q 19,14 21,16 L 24,18 Q 26,20 27,24 L 28,28 Q 28,32 27,35 L 25,38 Q 23,40 21,41 L 19,42 Q 17,43 15,42 L 12,40 Q 10,38 9,35 L 8,30 Q 7,25 8,20 Z" />
            
            {/* Alaska */}
            <path d="M 3,18 Q 4,16 6,17 L 8,19 Q 9,20 8,22 L 6,23 Q 4,22 3,20 Z" />
            
            {/* Central America */}
            <path d="M 19,42 Q 20,43 21,45 L 22,47 Q 21,48 20,48 L 18,47 Q 17,46 17,44 L 18,42 Z" />
            
            {/* SOUTH AMERICA - Distinctive tapering shape */}
            <path d="M 20,48 Q 22,50 24,52 L 26,56 Q 27,60 27,64 L 26,68 Q 25,72 24,75 L 22,78 Q 20,80 18,79 L 16,77 Q 15,74 15,70 L 14,65 Q 14,60 15,55 L 17,50 Z" />
            
            {/* GREENLAND */}
            <path d="M 32,8 Q 34,7 36,8 L 38,10 Q 39,12 38,14 L 36,16 Q 34,17 32,16 L 30,14 Q 29,12 30,10 Z" />
            
            {/* EUROPE - Detailed peninsulas */}
            <path d="M 44,18 Q 46,16 48,17 L 50,18 Q 52,20 53,22 L 54,24 Q 54,26 53,28 L 51,29 Q 49,30 47,29 L 45,27 Q 44,25 44,23 Z" />
            
            {/* Scandinavia */}
            <path d="M 48,12 Q 50,11 52,12 L 53,15 Q 52,17 50,18 L 48,17 Q 47,15 48,13 Z" />
            
            {/* AFRICA - Distinctive bulge and taper */}
            <path d="M 48,32 Q 50,30 52,31 L 54,33 Q 56,36 57,40 L 58,44 Q 58,48 57,52 L 56,56 Q 55,60 53,62 L 51,64 Q 49,65 47,64 L 45,62 Q 44,58 44,54 L 44,50 Q 44,46 45,42 L 46,38 Q 47,34 48,32 Z" />
            
            {/* Madagascar */}
            <path d="M 59,54 Q 60,53 61,54 L 61,57 Q 60,58 59,57 Z" />
            
            {/* MIDDLE EAST */}
            <path d="M 55,28 Q 57,27 59,28 L 60,30 Q 60,32 59,33 L 57,34 Q 55,33 55,31 Z" />
            
            {/* ASIA - Massive continent with details */}
            <path d="M 60,15 Q 65,13 70,14 L 75,16 Q 80,18 84,21 L 87,24 Q 89,27 89,30 L 88,34 Q 87,37 85,39 L 82,41 Q 78,42 74,42 L 70,41 Q 66,40 62,38 L 58,35 Q 56,32 56,28 L 57,24 Q 58,20 60,17 Z" />
            
            {/* Siberia extension */}
            <path d="M 85,10 Q 88,9 91,10 L 93,13 Q 92,16 90,17 L 87,17 Q 85,15 85,13 Z" />
            
            {/* INDIA - Triangular peninsula */}
            <path d="M 65,39 Q 67,38 69,39 L 70,42 Q 70,45 69,47 L 67,48 Q 65,47 64,45 L 64,42 Z" />
            
            {/* SOUTHEAST ASIA - Island chains */}
            <path d="M 72,45 Q 74,44 76,45 L 77,47 Q 77,48 76,49 L 74,49 Q 72,48 72,47 Z" />
            
            {/* Indonesia archipelago */}
            <path d="M 74,50 L 76,50 L 78,51 L 80,51 L 81,52 Q 81,53 80,53 L 78,53 L 76,52 L 74,52 Q 73,51 74,50 Z" />
            
            {/* JAPAN */}
            <path d="M 86,28 Q 87,27 88,28 L 88,31 Q 87,32 86,31 Z" />
            
            {/* PHILIPPINES */}
            <path d="M 79,43 Q 80,42 81,43 L 81,45 Q 80,46 79,45 Z" />
            
            {/* AUSTRALIA - Wide flat shape */}
            <path d="M 78,60 Q 82,58 86,59 L 90,61 Q 92,64 92,67 L 91,70 Q 89,72 86,72 L 82,71 Q 78,69 76,66 L 76,63 Q 77,61 78,60 Z" />
            
            {/* Tasmania */}
            <path d="M 87,73 Q 88,73 88,74 L 87,75 Q 86,75 86,74 Z" />
            
            {/* NEW ZEALAND */}
            <path d="M 95,71 L 96,71 L 96,74 L 95,74 Z M 95,75 L 96,75 L 96,77 L 95,77 Z" />
            
            {/* ANTARCTICA - Bottom strip with ice shelf variations */}
            <path d="M 5,88 Q 15,87 25,88 L 35,89 Q 45,90 55,89 L 65,88 Q 75,87 85,88 L 95,89 Q 96,91 95,93 L 85,94 Q 75,95 65,94 L 55,93 Q 45,92 35,93 L 25,94 Q 15,95 5,94 Z" />
            
            {/* UK & Ireland */}
            <path d="M 43,20 Q 44,19 45,20 L 45,22 Q 44,23 43,22 Z M 42,21 Q 42,20 43,21 L 43,22 Q 42,22 42,21 Z" />
            
            {/* Caribbean Islands */}
            <ellipse cx="22" cy="43" rx="0.5" ry="0.3" />
            <ellipse cx="23" cy="43.5" rx="0.4" ry="0.3" />
            <ellipse cx="24" cy="44" rx="0.3" ry="0.2" />
          </g>

          {/* Ocean labels */}
          <g fill="rgba(100,150,200,0.4)" fontSize="2.2" fontFamily="Inter, sans-serif" textAnchor="middle" fontStyle="italic">
            <text x="15" y="35">ATLANTIC</text>
            <text x="15" y="38">OCEAN</text>
            
            <text x="72" y="35">PACIFIC</text>
            <text x="72" y="38">OCEAN</text>
            
            <text x="68" y="55">INDIAN</text>
            <text x="68" y="58">OCEAN</text>
            
            <text x="50" y="92">SOUTHERN OCEAN</text>
          </g>

          {/* Continent labels - Positioned accurately */}
          <g fill="rgba(220,240,255,0.95)" fontSize="2.2" fontFamily="Inter, sans-serif" textAnchor="middle">
            <text x="17" y="28">NORTH</text>
            <text x="17" y="30.5">AMERICA</text>
            
            <text x="21" y="63">SOUTH</text>
            <text x="21" y="65.5">AMERICA</text>
            
            <text x="35" y="13">GREENLAND</text>
            
            <text x="49" y="24">EUROPE</text>
            
            <text x="51" y="48">AFRICA</text>
            
            <text x="72" y="28">ASIA</text>
            
            <text x="84" y="66">AUSTRALIA</text>
            
            <text x="50" y="90" fontSize="1.8" fill="rgba(200,220,255,0.7)">ANTARCTICA</text>
          </g>

          {/* Equator line */}
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.3"
            strokeDasharray="2,2"
          />

          {/* Prime Meridian */}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
            strokeDasharray="1,3"
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
        Professional world map showing continents, oceans, and your travel route
      </p>
    </div>
  );
}
