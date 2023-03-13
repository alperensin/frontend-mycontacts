import { useEffect } from 'react';
import useAnimatedList from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const {
    items: messages,
    setItems: setMessages,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  } = useAnimatedList([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => (
        [...prevState, {
          id: Math.random(), type, text, duration,
        }]
      ));
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          onAnimationEnd={handleAnimationEnd}
          isLeaving={pendingRemovalItemsIds.includes(message.id)}
        />
      ))}
    </Container>
  );
}
