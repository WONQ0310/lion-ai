import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyInfo } from "@/types/profile";

interface HeaderProps {
  name: string;
  title: string;
  company: CompanyInfo;
  profileImage: string;
}

export function Header({ name, title, company, profileImage }: HeaderProps) {
  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center text-center space-y-4 md:flex-row md:text-left md:space-y-0 md:space-x-6">
              {/* Profile Image */}
              <Avatar className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40">
                <AvatarImage
                  src={profileImage}
                  alt={`${name}のプロフィール写真`}
                />
                <AvatarFallback className="text-2xl md:text-3xl lg:text-4xl">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {/* Name, Title, and Company */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {name}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-1">
                  {title}
                </p>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors underline decoration-dotted"
                  >
                    {company.name}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  );
}
