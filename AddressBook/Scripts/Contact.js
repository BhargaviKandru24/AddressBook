function Contact(args) {
    this.id = args ? args.id : 0;
    this.name = args ? args.name : null;
    this.email = args ? args.email : null;
    this.mobile = args ? args.mobile : null;
    this.landline = args ? args.landline : null;
    this.website = args ? args.website : null;
    this.address = args ? args.address : null;
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

//reset the form
function reset() {
    $(".contact-form").find("input[type=text],textarea[type=text]").val("");
    $(".contact-form span").text("*");
    $(".user-data").removeClass("selected-data");
    $(".update").hide();
    $(".contact-information .name-container").text("");
    $(".contact-information .email-container").text("Email : ");
    $(".contact-information .mobile-container").text("Mobile : ");
    $(".contact-information .landline-container").text("LandLine : ");
    $(".contact-information .website-container").text("Website : ");
    $(".contact-information .address-container").text("Address : ");
}


$(document).ready(function () {
    var activeContactId;
    $(".update").hide();
    $(".contact-information").hide();
    $(".form").hide();
    init();

    //display all contacts
    function init() {
       
        $.ajax({
            type: "GET",
            url: "/API/Contact/", // the method we are calling
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        }).done(function (response) {
            $(".contact-container").empty();
            response.forEach(function (contact) {
                $(".contact-container").append('<li class="user-data"  id=' + contact.Id + '><p>' + contact.Name + "</p><p>" + contact.Email + "</p><p>" + contact.Mobile + "</p></li>");
            });
            window.location.hash = "Contact/ViewContacts";
        }).fail(function (response) {
            alert("Cannot View Contacts");
        });
    }

    //on clicking add on the navigation bar 
    $(".add-contact").click(function () {
        reset();
        $(".update").hide();
        $(".form").show();
        $(".add").show();
        $(".contact-information").hide();
        window.location.hash = "Contact/Add";
    });
    
    //validation of data on typing
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

    //on clicking add button on form validation and insertion.
    $(".add").click(function () {
        var isFormValid = true;
        var regwebExp = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                numExp = /^[0-9-+]+$/;

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
        if (isFormValid) {
            var myData = new Contact({
                name: ($(".name").val()), email: ($(".email").val()), mobile: ($(".mobile").val()), landline: ($(".landline").val()), website: ($(".website").val()), address: ($(".address").val())
            });

            $.ajax({
                type: "POST",
                url: "/api/Contact",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(myData),
                dataType: "json"
            }).done(function (response) {
                $(".name").val("");
                $(".email").val("");
                $(".mobile").val("");
                $(".landline").val("");
                $(".website").val("");
                $(".address").val("");
                init();
                alert("Contact is added");
            }).fail(function (msg) {
                alert("Cannot add Contact");
            });
        }
    });

    //on clicking contacts list the contact information should appear
    $(".contact-container").on("click", '.user-data', function () {
        if ($(this).attr("id")) {
            reset();
            $(".form").hide();
            activeContactId = this.id;
            $(".contact-information").show();
            $("#" + activeContactId).addClass("selected-data");
            window.location.hash = "Contact/" + activeContactId;
            $.ajax({
                type: "GET",
                url: "/API/Contact/" + activeContactId, // the method we are calling
                contentType: "application/json; charset=utf-8",
                dataType: "json",

            }).done(function (response) {
                $(".name-container").append(response.Name);
                $(".email-container").append(response.Email);
                $(".mobile-container").append(response.Mobile);
                $(".landline-container").append(response.Landline);
                $(".website-container").append(response.Website);
                $(".address-container").append(response.Address);
                $(".edit").attr("id", response.Id);
                $(".delete").attr("id", response.Id);
                alert("Your Contact information");
            }).fail(function (response) {
                alert("cannot find the contact information");
            });
        }
    });


    $(".contact-information").on("click", '.edit', function () {
        if ($(this).attr("id")) {
            activeContactId = this.id;
            $(".contact-information").hide();
            $(".add").hide();
            $(".form").show();
            $(".update").show();
            window.location.hash = "Contact/Edit/" + activeContactId ;
            $.ajax({
                type: "GET",
                url: "/API/Contact/" + activeContactId, // the method we are calling
                contentType: "application/json; charset=utf-8",
                dataType: "json",

            }).done(function (response) {
                $(".name").val(response.Name);
                $(".email").val(response.Email);
                $(".mobile").val(response.Mobile);
                $(".landline").val(response.Landline);
                $(".website").val(response.Website);
                $(".address").val(response.Address);
                $(".update").attr("id", response.Id);
            }).fail(function (response) {
                alert("Cannot get your contact details");
            });
        }
    });

    //update the data
    $(".update").click(function () {

        var user = new Contact({
            id: activeContactId,
            name: ($(".name").val()),
            email: ($(".email").val()),
            mobile: ($(".mobile").val()),
            landline: ($(".landline").val()),
            website: ($(".website").val()),
            address: ($(".address").val())
        });
        $.ajax({
            type: "PUT",
            url: "/API/Contact/", // the method we are calling
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(user),
        }).done(function (response) {
                alert("Contact is updated");
            }).fail(function (response) {
                alert("Cannot update the contact");
            })
        reset();
        $(".form").hide();
        init();
    });

    //cancel the editing
    $(".cancel").click(function () {
        reset();
        $(".add").show();
        $(".form").hide();
        window.location.hash = "Contact/ViewContacts";
    });


    //deleting the contact
    $(".contact-information").on("click", '.delete', function () {
        reset();
        $.ajax({
            type: "DELETE",
            url: "/API/Contact/" + activeContactId, // the method we are calling
            contentType: "application/json; charset=utf-8",
            dataType: "json",

        }).done(function (response) {
            init();
            alert("contact is deleted");
        }).fail(function (response) {
            alert("Cannot delete the contact");
        });
         $(".contact-information").hide();

    });

});