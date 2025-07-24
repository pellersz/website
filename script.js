const terminalText = document.getElementById("text_stuff");
const terminal = document.getElementById("terminal");
const options = document.getElementById("options");

const userColor = "#89ba25";
const suggestionColor = "#ef622a"
const typetime = 50;

setInterval(() => {
  if (terminalText.innerHTML.endsWith("&nbsp;")) {
    terminalText.innerHTML = terminalText.innerHTML.slice(0, -6) + "|";
  } else if (terminalText.innerHTML.endsWith("|")) {
    terminalText.innerHTML = terminalText.innerHTML.slice(0, -1) + "&nbsp"; 
  } 
}, 500);

writePromptStarter();

async function typeAnimation(elem, text, ind) {
  console.log(text);
  console.log(text[0]);
  elem.innerHTML += text[ind];
  if (ind + 1 < text.length) {
    await new Promise(r => setTimeout(r, typetime));
    await typeAnimation(elem, text, ind + 1);
  } 
}

async function writeText(strs) { 
  terminalText.innerHTML = terminalText.innerHTML.slice(0, -1) + "${strs[0]}<br>";
  for(line in strs.slice(1)) {
    terminalText.innerHTML += "> ${line}<br>"; 
  }
}

function removeCaret() {
  if (terminalText.innerHTML.endsWith("&nbsp;")) {
    terminalText.innerHTML = terminalText.innerHTML.slice(0, -6);
  } else if (terminalText.innerHTML.endsWith("|")) {
    terminalText.innerHTML = terminalText.innerHTML.slice(0, -1); 
  }
}

function addCaret() {
  terminalText.innerHTML += "|";
}

async function writePromptStarter() {
  removeCaret();
  //options.style.display = "none";
  await typeAnimation(terminalText, "╭─", 0);
  const span = document.createElement("span");
  span.style.color = userColor;
  terminalText.appendChild(span);
  await typeAnimation(span, "whois@gszp", 0);
  terminalText.innerHTML += "<br>";
  await typeAnimation(terminalText, "╰─$", 0);
  options.style.dispaly = "auto";
  addCaret();
}

