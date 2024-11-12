import FooterApp from '../dashboard/footer';
import Grid from '../dashboard/grid';
import { Navbar } from '../dashboard/nav-bar';
import styles from '../dashboard/styles/Grid.module.css';

export default function Despensas() {
  return (
    <Grid>
      <Navbar route="despensas" className={styles.navbar}/>
      <FooterApp className={styles.footer}/>
    </Grid>
  )
}