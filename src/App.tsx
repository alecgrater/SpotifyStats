import React from 'react';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { DataTable } from './components/DataTable';
import { YearFilter } from './components/YearFilter';
import { useSpotifyStore } from './store/useSpotifyStore';
import { formatDistanceToNow } from 'date-fns';
import { createColumnHelper } from '@tanstack/react-table';
import { Music2, Users, Disc3 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = React.useState<'songs' | 'artists' | 'albums'>('songs');
  const { filteredTracks, filteredArtists, filteredAlbums } = useSpotifyStore();

  const columnHelper = createColumnHelper<any>();

  const songColumns = [
    columnHelper.accessor('name', {
      header: 'Song',
      cell: (info) => (
        <div>
          <div className="font-bold">{info.getValue()}</div>
          <div className="text-sm text-gray-500">{info.row.original.artist}</div>
        </div>
      ),
    }),
    columnHelper.accessor('playCount', {
      header: 'Plays',
    }),
    columnHelper.accessor('totalDuration', {
      header: 'Duration',
      cell: (info) => {
        const hours = Math.floor(info.getValue() / (1000 * 60 * 60));
        const minutes = Math.floor((info.getValue() % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      },
    }),
    columnHelper.accessor('lastPlayed', {
      header: 'Last Played',
      cell: (info) => formatDistanceToNow(new Date(info.getValue()), { addSuffix: true }),
    }),
  ];

  const artistColumns = [
    columnHelper.accessor('name', {
      header: 'Artist',
    }),
    columnHelper.accessor('playCount', {
      header: 'Plays',
    }),
    columnHelper.accessor('totalDuration', {
      header: 'Duration',
      cell: (info) => {
        const hours = Math.floor(info.getValue() / (1000 * 60 * 60));
        const minutes = Math.floor((info.getValue() % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      },
    }),
  ];

  const albumColumns = [
    columnHelper.accessor('name', {
      header: 'Album',
      cell: (info) => (
        <div>
          <div className="font-bold">{info.getValue()}</div>
          <div className="text-sm text-gray-500">{info.row.original.artist}</div>
        </div>
      ),
    }),
    columnHelper.accessor('playCount', {
      header: 'Plays',
    }),
    columnHelper.accessor('totalDuration', {
      header: 'Duration',
      cell: (info) => {
        const hours = Math.floor(info.getValue() / (1000 * 60 * 60));
        const minutes = Math.floor((info.getValue() % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      },
    }),
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Spotify History Analyzer
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {filteredTracks.length === 0 ? (
          <FileUpload />
        ) : (
          <>
            <Dashboard />
            
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('songs')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      activeTab === 'songs'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Music2 className="w-5 h-5 mr-2" />
                    Songs
                  </button>
                  <button
                    onClick={() => setActiveTab('artists')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      activeTab === 'artists'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Artists
                  </button>
                  <button
                    onClick={() => setActiveTab('albums')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      activeTab === 'albums'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Disc3 className="w-5 h-5 mr-2" />
                    Albums
                  </button>
                </div>
                <YearFilter />
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden">
                {activeTab === 'songs' && (
                  <DataTable
                    data={filteredTracks}
                    columns={songColumns}
                    defaultSorting={[{ id: 'playCount', desc: true }]}
                  />
                )}
                {activeTab === 'artists' && (
                  <DataTable
                    data={filteredArtists}
                    columns={artistColumns}
                    defaultSorting={[{ id: 'playCount', desc: true }]}
                  />
                )}
                {activeTab === 'albums' && (
                  <DataTable
                    data={filteredAlbums}
                    columns={albumColumns}
                    defaultSorting={[{ id: 'playCount', desc: true }]}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;