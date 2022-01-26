const Bill = require ("../models/Bill")


exports.createBill = async (req,res)=>{
    const{client, status,description, formaPago,bruto,date, IVA, total} = req.body;

        const bill = new Bill({client, status,description,date, formaPago,bruto, IVA, total});
      
        
        //gardar en la BD
        await bill.save();
      
        res.status(201).json({
          msg: "POST create bill API",
          bill,
        });

}
exports.updateBill = async (req,res)=>{

    try{
      let bill= await Bill.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "Bill Uptaded", bill});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar la factura"})
    }
}

exports.deleteBill = async(req, res) => {
  const { id } = req.params;
  const bill = await Bill.findByIdAndDelete(id);
  res.json({
    msg: "DELETE Bill API",
    bill,
  });
};

exports.getBill = async (req, res, next) => {
  try {
    const bill = await Bill.find({})
    res.json(bill);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getBillById= async (req, res, next) => {
  const bill = await Bill.findById(req.params.id);
  if (!bill) {
    res.status(400).json({ msg: "Esa factura no existe" });
    return next();
  }
  res.json({ msg: "Factura encontrada", bill });
}
