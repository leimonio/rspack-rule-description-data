import { useState } from "react";
import reactLogo from "./assets/react.svg";
import styles from "./App.module.css";

console.log("🚀 ~ file: App.tsx:5 ~ styles:", styles);
console.log("🚀 ~ file: App.tsx:5 ~ styles.card:", styles.card);


function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<div>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer">
					<img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
				</a>
			</div>
			<h1>Rspack + React + TypeScript</h1>
			<div className={styles.card}>
				<button onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className={styles.readTheDocs}>
				Click on the Rspack and React logos to learn more
			</p>
		</div>
	);
}

export default App;


// "./src/App.module.css": (function (module) {
// "use strict";
// module.exports = {
//   "logo": "__src_App_module_css__logo",
//   "react": "__src_App_module_css__react",
//   "logoSpin": "__src_App_module_css__logo-spin",
//   "card": "__src_App_module_css__card",
//   "readTheDocs": "__src_App_module_css__read-the-docs",
// };
// }),