// target :
// 1: Create Category
// 2: Create product based on select category
// 3: edit product
// 4: remove product
// 5: save products in local storage
//   -> storage class for handle application methods
//   -> product view class
//   -> category view class
//   -> main and app class
import CategoryView from "./categoryView.js";
import ProductsView from "./ProductsView.js";



document.addEventListener('DOMContentLoaded' , () => {
    CategoryView.setApp();
    CategoryView.createCategoriesList ();
    ProductsView.setApp();
    ProductsView.createProductsList(ProductsView.product);
});


