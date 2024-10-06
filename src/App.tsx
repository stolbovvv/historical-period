import './App.scss';
import { SectionPeriods } from './sections';
import { periodsData } from './libs';

export default function App() {
	return (
		<div className="app">
			<SectionPeriods periods={periodsData} />
		</div>
	);
}
