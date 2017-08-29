### Telepítés
1. Töltsd le a következő git paranccsal a projektet, vagy az email-be mellékelt zip fájlt és csomagold ki:
```
$ git clone git://github.com/madaraszbalazs/mailchimp-subscribe.git
$ cd mailchimp-subscribe
$ npm install
```
2. Állítsd be a MailChimp API kulcsot a config fájlba:
(Kézzel kell beállítani, mert ha github-ra feltöltöm a kulcsot, azt észleli a Mailchimp és érvényteleníti a kulcsot.)
* Jelentkezz be: https://login.mailchimp.com/ (madbazsa/Mailchimp6!)
* Nyisd meg a Profile -> Extras -> API keys
* Másold az API key-t a lib/config/config.js fájl mailchimp_api_key értékéhez.

3. Teszt futtatása:
```
$ npm test
```

4. Futtatás:
```
$ npm start
```
* Nyisd meg a linket [Swagger](http://localhost:3000/api-docs/)
* A "Try it out" gombra kattintva tudod manuálisan tesztelni.
