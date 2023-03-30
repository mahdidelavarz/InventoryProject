import Storage from "./storage.js";
const categoryTitle = document.querySelector("#categoryTitle");
const categoryDescription = document.querySelector("#categoryDescription");
const addCategoryBtn = document.querySelector("#addCategoryBtn");
let categoriesList = document.querySelector("#categories-list");
const categoryToggleBtn = document.querySelector('#category-title');
const categoryWindow = document.querySelector('#category-window');
const cancelBtn = document.querySelector('#cancel-btn');


class CategoryView {
  constructor() {
    addCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    categoryToggleBtn.addEventListener('click' , (e) => this.openCategoryWindow(e));
    cancelBtn.addEventListener('click' , (e) => this.closeCategoryWindow(e));
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
    categoryWindow.classList.add('hidden');
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
  openCategoryWindow(e){
    categoryWindow.classList.remove('hidden');
  }
  closeCategoryWindow(e){
    categoryWindow.classList.add('hidden');
  }
}

export default new CategoryView();