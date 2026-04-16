/*
 * https://stackoverflow.com/a/10073788
 */
function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function FormatTime(duration) {
  let seconds = pad(parseInt(duration % 60), 2);
  let minutes = pad(parseInt((duration / 60) % 60), 2);
  let hours = pad(parseInt(duration / 60 / 60), 2);

  return [hours, minutes, seconds];
}

function DisplayTime(durationList) {
  let displays = [
    document.getElementById("hours"),
    document.getElementById("minutes"),
    document.getElementById("seconds"),
  ];

  // I mean, I know ECMAScript can do this without typecasting,
  // but I'm a Rust dev(?), so...
  if (parseInt(durationList[0]) <= 0) {
    let hoursDisplay = document.getElementById("hoursDisplay");
    hoursDisplay.style = "display:none";
  }

  for (i = 0; i < displays.length; i++) {
    displays[i].textContent = durationList[i];
  }
}

function SetFlavourText(text) {
  let barText = document.getElementById("textToShow");
  barText.textContent = text;
}

function SetIcon(intermissionType) {
  let icon = document.getElementById("iconThing");
  icon.src = `static/images/${intermissionType}.svg`;
}

function SetupStuff(intermissionType) {
  SetIcon(intermissionType);

  switch (intermissionType) {
    case "starting":
      SetFlavourText("I'm setting up stream! Ads will play at the beginning of stream to stop prerolls.")
      return 650;
    
    case "break":
      SetFlavourText("I'm taking a break and running ads! Make sure to take care of yourself; stretch and hydrate!")
      return 300;
    
    case "brb":
      SetFlavourText("Something happened! We'll be right back!")
      return -1;
    default:
      break;
  }
}

function Initialize() {
  // params from URL
  const queryParams = new URLSearchParams(location.search);
  const intermissionType = queryParams.get("type") ?? "starting";

  let timer = SetupStuff(intermissionType);

  DisplayTime(FormatTime(timer));

  let timerInterval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(timerInterval);
    } else {
      timer--;
      DisplayTime(FormatTime(timer));
    }
  }, 1000);
}

Initialize();
