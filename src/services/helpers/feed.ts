import { IFeedOrder, IIngredientWithUUID } from '../../types';
import { v4 as uuidv4 } from 'uuid';

type TData = {
	success: boolean,
	orders: Array<IFeedOrder>,
	total: number,
	totalToday: number
}

function updateOrdersData(data: TData, ingredientsList: Array<IIngredientWithUUID>) {
	const { orders  } = data;
	const updatedOrders = orders.map((order: IFeedOrder) => {
		const updatedIngredients = order.ingredients.map((ingredient: string) => {
			const updatedIngredient = ingredientsList.find((el: IIngredientWithUUID) => el._id === ingredient);
			return updatedIngredient
		}) as Array<IIngredientWithUUID>
		const price = updatedIngredients.reduce((acc: number, ingredient: IIngredientWithUUID) => {
			return acc + ingredient.price
		}, 0)
		const date = getDateInfo(order.createdAt)
		return {
			...order,
			price,
			updatedIngredients,
			date,
			uniqueId: uuidv4()
		}
	})
	const { ready, working } = sortOrders(orders)
	const { totalCopy, totalTodayCopy } = handleTotalOrders(data.total, data.totalToday)
	const updatedData = {
		...data,
		orders: updatedOrders,
		ready,
		working,
		total: totalCopy,
		totalToday: totalTodayCopy
	}
	return updatedData
}

function getDateInfo(dateString: string) {
	const givenDate = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};
	const time = givenDate.toLocaleTimeString([], options);


	const currentDate = new Date();
	const differenceInMilliseconds = currentDate.getTime() - givenDate.getTime();
	const millisecondsInADay = 1000 * 60 * 60 * 24;
	const daysPassed = Math.floor(differenceInMilliseconds / millisecondsInADay);
	const info = daysPassed === 0 ? `Сегодня` :
		daysPassed === 1 ? `Вчера` :
			daysPassed < 5 ? `${daysPassed} дня назад` : `${daysPassed} дней назад`;
	return `${info}, ${time}`
}

function formatNumberWithSpace(number: number): string {
	return new Intl.NumberFormat('en-US', {
		useGrouping: true,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(number).replace(/,/g, ' ');
}

function sortOrders(orders: Array<IFeedOrder>) {
	let ready: Array<number> = []
	let working: Array<number> = []
	orders.forEach(order => {
		if (order.status === 'done') {
			ready.push(order.number)
		} else {
			working.push(order.number)
		}
	})
	ready = ready.length > 20 ? ready.slice(0, 20) : ready
	working = working.length > 20 ? working.slice(0, 20) : working
	return { ready, working }
}

function handleTotalOrders(total: number, totalToday: number) {
	let totalCopy = ''
	let totalTodayCopy = ''
	if (String(total).length > 3) {
		totalCopy = formatNumberWithSpace(total)
	} else {
		totalCopy = String(total)
	}
	if (String(totalToday).length > 3) {
		totalTodayCopy = formatNumberWithSpace(totalToday)
	} else {
		totalTodayCopy = String(totalToday)
	}
	return { totalCopy, totalTodayCopy }
}

export { updateOrdersData }
