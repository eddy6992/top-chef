	var request = require('request');
	var cheerio = require('cheerio');
	var fs = require('fs');
	var maMap = new Map();
	maMap.set(NaN, "not a number");
	var ets=0;


	for (cnt = 1; cnt<35; cnt++){
		Firstpage = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin'.concat('/page-',cnt);
		request(Firstpage, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);

				restaurantsByPage = $('div[attr-gtm-type="poi"]');
				hrefByPage = $('a[class="poi-card-link"]');

				for (cpage = 0; cpage < restaurantsByPage.length; cpage++) { 
					var href = hrefByPage[cpage].attribs['href'];
					var Secondpage = 'https://restaurant.michelin.fr'.concat(href);
					request(Secondpage, function (error, response, html) {
						if (!error && response.statusCode == 200) {

							var sel = cheerio.load(html);
							var title = sel('.poi_intro-display-title').text();
							var addr_Zip = sel('.addressfield-container-inline .postal-code').first().text();
							var stars = sel('.michelin-poi-distinctions-list .content-wrapper').text().charAt(0);
							var str = '{' + title +
							 '"nom" : ' +  '"' +  '",' +
							  ' "zip" : "' + addr_Zip + '", ' 
							  + '"Stars" : ' + '"' + stars + '"},\n';
							var myJSON = JSON.stringify(str);

					fs.appendFile('michelin_all_restaurant.json', myJSON),function (err) {     // fs.WriteFile nous permet d'enregistrer nos données stockées dans postsList
						if (err) {
	                				return console.log(err);                                        // y'a un blème ?
	            					} else {
	                				console.log("Le fichier est sauvegardé ! #OKLM");               // si tout roule, tu trouveras ce message dans le terminal
	          						 }
	       					 }

				}
			});	
		ets += 1;
	}		
}	    
});
}