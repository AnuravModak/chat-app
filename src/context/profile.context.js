import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;

    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };

          console.log(data);

          setProfile(data);
          setIsLoading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }

        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

// import { createContext, useContext, useEffect, useState } from 'react';
// import { auth, database } from '../misc/firebase';

// const ProfileContext = createContext();

// export const ProfileProvider = ({ children }) => {
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const authUnsub = auth.onAuthStateChanged(authobj => {
//       if (authobj) {
//         database.ref(`/profiles/${authobj.uid}`).on('value', snap => {
//           const { name, createdAt } = snap.val(); //this will give data in json format
//           console.log(name, snap);
//           const data = {
//             name,
//             createdAt,
//             uid: authobj.uid,
//             email: authobj.email,
//           };
//           setProfile(data);
//           setIsLoading(false);
//         });
//       } else {
//         setProfile(null);
//         setIsLoading(false);
//       }
//     });
//     return () => {
//       authUnsub();
//     };
//   }, []);

//   return (
//     <ProfileContext.Provider value={profile}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };
// export const useProfile = () => useContext(ProfileContext);
