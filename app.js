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
      // TODO: search by traits
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

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    displayPersonFamily(person);
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
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
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//Function to resolve the no case associated with the intial prompt
//Function displays the list of individual traits that the user can search with
function searchListOfTraits(people){
  let userConfirmed = false;
  let listOfTraits = people;

  while (userConfirmed === false){
    let traitInput = promptFor("Let's try searching by a single trait. Please enter in one of the following traits:\n 'dob',\n 'gender',\n 'height',\n 'weight',\n 'eye color',\n 'occupation'\n Enter in 'done' once you have found your person.", autoValid);
      if(traitInput == 'dob'){
        listOfTraits = searchByDOB(listOfTraits);
      }
      else if(traitInput == 'gender'){
        listOfTraits = searchByGender(listOfTraits);
      }
      else if(traitInput == 'height'){
        listOfTraits = searchByHeight(listOfTraits);
      }
      else if(traitInput == 'weight'){
        listOfTraits = searchByWeight(listOfTraits);
      }
      else if(traitInput == 'eye color'){
        listOfTraits = searchByEyeColor(listOfTraits);
      }
      else if(traitInput == 'occupation'){
        listOfTraits = searchByOccupation(listOfTraits);
      }
      else if(traitInput == 'done'){
        userConfirmed = true;
      }
  }
  return searchByName(people);
}


//TODO: add other trait filter functions here.
function searchByDOB(people){
  let dobInput = promptFor("Enter in the date of birth in the following format 'MM/DD/YYYY' for double digit months (e.g. 12/18/1952) or 'M/DD/YYYY' for single digit months (e.g. 1/18/1949). NOTE: Input is format specific.", autoValid);
  let confirmedList = [];
  let confirmedDOB = people.filter(function(element){
    if(element.dob == dobInput){
      return true;
    }
    else{
      return false;
    }
  })
  if(confirmedDOB.length > 0){
    for(let i = 0; i < confirmedDOB.length; i ++){
      confirmedList.push(" " + confirmedDOB[i].firstName + " " + confirmedDOB[i].lastName);
    }
    alert(`The following have "${dobInput}" as their date of birth:\n ${confirmedList}`);
  }
  else if (confirmedDOB.length == 0){
    alert(`No person has a date of birth of "${dobInput}"`);
  }
  return confirmedDOB;
}

function searchByGender(people){
  let genderInput = promptFor("Enter in the gender, either 'female' or 'male'. NOTE: Input is format specific.", autoValid);
  let confirmedList = [];
  let confirmedGender = people.filter(function(element){
    if(element.gender == genderInput){
      return true;
    }
    else{
      return false;
    }
  })

  if(confirmedGender.length > 0){
    for(let i = 0; i < confirmedGender.length; i ++){
      confirmedList.push(" " + confirmedGender[i].firstName + " " + confirmedGender[i].lastName);
    }
    alert(`The following have "${genderInput}" as their gender:\n ${confirmedList}`);
  }
  else if(confirmedGender.length == 0){
    alert(`No person(s) is of "${genderInput}" gender.`);
  }

  return confirmedGender;
}

//function for height trait
function searchByHeight(people){
  let heightInput = promptFor("Enter in the height in inches. For example, '71'. NOTE: Input is format specific.", autoValid);
  let confirmedList = [];
  let confirmedHeight = people.filter(function(element){
    if(element.height == heightInput){
      return true;
    }
    else{
      return false;
    }
  })
  if (confirmedHeight.length > 0){
    for(let i = 0; i < confirmedHeight.length; i ++){
      confirmedList.push(" " + confirmedHeight[i].firstName + " " + confirmedHeight[i].lastName);
    }
    alert(`The following have "${heightInput}" inches as their height:\n ${confirmedList}`);
  }
  else if(confirmedHeight.length == 0){
    alert(`No person has a height of "${heightInput}" inches`);
  }
  return confirmedHeight;
 
}

//function for weight trait
function searchByWeight(people){
  let weightInput = promptFor("Enter in the weight in pounds. For example, '175'. NOTE: Input is format specific.", autoValid);
  let confirmedList = [];
  let confirmedWeight = people.filter(function(element){
    if(element.weight == weightInput){
      return true;
    }
    else{
      return false;
    }
  })
  if(confirmedWeight.length > 0){
    for(let i = 0; i < confirmedWeight.length; i++){
      confirmedList.push(" " + confirmedWeight[i].firstName + " " + confirmedWeight[i].lastName);
    }
    alert(`The following have "${weightInput}" lbs as their weight:\n ${confirmedList}`);
  }
  else if(confirmedWeight.length == 0){
    alert(`No person has a weight of "${weightInput}" lbs`);
  }
  return confirmedWeight;
}

//function for occupation trait
function searchByOccupation(people){
  let occupationInput = promptFor("Enter in the occupation. For example, 'programmer'. NOTE: Input is format specific.", autoValid);
  let confirmedList = [];
  let confirmedOccupation = people.filter(function(element){
    if(element.occupation == occupationInput){
      return true;
    }
    else{
      return false;
    }
  })
  if(confirmedOccupation.length > 0){
    for(let i = 0; i < confirmedOccupation.length; i++){
      confirmedList.push(" " + confirmedOccupation[i].firstName + " " + confirmedOccupation[i].lastName);
    }
    alert(`The following have "${occupationInput}" as their profession:\n ${confirmedList}`);
  }
  else if(confirmedOccupation.length == 0){
    alert(`No person has an occupation of "${occupationInput}"`);
  }
  return confirmedOccupation;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColorInput = promptFor("Enter in the eye color. For example, 'brown'. NOTE: Input is format specific.", autoValid);
  let confirmedList = [];
  let confirmedEyeColor = people.filter(function(element){
    if(element.eyeColor === eyeColorInput){
      return true;
    }
    else{
      return false;
    }
  })
  if(confirmedEyeColor.length > 0){
    for(let i = 0; i < confirmedEyeColor.length; i++){
      confirmedList.push(" " + confirmedEyeColor[i].firstName + " " + confirmedEyeColor[i].lastName);
    }
    alert(`The following have "${eyeColorInput}" as their eye color:\n ${confirmedList}`);
  }
  else if(confirmedEyeColor.length == 0){
    alert(`No person has an eye color of "${eyeColorInput}"`);
  }
  return confirmedEyeColor;
}

function displayPersonFamily(person){
  let personArray = [person];
  let personInfo = "Parents: " + personArray.filter(function(person){
    if(person.parents == data.id){
      return data.firstName
    }
  }) + ' ' + personArray.filter(function(person){
    if(person.parents == data.id){
      return data.lastName
    }
  }) + '\n';
  personInfo += "Spouse: " + personArray.filter(function(person){
    if(person.currentSpouse == data.id){
      return data.firstName
    }
  }) + ' ' + personArray.filter(function(person){
    if(person.currentSpouse == data.id){
      return data.lastName
    }
  }) + '\n';
  alert(personInfo);
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person, people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "DOB: " + person[0].dob + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  alert(personInfo);
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