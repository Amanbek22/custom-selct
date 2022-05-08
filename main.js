const dropdownMain = document.querySelectorAll(".dropdown");

const dropdownFunc = (el, dropdownBlock) => {
  const down = el.querySelector("#down")

  dropdownBlock.classList.toggle("show")
  down.classList.toggle("down")
}

function onSelect(event, dropdownBlock, arr, selectBtn, dropList) {
  const target = event.target; // Получение элемента на которого мы кликнули

  const isInclude = arr.includes(target.innerHTML);
  if (!isInclude) {
    target.classList.add("selected")
    arr.push(target.innerHTML)
  } else {
    target.classList.remove("selected")
    for(let i = 0; i < arr.length; i++) {
      if(target.innerHTML === arr[i]) {
        arr[i] = null
      }
    }
  }
  selectBtn.innerHTML = "Выбрано: " + arr.filter((item) => item).length;

  const closeBtn = document.createElement('img');
  closeBtn.src = "./del.png";

  const img = document.createElement("img");
  img.src = "./down.png"
  img.id = "down"



  selectBtn.append(closeBtn)

  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    arr.length = [];
    selectBtn.innerHTML = "Выпадаюший";

    const check = dropdownBlock.classList.contains("show");
    console.log(check);
    if (check) {
      img.classList.add("down")
    }
    selectBtn.append(img)
    dropList.childNodes.forEach(function (item) {
      item.classList?.remove("selected");
    })
  })

  // Replace if epmty array;
  if(!arr.filter((i) => i !== null).length) {
    selectBtn.innerHTML = "Выпадаюший";
    img.classList.add("down")
    selectBtn.append(img)
  }
}


dropdownMain.forEach(function(el) {
  const selectBtn = el.querySelector(".dropbtn");
  const inp = el.querySelector("input");
  const dropdownBlock = el.querySelector("#myDropdown");
  const dropList = el.querySelector(".drop-list")

  const firstDrodown = [];


  selectBtn.addEventListener("click", () => {
    dropdownFunc(el, dropdownBlock)
  });

  inp.addEventListener("keyup", () => {
    filterFunction(el)
  })

  dropList.addEventListener("click", (e) => {
    onSelect(e, dropdownBlock, firstDrodown, selectBtn, dropList)
  })


  document.addEventListener("click", (e) => {
    if (dropdownBlock.contains(e.target) || selectBtn.contains(e.target)) {
      return null;
    } else {
      const down = el.querySelector("#down")
      // Clicked outside the box
      dropdownBlock.classList.remove("show")
      down?.classList?.remove("down")
    }
  })
})















//// FILTER
function filterFunction(el) {
  console.log(el);
  var input, filter, ul, li, a, i;
  input = el.querySelector("#myInput");
  filter = input.value.toUpperCase();
  console.log(filter);
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