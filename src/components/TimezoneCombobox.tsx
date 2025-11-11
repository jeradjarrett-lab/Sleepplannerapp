import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface Timezone {
  label: string;
  value: string;
  offset: number;
  city: string;
  country: string;
  searchTerms: string;
}

export const allTimezones: Timezone[] = [
  // UTC-12 to UTC-11
  { label: 'UTC-12:00 Baker Island', value: 'Etc/GMT+12', offset: -12, city: 'Baker Island', country: 'United States', searchTerms: 'baker island usa united states -12' },
  { label: 'UTC-11:00 American Samoa (Pago Pago)', value: 'Pacific/Samoa', offset: -11, city: 'Pago Pago', country: 'American Samoa', searchTerms: 'pago pago samoa american -11' },
  { label: 'UTC-11:00 Niue', value: 'Pacific/Niue', offset: -11, city: 'Niue', country: 'Niue', searchTerms: 'niue -11' },
  
  // UTC-10
  { label: 'UTC-10:00 Hawaii (Honolulu)', value: 'Pacific/Honolulu', offset: -10, city: 'Honolulu', country: 'United States', searchTerms: 'honolulu hawaii usa united states -10' },
  { label: 'UTC-10:00 Cook Islands (Rarotonga)', value: 'Pacific/Rarotonga', offset: -10, city: 'Rarotonga', country: 'Cook Islands', searchTerms: 'cook islands rarotonga -10' },
  { label: 'UTC-10:00 Tahiti', value: 'Pacific/Tahiti', offset: -10, city: 'Tahiti', country: 'French Polynesia', searchTerms: 'tahiti french polynesia -10' },
  
  // UTC-9:30
  { label: 'UTC-09:30 Marquesas Islands', value: 'Pacific/Marquesas', offset: -9.5, city: 'Marquesas', country: 'French Polynesia', searchTerms: 'marquesas french polynesia -9.5 -9:30' },
  
  // UTC-9
  { label: 'UTC-09:00 Alaska (Anchorage)', value: 'America/Anchorage', offset: -9, city: 'Anchorage', country: 'United States', searchTerms: 'anchorage alaska usa united states -9' },
  { label: 'UTC-09:00 Alaska (Juneau)', value: 'America/Juneau', offset: -9, city: 'Juneau', country: 'United States', searchTerms: 'juneau alaska usa united states -9' },
  { label: 'UTC-09:00 Gambier Islands', value: 'Pacific/Gambier', offset: -9, city: 'Gambier', country: 'French Polynesia', searchTerms: 'gambier french polynesia -9' },
  
  // UTC-8
  { label: 'UTC-08:00 Los Angeles', value: 'America/Los_Angeles', offset: -8, city: 'Los Angeles', country: 'United States', searchTerms: 'los angeles la california usa united states -8 pst pdt' },
  { label: 'UTC-08:00 San Francisco', value: 'America/Los_Angeles', offset: -8, city: 'San Francisco', country: 'United States', searchTerms: 'san francisco california usa united states -8 pst pdt' },
  { label: 'UTC-08:00 Seattle', value: 'America/Los_Angeles', offset: -8, city: 'Seattle', country: 'United States', searchTerms: 'seattle washington usa united states -8 pst pdt' },
  { label: 'UTC-08:00 Vancouver', value: 'America/Vancouver', offset: -8, city: 'Vancouver', country: 'Canada', searchTerms: 'vancouver canada british columbia -8 pst pdt' },
  { label: 'UTC-08:00 Portland', value: 'America/Los_Angeles', offset: -8, city: 'Portland', country: 'United States', searchTerms: 'portland oregon usa united states -8 pst pdt' },
  { label: 'UTC-08:00 Las Vegas', value: 'America/Los_Angeles', offset: -8, city: 'Las Vegas', country: 'United States', searchTerms: 'las vegas nevada usa united states -8 pst pdt' },
  { label: 'UTC-08:00 Tijuana', value: 'America/Tijuana', offset: -8, city: 'Tijuana', country: 'Mexico', searchTerms: 'tijuana mexico -8' },
  
  // UTC-7
  { label: 'UTC-07:00 Denver', value: 'America/Denver', offset: -7, city: 'Denver', country: 'United States', searchTerms: 'denver colorado usa united states -7 mst mdt' },
  { label: 'UTC-07:00 Phoenix', value: 'America/Phoenix', offset: -7, city: 'Phoenix', country: 'United States', searchTerms: 'phoenix arizona usa united states -7 mst' },
  { label: 'UTC-07:00 Calgary', value: 'America/Edmonton', offset: -7, city: 'Calgary', country: 'Canada', searchTerms: 'calgary alberta canada -7 mst mdt' },
  { label: 'UTC-07:00 Edmonton', value: 'America/Edmonton', offset: -7, city: 'Edmonton', country: 'Canada', searchTerms: 'edmonton alberta canada -7 mst mdt' },
  { label: 'UTC-07:00 Salt Lake City', value: 'America/Denver', offset: -7, city: 'Salt Lake City', country: 'United States', searchTerms: 'salt lake city utah usa united states -7 mst mdt' },
  { label: 'UTC-07:00 Chihuahua', value: 'America/Chihuahua', offset: -7, city: 'Chihuahua', country: 'Mexico', searchTerms: 'chihuahua mexico -7' },
  
  // UTC-6
  { label: 'UTC-06:00 Chicago', value: 'America/Chicago', offset: -6, city: 'Chicago', country: 'United States', searchTerms: 'chicago illinois usa united states -6 cst cdt' },
  { label: 'UTC-06:00 Mexico City', value: 'America/Mexico_City', offset: -6, city: 'Mexico City', country: 'Mexico', searchTerms: 'mexico city cdmx -6 cst' },
  { label: 'UTC-06:00 Dallas', value: 'America/Chicago', offset: -6, city: 'Dallas', country: 'United States', searchTerms: 'dallas texas usa united states -6 cst cdt' },
  { label: 'UTC-06:00 Houston', value: 'America/Chicago', offset: -6, city: 'Houston', country: 'United States', searchTerms: 'houston texas usa united states -6 cst cdt' },
  { label: 'UTC-06:00 Winnipeg', value: 'America/Winnipeg', offset: -6, city: 'Winnipeg', country: 'Canada', searchTerms: 'winnipeg manitoba canada -6 cst cdt' },
  { label: 'UTC-06:00 Guatemala City', value: 'America/Guatemala', offset: -6, city: 'Guatemala City', country: 'Guatemala', searchTerms: 'guatemala city -6 cst' },
  { label: 'UTC-06:00 San Salvador', value: 'America/El_Salvador', offset: -6, city: 'San Salvador', country: 'El Salvador', searchTerms: 'san salvador el salvador -6 cst' },
  { label: 'UTC-06:00 Managua', value: 'America/Managua', offset: -6, city: 'Managua', country: 'Nicaragua', searchTerms: 'managua nicaragua -6 cst' },
  { label: 'UTC-06:00 Costa Rica (San José)', value: 'America/Costa_Rica', offset: -6, city: 'San José', country: 'Costa Rica', searchTerms: 'san jose costa rica -6 cst' },
  { label: 'UTC-06:00 Tegucigalpa', value: 'America/Tegucigalpa', offset: -6, city: 'Tegucigalpa', country: 'Honduras', searchTerms: 'tegucigalpa honduras -6 cst' },
  
  // UTC-5
  { label: 'UTC-05:00 New York', value: 'America/New_York', offset: -5, city: 'New York', country: 'United States', searchTerms: 'new york nyc usa united states -5 est edt' },
  { label: 'UTC-05:00 Toronto', value: 'America/Toronto', offset: -5, city: 'Toronto', country: 'Canada', searchTerms: 'toronto ontario canada -5 est edt' },
  { label: 'UTC-05:00 Boston', value: 'America/New_York', offset: -5, city: 'Boston', country: 'United States', searchTerms: 'boston massachusetts usa united states -5 est edt' },
  { label: 'UTC-05:00 Miami', value: 'America/New_York', offset: -5, city: 'Miami', country: 'United States', searchTerms: 'miami florida usa united states -5 est edt' },
  { label: 'UTC-05:00 Philadelphia', value: 'America/New_York', offset: -5, city: 'Philadelphia', country: 'United States', searchTerms: 'philadelphia pennsylvania usa united states -5 est edt' },
  { label: 'UTC-05:00 Atlanta', value: 'America/New_York', offset: -5, city: 'Atlanta', country: 'United States', searchTerms: 'atlanta georgia usa united states -5 est edt' },
  { label: 'UTC-05:00 Washington DC', value: 'America/New_York', offset: -5, city: 'Washington DC', country: 'United States', searchTerms: 'washington dc usa united states -5 est edt' },
  { label: 'UTC-05:00 Montreal', value: 'America/Toronto', offset: -5, city: 'Montreal', country: 'Canada', searchTerms: 'montreal quebec canada -5 est edt' },
  { label: 'UTC-05:00 Ottawa', value: 'America/Toronto', offset: -5, city: 'Ottawa', country: 'Canada', searchTerms: 'ottawa ontario canada -5 est edt' },
  { label: 'UTC-05:00 Lima', value: 'America/Lima', offset: -5, city: 'Lima', country: 'Peru', searchTerms: 'lima peru -5 pet' },
  { label: 'UTC-05:00 Bogotá', value: 'America/Bogota', offset: -5, city: 'Bogotá', country: 'Colombia', searchTerms: 'bogota colombia -5 cot' },
  { label: 'UTC-05:00 Quito', value: 'America/Guayaquil', offset: -5, city: 'Quito', country: 'Ecuador', searchTerms: 'quito ecuador -5 ect' },
  { label: 'UTC-05:00 Panama City', value: 'America/Panama', offset: -5, city: 'Panama City', country: 'Panama', searchTerms: 'panama city -5 est' },
  { label: 'UTC-05:00 Havana', value: 'America/Havana', offset: -5, city: 'Havana', country: 'Cuba', searchTerms: 'havana cuba -5 cst cdt' },
  { label: 'UTC-05:00 Jamaica (Kingston)', value: 'America/Jamaica', offset: -5, city: 'Kingston', country: 'Jamaica', searchTerms: 'kingston jamaica -5 est' },
  
  // UTC-4
  { label: 'UTC-04:00 Santiago', value: 'America/Santiago', offset: -4, city: 'Santiago', country: 'Chile', searchTerms: 'santiago chile -4 clst' },
  { label: 'UTC-04:00 Caracas', value: 'America/Caracas', offset: -4, city: 'Caracas', country: 'Venezuela', searchTerms: 'caracas venezuela -4 vet' },
  { label: 'UTC-04:00 La Paz', value: 'America/La_Paz', offset: -4, city: 'La Paz', country: 'Bolivia', searchTerms: 'la paz bolivia -4 bot' },
  { label: 'UTC-04:00 Halifax', value: 'America/Halifax', offset: -4, city: 'Halifax', country: 'Canada', searchTerms: 'halifax nova scotia canada -4 ast adt' },
  { label: 'UTC-04:00 Santo Domingo', value: 'America/Santo_Domingo', offset: -4, city: 'Santo Domingo', country: 'Dominican Republic', searchTerms: 'santo domingo dominican republic -4 ast' },
  { label: 'UTC-04:00 Puerto Rico (San Juan)', value: 'America/Puerto_Rico', offset: -4, city: 'San Juan', country: 'Puerto Rico', searchTerms: 'san juan puerto rico -4 ast' },
  { label: 'UTC-04:00 Barbados (Bridgetown)', value: 'America/Barbados', offset: -4, city: 'Bridgetown', country: 'Barbados', searchTerms: 'bridgetown barbados -4 ast' },
  { label: 'UTC-04:00 Martinique', value: 'America/Martinique', offset: -4, city: 'Martinique', country: 'Martinique', searchTerms: 'martinique -4 ast' },
  { label: 'UTC-04:00 Manaus', value: 'America/Manaus', offset: -4, city: 'Manaus', country: 'Brazil', searchTerms: 'manaus brazil brasil -4 amt' },
  
  // UTC-3:30
  { label: 'UTC-03:30 Newfoundland (St. Johns)', value: 'America/St_Johns', offset: -3.5, city: 'St. Johns', country: 'Canada', searchTerms: 'st johns newfoundland canada -3.5 -3:30 nst ndt' },
  
  // UTC-3
  { label: 'UTC-03:00 Buenos Aires', value: 'America/Argentina/Buenos_Aires', offset: -3, city: 'Buenos Aires', country: 'Argentina', searchTerms: 'buenos aires argentina -3 art' },
  { label: 'UTC-03:00 São Paulo', value: 'America/Sao_Paulo', offset: -3, city: 'São Paulo', country: 'Brazil', searchTerms: 'sao paulo brazil brasil -3 brt brst' },
  { label: 'UTC-03:00 Rio de Janeiro', value: 'America/Sao_Paulo', offset: -3, city: 'Rio de Janeiro', country: 'Brazil', searchTerms: 'rio de janeiro brazil brasil -3 brt brst' },
  { label: 'UTC-03:00 Montevideo', value: 'America/Montevideo', offset: -3, city: 'Montevideo', country: 'Uruguay', searchTerms: 'montevideo uruguay -3 uyt' },
  { label: 'UTC-03:00 Asunción', value: 'America/Asuncion', offset: -3, city: 'Asunción', country: 'Paraguay', searchTerms: 'asuncion paraguay -3 pyt' },
  { label: 'UTC-03:00 Cayenne', value: 'America/Cayenne', offset: -3, city: 'Cayenne', country: 'French Guiana', searchTerms: 'cayenne french guiana -3 gft' },
  { label: 'UTC-03:00 Suriname (Paramaribo)', value: 'America/Paramaribo', offset: -3, city: 'Paramaribo', country: 'Suriname', searchTerms: 'paramaribo suriname -3 srt' },
  { label: 'UTC-03:00 Greenland (Nuuk)', value: 'America/Godthab', offset: -3, city: 'Nuuk', country: 'Greenland', searchTerms: 'nuuk greenland -3 wgt' },
  
  // UTC-2
  { label: 'UTC-02:00 South Georgia', value: 'Atlantic/South_Georgia', offset: -2, city: 'South Georgia', country: 'South Georgia', searchTerms: 'south georgia -2 gst' },
  { label: 'UTC-02:00 Fernando de Noronha', value: 'America/Noronha', offset: -2, city: 'Fernando de Noronha', country: 'Brazil', searchTerms: 'fernando noronha brazil -2 fnt' },
  
  // UTC-1
  { label: 'UTC-01:00 Azores', value: 'Atlantic/Azores', offset: -1, city: 'Azores', country: 'Portugal', searchTerms: 'azores portugal -1 azot azost' },
  { label: 'UTC-01:00 Cape Verde (Praia)', value: 'Atlantic/Cape_Verde', offset: -1, city: 'Praia', country: 'Cape Verde', searchTerms: 'praia cape verde -1 cvt' },
  
  // UTC+0
  { label: 'UTC+00:00 London', value: 'Europe/London', offset: 0, city: 'London', country: 'United Kingdom', searchTerms: 'london uk united kingdom england britain 0 gmt bst' },
  { label: 'UTC+00:00 Dublin', value: 'Europe/Dublin', offset: 0, city: 'Dublin', country: 'Ireland', searchTerms: 'dublin ireland 0 gmt ist' },
  { label: 'UTC+00:00 Lisbon', value: 'Europe/Lisbon', offset: 0, city: 'Lisbon', country: 'Portugal', searchTerms: 'lisbon lisboa portugal 0 wet west' },
  { label: 'UTC+00:00 Reykjavik', value: 'Atlantic/Reykjavik', offset: 0, city: 'Reykjavik', country: 'Iceland', searchTerms: 'reykjavik iceland 0 gmt' },
  { label: 'UTC+00:00 Dakar', value: 'Africa/Dakar', offset: 0, city: 'Dakar', country: 'Senegal', searchTerms: 'dakar senegal 0 gmt' },
  { label: 'UTC+00:00 Accra', value: 'Africa/Accra', offset: 0, city: 'Accra', country: 'Ghana', searchTerms: 'accra ghana 0 gmt' },
  { label: 'UTC+00:00 Casablanca', value: 'Africa/Casablanca', offset: 0, city: 'Casablanca', country: 'Morocco', searchTerms: 'casablanca morocco 0 wet' },
  
  // UTC+1
  { label: 'UTC+01:00 Paris', value: 'Europe/Paris', offset: 1, city: 'Paris', country: 'France', searchTerms: 'paris france +1 cet cest' },
  { label: 'UTC+01:00 Berlin', value: 'Europe/Berlin', offset: 1, city: 'Berlin', country: 'Germany', searchTerms: 'berlin germany deutschland +1 cet cest' },
  { label: 'UTC+01:00 Rome', value: 'Europe/Rome', offset: 1, city: 'Rome', country: 'Italy', searchTerms: 'rome roma italy italia +1 cet cest' },
  { label: 'UTC+01:00 Madrid', value: 'Europe/Madrid', offset: 1, city: 'Madrid', country: 'Spain', searchTerms: 'madrid spain espana +1 cet cest' },
  { label: 'UTC+01:00 Amsterdam', value: 'Europe/Amsterdam', offset: 1, city: 'Amsterdam', country: 'Netherlands', searchTerms: 'amsterdam netherlands holland +1 cet cest' },
  { label: 'UTC+01:00 Brussels', value: 'Europe/Brussels', offset: 1, city: 'Brussels', country: 'Belgium', searchTerms: 'brussels belgium +1 cet cest' },
  { label: 'UTC+01:00 Vienna', value: 'Europe/Vienna', offset: 1, city: 'Vienna', country: 'Austria', searchTerms: 'vienna wien austria +1 cet cest' },
  { label: 'UTC+01:00 Prague', value: 'Europe/Prague', offset: 1, city: 'Prague', country: 'Czech Republic', searchTerms: 'prague praha czech republic czechia +1 cet cest' },
  { label: 'UTC+01:00 Warsaw', value: 'Europe/Warsaw', offset: 1, city: 'Warsaw', country: 'Poland', searchTerms: 'warsaw warszawa poland polska +1 cet cest' },
  { label: 'UTC+01:00 Budapest', value: 'Europe/Budapest', offset: 1, city: 'Budapest', country: 'Hungary', searchTerms: 'budapest hungary +1 cet cest' },
  { label: 'UTC+01:00 Stockholm', value: 'Europe/Stockholm', offset: 1, city: 'Stockholm', country: 'Sweden', searchTerms: 'stockholm sweden sverige +1 cet cest' },
  { label: 'UTC+01:00 Oslo', value: 'Europe/Oslo', offset: 1, city: 'Oslo', country: 'Norway', searchTerms: 'oslo norway norge +1 cet cest' },
  { label: 'UTC+01:00 Copenhagen', value: 'Europe/Copenhagen', offset: 1, city: 'Copenhagen', country: 'Denmark', searchTerms: 'copenhagen kobenhavn denmark danmark +1 cet cest' },
  { label: 'UTC+01:00 Zurich', value: 'Europe/Zurich', offset: 1, city: 'Zurich', country: 'Switzerland', searchTerms: 'zurich switzerland schweiz +1 cet cest' },
  { label: 'UTC+01:00 Lagos', value: 'Africa/Lagos', offset: 1, city: 'Lagos', country: 'Nigeria', searchTerms: 'lagos nigeria +1 wat' },
  { label: 'UTC+01:00 Kinshasa', value: 'Africa/Kinshasa', offset: 1, city: 'Kinshasa', country: 'DR Congo', searchTerms: 'kinshasa congo drc +1 wat' },
  { label: 'UTC+01:00 Algiers', value: 'Africa/Algiers', offset: 1, city: 'Algiers', country: 'Algeria', searchTerms: 'algiers algeria +1 cet' },
  { label: 'UTC+01:00 Tunis', value: 'Africa/Tunis', offset: 1, city: 'Tunis', country: 'Tunisia', searchTerms: 'tunis tunisia +1 cet' },
  
  // UTC+2
  { label: 'UTC+02:00 Athens', value: 'Europe/Athens', offset: 2, city: 'Athens', country: 'Greece', searchTerms: 'athens greece +2 eet eest' },
  { label: 'UTC+02:00 Istanbul', value: 'Europe/Istanbul', offset: 2, city: 'Istanbul', country: 'Turkey', searchTerms: 'istanbul turkey turkiye +2 trt' },
  { label: 'UTC+02:00 Cairo', value: 'Africa/Cairo', offset: 2, city: 'Cairo', country: 'Egypt', searchTerms: 'cairo egypt +2 eet' },
  { label: 'UTC+02:00 Jerusalem', value: 'Asia/Jerusalem', offset: 2, city: 'Jerusalem', country: 'Israel', searchTerms: 'jerusalem israel +2 ist idt' },
  { label: 'UTC+02:00 Helsinki', value: 'Europe/Helsinki', offset: 2, city: 'Helsinki', country: 'Finland', searchTerms: 'helsinki finland +2 eet eest' },
  { label: 'UTC+02:00 Bucharest', value: 'Europe/Bucharest', offset: 2, city: 'Bucharest', country: 'Romania', searchTerms: 'bucharest bucuresti romania +2 eet eest' },
  { label: 'UTC+02:00 Kyiv', value: 'Europe/Kiev', offset: 2, city: 'Kyiv', country: 'Ukraine', searchTerms: 'kyiv kiev ukraine +2 eet eest' },
  { label: 'UTC+02:00 Johannesburg', value: 'Africa/Johannesburg', offset: 2, city: 'Johannesburg', country: 'South Africa', searchTerms: 'johannesburg south africa +2 sast' },
  { label: 'UTC+02:00 Cape Town', value: 'Africa/Johannesburg', offset: 2, city: 'Cape Town', country: 'South Africa', searchTerms: 'cape town south africa +2 sast' },
  { label: 'UTC+02:00 Harare', value: 'Africa/Harare', offset: 2, city: 'Harare', country: 'Zimbabwe', searchTerms: 'harare zimbabwe +2 cat' },
  { label: 'UTC+02:00 Beirut', value: 'Asia/Beirut', offset: 2, city: 'Beirut', country: 'Lebanon', searchTerms: 'beirut lebanon +2 eet eest' },
  { label: 'UTC+02:00 Amman', value: 'Asia/Amman', offset: 2, city: 'Amman', country: 'Jordan', searchTerms: 'amman jordan +2 eet eest' },
  { label: 'UTC+02:00 Damascus', value: 'Asia/Damascus', offset: 2, city: 'Damascus', country: 'Syria', searchTerms: 'damascus syria +2 eet eest' },
  
  // UTC+3
  { label: 'UTC+03:00 Moscow', value: 'Europe/Moscow', offset: 3, city: 'Moscow', country: 'Russia', searchTerms: 'moscow russia moskva +3 msk' },
  { label: 'UTC+03:00 Nairobi', value: 'Africa/Nairobi', offset: 3, city: 'Nairobi', country: 'Kenya', searchTerms: 'nairobi kenya +3 eat' },
  { label: 'UTC+03:00 Riyadh', value: 'Asia/Riyadh', offset: 3, city: 'Riyadh', country: 'Saudi Arabia', searchTerms: 'riyadh saudi arabia +3 ast' },
  { label: 'UTC+03:00 Kuwait City', value: 'Asia/Kuwait', offset: 3, city: 'Kuwait City', country: 'Kuwait', searchTerms: 'kuwait city +3 ast' },
  { label: 'UTC+03:00 Baghdad', value: 'Asia/Baghdad', offset: 3, city: 'Baghdad', country: 'Iraq', searchTerms: 'baghdad iraq +3 ast' },
  { label: 'UTC+03:00 Doha', value: 'Asia/Qatar', offset: 3, city: 'Doha', country: 'Qatar', searchTerms: 'doha qatar +3 ast' },
  { label: 'UTC+03:00 Bahrain (Manama)', value: 'Asia/Bahrain', offset: 3, city: 'Manama', country: 'Bahrain', searchTerms: 'manama bahrain +3 ast' },
  { label: 'UTC+03:00 Addis Ababa', value: 'Africa/Addis_Ababa', offset: 3, city: 'Addis Ababa', country: 'Ethiopia', searchTerms: 'addis ababa ethiopia +3 eat' },
  { label: 'UTC+03:00 Dar es Salaam', value: 'Africa/Dar_es_Salaam', offset: 3, city: 'Dar es Salaam', country: 'Tanzania', searchTerms: 'dar es salaam tanzania +3 eat' },
  { label: 'UTC+03:00 Mogadishu', value: 'Africa/Mogadishu', offset: 3, city: 'Mogadishu', country: 'Somalia', searchTerms: 'mogadishu somalia +3 eat' },
  { label: 'UTC+03:00 Minsk', value: 'Europe/Minsk', offset: 3, city: 'Minsk', country: 'Belarus', searchTerms: 'minsk belarus +3 msk' },
  
  // UTC+3:30
  { label: 'UTC+03:30 Tehran', value: 'Asia/Tehran', offset: 3.5, city: 'Tehran', country: 'Iran', searchTerms: 'tehran iran +3.5 +3:30 irst irdt' },
  
  // UTC+4
  { label: 'UTC+04:00 Dubai', value: 'Asia/Dubai', offset: 4, city: 'Dubai', country: 'United Arab Emirates', searchTerms: 'dubai uae united arab emirates +4 gst' },
  { label: 'UTC+04:00 Abu Dhabi', value: 'Asia/Dubai', offset: 4, city: 'Abu Dhabi', country: 'United Arab Emirates', searchTerms: 'abu dhabi uae united arab emirates +4 gst' },
  { label: 'UTC+04:00 Muscat', value: 'Asia/Muscat', offset: 4, city: 'Muscat', country: 'Oman', searchTerms: 'muscat oman +4 gst' },
  { label: 'UTC+04:00 Baku', value: 'Asia/Baku', offset: 4, city: 'Baku', country: 'Azerbaijan', searchTerms: 'baku azerbaijan +4 azt' },
  { label: 'UTC+04:00 Tbilisi', value: 'Asia/Tbilisi', offset: 4, city: 'Tbilisi', country: 'Georgia', searchTerms: 'tbilisi georgia +4 get' },
  { label: 'UTC+04:00 Yerevan', value: 'Asia/Yerevan', offset: 4, city: 'Yerevan', country: 'Armenia', searchTerms: 'yerevan armenia +4 amt' },
  { label: 'UTC+04:00 Mauritius (Port Louis)', value: 'Indian/Mauritius', offset: 4, city: 'Port Louis', country: 'Mauritius', searchTerms: 'port louis mauritius +4 mut' },
  { label: 'UTC+04:00 Seychelles (Victoria)', value: 'Indian/Mahe', offset: 4, city: 'Victoria', country: 'Seychelles', searchTerms: 'victoria seychelles +4 sct' },
  
  // UTC+4:30
  { label: 'UTC+04:30 Kabul', value: 'Asia/Kabul', offset: 4.5, city: 'Kabul', country: 'Afghanistan', searchTerms: 'kabul afghanistan +4.5 +4:30 aft' },
  
  // UTC+5
  { label: 'UTC+05:00 Karachi', value: 'Asia/Karachi', offset: 5, city: 'Karachi', country: 'Pakistan', searchTerms: 'karachi pakistan +5 pkt' },
  { label: 'UTC+05:00 Islamabad', value: 'Asia/Karachi', offset: 5, city: 'Islamabad', country: 'Pakistan', searchTerms: 'islamabad pakistan +5 pkt' },
  { label: 'UTC+05:00 Tashkent', value: 'Asia/Tashkent', offset: 5, city: 'Tashkent', country: 'Uzbekistan', searchTerms: 'tashkent uzbekistan +5 uzt' },
  { label: 'UTC+05:00 Maldives (Malé)', value: 'Indian/Maldives', offset: 5, city: 'Malé', country: 'Maldives', searchTerms: 'male maldives +5 mvt' },
  { label: 'UTC+05:00 Ashgabat', value: 'Asia/Ashgabat', offset: 5, city: 'Ashgabat', country: 'Turkmenistan', searchTerms: 'ashgabat turkmenistan +5 tmt' },
  
  // UTC+5:30
  { label: 'UTC+05:30 Mumbai', value: 'Asia/Kolkata', offset: 5.5, city: 'Mumbai', country: 'India', searchTerms: 'mumbai bombay india +5.5 +5:30 ist' },
  { label: 'UTC+05:30 Delhi', value: 'Asia/Kolkata', offset: 5.5, city: 'Delhi', country: 'India', searchTerms: 'delhi new delhi india +5.5 +5:30 ist' },
  { label: 'UTC+05:30 Bangalore', value: 'Asia/Kolkata', offset: 5.5, city: 'Bangalore', country: 'India', searchTerms: 'bangalore bengaluru india +5.5 +5:30 ist' },
  { label: 'UTC+05:30 Kolkata', value: 'Asia/Kolkata', offset: 5.5, city: 'Kolkata', country: 'India', searchTerms: 'kolkata calcutta india +5.5 +5:30 ist' },
  { label: 'UTC+05:30 Chennai', value: 'Asia/Kolkata', offset: 5.5, city: 'Chennai', country: 'India', searchTerms: 'chennai madras india +5.5 +5:30 ist' },
  { label: 'UTC+05:30 Colombo', value: 'Asia/Colombo', offset: 5.5, city: 'Colombo', country: 'Sri Lanka', searchTerms: 'colombo sri lanka +5.5 +5:30 ist' },
  
  // UTC+5:45
  { label: 'UTC+05:45 Kathmandu', value: 'Asia/Kathmandu', offset: 5.75, city: 'Kathmandu', country: 'Nepal', searchTerms: 'kathmandu nepal +5.75 +5:45 npt' },
  
  // UTC+6
  { label: 'UTC+06:00 Dhaka', value: 'Asia/Dhaka', offset: 6, city: 'Dhaka', country: 'Bangladesh', searchTerms: 'dhaka bangladesh +6 bst' },
  { label: 'UTC+06:00 Almaty', value: 'Asia/Almaty', offset: 6, city: 'Almaty', country: 'Kazakhstan', searchTerms: 'almaty kazakhstan +6 almt' },
  { label: 'UTC+06:00 Thimphu', value: 'Asia/Thimphu', offset: 6, city: 'Thimphu', country: 'Bhutan', searchTerms: 'thimphu bhutan +6 btt' },
  { label: 'UTC+06:00 Bishkek', value: 'Asia/Bishkek', offset: 6, city: 'Bishkek', country: 'Kyrgyzstan', searchTerms: 'bishkek kyrgyzstan +6 kgt' },
  
  // UTC+6:30
  { label: 'UTC+06:30 Yangon', value: 'Asia/Yangon', offset: 6.5, city: 'Yangon', country: 'Myanmar', searchTerms: 'yangon rangoon myanmar burma +6.5 +6:30 mmt' },
  { label: 'UTC+06:30 Cocos Islands', value: 'Indian/Cocos', offset: 6.5, city: 'Cocos Islands', country: 'Cocos Islands', searchTerms: 'cocos islands +6.5 +6:30 cct' },
  
  // UTC+7
  { label: 'UTC+07:00 Bangkok', value: 'Asia/Bangkok', offset: 7, city: 'Bangkok', country: 'Thailand', searchTerms: 'bangkok thailand +7 ict' },
  { label: 'UTC+07:00 Jakarta', value: 'Asia/Jakarta', offset: 7, city: 'Jakarta', country: 'Indonesia', searchTerms: 'jakarta indonesia +7 wib' },
  { label: 'UTC+07:00 Hanoi', value: 'Asia/Ho_Chi_Minh', offset: 7, city: 'Hanoi', country: 'Vietnam', searchTerms: 'hanoi vietnam +7 ict' },
  { label: 'UTC+07:00 Ho Chi Minh City', value: 'Asia/Ho_Chi_Minh', offset: 7, city: 'Ho Chi Minh City', country: 'Vietnam', searchTerms: 'ho chi minh city saigon vietnam +7 ict' },
  { label: 'UTC+07:00 Phnom Penh', value: 'Asia/Phnom_Penh', offset: 7, city: 'Phnom Penh', country: 'Cambodia', searchTerms: 'phnom penh cambodia +7 ict' },
  { label: 'UTC+07:00 Vientiane', value: 'Asia/Vientiane', offset: 7, city: 'Vientiane', country: 'Laos', searchTerms: 'vientiane laos +7 ict' },
  
  // UTC+8
  { label: 'UTC+08:00 Singapore', value: 'Asia/Singapore', offset: 8, city: 'Singapore', country: 'Singapore', searchTerms: 'singapore +8 sgt' },
  { label: 'UTC+08:00 Hong Kong', value: 'Asia/Hong_Kong', offset: 8, city: 'Hong Kong', country: 'Hong Kong', searchTerms: 'hong kong +8 hkt' },
  { label: 'UTC+08:00 Beijing', value: 'Asia/Shanghai', offset: 8, city: 'Beijing', country: 'China', searchTerms: 'beijing peking china +8 cst' },
  { label: 'UTC+08:00 Shanghai', value: 'Asia/Shanghai', offset: 8, city: 'Shanghai', country: 'China', searchTerms: 'shanghai china +8 cst' },
  { label: 'UTC+08:00 Taipei', value: 'Asia/Taipei', offset: 8, city: 'Taipei', country: 'Taiwan', searchTerms: 'taipei taiwan +8 cst' },
  { label: 'UTC+08:00 Manila', value: 'Asia/Manila', offset: 8, city: 'Manila', country: 'Philippines', searchTerms: 'manila philippines +8 pst' },
  { label: 'UTC+08:00 Kuala Lumpur', value: 'Asia/Kuala_Lumpur', offset: 8, city: 'Kuala Lumpur', country: 'Malaysia', searchTerms: 'kuala lumpur malaysia +8 myt' },
  { label: 'UTC+08:00 Perth', value: 'Australia/Perth', offset: 8, city: 'Perth', country: 'Australia', searchTerms: 'perth australia +8 awst' },
  { label: 'UTC+08:00 Macau', value: 'Asia/Macau', offset: 8, city: 'Macau', country: 'Macau', searchTerms: 'macau macao +8 cst' },
  { label: 'UTC+08:00 Brunei (Bandar Seri Begawan)', value: 'Asia/Brunei', offset: 8, city: 'Bandar Seri Begawan', country: 'Brunei', searchTerms: 'bandar seri begawan brunei +8 bnt' },
  { label: 'UTC+08:00 Ulaanbaatar', value: 'Asia/Ulaanbaatar', offset: 8, city: 'Ulaanbaatar', country: 'Mongolia', searchTerms: 'ulaanbaatar ulan bator mongolia +8 ulat' },
  
  // UTC+8:45
  { label: 'UTC+08:45 Eucla', value: 'Australia/Eucla', offset: 8.75, city: 'Eucla', country: 'Australia', searchTerms: 'eucla australia +8.75 +8:45 acwst' },
  
  // UTC+9
  { label: 'UTC+09:00 Tokyo', value: 'Asia/Tokyo', offset: 9, city: 'Tokyo', country: 'Japan', searchTerms: 'tokyo japan +9 jst' },
  { label: 'UTC+09:00 Seoul', value: 'Asia/Seoul', offset: 9, city: 'Seoul', country: 'South Korea', searchTerms: 'seoul south korea +9 kst' },
  { label: 'UTC+09:00 Pyongyang', value: 'Asia/Pyongyang', offset: 9, city: 'Pyongyang', country: 'North Korea', searchTerms: 'pyongyang north korea +9 kst' },
  { label: 'UTC+09:00 Dili', value: 'Asia/Dili', offset: 9, city: 'Dili', country: 'East Timor', searchTerms: 'dili east timor timor leste +9 tlt' },
  { label: 'UTC+09:00 Palau', value: 'Pacific/Palau', offset: 9, city: 'Palau', country: 'Palau', searchTerms: 'palau +9 pwt' },
  
  // UTC+9:30
  { label: 'UTC+09:30 Adelaide', value: 'Australia/Adelaide', offset: 9.5, city: 'Adelaide', country: 'Australia', searchTerms: 'adelaide australia +9.5 +9:30 acst acdt' },
  { label: 'UTC+09:30 Darwin', value: 'Australia/Darwin', offset: 9.5, city: 'Darwin', country: 'Australia', searchTerms: 'darwin australia +9.5 +9:30 acst' },
  
  // UTC+10
  { label: 'UTC+10:00 Sydney', value: 'Australia/Sydney', offset: 10, city: 'Sydney', country: 'Australia', searchTerms: 'sydney australia +10 aest aedt' },
  { label: 'UTC+10:00 Melbourne', value: 'Australia/Melbourne', offset: 10, city: 'Melbourne', country: 'Australia', searchTerms: 'melbourne australia +10 aest aedt' },
  { label: 'UTC+10:00 Brisbane', value: 'Australia/Brisbane', offset: 10, city: 'Brisbane', country: 'Australia', searchTerms: 'brisbane australia +10 aest' },
  { label: 'UTC+10:00 Canberra', value: 'Australia/Sydney', offset: 10, city: 'Canberra', country: 'Australia', searchTerms: 'canberra australia +10 aest aedt' },
  { label: 'UTC+10:00 Port Moresby', value: 'Pacific/Port_Moresby', offset: 10, city: 'Port Moresby', country: 'Papua New Guinea', searchTerms: 'port moresby papua new guinea png +10 pgt' },
  { label: 'UTC+10:00 Guam', value: 'Pacific/Guam', offset: 10, city: 'Guam', country: 'Guam', searchTerms: 'guam +10 chst' },
  
  // UTC+10:30
  { label: 'UTC+10:30 Lord Howe Island', value: 'Australia/Lord_Howe', offset: 10.5, city: 'Lord Howe', country: 'Australia', searchTerms: 'lord howe island australia +10.5 +10:30 lhst lhdt' },
  
  // UTC+11
  { label: 'UTC+11:00 Noumea', value: 'Pacific/Noumea', offset: 11, city: 'Noumea', country: 'New Caledonia', searchTerms: 'noumea new caledonia +11 nct' },
  { label: 'UTC+11:00 Solomon Islands (Honiara)', value: 'Pacific/Guadalcanal', offset: 11, city: 'Honiara', country: 'Solomon Islands', searchTerms: 'honiara solomon islands +11 sbt' },
  { label: 'UTC+11:00 Vanuatu (Port Vila)', value: 'Pacific/Efate', offset: 11, city: 'Port Vila', country: 'Vanuatu', searchTerms: 'port vila vanuatu +11 vut' },
  
  // UTC+12
  { label: 'UTC+12:00 Auckland', value: 'Pacific/Auckland', offset: 12, city: 'Auckland', country: 'New Zealand', searchTerms: 'auckland new zealand nz +12 nzst nzdt' },
  { label: 'UTC+12:00 Wellington', value: 'Pacific/Auckland', offset: 12, city: 'Wellington', country: 'New Zealand', searchTerms: 'wellington new zealand nz +12 nzst nzdt' },
  { label: 'UTC+12:00 Fiji (Suva)', value: 'Pacific/Fiji', offset: 12, city: 'Suva', country: 'Fiji', searchTerms: 'suva fiji +12 fjt' },
  { label: 'UTC+12:00 Marshall Islands (Majuro)', value: 'Pacific/Majuro', offset: 12, city: 'Majuro', country: 'Marshall Islands', searchTerms: 'majuro marshall islands +12 mht' },
  { label: 'UTC+12:00 Nauru', value: 'Pacific/Nauru', offset: 12, city: 'Nauru', country: 'Nauru', searchTerms: 'nauru +12 nrt' },
  { label: 'UTC+12:00 Tuvalu (Funafuti)', value: 'Pacific/Funafuti', offset: 12, city: 'Funafuti', country: 'Tuvalu', searchTerms: 'funafuti tuvalu +12 tvt' },
  { label: 'UTC+12:00 Wake Island', value: 'Pacific/Wake', offset: 12, city: 'Wake Island', country: 'United States', searchTerms: 'wake island usa +12 wakt' },
  { label: 'UTC+12:00 Wallis and Futuna', value: 'Pacific/Wallis', offset: 12, city: 'Wallis and Futuna', country: 'Wallis and Futuna', searchTerms: 'wallis futuna +12 wft' },
  
  // UTC+12:45
  { label: 'UTC+12:45 Chatham Islands', value: 'Pacific/Chatham', offset: 12.75, city: 'Chatham Islands', country: 'New Zealand', searchTerms: 'chatham islands new zealand +12.75 +12:45 chast chadt' },
  
  // UTC+13
  { label: 'UTC+13:00 Tonga (Nukuʻalofa)', value: 'Pacific/Tongatapu', offset: 13, city: 'Nukuʻalofa', country: 'Tonga', searchTerms: 'nukualofa tonga +13 tot' },
  { label: 'UTC+13:00 Samoa (Apia)', value: 'Pacific/Apia', offset: 13, city: 'Apia', country: 'Samoa', searchTerms: 'apia samoa +13 wst' },
  { label: 'UTC+13:00 Tokelau', value: 'Pacific/Fakaofo', offset: 13, city: 'Tokelau', country: 'Tokelau', searchTerms: 'tokelau fakaofo +13 tkt' },
  
  // UTC+14
  { label: 'UTC+14:00 Kiribati (Kiritimati)', value: 'Pacific/Kiritimati', offset: 14, city: 'Kiritimati', country: 'Kiribati', searchTerms: 'kiritimati kiribati christmas island +14 lint' },
];

interface TimezoneComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
}

export function TimezoneCombobox({ value, onChange, placeholder, label }: TimezoneComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedTimezone = allTimezones.find((tz) => tz.value === value);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-white/70">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-[48px] bg-white/10 border-white/20 text-white hover:bg-white/20 text-left"
          >
            <span className="truncate">
              {selectedTimezone ? selectedTimezone.label : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[min(90vw,500px)] p-0 bg-[#1e293b] border-white/20" align="start">
          <Command className="bg-transparent">
            <CommandInput 
              placeholder="Search city, country, or timezone..." 
              className="h-12 text-white placeholder:text-white/50"
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty className="py-6 text-center text-sm text-white/60">
                No timezone found.
              </CommandEmpty>
              <CommandGroup>
                {allTimezones.map((tz) => (
                  <CommandItem
                    key={tz.value + tz.city + tz.country}
                    value={tz.searchTerms}
                    onSelect={() => {
                      onChange(tz.value);
                      setOpen(false);
                    }}
                    className="text-white hover:bg-white/10 cursor-pointer py-3"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value === tz.value ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">{tz.city}, {tz.country}</span>
                      <span className="text-xs text-white/50">
                        UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}:00
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
