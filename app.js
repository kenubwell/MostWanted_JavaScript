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
  //mainMenu(searchResults, people);
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
    displayFamily(person);
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
  return mainMenu(foundPerson[0], people);
}

//Function to resolve the no case associated with the intial prompt
//Function displays the list of individual traits that the user can search with
function searchListOfTraits(people){
  let userConfirmed = false;
  let listOfTraits = people;
  let userTraitInput = "";

  while (userConfirmed === false){
    let userTraitInput = promptFor("Let's try searching by a single trait. Please enter in one of the following traits:\n 'dob',\n 'gender',\n 'height',\n 'weight',\n 'eye color',\n 'occupation'\n Enter in 'done' once you have found your person.", autoValid);
      if(userTraitInput == 'dob'){
        listOfTraits = searchByDOB(listOfTraits);
      }
      else if(userTraitInput == 'gender'){
        listOfTraits = searchByGender(listOfTraits);
      }
      else if(userTraitInput == 'height'){
        listOfTraits = searchByHeight(listOfTraits);
      }
      else if(userTraitInput == 'weight'){
        listOfTraits = searchByWeight(listOfTraits);
      }
      else if(userTraitInput == 'eye color'){
        listOfTraits = searchByEyeColor(listOfTraits);
      }
      else if(userTraitInput == 'occupation'){
        listOfTraits = searchByOccupation(listOfTraits);
      }
      else if(userTraitInput == 'done'){
        userConfirmed = true;
      }
  }
  return userTraitInput;
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
    alert(`The following have "${heightInput}" lbs as their weight:\n ${confirmedList}`);
  }
  else if(confirmedHeight.length == 0){
    alert(`No person has a height of "${heightInput}" inches`);
  }
  return confirmedHeight;
 
}

//function for weight trait
function searchByWeight(people){
  let weightInput = promptFor("Enter in the weight in pounds. For example, '175'. NOTE: Input is format specific.", autoValid);
  let confirmedWeight = people.filter(function(element){
    if(element.weight === weightInput){
      return true;
    }
    else{
      return false;
    }
  })
  return confirmedWeight;
}

//function for occupation trait
function searchByOccupation(people){
  let occupationInput = promptFor("Enter in the occupation. For example, 'programmer'. NOTE: Input is format specific.", autoValid);
  let confirmedOccupation = people.filter(function(element){
    if(element.weight === occupationInput){
      return true;
    }
    else{
      return false;
    }
  })
  return confirmedOccupation;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColorInput = promptFor("Enter in the eye color. For example, 'brown'. NOTE: Input is format specific.", autoValid);
  let confirmedEyeColor = people.filter(function(element){
    if(element.eyeColor === eyeColorInput){
      return true;
    }
    else{
      return false;
    }
  })
  return confirmedEyeColor;
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

function displayPerson(person){
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
}

<<<<<<< HEAD
//function to display family from the display menu options
// function displayFamily(person, people){
//   let parents = [];
//   let sibilings = [];
//   let confirmedParents = people.filter(function(element){
//     if(element.id == person.parent[0] || element.id == person.parent[1]){
//       return true;
//     }
//     else{
//       return false;
//     }
//   })

//   if (confirmedParents.length > 0){
//     for(let i = 0; i < confirmedParents.length; i ++){
//       parents.push(confirmedParents[i].firstName + " " + confirmedParent[i].lastName);
//     }
//   }
//   else if (confirmedParents. length == 0){
//     alert(`There are no parents for ${person}.`)
//   }

//   let feedback = `The following have ${userHeightInput} lbs as their weight: ${confirmedList}`;
//   alert(feedback);
//   return confirmedParents;
 
// }


=======
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
>>>>>>> f4add9999424eab7926fa25f4febb7983446f06a
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