import { useEffect, useRef, type FC } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm Reset',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

  // Focus management and ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    // Focus cancel button by default for safety on destructive action
    cancelBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="modal-content"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-icon-warning" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h2 id="confirm-modal-title" className="modal-title">
            {title}
          </h2>
        </div>

        <p id="confirm-modal-description" className="modal-description">
          {message}
        </p>

        <div className="modal-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="modal-btn modal-cancel-btn"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            className="modal-btn modal-confirm-btn"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
