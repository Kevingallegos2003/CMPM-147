const fillers = {
  adventurer: ["My dude", "Bro", "WesBot", "unCool person", "Tarnished", "勇者", "$adventurer and $adventurer", "$adventurer, $adventurer, and $adventurer", "Geoff", "Oi mate", "G'day", "Brochacho", "Couch potato", "awg" ],
  pre: ["Fra", "Tro", "Gre", "Pan", "Ast", "Ara", "Lan", "Distant", "Feral", "Un", "For"],
  post: ["gria", "ston", "gott","-on-the-lee", "ora", "Ara", "uwu"],
  people: ["kindly", "meek", "brave", "wise", "sacred", "cherished", "honored", "forgotten", "apathetic", "mystic", "orca", "帥氣"],
  item: ["axe", "staff", "book", "cloak", "shield", "club", "sword", "magic gloves", "galvel", "fists", "mace", "potato"],
  num: ["two", "three", "eleven", "so many", "too many", "an unsatisfying number of", "barely any", "an unspecified amount of", "surely a satisfactory number of"],
  looty: ["gleaming", "valuable", "esteemed", "rare", "exalted", "scintillating", "kinda gross but still usefull", "complete garbage"],
  loots: ["alllowance", "chors", "Dishes", "Unclipped grass", "check engine lights", "Modly tub","laundry", "bananas", "noodles", "goblins", "CS Majors", "college credits"],
  baddies: ["Loansharks", "Lawyers", "fishmen", "Compsci majors", "internet trolls", "college professors", "dragon deez nuts", "evil $adventurer", "agents of chaos"],
  message: ["call", "txt", "post", "decree", "shoutz", "tweets", "choiche", "hearkens", "harkening", "harkenening", "harkenenening", "...wait, no! Come back", "Watermelon"],
  complete: ["You did it!", "Congradulations!", "well done $adventurer", "Nicely done!", "Bravo!"],
  lazy: ["You lazy bum! You did not complete the task!", "Nice try, actually do your task nerd!", "Nice surf history $adventurer maybe you should do your task or I will show it to the world!", "Not funny didn't, laugh, do your task!"]
};

const template = `$adventurer, heed my $message!

I have just come from $pre$post where the $people folk are in desperate need. Their town has been overrun by $baddies. You must venture forth at once, taking my $item, and help them.

It is told that the one who can rescue them will be awarded with $num $looty $loots. Surely this must tempt one such as yourself!
`;
const completedTask = `$adventurer, $complete you have successfully conquered the $baddies and saved the $people, onward yo your next task!`;
const lazy = `$lazy`;

// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;
var currency = 0;
var completed = 0;
var task  = false;
function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  task = true;
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box, counter */
  box.innerText = story;
  counter.innerText = `Tasks completed: ${completed} ------------------------------ Productivity Coins: ${currency}`
}
function completeTask(){
  if(task){
    task = false;
    if(Math.floor(Math.random()*4) < 2){
      let story = completedTask;
      while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
      }
      box.innerText = story;
      completed++;
      currency += Math.floor(Math.random()*20+1);
      counter.innerText = `Tasks completed: ${completed} ------------------------------ Productivity Coins: ${currency}`;
    }
    else{
      let story = lazy;
      while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
      }
      box.innerText = story;
    }
  }
}

/* global clicker, complete */
clicker.onclick = generate;
complete.onclick = completeTask;


generate();
