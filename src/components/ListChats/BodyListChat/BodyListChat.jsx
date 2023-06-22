import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
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
          <input className='input-number'
            type="number"
            value={phoneNumberInput}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
          />
          <button className='create-button' type="submit" onClick={handleCreateChat}>
            Создать
          </button>
        </div>
      )}
      <div className="list-chats">
        {phoneNumbers.map((number) => (
          <div role='presentation'
            className="list-item"
            key={number}
            
          >
            <div className="container-listItem">
           
              <div className="title-span">
                <span>{number}</span>
              </div>
           
            </div>
          </div>
        ))}
      </div>
 
    </div>
  );
}

export default BodyListChat;
