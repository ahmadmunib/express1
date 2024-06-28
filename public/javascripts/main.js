document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    socket.on('update', (newArray) => {
      const ul = document.querySelector('ul');
      ul.innerHTML = '';
      newArray.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    });
  
    const updateButton = document.getElementById('update-button');
    if (updateButton) {
        alert("updateButton");
      updateButton.addEventListener('click', () => {
        fetch('/about', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newArray: [6, 7, 44 ,8] }),
        })
        .then(response => response.text())
        .then(data => console.log(data));
      });
    }
  });
  