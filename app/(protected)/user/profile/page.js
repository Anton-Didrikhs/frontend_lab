"use client"
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "@/app/lib/firebase/AuthContext";
import { db } from '@/app/lib/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ProfileForm() {
  const { user } = useAuth();
  const auth = getAuth();
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    address: {
      city: "",
      street: "",
      zipCode: ""
    }
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const profileData = docSnap.data();
            setProfile({
              displayName: user.displayName  || "",
              email: user.email || "",
              photoURL: user.photoURL || "",
              address: profileData.address || { city: "", street: "", zipCode: "" }
            });
          } else {
            setProfile({
              displayName: user.displayName || "",
              email: user.email || "",
              photoURL: user.photoURL || "",
              address: { city: "", street: "", zipCode: "" }
            });
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setError("Error fetching profile data.");
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in profile.address) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        address: {
          ...prevProfile.address,
          [name]: value
        }
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await updateProfile(user, {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      });
      await setDoc(doc(db, "users", user.uid), profile);
      console.log("Profile updated successfully");
    } catch (error) {
      setError(error.message);
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Profile"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
        <main className="flex items-center justify-center p-8 sm:p-12 lg:col-span-7 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Profile</h1>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={profile.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  id="photoURL"
                  name="photoURL"
                  type="text"
                  value={profile.photoURL}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {profile.photoURL && (
                <div>
                  <img
                    src={profile.photoURL}
                    alt=""
                    className="mt-4 w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={profile.address.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  value={profile.address.street}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={profile.address.zipCode}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}