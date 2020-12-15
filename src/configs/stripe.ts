import Stripe from "stripe";
const secret = process.env.STRIPE_SECRETKEY;

export class StripeClient {
    public static GetInstance() {
        if (this.client == null) {
            this.client = new Stripe(process.env.STRIPE_SECRETKEY);
            }
        return this.client;
    }
    private static client: Stripe;
    private constructor() {
    }
}
