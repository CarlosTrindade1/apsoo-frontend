import FooterApp from '../components/footer';
import Grid from '../components/grid';
import Header from '../components/header';
import { Navbar } from '../components/nav-bar';
import styles from '../components/styles/Grid.module.css';

export default function Dashboard() {
	return (
		<Grid>
			<Header 
				className={styles.header}
				text='Dashboard'
				items={[
					{ href: '/dashboard', text: 'Dashboard' }
				]}
			/>
			<Navbar route="dashboard" className={styles.navbar}/>
			<FooterApp className={styles.footer}/>
		</Grid>
	)
}