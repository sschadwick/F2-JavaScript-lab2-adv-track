'use strict';
// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

function Blob() {}

var blob = new Blob();

blob.hours = 0;
blob.peopleEaten = 0;
while (blob.peopleEaten < 1000) {
  blob.hours++;
  blob.peopleEaten += blob.hours;
}

var hoursSpentInDowington; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

hoursSpentInDowington = blob.hours;

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  /*jshint validthis: true */
  this.population = population;
  this.peoplePerHour = peoplePerHour;
  this.hour = 0;
  while (population > 0) {
    population -= peoplePerHour;
    peoplePerHour++;
    this.hour++;
  }
  return this.hour;

  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
}

Blob.prototype.hoursToOoze = hoursToOoze; //assign the newly defined function to Blob prototype as a method

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

assert(blob.hoursToOoze(0, 0) === 0, 'people per hour is zero, so no time needed');
assert(blob.hoursToOoze(10, 1) === 4, 'ten people are gone after 4 hours per sample table');
assert(blob.hoursToOoze(10, 2) === 4, 'it should take 4 hours even if blob starts at 2 peopleperhour');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homePlanet, language) { //creates a new SentientBeing with given parameters
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.language = language;
}

//sb is a SentientBeing object
function sayHello(sb) {
  /*jshint validthis: true */

  console.log(hello[this.language]); //log hello in language of speaker
  return hello[sb.language]; //log hello in language of listener

  // TODO: say hello prints out (console.log's) hello in the
  // language of the speaker, but returns it in the language
  // of the listener (the sb parameter above).
  // use the 'hello' object at the beginning of this exercise
  // to do the translating

  //TODO: put this on the SentientBeing prototype
}

SentientBeing.prototype.sayHello = sayHello; //sayHello attached to SentientBeing prototype

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Human() {}
function Klingon() {}
function Romulan() {}
Human.prototype = new SentientBeing('Earth', 'federation standard');
Klingon.prototype = new SentientBeing('Qu\'nos', 'klingon');
Romulan.prototype = new SentientBeing('Romulus', 'romulan');

//asserts to test the translator
assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');

assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

assert((new Romulan()).sayHello(new Human()) === 'hello',
   'the human should hear hello');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) { //sort by alphabet based on last character in string
    if (a.charAt(a.length - 1) < b.charAt(b.length - 1)) {
      return -1;
    }
    if (a.charAt(a.length - 1) > b.charAt(b.length - 1)) {
      return 1;
    }
    // stringArray.forEach(function(currentValue){
    //   // var lastLetterOfWord = currentValue.slice(-1); //find last letter of each string
    //   var lastLetterOfWord = currentValue.charAt(currentValue.length - 1);
    //         //uses an alternate method to find last character of each string
    // });

    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  }
  stringArray.sort(byLastLetter);
}

var randomStrings = ['qwerty', 'test', 'foo', 'c', 'bar', 'tacos', 'a', 'b'];

lastLetterSort(randomStrings); //call lastLetterSort to sort randomStrings

assert(randomStrings[randomStrings.length - 1] === 'qwerty', 'qwerty should be the last value in the array');
assert(randomStrings[0] === 'a', 'a should be the first value in the array');

function sumArray(numberArray) {
  var sum = 0;
  numberArray.forEach(function(currentValue) {  //reference to current value is working!
    sum += currentValue;
  });
  // TODO: implement me using forEach
  return sum;
}

var randomNumbers = [4, 8, 5, 2, 8]; //sample arrays to test the function
var moreRandomNumbers = [10, 81, 123, 0, 6];

assert(sumArray(randomNumbers) === 27, 'the sum of the sample array should be 27');
assert(sumArray(moreRandomNumbers) === 220, 'the sum of the second array should be 220');

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    return sumArray(a) - sumArray(b); //compare function to sort by increasing value of the summed arrays
  });
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
}

var randomArray = [[1, 2, 3, 4], [10, 9, 8, 7, 6], [1, 1, 1, 1]];

sumSort(randomArray); //calls sumSort function on randomArray

//these asserts show that sumSort has sorted the array
assert(sumArray(randomArray[0]) === 4, 'the sum of first array in randomArray should be 4');
assert(sumArray(randomArray[2]) === 40, 'the sum of the third array in randomArray should be 40');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
