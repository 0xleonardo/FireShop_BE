const bcrypt = require("bcrypt");
module.exports=function(express,pool, jwt, secret) {


    const orderRouter = express.Router();


    orderRouter.get('/', function (req, res) {
        res.json({message: 'Dobro dosli na nas API!'});
    });

    orderRouter.route('/order').post(async function (req, res) {
        if (req.body.items == null || req.body.total == null || req.body.delivery == null) {
            return res.status(400).json({error: "All parameters must be provided"});
        }

        try {

            let conn = await pool.getConnection();
            let row = await conn.query('INSERT INTO shop.ordertransaction SET ?', req.body);
            conn.release();
            return res.status(200).json({status:200, insertId: row.insertId});
        } catch (e) {
            console.log(e);
            return res.status(400).json({status: 400, msg: "Error with query"});

        }
    });

    orderRouter.route('/user-orders').post(async function (req, res) {
        try {
            let conn = await pool.getConnection();
            let row = await conn.query('SELECT * FROM shop.ordertransaction WHERE idUser = ?', req.body.userId);
            conn.release();
            return res.status(200).json(row);
        } catch (e) {
            console.log(e);
            return res.status(400).json({status: 400, msg: "Error with query"});

        }
    });

    orderRouter.route('/order-items').post(async function (req, res) {
        try {
            let conn = await pool.getConnection();
            let row = await conn.query('SELECT * FROM shop.item WHERE id IN (?)', [req.body.itemIds]);
            conn.release();
            return res.status(200).json(row);
        } catch (e) {
            console.log(e);
            return res.status(400).json({status: 400, msg: "Error with query"});

        }
    })



    return orderRouter;
}