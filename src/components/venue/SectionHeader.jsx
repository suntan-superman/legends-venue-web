export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="section-header">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <div className="section-copy">{children}</div> : null}
    </div>
  );
}
