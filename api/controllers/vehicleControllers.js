const Vehicle = require ("../models/Vehicle")

exports.createVehicle = async (req, res, next) => {
    const{domain,brand,model,type,kilometers, age} = req.body;

    const vehicle = new Vehicle({domain,brand,model,kilometers,type, age, });
  
    
    //gardar en la BD
    await vehicle.save();
  
    res.status(201).json({
      msg: "POST create vehicle API",
      vehicle,
    });

}
exports.updateVehicle = async (req,res)=>{

    try{
      let vehicle= await Vehicle.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "vehicle Uptaded", vehicle});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar el vehicle"})
    }
}

exports.deleteVehicle = async(req, res) => {
  const { id } = req.params;
  const vehicle = await Vehicle.findByIdAndDelete(id);
  res.json({
    msg: "DELETE Vehicle API",
    vehicle,
  });
};

exports.getVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.find({})
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getVehicleById= async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    res.status(400).json({ msg: "Ese vehiclee no existe" });
    return next();
  }
  res.json({ msg: "Vehicle encontrado", vehicle });
}
