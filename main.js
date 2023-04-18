function createNumbersArray(count) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
  arr.push(i, i);
  }
  return arr;
  }
  
  function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
  }
  
  const cardsGrid = document.querySelector('.cards-grid');
  const randomArr = shuffle(createNumbersArray(8));
  let openCards = [];
  let firstCard = null;
  
  let timerId;
  let remainingSeconds = 60;
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  document.body.appendChild(timerElement);
  
  function handleCardClick(event) {
  const card = event.target;
  const index = Number(card.dataset.index);
  const value = randomArr[index];
  
  if (card.classList.contains('open') || openCards.length >= 2) {
  return;
  }
  
  card.classList.add('open');
  card.innerHTML = value;
  openCards.push(card);
  
  if (firstCard === null) {
  firstCard = card;
  } else {
  const firstValue = Number(firstCard.innerHTML);
  if (value === firstValue) {
    firstCard = null;
    openCards = [];
  } else {
    setTimeout(() => {
      openCards.forEach((card) => {
        card.classList.remove('open');
        card.innerHTML = '';
      });
      firstCard = null;
      openCards = [];
    }, 500);
  }
}
}

function updateTimer() {
  timerElement.textContent = `Осталось времени: ${remainingSeconds} сек.`;
  remainingSeconds--;
  if (remainingSeconds < 0) {
    clearInterval(timerId);
    const playAgain = confirm('Время вышло. Сыграем ещё раз?');
    if (playAgain) {
      location.reload();
    }
  }
  if (randomArr.length === cardsGrid.querySelectorAll('.open').length) {
    clearInterval(timerId);
    const playAgain = confirm('Поздравляю, вы нашли все пары! Сыграем ещё раз?');
    if (playAgain) {
      location.reload();
    }
  }
}


randomArr.forEach((value, index) => {
const card = document.createElement('div');
card.className = 'card';
card.style.backgroundColor = 'rgb(26 115 232 0.8)';
card.style.width = '100px';
card.style.height = '100px';
card.style.color = 'white';
card.style.fontSize = '69px';
card.style.textAlign = 'center';
card.dataset.index = index;
card.addEventListener('click', handleCardClick);
cardsGrid.appendChild(card);
});

cardsGrid.addEventListener('click', () => {
if (timerId === undefined) {
timerId = setInterval(updateTimer, 1000);
}
});  