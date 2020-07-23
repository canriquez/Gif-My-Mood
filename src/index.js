import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';

const header = document.querySelector('header');
const section = document.querySelector('section');


function populateHeader(jsonObj) {
    const myH1 = document.createElement('h1');
    myH1.textContent = jsonObj.squadName;
    header.appendChild(myH1);

    const myPara = document.createElement('p');
    myPara.textContent = `Hometown: ${jsonObj.homeTown} // Formed: ${jsonObj.formed}`;
    header.appendChild(myPara);
}

function showHeroes(jsonObj) {
    const heroes = jsonObj.members;

    for (let i = 0; i < heroes.length; i += 1) {
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');

        myH2.textContent = heroes[i].name;
        myPara1.textContent = `Secret identity: ${heroes[i].secretIdentity}`;
        myPara2.textContent = `Age: ${heroes[i].age}`;
        myPara3.textContent = 'Superpowers:';

        const superPowers = heroes[i].powers;
        for (let j = 0; j < superPowers.length; j += 1) {
            const listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}

function populateHeroes() {
    const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

    const request = new XMLHttpRequest();/* Build object for request */

    request.open('GET', requestURL);
    request.responseType = 'json'; // Define response to JSON
    request.send(); // sending server request

    request.onload = function process() {
        const superHeroes = request.response;
        populateHeader(superHeroes);
        showHeroes(superHeroes);
    };

}

async function loadApiGiphyCall(topic = 'cats') {
    const img = document.querySelector('img')
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=50YVJEj4njpCtOZIPv2HcIKoRAWbuS0B&s=' + topic,
        { mode: 'cors' });
    const responseObject = await response.json()

    let foundUrl = responseObject.data.images.original.url;

    if (!foundUrl) {
        return Promise.reject("failed to find")
    } else {
        img.src = foundUrl;
    }
    return;
};


function getMyMood() {

    function processMood() {
        let myInput = document.getElementById("myInput");
        if (myInput.value != '') {
            loadApiGiphyCall(myInput.value).catch(function (error) { alert("ther's an error:" + error) });
            myInput.value = '';
        } else {
            return;
        }
    }

    const button = document.getElementById('moodButton');
    button.addEventListener('click', processMood, false);
}


document.addEventListener('DOMContentLoaded', () => {


    /* Adding API call giphy */
    getMyMood();


});