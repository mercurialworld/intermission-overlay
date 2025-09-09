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

function Initialize() {
  // params from URL
  const queryParams = new URLSearchParams(location.search);

  // get text to put in bottom right, or "starting soon" if none
  const text = queryParams.get("text") ?? "STARTING SOON™";
  const textDiv = document.getElementById("textToShow");
  textDiv.textContent = text;

  // get font size, or default to 128px
  const fontSize = queryParams.get("textSize") ?? "128px";
  textDiv.style.fontSize = fontSize;

  // get time. if none, default to 10min
  let timer = queryParams.get("time") ?? 600;
  console.log(`counting down ${timer} seconds...`);

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
