///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js";
import { getDetails } from "./get-display-details.js";
// ? =============> Global ===============>
// ! =============> When Start ===============>
const ingredientName = localStorage.getItem('selectedIngredient');
getIngredientList(ingredientName)
// * =============> Events ===============>
// ! =============> Functions ===============>
async function getIngredientList(ingredientName) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    const ingredientList = await response.json()
    const ingredientListArray = ingredientList.meals
    displayIngredientList(ingredientListArray)
}


function displayIngredientList(ingredientListArray) {
    let ingredientListCartoona = ``;


    ingredientListArray.map(item => {

        const { idMeal, strMeal, strMealThumb } = item;
        ingredientListCartoona += `<div class="col-md-3">
                            <div class="item bg-danger rounded-2 position-relative overflow-hidden" data-idmeal="${idMeal}">
                                <img class="meal-image w-100 rounded-2" src=${strMealThumb} alt="">
                                <div class="layer position-absolute d-flex align-items-center p-3 rounded-2">
                                    <p class="meal-name fs-3">${strMeal}</p>
                                </div>
                            </div>
                        </div>`
    })

    $('#rowData').html(ingredientListCartoona)



    $('.item').on('click', e => {
        const idMeal = $(e.currentTarget).attr('data-idMeal');
        localStorage.setItem('idMeal' , idMeal)
        getDetails(idMeal)
        // console.log(idMeal);
    })
}
// ? =============> Shared Functions ===============>

toggleNavbar()

redirectPage()

homePage()
//! =============> Authentication ===============>
