const Product = require ("../models/Product")

exports.createProduct = async (req, res, next) => {
    const{name,type,identifier, price, description, stock, category} = req.body;

    const product = new Product({ name,type,identifier, price, description, stock, category });
  
    
    //gardar en la BD
    await product.save();
  
    res.status(201).json({
      msg: "POST create product API",
      product,
    });

}
  //traer todos los productos
  exports.getAllProducts = async(req,res,next)=>{
  const query = {stock:true}
    try {
      // const total = await Product.countDocuments(query)//cuenta los productos 
      const products = await Product.find({})
      res.json(products);  
      
  } catch (error) {
      console.log(error);
      return next();
  }
  };
  
//   exports.getProductById = async(req,res,next)=>{
//     const {id} = req.params.id
//     const product = await Product.findOne({_id:id})
//     res.json(product)
//   }
  
  //mostrar un producto 
  exports.getProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
      return  res.status(400).json({msg:'Ese producto no existe'});
    }
    res.json({msg:'Producto encontrado',product})
  };
  
  exports.updateProduct = async(req,res,next)=>{
    try {
        let product = await Product.findOneAndUpdate({_id:req.params.id},
            req.body,{
                new:true
            });
            res.json(product);
    } catch (error) {
        console.log(error);
        return next();
    }
  
  };
  
  exports.deleteProduct = async(req,res,next)=>{
    try {
        await Product.findOneAndDelete({_id: req.params.id});
        res.json({msg:'Producto eliminado'});
    } catch (error) {
        console.log(error);
        return next();
    }
  };
  
  exports.searchProduct = async(req,res,next)=>{
    const {name}=req.params
  
     try {
      const includeName = await Product.find({name: new RegExp (name, "i")});
         includeName.length >0
         ?  res.json(includeName) 
         : res.json({msg:"Product not found"})
  
     } catch (error) {
         console.log(error);
         return next();
     }
   };