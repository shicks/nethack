// This file was automatically generated from price.soy.
// Please don't edit this file by hand.

if (typeof nethack == 'undefined') { var nethack = {}; }
if (typeof nethack.price == 'undefined') { nethack.price = {}; }


nethack.price.main = function(opt_data, opt_ignored) {
  return '<div class="options"><select id="charisma"><option value="6">CHA &lt; 6</option><option value="4.5">CHA = 6, 7</option><option value="4">CHA = 8..10</option><option value="3" selected>CHA = 11..15</option><option value="2.25">CHA = 16, 17</option><option value="2">CHA = 18</option><option value="1.5">CHA > 18</option></select><select id="price"><option selected>base</option><option>buy</option><option>sell</option></select><span title="TOU XL<15 or visible shirt or dunce cap"><select id="sucker"><option value="0">not sucker</option><option value="1">sucker</option></select></span></div><div id="table"></div>';
};


nethack.price.type = function(opt_data, opt_ignored) {
  var output = '<div class="type"><div class="type-name">' + soy.$$escapeHtml(opt_data.name) + '</div>';
  var priceList8 = opt_data.prices;
  var priceListLen8 = priceList8.length;
  for (var priceIndex8 = 0; priceIndex8 < priceListLen8; priceIndex8++) {
    var priceData8 = priceList8[priceIndex8];
    output += '<div class="pricegroup"><span class="price">' + soy.$$escapeHtml(priceData8.price) + '</span><span class="bases">';
    var baseList12 = priceData8.base;
    var baseListLen12 = baseList12.length;
    for (var baseIndex12 = 0; baseIndex12 < baseListLen12; baseIndex12++) {
      var baseData12 = baseList12[baseIndex12];
      output += '<span>' + soy.$$escapeHtml(baseData12.price) + '</span>';
    }
    output += '</span><span class="items">';
    var baseList18 = priceData8.base;
    var baseListLen18 = baseList18.length;
    for (var baseIndex18 = 0; baseIndex18 < baseListLen18; baseIndex18++) {
      var baseData18 = baseList18[baseIndex18];
      var itemList19 = baseData18.items;
      var itemListLen19 = itemList19.length;
      for (var itemIndex19 = 0; itemIndex19 < itemListLen19; itemIndex19++) {
        var itemData19 = itemList19[itemIndex19];
        output += '<span ' + ((itemData19.danger) ? 'class="danger"' : '') + '>' + soy.$$escapeHtml(itemData19.name) + '</span>';
      }
    }
    output += '</span></div>';
  }
  output += '</div>';
  return output;
};
