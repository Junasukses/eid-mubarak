let arr_text = [];
let currentTextIndex = 0;
let currentLetter = 0;
let isChangedToNewTextIndex = false;
let animationFrameId;
let isWritingInProgress = false;

const textWritingElement = document.querySelector(".text-writing");
const textWrapperElement = document.querySelector(".text-wrapper");

function startWriting() {
  fetch("./../assets/data/arr_text.json")
    .then((res) => res.json())
    .then((arr) => {
      arr_text = arr;
      arr_text.unshift(getFirstGreetingText());
      writeText();
    });

  textWrapperElement.addEventListener("click", () => {
    console.log(currentTextIndex);
    if (!isWritingInProgress) {
      textWritingElement.innerHTML = "";
      currentLetter = 0;
      currentTextIndex =
        currentTextIndex === arr_text.length - 1 ? 0 : currentTextIndex + 1;
      cancelAnimationFrame(animationFrameId);
      writeText();
    }
  });

  writeText();
}

function writeText() {
  const text = arr_text[currentTextIndex];
  if (
    currentTextIndex === arr_text.length - 1 &&
    currentLetter === text.length
  ) {
    return;
  }

  if (currentLetter < text.length) {
    isWritingInProgress = true;
    textWritingElement.innerHTML +=
      text.charAt(currentLetter) === "|" ? "<br>" : text.charAt(currentLetter);
    currentLetter++;
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(writeText);
    }, 100);
  } else {
    setTimeout(() => {
      isWritingInProgress = false;
      animationFrameId = requestAnimationFrame(writeText);
    }, 1200);
  }
}

function getFirstGreetingText() {
  return "Kami Agus Semeru Sekeluarga Mengucapkan";
}

function closeEnvelope() {
  const envelopeWrapperElement = document.getElementById("envelope-wrapper");
  const textWritingElement = document.querySelector(".text-writing");
  const audio = new Audio("./assets/music/1.mp3");

  audio.setAttribute("loop", true);
  audio.play();

  envelopeWrapperElement.classList.add("move-to-top");
  textWritingElement.classList.remove("d-none");

  showKetupat();
  startWriting();
}

function showKetupat() {
  setTimeout(() => {
    const arrKetupatElements =
      document.querySelector(".ketupat-wrapper").children;

    for (let i = 0; i < arrKetupatElements.length; i++) {
      ketupatElement = arrKetupatElements[i];

      ketupatElement.classList.add("show-ketupat");
    }
  }, 1000);
}
