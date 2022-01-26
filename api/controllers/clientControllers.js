const Client = require ("../models/Client")


exports.createClient = async (req,res)=>{
    const{name,email,telephone,NIDentificador} = req.body;

        const client = new Client({ name,email,telephone,NIDentificador });
      
        
        //gardar en la BD
        await client.save();
      
        res.status(201).json({
          msg: "POST create client API",
          client,
        });

}
exports.updateClient = async (req,res)=>{

    try{
      let client= await Client.findOneAndUpdate(
        { _id:req.params.id},
        req.body,
        {
          new:true,
        }
      );
      res.json({msg: "Client Uptaded", client});
    } catch (error){
      console.log(error);
      res.status(301).json({msg: "No se pudo actualizar el cliente"})
    }
}

exports.deleteClient = async(req, res) => {
  const { id } = req.params;
  const client = await Client.findByIdAndDelete(id);
  res.json({
    msg: "DELETE Client API",
    client,
  });
};

exports.getClient = async (req, res, next) => {
  try {
    const client = await Client.find({})
    res.json(client);
  } catch (error) {
    res.status(400).json({
      msg: "hubo un eror",
    });
    next();
  }
};
exports.getClientById= async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(400).json({ msg: "Ese Cliente no existe" });
    return next();
  }
  res.json({ msg: "Cliente encontrado", client });
}
