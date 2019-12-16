/**
 * Global Default attack value of player
 * @type {number}
 */
const ATTACK_VALUE = 10;

/**
 * Global Default attack value of monster
 * @type {number}
 */
const MONSTER_ATTACK_VALUE = 14;

/**
 * Global Default max life value
 * @type {number}
 */
const chosenMaxLife = 100;

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

adjustHealthBars(chosenMaxLife);

// handle events
const attackHandler = () => {
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentMonsterHealth <= 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0) {
    alert('You lost!');
  }
};

attackBtn.addEventListener('click', attackHandler);
