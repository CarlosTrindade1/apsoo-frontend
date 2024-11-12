import styles from './styles/Grid.module.css'

export default function Grid({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.grid}>
      {children}
    </div>
  )
}