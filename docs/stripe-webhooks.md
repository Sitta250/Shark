# Stripe Webhook — Local Testing

> **Status: Not yet connected.**
> Stripe is scaffolded but not configured. All users currently receive the **Starter** plan by default via a mock in `lib/billing/actions.ts → getSubscription()`. Restore the real DB query and fill in `.env.local` when ready to connect Stripe.

---

## 1. Install the Stripe CLI

```bash
brew install stripe/stripe-cli/stripe
stripe login
```

## 2. Forward webhooks to your local server

Start your dev server first (`npm run dev`), then in a separate terminal:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI will print a webhook signing secret like:
```
> Ready! Your webhook signing secret is whsec_... (^C to quit)
```

Copy that value into `.env.local`:

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

Restart the dev server after updating the env var.

## 3. Trigger test events

In a third terminal, trigger events manually:

```bash
# Simulate a completed checkout
stripe trigger checkout.session.completed

# Simulate a subscription update
stripe trigger customer.subscription.updated

# Simulate a cancellation
stripe trigger customer.subscription.deleted
```

Or go through the actual checkout flow using Stripe's test card:
- Card number: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits

## 4. Configure Stripe products

Create products and prices in the Stripe dashboard (test mode), then set the price IDs in `.env.local`:

```
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

For the billing portal to work you also need to enable it in the Stripe dashboard:
**Stripe Dashboard → Billing → Customer portal → Activate portal link**

## 5. Production setup

In production, register the webhook endpoint in the Stripe dashboard:
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Events to listen for:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

Copy the live webhook signing secret from the dashboard into your production env vars.
