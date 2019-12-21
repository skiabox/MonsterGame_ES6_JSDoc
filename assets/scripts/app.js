/**
 * Global Default attack value of player
 * @type {number}
 */
const ATTACK_VALUE = 10;

/**
 * Global Default strong attack value of player
 * @type {number}
 */
const STRONG_ATTACK_VALUE = 17;

/**
 * Global Default attack value of monster
 * @type {number}
 */
const MONSTER_ATTACK_VALUE = 14;

/**
 * Global Default attack value of monster
 * @type {number}
 */
const HEAL_VALUE = 20;

/**
 * Ask user for maximum life
 * @type {string}
 */
const enteredValue = prompt('Maximum life for you and the monster.', '100');

/**
 * Global Default max life value
 * @type {number}
 */
let chosenMaxLife = parseInt(enteredValue);

// if user entered garbage (parseInt returns NaN) or a negative number
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

/**
 * Global Current monster health
 * @type {number}
 */
let currentMonsterHealth = chosenMaxLife;

/**
 * Global Current player health
 * @type {number}
 */
let currentPlayerHealth = chosenMaxLife;

/**
 * Global Current player health
 * @type {boolean}
 */
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

// reset function
const reset = () => {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
};

// end round function
const endRound = () => {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
};

// event handler functions
const attackHandler = () => {
  attackMonster('ATTACK');
};

const strongAttackHandler = () => {
  attackMonster('STRONG_ATTACK');
};

const healPlayerHandler = () => {
  let healValue;

  // ensure that we don't heal above the maximum level of 100
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
};

/**
 * Attack monster function (with different power)
 * @param {string} mode
 * @returns {void}
 */
const attackMonster = mode => {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  endRound();
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
