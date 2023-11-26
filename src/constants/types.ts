import { Url } from "next/dist/shared/lib/router/router";
import { Key } from "react";

export interface NavItem {
    href: Url,
    label: String
  }