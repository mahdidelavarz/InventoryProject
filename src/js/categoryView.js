import Storage from "./storage.js";
const categoryTitle = document.querySelector("#categoryTitle");
const categoryDescription = document.querySelector("#categoryDescription");
const addCategoryBtn = document.querySelector("#addCategoryBtn");
let categoriesList = document.querySelector("#categories-list");


class CategoryView {
  constructor() {
    addCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {  
     e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryTitle.value = '';
    categoryDescription.value = '';
  }
  setApp(){
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList (){
    let options = `<option value="cars" >Select an option</option>`;
    this.categories.forEach(element => {
      options += `<option value="${element.title}" >${element.title}</option>`;
      categoriesList.innerHTML = options;
    });
  }
}

export default new CategoryView();