import { Modal } from 'semantic-ui-react';

export default function ModalForm({ trigger, component, setOpen, open }) {
  return (
    <Modal
      trigger={trigger}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      dimmer="inverted"
    >
      {component}
    </Modal>
  );
}
