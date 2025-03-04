import * as React from 'react';
import styles from './styles.module.scss';
import {ConstructorElement, DragIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch} from 'react-redux';
import {DropTargetMonitor, useDrag, useDrop} from 'react-dnd';
import {sortIngredients} from '../../../../services';

interface Props {
	index: number;
	text: string;
	price: number;
	thumbnail: string;
	isLast: boolean;
}

interface OffsetDataInterface {
	x: number;
	y: number;
}

const BurgerConstructorItem = ({
	index,
	text,
	price,
	thumbnail,
	isLast,
}: Props) => {
	const conditionalPadding = 16;
	const dispatch = useDispatch();

	const [{ source }, dragRef] = useDrag({
		type: 'inside',
		item: { index },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
			source: monitor.getInitialSourceClientOffset(),
		}),
		end: (item, monitor) => {
			const dropResult: any = monitor.getDropResult();

			if (dropResult && typeof dropResult.data === 'string') {
				handleOverBun(dropResult.data, index);
			} else if (dropResult) {
				const position = handleDrop(source, dropResult.data, index);
				dispatch(sortIngredients({ position, index }))
			}
		},
	});

	function handleOverBun(type: 'top' | 'bottom', index: number) {
		const position = type === 'top' ? 0 : length;
		dispatch(sortIngredients({ position, index }));
	}

	const handleDrop = (source: any, target: any, index: number) => {
		const element = document.querySelector<HTMLElement>(
			`.constructor-list-item:nth-child(${index + 1})`
		);
		if (!element) {
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

	const [{ offsetData }, dropTarget] = useDrop({
		accept: 'inside',
		collect: () => ({ offsetData: { x: 0, y: 0 } }),
		hover: (item, monitor) => {
			const currentOffset = monitor.getSourceClientOffset();
			if (currentOffset) {
				offsetData.x = currentOffset.x;
				offsetData.y = currentOffset.y;
			}
		},
		drop: (): { data: OffsetDataInterface; index: number } => ({
			data: offsetData,
			index,
		}),
	});

	return (
		<li className={styles.container} ref={dropTarget}>
			<div className={styles.icon} ref={dragRef}>
				<DragIcon type='primary' />
			</div>
			<ConstructorElement
				text={text}
				price={price}
				thumbnail={thumbnail}
				key={index}
				extraClass={!isLast ? 'mb-4' : ''}
			/>
		</li>
	);
};

export default BurgerConstructorItem;
