function TestLogin() {
  // fetch title id
  var id = '6D1C3'
  var GUID = localStorage.userId ? localStorage.userId : 'DB9247C8E8CF7975'

  if (!id || id == '') {
    OutputError('TitleId cannot be null')
    return
  } else if (typeof PlayFab == 'undefined') {
    // make sure we have the SDK prior to calling / setting
    OutputError(
      'The PlayFab SDK could not be found. Double check your script sources',
    )
    return
  }

  // save these values locally to ease use
  localStorage.userId = GUID
  localStorage.titleId = id

  // save title id
  PlayFab.settings.titleId = id

  // build http request object for LoginWithCustomId
  var LoginWithCustomIdRequest = {}
  LoginWithCustomIdRequest.TitleId = id
  LoginWithCustomIdRequest.CustomId = GUID
  LoginWithCustomIdRequest.CreateAccount = true
  console.log('Logging into PlayFab...')
  // OutputStatus('Logging into PlayFab...')
  PlayFabClientSDK.LoginWithCustomID(
    LoginWithCustomIdRequest,
    (response, error) => {
      if (error) {
        OutputError(error)
      } else {
        // display account details
        var result = response.data
        // var status =
        //   'Login Successful. <br \\> Welcome Player: ' +
        //   result.PlayFabId +
        //   '<br \\> Your session ticket is: ' +
        //   result.SessionTicket
        console.log(result.SessionTicket)
        // OutputStatus(status)
        var GetLeaderboardRequest = {}
        GetLeaderboardRequest.StatisticName = 'TotalCoins'
        GetLeaderboardRequest.StartPosition = 0
        GetLeaderboardRequest.MaxResultsCount = 10
        console.log('Retrieving leaderboard...')
        // OutputStatus('Retrieving leaderboard...')
        // build http request object for GetLeaderboard

        console.log('Retrieving leaderboard...')
        // OutputStatus('Retrieving leaderboard...')
        PlayFabClientSDK.GetLeaderboard(
          GetLeaderboardRequest,
          (response, error) => {
            if (error) {
              OutputError(error)
            } else {
              // display leaderboard data
              var leaderboard = response.data.Leaderboard
              console.log(leaderboard)
              for (var i = 0; i < leaderboard.length; i++) {
                addRow(leaderboard[i])
              }
            }
          },
        )
      }
    },
  )
}

function addRow(props) {
  var table = document.getElementById('myTable')
  var row = table.insertRow()
  var cell1 = row.insertCell(0)
  var cell2 = row.insertCell(1)
  var cell3 = row.insertCell(2)
  cell1.innerHTML = props.Position
  cell3.innerHTML = props.StatValue
  if (props.DisplayName) {
    cell2.innerHTML = props.DisplayName
    return
  }
  cell2.innerHTML = '----'
}
TestLogin()
