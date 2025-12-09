import * as React from "react";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  copyright: string;
}

export function Footer({ copyright }: FooterProps) {
  return (
    <footer className="w-full mt-12">
      <Separator className="mb-6" />
      <div className="text-center pb-6">
        <p className="text-sm text-muted-foreground">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
