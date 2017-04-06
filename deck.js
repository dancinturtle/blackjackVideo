var player;
var dealer;
var deck;

$('#start').click(function(){
  console.log("Start button was clicked!")
  deck = new Deck();
  deck.formdeck();
  deck.shuffle();
  player = new Player("Kermit", deck);
  dealer = new Player("Dealer", deck);
  player.takecard().takecard();
  dealer.takecard().takecard();
  console.log(player.hand[0].name);
  for(var i=0; i<=1; i++){

    $('.playercards').append("<img src='cards-png/" + player.hand[i].name + ".png' />")
  }
  $('.dealercards').append("<img id='upsidedown' src='cards-png/b1fv.png' />")
  $('.dealercards').append("<img src='cards-png/" + dealer.hand[1].name + ".png' />")

})

$('#hit').click(function(){
  console.log("hit button pressed!")
  player.takecard();
  $('.playercards').append("<img src='cards-png/" + player.hand[player.hand.length-1].name + ".png' />")
  if(totalUpCards(player) > 21){
    $(this).attr("disabled", "disabled");
    console.log("BUSTED!!!!")
    $('#stand').attr("disabled", "disabled");
    $('#messages').html("<h3> " + totalUpCards(player) + " Busted! You Lost!</h3>")
  }
})

$('#stand').click(function(){
  console.log("Stand button pressed!")
  $(this).attr("disabled", "disabled");
  $('#hit').attr("disabled", "disabled");
  $('#messages').html("<h3>Standing at " + totalUpCards(player) + "</h3>");
  while(totalUpCards(dealer)<17){
    console.log("dealer's hand", totalUpCards(dealer))
    dealer.takecard();
    $('.dealercards').append("<img src='cards-png/" + dealer.hand[dealer.hand.length-1].name + ".png' />")
  }
  $('#upsidedown').attr('src', "cards-png/" + dealer.hand[0].name + ".png");
  $('#dealermessages').html("<h3>Dealer got " + totalUpCards(dealer) + "</h3>")
  determineWin();
})

function determineWin(){
  if(totalUpCards(dealer)<=21 && totalUpCards(player)<totalUpCards(dealer)){
    console.log("Dealer wins!");
  }
  // deal with a draw
  // if the player was dealt 21
}


function totalUpCards(person){
  var sum = 0;
  var aces = 0;
  for(var i=0; i<person.hand.length; i++){
    sum += person.hand[i].value;
    if(person.hand[i].value == 11){
      aces++;
    }
  }
  while(sum>21 && aces>0){
    sum -= 10;
    aces--;
  }
  return sum;

}



function Deck(){
    if (!(this instanceof Deck)){
    return new Deck();
    }
    this.cards = [];
};
Deck.prototype.formdeck = function(){
    var suits = ["s","d","c","h"];
    var numericalVal = [11,2,3,4,5,6,7,8,9,10,10,10,10];
    var values = ["1","2","3","4","5","6","7","8","9","10","j","q","k"];
    for (var i in suits){
        for (var j in values){
          this.cards.push(new Card(suits[i], numericalVal[j], suits[i]+values[j]));
        }
    }
}

function Card(suit, value, name){
  this.suit = suit;
  this.value = value;
  this.name = name;
}

Deck.prototype.shuffle = function(){
    for (var i = 1; i < 100; i++) {
        var index = Math.floor(Math.random()*51+1);
        var index2 =  Math.floor(Math.random()*51+1);
        var temp = this.cards[index];
        this.cards[index] = this.cards[index2]
        this.cards[index2] = temp;
    }
}

Deck.prototype.deal = function(){
    if(this.cards.length > 0){
      var random =  Math.floor(Math.random()*(this.cards.length));
      console.log("random", random)
      var temp = this.cards[random];
      this.cards[random] = this.cards[this.cards.length-1]
      this.cards[this.cards.length-1] = temp;
      return this.cards.pop();
    }
    return null;

}

Deck.prototype.reset = function(){
    this.cards = [];
    this.formdeck();
}

function Player(name, deck){
    if (!(this instanceof Player)){
    return new Player();
    }
    this.deck = deck
    this.name = name;
    this.hand = [];
}

Player.prototype.takecard = function(){
    this.hand.push(this.deck.deal());
    return this;
}

Player.prototype.discard = function(){
    return this.hand.pop();
}
