import { Contact } from "./Contactjs.js";
import { Ajax } from "./ContactService.js";

window.onload = () => {
    $(".update").hide();
    $(".contact-information").hide();
    $(".form").hide();
    var service = new Ajax.ContactService();
    service.init();
    
}
var activeContactId: number;
var service = new Ajax.ContactService();

$(".name").keyup(function () {
    isDataValid('.name', "Name is Required", ".contact-name");
});
$(".email").keyup(function () {
    var regExp: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    isDataValid('.email', "Email is Required", ".contact-email", regExp, "Enter Valid Email");
});
$(".website").keyup(function () {
    var regExp: any = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    isDataValid('.website', "Website is Required", ".contact-website", regExp, "Enter Valid Website");
});
$(".mobile").keyup(function () {
    var numExp: any = /^[0-9-()+]+$/;
    isDataValid('.mobile', "Number is Required", ".contact-mobile", numExp, "Enter Valid Number");
});

$(".add-contact").click(function () {
    service.addContact();
});

$(".add").click(function () {
    var isFormValid = true;
    var regwebExp: any = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        regExp: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        numExp: any = /^[0-9-+]+$/;

    $(".user-data").removeClass("selected-data");
    if (!isDataValid('.name', "Name is Required", ".contact-name")) {
        isFormValid = false;
    }

    if (!isDataValid('.email', "Email is Required", ".contact-email", regExp, "Enter Valid Email")) {
        isFormValid = false;
    }

    if (!isDataValid('.mobile', "Number is Required", ".contact-mobile", numExp, "Enter Valid Number")) {
        isFormValid = false;
    }
    if (!isDataValid('.website', "Website is Required", ".contact-website", regwebExp, "Enter Valid Website")) {
        isFormValid = false;
    }
    service.add(isFormValid);
});

$(".contact-container").on("click", '.user-data', function () {
    $(".contact-container").on("click", '.user-data', function () {
        if ($(this).attr("id")) {
            activeContactId = this.id;
            service.contactInformation(activeContactId);
        }
    });

});

$(".contact-information").on("click", '.edit', function () {
    service.edit(activeContactId);
});

$(".update").click(function () {
    service.update(activeContactId);
});

$(".cancel").click(function () {
    service.reset();
    $(".add").show();
    $(".form").hide();
    window.location.hash = "Contact/ViewContacts";
});

$(".contact-information").on("click", '.delete', function () {
    service.delete(activeContactId);
});

function isDataValid(fieldId: string, message: string, errorId: string, regExp?: any, regExpMessage?: string): boolean {
    var isValid = true;
    if ($(fieldId).val() == "") {
        $(errorId).text(message);
        isValid = false;
    }
    else {
        if ((regExp && !regExp.test($(fieldId).val()))) {
            $(errorId).text(regExpMessage);
            isValid = false;
        }
        else if ((regExp && $(fieldId).val().match(/^[0-9-+]/))) {
            if (($(fieldId).val().length != 10)) {

                $(errorId).text(regExpMessage);
                isValid = false;
            }
            else {
                $(errorId).text("*");
            }

        }
        else {
            $(errorId).text("*");
        }
    }
    return isValid;
}
