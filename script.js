const terminalText = document.getElementById("text_stuff");
const terminal = document.getElementById("terminal");

const mainOptions = document.getElementById("main-options");

const userColor = "#89ba25";
const suggestionColor = "#ef622a"
//TODO: set this back to 50
const typetime = 10;

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
  console.log(currentOptions);
  if (currentOptions) {
    currentOptions.style.display = "none";
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

function displayText(str, into) {
  const elem = document.createElement("pre");
  elem.innerHTML += str; 
  into.appendChild(elem);
}

async function help() {
  await writePromptStarter("help");
  newLine();  
  await writeCmds(["cat help.txt"]);
  displayText("\n\n"                                                                                         + 
"   ▄██████▄     ▄████████  ▄█        ▄█          ▄████████    ▄████████     ███             ▄███████▄    ▄████████    ▄███████▄    ▄███████▄   █▄    ▄████████\n" + 
"  ███    ███   ███    ███ ███       ███         ███    ███   ███    ███ ▀█████████▄        ███    ███   ███    ███   ███    ███   ███    ███   ██   ███    ███\n" + 
"  ███    █▀    ███    █▀  ███       ███         ███    █▀    ███    ███    ▀███▀▀██        ███    ███   ███    ███   ███    ███   ███    ███   ██   ███    █▀ \n" + 
" ▄███         ▄███▄▄▄     ███       ███        ▄███▄▄▄      ▄███▄▄▄▄██▀     ███   ▀        ███    ███   ███    ███   ███    ███   ███    ███        ███       \n" + 
"▀▀███ ████▄  ▀▀███▀▀▀     ███       ███       ▀▀███▀▀▀     ▀▀███▀▀▀▀▀       ███          ▀█████████▀  ▀███████████ ▀█████████▀  ▀█████████▀       ▀███████████\n" + 
"  ███    ███   ███    █▄  ███       ███         ███    █▄  ▀███████████     ███            ███          ███    ███   ███          ███                      ███\n" + 
"  ███    ███   ███    ███ ███▌    ▄ ███▌    ▄   ███    ███   ███    ███     ███            ███          ███    ███   ███          ███                ▄█    ███\n" + 
"  ████████▀    ██████████ █████▄▄██ █████▄▄██   ██████████   ███    ███    ▄████▀         ▄████▀        ███    █▀   ▄████▀       ▄████▀            ▄████████▀ \n" + 
"                          ▀         ▀                        ███    ███                                                                                       \n" + 
" ▄█     █▄     ▄████████ ▀█████████▄           ███        ▄████████    ▄████████   ▄▄▄▄███▄▄▄▄    ▄█  ███▄▄▄▄      ▄████████  ▄█                              \n" + 
"███     ███   ███    ███   ███    ███      ▀█████████▄   ███    ███   ███    ███ ▄██▀▀▀███▀▀▀██▄ ███  ███▀▀▀██▄   ███    ███ ███                              \n" + 
"███     ███   ███    █▀    ███    ███         ▀███▀▀██   ███    █▀    ███    ███ ███   ███   ███ ███▌ ███   ███   ███    ███ ███                              \n" + 
"███     ███  ▄███▄▄▄      ▄███▄▄▄██▀           ███   ▀  ▄███▄▄▄      ▄███▄▄▄▄██▀ ███   ███   ███ ███▌ ███   ███   ███    ███ ███                              \n" + 
"███     ███ ▀▀███▀▀▀     ▀▀███▀▀▀██▄           ███     ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   ███   ███   ███ ███▌ ███   ███ ▀███████████ ███                              \n" + 
"███     ███   ███    █▄    ███    ██▄          ███       ███    █▄  ▀███████████ ███   ███   ███ ███  ███   ███   ███    ███ ███                              \n" + 
"███ ▄█▄ ███   ███    ███   ███    ███          ███       ███    ███   ███    ███ ███   ███   ███ ███  ███   ███   ███    ███ ███▌    ▄                        \n" + 
" ▀███▀███▀    ██████████ ▄█████████▀          ▄████▀     ██████████   ███    ███  ▀█   ███   █▀  █▀    ▀█   █▀    ███    █▀  █████▄▄██                        \n" + 
"                                                                      ███    ███                                             ▀                                \n\n" +
"Hi, my name is Gellert-Szabolcs Papp, currently a masters student, who enjoys developing things.\nTo navigate click on the options bellow, or use the left and right arrows then press space or enter.\n",
    terminalText
  ) 
}

function neofetchLines(name_values, elem) {
  for (i in name_values) {
    const span = document.createElement("span");
    span.style.color = userColor;
    span.innerHTML += name_values[i][0];
    elem.appendChild(span);
    elem.innerHTML += `: ${name_values[i][1]}<br>`;
  }
}

async function aboutMePressed() {
  turnOffOptions();
  await writeCmds(["about_me", "neofetch"]);
  
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.gap = "10px";
  const pic = document.createElement("img");
  pic.setAttribute("src", "goober.png");
  const text = document.createElement("div");

  const span = document.createElement("span");
  span.style.color = userColor;
  span.innerHTML += "whois@gszp";
  text.appendChild(span);
  text.innerHTML += "<br>----------<br>";

  neofetchLines(
    [
      ["Name", "Gellert-Szabolcs Papp"],
      ["Education", "<br>Finished undergrad studies at the Babeş-Bolyai University, Mathematics and Computer Science specialization<br>Currently a masters student at the same university, High performance calculations and big data analytics specialization"],
      ["Interests", "High performance calulations and big data analytics, fullstack development, tools, mathematics"],
      ["Languages", "Hungarian (mother tongue), English (fluent), Romanian (intermediate)"],
      ["Technologies", "JavaScript, React, Java, C++, Rust, SQL, bash, Docker, Docker Compose, Gitlab CI/CD"],
      ["Experience", "<br>Fullstack development"],
      ["Email", "pappgellert2003@gmail.com"],
      ["Phone", "0747958992"],
    ], 
    text
  )

  container.appendChild(pic);
  container.appendChild(text);
  terminalText.appendChild(container);
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
