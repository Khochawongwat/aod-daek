import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { FirebaseAuth } from '../firebase/auth';

const Tab3: React.FC = () => {
  async function signOut(){
    await FirebaseAuth.signOut().then(
      () => {
        console.log("[INFO]Successfully logged out.")
        localStorage.clear();
      }
    ).catch((e) => {
      console.log("[ERROR] " + e)
    })
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={signOut}>
          Signout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
