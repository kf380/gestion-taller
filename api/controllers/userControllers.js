const User = require ("../models/User")


exports.createUser = async (req,res)=>{
    const{name,password,role} = req.body;

        const user = new User({ name, password, role });
      
        
        //gardar en la BD
        await user.save();
      
        res.status(201).json({
          msg: "POST create user API",
          user,
        });

}
exports.updateUser = async (req,res)=>{

    try{
      let user= await User.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "user Uptaded", user});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar el usuario"})
    }
}

exports.deleteUser = async(req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.json({
    msg: "DELETE user API",
    user,
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};