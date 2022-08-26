// grabbing text-placeholders and madlibs-ing in some fetched data
const clubName="baker-street-irregulars"
const anywhereItSaysTheClubName = document.querySelectorAll('.club-name');
const anywhereItSaysMemberCount = document.querySelectorAll('.member-count');
const anywhereItSaysLocation = document.querySelectorAll('.location');
const anywhereItShowsTheClubImage = document.querySelectorAll('.club-image')
const playerListAlpha = document.getElementById("player-list-alpha")
const about = document.getElementById("about")

function updateClub(data) {
          let fixedDescription = data.description.replace("<p>", "").replace("</p>", "")
            
          about.innerText = fixedDescription
          console.log(data.description)
          anywhereItSaysTheClubName.forEach(occurance => {
                    occurance.innerText = data.name
          })

          anywhereItSaysMemberCount.forEach(occurance => {
                    occurance.innerText = data.members_count
          })

          anywhereItSaysLocation.forEach(occurance => {
                    occurance.innerText = data.location
          })

          anywhereItShowsTheClubImage.forEach(occurance => {
                    occurance.style.backgroundImage = `url(${data.icon})`
          })
}

function updatePlayers(data) {
          let playerNames = []
          const weekly = data.weekly
          const monthly = data.monthly
          const allTime = data.all_time


          weekly.forEach(player => playerNames.push(player.username))
          monthly.forEach(player => playerNames.push(player.username))
          allTime.forEach(player => playerNames.push(player.username))

          playerNames = playerNames.sort(function (a, b) {
                    return a > b;
          });

          for (i = 0; i < playerNames.length; i++) {
                    const li = document.createElement("li");
                    li.appendChild(document.createTextNode(playerNames[i]));
                    playerListAlpha.appendChild(li);
          }
}

fetch(`https://api.chess.com/pub/club/${clubName}`)
          .then((response) => response.json())
          .then((data) => updateClub(data))
          .then(
                    fetch(`https://api.chess.com/pub/club/${clubName}/members`)
                              .then((res) => res.json())
                              .then((data) => updatePlayers(data))
          )
