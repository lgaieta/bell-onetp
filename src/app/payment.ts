import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
    accessToken: process.env.MPAGO_ACCESS_TOKEN!,
});

const preference = new Preference(client);

preference
    .create({
        body: {
            items: [
                {
                    title: "Mi producto",
                    quantity: 1,
                    unit_price: 2000,
                    id: "1",
                },
            ],
        },
    })
    .then(console.log)
    .catch(console.log);
