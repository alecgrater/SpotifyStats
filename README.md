# Spotify History Analyzer

A web application that helps you analyze and visualize your Spotify listening history. Upload your extended streaming history files and get insights about your listening patterns, favorite tracks, artists, and albums.

## 🌟 Features

### Data Upload
- Drag-and-drop interface for multiple JSON files
- Automatic validation of Spotify JSON schema
- Clear instructions for obtaining your Spotify data

### Interactive Data Browsing
- **Songs Tab**: View detailed listening history with play counts, duration, and last played time
- **Artists Tab**: See aggregated statistics for each artist
- **Albums Tab**: Explore your album listening patterns
- Year filter to analyze data from specific time periods

### Dashboard
- Total play count statistics
- Total listening time
- Top tracks, artists, and albums
- Visual data representation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spotify-history-analyzer.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### How to Get Your Spotify Data

1. Log on to Spotify from a web browser
2. Navigate to **Profile > Account > Account Privacy**
3. Request **Extended Streaming History**
4. Wait for the email with the download link
5. Upload the JSON files to the analyzer

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [TanStack Table](https://tanstack.com/table/v8) - Table management
- [Lucide React](https://lucide.dev/) - Icons
- [date-fns](https://date-fns.org/) - Date formatting
- [React Dropzone](https://react-dropzone.js.org/) - File upload

## 📱 Responsive Design

The application is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Privacy

This application processes all data locally in your browser. No data is sent to any server or stored anywhere outside your device.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.