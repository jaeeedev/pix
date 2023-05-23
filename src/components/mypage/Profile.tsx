import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { storage } from "../../firebase/initFirebase";
import { ref, uploadBytes } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/initFirebase";
import useGlobalModal from "../common/modal/useGlobalModal";
import { maxNicknameLength, minNicknameLength } from "../../utills/constants";

const Profile = () => {
  const { userInfo } = useRecoilValue(authAtom);
  const [changingNickname, setChangingNickname] = useState(false);
  const changeInputRef = useRef<HTMLInputElement>(null);
  const { setModal } = useGlobalModal();
  const setAuthAtom = useSetRecoilState(authAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/");
  }, [navigate, userInfo]);

  // const handleChange = async (e) => {
  //   const file = e.target.files[0];

  //   const storageRef = ref(storage, `profile/${userInfo?.email}`);
  //   const response = await uploadBytes(storageRef, file);
  //   if (response) console.log("uploaded!");
  // };

  const changeNickname = useCallback(async () => {
    if (!auth.currentUser || !changeInputRef.current) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: changeInputRef.current.value,
      });

      setChangingNickname(false);
      setModal("닉네임이 변경되었습니다.");
      setAuthAtom((prev) => {
        const userCopy = JSON.parse(JSON.stringify(auth.currentUser));
        return { ...prev, userInfo: userCopy };
      });
    } catch (err) {
      setModal("닉네임 변경에 실패했습니다.");
      console.log(err);
    }
  }, [setAuthAtom, setModal]);

  return (
    <div className="flex-1 bg-slate-100 p-4 rounded-md">
      <h3 className="font-bold text-lg mb-4">profile</h3>

      <div className="flex flex-col items-center">
        {/* <div className="w-32 h-32 bg-white rounded-full mb-4 relative">
          <button className="absolute right-0 bottom-0 w-10 h-10 bg-slate-800 rounded-full"></button>
        </div> */}

        <p className="my-3 font-semibold text-slate-500">welcome!</p>

        <div className="text-center">
          {changingNickname && (
            <div className="flex gap-4  mb-2">
              <input
                className="block p-2"
                minLength={minNicknameLength}
                maxLength={maxNicknameLength}
                defaultValue={userInfo?.displayName}
                ref={changeInputRef}
              />
              <button
                className="bg-slate-800 rounded-md text-white px-4"
                onClick={changeNickname}
              >
                확인
              </button>
              <button
                className="bg-slate-800 rounded-md text-white px-4"
                onClick={() => {
                  setChangingNickname(false);
                }}
              >
                취소
              </button>
            </div>
          )}
          {!changingNickname && (
            <span className="font-bold text-2xl">{userInfo?.displayName}</span>
          )}
          <p className="font-semibold">({userInfo?.email})</p>
          <button
            className="mt-4 p-2 px-6 rounded-md bg-slate-800 text-white"
            onClick={() => {
              setChangingNickname(true);
            }}
          >
            닉네임 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
