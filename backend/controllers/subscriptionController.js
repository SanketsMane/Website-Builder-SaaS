const { PrismaClient } = require('@prisma/client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// @desc    Create Stripe Checkout Session for Pro Plan
// @route   POST /api/subscriptions/create-checkout-session
// @access  Private
const createCheckoutSession = async (req, res) => {
    const userId = req.user.id;
    const userEmail = req.user.email;

    try {
        // Check if user already has a stripe customer ID, if not create one
        let user = await prisma.user.findUnique({
            where: { id: userId },
            include: { subscription: true },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let customerId = user.subscription?.stripeId;

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: userEmail,
                metadata: { userId: userId },
            });
            customerId = customer.id;

            // Create initial subscription record
            await prisma.subscription.create({
                data: {
                    userId: userId,
                    stripeId: customerId,
                    status: 'INACTIVE',
                    plan: 'FREE',
                },
            });
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID, // Create this in Stripe Dashboard
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/dashboard/subscription?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}/dashboard/subscription?canceled=true`,
            metadata: {
                userId: userId,
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        res.status(500).json({ message: 'Server error creating checkout session' });
    }
};

// @desc    Create Customer Portal Session
// @route   POST /api/subscriptions/create-portal-session
// @access  Private
const createPortalSession = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { subscription: true },
        });

        if (!user || !user.subscription?.stripeId) {
            return res.status(400).json({ message: 'No subscription found' });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: user.subscription.stripeId,
            return_url: `${process.env.FRONTEND_URL}/dashboard/subscription`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Portal Error:', error);
        res.status(500).json({ message: 'Server error creating portal session' });
    }
};

// @desc    Handle Stripe Webhooks
// @route   POST /api/subscriptions/webhook
// @access  Public
const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Signature Verification Failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const userId = parseInt(session.metadata.userId);

                // Update user plan to PRO
                await prisma.user.update({
                    where: { id: userId },
                    data: { plan: 'PRO' },
                });

                // Update subscription status
                const subscription = await prisma.subscription.findFirst({
                    where: { userId: userId },
                });

                if (subscription) {
                    await prisma.subscription.update({
                        where: { id: subscription.id },
                        data: {
                            status: 'ACTIVE',
                            plan: 'PRO'
                        }
                    });
                }
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                // Find user by stripe customer ID
                // In a real app, you'd want to map stripe subscription ID to your DB
                // For now, we rely on the customer ID which we stored
                const dbSub = await prisma.subscription.findFirst({
                    where: { stripeId: subscription.customer }
                });

                if (dbSub) {
                    const status = subscription.status === 'active' ? 'ACTIVE' : 'INACTIVE';
                    const plan = subscription.status === 'active' ? 'PRO' : 'FREE';

                    await prisma.subscription.update({
                        where: { id: dbSub.id },
                        data: { status, plan }
                    });

                    await prisma.user.update({
                        where: { id: dbSub.userId },
                        data: { plan }
                    });
                }
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const dbSub = await prisma.subscription.findFirst({
                    where: { stripeId: subscription.customer }
                });

                if (dbSub) {
                    await prisma.subscription.update({
                        where: { id: dbSub.id },
                        data: { status: 'INACTIVE', plan: 'FREE' }
                    });

                    await prisma.user.update({
                        where: { id: dbSub.userId },
                        data: { plan: 'FREE' }
                    });
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Webhook Handler Error:', error);
        return res.status(500).send('Webhook Handler Error');
    }

    res.send();
};

module.exports = {
    createCheckoutSession,
    createPortalSession,
    handleWebhook,
};
