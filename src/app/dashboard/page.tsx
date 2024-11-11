import FooterApp from "./footer";
import Grid from "./grid";
import { Navbar } from "./nav-bar";
import styles from './styles/Grid.module.css'

export default function Dashboard() {
	return (
		<Grid>
			<Navbar route="dashboard" className={styles.navbar}/>
			<FooterApp />
		</Grid>
	)
}