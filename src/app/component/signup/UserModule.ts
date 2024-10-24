export class USERModul {
    confirmPassword: any;
    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public about: string,
        public isChecked: boolean
    ) { }
}
