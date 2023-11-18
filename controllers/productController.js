const Product = require("../models/Product");
const slugify = require("slugify");
const fs = require("fs");
exports.create = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          error: "name обязателно",
        });
      case !description:
        return res.status(500).send({
          error: "description обязателно",
        });
      case !category:
        return res.status(500).send({
          error: "category обязателно",
        });
      case !price:
        return res.status(500).send({
          error: "price обязателно",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity обязателно",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "photo обязателно и должна быть не меньше чем 1мб",
        });
    }
    const products = new Product({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Новый продукт создан!",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при создании продукта",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { pId } = req.params;
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          error: "name обязателно",
        });
      case !description:
        return res.status(500).send({
          error: "description обязателно",
        });
      case !category:
        return res.status(500).send({
          error: "category обязателно",
        });
      case !price:
        return res.status(500).send({
          error: "price обязателно",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity обязателно",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "photo обязателно и должна быть не меньше чем 1мб",
        });
    }
    const products = await Product.findByIdAndUpdate(
      pId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Продукт успешно обновлен!",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при обновлении продукта",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "Продукты получены!",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при получении продуктов",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { slug } = req.params;
    const products = await Product.findOne({ slug })
      .populate("category")
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Продукты получен!",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при получении продукта",
    });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const { pId } = req.params;
    const product = await Product.findById(pId).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при получении фотографии",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { pId } = req.params;
    await Product.findByIdAndDelete(pId).select("-photo");
    res.status(200).send({
      success: true,
      message: "Продукт успешно удален!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Ошибка при удалении продукта ",
    });
  }
};
