//-----------------------------------Some starting values
const weekNames = {
  1: "week__one",
  2: "week__two",
  3: "week__three",
  4: "week__four",
  5: "week__fife",
  6: "week__six",
  7: "week__seven",
};

// temporary. It will be replaced later
let current__week = 0;
let current_question = 0;

//Data is separated by WEEKS (w1-w13)
//Each WEEK have some questions (q1-qX)
//Each Question have single description (d) and single pattern (p)
const questionsData = {
  w1: {
    q1: {
      p: "frontend|front|front-end",
      d:
        "Frontend and Backend are two most popular terms used in web development. Which one is responsible for interaction with user?",
    },
  },
  w2: {
    q1: {
      p: "head",
      d:
        "in this tag user defines website settings f.e. language, title, styles etc.",
    },
    q2: {
      p: "body",
      d:
        "in this tag user defines everything what should be displayed on the screen",
    },
    q3: {
      p: "main",
      d:
        "in this tag user should keep main content of the website",
    },
    q4: {
      p: "article",
      d:
        "its content should make sense on its own and it should be possible to distribute it independently from the rest of the site.",
    },
    q5: {
      p: "section",
      d:
        "its used to group together related elements. It should contains header.",
    },
  },
  w3: {
    q1: {
      p: "b",
      d:
        "non-semantic tag used to make some text bold.",
    },
    q2: {
      p: "strong",
      d:
        "semantic tag used to make some text bold and also marking it as important.",
    },
    q3: {
      p: "i",
      d:
        "non-semantic tag used to change text display style italic.",
    },
    q4: {
      p: "em",
      d:
        "semantic tag used to change text display style italic and also marking it as emphasized (it could be irony, metaphor etc.).",
    },
  },
};

//-----------------------------------Update indicator of current week/question:
let progressIndicator = document.querySelector(
  ".right__progress-indicator--js"
);
//get number of current week and current question from filename
//we catching part "w1q8.html" by spliting url by "/", then removes .html and part after it
// then split results to array
[current__week, current_question] = location.href
  .split("/")
  .slice(-1)[0]
  .split(".")[0]
  .split("w")[1]
  .split("q");
//Find how many questions have current week:
try {
  current__week__len = Object.keys(questionsData["w" + current__week]).length;
  progressIndicator.innerHTML = `${weekNames[current__week]}: ${current_question}/${current__week__len}`;
} catch (error) {
  console.log("this week probably does not exists in questionData");
}
//-----------------------------------Navigation hide&display functionality
let myWeeks = document.querySelectorAll(".week");
if (myWeeks.length > 0) {
  //Hide all weeks
  myWeeks.forEach(function (week) {
    week.classList.add("hidden");
  });

  //Then decide which should be shown
  let listStart = 0;
  let listEnd = 0;
  //Find start of the list
  if (current__week > 1) {
    listStart = current__week - 1;
  } else {
    listStart = 1;
  }

  //Find end of the list
  if (listStart + 4 <= myWeeks.length) {
    listEnd = listStart + 4;
  } else {
    listEnd = myWeeks.length;
  }

  //For testing
  //   console.log(`We have list from ${listStart} to ${listEnd}`);

  //Show desired weeks
  for (i = listStart - 1; i < listEnd; i++) {
    myWeeks[i].classList.remove("hidden");
  }

  //Highlight current week
  myWeeks[current__week - 1].classList.add("week--current");
}

//-----------------------------------Update question, href, description for each page
//Find elements to update
let formInput = document.querySelector(".form__input");
let formText = document.querySelector(".form__text");
let form = document.querySelector(".form");

formInput.pattern =
  questionsData["w" + current__week]["q" + current_question]["p"];
formText.innerHTML =
  questionsData["w" + current__week]["q" + current_question]["d"];

//If next question in current week exists then form should redirect to it
if (
  questionsData["w" + current__week]["q" + (parseInt(current_question) + 1)] !=
  undefined
) {
  form.action =
    "w" + current__week + "q" + (parseInt(current_question) + 1) + ".html";
}
//If next question do not exists then form should redirect to next week
else {
  form.action = "w" + (parseInt(current__week) + 1) + "q" + 1 + ".html";
}
