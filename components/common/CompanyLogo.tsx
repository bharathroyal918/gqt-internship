"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CompanyLogoProps {
  name: string;
  logoUrl?: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

// Official company logos taken from internet / corporate websites
const COMPANY_LOGOS: Record<string, { logo: string; domain: string }> = {
  google: { logo: "/images/companies/google.svg", domain: "google.com" },
  microsoft: { logo: "/images/companies/microsoft.svg", domain: "microsoft.com" },
  amazon: { logo: "/images/companies/amazon.svg", domain: "amazon.com" },
  tcs: { logo: "/images/companies/tcs.jpg", domain: "tcs.com" },
  "tata consultancy": { logo: "/images/companies/tcs.jpg", domain: "tcs.com" },
  infosys: { logo: "/images/companies/infosys.svg", domain: "infosys.com" },
  wipro: { logo: "/images/companies/wipro.svg", domain: "wipro.com" },
  cognizant: { logo: "/images/companies/cognizant.svg", domain: "cognizant.com" },
  bosch: { logo: "/images/companies/bosch.svg", domain: "bosch.com" },
  cisco: { logo: "/images/companies/cisco.svg", domain: "cisco.com" },
  mercedes: { logo: "/images/companies/mercedes.svg", domain: "mercedes-benz.com" },
  intel: { logo: "/images/companies/intel.svg", domain: "intel.com" },
  dell: { logo: "/images/companies/dell.svg", domain: "dell.com" },
  ibm: { logo: "/images/companies/ibm.svg", domain: "ibm.com" },
  accenture: { logo: "/images/companies/accenture.svg", domain: "accenture.com" },
  samsung: { logo: "/images/companies/samsung.svg", domain: "samsung.com" },
  siemens: { logo: "/images/companies/siemens.svg", domain: "siemens.com" },
  qualcomm: { logo: "/images/companies/qualcomm.svg", domain: "qualcomm.com" },
  oracle: { logo: "/images/companies/oracle.svg", domain: "oracle.com" },
  ltts: { logo: "/images/companies/ltts.png", domain: "ltts.com" },
  "l&t": { logo: "/images/companies/ltts.png", domain: "ltts.com" },
  larsen: { logo: "/images/companies/ltts.png", domain: "ltts.com" },
  phonepe: { logo: "/images/companies/phonepe.svg", domain: "phonepe.com" },
  razorpay: { logo: "/images/companies/razorpay.svg", domain: "razorpay.com" },
  flipkart: { logo: "/images/companies/flipkart.svg", domain: "flipkart.com" },
  "texas instruments": { logo: "/images/companies/ti.svg", domain: "ti.com" },
  ti: { logo: "/images/companies/ti.svg", domain: "ti.com" },
  honeywell: { logo: "/images/companies/honeywell.svg", domain: "honeywell.com" },
  schneider: { logo: "/images/companies/schneider.svg", domain: "se.com" },
  hcl: { logo: "/images/companies/hcl.svg", domain: "hcltech.com" },
  swiggy: { logo: "/images/companies/swiggy.webp", domain: "swiggy.com" },
  zerodha: { logo: "/images/companies/zerodha.svg", domain: "zerodha.com" },
  gqt: { logo: "/images/companies/gqt.svg", domain: "globalquesttechnologies.com" },
  "global quest": { logo: "/images/companies/gqt.svg", domain: "globalquesttechnologies.com" },
  titan: { logo: "/images/companies/titan.svg", domain: "titancompany.in" },
  tejas: { logo: "/images/companies/tejas.svg", domain: "tejasnetworks.com" },
  mindtree: { logo: "/images/companies/ltimindtree.svg", domain: "ltimindtree.com" },
  ltimindtree: { logo: "/images/companies/ltimindtree.svg", domain: "ltimindtree.com" },
  sap: { logo: "/images/companies/sap.svg", domain: "sap.com" },
  kpit: { logo: "/images/companies/kpit.svg", domain: "kpit.com" },
  subex: { logo: "/images/companies/subex.svg", domain: "subex.com" },
  "happiest minds": { logo: "/images/companies/happiestminds.svg", domain: "happiestminds.com" },
  "tata elxsi": { logo: "/images/companies/tataelxsi.svg", domain: "tataelxsi.com" },
  micron: { logo: "/images/companies/micron.svg", domain: "micron.com" },
  abb: { logo: "/images/companies/abb.svg", domain: "abb.com" },
  continental: { logo: "/images/companies/continental.svg", domain: "continental.com" },
  persistent: { logo: "/images/companies/persistent.svg", domain: "persistent.com" },
  sonata: { logo: "/images/companies/sonata.svg", domain: "sonata-software.com" },
  mphasis: { logo: "/images/companies/mphasis.svg", domain: "mphasis.com" },
  cyient: { logo: "/images/companies/cyient.svg", domain: "cyient.com" },
  birlasoft: { logo: "/images/companies/birlasoft.svg", domain: "birlasoft.com" },
  "quest global": { logo: "/images/companies/questglobal.svg", domain: "quest-global.com" },
  quest: { logo: "/images/companies/questglobal.svg", domain: "quest-global.com" },
  postman: { logo: "/images/companies/postman.svg", domain: "postman.com" },
  hasura: { logo: "/images/companies/hasura.svg", domain: "hasura.io" },
  cred: { logo: "/images/companies/cred.svg", domain: "cred.club" },
  groww: { logo: "/images/companies/groww.svg", domain: "groww.in" },
  kreditbee: { logo: "/images/companies/kreditbee.svg", domain: "kreditbee.in" },
  inmobi: { logo: "/images/companies/inmobi.svg", domain: "inmobi.com" },
  "mu sigma": { logo: "/images/companies/musigma.svg", domain: "mu-sigma.com" },
  musigma: { logo: "/images/companies/musigma.svg", domain: "mu-sigma.com" },
  acko: { logo: "/images/companies/acko.svg", domain: "acko.com" },
  "urban company": { logo: "/images/companies/urbancompany.svg", domain: "urbancompany.com" },
  ather: { logo: "/images/companies/ather.svg", domain: "atherenergy.com" },
  ola: { logo: "/images/companies/olaelectric.svg", domain: "olaelectric.com" },
};

