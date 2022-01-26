const Sale = require ("../models/Sale")


exports.createSale = async (req,res)=>{
    const{date,status,description,client,formaPago,bruto, IVA, total} = req.body;

        const sales = new Sale({date,status,description,client,formaPago,bruto, IVA, total});
      
        
        //gardar en la BD
        await sales.save();
      
        res.status(201).json({
          msg: "POST create sale API",
          sales,
        });

}
exports.updateSale = async (req,res)=>{

    try{
      let sale= await Sale.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "Sale Uptaded", sale});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar la venta"})
    }
}

exports.deleteSale = async(req, res) => {
  const { id } = req.params;
  const sale = await Sale.findByIdAndDelete(id);
  res.json({
    msg: "DELETE sale API",
    sale,
  });
};

exports.getSale = async (req, res, next) => {
  try {
    const sale = await Sale.find({})
    res.json(sale);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un error",
    });
    next();
  }
};
exports.getSaleById= async (req, res, next) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) {
    res.status(400).json({ msg: "Esa venta no existe" });
    return next();
  }
  res.json({ msg: "Venta encontrada", sale });
}
