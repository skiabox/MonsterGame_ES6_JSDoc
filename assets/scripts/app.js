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

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

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

/**
 * @type {any[]}
 */
const battleLog = [];

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

// write to log function
const writeToLog = (ev, val, monsterHealth, playerHealth) => {
  let logEntry;

  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: ev,
        value: val,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    default:
      logEntry = {};
  }

  // if (ev === LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'MONSTER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'MONSTER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'PLAYER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     target: 'PLAYER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (ev === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // }

  battleLog.push(logEntry);
};

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
  // log the action
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    // log the action
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
    // log the action
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
    // log the action
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
};

// event handler functions
const attackHandler = () => {
  attackMonster(MODE_ATTACK);
};

const strongAttackHandler = () => {
  attackMonster(MODE_STRONG_ATTACK);
};

/**
 * Heal player function
 * @returns {void}
 */
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

  // log the action
  // log the action
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
};

/**
 * Attack monster function (with different power)
 * @param {string} mode
 * @returns {void}
 */
const attackMonster = mode => {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  // log the action
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

  endRound();
};

/**
 * Log all moves
 * @returns {void}
 */
const printLogHandler = () => {
  console.log(battleLog);
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
