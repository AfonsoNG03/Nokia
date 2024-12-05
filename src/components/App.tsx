import { useState } from 'react';
import Tasks from './tasks';
import Home from './Home';
import '../styles/App.css';

function App() {
	const [showTasks, setShowTasks] = useState<boolean>(false);

	return (
		<div className="container-fluid">
			<div className="row text-center my-5">
				<h1>New App</h1>
			</div>
			<div className="row">
				{/* Sidebar */}
				<nav className="col-sm-2">
					<div className="sidebar-sticky">
						<ul className="nav flex-column">
							<li className="nav-item">
								<button
									className="nav-link btn btn-link"
									onClick={() => setShowTasks(false)}
								>
									Home
								</button>
							</li>
							<li className="nav-item">
								<button
									className="nav-link btn btn-link"
									onClick={() => setShowTasks(true)}
								>
									Tasks
								</button>
							</li>
						</ul>
					</div>
				</nav>
				{/* Sidebar */}

				{/* Main Content */}
				<main className="col-sm-10">
					{showTasks ? <Tasks /> : <Home />}
				</main>
				{/* Main Content */}
			</div>
		</div>
	);
}

export default App;
