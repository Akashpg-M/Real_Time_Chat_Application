import {useState} from "react";

const ProfilePage = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async(e) => {
    const file= e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const photo = reader.result;
      setSelectedImage(photo);
      await updateProfile({profilePic: photo});
    };
  };

  return (
    <div>
      <div>
        <h1>Profile</h1>
        <p>Your Profile Information</p>
      </div>

      <div>
        <div>
          <img  
            src={selectedImage || authUser.profilePic || "/avatar.png"}
            alt="profile"
            className = "size-32 rounded-full object-cover border-4"
          />

          <label  
            html="photo-upload" className="cursor-pointer"
          >
            <Camera/>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p>
          {isUpdatingProfile ? "Uploading..." : "Click camera icon to update profile photo"}
        </p>
      </div>

      <div>
        <div>
          <Mail/>
          Email Address
        </div>
        <p>{authUser?.email}</p>
      </div>

      <div>
        <h2>Account Information</h2>
        <div>
          <div>
            <span>Memeber Since</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div>
            <span>Account Status</span>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;