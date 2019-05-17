const Customer = require('../models/customer');
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
            const customers = await Customer.query().findById(verify.id)
            res.status(200).json(customers);
        }else{
            res.status(500).send({message: 'Not Authorized!'})
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
        let { email, password, first_name, last_name } = req.body
        password = bcrypt.hashSync(password, 8)
        const customer  = await Customer.query().insert({
            email,
            password,
            first_name,
            last_name,
            created_at: moment(),
            updated_at: moment()
        })

        res.status(201).send({ message: 'registration complete!'})
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
};

const login = async (req, res)=>{
    try {
        let { email, password } = req.body;
        const customer = await Customer.query().findOne('email', email)
        console.log(customer)
        
        const verifyPassword = bcrypt.compareSync(password, customer.password)
        console.log(verifyPassword)
        if(verifyPassword){
            const token = jwt.sign({ id: customer.customer_id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ customer_id: customer.customer_id, authorization: token })
        }else{
            res.status(401).send('wrong credentials!')
        }
    } catch (err) {
        res.status(404).send(err)
    }
};

const customerCtrl = { getProfile, register, login };
module.exports = customerCtrl;