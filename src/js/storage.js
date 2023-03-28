const categories = [
  {
    id: 1,
    title: "front end",
    description: "frontend of application",
    createdDate: "2021-11-01T10:47:55.889Z",
  },
  {
    id: 2,
    title: "back end",
    description: "backend of application",
    createdDate: "2021-10-01T10:47:55.889Z",
  },
];
export default class Storage {
  // add category
  // save category
  // get All categories
  static getAllCategories() {
    // what i want to save in local storage?   1.products  2.categories
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdDate) > new Date(b.createdDate) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(category) {
    const savedCategories = Storage.getAllCategories();
    const existedCategory = savedCategories.find((c) => c.id === category.id);
    if (existedCategory) {
      // ! ---- edit category progress
      existedCategory.title = category.title;
      existedCategory.description = category.description;
    } else {
      // ! ---- make a new category
      category.id = new Date().getTime();
      category.createdDate = new Date().toISOString();
      savedCategories.push(category);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("product")) || [] ;
    const sortedProducts = savedProducts.sort((a, b) => {
      return new Date(a.createdDate) > new Date(b.createdDate) ? -1 : 1;
    });
    return sortedProducts;
  }
  static saveProducts(product) {
    const savedProducts = Storage.getAllProducts();
    const existedProduct = savedProducts.find((p) => p.id === product.id);
    if (existedProduct) {
      // ! edit product progress
      existedProduct.title = product.title;
      existedProduct.quantity = product.quantity;
      existedProduct.category = product.category;
    } else {
      // ! make a new product progress
      product.id = new Date().getTime();
      product.createdDate = new Date().getFullYear;
      savedProducts.push(product);
    }
    localStorage.setItem("product", JSON.stringify(savedProducts));
  }
}
