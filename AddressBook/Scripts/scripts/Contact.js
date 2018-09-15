"use strict";
exports.__esModule = true;
/// <reference path="typings/jquery/jquery.d.ts" />
var $ = require("jquery");
var contact = /** @class */ (function () {
    function contact(args) {
        this.id = args ? args.id : 0;
        this.name = args ? args.name : null;
        this.email = args ? args.email : null;
        this.mobile = args ? args.mobile : null;
        this.landline = args ? args.landline : null;
        this.website = args ? args.website : null;
        this.address = args ? args.address : null;
    }
    return contact;
}());
function reset() {
    // (<HTMLInputElement>document.getElementsByClassName("name")[0]).innerHTML = "done";
    document.getElementsByClassName("name")[0].innerHTML = "done";
    document.getElementsByClassName("email")[0].innerHTML = "";
    document.getElementsByClassName("mobile")[0].innerHTML = "";
    document.getElementsByClassName("landline")[0].innerHTML = "";
    document.getElementsByClassName("website")[0].innerHTML = "";
    document.getElementsByClassName("address")[0].innerHTML = "";
    document.getElementsByClassName("contact-name")[0].innerHTML = "*";
    document.getElementsByClassName("contact-email")[0].innerHTML = "*";
    document.getElementsByClassName("contact-mobile")[0].innerHTML = "*";
    document.getElementsByClassName("contact-website")[0].innerHTML = "*";
    alert("got into reset");
    document.getElementsByClassName(".user-data")[0].classList.remove("selected-data");
}
var activeContactId;
function add() {
}
function isDataValid(fieldId, message, errorId, regExp, regExpMessage) {
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
window.onload = function () {
    //document.getElementsByClassName("contact-information")[0].classList.add("hide");
    //document.getElementsByClassName("form")[0].classList.add("hide");
    //document.getElementsByClassName("update")[0].classList.add("hide");
    //var btn = document.getElementsByClassName("cancel")[0];
    //btn.addEventListener("click", (e: Event) => this.reset());
    $(".add").on('click', function () {
        alert("add is clicked");
    });
    $(".name").keyup(function () {
        isDataValid('.name', "Name is Required", ".contact-name");
    });
    $(".email").keyup(function () {
        var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        isDataValid('.email', "Email is Required", ".contact-email", regExp, "Enter Valid Email");
    });
    $(".website").keyup(function () {
        var regExp = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        isDataValid('.website', "Website is Required", ".contact-website", regExp, "Enter Valid Website");
    });
    $(".mobile").keyup(function () {
        var numExp = /^[0-9-()+]+$/;
        isDataValid('.mobile', "Number is Required", ".contact-mobile", numExp, "Enter Valid Number");
    });
    //let element: HTMLElement = document.getElementsByClassName('cancel')[0] as HTMLElement;
    //var obj = reset();
    //alert("hello");
    //var btn = <HTMLInputElement>document.getElementById("cancel");
    //btn.style.visibility = "hidden";
    //btn.click = function () {
    //    alert("cancel");
    //}
    //btn.click = function () {
    //    alert("hello cancel");
    //}
    //btn.addEventListener("click", function () {
    //    alert("cancel");
    //});
    ////element.onclick = function () {
    //    obj.reset();
    //}
};
//# sourceMappingURL=Contact.js.map