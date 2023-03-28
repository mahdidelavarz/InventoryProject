import Storage from "./storage.js";
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#categories-list");
const addProductBtn = document.querySelector("#addProduct-btn");
const productsList = document.querySelector("#products-list");

class ProductsView {
  constructor() {
    addProductBtn.addEventListener("click", (e) => this.addProduct(e));
    this.product = [];
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
    this.createProductsList();
  }
  setApp(){
    this.product = Storage.getAllProducts();
  }
  createProductsList(){
    let result = '';
    this.product.forEach((item) => {
      // const selectedItem = Storage.getAllCategories().find((cat) => cat.id == item.category );
      result += ` <div class="w-full h-10 flex justify-between items-center mt-4">
       <span class="text-slate-300">${item.title}</span>
       <div class="w-64 h-full flex justify-between items-center">
         <span class="text-green-300">${new Date().toLocaleDateString('fa-IR')}</span>
         <span class="border border-slate-400 rounded-2xl text-slate-300 px-2 py-1">${item.category}</span>
         <span class="w-6 h-6 border-2 border-slate-200 bg-slate-500 text-slate-200 rounded-full p-1 flex justify-center items-center">${item.quantity}</span>
         <button class="border border-red-400 rounded-2xl text-red-300 px-2 py-1" data-id ="${item.id}">Delete</button>
       </div>
     </div>`

    });
    productsList.innerHTML = result; 
  }
}

export default new ProductsView();
