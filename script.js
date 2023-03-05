// var
const form =document.getElementById("form");
const search =document.getElementById("search");
const results =document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

//input
form.addEventListener("submit", e => {
    e.preventDefault();
    let searchValue = search.value.trim();

    if(!searchValue) {
        alert("Nothing to search, enter a song")
    }
    else {
        beginSearch(searchValue);
    }
})

// search function **
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();
    // console.log(data)
    displayData(data);
}

// display

function displayData(data) {
    results.innerHTML = `
    <ul class="songs">
        ${data.data
        .map(song=> ` <li>
                        <div>
                        <strong>${song.artist.name}</strong> - ${song.title}
                        </div>
                        <span data-artist="${song.artist.name}"
                        data-songtitle="${song.title}">Get Lyrics</span>
                    </li>`
        )
        .join('')}
    </ul>
    `;
}

// Get Lyrics

results.addEventListener("click", e => {
    const clickedElement = e.target;

    // check
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
})


async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await response.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    results.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
}