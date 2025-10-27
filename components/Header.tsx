export default function Header() {
  return (
    <header
      style={{
        height: 64,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
        MapleSense
      </div>
    </header>
  );
}
