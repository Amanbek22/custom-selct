function create_custom_dropdowns() {
    const ad = document.querySelector("select")
    console.log(ad.children);
    document.querySelector("select").children.each(function (i, select) {
      if (!document.querySelector(this).nextElementSibling.classList.contains("dropdown-select")) {
        document.querySelector(this).after(
          '<div class="dropdown-select wide ' +
            (document.querySelector(this).className || "") +
            '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>'
        );
        var dropdown = document.querySelector(this).nextElementSibling;
        var options = document.querySelector(select).querySelector("option");
        var selected = document.querySelector(this).querySelector("option:selected");
        dropdown
          .querySelector(".current")
          .html(selected.data("display-text") || selected.text());
        options.each(function (j, o) {
          var display = document.querySelector(o).data("display-text") || "";
          dropdown
            .querySelector("ul")
            .insertAdjacentHTML("beforeend",
              '<li class="option ' +
                (document.querySelector(o).is(":selected") ? "selected" : "") +
                '" data-value="' +
                document.querySelector(o).value +
                '" data-display-text="' +
                display +
                '">' +
                document.querySelector(o).text() +
                "</li>"
            );
        });
      }
    });
  
    document.querySelector(".dropdown-select ul").before(
      '<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter()" class="dd-searchbox" type="text"></div>'
    );
  }
  
  // Event listeners
  
  // Open/close
  document.addEventListener("click", function (event) {
    if (document.querySelector(event.target).classList.contains("dd-searchbox")) {
      return;
    }
    document.querySelector(".dropdown-select").not(document.querySelector(this)).removeClass("open");
    document.querySelector(this).classList.toggle("open");
    if (document.querySelector(this).classList.contains("open")) {
      document.querySelector(this).querySelector(".option").attr("tabindex", 0);
      document.querySelector(this).querySelector(".selected").focus();
    } else {
      document.querySelector(this).querySelector(".option").removeAttr("tabindex");
      document.querySelector(this).focus();
    }
  });
  
  // Close when clicking outside
  document.addEventListener("click", function (event) {
    if (document.querySelector(event.target).closest(".dropdown-select").length === 0) {
      document.querySelector(".dropdown-select").removeClass("open");
      document.querySelector(".dropdown-select .option").removeAttr("tabindex");
    }
    event.stopPropagation();
  });
  
  function filter() {
    var valThis = document.querySelector("#txtSearchValue").value;
    document.querySelector(".dropdown-select ul > li").each(function () {
      var text = document.querySelector(this).text();
      text.toLowerCase().indexOf(valThis.toLowerCase()) > -1
        ? document.querySelector(this).show()
        : document.querySelector(this).hide();
    });
  }
  // Search
  
  // Option click
  document.addEventListener("click", function (event) {
    document.querySelector(this).closest(".list").querySelector(".selected").removeClass("selected");
    document.querySelector(this).classList.add("selected");
    var text = document.querySelector(this).data("display-text") || document.querySelector(this).text();
    document.querySelector(this).closest(".dropdown-select").querySelector(".current").text(text);
    document.querySelector(this)
      .closest(".dropdown-select")
      .prev("select")
      .val(document.querySelector(this).data("value"))
      .trigger("change");
  });
  
  // Keyboard events
  document.addEventListener("keydown", function (event) {
    var focused_option = document.querySelector(
      document.querySelector(this).querySelector(".list .option:focus")[0] ||
        document.querySelector(this).querySelector(".list .option.selected")[0]
    );
    // Space or Enter
    //if (event.keyCode == 32 || event.keyCode == 13) {
    if (event.keyCode == 13) {
      if (document.querySelector(this).classList.contains("open")) {
        focused_option.trigger("click");
      } else {
        document.querySelector(this).trigger("click");
      }
      return false;
      // Down
    } else if (event.keyCode == 40) {
      if (!document.querySelector(this).classList.contains("open")) {
        document.querySelector(this).trigger("click");
      } else {
        focused_option.nextElementSibling.focus();
      }
      return false;
      // Up
    } else if (event.keyCode == 38) {
      if (!document.querySelector(this).classList.contains("open")) {
        document.querySelector(this).trigger("click");
      } else {
        var focused_option = document.querySelector(
          document.querySelector(this).querySelector(".list .option:focus")[0] ||
            document.querySelector(this).querySelector(".list .option.selected")[0]
        );
        focused_option.previousElementSibling.focus();
      }
      return false;
      // Esc
    } else if (event.keyCode == 27) {
      if (document.querySelector(this).classList.contains("open")) {
        document.querySelector(this).trigger("click");
      }
      return false;
    }
  });
  
//   document.ready(function () {
    create_custom_dropdowns();
//   });
  