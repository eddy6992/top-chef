var fs = require('fs');    //variables                                  // fs nous sert ici à écrire notre fichier
var request = require('request');
var cheerio = require('cheerio');
let axios = require('axios');                                                    // axios sert à réaliser une requête http
                                                                                 // on charge cheerio
let jsonframe = require('jsonframe-cheerio');                                   // et jsonframe-cheerio
const restaurant= require('../doc_restaurant/restaurant.json');
//const  config = {...};
//const lafourchette = require('lafourchette');

function getHref(search_page, zipCode){
    
    request(search_page, function (error, response, html) {
    console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                
                var $ = cheerio.load(html);
                jsonframe($);

                var allResults = $('.resultContainer .list-unstyled .resultItem');
                    
                for (cnt = 0; cnt < allResults.length; cnt++){
                
                    currAddr = allResults.eq(cnt).find('.resultItem-address').text();
    

                
                    var toSearch = currAddr.search(zipCode); 
    

                        if (toSearch == -1){
                            continue;
                        }
                        else{
                        
                            var href = $('.resultItem-name a').attr('href');
                            fs.appendFile('laFourchette-restau.txt', href + '\n');
                        
                        }                       
                }
            }
    });
}
