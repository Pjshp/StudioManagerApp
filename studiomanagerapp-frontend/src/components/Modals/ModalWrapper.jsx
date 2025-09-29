import { useEffect, useRef } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

// Globalny stan do śledzenia otwartych modali
let openModalsCount = 0;

const ModalWrapper = ({ isOpen, onClose, children, maxWidth = "600px" }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            openModalsCount++;
        }

        return () => {
            if (isOpen) {
                openModalsCount--;
            }
        };
    }, [isOpen]);

    // ESC key handler
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                event.preventDefault();
                event.stopPropagation();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey, true);
            return () => {
                document.removeEventListener('keydown', handleEscKey, true);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={false} // Obsługujemy ESC ręcznie
            preventScroll={true}
            shouldReturnFocusAfterClose={true}
            shouldFocusAfterRender={true}
            ariaHideApp={openModalsCount === 1} // Tylko pierwszy modal ukrywa app
            parentSelector={() => document.body}
            portalClassName={`modal-portal-${openModalsCount}`}
            overlayRef={(node) => {
                if (node) {
                    modalRef.current = node;
                }
            }}
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1000 + openModalsCount * 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                content: {
                    position: "relative",
                    top: "auto",
                    left: "auto",
                    right: "auto",
                    bottom: "auto",
                    transform: "none",
                    width: "90%",
                    maxWidth: maxWidth,
                    maxHeight: "90vh",
                    padding: "20px",
                    borderRadius: "0.5rem",
                    overflow: "auto",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "white"
                }
            }}
            contentLabel="Modal"
        >
            {children}
        </Modal>
    );
};

ModalWrapper.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    maxWidth: PropTypes.string,
};

export default ModalWrapper;