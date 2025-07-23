const textminal = document.getElementById('textminal');

const userColor = "#89ba25";
const suggestionColor = "#ef622a"

writePromptStarter();

setInterval(() => {
  if (textminal.innerHTML.endsWith("&nbsp;")) {
    textminal.innerHTML = textminal.innerHTML.slice(0, -6) + "|";
  } else if (textminal.innerHTML.endsWith("|")) {
    textminal.innerHTML = textminal.innerHTML.slice(0, -1) + "&nbsp"; 
  } 
}, 500);

function writeText(strs) { 
  textminal.innerHTML = textminal.innerHTML.slice(0, -1) + "${strs[0]}<br>";
  for(line in strs.slice(1)) {
    textminal.innerHTML += "> ${line}<br>"; 
  }
}

function writePromptStarter() {
  let offs;
  if (textminal.innerHTML.endsWith("&nbsp;")) {
    offs = -6;
  } else if (textminal.innerHTML.endsWith("|")) {
    offs = -1;
  } else {
    offs = textminal.innerHTML.length;
  }
  textminal.innerHTML = textminal.innerHTML.slice(0, offs) + "╭─<span style=\"color:" + userColor + "\">whois@gszp</span> ~<br>╰─$ &nbsp";
}

function animateText(base, additional) {

}
