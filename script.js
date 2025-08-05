const terminalText = document.getElementById("text_stuff");
const terminal = document.getElementById("terminal");

const mainOptions = document.getElementById("main-options");
const projectOptions = document.getElementById("project-options");

const userColor = "#89ba25";
const suggestionColor = "#ef622a"
//TODO: set this back to 50
const typetime = 50;
const fasttypetime = 1;
let currentDir = "~"

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

async function typeAnimation(elem, text, typet) {
  for (let i = 0; i < text.length; i++) {
    elem.innerHTML += text[i];
    if (typet) {
      await new Promise(r => setTimeout(r, typet));
    } else {
      await new Promise(r => setTimeout(r, typetime));
    }
    if (terminal.scrollTop < (terminal.scrollHeight - terminal.offsetHeight)) {
      terminal.scrollTop = terminal.scrollHeight;
    }
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
  await typeAnimation(terminalText, "╭─", fasttypetime);
  const span = document.createElement("span");
  span.style.color = userColor;
  terminalText.appendChild(span);
  await typeAnimation(span, `whois@gszp ${currentDir}`, fasttypetime);
  terminalText.innerHTML += "<br>";
  await typeAnimation(terminalText, `╰─$ ${cmd} `, fasttypetime);
  turnOnOptions(options); 
  addCaret();
}

async function writeCmds(cmds, typet) {
  removeCaret();
  turnOffOptions();
  for (let i in cmds) {
    await typeAnimation(terminalText, cmds[i], typet);
    terminalText.innerHTML += "<br>";
  }
}

function displayText(str, into) {
  const elem = document.createElement("pre");
  elem.innerHTML += str; 
  into.appendChild(elem);
}

async function help() {
  turnOffOptions();

  await writeCmds(["help", "cat help.txt"]);
  let greetingText = "\n\n";
  if (window.innerWidth > 1400) {
       greetingText +=                       
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
"                                                                      ███    ███                                             ▀                                \n\n" 
  } else if (window.innerWidth > 900) {
      greetingText +=
"  ________       .__  .__                 __    __________                   /\\          \n" +
" /  _____/  ____ |  | |  |   ____________/  |_  \\______   \\____  ______ _____)/    ______\n" +
"/   \\  ____/ __ \\|  | |  | _/ __ \\_  __ \\   __\\  |     ___|__  \\ \\____ \\\\____ \\   /  ___/\n" +
"\\    \\_\\  \\  ___/|  |_|  |_\\  ___/|  | \\/|  |    |    |    / __ \\|  |_> >  |_> >  \\___ \\ \n" +
" \\______  /\\___  >____/____/\\___  >__|   |__|    |____|   (____  /   __/|   __/  /____  >\n" +
"        \\/     \\/               \\/                             \\/|__|   |__|          \\/ \n" +
" __      __      ___.     ___________                  .__              .__              \n" +
"/  \\    /  \\ ____\\_ |__   \\__    ___/__________  _____ |__| ____ _____  |  |             \n" +
"\\   \\/\\/   // __ \\| __ \\    |    |_/ __ \\_  __ \\/     \\|  |/    \\\\__  \\ |  |             \n" +
" \\        /\\  ___/| \\_\\ \\   |    |\\  ___/|  | \\/  Y Y  \\  |   |  \\/ __ \\|  |__           \n" +
"  \\__/\\  /  \\___  >___  /   |____| \\___  >__|  |__|_|  /__|___|  (____  /____/           \n" +
"       \\/       \\/    \\/               \\/            \\/        \\/     \\/                 \n\n" 
  } else {
      greetingText +=
"▄▖  ▜ ▜     ▗  ▄▖      ▌  \n" +
"▌ █▌▐ ▐ █▌▛▘▜▘ ▙▌▀▌▛▌▛▌ ▛▘\n" +
"▙▌▙▖▐▖▐▖▙▖▌ ▐▖ ▌ █▌▙▌▙▌ ▄▌\n" +
"                   ▌ ▌    \n" +
"▖  ▖  ▌  ▄▖     ▘    ▜    \n" +
"▌▞▖▌█▌▛▌ ▐█▌▛▘▛▛▌▛▌▀▌▐    \n" +
"▛ ▝▌▙▖▙▌ ▐▙▖▌ ▌▌▌▌▌█▌▐▖   \n\n"
  }
  greetingText += "Hi, my name is Gellert-Szabolcs Papp, currently a masters student, who enjoys developing things.\nTo navigate, click on the options bellow, or use the left and right arrows then press space or enter.\n"

  displayText(greetingText, terminalText);
  await writePromptStarter("lets_see", currentOptions);
  turnOnOptions(currentOptions);
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
  removeCaret();
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
      ["Education", "<br>Finished undergrad studies at the Babeş-Bolyai University, Mathematics and Computer Science specialization" + 
          "<br>Currently a masters student at the same university, High performance calculations and big data analytics specialization"],
      ["Interests", "High performance calulations and big data analytics, fullstack development, tools, mathematics"],
      ["Languages", "Hungarian (mother tongue), English (fluent), Romanian (intermediate)"],
      ["Technologies", "JavaScript, React, Java, C++, Rust, SQL, bash, Docker, Docker Compose, Gitlab CI/CD"],
      ["Experience", "<br>Fullstack development"],
      ["Email", "pappgellert2003@gmail.com"],
      ["Phone", "+40747958992"],
      ["GitHub", "<a href=\"https://github.com/pellersz/\" target=\"_blank\">https://github.com/pellersz/</a>"]
    ], 
    text
  )

  container.appendChild(pic);
  container.appendChild(text);
  terminalText.appendChild(container);
  await writePromptStarter("lets_see", currentOptions);
}

