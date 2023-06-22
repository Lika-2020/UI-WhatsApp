import './BodyMessageChat.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  sendMessage,
  receiveMessages,
  deleteReceivedNotification,
} from '../../../api/apiMessage';
import { selectMessages } from '../../../store/slice/messageSlice';

function BodyMessageChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');

  const dispatch = useDispatch();

  const phoneNumber = useSelector(
    (state) => state.message.phoneNumber.phoneNumber
  );
  const incomingMessages = useSelector(selectMessages);
  const idInstance = useSelector((state) => state.auth.idInstance);
  const apiTokenInstance = useSelector((state) => state.auth.apiTokenInstance);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      return;
    }

  
    dispatch(
      sendMessage({ idInstance, apiTokenInstance, phoneNumber, message })
    );

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, message },
    ]);

    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Обработка входящих сообщений

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await dispatch(
        receiveMessages({ idInstance, apiTokenInstance })
      );
      const data = response.payload;

      if (
        data &&
        data.body &&
        data.body.messageData &&
        'textMessageData' in data.body.messageData
      ) {
        const { textMessageData } = data.body.messageData;

        if (textMessageData && 'textMessage' in textMessageData) {
          const { textMessage } = textMessageData;
          setNotificationMessage('Received message:', textMessage);
          if (data && data.receiptId) {
            dispatch(
              deleteReceivedNotification({
                idInstance,
                apiTokenInstance,
                receiptId: data.receiptId,
              })
            );
          } else {
            return null;
          }
        } else {
          setNotificationMessage('Received message: В сообщении не текст');
          if (data && data.receiptId) {
            dispatch(
              deleteReceivedNotification({
                idInstance,
                apiTokenInstance,
                receiptId: data.receiptId,
              })
            );
          } else {
            return null;
          }
        }
      } else {
        setNotificationMessage();
        if (data && data.receiptId) {
          dispatch(
            deleteReceivedNotification({
              idInstance,
              apiTokenInstance,
              receiptId: data.receiptId,
            })
          );
        } else {
          return null;
        }
      }
      return null;
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [incomingMessages, dispatch, idInstance, apiTokenInstance]);

  const renderIncomingMessages = () =>
    incomingMessages.map((mess) => {
      if (!mess || !mess.body) {
        return null;
      }

      const { typeWebhook, messageData } = mess.body;

      if (
        typeWebhook === 'incomingMessageReceived' &&
        messageData &&
        messageData.textMessageData &&
        'textMessage' in messageData.textMessageData
      ) {
        const { textMessage } = messageData.textMessageData;
        return (
          <div className="incoming-message" key={mess.body.idMessage}>
            {textMessage}
          </div>
        );
      }
      return null;
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="body-message">
          {messages.map((msg) => (
            <div className="message" key={msg.id}>
              {msg.message}
            </div>
          ))}
          <div>{renderIncomingMessages()}</div>
          <div>{notificationMessage}</div>
        </div>

        <div className="input-block">
          <input
            className="input"
            type="text"
            placeholder="Введите сообщение"
            value={message}
            onChange={handleChange}
          />
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
  );
}

export default BodyMessageChat;
