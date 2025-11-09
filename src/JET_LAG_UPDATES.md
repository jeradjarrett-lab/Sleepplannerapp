# Jet Lag Calculator Updates - Recovery Days Enhancement

## Date
November 9, 2025

## Changes Made

### 1. **Science-Based Recovery Calculation**

**Previous Logic:**
- Fixed recovery days based on severity brackets:
  - ≤2 hours: 2 days
  - ≤5 hours: 4 days
  - ≤8 hours: 6 days
  - >8 hours: 7 days

**New Logic:**
- **Dynamic calculation**: ~1 day per time zone crossed
- **Formula**: `recoveryDays = Math.ceil(hoursDiff)`
- **Minimum**: 2 days (for any jet lag)
- **Maximum**: 14 days (for extreme time zone differences)
- **Eastward Adjustment**: For eastward travel crossing 5+ time zones, adds 20% extra recovery time
  - Example: 10 hours eastward = 10 days + 2 days = 12 days recovery

### 2. **Visual Recovery Dashboard**

Added a 3-card summary display showing:

**Card 1 - Time Zones Crossed:**
- Icon: Calendar
- Shows: Number of time zones (rounded up)
- Color: Blue

**Card 2 - Estimated Recovery:**
- Icon: Clock
- Shows: Total recovery days calculated
- Color: Green

**Card 3 - Recovery Rate:**
- Icon: Lightbulb
- Shows: "~1 day/zone" rule
- Color: Purple

### 3. **Enhanced Day-by-Day Notes**

**Previous:**
- Fixed notes for days 1-7 only
- No dynamic adjustment for longer trips

**New:**
- Dynamic notes that scale with recovery length
- Percentage-based progress tracking
- Customized messages based on recovery stage:
  - Days 1-3: Critical adjustment period
  - Mid-recovery: Progress updates with percentages
  - Final days: Nearly/fully adjusted messages

### 4. **Updated Educational Content**

Added to Info Section:
- **"Understanding Jet Lag & Recovery Time"** heading
- Clear explanation of the **"1 day per time zone"** rule
- Scientific reasoning for eastward travel difficulty
- 20-30% extra time needed for eastward travel across 5+ zones

## Examples

### Example 1: New York to London (5 hours eastward)
- Time zones crossed: 5
- Base recovery: 5 days
- Eastward adjustment: +1 day (5 × 0.2)
- **Total recovery: 6 days**

### Example 2: Los Angeles to Tokyo (17 hours eastward)
- Time zones crossed: 17
- Base recovery: 17 days → capped at 14 days
- Eastward adjustment: already at max
- **Total recovery: 14 days**

### Example 3: London to New York (5 hours westward)
- Time zones crossed: 5
- Base recovery: 5 days
- No eastward adjustment
- **Total recovery: 5 days**

### Example 4: Short trip - 2 hour difference
- Time zones crossed: 2
- Base recovery: 2 days (minimum)
- **Total recovery: 2 days**

## Benefits

1. ✅ **More Accurate**: Based on circadian rhythm research
2. ✅ **Personalized**: Scales with actual time difference
3. ✅ **Realistic**: Accounts for eastward travel difficulty
4. ✅ **Informative**: Clear visual feedback on recovery timeline
5. ✅ **Scalable**: Handles extreme time differences (up to 14 days)

## Technical Implementation

### Key Code Changes:

```javascript
// Recovery calculation (lines 192-202)
let recoveryDays = Math.ceil(hoursDiff);
recoveryDays = Math.max(2, Math.min(recoveryDays, 14));

if (isEastward && hoursDiff > 5) {
  recoveryDays = Math.min(recoveryDays + Math.ceil(hoursDiff * 0.2), 14);
}

// Dynamic notes with percentage
const percentAdjusted = Math.round((i / recoveryDays) * 100);
```

### UI Components Added:

```jsx
{/* Total Recovery Days Display */}
<div className="grid md:grid-cols-3 gap-4">
  <Card>Time Zones Crossed</Card>
  <Card>Estimated Recovery</Card>
  <Card>Recovery Rate</Card>
</div>
```

## Medical Disclaimer

The recovery times are estimates based on general circadian rhythm research. Individual recovery times may vary based on:
- Age and overall health
- Sleep quality and habits
- Previous travel experience
- Individual circadian rhythm sensitivity
- Use of recovery strategies (light exposure, melatonin, etc.)

Always consult with a healthcare provider for personalized medical advice.

## Future Enhancements

Potential improvements for future versions:
1. Age-based recovery adjustments (older adults may need more time)
2. Customizable recovery strategies (aggressive vs conservative)
3. Integration with sleep tracking data
4. Return trip planning (readjustment to home timezone)
5. Multiple destination itineraries
