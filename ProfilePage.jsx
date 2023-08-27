import React from "react";

function ProfilePage() {
  const mockData = {
    username: "Hello",
  };
  //   const fetchData = async () => {
  //     const result = await axios.get("/user/:id");
  //   };

  return (
    <div>
      <h2>Hello, new user</h2>
      <div>{mockData.username}</div>
    </div>
  );
}

export default ProfilePage;
