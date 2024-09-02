///    <reference types='../@types/jquery'/>
import { toggleNavbar, redirectPage, homePage } from "./navbar.js";

// ? =============> Global ===============>
// ! =============> When Start ===============>
// * =============> Events ===============>



$('input').on('input', e => {
    const value = $(e.target).val();
    const currentInputId = e.target.id;
    validation(value, currentInputId)


})


// ! =============> Functions ===============>
function validation(value, currentInputId) {

    const regex = {
        'nameInput': /^[a-zA-Z\s]+$/,
        'emailInput': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'phoneInput': /^\d{10,13}$/,
        'ageInput': /^([1-9]|[1-9][0-9])$/,
        'passwordInput': /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'rePasswordInput': /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

    }



    const instantValid = regex[currentInputId].test(value);
    // Specificall Msg After Assign currentInputId
    const specificallMsg = {
        'nameInput': 'Special characters and numbers not allowed',
        'emailInput': 'Email not valid *exemple@yyy.zzz',
        'phoneInput': 'Enter valid Phone Number',
        'ageInput': 'Enter valid age',
        'passwordInput': 'Enter valid password *Minimum eight characters, at least one letter and one number:*',
        'rePasswordInput': 'Enter valid repassword',
    }
    const msgRaw = `<div class="alert alert-danger mt-1 p-2">${specificallMsg[currentInputId]}</div>`
    if (instantValid == true) {
        $(`#${currentInputId}`).attr('data-valid', 'false');

        $(`#${currentInputId}+.alert`).remove()

        return true;
    }
    else {
        if ($(`#${currentInputId}`).attr('data-valid') == 'false') {
            $(`#${currentInputId}`).after(msgRaw)
            $(`#${currentInputId}`).attr('data-valid', 'true');
        }

        return false;
    }



}
// ? =============> Shared Functions ===============>

toggleNavbar()

redirectPage()

homePage()
//! =============> Authentication ===============>
