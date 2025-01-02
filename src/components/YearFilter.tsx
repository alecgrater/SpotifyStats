import React from 'react';
import { useSpotifyStore } from '../store/useSpotifyStore';

export function YearFilter() {
  const selectedYear = useSpotifyStore((state) => state.selectedYear);
  const setSelectedYear = useSpotifyStore((state) => state.setSelectedYear);
  const tracks = useSpotifyStore((state) => state.tracks);

  const years = React.useMemo(() => {
    const yearSet = new Set<string>();
    yearSet.add('all');
    
    tracks.forEach((track) => {
      const year = new Date(track.lastPlayed).getFullYear().toString();
      yearSet.add(year);
    });

    return Array.from(yearSet).sort();
  }, [tracks]);

  return (
    <div className="mb-4">
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year === 'all' ? 'All Time' : year}
          </option>
        ))}
      </select>
    </div>
  );
}