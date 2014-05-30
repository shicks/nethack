/**
 * @fileoverview Nethack Price Identification data/widget.
 * @author stephenhicks@gmail.com (Stephen Hicks)
 */

// Make soy work
var soy = soy || {}
soy.$$escapeHtml = function(x) { return x; };
document.write('<script src="price.soy.js"></script>');

/**
 * @typedef {{
 *     price: number,
 *     danger: boolean,  // dangerous to use
 *     ident: (boolean|string),  // whether it self-identifies
 *     // maybe include messages, effects (cursed, confused, etc)?
 * }}
 */
var ItemData;

var data = [[
  'Scrolls', '?', {
    'identify': {price: 20, ident: true},
    'light': {price: 50, ident: true},
    'enchant weapon': {price: 60},
    'enchant armor': {price: 80},
    'remove curse': {price: 80},
    'confuse monster': {price: 100},
    'destroy armor': {price: 100, danger: true},
    'fire': {price: 100, danger: true},
    'food detection': {price: 100, ident: true},
    'gold detection': {price: 100, ident: true},
    'magic mapping': {price: 100, ident: true},
    'scare monster': {price: 100, ident: true}, // 'maniacal laughter'
    'teleportation': {price: 100, ident: true},
    'amnesia': {price: 200, danger: true},
    'create monster': {price: 200, danger: true},
    'earth': {price: 200, danger: true},
    'taming': {price: 200},
    'charging': {price: 300, ident: true},
    'genocide': {price: 300, ident: true},
    'punishment': {price: 300, danger: true},
    'strinking cloud': {price: 300, danger: true}
  }], [
  'Rings', '=', {
    'adornment': {price: 100},
    'hunger': {price: 100, danger: true},
    'protection': {price: 100},
    'protection from shape changers': {price: 100},
    'stealth': {price: 100},
    'sustain ability': {price: 100},
    'warning': {price: 100},
    'aggravate monster': {price: 150, danger: true},
    'cold resistance': {price: 150},
    'gain constitution': {price: 150},
    'gain strength': {price: 150},
    'increase accuracy': {price: 150},
    'increase damage': {price: 150},
    'invisibility': {price: 150},
    'poison resistance': {price: 150},
    'see invisible': {price: 150},
    'shock resistance': {price: 150},
    'fire resistance': {price: 200},
    'free action': {price: 200},
    'levitation': {price: 200},
    'regeneration': {price: 200},
    'searching': {price: 200},
    'slow digestion': {price: 200},
    'teleportation': {price: 200, danger: true},
    'conflict': {price: 300, danger: true},
    'polymorph': {price: 300, danger: true},
    'polymorph control': {price: 300},
    'teleport control': {price: 300}
  }], [
  'Wands', '/', {
    'light': {price: 100},
    'nothing': {price: 100},
    'digging': {price: 150},
    'enlightenment': {price: 150},
    'locking': {price: 150},
    'magic missile': {price: 150},
    'make invisible': {price: 150},
    'opening': {price: 150},
    'probing': {price: 150},
    'secret door detection': {price: 150},
    'slow monster': {price: 150},
    'speed monster': {price: 150},
    'striking': {price: 150},
    'undead turning': {price: 150},
    'cold': {price: 175},
    'fire': {price: 175},
    'lightning': {price: 175},
    'sleep': {price: 175},
    'cancellation': {price: 200},
    'create monster': {price: 200},
    'polymorph': {price: 200},
    'teleportation': {price: 200},
    'death': {price: 500},
    'wishing': {price: 500}
  }], [
  'Potions', '!', {
    'booze': {price: 50, danger: true},
    'fruit juice': {price: 50},
    'see invisible': {price: 50},
    'sickness': {price: 50, danger: true},
    'confusion': {price: 100, danger: true},
    'extra healing': {price: 100},
    'hallucination': {price: 100, danger: true},
    'healing': {price: 100},
    'restore ability': {price: 100},
    'sleeping': {price: 100},
    'water': {price: 100},
    'blindness': {price: 150, danger: true},
    'gain energy': {price: 150},
    'invisibility': {price: 150},
    'monster detection': {price: 150},
    'object detection': {price: 150},
    'enlightenment': {price: 200},
    'full healing': {price: 200},
    'levitation': {price: 200},
    'polymorph': {price: 200, danger: true},
    'speed': {price: 200},
    'acid': {price: 250, danger: true},
    'oil': {price: 250, danger: true},
    'gain ability': {price: 300},
    'gain level': {price: 300},
    'paralysis': {price: 300, danger: true}
  }], [
  'Boots', '[', {
    'elven': {price: 8},
    'kicking': {price: 8},
    'fumble': {price: 30, danger: true},
    'levitation': {price: 30, danger: true},
    'jumping': {price: 50},
    'speed': {price: 50},
    'water walking': {price: 50}
  }], [
  'Cloaks', '[', {
    'mummy wrapping': {price: 2},
    'orcish': {price: 40},
    'leather': {price: 40},
    'displacement': {price: 50},
    'dwarvish': {price: 50},
    'oilskin': {price: 50},
    'alchemy smock': {price: 50},
    'protection': {price: 50},
    'robe': {price: 50},
    'elven': {price: 60},
    'invisibility': {price: 60},
    'magic resistance': {price: 60}
  }], [
  'Spellbooks', '+', {
    'level 1': {price: 100},
    'level 2': {price: 200},
    'level 3': {price: 300},
    'level 4': {price: 400},
    'level 5': {price: 500},
    'level 6': {price: 600},
  }]];

