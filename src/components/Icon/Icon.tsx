import { SVGProps } from 'react';
import './Icon.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
	type: 'arrow-left' | 'arrow-right';
}

export function Icon({ type, width = 10, height = 14 }: IconProps) {
	switch (type) {
		case 'arrow-left':
			return (
				<svg
					className="icon"
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="currentColor" strokeWidth="2" />
				</svg>
			);

		case 'arrow-right':
			return (
				<svg
					className="icon"
					width={width}
					height={height}
					viewBox={`0 0 ${width} ${height}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="currentColor" strokeWidth="2" />
				</svg>
			);

		default:
			return null;
	}
}
