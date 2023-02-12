const bcrypt = require("bcrypt");


module.exports=function(express, pool, jwt, secret){


    let authRouter = express.Router();

    authRouter.route('/register').post(async function(req,res){
        if (req.body.name == null || req.body.surname == null || req.body.password == null || req.body.email == null) {
            return res.status(400).json({error: "All parameters must be provided"});
        }

        const hash = await bcrypt.hash(req.body.password, 11);

        let user = {
            name : req.body.name,
            surname : req.body.surname,
            password : hash,
            email : req.body.email
        }

        try {

            let db = await pool.getConnection();

            let existsEmail = await db.query('SELECT * FROM shop.users WHERE email = ?', req.body.email);

            if (existsEmail.length > 0) {
                return res.status(409).json({error: "Existing email"})
            }

            await db.query('INSERT INTO shop.users SET ?', user);
            db.release();
            return res.status(200).json({success: "Successfully registered"});

        } catch (error){
            console.log(error);
            res.status(500).json({error: "Unknown registration failure"});
        }
    });

    authRouter.route('/login').post( async function(req,res){
        try {
            console.log(req.body)

            const db = await pool.getConnection();
            const user = await db.query('SELECT * FROM shop.users WHERE email=?', req.body.email);
            db.release();

            if (user.length === 0) {
                return res.status(404).json({error:'Wrong credentials'});
            }

            const result = await bcrypt.compare(req.body.password, user[0].password);

            // decrypt password
            if (user.length > 0 && result){

                const userReturnData = {
                    id:user[0].id,
                    name:user[0].name,
                    surname:user[0].surname,
                    email:user[0].email
                }

                const token = jwt.sign({...userReturnData}, secret, {expiresIn:3600});

                res.status(200).json({token:token, user:userReturnData});
            }  else {
                res.status(404).json({error:'Wrong credentials'});
            }


        } catch (e){
            console.log(e);
            return res.status(500).json({error : "Unknown login failure"});
        }
    });

    return authRouter;
};
