import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { Links } from "@/components/Links";
import { Footer } from "@/components/Footer";
import { profileData } from "@/data/profileData";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const copyright = `© ${currentYear} ${profileData.name}. All rights reserved.`;

  // JSON-LD構造化データ（Personスキーマ）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    jobTitle: profileData.title,
    worksFor: {
      "@type": "Organization",
      name: profileData.company.name,
      url: profileData.company.url,
    },
    image: `https://iwashita-naoto.github.io${profileData.profileImage}`,
    url: "https://iwashita-naoto.github.io/",
    sameAs: [
      profileData.company.url,
      ...profileData.relatedLinks.map(link => link.url),
    ],
    description: profileData.biography.join(" "),
    knowsAbout: profileData.expertise,
  };

  return (
    <>
      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        name={profileData.name}
        title={profileData.title}
        company={profileData.company}
        profileImage={profileData.profileImage}
      />
      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <Profile
          biography={profileData.biography}
          expertise={profileData.expertise}
        />
        <Links links={profileData.relatedLinks} />
      </main>
      <Footer copyright={copyright} />
    </>
  );
}
