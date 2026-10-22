import Link from "next/link";

const NavLink = ({ href, title, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 pl-3 pr-4 text-acid sm:text-xl font-display font-semibold uppercase tracking-wider md:p-0 hover:text-neon-cyan transition-colors"
    >
      {title}
    </Link>
  );
};

export default NavLink;
