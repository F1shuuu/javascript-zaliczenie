// Define the standard 52-card deck
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const deck = [];

// Create the deck
for (const suit of suits) {
  for (const rank of ranks) {
    deck.push({ rank, suit });
  }
}

// Function to shuffle the deck and return a newly shuffled deck
function shuffleDeck(deck) {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

// Function to deal 5 cards to the player
function dealHand(deck, numCards) {
  const hand = [];
  for (let i = 0; i < numCards; i++) {
    hand.push(deck.pop());
  }
  return hand;
}

// Function to determine the poker hand in the player's hand
function determinePokerHand(hand) {
  // Sort the hand by ranks
  hand.sort((a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));

  // Check for various poker hands
  if (hasRoyalFlush(hand)) {
    return "Royal Flush";
  } else if (hasStraightFlush(hand)) {
    return "Straight Flush";
  } else if (hasFourOfAKind(hand)) {
    return "Four of a Kind";
  } else if (hasFullHouse(hand)) {
    return "Full House";
  } else if (hasFlush(hand)) {
    return "Flush";
  } else if (hasStraight(hand)) {
    return "Straight";
  } else if (hasThreeOfAKind(hand)) {
    return "Three of a Kind";
  } else if (hasTwoPair(hand)) {
    return "Two Pair";
  } else if (hasOnePair(hand)) {
    return "One Pair";
  } else {
    return "High Card";
  }
}

// Helper functions to check poker hands
function hasOnePair(hand) {
  const uniqueRanks = [...new Set(hand.map(card => card.rank))];
  return uniqueRanks.length === 4;
}

function hasTwoPair(hand) {
  const uniqueRanks = [...new Set(hand.map(card => card.rank))];
  return uniqueRanks.length === 3;
}

function hasThreeOfAKind(hand) {
  const uniqueRanks = [...new Set(hand.map(card => card.rank))];
  return uniqueRanks.length === 3 && hand.some(card => hand.filter(c => c.rank === card.rank).length === 3);
}

function hasStraight(hand) {
  for (let i = 0; i < hand.length - 1; i++) {
    if (ranks.indexOf(hand[i].rank) + 1 !== ranks.indexOf(hand[i + 1].rank)) {
      return false;
    }
  }
  return true;
}

function hasFlush(hand) {
  const uniqueSuits = [...new Set(hand.map(card => card.suit))];
  return uniqueSuits.length === 1;
}

function hasFullHouse(hand) {
  return hasThreeOfAKind(hand) && hasOnePair(hand);
}

function hasFourOfAKind(hand) {
  const uniqueRanks = [...new Set(hand.map(card => card.rank))];
  return uniqueRanks.length === 2 && hand.some(card => hand.filter(c => c.rank === card.rank).length === 4);
}

function hasStraightFlush(hand) {
  return hasStraight(hand) && hasFlush(hand);
}

function hasRoyalFlush(hand) {
  return hasStraightFlush(hand) && ranks.indexOf(hand[0].rank) === 8;
}

// Shuffle the deck
const shuffledDeck = shuffleDeck(deck);

// Deal 5 cards to the player
const playerHand = dealHand(shuffledDeck, 5);

// Determine the best poker hand
const pokerHand = determinePokerHand(playerHand);

// Output the result
console.log("Player's hand:", playerHand);
console.log("Best poker hand:", pokerHand);
