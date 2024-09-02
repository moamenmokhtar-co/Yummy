///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js";
// ? =============> Global ===============>
// ! =============> When Start ===============>
getAreas()
// * =============> Events ===============>



// ! =============> Functions ===============>


async function getAreas() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const areas = await response.json();
    const areasArray = areas.meals
    // console.log(areasArray);
    displayAreas(areasArray)
}


function displayAreas(areasArray) {
    let areasCartoona = '';

    areasArray.map((item) => {
        const { strArea } = item;
        areasCartoona += `<div class="area-container col-lg-2 col-md-3 col-sm-4">
                        <div class="area rounded-5 position-relative text-center text-white  py-2 mx-auto"
                            data-areaName="${strArea.toLowerCase()}">
                            <i class="fa-solid fa-plane-departure fs-1"></i>
                            <h4 class="mb-0">${strArea}</h4>
                        </div>
                    </div>`;

        // console.log(item);
    })
    $('#rowData').html(areasCartoona)

    // After Areas Load in DOM 
    // Put Background For Each Country

    areasArray.map((item, index) => {
        $(`.area-container:nth-of-type(${index + 1}) i`).css({ 'background-image': `url(images/Flags/${index}.jpg` })
    })


    $('.area').on('click', (e)=> {

        const areaName = $(e.currentTarget).attr('data-areaName')
        localStorage.setItem('selectedArea' , areaName)
        window.location.href = './area-list.html'
    })


}










// ? =============> Shared Functions ===============>

toggleNavbar()

redirectPage()

homePage()
//! =============> Authentication ===============>