export default function CompanyLogo({
  name,
  logoUrl,
  className = "",
  size = "md",
}: CompanyLogoProps) {
  const norm = (name || "").toLowerCase().trim();
  const dimensionClass = sizeClasses[size] || sizeClasses.md;

  // Resolve logo from direct prop or matching company map
  let foundMatch: { logo: string; domain: string } | null = null;
  for (const [key, val] of Object.entries(COMPANY_LOGOS)) {
    if (norm.includes(key)) {
      foundMatch = val;
      break;
    }
  }

  const initialSrc =
    logoUrl && !logoUrl.includes("ui-avatars.com")
      ? logoUrl
      : foundMatch?.logo ||
        `https://www.google.com/s2/favicons?domain=${foundMatch?.domain || `${norm.replace(/\s+/g, "")}.com`}&sz=128`;


  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(false);

  const initials = (name || "CO")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`${dimensionClass} ${className} flex items-center justify-center rounded-xl bg-white p-1 border border-slate-200/80 shadow-xs flex-shrink-0 overflow-hidden relative`}
      title={name}
    >
      {!hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={`${name} official company logo`}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={() => {
            // If primary image fails, try web favicon directly from domain
            if (foundMatch && imgSrc !== `https://www.google.com/s2/favicons?domain=${foundMatch.domain}&sz=128`) {
              setImgSrc(`https://www.google.com/s2/favicons?domain=${foundMatch.domain}&sz=128`);
            } else {
              setHasError(true);
            }
          }}
        />
      ) : (
        <span className="text-[11px] font-extrabold text-brand-blue tracking-wider">
          {initials}
        </span>
      )}
    </div>
  );
}
