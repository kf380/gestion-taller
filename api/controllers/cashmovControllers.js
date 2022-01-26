const CashMovement = require ("../models/CashMovement")


exports.createMovement = async (req,res)=>{
    const{type, amount,date, comments} = req.body;

        const cashMovement = new CashMovement({type, date,amount, comments} );
      
        
        //gardar en la BD
        await cashMovement.save();
      
        res.status(201).json({
          msg: "POST create cashMovement API",
          cashMovement,
        });

}
exports.updateMovement = async (req,res)=>{

    try{
      let cashMovement= await CashMovement.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "CashMovement Uptaded", cashMovement});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar el movimiento de caja"})
    }
}

exports.deleteMovement = async(req, res) => {
  const { id } = req.params;
  const cashMovement = await CashMovement.findByIdAndDelete(id);
  res.json({
    msg: "DELETE CashMovement API",
    cashMovement,
  });
};

exports.getMovement = async (req, res, next) => {
  try {
    const cashMovement = await CashMovement.find({})
    res.json(cashMovement);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getMovementById= async (req, res, next) => {
  const cashMovement = await CashMovement.findById(req.params.id);
  if (!cashMovement) {
    res.status(400).json({ msg: "Ese movimiento de caja no existe" });
    return next();
  }
  res.json({ msg: "Movimiento de caja encontrada", cashMovement });
}
