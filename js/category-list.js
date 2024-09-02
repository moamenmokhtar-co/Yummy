///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js"
import { getDetails } from "./get-display-details.js"
// ? =============> Global ===============>
const categoryName = localStorage.getItem('selectedCategory')
getCategoryList()
// ! =============> When Start ===============>
// * =============> Events ===============>
// ! =============> Functions ===============>
async function getCategoryList() {

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    const categoryList = await response.json()
    const categoryListArray = categoryList.meals
    displayCategoryList(categoryListArray)
}

function displayCategoryList(categoryListArray) {

    let categoryListCartoona = '';

    categoryListArray.map(item => {

        const { idMeal, strMeal, strMealThumb } = item;
        categoryListCartoona += `<div class="col-md-3">
                            <div class="item bg-danger rounded-2 position-relative overflow-hidden" data-idmeal="${idMeal}">
                                <img class="meal-image w-100 rounded-2" src=${strMealThumb} alt="">
                                <div class="layer position-absolute d-flex align-items-center justify-content-center p-3 rounded-2">
                                    <p class="meal-name fs-4 fw-bold text-center text-danger-emphasis">${strMeal}</p>
                                </div>
                            </div>
                        </div>`

    })

    $('#rowDataa').html(categoryListCartoona)

    $('.item').on('click', (e) => {
        let idMeal = $(e.currentTarget).attr('data-idmeal')
        localStorage.setItem('idMeal', idMeal)
        getDetails(idMeal)

        $('body').addClass('overflow-hidden')


    })
}
// ? =============> Shared Functions ===============>



toggleNavbar()

redirectPage()

homePage()
//! =============> Authentication ===============>
