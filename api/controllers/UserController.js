/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var moment = require('moment');
module.exports = {

    singUp: async function (req, res) {
        await User.findOne({
            email: req.param('email'),
        }).then(async function (doc) {
            if (!doc) {
                let salt = await bcrypt.genSalt(10);
                let hashpass = await bcrypt.hash(req.param('password'), salt);
                await User.create({
                    name: req.param('name'),
                    email: req.param('email'),
                    phone: req.param('phone'),
                    organization: req.param('organization'),
                    cargo: req.param('cargo'),
                    password: hashpass
                }).then(function (user) {
                    return res.send({
                        'success': true,
                        'message': 'User register',
                        'data': user
                    })
                })
                    .catch(function (err) {
                        sails.log.debug(err);
                        return res.send({
                            'success': false,
                            'message': 'Falló'
                        })
                    })
            } else {
                res.status(400).send('Este email esta en uso')
            }
        });

    },

    login: async function (req, res) {
        if (!(req.body.email) || !(req.body.password)) {
            return res.status(400).send({
                'message': 'Request must contain Email and password'
            })
        };
        const _user = await User.findOne({ email: req.body.email }, async (err, user) => {


            if (err) {
                console.log("!!!!! In this position ");
                console.error(err);
                return res.sendStatus(500);
            }
            if (!user) {
                return res.send({ message: 'User Incorrect' });
            }
            // await sails.helpers.passwords.hashPassword('12345678')
            const validpass = await bcrypt.compare(req.body.password, user.password);
            if (!validpass) return res.send({ message: 'Password Incorrect' });
            //sails.log.debug('Antes');
            const token = jwt.sign({
                _id: user.id,
                rol: user.isAdmin ? 'Admin' : 'Organization',
                date_session: moment().toDate(),
                expiresIn: 900
            },
                'hjghdvdfjvnishvishr4oo', { expiresIn: 900 });
            req.session.me = token;
            //sails.log.debug(token);
            return res.send({
                'message': 'Login Successfully',
                'idToken': token,
                'expiresIn': 900
            });
        });
    },

    logout: function (req, res) {
        //     const token = req.header.auth_token;
        //     res.send('SingOut'+ token);
        //   }
        // return res.send(req.session.me);
        req.session.me = null;
        sails.log.debug(req.session.me);


        // // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // // send a simple response letting the user agent know they were logged out
        // // successfully.
        if (req.wantsJSON) {
            return res.ok('Logged out successfully!');
        }
    },

    getUserById: (req, res) => {
        if (!req.param('id')) {
            return res.sendStatus(400, {
                'error': 'LA consulta debe tener un parametro'
            })
        }
        User.findOne({ id: req.param('id') })
            .then(user => {
                return res.send({
                    'data': user
                });
            })
            .catch(err => {
                return res.sendStatus(500, {
                    'error': err
                });
            })
    },

    getSessionUser:async (res,req)=> {
        const token = req.header('Authorization').split('Bearer ')[1];
        await jwt.verify(token,'hjghdvdfjvnishvishr4oo', (payload,error)=>{
            if(err) return res.status(500).send({'error': error});
            user_id = payload._id;
            date_session = payload.date_session;
            exp = payload.expiresIn
            return res.send({
                'user_id': user_id,
                'date_session': date_session,
                'exp': exp
            })
        }); 
    },
    getIdUserConnected: async (req,res) =>{
        const token = req.header('Authorization').split('Bearer ')[1];
        await jwt.verify(token,'hjghdvdfjvnishvishr4oo', (payload,error)=>{
            if(err) return res.status(500).send({'error': error});
            return res.send({
                'user_id': payload._id,
            })
        });
    },
    
};

