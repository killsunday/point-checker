"use client";
import { useState, useMemo, useCallback } from "react";
import styles from "./page.module.css";
import players from "../data/players.js";
import goalies from "../data/goalies.js";
import PlayerBlock from "./components/PlayerBlock.js";

const defaultSkaterScoring = {
  goals: 6,
  assists: 4,
  PPG: 2,
  PPA: 2,
  SHG: 2,
  SHA: 2,
  GWG: 3,
  SOG: 1.6,
  hits: 0.6,
  blocks: 1.6,
  plusMinus: 0,
  penaltyMinutes: 0,
  W: 5,
  GA: -2,
  SVS: .5,
  SHO: 5, 
  GS: 0,
  GP: 0,
};
let playersData = players;
    goalies.data.forEach(player => {
      player.positionCode = "G";
      playersData.push(player);
    });
    
export default function Home() {
  const [skaterScoring, setSkaterScoring] = useState({ ...defaultSkaterScoring });

  const updateScoring = useCallback((stat, value) => {
    setSkaterScoring((prev) => ({ ...prev, [stat]: parseFloat(value).toFixed(1) || 0 }));
  }, []);

  const calculatedPlayers = useMemo(() => {
    
    
    return players
      .map((player) => ({
        ...player,
        leaguePoints: player.positionCode === "G" ?
          (player.wins * skaterScoring.W + 
            player.saves * skaterScoring.SVS + 
            player.shutouts * skaterScoring.SHO + 
            player.goalsAgainst * skaterScoring.GA +
            player.gamesStarted * skaterScoring.GS +
            player.gamesPlayed * skaterScoring.GP) :
            (player.goals * skaterScoring.goals +
            player.assists * skaterScoring.assists +
            player.ppGoals * skaterScoring.PPG +
            (player.ppPoints - player.ppGoals) * skaterScoring.PPA +
            player.shGoals * skaterScoring.SHG +
            (player.shPoints - player.shGoals) * skaterScoring.SHA +
            player.gameWinningGoals * skaterScoring.GWG +
            player.shots * skaterScoring.SOG +
            player.hits * skaterScoring.hits +
            player.blockedShots * skaterScoring.blocks +
            player.plusMinus * skaterScoring.plusMinus +
            player.penaltyMinutes * skaterScoring.penaltyMinutes),
      }))
      .sort((a, b) => b.leaguePoints - a.leaguePoints);
  }, [skaterScoring]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Update Scoring System</h2>
        <div>
          {Object.keys(defaultSkaterScoring).map((stat) => (
            <div className="stat-box" key={stat}>
              <label>{stat}:</label>
              <input
                type="text"
                value={skaterScoring[stat]}
                onChange={(e) => updateScoring(stat, e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Position</th>
              <th>Team</th>
              <th>League Points</th>
              <th>Points</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>PPG</th>
              <th>PPA</th>
              <th>SHG</th>
              <th>SHA</th>
              <th>GWG</th>
              <th>Shots</th>
              <th>Hits</th>
              <th>BLK</th>
              <th>+/-</th>
              <th>PIM</th>
              <th>GS</th>
              <th>GP</th>
              <th>Saves</th>
              <th>Wins</th>
              <th>SO</th>
            </tr>
          </thead>
          <tbody>
            {calculatedPlayers.map((player, index) => (
              <PlayerBlock key={player.playerId} player={player} index={index+1} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
