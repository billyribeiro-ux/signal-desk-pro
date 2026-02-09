"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";
import { apiClient } from "@/lib/api/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Check, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface PlanInfo {
  id: string;
  name: string;
  price: string;
  features: string[];
  limits: { clients: number; projects: number; members: number };
}

const PLANS: PlanInfo[] = [
  {
    id: "STARTER",
    name: "Starter",
    price: "$29/mo",
    features: ["Up to 10 clients", "20 projects", "3 team members", "Email support"],
    limits: { clients: 10, projects: 20, members: 3 },
  },
  {
    id: "GROWTH",
    name: "Growth",
    price: "$79/mo",
    features: ["Up to 50 clients", "100 projects", "10 team members", "Priority support", "Custom branding"],
    limits: { clients: 50, projects: 100, members: 10 },
  },
  {
    id: "PRO",
    name: "Pro",
    price: "$199/mo",
    features: ["Unlimited clients", "Unlimited projects", "Unlimited members", "24/7 support", "Custom branding", "API access", "SSO"],
    limits: { clients: -1, projects: -1, members: -1 },
  },
];

interface SubscriptionData {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
}

function useSubscription() {
  return useQuery({
    queryKey: queryKeys.billing.subscription(),
    queryFn: () => apiClient.get<SubscriptionData>("/api/billing"),
  });
}

function useCreateCheckout() {
  return useMutation({
    mutationFn: (planId: string) =>
      apiClient.post<{ url: string }>("/api/billing/checkout", { planId }),
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: () => {
      toast.error("Failed to start checkout");
    },
  });
}

function useManageBilling() {
  return useMutation({
    mutationFn: () =>
      apiClient.post<{ url: string }>("/api/billing/portal", {}),
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: () => {
      toast.error("Failed to open billing portal");
    },
  });
}

export default function BillingPage() {
  const { data: subscription, isLoading, isError, refetch } = useSubscription();
  const checkoutMutation = useCreateCheckout();
  const portalMutation = useManageBilling();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-12 w-12 text-danger" />
        <h1 className="mt-4 text-heading-3 font-semibold text-text">Failed to load billing</h1>
        <Button variant="secondary" className="mt-4" onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const currentPlan = subscription?.plan ?? "STARTER";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1 font-bold text-text">Billing</h1>
          <p className="mt-1 text-body text-text-muted">Manage your subscription and billing details</p>
        </div>
        {subscription && (
          <Button
            variant="secondary"
            onClick={() => portalMutation.mutate()}
            isLoading={portalMutation.isPending}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Billing
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {subscription && (
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm text-text-muted">Current Plan</p>
                  <p className="text-heading-3 font-bold text-text">{PLANS.find((p) => p.id === currentPlan)?.name ?? currentPlan}</p>
                </div>
                <Badge variant={subscription.status === "ACTIVE" ? "success" : "warning"}>
                  {subscription.status}
                </Badge>
              </div>
              {subscription.currentPeriodEnd && (
                <p className="mt-2 text-caption text-text-muted">
                  Current period ends {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </Card>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const isCurrent = plan.id === currentPlan;
              return (
                <Card
                  key={plan.id}
                  className={`relative ${isCurrent ? "ring-2 ring-primary" : ""}`}
                >
                  {isCurrent && (
                    <Badge variant="info" className="absolute -top-3 left-4">Current Plan</Badge>
                  )}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-heading-3 font-bold text-text">{plan.name}</h3>
                      <p className="mt-1 text-heading-2 font-bold text-primary">{plan.price}</p>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-body-sm text-text-muted">
                          <Check className="h-4 w-4 text-success shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={isCurrent ? "secondary" : "primary"}
                      className="w-full"
                      disabled={isCurrent}
                      isLoading={checkoutMutation.isPending && selectedPlan === plan.id}
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        checkoutMutation.mutate(plan.id);
                      }}
                    >
                      {isCurrent ? "Current Plan" : "Upgrade"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
