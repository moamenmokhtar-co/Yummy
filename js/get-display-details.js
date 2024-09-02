// const idMeal = localStorage.getItem('idMeal')
// let searchActive = localStorage.getItem('searchActive')


export async function getDetails(idMeal) {



    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const details = await response.json();
    const specificallyMeal = details.meals[0]

    displayDetails(specificallyMeal)


}

function displayDetails(specificallyMeal) {


    const { strMealThumb, strMeal, strInstructions, strArea, strCategory, strTags, strSource, strYoutube } = specificallyMeal

    // To Get And Add Recipes (strIngredient1,2,3,4,5 =>20)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = specificallyMeal[`strIngredient${i}`];
        if (ingredient) {

            ingredients.push(ingredient)
        }
    }
    // To Create <P> Includes All Recipes Words Form IngredientsArray I created before And Put It In CARTOONA
    let recipesCartoona = '';
    let tagsCartoona = '';

    for (let j = 0; j < ingredients.length; j++) {
        recipesCartoona += `<p class="p-2 bg-info-subtle text-dark rounded-1 me-2">${ingredients[j]}</p>`
    }

    // Ask If Tags Existing Or Not
    if (strTags) {
        const tagsArray = strTags.split(',')
        tagsArray.map((item) => {

            tagsCartoona += `<p class="p-2 bg-danger-subtle text-dark rounded-1 me-2">${item}</p>`
        })
    }
    else {
        tagsCartoona = '';
    }


    const detailsSection = `<section class="details position-fixed top-0 start-0 end-0">
            <section class="py-5 d-flex align-items-center">
                <div class="container position-relative">
                    <div id="mealDetails" class="row g-4 ">
                        <div class="col-md-4">
                            <div class="left-side rounded-2 position-relative overflow-hidden">
                                <img class="meal-image w-100 rounded-2" src=${strMealThumb} alt="">
                                <h3 class="text-white">${strMeal}</h3>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="right-side text-white">
                                <h4 class="fs-1">Instructions</h4>
                                <p id="instructionsDetail">${strInstructions}</p>
                                <p><span class="fw-bold fs-3">Area: </span><span class="fs-4">${strArea}</span></p>
                                <p><span class="fw-bold fs-3">Category: </span><span class="fs-4">${strCategory}</span></p>
                                <p class="fw-bold fs-3">Recipes:</p>
                                <div class="recipes-detail d-flex flex-wrap">
                                ${recipesCartoona}
                                </div>
                                <p class="fw-bold fs-3">Tags:</p>
                                <div class="tags-detail d-flex mb-3">
                                ${tagsCartoona}
                                </div>
                                <a href="${strSource}" target="_blank" type="button"class="btn btn-success py-2 px-4 rounded-3">Source</a>
                                <a href="${strYoutube}" target="_blank" type="button"class="btn btn-danger py-2 px-4 rounded-3">Youtube</a>
                            </div>
                        </div>

                    </div>
                    <i id="closeDetails" class="fa-brands fa-mixer position-absolute end-0 top-0 text-danger fs-2 px-4"></i>

                </div>
            </section>
        </section>`
    $('main').after(detailsSection);



    if ($('.search-layer').attr('data-searchactive')) {
        $('.details').css('margin-left', '0')
    }
    if ($('.navbar-col').attr('data-active') == 'true') {
        $('.details').css('margin-left', '20rem')
    }


    $('#closeDetails').on('click', () => {

        closeDetails()

    })
}

export function closeDetails() {
    $('.details').remove()

    $('body').removeClass('overflow-hidden')
}