$("button#calc").click(
  function() {
    $("#resultContainer").show()
  })

$("button:first").click(
  function() {
    $("#pereti li:last input").focus()
  })

function nrRuloane(latimeaRulon, latPerete, hPerete) {
  const lungRulon = 10//metri
  // Lungimea unui buc. de tapete
  const lungTapet = hPerete + 0.2
  const nrBucTapet = latPerete / latimeaRulon
  return nrBucTapet * lungTapet / lungRulon
}
function checkNumber(inputu) {
  const valoare = inputu.value;
  if (parseFloat(valoare) < 0) {
    inputu.value = Math.abs(valoare);
  }
}

function clearInputs() {
  for (const item of document.getElementsByTagName("input")) {
    item.value = 0
  }
}

/**
* Returns the number of Ruloane needed to fully cover the walls
*/
function getRuloane(latRulon) {
  let htmlCollection = document.getElementById("pereti").children;
  const lista = Array.prototype.slice.call(htmlCollection);
  const nrTotal = lista
    .map((li) => {
      const height = li.children[0].children[0].children[1].value;

      const length = li.children[0].children[1].children[1].value;
      return [parseFloat(height) || 0, parseFloat(length) || 0];
    })
    .map((dimensiuni) => nrRuloane(latRulon, dimensiuni[1], dimensiuni[0]))
    .reduce((total, aria) => total + aria);
  return Math.ceil(nrTotal);
}

function getAria() {
  let htmlCollection = document.getElementById("pereti").children;
  const lista = Array.prototype.slice.call(htmlCollection);
  const ariaTotala = lista
    .map((li) => {
      const height = li.children[0].children[0].children[1].value;

      const length = li.children[0].children[1].children[1].value;
      return [parseFloat(height) || 0, parseFloat(length) || 0];
    })
    .map((dimensiuni) => dimensiuni[0] * dimensiuni[1])
    .reduce((total, aria) => total + aria);
  return ariaTotala;
}

function calcPrets() {
  const pretRulon =
    parseFloat(document.getElementById("pretRulon").value) || 0;
  const pretLucrator =
    parseFloat(document.getElementById("pretLucrator").value) || 0;
  const rezultatCalculati = document.getElementById("rezultatCalculati");
  // Calculam pretul tapetelor si actualizam informatiile pe sait
  const latRulon = parseFloat($("#latRulon").val()) || 0
  $("#nrTapete").html(getRuloane(latRulon))
  $("#dimRulon").html(latRulon)
  $("#pretRulonlbl").html(pretRulon)
  $("#pretTapete").html(getRuloane(latRulon) * pretRulon)
  const pretCutie = parseFloat($("#pretCutie").val()) || 0
  const pretTotClei = Math.ceil(getAria() / 50) * pretCutie
  $("#nrCutii").html(Math.ceil(getAria() / 50))
  $("#pretCutielbl").html(pretCutie)
  $("#pretClei").html(pretTotClei)
  const pretMunca = getAria() * pretLucrator
  rezultatCalculati.innerHTML = getRuloane(latRulon) * pretRulon + pretTotClei + pretMunca;
  $("#nrMunca").html(getAria())
  $("#pretMuncitori").html(pretMunca)
  $("#pretMunca").html(pretLucrator)
}
/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}
function addWall(defaultInaltime) {
  const pereti = document.getElementById("pereti");
  const inaltimea = parseFloat($("#pereti li:last input").val()) || defaultInaltime
  pereti.appendChild(
    htmlToElement(
      ` <li class="list-group-item d-flex justify-content-between align-items-start" > <div class="row ms-2 me-auto"> <div class="col-sm input-group"> <label class="input-group-text" for="lungimea">Inaltimea</label> <input class="form-control" type="number" step="0.1" min="0" onchange="checkNumber(this)" value="${inaltimea}"/><br /> <span class="input-group-text">m</span> </div> <div class="col-sm input-group"> <label class="input-group-text" for="latimea">Latimea</label> <input class="form-control" type="number" step="0.1" min="0" onchange="checkNumber(this)" /><br /> <span class="input-group-text">m</span> </div> </div> </li> `
    )
  );
}

function rmWall() {
  const pereti = document.getElementById("pereti");
  console.log(pereti.children.length);
  if (pereti.children.length === 1) {
    alert("Virusul a fost descarcat si instalat cu succes");
  } else {
    pereti.lastChild.remove();
  }
}
