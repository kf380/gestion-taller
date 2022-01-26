const Shopping = require ("../models/Shopping")


exports.createShopping = async (req,res)=>{
    const{date,status,description,supplier,formaPago,bruto, IVA, total} = req.body;

        const shopping = new Shopping({date,status,description,supplier,formaPago,bruto, IVA, total});
      
        
        //gardar en la BD
        await shopping.save();
      
        res.status(201).json({
          msg: "POST create shopping API",
          shopping,
        });

}
exports.updateShopping = async (req,res)=>{

    try{
      let shopping= await Shopping.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "Shopping Uptaded", shopping});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar la compra"})
    }
}

exports.deleteShopping = async(req, res) => {
  const { id } = req.params;
  const shopping = await Shopping.findByIdAndDelete(id);
  res.json({
    msg: "DELETE Shopping API",
    shopping,
  });
};

exports.getShopping = async (req, res, next) => {
  try {
    const shopping = await Shopping.find({})
    res.json(shopping);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getShoppingById= async (req, res, next) => {
  const shopping = await Shopping.findById(req.params.id);
  if (!shopping) {
    res.status(400).json({ msg: "Esa compra no existe" });
    return next();
  }
  res.json({ msg: "Compra encontrada", shopping });
}
