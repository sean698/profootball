"use client";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Get the correct NFL season year to display
function getNflSeasonYear() {
  const now = new Date();
  // Find the first Thursday in September for the current year
  for (let day = 1; day <= 7; day++) {
    const d = new Date(now.getFullYear(), 8, day);
    if (d.getDay() === 4) return now < d ? now.getFullYear() - 1 : now.getFullYear();
  }
  return now.getFullYear();
}
const showYear = getNflSeasonYear();

const conferenceMap = {
  AFC: "American Football Conference",
  NFC: "National Football Conference",
};
const conferences = ["AFC", "NFC"];

export default function StandingsPage() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConference, setSelectedConference] = useState("all");

  useEffect(() => {
    fetchStandings();
    // eslint-disable-next-line
  }, []);

  async function fetchStandings() {
    setLoading(true);
    setError(null);
    let allStandings = [];
    try {
      // Try CDN endpoint
      let response = await fetch(`https://cdn.espn.com/core/nfl/standings?xhr=1&year=${showYear}`);
      if (response.ok) {
        const data = await response.json();
        if (data.content && data.content.standings && data.content.standings.groups) {
          data.content.standings.groups.forEach(conference => {
            if (conference.groups) {
              conference.groups.forEach(division => {
                if (division.standings && division.standings.entries) {
                  division.standings.entries.forEach(team => {
                    allStandings.push({
                      ...team,
                      conference: conference.name || "Unknown",
                      division: division.name || "Unknown"
                    });
                  });
                }
              });
            }
          });
        }
      }
      // Fallback: site API
      if (!allStandings.length) {
        response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/standings?season=${showYear}`);
        if (response.ok) {
          const data = await response.json();
          if (data.children && data.children.length > 0) {
            data.children.forEach(conference => {
              if (conference.groups) {
                conference.groups.forEach(division => {
                  if (division.standings) {
                    division.standings.entries.forEach(team => {
                      allStandings.push({
                        ...team,
                        conference: conference.name,
                        division: division.name
                      });
                    });
                  }
                });
              }
            });
          }
        }
      }
      // Fallback: v2 API
      if (!allStandings.length) {
        response = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${showYear}/types/2/standings`);
        if (response.ok) {
          const data = await response.json();
          if (data.entries && data.entries.length > 0) {
            allStandings = data.entries;
          }
        }
      }
      if (!allStandings.length) throw new Error("No standings data available");
      setStandings(allStandings);
    } catch (err) {
      setError("Failed to load standings data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // Stat extraction helper
  function getStat(stats, key, value, fallback = "-") {
    return stats.find(s => s[key] === value)?.displayValue || fallback;
  }

  const filteredStandings =
    selectedConference === "all"
      ? standings
      : standings.filter(team => team.conference === conferenceMap[selectedConference]);

  // Table and card class names
  const tableHeader = "px-4 py-4 text-center text-gray-900 font-['DM Sans'] font-semibold";
  const tableCell = "px-4 py-4 text-center text-gray-700 font-['DM Sans']";

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-7xl mx-auto px-4 py-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-700 text-lg">Loading NFL standings...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div className="max-w-7xl mx-auto px-4 py-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchStandings}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-6">NFL Standings</h1>
          <p className="text-lg mb-8 text-gray-600">{showYear} Season Standings</p>
        </div>

        {/* Conference Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedConference("all")}
            className={`px-6 py-2 rounded-md font-['DM Sans'] transition-all duration-200 shadow-sm bg-white border border-gray-300 text-gray-900 font-semibold ${
              selectedConference === "all" ? "ring-2 ring-blue-400" : "hover:bg-gray-100"
            }`}
          >
            All Teams
          </button>
          {conferences.map(conference => (
            <button
              key={conference}
              onClick={() => setSelectedConference(conference)}
              className={`px-6 py-2 rounded-md font-['DM Sans'] transition-all duration-200 shadow-sm bg-white border border-gray-300 text-gray-900 font-semibold ${
                selectedConference === conference ? "ring-2 ring-blue-400" : "hover:bg-gray-100"
              }`}
            >
              {conference}
            </button>
          ))}
        </div>

        {/* Standings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className={tableHeader + " text-left"}>Rank</th>
                  <th className={tableHeader + " text-left"}>Team</th>
                  <th className={tableHeader}>W</th>
                  <th className={tableHeader}>L</th>
                  <th className={tableHeader}>T</th>
                  <th className={tableHeader}>PCT</th>
                  <th className={tableHeader}>PF</th>
                  <th className={tableHeader}>PA</th>
                  <th className={tableHeader}>DIFF</th>
                  <th className={tableHeader}>DIV</th>
                  <th className={tableHeader}>CONF</th>
                  <th className={tableHeader}>HOME</th>
                  <th className={tableHeader}>AWAY</th>
                  <th className={tableHeader}>STREAK</th>
                </tr>
              </thead>
              <tbody>
                {filteredStandings.map((team, index) => {
                  const stats = team.stats || [];
                  const teamInfo = team.team || team;
                  const teamName = teamInfo.name || teamInfo.displayName || "Unknown Team";
                  const teamAbbr = teamInfo.abbreviation || teamInfo.shortName || "NFL";
                  const teamId = teamInfo.id || index;
                  const wins = getStat(stats, "name", "wins", 0);
                  const losses = getStat(stats, "name", "losses", 0);
                  const ties = getStat(stats, "name", "ties", 0);
                  const pct = getStat(stats, "name", "winPercent", "0.000");
                  const pointsFor = getStat(stats, "name", "pointsFor", 0);
                  const pointsAgainst = getStat(stats, "name", "pointsAgainst", 0);
                  const pointDiff = getStat(stats, "name", "differential", 0);
                  const divRecord = getStat(stats, "shortDisplayName", "DIV", "0-0");
                  const confRecord = getStat(stats, "shortDisplayName", "CONF", "0-0");
                  const homeRecord = getStat(stats, "shortDisplayName", "HOME", "0-0");
                  const awayRecord = getStat(stats, "shortDisplayName", "AWAY", "0-0");
                  const streak = getStat(stats, "name", "streak", "N/A");
                  const diffNum = typeof pointDiff === "string" ? parseInt(pointDiff.replace(/[^-\d]/g, "")) : pointDiff;
                  return (
                    <tr
                      key={teamId}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className={tableCell + " font-semibold text-gray-700 text-left"}>{index + 1}</td>
                      <td className={"px-4 py-4"}>
                        <div className="flex items-center space-x-3">
                          <img
                            src={`https://a.espncdn.com/i/teamlogos/nfl/500/${teamAbbr.toLowerCase()}.png`}
                            alt={teamName}
                            className="w-8 h-8 rounded-full"
                            onError={e => {
                              e.target.src = "/images/PFRlogo.jpg";
                            }}
                          />
                          <div>
                            <div className="text-gray-900 font-['DM Sans'] font-semibold">{teamName}</div>
                            <div className={`text-sm ${team.conference === conferenceMap.AFC ? "text-red-600" : "text-blue-600"}`}>{team.division || "Unknown Division"}</div>
                          </div>
                        </div>
                      </td>
                      <td className={tableCell}>{wins}</td>
                      <td className={tableCell}>{losses}</td>
                      <td className={tableCell}>{ties}</td>
                      <td className={tableCell}>{pct}</td>
                      <td className={tableCell}>{pointsFor}</td>
                      <td className={tableCell}>{pointsAgainst}</td>
                      <td className={tableCell + " font-semibold " + (diffNum > 0 ? "text-green-600" : diffNum < 0 ? "text-red-600" : "text-gray-700")}>{pointDiff}</td>
                      <td className={tableCell}>{divRecord}</td>
                      <td className={tableCell}>{confRecord}</td>
                      <td className={tableCell}>{homeRecord}</td>
                      <td className={tableCell}>{awayRecord}</td>
                      <td className={tableCell}>{streak}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 font-['DM Sans'] font-semibold mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
            <div><span className="font-semibold">W:</span> Wins</div>
            <div><span className="font-semibold">L:</span> Losses</div>
            <div><span className="font-semibold">T:</span> Ties</div>
            <div><span className="font-semibold">PCT:</span> Win Percentage</div>
            <div><span className="font-semibold">PF:</span> Points For</div>
            <div><span className="font-semibold">PA:</span> Points Against</div>
            <div><span className="font-semibold">DIFF:</span> Point Differential</div>
            <div><span className="font-semibold">DIV:</span> Division Record</div>
            <div><span className="font-semibold">CONF:</span> Conference Record</div>
            <div><span className="font-semibold">HOME:</span> Home Record</div>
            <div><span className="font-semibold">AWAY:</span> Away Record</div>
            <div><span className="font-semibold">STREAK:</span> Current Streak</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
