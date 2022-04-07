const { date } = require('joi')
const { transaction, user, product } = require('../../models')

// Add Transaction
exports.addTransaction = async (req, res) => {
    try {
        let data = req.body;
        let buyer = req.user; 

        const dataproduct = await product.findOne({
            attributes:{
                exclude:['name','desc','image','qty','createdAt','updatedAt']
            },
            where:{
                id: data.idproduct,
            },
          });

          const dataseller = await user.findOne({
            attributes:{
                exclude:['email','password','createdAt','updatedAt','name','status']
            },
            where:{
                id: dataproduct.iduser,
            },
          });

          if(!data.price){
            data = {
                ...data,
                price: dataproduct.price,
                status: "success"
            };
        };

        await transaction.create({
            idproduct: data.idproduct,
            idbuyer: buyer.id,
            idseller: dataseller.id,
            price: data.price,
            status: data.status
        });

        res.send({
            status: 'success',
            data: {
                transaction: {
                    id: data.id,
                    idproduct: data.idproduct,
                    idbuyer: buyer.id,
                    idseller: dataseller.id,
                    price: data.price
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

// Get Transaction
exports.getTransactions = async (req, res) => {
    try {
        const data = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','idbuyer', 'idseller', 'idproduct','status']
            },
            include: [
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'iduser', 'qty', 'price']
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
            ]
        })

        res.send({
            status: 'success',
            data,
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

