# Jet Lag Calculator - Date & Time Validation Update

## Date
November 9, 2025

## Overview
Added comprehensive validation to ensure arrival date and time is always after departure date and time in the Jet Lag Calculator.

## Changes Implemented

### 1. **Helper Functions**

#### `timeToMinutes(timeString: string): number`
- Converts time string (HH:MM format) to total minutes
- Used for time comparisons

#### `isArrivalAfterDeparture(): boolean`
- Checks if arrival date/time is after departure date/time
- Returns true if dates are valid or not yet set
- Combines both date and time for accurate comparison

### 2. **Date Change Handlers**

#### `handleDepartureDateChange(date: Date | undefined)`
- Updates departure date
- **Auto-clears** arrival date if it becomes before the new departure date
- Prevents invalid state when user changes departure date

#### `handleArrivalDateChange(date: Date | undefined)`
- Updates arrival date with validation
- If same day as departure, **auto-adjusts** arrival time to 1 hour after departure
- Prevents selecting dates before departure (disabled in calendar)

#### `handleArrivalTimeChange(time: string)`
- Updates arrival time with validation
- If same day as departure, ensures time is after departure time
- **Auto-adjusts** to 1 hour after departure if conflict detected

### 3. **Calendar Validation**

#### Departure Date Calendar
```javascript
disabled={(date) => {
  // Disable dates before today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}}
```
- Prevents selecting past dates
- Users can only book future travel

#### Arrival Date Calendar
```javascript
disabled={(date) => {
  // Disable dates before departure date
  if (departureDate) {
    return date < departureDate;
  }
  return false;
}}
```
- Dynamically disables dates before departure
- Only shows valid arrival dates
- Adapts when departure date changes

### 4. **Visual Feedback**

Added warning message when validation fails:
```jsx
{arrivalDate && departureDate && !isArrivalAfterDeparture() && (
  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-red-300">
      Arrival date and time must be after departure date and time. 
      Please adjust your times.
    </p>
  </div>
)}
```

## User Experience Improvements

### Smart Auto-Adjustment
- **Same-day flights**: If user selects same arrival date as departure, arrival time automatically adjusts to 1 hour after departure
- **Changed departure**: If user changes departure date to after current arrival date, arrival date is cleared to prevent confusion

### Disabled Dates
- **Past dates**: Cannot select past dates for departure
- **Invalid arrival dates**: Cannot select arrival dates before departure date
- **Visual indication**: Disabled dates are grayed out in calendar

### Real-time Validation
- Validation happens as user types/selects
- Immediate feedback with warning message
- No need to submit form to see errors

## Example Scenarios

### Scenario 1: Same-Day Flight
**User Action:**
1. Selects departure: November 10, 2025 at 9:00 AM
2. Selects arrival: November 10, 2025 (same day)

**System Response:**
- Arrival time auto-adjusts to 10:00 AM (1 hour after departure)

### Scenario 2: Time Conflict on Same Day
**User Action:**
1. Departure: November 10, 2025 at 2:00 PM
2. Arrival: November 10, 2025 at 1:00 PM (before departure)

**System Response:**
- Arrival time auto-adjusts to 3:00 PM (1 hour after departure)
- Warning message briefly appears

### Scenario 3: Changing Departure Date
**User Action:**
1. Departure: November 10, 2025
2. Arrival: November 12, 2025
3. User changes departure to: November 15, 2025

**System Response:**
- Arrival date is cleared (was before new departure)
- User must select new arrival date

### Scenario 4: Multi-Day Flight
**User Action:**
1. Departure: November 10, 2025 at 11:00 PM
2. Arrival: November 11, 2025 at 1:00 AM

**System Response:**
- ✅ Valid - arrival is 2 hours after departure
- No warnings or adjustments

## Technical Details

### Date Comparison Logic
```javascript
const depDateTime = new Date(departureDate);
const arrDateTime = new Date(arrivalDate);

const [depHours, depMinutes] = departureTime.split(':').map(Number);
const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);

depDateTime.setHours(depHours, depMinutes, 0, 0);
arrDateTime.setHours(arrHours, arrMinutes, 0, 0);

return arrDateTime > depDateTime;
```

### Time Adjustment Algorithm
```javascript
// Ensure at least 1 hour gap
const newArrivalMinutes = depMinutes + 60;
const newHours = Math.floor(newArrivalMinutes / 60) % 24;
const newMinutes = newArrivalMinutes % 60;
```

## Benefits

1. ✅ **Prevents Invalid Data**: Impossible to create physically impossible itineraries
2. ✅ **User-Friendly**: Auto-adjustments minimize manual corrections
3. ✅ **Clear Feedback**: Visual warnings when conflicts exist
4. ✅ **Smart Defaults**: 1-hour minimum flight time is reasonable
5. ✅ **Flexible**: Works for short hops and long-haul flights
6. ✅ **Responsive**: Updates immediately as user makes changes

## Edge Cases Handled

- ✅ Overnight flights (departure 11 PM, arrival 2 AM next day)
- ✅ Same-day flights (departure and arrival on same date)
- ✅ Long-haul flights (multiple days)
- ✅ Changing departure after setting arrival
- ✅ Clearing dates (undefined states)
- ✅ 24-hour time wraparound (23:30 + 60 min = 00:30)

## Testing Checklist

- [x] Cannot select past departure dates
- [x] Cannot select arrival date before departure date
- [x] Same-day arrival auto-adjusts time if needed
- [x] Warning appears for invalid date/time combinations
- [x] Changing departure clears invalid arrival dates
- [x] Multi-day flights work correctly
- [x] Overnight flights work correctly
- [x] 24-hour time calculation handles wraparound

## Future Enhancements

Potential improvements:
1. **Minimum flight duration warning**: Alert if flight is unrealistically short (< 30 min)
2. **Maximum flight duration warning**: Alert if flight is unrealistically long (> 48 hours)
3. **Timezone-aware suggestions**: Suggest realistic arrival times based on timezone difference
4. **Flight duration display**: Show calculated flight duration to user
5. **Time zone conversion**: Display times in both origin and destination timezones
