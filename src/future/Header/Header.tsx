import { FC } from "react";
import s from "./header.module.scss";
import clsx from "clsx";
import LOGO from "public/assets/images/LOGO.png";
import { links } from "@/mocks/links";
import { Link, NavLink } from "react-router-dom";
import Notification from "./notification/Notification";
const Header: FC = () => {
  return (
    <div className={s.header}>
      <div className={clsx(s.container, "container")}>
        <div className={s.logo}>
          <Link to={"/"}>
            <img src={LOGO} alt="SPLAY" />
          </Link>
        </div>
        <div className={s.links}>
          {links?.map(({ href, title }, index) => (
            <NavLink
              to={href}
              key={index}
              className={({ isActive }) =>
                clsx(s.link, {
                  [s.activeLink]: isActive,
                })
              }
            >
              {title}
            </NavLink>
          ))}
        </div>
        <div className={s.others}>
          <Notification notifications_length={1} />
        </div>
      </div>
    </div>
  );
};

export default Header;
