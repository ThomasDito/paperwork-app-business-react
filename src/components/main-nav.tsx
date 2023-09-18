import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <div className="flex space-6 md:space-10">
      <Link to="/" className="flex items-center space-x-2">
        <span className="inline-block text-lg font-bold">Paperwork</span>
      </Link>
    </div>
  );
}
