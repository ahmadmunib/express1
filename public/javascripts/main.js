document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  socket.on("update", (newArray) => {
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    newArray.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  });

  const updateButton = document.getElementById("update-button");
  
  updateButton.addEventListener("click", () => {
    fetch("/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ newArray: [6, 7, 44 ,8] }),
      // make a random numbers in the array (5 items only)
      body: JSON.stringify({
        newArray: Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * 100)
        ),
      }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data));
  });
});
