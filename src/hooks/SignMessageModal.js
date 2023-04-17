import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers/lib/utils';

export function SignMessage() {
  const recoveredAddress = React.useRef();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  return (
    
    <div className='home_page_container' style={{background: "none",padding : "0px"}}>
    <div className="container">
      <div className="home_container">
        <div className="home_form" style={{marginTop : "50px !important", width: "80%"}}>
          <form  onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const message = formData.get('message');
        signMessage({ message });
      }}
    >
            <div className="form_top">
              <h3>Swap</h3>
              
            </div>
            <div className="form_content_wrapper">
              <div className="swap_box_top">
                <div className="swap_box">
                  
                  <div className="token_balance">
                    <div className="value">
                      <input id="message" name="message" placeholder="Enter your message" style={{fontSize : "17px"}} />
                    </div>
                  </div>
                </div>
               
              </div>
             
              <div className="connect_btn">
              <button disabled={isLoading}>{isLoading ? 'Check Wallet' : 'Sign Message'}</button>
              </div>
              {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div style={{marginTop : "20px", fontSize : "19px"}}>{error.message}</div>}
            </div>
          </form>
         
        </div>
      </div>
    </div>
    </div>
  );
}

const SignMessageModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleOpenModal} style={{fontWeight: "bold" , border : "none"}}>Sign Message</button>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <div className="modal">
          
          <SignMessage />
        </div>
      </ReactModal>
    </>
  );
};

export default SignMessageModal;

