import { create } from "zustand";

interface Notification {
  title: string;
  id: string;
  description: string;
}

interface INotificationStore {
  notifcations: Notification[];
  changeAllNotifications: (data: Notification[]) => void;
}

const changeAllNotifications = (
  state: INotificationStore,
  data: Notification[]
): Notification[] => {
  return (state.notifcations = data);
};

const useNotification = create<INotificationStore>()((set) => ({
  notifcations: [],
  changeAllNotifications: (dataId) =>
    set((state) => ({
      notifcations: changeAllNotifications(state, dataId),
    })),
}));

export default useNotification;
