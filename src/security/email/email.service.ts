import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    public maskEmail(email: string): string {
        if (!email || email.length <= 1) {
            return '';
        }

        return email.replace(/^(.).*@(.).*(\..+)$/, '$1***@$2***$3');
    }
}
