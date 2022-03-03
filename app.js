"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 


// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      alert("Let's try searching by a single trait. As needed, you'll be given the option of additional trait searches to narrow down the list of people. Press OK to begin.");
      searchResults = searchListOfTraits(people);
      break;
      default:
      app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){
/* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    displayPersonFamily(person);
    break;
    case "descendants":
    alert(`Descendants:\n\n${displayPeople(findPersonDescendants(person))}`);
    mainMenu(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    throw new Error("Goodbye"); // stop execution. Of note, the provided return (no value) was closing the program for most part except for a minor anomaly which throwing this error resolved.
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//Function given by the instructors that allows users to search by name. Of note, it included a minor bug (intentional) that was fixed.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true
    }
    else{
      return false;
    }
  })
  return foundPerson[0]; //this was a bug that was fixed by include "[0]"
}

//Function displays the list of individual traits that the user can search with coupled with given an option to search again (e.g. multiple trait searches)
function searchListOfTraits(people) {
  let traitSelection = promptFor("Please enter in a number for one of the following trait options:\n 1: dob\n 2: gender\n 3: height\n 4: weight\n 5: eye color\n 6: occupation\n 7: Done Searching", autoValid);
  let listofPeople;
  let confirmedPerson;
  switch(traitSelection) {
     case "1":
        listofPeople = searchByDOB(people);
        if(listofPeople.length == "0"){
          alert("No person has this specific trait.");
          searchListOfTraits(people);
        }
        else{
        alert(displayPeople(listofPeople));
        }
       break;
     case "2":
        listofPeople = searchByGender(people);
        if(listofPeople.length == "0"){
          alert("No person has this specific trait.");
          searchListOfTraits(people);
        }
        else{
        alert(displayPeople(listofPeople));
        }
       break;
     case "3":
        listofPeople = searchByHeight(people);
        if(listofPeople.length == "0"){
          alert("No person has this specific trait.");
          searchListOfTraits(people);
        }
        else{
        alert(displayPeople(listofPeople));
        }
       break;
     case "4":
        listofPeople = searchByWeight(people);
        if(listofPeople.length == "0"){
          alert("No person has this specific trait.");
          searchListOfTraits(people);
        }
        else{
        alert(displayPeople(listofPeople));
        }
       break;
     case "5":
        listofPeople = searchByEyeColor(people);
        if(listofPeople.length == "0"){
          alert("No person has this specific trait.");
          searchListOfTraits(people);
        }
        else{
        alert(displayPeople(listofPeople));
        }
       break;
     case "6":
        listofPeople = searchByOccupation(people);
        if(listofPeople.length == "0"){
          alert("No person has this specific trait.");
          searchListOfTraits(people);
        }
        else{
        alert(displayPeople(listofPeople));
        }
       break;
     case "7":
        app(people);
     default:
        alert("Invalid entry try again.");
        searchListOfTraits(people);
      break;
  }
    if (listofPeople.length == 1){
      confirmedPerson = listofPeople[0];
      mainMenu(confirmedPerson, people);
    }
    else{
    traitSelection = promptFor(`Would you like to do another trait search to further filter down the list below. Press "1" for yes or Press "2" for no.\n ${displayPeople(listofPeople)}`, autoValid);
    switch(traitSelection) {
      case "1":
        searchListOfTraits(listofPeople);
        break;
      case "2":
        app(people);
        break;
      default:
        alert("Invalid entry try. Reverting back to the trait search screen.");
        searchListOfTraits(listofPeople);
        break;
    }
    }

 }

//function to search by people's DOB
 function searchByDOB(people){
  let dobInput = promptFor("Enter in the date of birth in the following format 'MM/DD/YYYY' for double digit months (e.g. 12/18/1952) or 'M/DD/YYYY' for single digit months (e.g. 1/18/1949)", autoValid);
  let confirmedDOB = people.filter(function(element) {
    if(element.dob == dobInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedDOB;
}

//function to search by people's gender
function searchByGender(people){
  let genderInput = promptFor("Enter in the gender, either 'female' or 'male'.", autoValid).toLowerCase();
  let confirmedGender = people.filter(function(element) {
    if(element.gender == genderInput) {
      return true;
    }
    else{
      return false;
    }
  })
  return confirmedGender;
  }

//function to search by people's height
function searchByHeight(people){
  let heightInput = promptFor("Enter in the height in inches. For example, '71'.", autoValid);
  let confirmedHeight = people.filter(function(element) {
    if(element.height == heightInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedHeight;
}

//funciton to search by people's weight
 function searchByWeight(people) {
  let weightInput = promptFor("Enter in the weight in pounds. For example, '175'.", autoValid);
  let confirmedWeight = people.filter(function(element) {
    if(element.weight == weightInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedWeight;
}

//function to search peopel by their eye color
function searchByEyeColor(people){
  let eyeColorInput = promptFor("Enter in the eye color. For example, 'brown'.", autoValid).toLowerCase();
  let confirmedEyeColor = people.filter(function(element) {
    if(element.eyeColor == eyeColorInput) {
      return true;
    }
    else{
      return false;
    }
  })
  return confirmedEyeColor;
}

//function to search people by their occupation
function searchByOccupation(people){
  let occupationInput = promptFor("Enter in the occupation. For example, 'programmer'.", autoValid).toLowerCase();
  let confirmedOccupation = people.filter(function(element) {
    if(element.occupation == occupationInput) {
      return true;
    }
    else{
      return false;
    }
  })

  return confirmedOccupation;
}

//function to find person's descendants which calls the find children function (below)
function findPersonDescendants(person){
  let personsChildren = findPersonsChildren(person); 
  let personsDescendants = [];
  for(let i = 0; i < personsChildren.length; i++){
    personsDescendants = personsChildren.concat(findPersonDescendants(personsChildren[i])); //concat method joins the values from the two arrays (this function and the find children function)
  }
  return personsDescendants;
}


//function to find the person's children
function findPersonsChildren(person){
  let dataArray = data;
  let personsChildren = dataArray.filter(function(element) {
    for(let i = 0; i < dataArray.length; i++){
      if(element.parents[0] == person.id || element.parents[1] == person.id) {
        return true;
      }
      else{
        return false;
      }}
  })
  return personsChildren;
}


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  return people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n");
}


function displayPerson(person, people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  alert(personInfo);
  return mainMenu(person,people);
}

//displays person's parents, spouse, and siblings (as applicable)
function displayPersonFamily(person, people){
  let personArray = person;
  let parentArray = []
  let spouseArray = []
  let siblingArray = []
  let newSibArray = []
  let dataArray = data
  parentArray += dataArray.filter(function(el){
    let personSlice = personArray.parents.slice()
    if(el.id === personSlice[0]){
      parentArray.push(`${el.firstName + ' ' + el.lastName} \n`);
    } else if(el.id === personSlice[1]){
      parentArray.push(`${el.firstName + ' ' + el.lastName} \n`);
    }
  });
  spouseArray += dataArray.filter(function(el){
    if(el.id === personArray.currentSpouse){
      spouseArray.push(`${el.firstName + ' ' + el.lastName} \n`)
    }
  }) 
  siblingArray += dataArray.filter(function(el){
    for (let i = 0; i < (el.parents).length; i++){
      if(person.parents.includes(el.parents[i]) && person.id != el.id){
        siblingArray.push(`${el.firstName + ' ' + el.lastName} \n`)
        newSibArray = [...new Set(siblingArray)];
    }}
  }) 
  alert(`Parents:\n ${parentArray} \n Spouse: \n ${spouseArray} \n Siblings: \n ${newSibArray}`);
  return mainMenu(person,people);
}
  

//#endregion


 //Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}


//#endregion