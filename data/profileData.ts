// data/profileData.ts

import { ProfileData } from "../types/profile";

export const profileData: ProfileData = {
  name: "岩下直人",
  title: "代表取締役",
  company: {
    name: "WONQ株式会社",
    url: "https://www.wonq-xr.jp/",
  },
  profileImage: "/images/profile.jpg",
  biography: [
    "WONQ株式会社 代表取締役社長。",
    "九州大学大学院芸術工学府卒業。",
    "エンジニアとして大手電力会社に勤務。",
    "退職後にVR開発/アプリケーション開発事業をメインとするWONQ株式会社を創業。",
    "VRやAR、メタバース技術を活用した新規事業の立ち上げや業務効率化を支援する取り組みに従事。",
    "AIにおいては最先端の技術を学習し研修を通して受講者のスキル向上に貢献。",
  ],
  expertise: [
    "VR技術",
    "AR技術",
    "XR技術",
    "MR技術",
    "AI技術",
    "AI研修",
    "事業開発",
    "技術戦略",
    "イノベーション推進",
  ],
  relatedLinks: [
    {
      name: "WONQ株式会社",
      url: "https://www.wonq-xr.jp/",
      description: "会社公式サイト",
      isExternal: true,
    },
    {
      name: "Lion AI",
      url: "https://www.lion-ai.co.jp/",
      description: "WONQ株式会社のAI事業",
      isExternal: true,
    },
  ],
};
