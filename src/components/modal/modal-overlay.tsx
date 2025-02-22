import * as React from 'react';
import styles from './styles.module.scss';

export interface ModalProps {
	closeModal: () => void;
	children: React.ReactNode;
}

const ModalOverlay = ({ closeModal, children }: ModalProps) => {
	const closeModalWindow: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (e.target === e.currentTarget) {
			e.stopPropagation();
			e.preventDefault();
			closeModal();
		}
	};

	return (
		<div className={styles.overlay} onClick={closeModalWindow}>
			{children}
		</div>
	);
};

export default ModalOverlay;
