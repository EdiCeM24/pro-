import Category from "../models/Category.model.js";


const createCategory = async (req, res) => {
  try {
    const { name, color, slug } = req.body;

    if (!(name && color && slug)) {
      return res.status(404).json({ message: "Category not available"})
    }
    const category = await Category.create({
      name,
      color,
      slug
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export { createCategory, getCategories };