let fs = require('fs');                       //variables                                  // fs nous sert ici à écrire notre fichier
let axios = require('axios');                                                   // axios sert à réaliser une requête http
let cheerio = require('cheerio');                                               // on charge cheerio
let jsonframe = require('jsonframe-cheerio');                                   // et jsonframe-cheerio

axios('https://restaurant.michelin.fr/restaurants-etoiles-france').then((response) => {                      // on demande ici à axios d'aller sur growthhacking.fr, si la réponse est bonne...
    fs.writeFileSync('restaurant.html', response.data);                                 // alors fs enregistre le code html dans le fichier restaurant.html
    if (response.status === 200) {                                              // si la réponse du serveur est 200 OK
        let $ = cheerio.load(response.data);                                    // on enregistre le contenu html dans une variable $
        jsonframe($);                                                           // cette dernière est placée dans une jsonframe
        var frame = {                                                           // on créé une autre variable frame qui nous permet de construire notre objet
           "post": {
              /* to do */
            }
            
        };


        var postsList = $('body ').scrape(frame);                                // on créé une varibale postsList qui reprend les posts scrapés dans le body
        fs.writeFile('restaurant.json', JSON.stringify(postsList), function (err) {     // fs.WriteFile nous permet d'enregistrer nos données stockées dans postsList
            if (err) {
                return console.log(err);                                        // y'a un blème ?
            } else {
                console.log("Le fichier est sauvegardé ! #OKLM");               // si tout roule, tu trouveras ce message dans le terminal
            }
        });
    };
});