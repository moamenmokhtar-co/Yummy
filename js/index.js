///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js";
import { getDetails } from "./get-display-details.js";
// ? =============> Global ===============>
let mealsArray;
// ! =============> When Start ===============>
// setTimeout(() => {
//     $('.loading').fadeOut(200, () => {
//         $('body').removeClass('overflow-hidden')
//         $('.loading').remove()
//     })
// }, 1000);









getMeal()

// * =============> Events ===============>




// ! =============> Functions ===============>






async function getMeal() {


    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    const raw = await response.json()
    mealsArray = raw.meals;
    displayMeals()




}


function displayMeals() {
    let cartoona = '';
    mealsArray.map(item => {

        const { idMeal, strMealThumb, strMeal } = item
        cartoona += `<div class="col-md-3">
                        <div class="item bg-danger rounded-2 position-relative overflow-hidden" data-idmeal="${idMeal}">
                            <img class="meal-image w-100 rounded-2" src=${strMealThumb} alt="">
                            <div class="layer position-absolute d-flex align-items-center p-3 rounded-2">
                                <p class="meal-name fs-1">${strMeal}</p>
                            </div>
                        </div>
                    </div>`


    })

    $('#rowData').html(cartoona)


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

