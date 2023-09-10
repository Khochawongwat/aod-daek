import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonPage,
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

const WelcomePage: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
    displayName: "",
  })
  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FirebaseAuth, loginDetails.email, loginDetails.password).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.user))
        console.log("[Info] Successfully logged in.")
      })

    } catch (error) {
      console.error("[Error]:", error);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(FirebaseAuth, loginDetails.email, loginDetails.password).then(
        async (cred) => {
          const userDocData = {
            displayName: loginDetails.displayName,
            email: loginDetails.email,
            profileImage: "",
          };

          await setDoc(doc(FirestoreDatabase, "Users", cred.user.uid), userDocData);

          console.log(`[Info] Successfully created a user with ${loginDetails.email}.`)
        }
      )
      await handleLogin()

    } catch (error) {
      console.error("[Error] Registration error:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
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
