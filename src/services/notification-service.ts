import { useEffect, useMemo, useState } from "react";
import { db } from "@/domain/config/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { INotification } from "@/domain/models/notification-model";
 
const useNotifications = (currentUser: any) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!currentUser) return;

    setLoading(true);

    const q = query(
      collection(db, "notifications"),
      where("student_email", "==", currentUser.email)
    );
    const querySnapshot = await getDocs(q);

    const fetchedNotifications: INotification[] = [];
    querySnapshot.forEach((doc) => {
      const notificationData = doc.data();
      fetchedNotifications.push({
        id: doc.id, // Use the document id as a unique identifier
        title: notificationData.title,
        content: notificationData.content,
        student_email: notificationData.student_email,
        createdAt: notificationData.createdAt.toDate(),
      });
    });

    // Sort notifications from most recent to oldest
    fetchedNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setNotifications(fetchedNotifications);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentUser]);

  const sortedNotifications = useMemo(() => notifications, [notifications]);

  const deleteNotification = async (notificationId: string) => {
    try {
      await deleteDoc(doc(db, "notifications", notificationId));
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return { sortedNotifications, deleteNotification, loading };
};

export default useNotifications;
