module Ajax {
    export class Options {
        url: string;
        method: string;
        data: Object;
        constructor(url: string, method?: string, data?: Object) {
            this.url = url;
            this.method = method || "get";
            this.data = data || {};
        }
    }

    export class Service {
        public request = (options: Options, successCallback: Function, errorCallback?: Function): void => {
            var that = this;
            $.ajax({
                url: options.url,
                type: options.method,
                data: options.data,
                contentType : "application/json; charset=utf-8",
                cache: false,
                dataType: "json",
                success: function (d) {
                    successCallback(d);
                },
                error: function (d) {
                    if (errorCallback) {
                        errorCallback(d);
                        return;
                    }
                    var errorTitle = "Error in (" + options.url + ")";
                    var fullError = JSON.stringify(d);
                    console.log(errorTitle);
                    console.log(fullError);
                    that.showJqueryDialog(fullError, errorTitle);
                }
            });
        }
        public get = (url: string, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url), successCallback, errorCallback);
        }
        public getWithDataInput = (url: string, data: Object, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url, "get", data), successCallback, errorCallback);
        }
        public postWithData = (url: string, data: Object, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url, "post", data), successCallback, errorCallback);
        }
        public putWithData = (url: string, data: Object, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url, "put", data), successCallback, errorCallback);
        }
        public delete = (url: string, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url, "delete"), successCallback, errorCallback);
        }

        public showJqueryDialog = (message: string, title?: string, height?: number): void => {
            alert(title + "\n" + message);
            title = title || "Info";
            height = height || 120;
            message = message.replace("\r", "").replace("\n", "<br/>");
            $("<div title='" + title + "'><p>" + message + "</p></div>").dialog({
                minHeight: height,
                minWidth: 400,
                maxHeight: 500,
                modal: true,
                buttons: {
                    Ok: function () { $(this).dialog('close'); }
                }
            });
        }
    }
}

class contact {
    id?: number;
    name: any;
    email: any;
    mobile: any;
    landline: any;
    website: any;
    address: any;
    contact(name: string, email: string, mobile: number, landline: number, website: string, address: string, id?: number): void {
        this.id = id ? id : 0;
        this.name = name ? name : null;
        this.email = email ? email : null;
        this.mobile = mobile ? mobile : null;
        this.landline = landline ? landline : null;
        this.website = website ? website : null;
        this.address = address ? address : null;
    }

    init(): void {
        var service = new Ajax.Service();
        var url = "/API/Contact/";
        var options = new Ajax.Options(url);
        service.request(options, function (response) {
            $(".contact-container").empty();
            response.forEach(function (contact) {
                $(".contact-container").append('<li class="user-data"  id=' + contact.Id + '><p>' + contact.Name + "</p><p>" + contact.Email + "</p><p>" + contact.Mobile + "</p></li>");
            });
            window.location.hash = "Contact/ViewContacts";
        }, function (response) {
            alert("Cannot View Contacts");
        });
       
    }

    addContact(): void {
        this.reset();
        $(".update").hide();
        $(".form").show();
        $(".add").show();
        $(".contact-information").hide();
        window.location.hash = "Contact/Add";
    }

