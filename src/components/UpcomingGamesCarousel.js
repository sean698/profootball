'use client';
import React, { useState, useEffect } from 'react';

// Function to fetch upcoming games from ESPN API
async function fetchUpcomingGames() {
  try {
    // Get current week's games
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
    const data = await response.json();
    
    if (!data.events || data.events.length === 0) {
      throw new Error('No events found');
    }

    // Transform ESPN API data to our format
    const games = data.events
      .filter(event => {
        // Only include games that haven't started yet or are upcoming
        const gameDate = new Date(event.date);
        const now = new Date();
        return gameDate > now || event.status.type.name === 'STATUS_SCHEDULED';
      })
      .map(event => {
        const competition = event.competitions[0];
        const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
        const awayTeam = competition.competitors.find(c => c.homeAway === 'away');
        
        return {
          id: event.id,
          homeTeam: {
            name: homeTeam.team.displayName,
            logo: homeTeam.team.logo,
            record: homeTeam.records?.[0]?.summary || '0-0'
          },
          awayTeam: {
            name: awayTeam.team.displayName,
            logo: awayTeam.team.logo,
            record: awayTeam.records?.[0]?.summary || '0-0'
          },
          date: event.date,
          week: `Week ${data.week?.number || 'TBD'}`,
          venue: competition.venue?.fullName || 'TBD',
          network: competition.broadcasts?.[0]?.names?.[0] || 'TBD'
        };
      });

    // If no upcoming games in current week, fetch next few weeks
    if (games.length === 0) {
      // Fallback to get more games from the season
      const seasonResponse = await fetch('https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2025/types/2/events?limit=50');
      const seasonData = await seasonResponse.json();
      
      if (seasonData.items) {
        const futureGames = await Promise.all(
          seasonData.items.slice(0, 10).map(async (eventRef) => {
            try {
              const eventResponse = await fetch(eventRef.$ref);
              const eventData = await eventResponse.json();
              
              const gameDate = new Date(eventData.date);
              const now = new Date();
              
              if (gameDate > now) {
                const competition = eventData.competitions[0];
                const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
                const awayTeam = competition.competitors.find(c => c.homeAway === 'away');
                
                return {
                  id: eventData.id,
                  homeTeam: {
                    name: homeTeam.team.displayName,
                    logo: homeTeam.team.logo,
                    record: homeTeam.records?.[0]?.summary || '0-0'
                  },
                  awayTeam: {
                    name: awayTeam.team.displayName,
                    logo: awayTeam.team.logo,
                    record: awayTeam.records?.[0]?.summary || '0-0'
                  },
                  date: eventData.date,
                  week: `Week ${eventData.week?.number || 'TBD'}`,
                  venue: competition.venue?.fullName || 'TBD',
                  network: competition.broadcasts?.[0]?.names?.[0] || 'TBD'
                };
              }
              return null;
            } catch (error) {
              console.error('Error fetching individual event:', error);
              return null;
            }
          })
        );
        
        return futureGames.filter(game => game !== null).slice(0, 8);
      }
    }

    return games.slice(0, 8); // Limit to 8 games for display
  } catch (error) {
    console.error('Error fetching ESPN API data:', error);
    
    // Fallback mock data if API fails
    return [
      {
        id: 1,
        homeTeam: { 
          name: 'Kansas City Chiefs', 
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png',
          record: '10-1' 
        },
        awayTeam: { 
          name: 'Buffalo Bills', 
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
          record: '9-2' 
        },
        date: '2024-01-14T20:30:00Z',
        week: 'Wild Card',
        venue: 'Arrowhead Stadium',
        network: 'CBS'
      },
      {
        id: 2,
        homeTeam: { 
          name: 'San Francisco 49ers', 
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png',
          record: '8-3' 
        },
        awayTeam: { 
          name: 'Green Bay Packers', 
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
          record: '7-4' 
        },
        date: '2024-01-15T16:30:00Z',
        week: 'Wild Card',
        venue: "Levi's Stadium",
        network: 'FOX'
      }
    ];
  }
}

