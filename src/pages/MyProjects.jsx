import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "../components/Card";
import { useEffect } from "react";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { counter } from "@fortawesome/fontawesome-svg-core";

function MyProjects() {
  const [user, loading] = useAuthState(auth);

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    setProjects([]);
    const fetchProjects = async () => {
      const q = query(
        collection(db, "projects"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      setProjects(querySnapshot.docs);
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-[100%] flex justify-center">
        <div className="columns-1 md:columns-2 lg:columns-3 py-5">
          {projects?.map((obj) => {
            return (
              <Card obj={obj.data()} key={obj.id} id={obj.id} noFav="true" />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
