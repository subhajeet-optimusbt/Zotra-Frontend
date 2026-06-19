import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Nav, { useHashScroll } from "./components/Nav";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

// Heavy pages — load only when first visited
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const AppShell = lazy(() => import("./app/AppShell"));
const GoogleCallback = lazy(() => import("./pages/GoogleCallback"));

const NO_LAYOUT_PATHS = ["/login", "/signup", "/onboarding", "/auth/callback"];

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f13",
        gap: 28,
      }}
    >
      {/* Zotra wordmark */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          opacity: 0.92,
        }}
      >
        ZOT<span style={{ color: "#5552C9" }}>RA</span>
      </div>

      {/* Segmented arc spinner */}
      <div style={{ position: "relative", width: 44, height: 44 }}>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          style={{ animation: "zotra-spin 1s linear infinite" }}
        >
          {/* Background track */}
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="#1e1e28"
            strokeWidth="3"
          />
          {/* Gradient arc — 75% of circumference */}
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="url(#zotra-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="84.8 28.3"
            strokeDashoffset="0"
          />
          <defs>
            <linearGradient id="zotra-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5552C9" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7B78F5" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center dot pulse */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#5552C9",
              animation: "zotra-pulse 1s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Subtle status label */}
      <div
        style={{
          fontSize: 14,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#4a4a60",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
        }}
      >
        Loading
      </div>

      <style>{`
        @keyframes zotra-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes zotra-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
function Layout() {
  const loc = useLocation();
  useHashScroll();
  const noLayout =
    NO_LAYOUT_PATHS.includes(loc.pathname) || loc.pathname.startsWith("/app");

  if (noLayout) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth/callback" element={<GoogleCallback />} />
          <Route path="/app/*" element={<AppShell />} />
          <Route path="/app" element={<Navigate to="/app/" replace />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <Nav />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
