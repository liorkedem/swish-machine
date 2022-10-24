const _ = require("lodash");
const EspnApiClient = require("./espn-api-client");
const PlayerService = require("./player-service");

class TeamService {
  static async getTeams() {
    const teams = await EspnApiClient.getTeamList();
    return teams.sports[0].leagues[0].teams;
  }

  static async getTeamPlayers(teamId) {
    const { team } = await EspnApiClient.getTeamPlayers(teamId);
    const { athletes: players } = team;
    const serializedPlayers = players.map((player) =>
      PlayerService.serializePlayer(player, team)
    );
    return serializedPlayers;
  }
}

module.exports = TeamService;
