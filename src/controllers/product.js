const { product, user, category, categoryproduct } = require('../../models')

// addCategory Here
exports.addProduct = async (req, res) => {
  try {
    const data = req.body;

    data.iduser = req.user.id;
    data.image = req.file.filename;

    const newProduct = await product.create(data);

    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },

        // {
        //   model: category,
        //   as: 'categories',
        //   through: {
        //     model: categoryproduct,
        //     as: 'bridge',
        //     attributes: [],
        //   },
        //   attributes: {
        //     exclude: ['createdAt', 'updatedAt'],
        //   },
        // },
        
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'iduser'],
      },
    });

    res.send({
      status: 'success',
      data: {
        productData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

// getAll here
exports.getProducts = async (req, res) => {
try {
    // let data = await product.findAll({
    //     attributes:{
    //         exclude:['createdAt','updatedAt']
    //     }
    // });
    let data = "";
        let sortByNameAsc = true;
        let sortByNameDsc = false; 
        let sortByPriceAsc = true;
        let sortByPriceDsc = false;

        if(sortByNameAsc == true){
             data = await product.findAll({
                order: [['name', 'ASC']],
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                }
              });
        };
        if(sortByNameDsc == true){
            data = await product.findAll({
               order: [['name', 'DESC']],
               attributes: {
                 exclude: ['createdAt', 'updatedAt'],
               }
             });
       };
        if(sortByPriceAsc == true){
             data = await product.findAll({
                order: [['price', 'ASC']],
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                }
              });
        };
        if(sortByPriceDsc == true){
            data = await product.findAll({
               order: [['price', 'DESC']],
               attributes: {
                 exclude: ['createdAt', 'updatedAt'],
               }
             });
       };
        if(sortByPriceAsc == false && sortByPriceDsc == false && sortByNameAsc == false && sortByNameDsc == false){
             data = await product.findAll({
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                }
              });
        };

    const PATH = 'http://localhost:5000/uploads/'
    data = data.map((item) => {
      item.image = PATH + item.image
      return item;
    })

    res.send({
        status: 'success',
        data,
      });
    } catch (error) {
        console.log(error);
        res.send({
          status:'failed',
          message: 'server error',
        });
      }
  }

//   getById here
exports.getproduct = async (req, res) => {
    try {
        const id = req.params.id
        const data = await product.findOne({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            where:{
                id,
            }
        });
        
        res.send({
            status: 'success',
            data,
          });
        } catch (error) {
            console.log(error);
            req.send({
              status:'failed',
              message: 'server error',
            });
          }
  }

// Update here
exports.updateProduct = async (req, res) => {
try {
    const id = req.params.id;
    const data = req.body;
    await product.update(req.body, {
        where: {
            id,
        },
    });
    
    res.send({
        status: 'success',
        data:{
            product:{
                id,
                data,
            }
        }
      });
    } catch (error) {
        console.log(error);
        res.send({
          status:'failed',
          message: 'server error',
        });
      }
  }

//   Delete here
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await product.destroy({
            where: {
                id,
            },
        });
        
        res.send({
            status: 'success',
            data:{
               product:{
                    id,
                }
            }
          });
        } catch (error) {
            console.log(error);
            res.send({
              status:'failed',
              message: 'server error',
            });
          }
      }