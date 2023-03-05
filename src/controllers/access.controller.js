'use strict';

class AccessController {
    signup = async (req, res, next) => {
        try {
            console.log(`[P]:::signUp:::`, req.body);
            /* 
            200: ok,
            201: created
            */

            return res.status(201).json({
                code: 201,
                metadata: { useId: 1 },
            });
        } catch (error) {
            console.error(error);
        }
    };
}

module.exports = new AccessController();
