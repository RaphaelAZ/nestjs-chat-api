import { IsEmail, Length, Matches, IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @Length(3, 20, {
        message: 'Le nom d\'utilisateur doit contenir entre 3 et 20 caractères.',
    })
    @IsString({
        message: 'Le nom d\'utilisateur doit être une chaîne de caractères.',
    })
    username: string;

    @IsOptional()
    @IsString({
        message: 'L\'adresse email doit être une chaîne de caractères.',
    })
    @IsEmail(undefined, {
        message: 'Veuillez fournir une adresse email valide.',
    })
    email: string;
    
    @IsOptional()
    @Length(6, 100, {
        message: 'Le mot de passe doit contenir au moins 6 caractères.',
    })
    @IsString({
        message: 'Le mot de passe doit être une chaîne de caractères.',
    })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Le mot de passe doit contenir au moins 6 caractères, dont au moins une lettre et un chiffre.',
    })
    password: string;
}