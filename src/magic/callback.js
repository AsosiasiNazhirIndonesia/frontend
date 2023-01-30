import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { magic } from './lib/magic';
import Loading from './loading';
import { useHistory } from 'react-router-dom';
import API from '../services/api';
import magicweb3 from '../services/magicweb3';
import { setActorType } from '../modules/actions/actor.action';
import { ACTOR, ACTOR_TOKEN } from "../constants/component.constant";

const Callback = (props) => {
  const history = useHistory();
  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    let magicCredential = new URLSearchParams(props.location.search).get('magic_credential');
    if (magicCredential) magic.auth.loginWithCredential().then((didToken) => authenticateWithServer(didToken));
  }, [props.location.search]);

  // Send token to server to validate
  const authenticateWithServer = async (didToken) => {
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });

    if (res.status === 200) {
      // Set the UserContext to the now logged in user
            let userMetadata = await magic.user.getMetadata();
            let user;

            const admin = await API.getAdminByPublicKey(userMetadata.publicAddress);
            if (!admin) {
              user = await API.getUserByPublicKey(userMetadata.publicAddress);
              if (!user) {
                let request = {
                  name: userMetadata.email.split("@")[0],
                  email: userMetadata.email,
                  public_key: userMetadata.publicAddress
                  // phone_number: userMetadata.phoneNumber, //defaulted
                  // photo: 'a23ebf30-8beb-11ed-ada9-05a51e9dd947.png' //defaulted
                }
                user = await API.createUser(request);
              }
            }
            const message = `DIGICERT${(admin) ? admin.login_nonce : user.login_nonce}`;
            const dataToSign = magicweb3.utils.sha3(message);
            const signature = await magicweb3.eth.personal.sign(dataToSign, (admin) ? admin.public_key : user.public_key);  
            const result = (admin) ? await API.adminLogin({admin_id: admin.admin_id, signature}) : await API.userLogin({user_id: user.user_id, signature});
            localStorage.setItem((admin) ? ACTOR_TOKEN.DIGICERT_ADMIN_TOKEN : ACTOR_TOKEN.DIGICERT_USER_TOKEN, result.token);
            props.setActorType((admin) ? ACTOR.ADMIN : ACTOR.USER);
            history.push((admin) ? '/dashboard/ADMIN' : '/dashboard/USER');
    }
  };

  return <Loading />;
};

const mapDispatchToProps = (dispatch) => {
  return {
      async setActorType(type) {
          dispatch(setActorType(type));
      }
  }
};

export default connect(null, mapDispatchToProps)(React.memo(Callback));
// export default Callback;
