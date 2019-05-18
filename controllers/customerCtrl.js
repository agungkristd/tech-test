const User = require('../models/user');
const Profile = require('../models/profile');
const moment = require('moment');
const validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

const getProfile = async (req, res)=>{
    const token = req.headers['authorization'];
    try {
        const verify = jwt.verify(token, config.secret)
        if(req.params.id_profile == verify.id){
            const users = await Profile.query().findOne('user_id',verify.id)
            res.status(200).json(users);
        }else{
            res.status(403).send({message: 'Forbidden Access!'})
        }
    } catch (err) {
        if(err.name === 'JsonWebTokenError'){
            res.status(500).send({ message: 'Failed to authenticate token.' })
        }else{
            res.status(404).send(err)
        }
    }
};

const register = async (req, res)=>{
    try {
        let { email, password, first_name, last_name, phone_number } = req.body
        password = bcrypt.hashSync(password, 8)
        const user  = await User.query().insert({
            email,
            password,
            created_at: moment(),
            updated_at: moment()
        })

        const profile = await Profile.query().insert({
            user_id: user.user_id,
            first_name,
            last_name,
            phone_number: Number(phone_number),
            created_at: moment(),
            updated_at: moment()
        })

        res.status(201).send({ message: 'Registration succeed!'})
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
};

const login = async (req, res)=>{
    try {
        let { email, password } = req.body;
        const user = await User.query().findOne('email', email)
        console.log(user)
        
        const verifyPassword = bcrypt.compareSync(password, user.password)
        console.log(verifyPassword)
        if(verifyPassword){
            const token = jwt.sign({ id: user.user_id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ user_id: user.user_id, message:'Login Succeed', authorization: token })
        }else{
            res.status(401).send({message:'Wrong credentials!', error:'password mismatch!'})
        }
    } catch (err) {
        res.status(404).send({message:'Email not found!'})
    }
};

const customerCtrl = { getProfile, register, login };
module.exports = customerCtrl;