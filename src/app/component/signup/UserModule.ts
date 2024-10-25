export class USERModul {
    confirmPassword: any;
    constructor(
        public id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public about: string,
        public isChecked: boolean,
        public role: string = 'user' // Default role is user
    ) { }
}
