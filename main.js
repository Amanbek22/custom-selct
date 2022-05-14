const dropdownMain = document.querySelectorAll(".dropdown");
const dropdownFunc = (el, dropdownBlock) => {
  const down = el.querySelector("#down");
  console.log(down);
  dropdownBlock.classList.toggle("show");
  down.classList.toggle("down");
};

function onSelect(event, dropdownBlock, arr, selectBtn, dropList) {
  const target = event.target; // Получение элемента на которого мы кликнули

  const isInclude = arr.includes(target.innerHTML);
  if (!isInclude) {
    target.classList.add("selected");
    arr.push(target.innerHTML);
  } else {
    target.classList.remove("selected");
    for (let i = 0; i < arr.length; i++) {
      if (target.innerHTML === arr[i]) {
        arr[i] = null;
      }
    }
  }
  selectBtn.innerHTML = "Выбрано: " + arr.filter((item) => item).length;

  const closeBtn = document.createElement("img");
  closeBtn.src = "./del.png";

  const img = document.createElement("img");
  img.src = "./down.png";
  img.id = "down";

  selectBtn.append(closeBtn);

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    arr.length = [];
    selectBtn.innerText = "Выбрать";

    const check = dropdownBlock.classList.contains("show");
    if (check) {
      img.classList.add("down");
    }
    selectBtn.append(img);
    dropList.childNodes.forEach((item) => {
      item.classList?.remove("selected");
    });
  });

  // Replace if empty array;
  if (!arr.filter((i) => i !== null).length) {
    selectBtn.innerHTML = "Выбрать";
    img.classList.add("down");
    selectBtn.append(img);
  }
}

dropdownMain.forEach((el) => {
  const selectBtn = el.querySelector(".dropbtn");
  const inp = el.querySelector("input");
  const dropdownBlock = el.querySelector("#myDropdown");
  const dropList = el.querySelector(".drop-list");

  const firstDrodown = [];

  selectBtn.addEventListener("click", () => {
    dropdownFunc(el, dropdownBlock);
    fetchData();
  });

  inp.addEventListener("keyup", () => {
    filterFunction(el);
  });

  dropList.addEventListener("click", (e) => {
    onSelect(e, dropdownBlock, firstDrodown, selectBtn, dropList);
    console.log(firstDrodown);
  });
  console.log(el);
  document.addEventListener("click", (e) => {
    if (dropdownBlock.contains(e.target) || selectBtn.contains(e.target)) {
      return null;
    } else {
      const down = el.querySelector("#down");
      // Clicked outside the box
      dropdownBlock.classList.remove("show");
      down?.classList?.remove("down");
    }
  });
});

// change input value to current time
const $currentTime = document.getElementById("todayTime");
$currentTime.addEventListener("click", () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;
  document.getElementById("second-datePicker").value = today;
  document.getElementById("first-datePicker").value = today;
});

// change input value to yesterday's date
const $yesterdayDate = document.getElementById("yesterday");
$yesterdayDate.addEventListener("click", () => {
  let date = new Date();
  let day = date.getDate() - 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;
  document.getElementById("first-datePicker").value = today;
});

// change input value to prev week
const $prevWeek = document.getElementById("prevWeek");
$prevWeek.addEventListener("click", () => {
  let date = new Date();
  let day = date.getDate() - 7;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;
  document.getElementById("second-datePicker").value = today;
  document.getElementById("first-datePicker").value = today;
});

// change input value to prev month
const $prevMonth = document.getElementById("prevMonth");
$prevMonth.addEventListener("click", () => {
  let date = new Date();
  let day = date.getDate() - 1;
  let month = date.getMonth();
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;
  document.getElementById("second-datePicker").value = today;
  document.getElementById("first-datePicker").value = today;
});

// change input value to current week
const $currentWeek = document.querySelector("#currentWeek");
$currentWeek.addEventListener("click", () => {
  let date = new Date();
  let day = date.getDate() - 7;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  
  let today = year + "-" + month + "-" + day;
  document.getElementById("second-datePicker").value = today;
  document.getElementById("first-datePicker").value = today;
  let isoDate = new Date().toISOString() // get ISO date for backEnd

});

//// FILTER
function filterFunction(el) {
  var input, filter, ul, li, a, i;
  input = el.querySelector("#myInput");
  filter = input.value.toUpperCase();
  div = el.querySelector("#myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// clear input value on click
const $deleteBtn = document.querySelector("#clearInput");
$deleteBtn.addEventListener("click", () => {
  document.getElementById("myInput").value = "";
});

// the appearance of the filter on click
const $filterBlock = document.querySelector(".filter-block-content");
const $filterIcon = document.getElementById("filterIcon");
$filterIcon.addEventListener("click", () => {
  $filterBlock.classList.toggle("open");
});

// fetch data for subject-input
async function fetchData() {
  const options = document.querySelector("#subject-drop-list");
  let res = await fetch("http://test202021.azurewebsites.net/likeCourses");
  let data = await res.json();
  options.innerHTML = ""
  data.map((item) => options.insertAdjacentHTML(
    "afterbegin",`<a id="#input-options" href="#about">${item}</a>`)
  )
}

// Enums for gender option
const GENDER_STATES = Object.freeze({
  MALE: "Male",
  FEMALE: "Female",
});

let male = document.querySelector("#gender-male");
male.innerText = GENDER_STATES.MALE;

let female = document.querySelector("#gender-female");
female.innerText = GENDER_STATES.FEMALE;
