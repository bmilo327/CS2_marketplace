import { Link } from "react-router";

export default function NoPage() {
  return (
    <section>
        <h2>404 - Az oldal nem található</h2>
        <Link to="/">Vissza a főoldalra</Link>
    </section>
  )
}