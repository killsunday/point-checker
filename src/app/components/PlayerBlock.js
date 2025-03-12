const PlayerBlock = (props) => {
    const player = props.player;
    const index = props.index;

    return (<tr>
        <td>{index}</td>
        <td>{player.skaterFullName || player.goalieFullName}</td>
        <td>{player.positionCode}</td>
        <td>{player.teamAbbrevs}</td>
        <td>{player.leaguePoints.toFixed(2)}</td>
        <td>{player.points}</td>
        <td>{player.goals}</td>
        <td>{player.assists}</td>
        <td>{player.ppGoals}</td>
        <td>{player.ppPoints - player.ppGoals}</td>
        <td>{player.shGoals}</td>
        <td>{player.shPoints - player.shGoals}</td>
        <td>{player.gameWinningGoals}</td>
        <td>{player.shots}</td>
        <td>{player.hits}</td>
        <td>{player.blockedShots}</td>
        <td>{player.plusMinus}</td>
        <td>{player.penaltyMinutes}</td>
        <td>{player.gamesStarted}</td>
        <td>{player.gamesPlayed}</td>
        <td>{player.saves}</td>
        <td>{player.wins}</td>
        <td>{player.saves}</td>
        <td>{player.shutouts}</td>
    </tr>)
}

export default PlayerBlock;