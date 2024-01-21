import { FunctionComponent, SVGProps } from "react";

type TSVG = FunctionComponent<
  SVGProps<SVGSVGElement> & { title?: string | undefined }
>;

export type { TSVG };
