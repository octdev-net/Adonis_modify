'use strict'
const Database = use('Database')

class CountryController {
    async setCountry ({ request, response, session}) {
        const { country} = request.all()
        const user = session.get('user');

        if (user) {
            const affectedRows = await Database
                .table('users')
                .where('username', user.username)
                .update('country_preference', country);
    
            if (affectedRows > 0) {
                response.send({code: 1, msg: "Saved Successfully if stored in db"});
            } else {
                response.send({code: 0, msg: "Error please try again later"});    
            }
        } else {
            response.send({code: 0, msg: "Error Login Required"});
        }
    }
}

module.exports = CountryController
