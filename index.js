const readline = require("readline");
const logUpdate = require("log-update");
const chalk = require("chalk");
const { between, generateSpace } = require("./utils");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

function feed() {
  if (state.faim === false) {
    return;
  }
  state.life += state.heal;
  state.faim = false;
}

function sleep() {
  if (state.sleep === 0) {
    return;
  }
  state.sleep += state.heal;
  state.sleep = 0;
}

process.stdin.on("keypress", (character, key) => {
  switch (key.name) {
    case "m":
      feed();
      break;

    case "s":
      sleep();
      break;
  }
});

rl.on("close", () => {
  process.exit(0);
});

const bear = ["ʕ•ᴥ•ʔ", " ᕦʕ •ᴥ•ʔᕤ", " ┏ʕ •ᴥ•ʔ┛", "ʅʕ•ᴥ•ʔʃ"];

const deadBear = " ⊂(●￣(エ)￣●)⊃";
const pourcent = "100%";
const death = "♡";
const eat = "🍔🍟 J'AI LA DALLE ʕ≧ᴥ≦ʔ";
const dodo = "💤 J'AI SOMMEIL BITCH  ʕノ)ᴥ(ヾʔ";
const state = {
  life: 100,
  time: 0, // temps en secondes
  faim: false,
  sleep: 0,
  heal: 10,
};

function getBear() {
  if (state.life > 0) {
    return generateSpace() + bear[Math.floor(Math.random() * bear.length)];
  }

  return deadBear;
}

function getLifeBar() {
  if (state.life < 0) {
    return "GAME OVER";
  }
  if (state.faim === true && state.life > 0) {
    return generateSpace() + eat;
  }
  if (state.sleep === true && state.faim === false && state.life > 0) {
    return generateSpace() + dodo;
  }
  const barCompleteChar = "\u2588";
  const barIncompleteChar = "\u2591";
  const total = 60;
  const full = (state.life * 60) / 100;
  const empty = total - full;

  return (
    new Array(Math.floor(full)).fill(barCompleteChar).join("") +
    new Array(Math.floor(empty)).fill(barIncompleteChar).join("")
  );
}

setInterval(function () {
  const espace = [getBear(), "", getLifeBar() + "/" + `${pourcent}`];

  logUpdate(espace.join("\n"));
}, 500);

setInterval(function () {
  state.time += 1;

  if (state.time % 3) {
    state.life--;
  }
  if (state.time % 60 === 0 && state.faim === false) {
    state.faim = true;
  }
  if (state.time % 5 === 0 && state.sleep === 0) {
    state.sleep = true;
  }
}, 750);
