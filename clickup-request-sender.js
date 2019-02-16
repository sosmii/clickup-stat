require('dotenv').config();
const request = require('request-promise');

const BASE_URL = 'https://api.clickup.com/api/v1/team';
const TEAM_ID = process.env.TEAM_ID;
const MY_USER_ID = process.env.MY_USER_ID;

module.exports = async targetLists => {
  const options = {
    url: `${BASE_URL}/${TEAM_ID}/task`,
    headers: {
      Authorization: process.env.USER_TOKEN
    },
    qs: {
      page: 0,
      list_ids: targetLists,
      include_closed: true,
      assignees: [MY_USER_ID]
    }
  };

  result = await request(options);
  return JSON.parse(result).tasks
};
