import Product from "../models/pro.model.js";
import Category from "../models/Category.model.js";
import { Op } from "sequelize";



const homePage = (req, res) => {
  try {
    res.render('home', { title: 'Home page successfully loaded!'});
  } catch (error) {
    if (!res.ok) {
      console.error('It is unable to load page:', error);
      res.status(400).json({ message: `Page is unable to render resources: ${error}`});
    }
  }
};


const products = async (req, res) => {
  const { name, price, desc, stock, color, batch } = req.body;
  const productImage = req.body.image;

  try {
    if (!(name && price && desc && stock && color && batch && productImage)) {
        return res.status(403).json({ message: 'Product is unavailable.'})
     };

    const existingProduct = await Product.findOne({ where: {}});

    if (!existingProduct) {
      return res.status(404).json({ message: "" });
    };


    const product = await Product.create({
      name,
      price,
      desc,
      stock, 
      color, 
      batch, 
      productImage
    });

    // SORTING PRODUCT
    const { sort = 'price', order = 'ASC' } = req.query;

    order: [[sort, order]]

    // PAGINATION
    const { page = 1, limit = 10 } = req.query;

    const productPage = await Product.findAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });
    return res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ALL PRODUCTS (with search + filter)
const getProducts = async (req, res) => {
  
  try {
    const { search, minPrice, maxPrice, categoryId } = req.query;

    let where = {};

    // 🔍 Search by name
    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`
      };
    }

    // 💰 Price filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    // 📂 Category filter
    if (categoryId) {
      where.CategoryId = categoryId;
    }

    const products = await Product.findAll({
      where,
      include: Category
    });

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: Category
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const productUpdate = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update(req.body);
    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteProducts = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export { homePage, products, getProducts, getProductById, productUpdate, deleteProducts }

