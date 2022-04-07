const {user} = require('../../models');

const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    
        
        let data = req.body

        if(!data.status){
            data = {
                ...data,
                status: 'customer',
            };
        };

        const schema = joi.object({
            name:joi.string().min(4).required(),
            email:joi.string().email().required(),
            password:joi.string().min(6).required(),
            status:joi.string(),
        });

        const { error }= schema.validate(data);

        if (error) {
            return res.send({
                error:{
                    message: error.details[0].message,
                },
            });
        }

        const dataInDB = await user.findOne({
            where: {
                email: data.email
            }
        })

        if(dataInDB){
            return res.status(400).send({
                error: {
                    message: `Email ${data.email} is Already;`
                }
            })
        }
        try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = await user.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            status: data.status,
        })


        const SECRET_KEY = 'akupastibisa';
        const token = jwt.sign({id:newUser.id}, SECRET_KEY);

        res.status(200).send({
            status: 'success',
            data:{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                token,
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message:'server error',
        })
    }

};

exports.login = async (req,res) => { 
        const data = req.body

        const schema = joi.object({
            email:joi.string().email().required(),
            password:joi.string().min(6).required(),
        });

        const { error }= schema.validate(data)
        if (error) {
            return res.send({
                error:{
                    message: error.details[0].message,
                },
            });
        }
        try {

        const userExist = await user.findOne({
            where: {
                email: data.email,
            },
        });

        if(!userExist){
            return res.send({
                error: {
                    message: `Email or password not match;`
                },
            });
        }

        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if(!isValid){
            return res.status(400).send({
                status:'failed',
                message:'Email or password not match',
            })
        }

        const SECRET_KEY = 'akupastibisa';
        const token = jwt.sign({id:userExist.id}, SECRET_KEY);

        res.status(200).send({
            status: 'success',
            data:{
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                status: userExist.status,
                token,
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message:'server error',
        })
    }

};
