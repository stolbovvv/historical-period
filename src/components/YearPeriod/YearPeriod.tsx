import './YearPeriod.scss';
import { useEffect, useRef, useState } from 'react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import gsap from 'gsap';
import type { Period } from '../../libs';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface YearPeriodProps {
	periods: Period[];
	current: number;
	onChangePeriod: (number: number) => void;
}

gsap.registerPlugin(MotionPathPlugin);

export function YearPeriod({ current, periods, onChangePeriod }: YearPeriodProps) {
	const startYearRef = useRef<{ value: number }>({ value: periods[current].years[0] });
	const endYearRef = useRef<{ value: number }>({ value: periods[current].years[1] });
	const isTablet = useMediaQuery('(max-width: 1023px)');
	const [startYear, setStartYear] = useState<number>(periods[current].years[0]);
	const [endYear, setEndYear] = useState<number>(periods[current].years[1]);

	const buttons = periods.map((period, index, arr) => {
		const angle = (index / arr.length) * 2 * Math.PI;
		const x = 125 + 250 * Math.cos(angle);
		const y = 125 + 250 * Math.sin(angle);

		return {
			x,
			y,
			label: period.label,
		};
	});

	useEffect(() => {
		const animation = {
			duration: 0.5,
			ease: 'linear',
			roundProps: 'value',
		};

		gsap.to(startYearRef.current, {
			...animation,
			value: periods[current].years[0],
			onUpdate: () => {
				setStartYear(startYearRef.current.value);
			},
		});

		gsap.to(endYearRef.current, {
			...animation,
			value: periods[current].years[1],
			onUpdate: () => {
				setEndYear(endYearRef.current.value);
			},
		});
	}, [current]);

	return (
		<div className="year-period">
			<p className="year-period__item year-period__item--start">{startYear}</p>
			<p className="year-period__item year-period__item--end">{endYear}</p>
			<div
				className="year-period__controls"
				style={{
					transform: `rotate(-${current * (360 / periods.length) + 60}deg)`,
					transition: 'all 0.5s ease 0s',
				}}
			>
				<svg
					className="year-period__circle"
					width="530"
					height="530"
					viewBox="0 0 530 530"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle opacity="0.2" cx="268" cy="265" r="250" stroke="#42567A" />
				</svg>

				{!isTablet &&
					buttons.map(({ label, x, y }, index) => (
						<button
							key={index}
							className={['year-period__point', index === current ? 'active' : ''].join(' ')}
							onClick={() => onChangePeriod(index)}
							style={{
								position: 'absolute',
								left: `calc(25% - 20px + ${x}px)`,
								top: `calc(25% - 20px + ${y}px)`,
								transform: `rotate(calc(${current + 1} * ${periods.length}0deg))`,
								transition: 'all 0.5s ease 0s',
							}}
						>
							<span className="year-period__point-index">{index + 1}</span>
							<span className="year-period__point-label">{label}</span>
						</button>
					))}
			</div>
		</div>
	);
}
