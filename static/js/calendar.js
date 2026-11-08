(function () {
  var body = document.body;
  var jahr = parseInt(body.dataset.jahr, 10);
  var params = new URLSearchParams(location.search);
  // ?preview=1 schaltet alle Türchen zum Testen frei, ?tag=10 simuliert ein Datum
  var preview = params.get("preview") === "1";
  var simTag = parseInt(params.get("tag"), 10);

  var now = new Date();
  var dec1 = new Date(jahr, 11, 1);
  var inDecember = now.getFullYear() > jahr || (now.getFullYear() === jahr && now.getMonth() === 11);
  var afterYear = now.getFullYear() > jahr || (now.getFullYear() === jahr && now.getMonth() === 11 && now.getDate() > 24);

  function maxTag() {
    if (preview) return 24;
    if (!isNaN(simTag)) return simTag;
    if (now.getFullYear() > jahr) return 24;
    if (now.getFullYear() < jahr || now.getMonth() < 11) return 0;
    return Math.min(now.getDate(), 24);
  }
  var max = maxTag();

  // Status-Zeile
  var status = document.getElementById("advent-status");
  if (status) {
    if (max === 0) {
      var days = Math.ceil((dec1 - now) / 86400000);
      status.textContent = "Noch " + days + (days === 1 ? " Tag" : " Tage") + " bis zum 1. Dezember.";
    } else if (max >= 24 && (afterYear || preview)) {
      status.textContent = "Alle Türchen sind offen. Schön, dass ihr dabei wart.";
    } else {
      status.textContent = "Heute ist Türchen " + max + " dran.";
    }
  }

  // Schneeflocken
  for (var i = 0; i < 16; i++) {
    var f = document.createElement("span");
    f.className = "flake"; f.textContent = i % 3 ? "❄" : "✦";
    f.style.left = Math.random() * 100 + "vw";
    f.style.fontSize = (0.7 + Math.random() * 0.9) + "rem";
    f.style.animationDuration = (10 + Math.random() * 12) + "s";
    f.style.animationDelay = (-Math.random() * 20) + "s";
    body.appendChild(f);
  }

  var grid = document.querySelector(".grid");
  if (!grid) return;
  var key = "advent" + jahr + "-" + grid.dataset.half;
  var opened = [];
  try { opened = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) {}
  function save() { try { localStorage.setItem(key, JSON.stringify(opened)); } catch (e) {} }

  var modal = document.getElementById("modal");
  var content = document.getElementById("modal-content");
  var dayEl = document.getElementById("modal-day");

  var doors = grid.querySelectorAll(".door");
  doors.forEach(function (door) {
    var tag = parseInt(door.dataset.tag, 10);
    if (tag > max) { door.classList.add("is-locked"); door.setAttribute("aria-disabled", "true"); }
    if (opened.indexOf(tag) !== -1) door.classList.add("is-open");
    door.addEventListener("click", function () {
      if (tag > max) {
        door.classList.remove("shake"); void door.offsetWidth; door.classList.add("shake");
        return;
      }
      var tpl = document.getElementById("inhalt-" + tag);
      content.innerHTML = "";
      content.appendChild(tpl.content.cloneNode(true));
      dayEl.textContent = tag;
      if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
      if (opened.indexOf(tag) === -1) { opened.push(tag); save(); door.classList.add("is-open"); }
    });
  });

  document.getElementById("close").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
})();
