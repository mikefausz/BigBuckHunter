function Hunter(profile) {
  this.name = profile.name;
  this.accuracy = profile.accuracy;
  this.tolerance = profile.tolerance;
  this.beers = 0;
  this.effectiveness = 0;
  this.drunkeness = 0;
  this.shoot = function(critter) {
    // console.log("acc: " + this.accuracy);
    // console.log("effect: " + this.effectiveness);
    // console.log("beers: " + this.beers);
    // console.log("tol: " + this.tolerance);
    // console.log("drunk: " + this.drunkeness);
    // console.log("effect - drunk = " + (this.effectiveness - this.drunkeness));
    var godsGrace = Math.floor(Math.random() * 10 + 1);
    // console.log("gods grace: " + godsGrace);
    var shotPower = this.effectiveness - this.drunkeness + godsGrace;
    critter.damage(this, shotPower);
  };
  this.equip = function (weapon) {
    this.gun = weapon;
    this.effectiveness = this.accuracy + weapon.accuracy + weapon.power;
  };
  this.drinkBeer = function () {
    this.beers++;
    this.drunkeness = (this.beers / this.tolerance);
  };
}
function Gun(profile) {
  this.name = profile.name;
  this.accuracy = profile.accuracy;
  this.power = profile.power;
  this.shots = profile.shots;
}
function Critter(profile) {
  this.id = profile.id;
  this.name = profile.name;
  this.image = profile.image;
  this.speed = profile.speed;
  this.size = profile.size;
  this.hp = profile.hp;
  this.points = profile.points;
}

Critter.prototype.damage= function(hunter, shotPower) {
  console.log("SHOT POWER " + shotPower);
  console.log("CRITTER HEALTH: " + this.hp);
  this.hp -= shotPower;
  console.log("CRITTER HEALTH: " + this.hp);
  bigBuck.score += 5;
  if (this.hp < 1) {
    bigBuck.score += this.points;
    console.log("YOU BAGGED A " + this.name + "!");
  }
};

// HUNTER PROFILES
bigBuck.hunters = {
  Nick: {
    name: 'Nick',
    image: 'http://www.placecage.com/c/500/500',
    accuracy: 5.0,
    tolerance: 4.0,
  },
  Bill: {
    name: 'Bill',
    image: 'http://fillmurray.com/500/500',
    accuracy: 8.0,
    tolerance: 1.0,
  },
  Steven: {
    name: 'Steven',
    image: 'http://stevensegallery.com/300/300',
    accuracy: 4.0,
    tolerance: 9.0,
  },
};

// GUN PROFILES
bigBuck.weapons = {
  Shotgun: {
    name: "Shotgun",
    image: 'http://cdn.cz-usa.com/hammer/wp-content/uploads/2014/06/cz-2011-limited-edition-o-u-shotgun-480x320.png',
    accuracy: 4,
    power: 8,
    shots: 6,
  },
  Bow: {
    name: "Bow",
    image: 'http://switchedontacticals.com/wp-content/uploads/2013/09/Martin13-Threshold-Pkg-1024x1024.png',
    accuracy: 8,
    power: 3,
    shots: 8,
  },
  Rifle: {
    name: "Rifle",
    image: 'https://www.wpclipart.com/recreation/sports/hunting/Modern_Hunting_Rifle_T.png',
    accuracy: 5,
    power: 5,
    shots: 12,
  },
};

// MAP PROFILES
bigBuck.maps = {
  Forest: {
    name: "Forest",
    image: "https://images.unsplash.com/photo-1426170042593-200f250dfdaf?crop=entropy&dpr=2&fit=crop&fm=jpg&h=700&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1275",
    trophy: "Buck"
  },
  Marsh: {
    name: "Marsh",
    image: "https://images.unsplash.com/photo-1452924872281-04696e001ea3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=2a64dc4e851a2ba28aa02e791821ac8b",
    trophy: "Duck"
  },
  Snowfall: {
    name: "Snowfall",
    image: "https://images.unsplash.com/photo-1452374808405-b299befc8639?crop=entropy&dpr=2&fit=crop&fm=jpg&h=700&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1275",
    trophy: "Snow Leopard"
  },
};

// CRITTER PROFILES
bigBuck.critters = {
  buck: {
    name: "Buck",
    image: 'http://pngimg.com/upload/small/deer_PNG10179.png',
    speed: 5,
    size: 450,
    hp: 90,
    points: 250,
  },
  raccoon: {
    name: "Raccoon",
    image: 'http://www.wildlifeandpest.com/wp-content/uploads/2014/05/atlanta-raccoon-control-300x163.png',
    speed: 3,
    size: 125,
    hp: 35,
    points: 100,
  },
  squirrel: {
    name: "Squirrel",
    image: 'http://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Animals-PNG/Transparent_Brown%20Squirrel.png?m=1409676900',
    speed: 6,
    size: 75,
    hp: 15,
    points: 50,
  },
};
