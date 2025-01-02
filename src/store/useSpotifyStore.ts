import { create } from 'zustand';
import { ProcessedTrack, ProcessedArtist, ProcessedAlbum, SpotifyTrack } from '../types/spotify';

interface SpotifyStore {
  tracks: ProcessedTrack[];
  artists: ProcessedArtist[];
  albums: ProcessedAlbum[];
  selectedYear: string;
  isProcessing: boolean;
  setSelectedYear: (year: string) => void;
  processFiles: (files: File[]) => Promise<void>;
  filteredTracks: ProcessedTrack[];
  filteredArtists: ProcessedArtist[];
  filteredAlbums: ProcessedAlbum[];
}

export const useSpotifyStore = create<SpotifyStore>((set, get) => ({
  tracks: [],
  artists: [],
  albums: [],
  selectedYear: 'all',
  isProcessing: false,
  filteredTracks: [],
  filteredArtists: [],
  filteredAlbums: [],
  
  setSelectedYear: (year) => {
    const state = get();
    const filterByYear = (date: string) => {
      if (year === 'all') return true;
      return new Date(date).getFullYear().toString() === year;
    };

    // Filter tracks and calculate new totals for artists and albums
    const newFilteredTracks = state.tracks.filter(track => filterByYear(track.lastPlayed));
    
    // Create maps to accumulate artist and album stats
    const artistStats = new Map<string, ProcessedArtist>();
    const albumStats = new Map<string, ProcessedAlbum>();

    newFilteredTracks.forEach(track => {
      // Update artist stats
      const artistKey = track.artist;
      const currentArtist = artistStats.get(artistKey) || {
        name: track.artist,
        playCount: 0,
        totalDuration: 0
      };
      artistStats.set(artistKey, {
        ...currentArtist,
        playCount: currentArtist.playCount + track.playCount,
        totalDuration: currentArtist.totalDuration + track.totalDuration
      });

      // Update album stats
      const albumKey = `${track.album}-${track.artist}`;
      const currentAlbum = albumStats.get(albumKey) || {
        name: track.album,
        artist: track.artist,
        playCount: 0,
        totalDuration: 0
      };
      albumStats.set(albumKey, {
        ...currentAlbum,
        playCount: currentAlbum.playCount + track.playCount,
        totalDuration: currentAlbum.totalDuration + track.totalDuration
      });
    });

    set({
      selectedYear: year,
      filteredTracks: newFilteredTracks,
      filteredArtists: Array.from(artistStats.values()),
      filteredAlbums: Array.from(albumStats.values())
    });
  },
  
  processFiles: async (files) => {
    set({ isProcessing: true });
    
    try {
      const trackData: SpotifyTrack[] = [];
      
      for (const file of files) {
        const text = await file.text();
        const data = JSON.parse(text);
        trackData.push(...data);
      }
      
      // Process tracks
      const tracksMap = new Map<string, ProcessedTrack>();
      const artistsMap = new Map<string, ProcessedArtist>();
      const albumsMap = new Map<string, ProcessedAlbum>();
      
      trackData.forEach((track) => {
        if (!track.master_metadata_track_name) return;
        
        const trackId = `${track.master_metadata_track_name}-${track.master_metadata_album_artist_name}`;
        const duration = track.ms_played;
        
        // Process track
        const existingTrack = tracksMap.get(trackId) || {
          id: trackId,
          name: track.master_metadata_track_name,
          artist: track.master_metadata_album_artist_name,
          album: track.master_metadata_album_album_name,
          playCount: 0,
          totalDuration: 0,
          lastPlayed: track.ts,
        };
        
        existingTrack.playCount += 1;
        existingTrack.totalDuration += duration;
        if (new Date(track.ts) > new Date(existingTrack.lastPlayed)) {
          existingTrack.lastPlayed = track.ts;
        }
        tracksMap.set(trackId, existingTrack);
        
        // Process artist
        const artistName = track.master_metadata_album_artist_name;
        const existingArtist = artistsMap.get(artistName) || {
          name: artistName,
          playCount: 0,
          totalDuration: 0,
        };
        existingArtist.playCount += 1;
        existingArtist.totalDuration += duration;
        artistsMap.set(artistName, existingArtist);
        
        // Process album
        const albumId = `${track.master_metadata_album_album_name}-${artistName}`;
        const existingAlbum = albumsMap.get(albumId) || {
          name: track.master_metadata_album_album_name,
          artist: artistName,
          playCount: 0,
          totalDuration: 0,
        };
        existingAlbum.playCount += 1;
        existingAlbum.totalDuration += duration;
        albumsMap.set(albumId, existingAlbum);
      });

      const tracks = Array.from(tracksMap.values());
      const artists = Array.from(artistsMap.values());
      const albums = Array.from(albumsMap.values());
      
      set({
        tracks,
        artists,
        albums,
        filteredTracks: tracks,
        filteredArtists: artists,
        filteredAlbums: albums,
        isProcessing: false,
      });
    } catch (error) {
      console.error('Error processing files:', error);
      set({ isProcessing: false });
    }
  },
}));