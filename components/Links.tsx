import React from "react";
import { ExternalLink } from "@/types/profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LinksProps {
  links: ExternalLink[];
}

export const Links: React.FC<LinksProps> = ({ links }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>関連リンク</CardTitle>
        <CardDescription>
          会社公式サイトとAI事業に関する関連サイト
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{link.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {link.description}
                </p>
              </div>
              <Button
                asChild
                variant="default"
                className="w-full sm:w-auto text-white"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  サイトを訪問
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </Button>
            </div>
            {index < links.length - 1 && (
              <div className="border-b border-border mt-4" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
