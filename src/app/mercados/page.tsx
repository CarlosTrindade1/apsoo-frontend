import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';

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