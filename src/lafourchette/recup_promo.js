var fs = require('fs');//variables // fs nous sert ici à écrire notre fichier
var request = require('request');
var cheerio = require('cheerio');												// on charge cheerio                                           			    
let axios = require('axios');                                                   // axios sert à réaliser une requête http                                            
let jsonframe = require('jsonframe-cheerio');                                   // et jsonframe-cheerio

//read the href in our text file to get all the deals in web mode
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('laFourchette-restau.txt')
});


lineReader.on('line', function (line) {
	var page = 'https://www.lafourchette.com'.concat(line);
	get_write_deal(page);
  
});
//get the deals from a given page of a lafourchette restaurant
function get_write_deal(href){

const settings = {
	'uri': href,
	'headers':{
	}
	
}

	request(settings, function (error, response, html) {
	console.log(response.statusCode);
	  if (!error && response.statusCode == 200) {
	  
			var $ = cheerio.load(html);
			
			promoSpecial = $('.saleType-title'); //promo actuelle
			
			if (promoSpecial.length == 0){
			    console.log("");
			}
			else{
				
			    for (cnt= 0; cnt< promoSpecial.length; cnt++){
			    
			    	
			    	var address = $('.restaurantSummary-address').first().text();

			    	name = $('.restaurantSummary-name').text();
			    	promotion = promoSpecial.eq(cnt).text();

					
			    	var affiche = '\n{"nom" : "'+name+
			    	'", "promotion" : "'+promo.replace('"', '')+
			    	'", "href" : "'+href+
			    	'", "address" : "'+addr+'"},';
					
					fs.appendFile('lafourchette_Promo.json', affiche);
			    
				}
			}
	   		
					
		}
		
	});
	
	
}
