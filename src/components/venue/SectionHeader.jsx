export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="section-header">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
