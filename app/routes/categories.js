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

    return categoryRouter;
}