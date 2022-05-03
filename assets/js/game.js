/*Game Functions */

// function to generade a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    
    return value;
};

var fightOrSkip = function() {
  //ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
      window.alert("You need to provide a valid answer! Please try again.");
      return fightOrSkip();
    }
    
  promptFight = promptFight.toLocaleLowerCase();
  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
      //confirm player wants to skip
      var confirmSkip = window.confirm("are you sure you'd like to quit");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money form playerMoney for skipping
        playerInfo.money = playerInfo.money - 10;
        
        return true;
      }
  }
};

var fight = function(enemy) {
    // repeat and execute as long as the enemy-robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {      
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }
    // generate random damage value based on player's attack power
     var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );

    //check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");
        
    //award player money for winning
    playerInfo.money = playerInfo.money +20;

    //leave while () loop since enemy is dead
    break;
    } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }

    // remove player's health by subtracting the amount set in the enemy.attack virable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
        
    console.log(
    enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.name <= 0) {
      window.alert(playerInfo.name + " has died!");
      //leave while() loop if player is dead 
      break;
      } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
    } //end of while loop
}; //end of fight function

//function to start a new game
var startGame = function() {
    
//reset player stats
playerInfo.reset();

//run fight function to start game
for(var i = 0; i < enemyInfo.length; i++) {
  if (playerInfo.health > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert("Welcome to robot Gladiator! Round " + ( i + 1 ) );

    //pick new enemy to fight based on the index of the enemy.names array
    var pickedEnemyObj = enemyInfo[i];

    //reset enemy.health before starting a new fight
    pickedEnemyObj.health = randomNumber(40, 60);

    // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
    fight(pickedEnemyObj);     

    //if we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      // if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }
    }
  }
    else {
        window.alert("You Have lost your robot in battle! Game Over!");
        break;
    }
 }
  // after the loop ends, player is either out of health or enemies to fight, so rund endGame function
 endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
  window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } else {
    window.alert("You've lost your robot in battle.");
    }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // Restart the game
    startGame();
    } else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// go to shop between battles function
var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
      "would you like to REFILL your health, UPGRADE your attack, or Leave the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch function to carry out action
    switch (shopOptionPrompt) {
      case "REFILL": // new case
      case "refill":
        playerInfo.refillHealth();
        break;
      case "UPGRADE": // new case
      case "upgrade":
        playerInfo.upgradeAttack();
        break;
      case "LEAVE": // new case
      case "leave":
        window.alert("Leaving the store.");
        break;
        default:
          window.alert("You did not pick a valid option. Try again.");
        
        //call shop() again to force player to pick valid option
        shop();
        break;    
    }
};

var getPlayerName = function() {
  var name ="";

  while (name ==="" || name === null) {
      name = prompt("What is your robot's name?");
  }

  console.log("your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
    },
    refillHealth: function () {
      if (this.money >=7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
    }
      else {
        window.alert("You don't have enough money!");
      }
    },
    upgradeAttack: function() {
      if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -=7;
    }
      else {
        window.alert("You don't have enough money!");
      }
    }
};

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10,14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

// start first game when page loads
startGame();
