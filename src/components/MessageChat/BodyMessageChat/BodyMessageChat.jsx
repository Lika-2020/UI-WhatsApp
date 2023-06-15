import './BodyMessageChat.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  sendMessage,
  receiveMessages,
  deleteReсeivedMessage,
} from '../../../api/apiMessage';
import { selectMessages } from '../../../store/slice/messageSlice';

function BodyMessageChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Состояние для хранения отправленных сообщений
  // Состояние для хранения введенного сообщения
  const dispatch = useDispatch();
  const [receiptId, setReceiptId] = useState(null);

  const phoneNumber = useSelector(
    (state) => state.message.phoneNumber.phoneNumber
  );

  const incomingMessages = useSelector(selectMessages);
  console.log(incomingMessages);

  const idInstance = useSelector((state) => state.auth.idInstance);

  const apiTokenInstance = useSelector((state) => state.auth.apiTokenInstance);

  console.log(phoneNumber);
  console.log(idInstance);
  console.log(apiTokenInstance);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      return; // Не отправляем пустое сообщение
    }

    console.log(
      dispatch(
        sendMessage({ idInstance, apiTokenInstance, phoneNumber, message })
      )
    );

    // Добавление нового сообщения к списку
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, message },
    ]);
    // Очищаем поле ввода после отправки сообщения
    setMessage('');
  };

  console.log(phoneNumber);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // ниже логика входящих сообщений

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await dispatch(
          receiveMessages({ idInstance, apiTokenInstance })
        );

        if (!response) {
          return;
        }

        const { body } = response;

        if (!body?.messageData) {
          await dispatch(
            deleteReсeivedMessage({ idInstance, apiTokenInstance, receiptId })
          );
        } else if (body?.messageData) {
          setReceiptId(body.receiptId);
          incomingMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              message: `RECEIVED.${body?.messageData.textMessageData?.textMessage}`,
              receiptId: body.receiptId,
            },
          ]);
          await dispatch(
            deleteReсeivedMessage({
              idInstance,
              apiTokenInstance,
              receiptId: body.receiptId,
            })
          );
        } else if (body.senderData.sender === `${phoneNumber}@c.us`) {
          await dispatch(
            deleteReсeivedMessage({ idInstance, apiTokenInstance, receiptId })
          );
        }

        // Обработка receiptId
        if (receiptId) {
          const deletedReceiptId = receiptId;
          if (deletedReceiptId) {
            // Удалить сообщение с receiptId из состояния incomingMessages
            // Например, можно использовать filter для удаления сообщения с соответствующим receiptId:
            incomingMessages((prevMessages) =>
              prevMessages.filter((msg) => msg.receiptId !== deletedReceiptId)
            );
          }
        }
      } catch (error) {
        console.error(error);
        alert('Ошибка сети, проверьте ваше подключение к интернету');
      }
    };

    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [
    dispatch,
    idInstance,
    apiTokenInstance,
    phoneNumber,
    receiveMessages,
    deleteReсeivedMessage,
    receiptId,
    incomingMessages,
  ]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="body-message">
          {/* Отображаем отправленные сообщения */}
          {messages.map((msg) => (
            <div className="message" key={msg.id}>
              {msg.message}
            </div>
          ))}
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
      <div>
        {incomingMessages.map((msg) => (
          <div key={msg.id}>{msg.message}</div>
        ))}
      </div>
    </div>
  );
}

export default BodyMessageChat;
