import { useEffect, useRef, useState } from 'react'
import logo from "../assets/images/Logo.png"
import "./comp.css"

const TopMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const pointerType = useRef("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Tapping anywhere outside the menu closes it on touch devices.
    const onPointerDown = (e) => {
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Mouse users get hover open/close over the icon + list; touch and
  // keyboard users toggle with click.
  const openOnHover = (e) => {
    if (e.pointerType === "mouse") setOpen(true);
  };
  const closeOnLeave = (e) => {
    if (e.pointerType === "mouse") setOpen(false);
  };
  const onIconClick = () => {
    if (pointerType.current === "mouse") setOpen(true);
    else setOpen((o) => !o);
    pointerType.current = "";
  };
  const closeOnFocusOut = (e) => {
    // relatedTarget is null when clicking a link in Safari (no focus on click),
    // so only close when focus actually moves to something outside the menu.
    if (e.relatedTarget && !menuRef.current.contains(e.relatedTarget)) setOpen(false);
  };
  const close = () => setOpen(false);

  return (
    <header>
        <a href="#bio" aria-label="Aniket Bamotra, back to top">
          <img
            src={logo}
            alt=""
            className='logo'
            width="87"
            height="60"
          />
        </a>
        <div
          className="menu-wrapper"
          ref={menuRef}
          onPointerLeave={closeOnLeave}
          onBlur={closeOnFocusOut}
        >
          <button
            type="button"
            className="menu-icon"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onPointerDown={(e) => { pointerType.current = e.pointerType; }}
            onClick={onIconClick}
            onPointerEnter={openOnHover}
          >
            <svg
              id="menu"
              viewBox="0 0 95 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <line
                x1="2"
                y1="2"
                x2="78"
                y2="2"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                id="u-line"
              />
              <line
                x1="17"
                y1="17"
                x2="93"
                y2="17"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                id="l-line"
                className={open ? "l-line-anime" : undefined}
              />
            </svg>
          </button>
          <ul id="site-menu" className={`slide-in-menu${open ? " is-open" : ""}`}>
            <li className="font">
              <a href='#bio' onClick={close}>
                About
              </a>
            </li>
            <li className="font">
              <a href='#project' onClick={close}>
                Projects
              </a>
            </li>
            <li className="font">
              <a href='#contact-title' onClick={close}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </header>
  )
}

export default TopMenu
