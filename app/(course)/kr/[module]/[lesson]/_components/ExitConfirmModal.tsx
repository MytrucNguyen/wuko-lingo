"use client";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

type Props = {
  moduleSlug: string;
  open: boolean;
  onCancel: () => void;
};

export function ExitConfirmModal({ moduleSlug, open, onCancel }: Props) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      ariaLabelledBy="exit-modal-title"
      size="sm"
    >
      <h2 id="exit-modal-title" className="modal-title">
        Leave this lesson?
      </h2>
      <Modal.Body>
        <p className="modal-text">
          Your progress in this lesson will not be saved. You can come back and start it again any time.
        </p>
      </Modal.Body>
      <Modal.Actions>
        <Button variant="destructive" href={`/kr/${moduleSlug}`}>
          Leave lesson
        </Button>
        <Button variant="primary" onClick={onCancel}>
          Keep going
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
