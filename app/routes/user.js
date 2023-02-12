module.exports=function(express,pool, jwt, secret){

    const apiRouter = express.Router();

    apiRouter.get('/', function(req, res) {
        res.json({ message: 'Dobro dosli na nas API!' });
    });

    apiRouter.use(function(req, res, next){
        const token = req.headers['authorization'];

        if (token){
            jwt.verify(token, secret, function (err, decoded) {

                if (err){
                    return res.status(403).send({message:'Wrong token'});
                }
                else {
                    req.decoded=decoded;
                    next();
                }
            });
        }
        else {
            return res.status(404).send({message:'No token'});
        }
    });

    apiRouter.get( '/me',function (req, res){
        res.status(200).send({ user : req.decoded });
    });

    return apiRouter;
};

