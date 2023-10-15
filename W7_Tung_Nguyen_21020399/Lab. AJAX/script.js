function loadContent() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var contentDiv = document.getElementById("content");
        contentDiv.innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", "abc.htm", true);
    xhr.send();
  }