import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export const mailerAsyncOptions = {
    useFactory: () => ({
        transport: {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASSWORD,
            },
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
            template: {
                dir: process.cwd() + "/template/emails",
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        },
    }),
};
