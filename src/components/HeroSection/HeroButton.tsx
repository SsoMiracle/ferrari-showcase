import styles from "./HeroButtom.module.scss";

interface HeroButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  target: string;
}

function HeroButton({
  target,
  href,
  onClick,
  children,
  className = "",
}: HeroButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={`${styles.heroBtn} ${className}`}
      >
        <span className={styles.heroBtn_text}>{children}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${styles.heroBtn} ${className}`}>
      <span className={styles.heroBtn_text}>{children}</span>
    </button>
  );
}
export default HeroButton;
