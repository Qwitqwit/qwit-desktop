import Converter from "../parts/converter/converter.tsx";
import Settings from "../parts/settings.tsx";

import { ReactElement } from "react";
import Reader from "../parts/reader/reader.tsx";

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
    component: <Reader key="reader" />,
    link: "/reader",
    title: "Reader",
  },
  {
    component: <Settings key="settings" />,
    link: "/settings",
    title: "Settings",
  },
];
