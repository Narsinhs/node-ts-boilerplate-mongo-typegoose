import { StripeClient } from "../configs/stripe";
import Stripe from "stripe";
import { NotFoundError, BadRequestError } from "routing-controllers";

export  function DeleteSubscriptionFromStripe(SubscriptionId) {
    return new Promise(async(resolve,reject)=>{
        try {
            const plan: Stripe.IDeleteConfirmation = await StripeClient.GetInstance().plans.del(SubscriptionId);
            return resolve(true);
        }catch(e) {
            throw new NotFoundError("No Plan found on stripe dashboard or something went wrong.");
        }
    }) 
}
//to handle currency and interval in enums (kuch acha sochna h is per)
export function AddSubscriptionOnStripe(amount:number,interval :string,name :string,currency : string) : Promise<string> { //amount tobe convert in cents
    return new Promise(async(resolve,reject) => {
        try {
            const Stripe :Stripe = StripeClient.GetInstance();
            const amountInCents = Number((amount*100).toFixed(2))
            const plan:Stripe.plans.IPlan = await Stripe.plans.create({
                amount_decimal: amountInCents,
                currency: currency,
                interval: interval as Stripe.plans.IntervalUnit,
                nickname: name,
                product: {
                    name: name
                },
            })
            return resolve(plan.id)
        } catch(e) {
            throw new BadRequestError("Please Verify Input")
        }
    })
}
export function AddCustomerToStripe (email:string , source :string) : Promise<Stripe.customers.ICustomer>{ 
    return new Promise(async (resolve,reject)=>{
        try {
            const stripe:Stripe = StripeClient.GetInstance();
            const stripeCustomer:Stripe.customers.ICustomer = await stripe.customers.create({email, source});
            return resolve(stripeCustomer)
        } catch(e) {
            throw e;
        }

    })
}
export function UpdateStripeCustomerCard (stripeCustomerId : string, source  :string) : Promise<Stripe.customers.ICustomer> {
    return new Promise(async (resolve,reject)=>{
        try {
            const stripe:Stripe = StripeClient.GetInstance();
            const stripeCustomer:Stripe.customers.ICustomer = await stripe.customers.update(stripeCustomerId, {source});
            return resolve(stripeCustomer)
        } catch(e) {
            throw e;
        }
    })
}

export function AddSubscriptionCustomer(stripeCustomer : string, stripePlanId) :Promise<Stripe.subscriptions.ISubscription> {
    return new Promise(async(resolve,reject) => { 
        try { 
            const Stripe :Stripe= await StripeClient.GetInstance();
            const stripeSubscription  : Stripe.subscriptions.ISubscription = await Stripe.subscriptions.create({
                customer : stripeCustomer,
                items : [{
                    plan : stripePlanId
                }]
            })
            resolve(stripeSubscription);
        } catch (e) {
            reject(e);
        }
    })
}
export function UpdateSubscriptionCustomer ( stripeSubscriptionId :  string , stripePlanId : string)  :Promise<Stripe.subscriptions.ISubscription> { 
    return new Promise(async(resolve,reject) => { 
        try { 
            const Stripe :Stripe= await StripeClient.GetInstance();
            const stripeSubscription : Stripe.subscriptions.ISubscription = await Stripe.subscriptions.update(stripeSubscriptionId
                ,{
                    plan : stripePlanId,
                    prorate : true
                })
            resolve(stripeSubscription);
        } catch (e) {
            reject(e);
        }
    })
}