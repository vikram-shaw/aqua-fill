const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token) {
            token = token.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET);
            req.user = user.id;
        } else {
            return res.status(401).json({message: 'Unauthorized user'});
        }
        next();
    } catch(error) {
        return res.status(401).json({message: 'Unauthorized user'});
    }
}

module.exports = auth;