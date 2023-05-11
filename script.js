const houses = [{
    code: "ST",
    name: "Stark",
    bkcolor: "--bc-ST",
    tcolor: "--tc-ST"
  },
  {
    code: "LA",
    name: "Lannister",
    bkcolor: "--bc-LA",
    tcolor: "--tc-LA"
  },
  {
    code: "BA",
    name: "Baratheon",
    bkcolor: "--bc-BA",
    tcolor: "--tc-BA"
  },
  {
    code: "TA",
    name: "Targaryen",
    bkcolor: "--bc-TA",
    tcolor: "--tc-TA"
  }
];

// Return an array of characters belonging to a house
const getCharacters = houseCode => {
  let characters;
  switch (houseCode) {
    case "ST":
      characters = ["Eddard", "Catelyn", "Robb", "Sansa", "Arya", "Jon Snow"];
      break;
    case "LA":
      characters = ["Tywin", "Cersei", "Jaime", "Tyrion"];
      break;
    case "BA":
      characters = ["Robert", "Stannis", "Renly"];
      break;
    case "TA":
      characters = ["Aerys", "Daenerys", "Viserys"];
      break;
    default:
      characters = []; // Empty array
  }
  //Store, must convert string
  localStorage.setItem('characters', JSON.stringify(characters));
  return characters;
};


document.addEventListener('DOMContentLoaded', init);

function init() {
  let dropdown = document.getElementById('house');
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  
  // loop through array and create an option tag
  //with the data from the objects
  houses.forEach(house  => {
    let myoption = document.createElement('OPTION');
    myoption.value = house.code;
    let name = house.name;
    myoption.innerHTML = name;
    dropdown.append(myoption);
  });
  //func to respond to the change oc house code from dropdown
  dropdown.addEventListener('change', (e) => {
    console.log(e.target.value);
    const myCode = e.target.value;
    let myChars = getCharacters(myCode);

    //session storage counter
    if (sessionStorage.getItem('dropdownCount')) {
      let currentCount = parseInt(sessionStorage.getItem('dropdownCount'));
      sessionStorage.setItem('dropdownCount', currentCount + 1);
    } 
    //if first time dropdwon is used, then ini to 1
    else {
      sessionStorage.setItem('dropdownCount', 1);
    }
    console.log('You changed houses ' + sessionStorage.getItem('dropdownCount') + ' times.');
    console.log(myChars);

    //if getCharacters returns default (no connection), then retrieve from storage
    if (myChars.length === 0) {
        const storedChars = localStorage.getItem('characters');
        if (storedChars) {
          myChars = JSON.parse(storedChars);
          alert(localStorage.getItem('characters'))
          //need to test 
        }
    }

    let list_item = document.getElementById('characters');
    list_item.innerHTML = '';
    
    //set the background color, and text color of the selected field
    const selectedHouse = houses.find(house => house.code === myCode);
    if (selectedHouse) {
      r.style.setProperty('--bk-start', rs.getPropertyValue(selectedHouse.bkcolor));
      r.style.setProperty('--tc-start', rs.getPropertyValue(selectedHouse.tcolor));
    } else {
      r.style.setProperty('--bk-start', rs.getPropertyValue('--bk-start'));
      r.style.setProperty('--tc-start', rs.getPropertyValue('--tc-start'));
    }
    
    myChars.forEach((mychar) => {
      let dt = document.createElement('DT');
      dt.className = "character-name";
      dt.innerText = mychar;

      let dd = document.createElement('DD');
      dd.className = "character-description";
      dd.innerText = `A member of House ${houses.find(house => house.code === myCode).name}`;

      list_item.append(dt);
      list_item.append(dd);
      
    });
     
  });
}
