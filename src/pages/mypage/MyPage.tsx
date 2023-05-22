import ContentContainer from "../../components/common/ContentContainer";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue } from "recoil";
import { storage } from "../../firebase/initFirebase";
import { ref, uploadBytes } from "firebase/storage";

const MyPage = () => {
  const { userInfo } = useRecoilValue(authAtom);

  // const handleChange = async (e) => {
  //   const file = e.target.files[0];

  //   const storageRef = ref(storage, `profile/${userInfo?.email}`);
  //   const response = await uploadBytes(storageRef, file);
  //   if (response) console.log("uploaded!");
  // };

  return (
    <ContentContainer>
      <div>
        <p>{userInfo?.displayName}</p>
        <p>{userInfo?.email}</p>
      </div>

      <input type="file" accept="image/png, image/jpeg" />
    </ContentContainer>
  );
};

export default MyPage;
