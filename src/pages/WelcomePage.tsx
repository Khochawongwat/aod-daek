import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonPage,
  IonToast,
} from '@ionic/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { setDoc, doc } from '@firebase/firestore';
import { FirestoreDatabase } from '../firebase/firestore';
import { FirebaseAuth } from '../firebase/auth';

class LoginDetails {
  email!: string
  password!: string
  displayName!: string
}

enum ResponseCode {
  Danger = 0,
  Success = 1,
  Unknown = 2,
}

const WelcomePage: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
    displayName: "",
  })

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [responseCode, setResponseCode] = useState<ResponseCode>(ResponseCode.Unknown);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FirebaseAuth, loginDetails.email, loginDetails.password).then((response) => {
        setShowToast(true)
        setToastMessage(JSON.stringify(response))
        setResponseCode(1)
      })
    } catch (error) {
      setShowToast(true)
      setToastMessage(JSON.stringify(error))
      setResponseCode(0)
    }
  };

  const handleSignup = async () => {
    if (loginDetails.displayName.trim() === '') {
      setShowToast(true);
      setToastMessage('Please enter a display name.');
      setResponseCode(ResponseCode.Danger);
      return;
    }
    try {
      await createUserWithEmailAndPassword(FirebaseAuth, loginDetails.email, loginDetails.password).then(
        async (cred) => {
          const userDocData = {
            displayName: loginDetails.displayName,
            email: loginDetails.email,
            profileImage: "",
          };
  
          await setDoc(doc(FirestoreDatabase, "Users", cred.user.uid), userDocData).then((e: any) => {
            setShowToast(true);
            setToastMessage(e);
            setResponseCode(ResponseCode.Success);
          }).catch((e) => {
            setShowToast(true);
            setToastMessage(e);
            setResponseCode(ResponseCode.Danger);
            return;
          });
        }
      ).catch((e) => {
        setShowToast(true);
        setToastMessage(`${e} error has occurred. Please try again.`);
        setResponseCode(ResponseCode.Danger);
        return;
      });
    } catch {
      setShowToast(true);
      setToastMessage("Unknown error has occurred. Please try again.");
      setResponseCode(ResponseCode.Danger);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        color={
          responseCode === ResponseCode.Success
            ? 'success'
            : responseCode === ResponseCode.Danger
            ? 'danger'
            : 'medium'
        }
        duration={3000}
        onDidDismiss={() => setShowToast(false)}
        position='top'
      />
      <IonContent>
        <input
          type="text"
          placeholder="Username"
          value={loginDetails.displayName}
          onChange={(e) => setLoginDetails({ ...loginDetails, displayName: e.target.value })}>
        </input>
        <input
          type="email"
          placeholder="Email"
          value={loginDetails.email}
          onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginDetails.password}
          onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        />
        <IonButton onClick={() => handleLogin()}>Login</IonButton>
        <IonButton onClick={handleSignup}>Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
