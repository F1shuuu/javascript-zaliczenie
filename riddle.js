function findHeavyBallIndex(balls) {
  // sprawdz czy array ma 8 piłek
  if (balls.length !== 8) {
    console.error("Invalid input. There must be exactly 8 balls.");
    return -1; //  Jeśli nie, wypisuje błąd i zwraca -1.
  }

  // piersze ważenie
  const firstWeighingResult = weigh(balls.slice(0, 4), balls.slice(4, 8));

  if (firstWeighingResult === 0) {
    // Jeśli obie strony równoważą się, cięższa piłka znajduje się w pozostałych 4
    // drugie ważenie
    const secondWeighingResult = weigh(balls.slice(4, 6), balls.slice(6, 8));

    if (secondWeighingResult === 0) {
   // Jeśli są równe, ostatnia kula jest cięższa
      return balls.length - 1;
    } else {
     // Zwraca indeks cięższej kuli z drugiego ważenia.
      return (secondWeighingResult === 1) ? 6 : 7;
    }
  } else {
    // Jeśli pierwsze ważenie nie jest zrównoważone, ciężka kula znajduje się w pierwszym 4
    // Drugie ważenie
    const secondWeighingResult = weigh(balls.slice(0, 1), balls.slice(1, 2));

    if (secondWeighingResult === 0) {
     // Jeśli są równe, pierwsza piłka jest cięższa
      return 0;
    } else {
      // zwraca indeks cięższej piłki z 1 ważenia
      return (firstWeighingResult === 1) ? 0 : 1;
    }
  }
}

// funkcja do symulowania ważenia na wadze
// Zwraca 0, jeśli obie strony się równoważą, 1, jeśli lewa strona jest cięższa i -1, jeśli prawa strona jest cięższa.
function weigh(leftSide, rightSide) {
  const leftWeight = leftSide.reduce((acc, val) => acc + val, 0);
  const rightWeight = rightSide.reduce((acc, val) => acc + val, 0);

  if (leftWeight === rightWeight) {
    return 0;
  } else {
    return (leftWeight > rightWeight) ? 1 : -1;
  }
}

const balls = [1, 2, 1, 1, 1, 1, 1, 1];
const heavyBallIndex = findHeavyBallIndex(balls);

console.log("Index of the heavy ball:", heavyBallIndex);
