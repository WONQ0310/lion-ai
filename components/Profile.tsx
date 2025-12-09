import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileProps {
  biography: string[];
  expertise: string[];
}

export function Profile({ biography, expertise }: ProfileProps) {
  return (
    <section className="w-full">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Biography Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">経歴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {biography.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expertise Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">専門分野</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-3 py-1 text-white"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
