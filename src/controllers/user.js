const { user, profile, product } = require('../../models')

// register Here
exports.addUsers = async (req, res) => {
  try{
  const data = req.body;

  await user.create(data);

  res.send({
    status: 'success',
    data: {
      user:{
        name: `${data.name}`,
        email: `${data.email}`,
        token:'9898766799DSF7DS78F'
      }
    }
  });
} catch (error) {
    console.log(error);
    req.send({
      status:'failed',
      message: 'server error',
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "iduser"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await profile.findAll({
      include: {
        model: user,
        as: "user",
        attributes:{
          exclude:["password", "createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        profiles,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const users = await user.findAll({
      where:{
        status: 'seller',
      },
      include: {
        model: product,
        as: "products",
        attributes: {
          exclude: ["createdAt", "updatedAt", "iduser"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
