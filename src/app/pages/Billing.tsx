import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { DevAnnotation } from "../components/DevAnnotation";
import { Badge } from "@/app/components/ui/badge";

const plans = [
    {
        name: "Starter",
        price: "$0",
        features: ["5 Documents/mo", "Basic OCR", "Standard Support"],
        current: false
    },
    {
        name: "Pro",
        price: "$29",
        features: ["50 Documents/mo", "Advanced OCR + Tables", "Priority Support", "API Access"],
        current: true,
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["Unlimited Documents", "Custom Models", "Dedicated Manager", "SLA"],
        current: false
    }
];

export function BillingPage() {
  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Billing & Plans</h2>
                <p className="text-muted-foreground">Manage your subscription and usage.</p>
            </div>
            <DevAnnotation 
                title="Get Plans"
                method="GET"
                endpoint="/api/billing/plans"
                response={plans}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
                <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? 'border-indigo-600 shadow-lg scale-105' : ''}`}>
                    {plan.popular && (
                        <div className="absolute top-0 right-0 -mt-2 -mr-2">
                             <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">
                                Most Popular
                             </span>
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            {plan.name}
                            {plan.current && <Badge variant="secondary">Current</Badge>}
                        </CardTitle>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center text-sm">
                                    <Check className="h-4 w-4 text-green-500 mr-2" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full flex items-center justify-between gap-2">
                            <Button className="w-full" variant={plan.current ? "outline" : "default"}>
                                {plan.current ? "Manage Plan" : "Upgrade"}
                            </Button>
                            {!plan.current && (
                                <DevAnnotation 
                                    title="Subscribe"
                                    method="POST"
                                    endpoint="/api/billing/subscribe"
                                    payload={{ planId: plan.name.toLowerCase() }}
                                    response={{ subscriptionId: "sub_123", status: "active" }}
                                />
                            )}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-100 p-2 rounded">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-semibold">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/28</p>
                        </div>
                    </div>
                    <Button variant="ghost">Edit</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
