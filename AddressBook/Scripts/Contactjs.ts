
export module Contact {
    export class contact {
        public id?: any;
        public name: any;
        public email: any;
        public mobile: any;
        public landline: any;
        public website: any;
        public address: any;
        contact(name: any, email: any, mobile: any, landline: any, website: any, address: any, id?: any): void {
            this.id = id ? id : 0;
            this.name = name ? name : null;
            this.email = email ? email : null;
            this.mobile = mobile ? mobile : null;
            this.landline = landline ? landline : null;
            this.website = website ? website : null;
            this.address = address ? address : null;
        }

    }

}
