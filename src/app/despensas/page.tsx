import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';

export default function Despensas() {
  return (
    <Grid>
      <Header 
				className={styles.header}
				text='Despensas'
				items={[
					{ href: '/despensas', text: 'Despensas' }
				]}
			/>
      <Navbar route="despensas" className={styles.navbar}/>
      <FooterApp className={styles.footer}/>
    </Grid>
  )
}