function formatGameDate(dateString) {
  try {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    return {
      dayName,
      date: `${month} ${day}`,
      time,
      fullDate: `${dayName} ${month} ${day}` // e.g., "Sun Jan 14"
    };
  } catch (error) {
    return {
      dayName: 'TBD',
      date: 'TBD',
      time: 'TBD',
      fullDate: 'TBD'
    };
  }
}

const UpcomingGamesCarousel = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const gamesData = await fetchUpcomingGames();
        setGames(gamesData);
        setError(null);
      } catch (err) {
        console.error('Error loading games:', err);
        setError('Failed to load games');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
    
    // Refresh games every 5 minutes
    const interval = setInterval(loadGames, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mb-4 relative overflow-hidden">
        <div className="flex items-center px-4 py-2 bg-red-600">
          <span className="text-sm font-bold tracking-wide">UPCOMING GAMES</span>
          <div className="ml-auto text-xs opacity-75">LOADING...</div>
        </div>
        <div className="h-16 flex items-center justify-center">
          <div className="text-gray-300 text-sm">Loading upcoming games...</div>
        </div>
      </div>
    );
  }

  if (error || games.length === 0) {
    return (
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mb-4 relative overflow-hidden">
        <div className="flex items-center px-4 py-2 bg-red-600">
          <span className="text-sm font-bold tracking-wide">UPCOMING GAMES</span>
          <div className="ml-auto text-xs opacity-75">NO GAMES</div>
        </div>
        <div className="h-16 flex items-center justify-center">
          <div className="text-gray-300 text-sm">No upcoming games found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mb-4 relative overflow-hidden">
      {/* Sports Ticker Header */}
      <div className="flex items-center px-4 py-2 bg-red-600">
        <span className="text-sm font-bold tracking-wide">UPCOMING GAMES</span>
        <div className="ml-auto text-xs opacity-75">LIVE SCHEDULE</div>
      </div>
      
      {/* Scrolling Ticker */}
      <div className="relative overflow-hidden h-16">
        <div className="absolute inset-0 flex items-center">
          <div className="flex whitespace-nowrap ticker-scroll">
            {/* Double the games array for seamless scrolling */}
            {[...games, ...games].map((game, index) => {
              const gameDate = formatGameDate(game.date);
              
              return (
                <div key={`${game.id}-${index}`} className="flex items-center mx-8 flex-shrink-0 min-w-[300px]">
                  {/* Away Team */}
                  <div className="flex items-center mr-3">
                    <img 
                      src={game.awayTeam.logo} 
                      alt={game.awayTeam.name}
                      className="w-8 h-8 mr-2"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2Mzc1OTEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
                      }}
                    />
                    <div className="text-right">
                      <div className="text-sm font-semibold leading-none">
                        {game.awayTeam.name.split(' ').slice(-1)[0].toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-300 leading-none mt-0.5">
                        {game.awayTeam.record}
                      </div>
                    </div>
                  </div>
                  
                  {/* VS indicator */}
                  <div className="mx-2 text-xs text-gray-400 font-bold">@</div>
                  
                  {/* Home Team */}
                  <div className="flex items-center mr-4">
                    <img 
                      src={game.homeTeam.logo} 
                      alt={game.homeTeam.name}
                      className="w-8 h-8 mr-2"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2Mzc1OTEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold leading-none">
                        {game.homeTeam.name.split(' ').slice(-1)[0].toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-300 leading-none mt-0.5">
                        {game.homeTeam.record}
                      </div>
                    </div>
                  </div>
                  
                  {/* Game Time & Network */}
                  <div className="text-right mr-6">
                    <div className="text-xs font-semibold text-yellow-400 leading-none">
                      {gameDate.fullDate} {gameDate.time}
                    </div>
                    <div className="text-xs text-gray-300 leading-none mt-0.5">
                      {game.network}
                    </div>
                  </div>
                  
                  {/* Separator */}
                  <div className="w-px h-8 bg-gray-600 mr-8"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingGamesCarousel; 