export class USERModul {
    confirmPassword: any;
    constructor(
        public id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public isChecked: boolean
    ) { }
}
