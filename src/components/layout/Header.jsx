import { Link, NavLink } from "react-router-dom";
import { CalendarDays, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../../config/siteConfig";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/event-spaces", label: "Event Spaces" },
  { to: "/events", label: "Events" },
  { to: "/availability", label: "Availability" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img src={siteConfig.logo} alt="" />
        <span>
          <strong>Legends</strong>
          <small>Lounge & Events Center</small>
        </span>
      </Link>
      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions">
        <a className="ghost-button header-call" href={siteConfig.phoneHref}>
          <Phone size={16} />
          {siteConfig.phone}
        </a>
        <Link className="gold-button" to="/availability">
          <CalendarDays size={17} />
          Check Availability
        </Link>
        <button className="icon-button menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
