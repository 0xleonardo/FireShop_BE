module.exports=function(express,pool, jwt, secret) {


    const itemRouter = express.Router();


    itemRouter.get('/', function (req, res) {
        res.json({message: 'Dobro dosli na nas API!'});
    });

    itemRouter.route('/category/items').post(async function (req, res) {

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM shop.item WHERE idCategory = ?', req.body.idCategory);

            conn.release();

            res.status(200).json(rows);

        } catch (e) {
            console.log(e);
            return res.status(400).json({"error": "Error with query"});

        }
    });

    itemRouter.route('/item/bought').put(async function (req, res) {
        try {
            console.log(res.body)
            let conn = await pool.getConnection();
            //let q = await conn.query('UPDATE shop.item SET amount = amount-1 WHERE id IN (?)', req.body.id);
            conn.release();
            return res.status(200).json({changedRows: q.changedRows});
        } catch (e) {
            console.log(e);
            res.json({status: 'NOT OK'});
        }
    })

    itemRouter.route('/item/:id').get(async function(req,res){
        try {
            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM shop.item WHERE id = ?', req.params.id);

            if (rows.length === 0) {
                return res.status(404).json({status:404});
            }

            conn.release();
            return res.status(200).json({status:"200", item:rows[0]});
        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }
    })

    return itemRouter;
}