// NOTE: for armor, +1 enchantment = +10 base price, but maybe only worth
// considering for 50/60 cloaks?

/**
 * @param {number} cha Buy price adjustment for CHA
 * @param {boolean} sucker
 * @param {string} mode 'buy', 'sell', or 'base'
 * @return {string} HTML for the table
 */
function buildTable(cha, sucker, mode) {
  var sections = [];
  for (var i = 0; i < data.length; i++) {
    var title = data[i][0];
    var items = data[i][2];
    var byBase = [];
    var byPrice = [];
    for (var item in items) {
      if (!items.hasOwnProperty(item)) return;
      items[item].name = item;
      //window.console.log('item: ' + item + ', price: ' + items[item].price);
      (byBase[items[item].price] = byBase[items[item].price] || []).push(items[item]);
    }
    for (var base in byBase) {
      var prices = [];
      if (mode == 'buy') {
        var price = Math.round(base * cha / 3);
        if (sucker) price = Math.round(price * 4 / 3);
        prices.push(price);
        prices.push(Math.round(price * 4 / 3));
      } else if (mode == 'sell') {
        price = Math.round(base / (sucker ? 3 : 2));
        prices.push(price);
        prices.push(Math.round(price * 0.75));
      } else {
        prices.push(base);
      }
      //window.console.log('base: ' + base + ', prices: [' + prices.join(', ') + ']');
      for (price in prices) {
        price = prices[price];
        if (!byPrice[price]) byPrice[price] = {price: price, base: []};
        //window.console.log('base: ' + base + ', byBase[base]: ' + byBase[base]);
        byPrice[price].base.push({price: base, items: byBase[base]});
      }
    }
    prices = [];
    for (price in byPrice) {
      prices.push(byPrice[price]);
    }
    sections.push(nethack.price.type({name: title, prices: prices}));
  }
  return sections.join('');
}

window.onload = function() {
  var app = document.createElement('div');
  document.body.appendChild(app);
  app.innerHTML = nethack.price.main({});

  var table = document.getElementById('table');
  var cha = document.getElementById('charisma');
  var mode = document.getElementById('price');
  var sucker = document.getElementById('sucker');
  cha.addEventListener('change', reload);
  mode.addEventListener('change', reload);
  sucker.addEventListener('change', reload);

  function reload() {
    table.innerHTML = buildTable(
        +cha.value, !!+sucker.value, mode.value);
  };
  reload();
};
