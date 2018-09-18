export var Contact;
(function (Contact) {
    class contact {
        contact(name, email, mobile, landline, website, address, id) {
            this.id = id ? id : 0;
            this.name = name ? name : null;
            this.email = email ? email : null;
            this.mobile = mobile ? mobile : null;
            this.landline = landline ? landline : null;
            this.website = website ? website : null;
            this.address = address ? address : null;
        }
    }
    Contact.contact = contact;
})(Contact || (Contact = {}));
//# sourceMappingURL=Contactjs.js.map