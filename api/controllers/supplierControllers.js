const Supplier = require ("../models/Supplier")


exports.createSupplier = async (req,res)=>{
    const{name,email,telephone,NIDentificador} = req.body;

        const supplier = new Supplier({ name,email,telephone,NIDentificador });
      
        
        //gardar en la BD
        await supplier.save();
      
        res.status(201).json({
          msg: "POST create supplier API",
          supplier,
        });

}
exports.updateSupplier = async (req,res)=>{

    try{
      let supplier= await Supplier.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "Supplier Uptaded", supplier});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar el proveedor"})
    }
}

exports.deleteSupplier = async(req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findByIdAndDelete(id);
  res.json({
    msg: "DELETE Supplier API",
    supplier,
  });
};

exports.getSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.find({})
    res.json(supplier);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getSupplierById= async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) {
    res.status(400).json({ msg: "Ese proveedor no existe" });
    return next();
  }
  res.json({ msg: "Proveedor encontrado", supplier });
}
