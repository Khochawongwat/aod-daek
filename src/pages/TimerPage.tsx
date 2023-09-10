import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './TimerPage.css';
import { User } from '@firebase/auth';

interface Props{
  user: User
}

const TimerPage: React.FC<Props> = ({user}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default TimerPage;
