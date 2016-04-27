$(document).ready(function() {
  bigBuck.init();
});

var bigBuck = {

  init: function(){
    bigBuck.initStyling();
    bigBuck.initEvents();
    bigBuck.initGame();
  },

  initStyling: function(){
    // ANY PAGE-LOAD STYLING WILL GO HERE
  },

  initEvents: function(){
    $('#startButt').on('click', function () {
      $('#home').hide();
      $('#options').show();
    });
    $('#option-box').on('click', '.hunterImg', function () {
      bigBuck.hunter = new Hunter(bigBuck.hunters[$(this).data('id')]);
      bigBuck.addHtmlToDOM('Weapon', bigBuck.weapons, bigBuck.templates.weapon, $('#option-box'));
    });
    $('#option-box').on('click', '.weaponImg', function () {
      bigBuck.hunter.equip(new Gun(bigBuck.weapons[$(this).data('id')]));
      bigBuck.shotsLeft = bigBuck.hunter.gun.shots;
      bigBuck.updateShotsLeft();
      bigBuck.addHtmlToDOM('Map', bigBuck.maps, bigBuck.templates.map, $('#option-box'));
    });
    $('#option-box').on('click', '.map-box', function() {
      $('.background-image').css({'background-image': 'url(' + $(this).data('id') + ')'});
      $('#options').hide();
      $('#gameplay').show();
      bigBuck.timer = bigBuck.setTimer(bigBuck.interval);
      bigBuck.startGame = true;
    });
    $('#beer').on('click', function() {
      $('#beerUp').show();
      $('#beer').hide();
      bigBuck.hunter.drinkBeer();
      setTimeout(function() {
        $('#beer').show();
        $('#beerUp').hide();
      }, 1000);
      $('.background-image').css({'filter': 'blur(' + bigBuck.hunter.beers + 'px)'});
      $('.background-image').css({'-webkit-filter': 'blur(' + bigBuck.hunter.beers + 'px)'});
      $('.critter-pane').css({'filter': 'blur(' + bigBuck.hunter.beers + 'px)'});
      $('.critter-pane').css({'-webkit-filter': 'blur(' + bigBuck.hunter.beers + 'px)'});
      clearInterval(bigBuck.timer);
      bigBuck.interval -= 500;
      bigBuck.timer = bigBuck.setTimer(bigBuck.interval);
    });
    $('.critter-pane').on('click', '.critter-box', function() {
      bigBuck.hunter.shoot(bigBuck.critterArr[$(this).data('id')]);
      console.log("shot critter " + bigBuck.critterArr[$(this).data('id')]);
      console.log(bigBuck.critterArr[$(this).data('id')]);
      bigBuck.updateScore();
      if (bigBuck.critterArr[$(this).data('id')].hp < 1) {
        $(this).hide();
        $('#gameplay').find('h1').show();
        setTimeout(function() {
          $('#gameplay').find('h1').hide();
        }, 1000);
        bigBuck.updateScore();
      }
      bigBuck.shotsLeft--;
      bigBuck.updateShotsLeft();
      bigBuck.checkForGameOver();
    });
    $('#playAgain').on('click', function() {
      $('#gameover').hide();
      $('#home').show();
      bigBuck.initGame();
    });
  },

  initGame: function() {
    bigBuck.hunter = undefined;
    bigBuck.critterArr = [];
    bigBuck.critterCount = 0;
    bigBuck.interval = 5000;
    bigBuck.score = 0;
    bigBuck.shotsLeft = -1;
    bigBuck.startGame = false;
    $('.background-image').css({'background-image': 'url("https://images.unsplash.com/photo-1426170042593-200f250dfdaf?crop=entropy&dpr=2&fit=crop&fm=jpg&h=700&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1275")'});
    $('.background-image').css({'filter': 'blur(0px)'});
    $('.background-image').css({'-webkit-filter': 'blur(0px)'});
    $('.critter-pane').css({'filter': 'blur(0px)'});
    $('.critter-pane').css({'-webkit-filter': 'blur(0px)'});
    $('.critter-pane').html('');
    bigBuck.addHtmlToDOM('Hunter', bigBuck.hunters, bigBuck.templates.hunter, $('#option-box'));
    bigBuck.updateScore();
  },

  checkForGameOver: function() {
    if(bigBuck.shotsLeft === 0) {
      $('#gameplay').hide();
      $('#gameover').show();
    }
  },

  addHtmlToDOM: function(header, arr, template, $target) {
    var htmlStr = '';
    _.each(arr, function(obj) {
      htmlStr += bigBuck.buildHtmlFromTempl(obj, template);
    });
    $target.html(htmlStr);
    bigBuck.setOptsHeader(header);
  },

  buildHtmlFromTempl: function(obj, template) {
    var htmlStr = _.template(template);
    return htmlStr(obj);
  },

  setOptsHeader: function(header) {
    $('#options').find('h1').html("Choose Your " + header);
  },

  setTimer: function(interval) {
    return window.setInterval(function() {bigBuck.gamePlay();}, interval);
  },

  updateScore: function() {
    $('.score').html(bigBuck.score);
  },

  updateShotsLeft: function() {
    $('#shotsLeft').html(bigBuck.shotsLeft);
  },

  gamePlay: function() {
    var random = Math.floor(Math.random() * 100 + 1);
    var top = Math.floor(Math.random() * (90 - 50) + 50);
    var left = Math.floor(Math.random() * (60 + 10) + 0);
    console.log(random);
    if(82 < random) {
      var newCritter;
      if (90 < random) {
        console.log("A SQUIRREL APPEARS");
        newCritter = new Critter(bigBuck.critters.squirrel);
      } else if (85 < random && random < 91){
        console.log("THERE'S A RACCOOn!");
        newCritter = new Critter(bigBuck.critters.raccoon);
      } else {
        console.log("THERE'S A BUCK!");
        newCritter = new Critter(bigBuck.critters.buck);
      }
      newCritter.id = bigBuck.critterCount;
      newCritter.top = top;
      newCritter.left = left;
      console.log(newCritter);
      bigBuck.critterArr.push(newCritter);
      bigBuck.addCritterToDOM(newCritter);
      console.log('CRITTERS: ' + bigBuck.critterArr);
      if(random % 2 === 0) {
        $( '.critter-box' )
          .animate({
            left: '+=100%',
          },
          random * 50,

          function() {
            $( '.critter-box' ).hide();
          });
        }
        else {
          setTimeout(function() {$( '.critter-box' ).hide();}, random * 100);
        }
      bigBuck.critterCount++;
    }
  },


  addCritterToDOM: function(critter) {
    var critterHtml = bigBuck.buildHtmlFromTempl(critter, bigBuck.templates.critter);
    $('.critter-pane').append(critterHtml);
  },
};
