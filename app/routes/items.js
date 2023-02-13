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

    itemRouter.route('/items/bought').put(async function (req, res) {
        const items = req.body;

        let connection = await pool.getConnection();
        try {
            // Loop through each item and check if the amount is zero in the database
            for (const item of items) {
                const checkSql = `SELECT * FROM shop.item WHERE id = ?`;
                const checkParams = [item.id];
                const [rows] = await connection.query(checkSql, checkParams);

                if (rows.amount-item.amount < 0) {
                    throw new Error(`Not enough ${rows.brand} ${rows.series} to buy!`);
                }

                const updateSql = `UPDATE shop.item SET amount = amount - ? WHERE id = ?`;
                const updateParams = [item.amount, item.id];
                await connection.query(updateSql, updateParams);
            }

            connection.release();

            return res.status(200).send({status: 200, msg: 'Items updated successfully' });
        } catch (error) {
            connection.release();
            return res.send({ status: 404, msg: error.message });
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