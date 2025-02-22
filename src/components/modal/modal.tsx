import * as React from 'react';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay, { ModalProps } from './modal-overlay';

const modalRoot = document.getElementById('modals') as Element;

const Modal = ({ closeModal, children }: ModalProps) => {
	const handleCloseButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		closeModal();
	};

	useEffect(() => {
		const closeByEscape = (e: DocumentEventMap['keydown']) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		document.addEventListener('keydown', closeByEscape);
		return () => {
			document.removeEventListener('keydown', closeByEscape);
		};
	}, []);

	// eslint-disable-next-line import/no-named-as-default-member
	return ReactDOM.createPortal(
		<ModalOverlay closeModal={closeModal}>
			<section className={styles.modal}>
				<button className={styles.close} onClick={handleCloseButton}>
					<CloseIcon type='primary' />
				</button>
				{children}
			</section>
		</ModalOverlay>,
		modalRoot
	);
};

export default Modal;
