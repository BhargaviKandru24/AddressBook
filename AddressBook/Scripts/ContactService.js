import { Contact } from "./Contactjs.js";
export var Ajax;
(function (Ajax) {
    class Options {
        constructor(url, method, data) {
            this.url = url;
            this.method = method || "get";
            this.data = data || {};
        }
    }
    Ajax.Options = Options;
    class Service {
        constructor() {
            this.request = (options, successCallback, errorCallback) => {
                var that = this;
                $.ajax({
                    url: options.url,
                    type: options.method,
                    data: options.data,
                    contentType: "application/json; charset=utf-8",
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
            };
            this.get = (url, successCallback, errorCallback) => {
                this.request(new Options(url), successCallback, errorCallback);
            };
            this.getWithDataInput = (url, data, successCallback, errorCallback) => {
                this.request(new Options(url, "get", data), successCallback, errorCallback);
            };
            this.postWithData = (url, data, successCallback, errorCallback) => {
                this.request(new Options(url, "post", data), successCallback, errorCallback);
            };
            this.putWithData = (url, data, successCallback, errorCallback) => {
                this.request(new Options(url, "put", data), successCallback, errorCallback);
            };
            this.delete = (url, successCallback, errorCallback) => {
                this.request(new Options(url, "delete"), successCallback, errorCallback);
            };
            this.showJqueryDialog = (message, title, height) => {
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
            };
        }
    }
    Ajax.Service = Service;
    class ContactService {
        init() {
            var service = new Ajax.Service();
            var url = "/API/Contact/";
            var options = new Ajax.Options(url);
            service.request(options, function (response) {
                $(".contact-container").empty();
                response.forEach(function (contact) {
                    $(".contact-container").append('<li class="user-data"  id=' + contact.Id + ' onclick="contactInformation()"><p>' + contact.Name + "</p><p>" + contact.Email + "</p><p>" + contact.Mobile + "</p></li>");
                });
                window.location.hash = "Contact/ViewContacts";
            }, function (response) {
                alert("Cannot View Contacts");
            });
        }
        addContact() {
            this.reset();
            $(".update").hide();
            $(".form").show();
            $(".add").show();
            $(".contact-information").hide();
            window.location.hash = "Contact/Add";
        }
        contactInformation(activeContactId) {
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
            }, function (response) {
                alert("cannot find the contact information");
            });
        }
        reset() {
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
        add(isFormValid) {
            if (isFormValid) {
                var myData = new Contact.contact;
                myData.contact(($(".name").val()), ($(".email").val()), ($(".mobile").val()), ($(".landline").val()), ($(".website").val()), ($(".address").val()));
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
        update(activeContactId) {
            var user = new Contact.contact;
            user.contact(($(".name").val()), ($(".email").val()), ($(".mobile").val()), ($(".landline").val()), ($(".website").val()), ($(".address").val()), activeContactId);
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
        edit(activeContactId) {
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
        delete(activeContactId) {
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
    Ajax.ContactService = ContactService;
})(Ajax || (Ajax = {}));
//# sourceMappingURL=ContactService.js.map