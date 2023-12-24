const axios = require("axios");
const moment = require("moment");

const BASE_URL = "http://www.lior-kedem.com";
const SWISH_MACHINE_URL = `${BASE_URL}/swish/machine_merged.php`;

class SwishService {
  static async addUpdatePlayersBasicInfo(players, { debugMode }) {
    const playersArr = Object.values(players);
    const serializedPlayers = playersArr.map((player) =>
      convertKeyToUppercase(player)
    );
    const body = {
      TAG: "addUpdatePlayersBasicInfo",
      DATA: JSON.stringify(serializedPlayers),
    };

    if (debugMode) {
      return { debugMode, body };
    }

    const response = await axios.post(SWISH_MACHINE_URL, body);
    return { debugMode, body, status: response?.status, data: response?.data };
  }

  static async addDailyGameLogs(dailyGameLogs, { debugMode }) {
    const playersArr = Object.values(dailyGameLogs);
    const serializedPlayers = playersArr.map((player) =>
      convertKeyToUppercase(player)
    );
    const body = {
      TAG: "addDailyGameLogs",
      DATA: JSON.stringify(serializedPlayers),
    };

    if (debugMode) {
      return { debugMode, body };
    }

    const response = await axios.post(SWISH_MACHINE_URL, body);
    return { debugMode, body, status: response?.status, data: response?.data };
  }

  static async calculatePeriodAverages(daysBack, { debugMode }) {
    const now = moment();
    const yesterday = now.add(-1, "d");
    let period, firstDay, lastDay;
    lastDay = yesterday.format("YYYY-MM-DD");

    if (daysBack) {
      firstDay = yesterday.add(-daysBack, "d").format("YYYY-MM-DD");
      period = "LAST" + daysBack;
    } else {
      firstDay = "2023-10-24";
      period = "CURR_SEASON";
    }

    const body = {
      TAG: "calculatePeriodAverages",
      FIRST_DAY: firstDay,
      LAST_DAY: lastDay,
      PERIOD: period,
    };

    if (debugMode) {
      return { debugMode, body };
    }

    const response = await axios.post(SWISH_MACHINE_URL, body);
    return { debugMode, body, status: response?.status, data: response?.data };
  }
}

function convertKeyToUppercase(obj) {
  let key,
    keys = Object.keys(obj);
  let n = keys.length;
  const newObj = {};
  while (n--) {
    key = keys[n];
    newObj[key.toUpperCase()] = obj[key];
  }
  return newObj;
}

module.exports = SwishService;
