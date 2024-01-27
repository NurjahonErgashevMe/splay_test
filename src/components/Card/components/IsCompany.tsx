import { FC, memo } from "react";

import s from "../card.module.scss";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { LazyLoadImage } from "react-lazy-load-image-component";
import getImage from "@/helpers/getImage";
import { ImageNames } from "@/types/shared/imagesNames";

interface IsCompanyProps {
  company?: ImageNames;
  title: string;
}

const IsCompany: FC<IsCompanyProps> = memo(({ company, title }) => {
  if (!company) {
    return <></>;
  }
  const CompanyLogo = getImage(company as ImageNames) ?? null;

  const IS_COMPANY_LOGO_IMAGE: boolean = typeof CompanyLogo === "string";

  return (
    <Breadcrumb
      type="image"
      position="bottom-left"
      variant="blur"
      borderRadius="5px"
      className={s.company}
    >
      {IS_COMPANY_LOGO_IMAGE ? (
        <LazyLoadImage
          className={s.image}
          src={CompanyLogo as string}
          width={63}
          height={12}
          alt={title}
          loading="lazy"
        />
      ) : (
        <CompanyLogo width={"100%"} height={15} fill="#fff" />
      )}
    </Breadcrumb>
  );
});

export default IsCompany;