async function projectsPressed() {
  turnOffOptions();
  removeCaret();
  await writeCmds(["projects", "cd Projects"]);
  currentDir = "~/Projects";
  writePromptStarter("lets_see", projectOptions);
}

async function apifsPressed() {
  turnOffOptions();
  removeCaret();
  await writeCmds(
    [
      "apifs", 
      "cd apifs", 
      "kitty icat apifs.png", 
      "echo \"  apifs is a commnd line utility to create, manage reminders and notes.\\n" + 
        "  This is a smaller personal project of mine, in an attempt to try to and learn the Rust programming language and its ecosystem. I was curious about it, because languages like C and C++ are losing trackion, while Rust is getting integrated into more and more software (like the Linux kernel) (granted, according to the Tiobe index, C and C++, are still 9 times more used, but the gap between them is slowly narrowing)\\n" + 
        "  It can be accessed on my github page: https://github.com/pellersz/apifs.\"",
      "cd .."
    ],
    fasttypetime
  );
  
  const pic = document.createElement("img");
  pic.setAttribute("src", "apifs.png");
  terminalText.appendChild(pic);
  displayText(
"apifs is a commnd line utility to create, manage reminders and notes written in Rust.\n\n" + 
"This is a smaller personal project of mine, in an attempt to try to and learn the Rust programming language and its ecosystem. I was curious about it, because languages like C and C++ are losing trackion, while Rust is getting integrated into more and more software (like the Linux kernel) (granted, according to the Tiobe index, C and C++, are still 9 times more used, but the gap between them is slowly narrowing)\n",
    terminalText
  );
  terminalText.innerHTML += "The project can be accessed on my github page: <a href=\"https://github.com/pellersz/apifs\" target=\"_blank\">https://github.com/pellersz/apifs</a><br>";
  writePromptStarter("lets_see", currentOptions);
}

async function wmpPressed() {
  turnOffOptions();
  removeCaret();
  await writeCmds(
    [
      "Watch My Project", 
      "cd Watch\\ My\\ Project", 
      "kitty icat wmp.png", 
      "echo \"  The Watch My Project softwaresysten, gives opportunity for people of the public to follow community projects and their needs. It also provides a platform for organizators to make their projects more well known.\\n" + 
        "  This project was part of a student mentorship program, where I collaborated with other strudents. On this project I was a fullstack developer. The backend was written in JavaScript with Node.js, the frontend was created with React, the database manipulations were done with the Sequelize ORM framework.\\n" + 
        "  We also presented the application in the 28th Transylvanian Students’ Scientific Conference, where it achieved an honorable mention.\"",
      "cd .."
    ],
    fasttypetime
  );
  
  const pic = document.createElement("img");
  pic.setAttribute("src", "main_page.png");
  terminalText.appendChild(pic);
  displayText(
"  The Watch My Project softwaresysten, gives opportunity for people of the public to follow community projects and their needs. It also provides a platform for organizators to make their projects more well known.\n" + 
"  This project was part of a student mentorship program, where I collaborated with other strudents. On this project I was a fullstack developer. The backend was written in JavaScript with Node.js, the frontend was created with React, the database manipulations were done with the Sequelize ORM framework.\n" + 
"  We also presented the application in the 28th Transylvanian Students’ Scientific Conference, where it achieved an honorable mention.", 
    terminalText
  );
  writePromptStarter("lets_see", currentOptions);
}

async function back() {
  turnOffOptions();
  await writeCmds(["back", "cd .."]);
  currentDir = "~";
  writePromptStarter("lets_see", mainOptions);
}
 
async function main() {
  document.querySelectorAll('.options').forEach(el => new focusGroup(el, true));
  currentOptions = mainOptions;
  await writePromptStarter("");
  await help(); 
}

main();
