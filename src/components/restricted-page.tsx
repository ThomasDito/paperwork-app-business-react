import { Navigate } from "react-router-dom";

export default function RestrictedPage() {
  return <Navigate to={"/member/application"} replace />;
}
