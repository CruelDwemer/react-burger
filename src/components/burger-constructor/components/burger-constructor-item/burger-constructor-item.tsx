import * as React from 'react';
import styles from './styles.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import {
	sortIngredients,
	removeIngredient,
	useAppDispatch,
} from '@services/index';
import classnames from '@utils/classnames';

interface IDragObject {
	index: number;
}

interface IDragCollectedProps {
	isDrag: boolean;
	source: XYCoord | null;
}

interface IDropCollectedProps {
	offsetData: { x: number; y: number };
}

interface IProps {
	index: number;
	text: string;
	price: number;
	thumbnail: string;
	isLast: boolean;
	dataKey: string;
}

interface DropResult {
	data: 'top' | 'bottom' | XYCoord;
}

const BurgerConstructorItem = ({
	index,
	text,
	price,
	thumbnail,
	isLast,
	dataKey,
}: IProps): React.JSX.Element => {
	const conditionalPadding = 16;
	const dispatch = useAppDispatch();

	const [{ source }, dragRef] = useDrag<
		IDragObject,
		unknown,
		IDragCollectedProps
	>({
		type: 'inside',
		item: { index },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
			source: monitor.getInitialSourceClientOffset(),
		}),
		end: (item, monitor) => {
			const dropResult: DropResult | null = monitor.getDropResult();

			if (dropResult && typeof dropResult.data === 'string') {
				handleOverBun(dropResult.data, index);
			} else if (dropResult) {
				const position = handleDrop(source, dropResult.data as XYCoord, index);
				dispatch(sortIngredients({ position, index }));
			}
		},
	});

	const handleOverBun = (type: 'top' | 'bottom', index: number): void => {
		const position = type === 'top' ? 0 : length;
		dispatch(sortIngredients({ position, index }));
	};

	const handleDrop = (
		source: XYCoord | null,
		target: XYCoord,
		index: number
	) => {
		const element = document.querySelector<HTMLElement>(
			`.constructorItem:nth-child(${index + 1})`
		);
		if (
			!element ||
			!source ||
			typeof source.x === 'undefined' ||
			typeof source.y === 'undefined'
		) {
			return;
		}
		const elementHeight = element!.offsetHeight + conditionalPadding;
		const result = {
			x: Math.round(target.x - source.x),
			y: Math.round(target.y - source.y),
		};
		const offsetY = result.y;
		const listHeight = (index + 1) * elementHeight;
		return Math.trunc((listHeight + offsetY) / elementHeight);
	};

	const [{ offsetData }, dropTarget] = useDrop<
		IDragObject,
		unknown,
		IDropCollectedProps
	>({
		accept: 'inside',
		collect: () => ({ offsetData: { x: 0, y: 0 } }),
		hover: (item, monitor) => {
			const currentOffset = monitor.getSourceClientOffset();
			if (currentOffset) {
				offsetData.x = currentOffset.x;
				offsetData.y = currentOffset.y;
			}
		},
		drop: (): { data: XYCoord; index: number } => ({
			data: offsetData,
			index,
		}),
	});

	const deleteItem = (): void => {
		dispatch(removeIngredient(dataKey));
	};

	return (
		<li
			className={classnames(styles.container, 'constructorItem')}
			ref={dropTarget}>
			<div className={styles.icon} ref={dragRef}>
				<DragIcon type='primary' />
			</div>
			<ConstructorElement
				text={text}
				price={price}
				thumbnail={thumbnail}
				key={index}
				extraClass={!isLast ? 'mb-4' : ''}
				handleClose={deleteItem}
			/>
		</li>
	);
};

export default BurgerConstructorItem;
