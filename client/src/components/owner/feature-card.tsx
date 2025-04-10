import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Construction } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  alertTitle: string;
  alertDescription: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  alertTitle,
  alertDescription,
}: FeatureCardProps) {
  return (
    <Card className="border border-stone-300 bg-stone-300 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold text-black">
            {title}
          </CardTitle>
          <CardDescription className="text-stone-600">
            {description}
          </CardDescription>
        </div>
        {icon}
      </CardHeader>
      <CardContent className="pt-4">
        <Alert
          variant="default"
          className="border-stone-100 bg-stone-100 text-stone-800 p-4"
        >
          <Construction className="h-5 w-5 text-stone-600" />
          <AlertTitle className="font-semibold text-stone-900">
            {alertTitle}
          </AlertTitle>
          <AlertDescription className="text-sm text-stone-700">
            {alertDescription}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
