const cardContainer = document.getElementById('card-container');
const errorDiv = document.getElementById('error');

// spinner function
const displaySpinner = spinner =>{
    document.getElementById('spinner').style.display = spinner;
}

const loadTeamName = () =>{
    let searchInput = document.getElementById('search-input').value;
    if(searchInput === ''){
        errorDiv.innerText = 'Please Enter a Value';
        return;
    }

    displaySpinner('block');

    fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchInput}`)
        .then(res => res.json())
        .then(data => displayTeamResult(data.teams))
    document.getElementById('search-input').value = '';
    // searchInput = '';
}

// loadClubName();

const displayTeamResult = teams =>{
    // console.log(teams.teams);
    if(teams === null){
        errorDiv.innerText = 'Team Not Found';
        // console.log('clicked');
    }
    else{
        errorDiv.innerText = '';
    }
    cardContainer.innerHTML = '';
    teams.forEach(team =>{
        // console.log(team.idTeam);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${team.strTeam}</h5>
                    <p class="card-text">${team.strDescriptionEN.slice(0, 150)}</p>
                </div>
                <button onclick = "loadTeamDetails(${team.idTeam})" type="button" class="btn btn-info w-75 mx-auto mb-3">Details</button>
            </div>
        `;
        cardContainer.appendChild(div);
    });
    displaySpinner('none');
}

const loadTeamDetails = teams =>{
    displaySpinner('block');
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teams}`)
        .then(res => res.json())
        .then(data => displayTeamDetails(data.teams[0]))
}

const displayTeamDetails = teamData =>{
    console.log(teamData.strTeamJersey);
    const teamDetailsContainer = document.getElementById('team-details-container');
    teamDetailsContainer.classList.add('mx-auto');
    teamDetailsContainer.innerHTML = `
        <h2>Country: ${teamData.strCountry}</h2>
        <img src="${teamData.strTeamJersey}" class = "mb-3" height = "200" height = "400">
    `;
    displaySpinner('none');
}