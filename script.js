

const terminalText = document.getElementById("text_stuff");
const terminal = document.getElementById("terminal");

const mainOptions = document.getElementById("main-options");

const userColor = "#89ba25";
const suggestionColor = "#ef622a"
const typetime = 50;

let currentOptions = undefined;

setInterval(() => {
  if (terminalText.innerHTML.endsWith("&nbsp;")) {
    terminalText.innerHTML = terminalText.innerHTML.slice(0, -6) + "|";
  } else if (terminalText.innerHTML.endsWith("|")) {
    terminalText.innerHTML = terminalText.innerHTML.slice(0, -1) + "&nbsp"; 
  } 
}, 500);

class focusGroup {
  constructor(group) {
    if (group.children.length == 0) {
      return;
    }
    this.children = []; 
    for (let i = 0; group.children[i]; i++) {
      this.children.push(group.children[i]);
    }
    this.children.forEach(childEl => childEl.setAttribute('tabindex', '-1'));
    this.children[0].setAttribute('tabindex', '0');
    this.i = 0;
    
    group.addEventListener('keyup', e => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });
  }

  next() {
    if (this.i < this.children.length - 1) this.i += 1
    else this.i = 0;
      
    this.updateFocus();
  }
  
  prev() {
    if (this.i > 0) this.i -= 1
    else this.i = this.children.length -1;
    
    this.updateFocus();
  }
  
  updateFocus() {
    this.children.forEach(el => el.setAttribute('tabindex', '-1'));
    this.children[this.i].setAttribute('tabindex', '0');
    this.children[this.i].focus();
  }
}

async function typeAnimation(elem, text) {
  for (let i = 0; i < text.length; i++) {
    elem.innerHTML += text[i];
    await new Promise(r => setTimeout(r, typetime));
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

function turnOnOptions(options) {
  if (options) {
    options.style.display = "block";
    currentOptions = options;
    options.children[0].focus();
  }
}

function turnOffOptions() {
  if (currentOptions) {
    currentOptions.display = "none";
  }
}

function newLine() {
  removeCaret();
  terminalText.innerHTML += "<br>";
}

async function writePromptStarter(cmd, options) {
  removeCaret();
  turnOffOptions();
  await typeAnimation(terminalText, "╭─");
  const span = document.createElement("span");
  span.style.color = userColor;
  terminalText.appendChild(span);
  await typeAnimation(span, "whois@gszp");
  terminalText.innerHTML += "<br>";
  await typeAnimation(terminalText, `╰─$ ${cmd} `);
  turnOnOptions(options); 
  addCaret();
}

async function writeCmds(cmds) {
  removeCaret();
  turnOffOptions();
  for (let i in cmds) {
    await typeAnimation(terminalText, cmds[i]);
    terminalText.innerHTML += "<br>";
  }
}

function displayFromFile(fileName) {
   
}

async function help() {
  await writePromptStarter("help");
  newLine();  
  await writeCmds(["cat help.txt"]);
  
}

function aboutMePressed() {
  console.log("noe");
}

function projectsPressed() {
  console.log("joj");
}

async function main() {
  document.querySelectorAll('.options').forEach(el => new focusGroup(el, true));
  
  await help();
  

  await writePromptStarter("lets_see", mainOptions);
}

main();
