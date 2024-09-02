///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js";
// ? =============> Global ===============>
// ! =============> When Start ===============>
getIngredients()
// * =============> Events ===============>
// ! =============> Functions ===============>
async function getIngredients() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    const ingredients = await response.json()
    const ingredientsArray = ingredients.meals
    displayIngredients(ingredientsArray)
}


function displayIngredients(ingredientsArray) {
    let ingredientsCartoona = ``;

    ingredientsArray.slice(0, 20).map(item => {

        const { strIngredient, strDescription } = item;
        ingredientsCartoona += `<div class="col-md-4">
                        <div class="ingredient rounded-1 position-relative text-center p-2 h-100 w-75 mx-auto " data-ingredientName="${strIngredient.toLowerCase()}">
                            <i class="fa-solid fa-utensils fa-5x mb-2"></i>
                            <h4>${strIngredient}</h4>
                            <p>${strDescription.split(' ').slice(0, 15).join(' ')}...</p>
                        </div>
                    </div>`
    })

    $('#rowData').html(ingredientsCartoona)



    $('.ingredient').on('click', e => {
        const ingredientName = $(e.currentTarget).attr('data-ingredientName')
        localStorage.setItem('selectedIngredient', ingredientName)
        window.location.href = './ingredient-list.html'
    })
}




// ? =============> Shared Functions ===============>

toggleNavbar()

redirectPage()

homePage()
//! =============> Authentication ===============>
