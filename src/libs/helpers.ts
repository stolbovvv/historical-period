/**
 * Добавляет строку '0' перед числом, если число меньше 10.
 * @param {number} number - Число, к которому нужно добавить '0'.
 * @returns {string} - Число с добавленным '0' спереди (если необходимо).
 */
export function addStringZero(number: number): string {
	if (number < 10) return `0${number}`;

	return `0${number}`;
}
