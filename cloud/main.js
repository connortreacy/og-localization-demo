require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var supportedCurrencies = {
  'USD':  { symbol: '&#36;',    pre:true },
  'SGD':  { symbol: 'S&#36;',   pre:true },
  'RON':  { symbol: 'LEU',      pre:false },
  'EUR':  { symbol: '&#8364;',  pre:true },
  'TRY':  { symbol: '&#8378;',  pre:true },
  'SEK':  { symbol: 'kr',       pre:false },
  'ZAR':  { symbol: 'R',        pre:true },
  'BHD':  { symbol: 'BD',       pre:true },
  'HKD':  { symbol: 'HK&#36;',  pre:true },
  'CHF':  { symbol: 'Fr.',      pre:false },
  'NIO':  { symbol: 'C&#36;',   pre:true },
  'JPY':  { symbol: '&#165;',   pre:true },
  'ISK':  { symbol: 'kr;',      pre:false },
  'TWD':  { symbol: 'NT&#36;',  pre:true },
  'NZD':  { symbol: 'NZ&#36;',  pre:true },
  'CZK':  { symbol: 'K&#269;',  pre:true },
  'AUD':  { symbol: 'A&#36;',   pre:true },
  'THB':  { symbol: '&#3647;',  pre:true },
  'BOB':  { symbol: 'Bs',       pre:true },
  'BRL':  { symbol: 'B&#36;',   pre:true },
  'MXN':  { symbol: 'Mex&#36;', pre:true },
  'ILS':  { symbol: '&#8362;',  pre:true },
  'JOD':  { symbol: 'JD',       pre:false },
  'HNL':  { symbol: 'L',        pre:true },
  'MOP':  { symbol: 'MOP&#36;', pre:true },
  'COP':  { symbol: '&#36;',    pre:true },
  'UYU':  { symbol: '&#36;U',   pre:true },
  'CRC':  { symbol: '&#8353;',  pre:true },
  'DKK':  { symbol: 'kr',       pre:false },
  'QAR':  { symbol: 'QR',       pre:false },
  'PYG':  { symbol: '&#8370;',  pre:true },
  'EGP':  { symbol: 'E&#163;',  pre:true },
  'CAD':  { symbol: 'C&#36;',   pre:true },
  'LVL':  { symbol: 'Ls',       pre:true },
  'INR':  { symbol: '&#8377;',  pre:true },
  'LTL':  { symbol: 'Lt;',      pre:false },
  'KRW':  { symbol: '&#8361;',  pre:true },
  'GTQ':  { symbol: 'Q',        pre:true },
  'AED':  { symbol: 'AED',      pre:false },
  'VEF':  { symbol: 'Bs.F.',    pre:true },
  'SAR':  { symbol: 'SR',       pre:false },
  'NOK':  { symbol: 'kr',       pre:false },
  'UAH':  { symbol: '&#8372;',  pre:true },
  'DOP':  { symbol: 'RD&#36;',  pre:true },
  'CNY':  { symbol: '&#165;',   pre:true },
  'BGN':  { symbol: 'lev',      pre:false },
  'ARS':  { symbol: '&#36;',    pre:true },
  'PLN':  { symbol: 'z&#322;',  pre:false },
  'GBP':  { symbol: '&#163;',   pre:true },
  'PEN':  { symbol: 'S/.',      pre:false },
  'PHP':  { symbol: 'PhP',      pre:false },
  'VND':  { symbol: '&#8363;',  pre:false },
  'RUB':  { symbol: 'py&#1073;', pre:false },
  'RSD':  { symbol: 'RSD',      pre:false },
  'HUF':  { symbol: 'Ft',       pre:false },
  'MYR':  { symbol: 'RM',       pre:true },
  'CLP':  { symbol: '&#36;',    pre:true },
  'HRK':  { symbol: 'kn',       pre:false },
  'IDR':  { symbol: 'Rp',       pre:true },
}

var Product = Parse.Object.extend('Product');
var ProductPrice = Parse.Object.extend('ProductPrice');

Parse.Cloud.beforeSave(ProductPrice, function(request, response) {
  if (
    !request.object.get('currency') || 
    !supportedCurrencies[request.object.get('currency')] 
    ) {
    response.error('Currency must match one of the supported currencies.');
  } else {
    response.success();
  }
});