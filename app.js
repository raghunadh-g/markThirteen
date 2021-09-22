function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  return str === reverseString(str);
}

function dateToString(date) {
  let dateStr = { day: "", month: "", year: "" };
  dateStr.day = "" + date.day;
  dateStr.month = "" + date.month;
  dateStr.year = "" + date.year;
  if (date.day < 10) {
    dateStr.day = "0" + dateStr.day;
  }
  if (date.month < 10) {
    dateStr.month = "0" + dateStr.month;
  }
  return dateStr;
}

function getAllFormats(date) {
  let dateStr = dateToString(date);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, ddmmyyyy, mmddyyyy, ddmmyyyy, ddmmyyyy, mmddyyyy];
}

function checkPalindromes(date) {
  let dates = getAllFormats(date);
  for (let i = 0; i < dates.length; i++) {
    if (isPalindrome(dates[i])) return true;
  }
  return false;
}

function isLeapyear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeapyear(year) && month == 2) {
    if (day > 29) {
      day = 1;
      month++;
    }
  } else {
    if (day > months[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    day = 1;
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let nextDate = getNextDate(date);
  let counter = 0;
  while (1) {
    counter++;
    if (checkPalindromes(nextDate)) break;
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

function getPrevDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    if (isLeapyear(year) && month == 3) {
      day = 29;
      month--;
    } else {
      month--;
      day = months[month];
    }
  }
  if (month == 0) {
    month = 11;
    year--;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPrevDatePalindromeDate(date) {
  let prevDate = getPrevDate(date);
  let counter = 0;
  while (1) {
    counter++;
    if (checkPalindromes(prevDate)) break;
    prevDate = getPrevDate(prevDate);
  }
  return [counter, prevDate];
}

let someDate = {
  day: 31,
  month: 12,
  year: 2020,
};

var user_date = document.querySelector("#user-date");
var showButton = document.querySelector("#show");
var showContent = document.querySelector("#result");

showButton.addEventListener("click", function () {
  document.getElementsByClassName("loader")[0].style.display = "block";

  setTimeout(function () {
    let dateEnteredList = user_date.value.toString().split("-");

    let someDate = {
      day: 0,
      month: 0,
      year: 0,
    };
    someDate.day = Number(dateEnteredList[2]);
    someDate.month = Number(dateEnteredList[1]);
    someDate.year = Number(dateEnteredList[0]);
    showContent.classList.remove("hide");

    document.getElementsByClassName("loader")[0].style.display = "none";
    if (checkPalindromes(someDate)) {
      showContent.innerText = "Yay your birthday is a palindrome!!";
    } else {
      const [count1, nextDate] = getNextPalindromeDate(someDate);
      const [count2, prevDate] = getPrevDatePalindromeDate(someDate);
      let futureDate =
        nextDate.day + "-" + nextDate.month + "-" + nextDate.year;
      let pastDate = prevDate.day + "-" + prevDate.month + "-" + prevDate.year;

      if (count1 < count2) {
        showContent.innerText = `Your birthday is not a palindrome and the nearest palindrome date is at ${futureDate}, you missed by ${count1} days`;
      } else {
        showContent.innerText = `Your birthday is not a palindrome and the nearest palindrome date is at ${pastDate}, you missed by ${count1} days`;
      }
    }
  }, 1000);
});
