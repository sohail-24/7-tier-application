import React from "react";

function App() {
  return (
    <div style={styles.page}>
      {/* HERO SECTION */}
      <header style={styles.hero}>
        <h1 style={styles.title}>
          🚀 7 - Tire React Application
        </h1>
        <p style={styles.subtitle}>
          Enterprise-grade frontend deployment on AWS
        </p>

        <div style={styles.badges}>
          <span style={styles.badge}>Production Ready</span>
          <span style={styles.badge}>Secure</span>
          <span style={styles.badge}>Scalable</span>
        </div>
      </header>

      {/* INFO CARDS */}
      <section style={styles.cards}>
        <div style={styles.card}>
          <h3>⚙️ Deployment Stack</h3>
          <ul>
            <li>React (Production Build)</li>
            <li>Git hub</li>
            <li>AWS EC2 (Ubuntu)</li>
            <li>Linux</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h3>🧠 Architecture</h3>
          <p>
            React is built into static files
            for high performance
            and low runtime overhead.
          </p>
        </div>

        <div style={styles.card}>
          <h3>🔐 DevOps Best Practices</h3>
          <ul>
            <li>No Node.js in production</li>
            <li>Stateless frontend</li>
            <li>Easy CI/CD integration</li>
          </ul>
        </div>
      </section>

      {/* STATUS BAR */}
      <section style={styles.status}>
        <div>🟢 Server Status: <strong>RUNNING</strong></div>
        <div>📦 Build Mode: <strong>PRODUCTION</strong></div>
        <div>🌍 Region: <strong>ap-south-1</strong></div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>
          Deployed by <strong>Sohail DevOps Engineer</strong>
        </p>
        <p style={{ fontSize: "13px", color: "#94a3b8" }}>
          React • AWS • Linux
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #020617)",
    color: "#e5e7eb",
    fontFamily: "Inter, Arial, sans-serif",
  },
  hero: {
    textAlign: "center",
    padding: "80px 20px 60px",
  },
  title: {
    fontSize: "52px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "20px",
    color: "#94a3b8",
  },
  badges: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  badge: {
    background: "#0f172a",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    border: "1px solid #1e293b",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    padding: "0 40px 60px",
    maxWidth: "1100px",
    margin: "auto",
  },
  card: {
    background: "#020617",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },
  status: {
    display: "flex",
    justifyContent: "space-around",
    background: "#020617",
    padding: "25px",
    margin: "0 40px",
    borderRadius: "12px",
    fontSize: "15px",
  },
  footer: {
    textAlign: "center",
    padding: "40px 20px",
    borderTop: "1px solid #1e293b",
    marginTop: "60px",
  },
};

export default App;
