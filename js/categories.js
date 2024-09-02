///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js"
// ? =============> Global ===============>
// ! =============> When Start ===============>
getCategories()
// * =============> Events ===============>






// ! =============> Functions ===============>

async function getCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    const categories = await response.json()
    const categoriesArray = categories.categories

    displayCategories(categoriesArray)
}


function displayCategories(categoriesArray) {
    let categoriesCartoona = ``;
    categoriesArray.map(item => {

        const { strCategoryThumb, strCategory, strCategoryDescription } = item;

        categoriesCartoona += `<div class="col-md-3">
                        <div class="category bg-danger rounded-2 position-relative overflow-hidden" data-categoryName="${strCategory.toLowerCase()}">
                            <img class="meal-image w-100 rounded-2" src=${strCategoryThumb} alt="">
                            <div class="layer position-absolute text-center p-3 rounded-2">
                                <p class="meal-name fs-4 fw-bold mb-0">${strCategory}</p>
                                <p class="meal-description fs-6">${strCategoryDescription.split(' ').slice(1, 15).join(' ') + '...'}</p>
                            </div>
                        </div>
                    </div>`
    })

    $('#rowData').html(categoriesCartoona)


    $('.category').on('click', (e) => {
        const categoryName = $(e.currentTarget).attr('data-categoryname')

        localStorage.setItem('selectedCategory', categoryName)

        window.location.href = './category-list.html'
        
    })



}




// ? =============> Shared Functions ===============>


toggleNavbar()

redirectPage()

homePage()

//! =============> Authentication ===============>
// .toLowerCase()