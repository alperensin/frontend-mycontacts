import PropTypes from 'prop-types';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger = false,
  children = null,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  visible = false,
  isLoading = false,
  title,
  onCancel,
  onConfirm,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay ref={animatedElementRef} isLeaving={!visible}>
        <Container isLeaving={!visible} danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>{cancelLabel}</button>
            <Button isLoading={isLoading} type="button" danger={danger} onClick={onConfirm}>{confirmLabel}</Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  isLoading: PropTypes.bool,
};
