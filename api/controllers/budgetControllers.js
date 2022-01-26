const Budget = require ("../models/Budget")


exports.createBudget = async (req,res)=>{
    const{client,date,vehicle,total, status} = req.body;

        const budget = new Budget({client,date,vehicle,total, status });
      
        
        //gardar en la BD
        await budget.save();
      
        res.status(201).json({
          msg: "POST create budget API",
          budget,
        });

}
exports.updateBudget = async (req,res)=>{

    try{
      let budget= await Budget.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "Budget Uptaded", budget});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar el proveedor"})
    }
}

exports.deleteBudget = async(req, res) => {
  const { id } = req.params;
  const budget = await Budget.findByIdAndDelete(id);
  res.json({
    msg: "DELETE Budget API",
    budget,
  });
};

exports.getBudget = async (req, res, next) => {
  try {
    const budget = await Budget.find({})
    res.json(budget);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getBudgetById= async (req, res, next) => {
  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    res.status(400).json({ msg: "Ese proveedor no existe" });
    return next();
  }
  res.json({ msg: "Proveedor encontrado", budget });
}