    contactInformation(activeContactId: number): void {
        this.reset();
        $(".form").hide();
        $(".contact-information").show();
        $("#" + activeContactId).addClass("selected-data");

        var service = new Ajax.Service();
        var url = "/API/Contact/" + activeContactId;
        var options = new Ajax.Options(url);
        service.request(options, function (response) {
            $(".name-container").append(response.Name);
            $(".email-container").append(response.Email);
            $(".mobile-container").append(response.Mobile);
            $(".landline-container").append(response.Landline);
            $(".website-container").append(response.Website);
            $(".address-container").append(response.Address);
            $(".edit").attr("id", response.Id);
            $(".delete").attr("id", response.Id);
            window.location.hash = "Contact/" + activeContactId;

        },function (response) {
            alert("cannot find the contact information");
        });

    }
    reset(): void {
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

    add(): void {
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
        if (isFormValid) {
            var myData = new contact;
            myData.contact(
                this.name = ($(".name").val()),
                this.email = ($(".email").val()),
                this.mobile = ($(".mobile").val()),
                this.landline = ($(".landline").val()),
                this.website = ($(".website").val()),
                this.address = ($(".address").val())
            );
            var service = new Ajax.Service();
            service.postWithData("/api/Contact", JSON.stringify(myData), function (response) {
                $(".name").val("");
                $(".email").val("");
                $(".mobile").val("");
                $(".landline").val("");
                $(".website").val("");
                $(".address").val("");
                $(".contact-container").append('<li class="user-data"  id=' + response.Id + '><p>' + response.Name + "</p><p>" + response.Email + "</p><p>" + response.Mobile + "</p></li>");

            }, function (msg) {
                alert("Cannot add Contact");
            });
 
        }
    }

    update(activeContactId: number): void {
        var user = new contact;
        user.contact(
            this.name = ($(".name").val()),
            this.email = ($(".email").val()),
            this.mobile = ($(".mobile").val()),
            this.landline = ($(".landline").val()),
            this.website = ($(".website").val()),
            this.address = ($(".address").val()),
            this.id = activeContactId
        );
        var service = new Ajax.Service();
        service.putWithData("/API/Contact/", JSON.stringify(user), function (response) {
            alert("Contact is updated");
            $("#" + user.id).replaceWith('<li class="user-data"  id=' + user.id + '><p>' + user.name + "</p><p>" + user.email + "</p><p>" + user.mobile + "</p></li>");
            window.location.hash = "Contact/ViewContacts";
        }, function (response) {
            alert("Cannot update the contact");
        });
       
        this.reset();
        $(".form").hide();
        this.init();
    }

    edit(activeContactId: number): void {
        $(".contact-information").hide();
        $(".add").hide();
        $(".form").show();
        $(".update").show();
        window.location.hash = "Contact/Edit/" + activeContactId;
        var service = new Ajax.Service();
        var url = "/API/Contact/" + activeContactId;
        var options = new Ajax.Options(url);
        service.request(options, function (response) {
            $(".name").val(response.Name);
            $(".email").val(response.Email);
            $(".mobile").val(response.Mobile);
            $(".landline").val(response.Landline);
            $(".website").val(response.Website);
            $(".address").val(response.Address);
        }, function (response) {
            alert("Cannot get your contact details");
        });
      
    }

    delete(activeContactId: number): void {
        this.reset();
        var service = new Ajax.Service();
        service.delete("/API/Contact/" + activeContactId, function (response) {
            alert("contact is deleted");
            window.location.hash = "Contact/ViewContacts";
            $("#" + activeContactId).remove();
        }, function (response) {
            alert("Cannot delete the contact");
        });
        
        $(".contact-information").hide();
    }
}


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

window.onload = () => {
    var activeContactId: number;
    $(".update").hide();
    $(".contact-information").hide();
    $(".form").hide();
    var userContact = new contact;
    userContact.init();

   

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


    //on clicking add on the navigation bar 
    $(".add-contact").click(function () {
        userContact.addContact();
    });

    $(".add").on('click', function () {
        userContact.add();
    });
   
   // function contactInformation(): void {
    $(".contact-container").on("click", '.user-data', function () {
        if ($(this).attr("id")) {
            activeContactId = this.id;
            userContact.contactInformation(activeContactId);
        }
    });

   // function edit(): void {
    $(".contact-information").on("click", '.edit', function () {
        if ($(this).attr("id")) {
            activeContactId = this.id;
            userContact.edit(activeContactId);

        }
    });

    //function update(): void {
    $(".update").click(function () {
        userContact.update(activeContactId);
    });

    //function cancel(): void {
    $(".cancel").click(function () {
        userContact.reset();
        $(".add").show();
        $(".form").hide();
        window.location.hash = "Contact/ViewContacts";
    });

    //function delete(): void {
    $(".contact-information").on("click", '.delete', function () {
        userContact.delete(activeContactId);
    });
}