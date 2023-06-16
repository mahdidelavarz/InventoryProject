import Storage from "./storage.js";
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#categories-list");
const addProductBtn = document.querySelector("#addProduct-btn");
const productsList = document.querySelector("#products-list");
const searchInput = document.querySelector("#search-input");
const sortOptions = document.querySelector("#filter-options");

class ProductsView {
  constructor() {
    addProductBtn.addEventListener("click", (e) => this.addProduct(e));
    this.product = [];
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sortOptions.addEventListener("change", (e) => this.sortProducts(e));
  }

  addProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, quantity, category });
    this.product = Storage.getAllProducts();
    console.log(this.product);
    this.createProductsList(this.product);
  }
  setApp() {
    this.product = Storage.getAllProducts();
  }
  createProductsList(product) {
    let result = "";
    product.forEach((item) => {
      // const selectedItem = Storage.getAllCategories().find((cat) => cat.id == item.category );
      result += `<div class="w-[30rem] m:w-full h-10 flex justify-between items-center mt-4"><span class="text-slate-300">${
        item.title
      }</span><div class=" h-full flex justify-between items-center"><span class="text-green-300">${new Date().toLocaleDateString(
        "fa-IR"
      )}</span><span class="mx-3 border border-slate-400 rounded-2xl text-slate-300 px-2 py-1">${
        item.category
      }</span><span class="w-auto h-auto  border-2 border-slate-200 bg-slate-500 text-slate-200 rounded-full p-1 flex justify-center items-center">${
        item.quantity
      }</span><button class="delete-btn mx-3 border border-red-400 rounded-2xl text-red-300 px-2 py-1" id = ${
        item.id
      }>Delete</button><button class="edit-btn border border-green-400 rounded-2xl text-green-300 px-2 py-1" data-id='${item.id}' id = ${
        item.id
      }>Edit</button></div></div>`;
    });
    productsList.innerHTML = result;
    // ! get delete btn
    const deleteProductBtn = [...document.querySelectorAll(".delete-btn")];
    deleteProductBtn.forEach((p) => {
      p.addEventListener("click", (e) => this.deleteProduct(e));
    });
    // !get edit btn
    const editProductBtn = [...document.querySelectorAll(".edit-btn")];
    editProductBtn.forEach((p) => {
      p.addEventListener('click' ,(e) => this.editProduct(e));
    })
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.product.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    let sortedProducts = [];
    if (value === "oldest") {
      sortedProducts = this.product.sort((a, b) => {
        return new Date(a.id) > new Date(b.id) ? -1 : 1;
      });
      console.log(sortedProducts);
    } else {
      sortedProducts = this.product.sort((a, b) => {
        return new Date(a.id) < new Date(b.id) ? -1 : 1;
      });
      console.log(sortedProducts);
    }
    this.createProductsList(sortedProducts);
  }
  deleteProduct(e){
   Storage.deleteProduct(e);
   this.product = Storage.getAllProducts();
   this.createProductsList(this.product);
  }
  editProduct(e){
    const products = Storage.getAllProducts();
    const productId = e.target.dataset.id;
    const selectedProduct = products.filter((p) => p.id == productId);
    productTitle.value = selectedProduct[0].title;
    productQuantity.value = selectedProduct[0].quantity;
    productCategory.value = selectedProduct[0].category;
    selectedProduct[0].id = productId;
    
    console.log(selectedProduct);
    console.log(products);
    console.log('edit - id' , productId);

  }
}

export default new ProductsView();
