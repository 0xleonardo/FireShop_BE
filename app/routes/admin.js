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

                    if (req.decoded.email !== "admin") {
                        return res.status(403).send({message:'Not authorized'});
                    }

                    next();
                }
            });
        }
        else {
            return res.status(404).send({message:'No token'});
        }
    });

    apiRouter.route('/items').get(async function (req, res) {
        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM shop.item');

            conn.release();

            res.status(200).json(rows);

        } catch (e) {
            console.log(e);
            return res.status(400).json({"error": "Error with query"});

        }
    });

    apiRouter.route('/item/category').post(async function (req, res) {
        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM shop.category WHERE id = ?', req.body.categoryId);

            conn.release();

            res.status(200).json(rows[0]);

        } catch (e) {
            console.log(e);
            return res.status(400).json({"error": "Error with query"});

        }
    });

    apiRouter.route('/item/edit').put(async function (req, res) {
            try {
                let conn = await pool.getConnection();
                let q = await conn.query('UPDATE shop.item SET ? WHERE id = ?', [req.body.item, req.body.item.id]);
                conn.release();
                return res.status(200).json({changedRows: q.changedRows});
            } catch (e) {
                console.log(e);
                res.json({status: 'NOT OK'});
            }
    })

    apiRouter.route('/item/add').post(async function (req, res) {
        try {

            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO shop.item SET ?', req.body.item);
            conn.release();
            res.status(200).json({insertId: q.insertId});

        } catch (e) {
            console.log(e);
            res.json({status: 'NOT OK'});
        }

    });

    apiRouter.route('/item/delete').post(async function (req, res) {
        try {

            let conn = await pool.getConnection();
            let q = await conn.query('DELETE FROM shop.item WHERE id = ?', req.body.id);
            conn.release();
            res.status(200).json({insertId: q.insertId});

        } catch (e) {
            console.log(e);
            res.json({status: 'NOT OK'});
        }

    });

    apiRouter.get( '/me',function (req, res){
        res.status(200).send({ user : req.decoded });
    });

    return apiRouter;
};

