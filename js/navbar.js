///    <reference types='../@types/jquery'/>
import { getDetails, closeDetails } from "./get-display-details.js";


let active = false;
let searchStatus = 'byName';

export function toggleNavbar() {
    $('#iconChange').on('click', () => {
        iconChange()

    })
}


function iconChange() {
    if (active == false) {
        $('.navbar-col').animate({ left: '15rem' }, 400)
        $('.nav-menu').animate({ left: '0' }, 400)
        $('main').animate({ marginLeft: '20rem' }, 400)
        $('.details').animate({ marginLeft: '20rem' }, 400)

        $('#iconChange').toggleClass('fa-solid fa-brands')
        $('#iconChange').toggleClass('fa-bars fa-mixer')

        $('.nav-menu ul li:nth-child(1)').animate({ top: '0' }, 400)
        $('.nav-menu ul li:nth-child(2)').animate({ top: '0' }, 500)
        $('.nav-menu ul li:nth-child(3)').animate({ top: '0' }, 600)
        $('.nav-menu ul li:nth-child(4)').animate({ top: '0' }, 700)
        $('.nav-menu ul li:nth-child(5)').animate({ top: '0' }, 800)

        active = true;
        $('.navbar-col').attr('data-active', 'true')
    }

    else {
        $('.navbar-col').animate({ left: '0' }, 400)
        $('.nav-menu').animate({ left: '-15rem' }, 400)
        $('main').animate({ marginLeft: '5rem' }, 400)
        $('.details').animate({ marginLeft: '5rem' }, 400)

        $('#iconChange').toggleClass('fa-solid fa-brands')
        $('#iconChange').toggleClass('fa-bars fa-mixer')

        $('.nav-menu ul li').animate({ top: '230px' }, 500)

        active = false;
        $('.navbar-col').attr('data-active', 'false')

    }
}


export function redirectPage() {
    $('li a').on('click', (e) => {

        const idLink = e.target.id;
        if (idLink == 'search') {



            if ($('.details')) {
                closeDetails()
            }


            const filterList = `<ul id="filterList" class="bg-white position-absolute rounded-2 mb-0 text-center list-unstyled z-2">
                                <li id="byName" class=" py-3 rounded-2 position-relative">By Name</li>
                                <li id="byLetter" class=" py-3 rounded-2 position-relative">By Letter</li>
                            </ul>`

            const searchSection = `<div class="search-layer overflow-hidden" data-searchactive="true">
        <div class="container position-relative d-none ">

            <div class=" row search-input position-relative justify-content-center py-md-4 py-2 gy-2">
            <div class="col-md-12 text-end">
                <i id="closeSearch" class="fa-brands fa-mixer text-danger fa-2xl ms-auto"></i>
            </div>
                <div class="col-md-9">
                    <div class="input-container position-relative">
                        <i class="fa-solid fa-magnifying-glass position-absolute"></i>
                        <input id="searchInput" type="text" placeholder="Search By Name"
                            class="form-control rounded-start-5 rounded-end-0">
                        <div class="position-absolute end-0 top-0 h-100">
                            <div id="filterBtn" class="bg-transparent button btn rounded-0 h-100 text-dark border-0 border-start d-flex gap-1 justify-content-center align-items-center">
                                <p id="filter" class="mb-0">By Name</p>
                                <i id="filterArrow" class="fa-solid fa-chevron-down"></i>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>



            <div id="rowSearched" class="row g-4">

            </div>
        </div>
    </div>`

            $('body').css('overflow', 'hidden')

            $('main').after(searchSection)



            iconChange()
            $('.search-layer').animate({ bottom: '80px' }, 300, () => {
                $('.search-layer').animate({ bottom: '0' }, 200, () => {
                    $('.search-layer').animate({ bottom: '60px' }, 200, () => {
                        $('.search-layer').animate({ bottom: '0' }, 200, () => {
                            $('.search-layer').animate({ bottom: '30px' }, 200, () => {
                                $('.search-layer').animate({ width: '30px', height: '30px' }, 80, () => {

                                    $('.search-layer').animate({ bottom: '0', 'border-radius': '0', width: '100%', height: '100%', left: 0 }, 80, () => {
                                        $('.search-layer .container').toggleClass('d-none d-block')
                                        $('.search-layer .container').animate({ top: '3%' }, 900)
                                    })

                                    $('.search-layer').toggleClass('overflow-hidden overflow-auto')


                                })
                            })
                        })
                    })
                })
            })


            // To Close
            $('#closeSearch').on('click', () => {
                $('body').css({ overflow: 'auto' })

                $('.search-layer').remove()

            })


            let filterActive = false;

            // Press filterBtn
            $('#filterBtn').on('click', () => {

                if (!filterActive) {
                    $('#filterBtn').after(filterList);
                    $('#filterArrow').css('transform', 'rotate(180deg)')
                    filterActive = true;
                }
                else {
                    $('#filterArrow').css('transform', 'rotate(0deg)')
                    $('#filterList').remove()
                    filterActive = false;
                }

            })


            // filterList Options
            $('#filterList li').addClass('br-left')
            $(document).on('click', '#filterList', e => {
                searchStatus = $(e.target).attr('id')
                if (searchStatus == 'byName') {
                    $('#searchInput').val('').attr('placeholder', 'Search By Name').removeAttr('maxlength')
                    $('#filterList li').removeClass('br-left')
                    $(`#${searchStatus}`).addClass('br-left')
                    $('#filter').text('By Name')

                }
                else {
                    $('#searchInput').val('').attr({ 'placeholder': 'Taype The First Letter', 'maxlength': '1' })

                    $('#filterList li').removeClass('br-left')
                    $(`#${searchStatus}`).addClass('br-left')
                    $('#filter').text('By Letter')
                    console.log('hello');
                }
                $('#filterArrow').css('transform', 'rotate(0deg)')
                $('#filterList').remove()
                filterActive = false;


            })














        }
        else {
            window.location.href = `./${idLink}.html`

        }
    })
}


export function homePage() {
    $('.logo').on('click', () => {
        window.location.href = `./index.html`
    })
}







/*
<ul id="filterList" class="bg-white position-absolute rounded-2 mb-0 text-center list-unstyled z-2 d-none">
                                <li class=" py-3 rounded-2">By Name</li>
                                <li class=" py-3 rounded-2">By Latter</li>
                            </ul>
*/


let searchedWord = '';
$(document).on('input', '#searchInput', () => {
    searchedWord = $('#searchInput').val()

    if (searchedWord) {
        getSerach()
    }



})


async function getSerach() {
    let url;

    if (searchStatus == 'byName') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedWord}`
    }
    else {

        // If User Pretend Smart And Was Delete maxlength Atrr from HTML
        if (searchedWord.length > 0) {
            searchedWord = searchedWord.slice(0, 1);
        }

        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchedWord}`
    }


    try {
        const response = await fetch(url)
        const search = await response.json()
        const searchArray = search.meals
        displaySearch(searchArray)

    } catch (error) {
        error = 'Not Found'
        $('#rowSearched').html(error)

    }


}



function displaySearch(searchArray) {
    let cartoona = '';
    searchArray.map(item => {

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

    $('#rowSearched').html(cartoona)


    $('.item').on('click', (e) => {
        let idMeal = $(e.currentTarget).attr('data-idmeal')
        localStorage.setItem('idMeal', idMeal)
        getDetails(idMeal)

        $('body').addClass('overflow-hidden')


    })
}