import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import avatar from '../../../img/avatar.jpg';
import { setPhoneNumber } from '../../../store/slice/messageSlice';


import './BodyListChat.css';

function BodyListChat() {
  const dispatch = useDispatch();
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);


  const phoneNumber = useSelector((state) => state.message.phoneNumber);
  const isBlockVisible = useSelector((state) => state.ui.isBlockVisible);

  const handleCreateChat = () => {
    // Обновление номера телефона в состоянии Redux
    dispatch(setPhoneNumber({ phoneNumber: phoneNumberInput }));
    setPhoneNumberInput(''); // Сброс поля ввода номера телефона
    setPhoneNumbers([...phoneNumbers, phoneNumberInput]);
  };

  console.log(phoneNumber);

  return (
    <div>
      {isBlockVisible && (
        <div className="form-container">
          <input
            type="number"
            value={phoneNumberInput}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
          />
          <button type="submit" onClick={handleCreateChat}>
            Создать
          </button>
        </div>
      )}
      <div className="list-chats">
        {phoneNumbers.map((number) => (
          <div role='presentation'
            className="list-item"
            key={number.id}
            
          >
            <div className="container-listItem">
              <div className="container-img">
                <img src={avatar} alt="аватар" />
              </div>
              <div className="title-span">
                <span>{number}</span>
              </div>
              <div className="arrow-block ">
                <div className="arrow-down" />
              </div>
            </div>
          </div>
        ))}
      </div>
 
    </div>
  );
}

export default BodyListChat;
