import { addStringZero } from '../../libs';
import { Icon } from '../Icon/Icon';
import './Switcher.scss';

interface SwitcherProps {
	index: number;
	total: number;
	onClickNext: () => void;
	onClickPrev: () => void;
}

export function Switcher({ index, total, onClickNext, onClickPrev }: SwitcherProps) {
	return (
		<div className="switcher">
			<div className="switcher__counter">
				<span>{addStringZero(index + 1)}</span>
				<span>/</span>
				<span>{addStringZero(total)}</span>
			</div>
			<div className="switcher__controls">
				<button className="switcher__button" disabled={index === 0} onClick={onClickPrev}>
					<Icon type="arrow-left" />
				</button>
				<button className="switcher__button" disabled={index + 1 >= total} onClick={onClickNext}>
					<Icon type="arrow-right" />
				</button>
			</div>
		</div>
	);
}
