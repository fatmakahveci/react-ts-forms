import Icon from "@form-studio/ui/icon";
import ValidationForm from "@/components/forms/ValidationForm";
export default function Home() {
  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            f.
          </span>
          Form Studio
        </div>
        <span className="workspace-label">
          <span className="workspace-dot" />
          Your personal workspace
        </span>
      </header>
      <main id="main">
        <div className="breadcrumb">
          <span>Workspace</span>
          <span aria-hidden="true">/</span>
          <strong>Form validation</strong>
        </div>
        <div className="hero">
          <div>
            <p className="eyebrow">01 / Form validation</p>
            <h1>
              Good forms.
              <br />
              <em>Great first impressions.</em>
            </h1>
            <p className="subtitle">
              A simple place to get the details right. Try a form that helps you
              along, one field at a time.
            </p>
          </div>
          <span className="pill">
            <Icon name="shield" />
            Private by design
          </span>
        </div>
        <ValidationForm />
      </main>
      <footer>
        <span>Form Studio · React &amp; TypeScript</span>
        <span>Built for clarity. Designed for everyone.</span>
      </footer>
    </div>
  );
}
