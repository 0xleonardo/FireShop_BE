module.exports=function(express,pool, jwt, secret) {


    const categoryRouter = express.Router();


    categoryRouter.get('/', function (req, res) {
        res.json({message: 'Dobro dosli na nas API!'});
    });

    categoryRouter.route('/categories').get(async function (req, res) {

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM shop.category');

            conn.release();

            res.status(200).json(rows);

        } catch (e) {
            console.log(e);
            return res.status(400).json({"error": "Error with query"});

        }
    })

    categoryRouter.route('/categories/isValid').post(async function (req, res) {

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM shop.category WHERE name = ?', req.body.name);

            conn.release();

            if (rows.length === 0) {
                return res.status(404).json({msg:"Invalid"});
            }

            return res.status(200).json({msg:"Valid", category: rows[0]});
        } catch (e) {
            console.log(e);
            return res.status(400).json({"error": "Error with query"});

        }
    })

    // }).post(async function (req, res) {
    //     try {
    //
    //         let conn = await pool.getConnection();
    //         let q = await conn.query('INSERT INTO posts SET ?', req.body);
    //         conn.release();
    //         res.status(200).json({insertId: q.insertId});
    //
    //     } catch (e) {
    //         console.log(e);
    //         res.json({status: 'NOT OK'});
    //     }
    //
    // }).put(async function (req, res) {
    //     try {
    //
    //         let conn = await pool.getConnection();
    //         let q = await conn.query('UPDATE posts SET ? WHERE _id = ?', [req.body, req.body.id]);
    //         conn.release();
    //         res.status(200).json({changedRows: q.changedRows});
    //         console.log(q);
    //
    //     } catch (e) {
    //         console.log(e);
    //         res.json({status: 'NOT OK'});
    //     }
    //
    //
    // }).delete(async function (req, res) {
    //     try {
    //         let conn = await pool.getConnection();
    //         let q = await conn.query('DELETE FROM posts WHERE id = ?', req.body.id);
    //         conn.release();
    //         res.status(200).json({changedRows: q.changedRows});
    //         console.log(q);
    //
    //     } catch (e) {
    //         console.log(e);
    //         res.json({status: 'NOT OK'});
    //     }
    //
    //
    // });

    categoryRouter.route('/category/:id').get(async function(req,res){
        try {
            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM shop.category WHERE id = ?', req.params.id);
            conn.release();
            res.json({ status: 200 });

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }
    })

    return categoryRouter;
}