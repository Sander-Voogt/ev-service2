import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [show, setShow] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            document.body.style.overflow = "hidden";
            // A small delay to allow the DOM to render before applying the transition classes
            setTimeout(() => setIsTransitioning(true), 10);
        } else {
            setIsTransitioning(false);
            // Delay unmount for transition
            setTimeout(() => {
                setShow(false);
                document.body.style.overflow = "unset";
            }, 300); // This must match the CSS transition duration
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            // This is a safety measure, but the main body overflow is handled by the first useEffect
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!show) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity duration-300 ${
                    isTransitioning ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                ref={modalRef}
                className={`relative bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                    isTransitioning ? "scale-100 opacity-100" : "scale-95 opacity-0"
                } md:max-w-xl`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;