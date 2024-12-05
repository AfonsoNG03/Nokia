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
			<div className="row nav-row">
				{/* Sidebar */}
				<nav className="col-sm-2 sidebar-col">
					<div className="sidebar-sticky ">
						<ul className="nav flex-column">
							<li className="nav-item text-center">
								<a
									className="nav-link"
									onClick={() => setShowTasks(false)}
								>
									Home
								</a>
							</li>
							<li className="nav-item text-center">
								<a
									className="nav-link"
									onClick={() => setShowTasks(true)}
								>
									Tasks
								</a>
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
