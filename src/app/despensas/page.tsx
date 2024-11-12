import FooterApp from '../dashboard/footer';
import Grid from '../dashboard/grid';
import Header from '../dashboard/header';
import { Navbar } from '../dashboard/nav-bar';
import styles from '../dashboard/styles/Grid.module.css';

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