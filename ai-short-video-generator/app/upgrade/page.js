"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Ninja",
      price: "₹100",
      period: "per month",
      description: "Perfect for getting started",
      features: ["Basic options", "100 stars", "Email support"],
      recommended: false,
    },
    {
      name: "Samurai",
      price: "₹500",
      period: "per month",
      description: "for generous use",
      features: [
        "Advanced prompting options",
        "500 stars",
        "Priority email support",
        "Community access",
      ],
      recommended: true,
    },
    {
      name: "Shogun",
      price: "₹1000",
      period: "per month",
      description: "Unlimited use",
      features: [
        "Advanced prompting options",
        "Unlimited Stars",
        "Priority email support",
        "24/7 phone support",
        "Custom integrations",
        "Community access",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Upgrade Your Account
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative rounded-xl shadow-md overflow-hidden transition-all duration-300 transform cursor-pointer ${
                selectedPlan === plan.name
                  ? "scale-105 shadow-2xl border-2 border-primary"
                  : "hover:scale-105 hover:shadow-xl"
              } ${plan.recommended ? "ring-2 ring-primary ring-offset-4" : ""}`}
            >
              {plan.recommended && (
                <Badge className="absolute top-4 right-4 bg-primary hover:bg-primary">
                  Recommended
                </Badge>
              )}

              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-bold text-center">
                  {plan.name}
                </CardTitle>
                <div className="mt-6 text-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <CardDescription className="text-center mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-8">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto">
                <Button
                  variant={selectedPlan === plan.name ? "default" : "outline"}
                  size="lg"
                  className="w-full py-6 text-2xl text-center"
                >
                  {selectedPlan === plan.name ? "Selected" : `${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Need help choosing?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our team is happy to help you select the right plan for your needs.
            Contact us at AiVideoCompany@gmail.com or call (123) 456-7890.
          </p>
          <Button variant="ghost" className="mt-6">
            Compare all features
          </Button>
        </div>
      </div>
    </div>
  );
}
