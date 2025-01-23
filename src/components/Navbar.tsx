import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const element = e.currentTarget as HTMLAnchorElement;
        const section = element.getAttribute("data-href");
        if (section) {
          document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    links.forEach((elem) => {
      elem.addEventListener("click", handleClick as EventListener);
    });

    return () => {
      links.forEach((elem) => {
        elem.removeEventListener("click", handleClick as EventListener);
      });
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AJ
        </a>
        <a
          href="mailto:abdealijeeranwala@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          abdealijeeranwala@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
