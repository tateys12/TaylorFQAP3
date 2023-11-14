document.addEventListener("DOMContentLoaded", function () {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => {
      return res.json();
    })
    .then((breeds) => {
      let select = document.getElementById("select");
      if (select) {
        for (var breed in breeds.message) {
          const option = document.createElement("option");
          option.value = breed;
          option.text = breed;
          select.add(option);
        }
      } else {
        console.error("Something's Wrong: Select element not found.");
      }
    })
    .catch((error) => {
      console.error("Something's Wrong:", error);
    });
});

const getBreedsButton = document.querySelector("#getbreeds");
const imagesContainer = document.querySelector("#output");
let currentBreed = null;

getBreedsButton.addEventListener("click", () => {
  const selectedBreed = document.querySelector("#select").value;
  const numImages = parseInt(document.querySelector("#textbox").value);

  if (selectedBreed !== currentBreed) {
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }

    fetch(
      `https://dog.ceo/api/breed/${selectedBreed}/images/random/${numImages}`
    )
      .then((res) => res.json())
      .then((data) => {
        data.message.forEach((imageUrl) => {
          const img = document.createElement("img");
          img.src = imageUrl;
          imagesContainer.appendChild(img);
        });

        currentBreed = selectedBreed; // updates current breed
      })
      .catch((error) => {
        console.error("Something's Wrong:", error);
      });
  }
});
