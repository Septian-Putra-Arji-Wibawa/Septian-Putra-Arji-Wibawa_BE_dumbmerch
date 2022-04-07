const { category } = require('../../models')

// addCategory Here
exports.addCategory = async (req, res) => {
  try{
  
  const data = req.body;
  const newCategory = await category.create(data);

  let productData = await category.findOne({
    where: {
      id: newCategory.id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  res.send({
    status: 'success',
    data:{
      category:{
        id: productData.id,
        name: productData.name,
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
};

// getAllCategory here
exports.getCategories = async (req, res) => {
try {
    const data = await category.findAll({
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    });
    
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

//   getCategoryById here
exports.getCategory = async (req, res) => {
    try {
        const id = req.params.id
        const data = await category.findOne({
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

// Update Category here
exports.updateCategory = async (req, res) => {
try {
    const id = req.params.id;
    const data = req.body;
    await category.update(req.body, {
        where: {
            id,
        },
    });
    
    res.send({
        status: 'Success Updated Category',
        data:{
            category:{
                id,
                name: `${data.name}`,
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

//   Delete Category here
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await category.destroy({
            where: {
                id,
            },
        });
        
        res.send({
            status: 'Success Deleted Category',
            data:{
                category:{
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