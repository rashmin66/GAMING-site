// Set up variables for your PlayFab Title ID and Secret Key
const titleID = '6D1C3'
const userEmail = 'Nipunchathuranga45@gmail.com'
const userPassword = 'Nipunc55'

// Define the URL for the client login API endpoint
const loginURL = `https://${titleID}.playfabapi.com/Client/LoginWithEmailAddress`

// Define the parameters for the client login request
const loginParams = {
  Email: userEmail,
  Password: userPassword,
  TitleId: titleID,
}

// Use the fetch() function to send the client login request to the PlayFab API
fetch(loginURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(loginParams),
})
  .then((response) => response.json())
  .then((data) => {
    // Extract the client session ticket from the response data
    const sessionTicket = data.data.SessionTicket

    // Use the session ticket to authenticate subsequent requests to protected API endpoints
    const authHeader = {
      'X-Authorization': sessionTicket,
      'Content-Type': 'application/json',
    }
    console.log(data)
    // Use the fetch() function to send authenticated requests to protected API endpoints
    // ...
  })
  .catch((error) => console.error(error))

// Set up variables for your PlayFab Title ID and Secret Key

const secretKey = '8KRX17TZWP6NNM83Q4GAI4TPQIPRC1WFCOHHCT8QTSZ94E394U'

// Define the URL for the leaderboard API endpoint
const leaderboardURL = `https://${titleID}.playfabapi.com/Client/GetCharacterLeaderboard`
// https://titleId.playfabapi.com/Client/GetCharacterLeaderboard
// Define the parameters for the leaderboard request
const leaderboardParams = {
  StartPosition: 0,
  MaxResultsCount: 10,
  StatisticName: 'TotalCoins',
}

// Generate an authentication header for the PlayFab API
const authHeader = {
  'X-Authentication': `${secretKey}`,
  'Content-Type': 'application/json',
}

// Use the fetch() function to retrieve the leaderboard data from the PlayFab API
fetch(leaderboardURL, {
  method: 'POST',
  headers: authHeader,
  body: JSON.stringify(leaderboardParams),
})
  .then((response) => response.json())
  .then((data) => {
    // Use the leaderboard data to populate an HTML table
    // const leaderboardTable = document.getElementById('leaderboard-table')
    // data.data.Leaderboard.forEach((entry) => {
    //   const row = leaderboardTable.insertRow()
    //   const rankCell = row.insertCell(0)
    //   const nameCell = row.insertCell(1)
    //   const valueCell = row.insertCell(2)
    //   rankCell.innerHTML = entry.Position + 1
    //   nameCell.innerHTML = entry.DisplayName
    //   valueCell.innerHTML = entry.StatValue
    //})
    console.log(data)
  })
  .catch((error) => console.error(error))
