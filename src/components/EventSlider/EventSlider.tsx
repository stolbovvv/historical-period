import './EventSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Period } from '../../libs';
import { Icon } from '../Icon/Icon';

interface EventSliderPeriod {
	id: number;
	items: Period['items'];
	active: boolean;
}

export function EventSlider({ id, items, active }: EventSliderPeriod) {
	return (
		<div className={['event-slider', active ? 'event-slider--show' : 'event-slider--hide'].join(' ')}>
			<Swiper
				id={`event-slider-${id}`}
				spaceBetween={20}
				slidesPerView={1.5}
				modules={[Navigation]}
				navigation={{
					prevEl: `#event-slider-${id}.event-slider__button--prev`,
					nextEl: `#event-slider-${id}.event-slider__button--next`,
				}}
				breakpoints={{
					'768': {
						spaceBetween: 30,
						slidesPerView: 2,
					},
					'1024': {
						spaceBetween: 50,
						slidesPerView: 3,
					},
				}}
			>
				{items.map(({ year, text }, index) => (
					<SwiperSlide key={index}>
						<div className="event-slider__slide">
							<p className="event-slider__slide-year">{year}</p>
							<p className="event-slider__slide-text">{text}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<button id={`event-slider-${id}`} className="event-slider__button event-slider__button--prev">
				<Icon type="arrow-left" />
			</button>
			<button id={`event-slider-${id}`} className="event-slider__button event-slider__button--next">
				<Icon type="arrow-right" />
			</button>
		</div>
	);
}
