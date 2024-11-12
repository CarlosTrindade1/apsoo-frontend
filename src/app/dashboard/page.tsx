import FooterApp from "./footer";
import Grid from "./grid";
import Header from "./header";
import { Navbar } from "./nav-bar";
import styles from './styles/Grid.module.css'

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