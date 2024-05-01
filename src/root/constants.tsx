import Converter from "../parts/converter/converter.tsx";
import Settings from "../parts/settings.tsx";

import { ReactElement } from "react";

export interface AppPart {
  component: ReactElement<unknown, string>;
  link: string;
  title: string;
  index?: boolean | undefined;
}

export const navigation: AppPart[] = [
  {
    component: <Converter key="converter" />,
    link: "/converter",
    title: "Converter",
    index: true,
  },
  {
    component: <Settings key="settings" />,
    link: "/settings",
    title: "Settings",
  },
];
