import Product from "../models/pro.model.js";


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


const products = async (req, res) => {};


const productUpdate = async (req, res) => {};


const deleteProducts = async (req, res) => {}



export { homePage, products, productUpdate, deleteProducts }

