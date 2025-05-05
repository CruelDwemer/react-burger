import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { IIngredientData, IFeedUpdatedOrder } from '../../types';

type TFeedOrderProps = {
	order: IFeedUpdatedOrder;
	page: string;
};

const FeedOrder = ({ order, page }: TFeedOrderProps): React.JSX.Element => {
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const setPrice = useCallback(() => {
		const price = order.updatedIngredients.reduce(
			(acc: number, ingredient: IIngredientData) => acc + ingredient.price,
			0
		);
		setTotalPrice(price);
	}, [order.updatedIngredients]);

	const navigate = useNavigate();
	const location = useLocation();

	const showModal = () => {
		navigate(`/${page}/${order.number}`, { state: { background: location } });
	};

	useEffect(() => {
		setPrice();
	}, [order, setPrice]);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.container} onClick={showModal}>
			<p className={styles.header}>
				<span className='text text_type_digits-default'>#{order.number}</span>
				<span className='text text_type_main-default text_color_inactive'>
					{order.date}
				</span>
			</p>
			<p className='text text_type_main-medium'>{order.name}</p>
			<div className={styles.footer}>
				<div className={styles.images}>
					{order.updatedIngredients.map(
						(ingredient: IIngredientData, index: number) => {
							if (index < 6) {
								return (
									<IngredientImage
										key={index}
										image={ingredient.image_mobile}
										index={index}
										length={order.updatedIngredients.length}
									/>
								);
							} else {
								return null;
							}
						}
					)}
				</div>
				<div className={styles.price}>
					<p className='text text_type_digits-default mr-2'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

type TState = {
	zIndex: number;
	right: string;
	opacity?: number;
};

const IngredientImage = ({
	image,
	index,
	length,
}: {
	image: string;
	index: number;
	length: number;
}): React.JSX.Element => {
	const [position, setPosition] = useState<TState>();

	const handlePosition = useCallback(() => {
		let overlap = 10;
		let shift = 0;

		for (let i = 0; i < index; i++) {
			shift += 22;
			overlap -= 1;
		}
		return {
			zIndex: overlap,
			right: `${shift}px`,
		};
	}, [index]);

	useEffect(() => {
		const newStyles = handlePosition();
		setPosition(newStyles);
	}, [handlePosition]);

	if (index === 5 && length > 6) {
		return (
			<div
				className={styles.imageContainer}
				style={{
					zIndex: 0,
					right: '110px',
				}}>
				<img
					src={image}
					alt='ingredient'
					className={styles.image}
					style={{ opacity: 0.5 }}
				/>
				<div className={styles.overlapper}>
					<p className='text text_type_main-small'>{`+${length - 6}`}</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.imageContainer} style={position}>
				<img src={image} alt='ingredient' className={styles.image} />
			</div>
		);
	}
};

export default FeedOrder;
