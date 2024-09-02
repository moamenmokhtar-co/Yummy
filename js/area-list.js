///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js"
import { getDetails } from "./get-display-details.js"
// ? =============> Global ===============>
// ! =============> When Start ===============>
const areaName = localStorage.getItem('selectedArea')
getAreaList()
// * =============> Events ===============>



// ! =============> Functions ===============>

async function getAreaList() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    const areasList = await response.json()
    const areaListArray = areasList.meals
    displayAreaList(areaListArray);
    // console.log(areaListArray);
}



function displayAreaList(areaListArray) {
    let areaListCartoona = '';


    areaListArray.map(item => {

        const { idMeal, strMeal, strMealThumb } = item;
        areaListCartoona += `<div class="col-md-3">
                        <div class="item bg-danger rounded-2 position-relative overflow-hidden" data-idmeal="${idMeal}">
                            <img class="meal-image w-100 rounded-2" src=${strMealThumb} alt="">
                            <div class="layer position-absolute d-flex align-items-center p-3 rounded-2">
                                <p class="meal-name fs-1">${strMeal}</p>
                            </div>
                        </div>
                    </div>`


    })

    $('#rowData').html(areaListCartoona)




    $('.item').on('click', (e) => {

        const idMeal = $(e.currentTarget).attr('data-idmeal')
        localStorage.setItem('idMeal' , idMeal)
        getDetails(idMeal)
    })
}
// ? =============> Shared Functions ===============>
toggleNavbar()

redirectPage()

homePage()
//! =============> Authentication ===============>
