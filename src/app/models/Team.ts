export interface Team {
    key?:string;
    name?:string;
    desc?:string;
    author_name?:string;
    author_key?:string;
    roles?: [
        {
            role_name?:string;
            role_desc?:string;
            role_color?:string;
            role_available?:boolean;
        }
    ],
    accepted?: any[]
}