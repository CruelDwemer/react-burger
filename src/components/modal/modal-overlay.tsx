import * as React from 'react';
import styles from './styles.module.scss';

export interface IModalProps {
	closeModal: () => void;
	children: React.ReactNode;
}

const ModalOverlay = ({ closeModal, children }: IModalProps) => {
	const closeModalWindow: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (e.target === e.currentTarget) {
			e.stopPropagation();
			e.preventDefault();
			closeModal();
		}
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={styles.overlay} onClick={closeModalWindow}>
			{children}
		</div>
	);
};

export default ModalOverlay;
