import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState<boolean>(false);

	function setMatchesByChange(event: MediaQueryListEvent) {
		setMatches(event.matches);
	}

	useEffect(() => {
		const media = window.matchMedia(query);

		setMatches(media.matches);

		media.addEventListener('change', setMatchesByChange);

		return () => media.removeEventListener('change', setMatchesByChange);
	}, [query]);

	return matches;
};
