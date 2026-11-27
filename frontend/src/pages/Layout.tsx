import { NavLink, Outlet } from "react-router";
import { useTermekContext } from "../contexts/TermekContext";

export default function Layout() {
  const { kosar, kedvencek } = useTermekContext();

  const kosarDarab = kosar.reduce((sum, elem) => sum + elem.mennyiseg, 0);

  return (
    <>
      <header>
        <h1>CS2 Marketplace</h1>
      </header>
      <nav>
        <NavLink to="/">Marketplace</NavLink>
        <NavLink to="/kosar">Kosár ({kosarDarab})</NavLink>
        <NavLink to="/kedvencek">Kedvencek ({kedvencek.length})</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>Bernáth Milán</footer>
    </>
  );
}