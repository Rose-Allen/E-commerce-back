const Category = require("../models/Category");
const slugify = require("slugify");
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ success: false, message: "Имя должно быть обязательным" });
    }
    const existsCategory = await Category.findOne({ name });
    if (existsCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Такая категория уже существует" });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(200).send({
      success: true,
      message: "Новая категория создана!",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка в категории",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Категория успешно обновлена!",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при обновлении категории",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send({
      success: true,
      message: "Категории успешно получены !",
      categories,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при получении всех категории",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Категория успешно получена!",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при получении категории",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Категория успешно удалена!",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при удалении категории",
    });
  }
};
