import React from 'react';
import { Clock, Music, User, Disc } from 'lucide-react';
import { useSpotifyStore } from '../store/useSpotifyStore';

export function Dashboard() {
  const { filteredTracks, filteredArtists, filteredAlbums } = useSpotifyStore();

  const stats = React.useMemo(() => {
    const totalPlays = filteredTracks.reduce((sum, track) => sum + track.playCount, 0);
    const totalDuration = filteredTracks.reduce((sum, track) => sum + track.totalDuration, 0);
    
    const topTrack = [...filteredTracks].sort((a, b) => b.playCount - a.playCount)[0];
    const topArtist = [...filteredArtists].sort((a, b) => b.playCount - a.playCount)[0];
    const topAlbum = [...filteredAlbums].sort((a, b) => b.playCount - a.playCount)[0];

    return {
      totalPlays,
      totalDuration: Math.round(totalDuration / (1000 * 60 * 60)), // Convert to hours
      topTrack,
      topArtist,
      topAlbum,
    };
  }, [filteredTracks, filteredArtists, filteredAlbums]);

  if (!stats.topTrack) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <StatCard
        icon={<Music className="w-8 h-8 text-blue-500" />}
        title="Total Plays"
        value={stats.totalPlays.toLocaleString()}
      />
      <StatCard
        icon={<Clock className="w-8 h-8 text-green-500" />}
        title="Total Hours"
        value={`${stats.totalDuration.toLocaleString()} hrs`}
      />
      <StatCard
        icon={<User className="w-8 h-8 text-purple-500" />}
        title="Top Artist"
        value={stats.topArtist.name}
        subtitle={`${stats.topArtist.playCount} plays`}
      />
      <StatCard
        icon={<Disc className="w-8 h-8 text-red-500" />}
        title="Top Track"
        value={stats.topTrack.name}
        subtitle={stats.topTrack.artist}
      />
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}