import FooterApp from '../dashboard/footer';
import Grid from '../dashboard/grid';
import Header from '../dashboard/header';
import { Navbar } from '../dashboard/nav-bar';
import styles from '../dashboard/styles/Grid.module.css';

export default function Mercados() {
  return (
    <Grid>
      <Header 
				className={styles.header}
				text='Mercados'
				items={[
					{ href: '/mercados', text: 'Mercados' }
				]}
			/>
      <Navbar route="mercados" className={styles.navbar}/>
      <FooterApp className={styles.footer}/>
    </Grid>
  )
}