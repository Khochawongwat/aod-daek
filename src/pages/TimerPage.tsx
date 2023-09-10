import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './TimerPage.css';
import { User } from '@firebase/auth';
import { Session } from '../schema/Session';

interface Props {
  user: User
  endFastCallback: ()=>void
  session: Session 
}

const TimerPage: React.FC<Props> = ({ user, endFastCallback, session}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonTitle>Timer</IonTitle>
        </IonHeader>
        <IonHeader>
          {""}
        </IonHeader>
        <IonButton onClick={endFastCallback}>
          END FAST
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TimerPage;
