const Cheque = require ("../models/Cheque")


exports.createCheque = async (req,res)=>{
    const{client, dateinitial, datepayment, amount, bank, telephone} = req.body;

        const cheque = new Cheque({client, dateinitial, datepayment, amount, bank, telephone});
      
        
        //gardar en la BD
        await cheque.save();
      
        res.status(201).json({
          msg: "POST create cheque API",
          cheque,
        });

}
exports.updateCheque = async (req,res)=>{

    try{
      let cheque= await Cheque.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "Cheque Uptaded", cheque});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar el cheque"})
    }
}

exports.deleteCheque = async(req, res) => {
  const { id } = req.params;
  const cheque = await Cheque.findByIdAndDelete(id);
  res.json({
    msg: "DELETE Cheque API",
    cheque,
  });
};

exports.getCheque = async (req, res, next) => {
  try {
    const cheque = await Cheque.find({})
    res.json(cheque);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getChequeById= async (req, res, next) => {
  const cheque = await Cheque.findById(req.params.id);
  if (!cheque) {
    res.status(400).json({ msg: "Ese proveedor no existe" });
    return next();
  }
  res.json({ msg: "Proveedor encontrado", cheque });
}
