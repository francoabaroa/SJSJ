// Generated by CoffeeScript 1.10.0
var request;

request = new XMLHttpRequest;

(function() {
  var $$entries, $$letters, $entriesBox, $output, $searchInput, createEntriesSelectableList, createSelectableAlphabet, displayEntry, getEntriesObject, initSearch, initializeList, jargon, unhighlightLetters;
  $searchInput = document.getElementById('search');
  $output = document.getElementById('results');
  $entriesBox = document.getElementById('entries');
  $$letters = Array.prototype.slice.apply(document.querySelectorAll('.alphabet ul li a'));
  $$entries = [];
  jargon = {};
  unhighlightLetters = function() {
    return $$letters.map(function(letterLi) {
      return letterLi.classList.remove('highlighted');
    });
  };
  createEntriesSelectableList = function(jargon) {
    var anchor, key, li, results, value;
    results = [];
    for (key in jargon) {
      value = jargon[key];
      anchor = document.createElement("a");
      anchor.href = "?term=" + key;
      anchor.textContent = key;
      li = document.createElement("li");
      li.setAttribute("class", key.slice(0, 1).toLowerCase());
      li.appendChild(anchor);
      $entriesBox.appendChild(li);
      $$entries = $entriesBox.querySelectorAll('li');
      results.push($$entries = Array.prototype.slice.apply($$entries));
    }
    return results;
  };
  createSelectableAlphabet = function() {
    return document.getElementById("alphabet").addEventListener("click", function(e) {
      var letter;
      e.preventDefault();
      e.stopPropagation();
      unhighlightLetters();
      e.target.classList.add('highlighted');
      letter = e.target.textContent.toLowerCase();
      $output.querySelector('.entry').innerHTML = "";
      $entriesBox.classList.remove("hide");
      $entriesBox.classList.add("fold");
      return $$entries.map(function(li) {
        if (li.classList.contains(letter)) {
          return li.classList.add('selected');
        } else {
          return li.classList.remove('selected');
        }
      });
    });
  };
  displayEntry = function(key) {
    $entriesBox.classList.add("hide");
    $output.querySelector('.entry').innerHTML = jargon[key.toLowerCase()];
    return location.href = location.href.split("#")[0] + "#" + key;
  };
  initializeList = function() {
    return $entriesBox.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      return displayEntry(e.target.textContent);
    });
  };
  getEntriesObject = function(data) {
    return data.map(function(entry) {
      var key;
      key = entry.name;
      key = key.toLowerCase();
      key = key.replace('.', '').replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
      jargon[key] = entry.html;
      return entry.name;
    });
  };
  initSearch = function(data) {
    var entries, h;
    entries = getEntriesObject(data);
    if (location.hash !== "") {
      displayEntry(location.hash.slice(1));
    }
    document.querySelector('.entry').addEventListener("click", function(e) {
      var term;
      if (e.target.href.match(/\.md$/)) {
        e.preventDefault();
        e.stopPropagation();
        term = e.target.pathname.slice(1).split('.md')[0];
        return displayEntry(term);
      }
    });
    createEntriesSelectableList(jargon);
    createSelectableAlphabet();
    initializeList();
    return h = horsey($searchInput, {
      suggestions: entries,
      limit: 8,
      set: function(value) {
        $searchInput.value = value;
        displayEntry(value);
        return unhighlightLetters();
      }
    });
  };
  request.open('GET', 'js/entries.json', true);
  request.onload = function() {
    var data;
    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.responseText);
      return initSearch(data);
    }
  };
  request.onerror = function() {};
  return request.send();
})();
