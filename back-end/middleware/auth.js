const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'ID utilisateur invalide';
        }else{
            next();
        }
    }catch{
        res.status(401).json({ error: 'Requête invalide'});
        // res.status(401).json({ error: new Error('Invalid request!') });
    }
}