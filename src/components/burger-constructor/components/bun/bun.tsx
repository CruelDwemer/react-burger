import { IIngredientData } from '../../../../types';
import * as React from 'react';
import classnames from '@utils/classnames';
import styles from './styles.module.scss';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

interface IBunProps {
	bun: IIngredientData | null;
	type: 'top' | 'bottom';
}

interface IBunDragObject {
	data: 'top' | 'bottom';
}

const TopBunPlaceHolder = (): React.JSX.Element => (
	<div
		className={classnames(
			styles.constructorElement,
			styles.constructorElementPosTop
		)}>
		Добавьте булку
	</div>
);
const BottomBunPlaceHolder = (): React.JSX.Element => (
	<div
		className={classnames(
			styles.constructorElement,
			styles.constructorElementPosBottom
		)}>
		Добавьте булку
	</div>
);
export const ElementPlaceHolder = (): React.JSX.Element => (
	<div className={styles.constructorElement}>Добавьте ингредиент</div>
);

const Bun = ({ bun, type }: IBunProps): React.JSX.Element => {
	const [, dropTarget] = useDrop<IBunDragObject, unknown, unknown>({
		accept: 'inside',
		drop: () => ({ data: type }),
	});

	if (!bun) {
		return type === 'top' ? <TopBunPlaceHolder /> : <BottomBunPlaceHolder />;
	}

	return (
		<div ref={dropTarget}>
			<ConstructorElement
				text={`${bun!.name} \n ${type === 'top' ? '(верх)' : '(низ)'}`}
				price={bun!.price}
				thumbnail={bun!.image_mobile}
				isLocked={true}
				extraClass='mt-4'
				type={type}
			/>
		</div>
	);
};

export default Bun;
