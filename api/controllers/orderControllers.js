const Order = require("../models/Order");
const Client = require("../models/Client");

//nueva orden
exports.createOrder = async(req,res,next) =>{
      const order = req.body;
        let id = req.body.client
        const user = await Client.findById(id);
        if(!order){
            return res.status(400).json({msg:'no hay una order para crear'})
        }
        let newOrder = new Order(order);
        try {
             await newOrder.save()
            user.order = user.order.concat(newOrder);
             await user.save();
            res.json(newOrder)
        } catch (error) {
            next(error)
        }
}   
       
//todas las ordenes
exports.getAllOrder = async(req,res,next)=>{
    try {
        const order = await Order.find({}).populate('client',{
            product:1
        })
        res.json(order);
    } catch (error) {
        next(error);
    }
};

//orden por id
exports.getOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  //console.log("order id", order)
  if (!order) {
    res.status(400).json({ msg: "Esa orden no existe" });
    return next();
  }
  res.json(order);
};

//actualizar una orden
exports.updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
      );
      //console.log("ORDER ", order);
    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
};
//eliminar una orden
exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "Orden  eliminada" });
  } catch (error) {
    console.log(error);
    return next();
  }
};