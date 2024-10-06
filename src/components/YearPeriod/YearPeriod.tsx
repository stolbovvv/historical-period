import './YearPeriod.scss';
import { useEffect, useRef, useState } from 'react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import gsap from 'gsap';

interface YearPeriodProps {
	years: [number, number];
}

gsap.registerPlugin(MotionPathPlugin);

export function YearPeriod({ years }: YearPeriodProps) {
	const startYearRef = useRef<{ value: number }>({ value: years[0] });
	const endYearRef = useRef<{ value: number }>({ value: years[1] });
	const [startYear, setStartYear] = useState<number>(years[0]);
	const [endYear, setEndYear] = useState<number>(years[1]);

	useEffect(() => {
		const animation = {
			duration: 0.5,
			ease: 'linear',
			roundProps: 'value',
		};

		gsap.to(startYearRef.current, {
			...animation,
			value: years[0],
			onUpdate: () => {
				setStartYear(startYearRef.current.value);
			},
		});

		gsap.to(endYearRef.current, {
			...animation,
			value: years[1],
			onUpdate: () => {
				setEndYear(endYearRef.current.value);
			},
		});
	}, [...years]);

	return (
		<div className="year-period">
			<p className="year-period__item year-period__item--start">{startYear}</p>
			<p className="year-period__item year-period__item--end">{endYear}</p>
			<div className="year-period__controls">
				<svg
					className="year-period__circle"
					width="530"
					height="530"
					viewBox="0 0 530 530"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.499993 265.5C0.223339 119.145 119.145 0.223574 265.5 0.500238C411.579 0.77638 529.776 119.421 529.5 265.5C529.224 411.303 411.303 529.225 265.5 529.5C119.421 529.776 0.776127 411.58 0.499993 265.5Z"
						stroke="#42567A"
						opacity="0.2"
					/>
				</svg>
			</div>
		</div>
	);
}
