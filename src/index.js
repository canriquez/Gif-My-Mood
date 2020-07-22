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


document.addEventListener('DOMContentLoaded', () => {
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


    // example on Swallowing Any Errors/Exceptions

    const p = new Promise((resolve, reject) => {
        foo.bar();
        resolve(42);
        reject(22);
    });

    p.then(
        (val) => {
            console.log(`I will never execute eheheheh ...${val}`);
        },
        (err) => {
            console.log('this is an error');
            // console.log(err);
        },
    );

    const p2 = Promise.resolve(42);
    console.log(p2.then((val) => { console.log(`my val is ${val}`); }));
});