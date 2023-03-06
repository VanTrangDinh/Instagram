'use strict';
const AccessService = require('../services/access.service');
class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]:::signUp:::`, req.body);
            return res.status(201).json(await AccessService.signUp(req.body));
        } catch (error) {
            return next(error);
        }
    };

    logIn = async (req, res, next) => {
        try {
            console.log(`[p]:::logIn:::`, req.body)
            return res.status(201).json()
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new AccessController();

// 'use strict';

// const AccessService = require('../services/access.service');
// class AccessController {
//     signup = async (req, res, next) => {
//         try {
//             console.log(`[P]:::signUp:::`, req.body);
//             /*
//             200: ok,
//             201: created
//             */

//             return res.status(201).json(await AccessService.signUp(req.body));
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

// module.exports = new AccessController();
