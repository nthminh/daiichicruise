/* DAIICHI — customer app shell & router */
const { useState, useEffect } = React;
function App() {
  const [route, setRoute] = useState({ page: 'home', params: {} });
  const [, force] = useState(0);
  useEffect(() => {
    const onLang = () => force((x) => x + 1);
    window.addEventListener('dt:lang', onLang);
    window.addEventListener('dt:campaigns', onLang);
    window.addEventListener('dt:cms', onLang);
    window.addEventListener('storage', onLang);
    return () => { window.removeEventListener('dt:lang', onLang); window.removeEventListener('dt:campaigns', onLang); window.removeEventListener('dt:cms', onLang); window.removeEventListener('storage', onLang); };
  }, []);
  const nav = (page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const onNav = (e) => nav(e.detail);
    window.addEventListener('dt:nav', onNav);
    return () => window.removeEventListener('dt:nav', onNav);
  }, []);
  const { page, params } = route;
  return (
    <React.Fragment>
      <Header nav={nav} page={page} />
      <PromoBar nav={nav} />
      <NewsBar />
      {page === 'home' && <HomePage nav={nav} />}
      {page === 'bus' && <BusFlow key={JSON.stringify(params)} params={params} nav={nav} />}
      {page === 'day' && <DayCruisePage key={JSON.stringify(params)} params={params} nav={nav} />}
      {page === 'night' && <LuxuryPage params={params} nav={nav} />}
      {page === 'tour' && <ToursPage params={params} nav={nav} />}
      {page === 'lookup' && <LookupPage nav={nav} />}
      {page === 'cart' && <CartPage nav={nav} />}
      {page === 'account' && <AccountPage nav={nav} />}
      {page === 'charter' && <CharterPage nav={nav} />}
      {page === 'careers' && <CareerPage nav={nav} />}
      <ChatWidget />
      <Footer />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
