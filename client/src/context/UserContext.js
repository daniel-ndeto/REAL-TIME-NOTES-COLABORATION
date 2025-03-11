import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // LocalStorage keys
  const STORAGE_USER_KEY = 'rtNotesUser';
  const STORAGE_ROOM_KEY = 'rtNotesRoom';

  // State for user, room, and loading
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user & room from localStorage on initial mount
  useEffect(() => {

    const storedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedRoom = localStorage.getItem(STORAGE_ROOM_KEY);
    if (storedRoom) {
      setRoom(JSON.parse(storedRoom));
    }

    //  loading after retrieving from storage
    setLoading(false);
  }, []);

  // Whenever user changes, sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [user]);

  // Whenever room changes, sync to localStorage
  useEffect(() => {
    if (room) {
      localStorage.setItem(STORAGE_ROOM_KEY, JSON.stringify(room));
    } else {
      localStorage.removeItem(STORAGE_ROOM_KEY);
    }
  }, [room]);

  return (
    <UserContext.Provider value={{ user, setUser, room, setRoom, loading }}>
      {children}
    </UserContext.Provider>
  );
};
