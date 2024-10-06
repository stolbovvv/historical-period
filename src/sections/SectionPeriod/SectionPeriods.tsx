import './SectionPeriods.scss';
import { useRef, useState } from 'react';
import { type Period } from '../../libs';
import { EventSlider, Switcher, YearPeriod } from '../../components';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface SectionPeriodsProps {
	periods: Period[];
}

export function SectionPeriods({ periods }: SectionPeriodsProps) {
	const [currentNumber, setCurrentNumber] = useState<number>(0);
	const isMobile = useMediaQuery('(max-width: 767px)');
	const slidersContainer = useRef<HTMLDivElement>(null);

	const setPrevPeriodNumber = () => {
		if (currentNumber !== 0) {
			setCurrentNumber((number) => number - 1);
		}
	};

	const setNextPeriodNumber = () => {
		if (currentNumber + 1 < periods.length) {
			setCurrentNumber((number) => number + 1);
		}
	};

	useGSAP(
		() => {
			gsap.timeline()
				.to('.event-slider--hide', { opacity: 0, duration: 0.25, display: 'none' })
				.to('.event-slider--show', { opacity: 1, duration: 0.25, display: 'block' });
		},
		{
			dependencies: [currentNumber],
			scope: slidersContainer,
		},
	);

	return (
		<section className="section-periods">
			<h2 className="section-periods__heading">
				Исторические <br /> даты
			</h2>
			<YearPeriod years={periods[currentNumber].years} />
			{!isMobile && (
				<Switcher
					index={currentNumber}
					total={periods.length}
					onClickPrev={setPrevPeriodNumber}
					onClickNext={setNextPeriodNumber}
				/>
			)}

			<div className="section-periods__sliders" ref={slidersContainer}>
				{periods.map(({ items }, index) => (
					<EventSlider key={index} id={index} items={items} active={currentNumber === index} />
				))}
			</div>
			{isMobile && (
				<div className="section-periods__foot">
					<Switcher
						index={currentNumber}
						total={periods.length}
						onClickPrev={setPrevPeriodNumber}
						onClickNext={setNextPeriodNumber}
					/>
					<div className="section-periods__pagination">
						{periods.map((_, index) => (
							<button
								key={index}
								className={[
									'section-periods__dot',
									index === currentNumber ? 'section-periods__dot--active' : '',
								].join(' ')}
								onClick={() => setCurrentNumber(index)}
							/>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
