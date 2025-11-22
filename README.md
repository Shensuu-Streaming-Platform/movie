# Shensuu Movie (Movie Browser)

A React-based movie browsing application that allows users to explore movies and TV shows using The Movie Database (TMDB) API.

## Features

- Browse trending movies and TV shows
- Search for specific movies or shows
- View detailed information including cast, crew, and trailers
- Browse by genres and platforms (Netflix, Amazon, etc.)
- Responsive design for mobile and desktop

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shensuu-Streaming-Platform/movie.git
cd movie
```

2. Install dependencies:
```bash
npm install
```

3. Get a TMDB API key:
   - Visit [The Movie Database API](https://www.themoviedb.org/documentation/api)
   - Create an account or log in
   - Go to your account settings and generate an API key

4. Create a `.env` file in the root directory and add your TMDB API key:
```bash
VITE_APP_TMDB_TOKEN=your_tmdb_api_key_here
```

## Usage

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Build

To build the application for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
