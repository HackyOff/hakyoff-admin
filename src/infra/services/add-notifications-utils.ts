import { db } from "@/domain/config/firebase";
import { RANDOM_CODE } from "@/domain/config/navbar-config";
import { Timestamp, collection, addDoc } from "firebase/firestore";

interface NotI {
  student_email: string;
  user_name?: string;
  user_id?: string;
  content: string;
  title: string;
}

export async function AddNotificationsUtils({
  student_email,
  title,
  content,
}: NotI) {
  try {
    const notificationCollectionRef = collection(db, "notifications");
    await addDoc(notificationCollectionRef, {
      content: content,
      student_email: student_email,
      title: title,
      createdAt: Timestamp.now(),
      id: RANDOM_CODE,
    });
    //console.log("Notification added successfully");
  } catch (error: any) {
   // console.log("Error adding notification: ", error.message);
  }
}
