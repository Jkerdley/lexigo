import { Tooltip } from "../modules/translation/components/TranslationTooltip";
function App() {
  return (
    <main>
      <h1 className="main-title">Welcome</h1>
      <img src="/public/LexiGo3.svg" alt="logo" />
      <p className="main-logo__text">Go translate</p>

      <Tooltip />
    </main>
  );
}

export default App;
