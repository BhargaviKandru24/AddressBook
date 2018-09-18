import { Contact } from "./Contactjs.js";
export module Ajax {
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

    export class ContactService {
        public init(): void {
            var service = new Ajax.Service();
            var url = "/API/Contact/";
            var options = new Ajax.Options(url);
            service.request(options, function (response: any) {
                $(".contact-container").empty();
                response.forEach(function (contact: any) {
                    $(".contact-container").append('<li class="user-data"  id=' + contact.Id + ' onclick="contactInformation()"><p>' + contact.Name + "</p><p>" + contact.Email + "</p><p>" + contact.Mobile + "</p></li>");
                });
                window.location.hash = "Contact/ViewContacts";
            }, function (response: any) {
                alert("Cannot View Contacts");
            });

        }

        public addContact(): void {
            this.reset();
            $(".update").hide();
            $(".form").show();
            $(".add").show();
            $(".contact-information").hide();
            window.location.hash = "Contact/Add";
        }

        public contactInformation(activeContactId: number): void {
            this.reset();
            $(".form").hide();
            $(".contact-information").show();
            $("#" + activeContactId).addClass("selected-data");

            var service = new Ajax.Service();
            var url = "/API/Contact/" + activeContactId;
            var options = new Ajax.Options(url);
            service.request(options, function (response: any) {
                $(".name-container").append(response.Name);
                $(".email-container").append(response.Email);
                $(".mobile-container").append(response.Mobile);
                $(".landline-container").append(response.Landline);
                $(".website-container").append(response.Website);
                $(".address-container").append(response.Address);
                $(".edit").attr("id", response.Id);
                $(".delete").attr("id", response.Id);
                window.location.hash = "Contact/" + activeContactId;

            }, function (response: any) {
                alert("cannot find the contact information");
            });

        }
        public reset(): void {
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

        public add(isFormValid: boolean): void {
           
            if (isFormValid) {
                var myData = new Contact.contact;
                myData.contact(($(".name").val()),($(".email").val()),($(".mobile").val()),($(".landline").val()),($(".website").val()), ($(".address").val()) );
                var service = new Ajax.Service();
                service.postWithData("/api/Contact", JSON.stringify(myData), function (response: any) {
                    $(".name").val("");
                    $(".email").val("");
                    $(".mobile").val("");
                    $(".landline").val("");
                    $(".website").val("");
                    $(".address").val("");
                    $(".contact-container").append('<li class="user-data"  id=' + response.Id + '><p>' + response.Name + "</p><p>" + response.Email + "</p><p>" + response.Mobile + "</p></li>");

                }, function (msg: any) {
                    alert("Cannot add Contact");
                });

            }
        }

        public update(activeContactId: number): void {
            var user = new Contact.contact;
            user.contact(($(".name").val()),($(".email").val()), ($(".mobile").val()),($(".landline").val()), ($(".website").val()),($(".address").val()), activeContactId);
            var service = new Ajax.Service();
            service.putWithData("/API/Contact/", JSON.stringify(user), function (response: any) {
                alert("Contact is updated");
                $("#" + user.id).replaceWith('<li class="user-data"  id=' + user.id + '><p>' + user.name + "</p><p>" + user.email + "</p><p>" + user.mobile + "</p></li>");
                window.location.hash = "Contact/ViewContacts";
            }, function (response: any) {
                alert("Cannot update the contact");
            });

            this.reset();
            $(".form").hide();
            this.init();
        }

        public edit(activeContactId: number): void {
            $(".contact-information").hide();
            $(".add").hide();
            $(".form").show();
            $(".update").show();
            window.location.hash = "Contact/Edit/" + activeContactId;
            var service = new Ajax.Service();
            var url = "/API/Contact/" + activeContactId;
            var options = new Ajax.Options(url);
            service.request(options, function (response: any) {
                $(".name").val(response.Name);
                $(".email").val(response.Email);
                $(".mobile").val(response.Mobile);
                $(".landline").val(response.Landline);
                $(".website").val(response.Website);
                $(".address").val(response.Address);
            }, function (response: any) {
                alert("Cannot get your contact details");
            });

        }

        public delete(activeContactId: number): void {
            this.reset();
            var service = new Ajax.Service();
            service.delete("/API/Contact/" + activeContactId, function (response: any) {
                alert("contact is deleted");
                window.location.hash = "Contact/ViewContacts";
                $("#" + activeContactId).remove();
            }, function (response: any) {
                alert("Cannot delete the contact");
            });

            $(".contact-information").hide();
        }
    }
}

