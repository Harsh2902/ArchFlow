/**
 * Page-transition wrapper. In the App Router a template re-mounts on
 * every navigation, so the CSS .page-enter animation replays per page —
 * a soft rise-and-fade between routes. Pure CSS: disabled automatically
 * on mobile and under prefers-reduced-motion (see globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
