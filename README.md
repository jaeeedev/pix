# pix

## 개요

폰케이스를 파는 쇼핑몰이 컨셉입니다. 간단하게 쇼핑몰을 구현했습니다.
반응형으로 구현되었습니다. 1인 프로젝트입니다.

## 사용 기술

- React (vite)
- TypeScript
- Tailwind CSS
- Recoil
- React Query
- firebase (firestore, auth, storage)

## 기능

- 메인 페이지

  - 상품 일부 불러오기

- products 페이지

  ![pix-product](https://github.com/jaeeedev/pix/assets/72128840/23a9532f-09ce-447c-b995-6574bb47d33a)

  - 상품 불러오기(무한스크롤 적용)
  - 위시리스트 추가하기
  - 장바구니 추가하기

- product 페이지(제품상세 페이지)

  ![pix-detail](https://github.com/jaeeedev/pix/assets/72128840/2eb58d13-5b58-49bb-8190-e8fffe0b9058)

  - 위시리스트 추가하기
  - 장바구니 추가하기, 이미 담은 상품이면 수량만 업데이트
  - 리뷰 작성하기(미완성)

- cart 페이지  
   ![pix-cart](https://github.com/jaeeedev/pix/assets/72128840/afa23464-8c75-4700-bc5a-739ee15503ab)

  - 제품 장바구니에서 삭제하기(낙관적 업데이트)
  - 수량 변경(낙관적 업데이트)
  - 가격 총계 표시

- 마이페이지

  - 사용자 닉네임 변경
  - 위시리스트 삭제
  - 위시리스트를 장바구니에 추가

- 로그인,회원가입 페이지

  ![pix-signup](https://github.com/jaeeedev/pix/assets/72128840/03171917-6b4b-4578-8ada-93674c30f1df)

  - 로그인
  - 회원가입

- 어드민

  ```
  id: admin@test.com
  pw: admin1234
  ```

  ![pix-admin](https://github.com/jaeeedev/pix/assets/72128840/2ff086de-a71b-4f1a-88a7-46a270eb328e)

  - 상품 추가 기능
  - 상품 이미지 드래그, 업로드 기능

## 신경썼던 것

<details>
<summary>📙</summary>

- react-query 적용

  초기에 리액트 쿼리 없이 firebase sdk를 그대로 사용했습니다. `useEffect`를 통해 페이지에 진입할 때 마다 로딩이 발생하기 때문에 사용자경험에 나쁘다고 판단하여 캐싱 기능이 있는 리액트 쿼리를 추가로 도입했습니다. useQuery, useInfiniteQuery를 사용해 데이터를 다시 로드하지 않도록 했고, 낙관적 업데이트를 통해 장바구니의 상품들이 지연 없이 바로 업데이트되는듯한 효과를 주었습니다.

- 코드 스플리팅

  SPA 페이지 특성 상 모든 코드를 한꺼번에 불러온다면 초기 로딩 속도가 아주 느려질 것입니다. 페이지가 나뉘어있는 프로젝트기 때문에 `React.lazy` 를 이용하여 코드 스플리팅을 했습니다.

- UI

  데이터를 로딩하는 동안 시각적인 효과를 주기 위해 스켈레톤 UI를 적용했습니다.

- 재사용성

  모달을 하나의 컴포넌트로 만들고 모달을 관리하는 전역 상태, 모달의 메시지를 관리하는 훅을 제작했습니다. 그 외에도 공통 버튼 컴포넌트를 만들어 다양한 페이지에서 사용했습니다.

- 파일 분리

  닉네임의 경우 너무 짧거나 긴 경우를 방지해야 하기 때문에 minLength와 maxLength를 지정해주어야 했습니다.
  회원가입 페이지와 마이페이지에 닉네임 관련 코드가 분산되어 있어 서로 규칙이 맞지 않을 수 있기 때문에 constants 파일을 만들어 변수들을 한곳에 관리해주었습니다.  
  또한 데이터 요청이 있는 컴포넌트에서 코드가 너무 길어질 경우 가독성을 고려하여 커스텀 훅으로 파일을 분리했습니다.

- 썸네일용 url 관련

  > 같은 객체를 사용하더라도, createObjectURL()을 매번 호출할 때마다 새로운 객체 URL을 생성합니다. 각각의 URL을 더는 쓰지 않을 땐 URL.revokeObjectURL()을 사용해 하나씩 해제해줘야 합니다. (https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL_static, mdn)

  URL.createObjectURL() 을 이용해서 썸네일 주소를 생성하고 있기 때문에 해당 파일의 업로드를 취소하거나, 파일 정보가 성공적으로 데이터베이스에 저장된 경우에는 해당 주소를 URL.revokeObjectURL()로 해제시켜주었습니다.

  ```jsx
  const deleteFile = useCallback(() => {
    URL.revokeObjectURL(thumbnailUrl); // 파일 선택 취소 시 썸네일 제거하며 url 해제
    setCurrentFile(null);
    setThumbnailUrl("");
  }, [thumbnailUrl]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    if (!currentFile) return;

    await handleUpload(currentFile, target);
    URL.revokeObjectURL(thumbnailUrl);
    // 성공적으로 업로드가 완료된 경우 url 해제
  };
  ```

- 오류 처리

  ```ts
  type AuthErrorCodeMessages = {
    [key: string]: string;
    default: string;
  };

  const authErrorCodeMessages: AuthErrorCodeMessages = {
    "auth/email-already-in-use": "이미 사용중인 이메일입니다.",
    "auth/user-not-found": "이메일 혹은 비밀번호가 일치하지 않습니다.",
    "auth/wrong-password": "이메일 혹은 비밀번호가 일치하지 않습니다.",
    "auth/weak-password": "비밀번호를 6글자 이상으로 지정해주세요.",
    "auth/network-request-failed": "네트워크 연결에 실패했습니다.",
    "auth/invalid-email": "이메일 형식이 올바르지 않습니다.",
    default: "요청에 실패했습니다. 잠시 후 실행해주세요",
  };
  ```

  ```ts

  // 로그인, 회원가입 함수

  catch (err) {
          if (err instanceof FirebaseError && err.code) {
          console.log(err);
          setModal(
              authErrorCodeMessages[err.code] || authErrorCodeMessages.default
          );
          return;
          }
          setModal(authErrorCodeMessages.default);
      }

  ```

  인증과 관련된 오류들을 미리 `authErrorCodeMessages`에 저장해놓고 해당 오류가 내려오면 그 메시지가 출력되도록 만들었습니다. 만약 그 외의 에러 코드나 오류가 발생한다면 default 메시지가 출력되도록 지정해주었습니다. switch case문을 사용할수도 있지만 로그인 오류와 회원가입 오류를 한 객체에서 처리하고있기 때문에 여러 컴포넌트에서 불러와 사용하기에는 객체 형태가 편리할것이라고 생각했습니다. 그리고 코드를 수정하기에도 더 편리하다고 생각했습니다.

</details>

## 느낀 점

<details>
<summary>📙</summary>

- 리액트 쿼리 사용

  ```ts
  // WishList.tsx

  const [wishlist, setWishlist] = useState<DocumentData[]>([]);
  const [refetch, setRefetch] = useState(false);

  const getWishList = useCallback(async () => {
    // ... 위시리스트 가져오는 코드
  }, [userInfo]);

  useEffect(() => {
    getWishList();
  }, [getWishList, refetch]);

  const deleteWishItem = useCallback(
    async (id: string) => {
      if (!userInfo) return;
      try {
        // ... 해당 상품 위시리스트에서 삭제하는 코드
        setRefetch((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    },
    [userInfo]
  );
  ```

  기존에는 needRefetch라는 상태를 의존성으로 관리하여 수량 변경, 제품을 카트에서 삭제 같은 요청이 성공한 경우 needRefetch를 업데이트해 리렌더링을 발생시켰습니다.
  리액트 쿼리를 도입한 이후에는 invalidateQueries가 있기 때문에 이 코드를 삭제했습니다.

  ```tsx
  const queryClient = useQueryClient();
  const getWishList = useCallback(async () => {
    // ... 위시리스트 가져오는 코드
  }, [userInfo]);

  const { data: wishlist = [] } = useQuery({
    queryFn: getWishList,
    queryKey: [userInfo?.uid, "wishlist"],
    select: (data) => {
      return data?.docs.map((doc) => doc.data());
    },
    enabled: !!userInfo?.uid,
  });

  const deleteWishItem = useCallback(
    // ... 위시리스트 삭제 관련 코드
    [userInfo]
  );

  const { mutate: deleteWishMutate } = useMutation({
    mutationFn: deleteWishItem,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [userInfo?.uid, "wishlist"],
      }),
  });
  ```

  차이점

  - 더 직관적(맥락과 상관없이 boolean을 토글시키던 이전 방식에서 키를 관리하는 방식)
  - 어느 컴포넌트에 있든 queryClient를 통해 쿼리 무효화 가능(기존 방식에서는 setRefetch를 prop으로 전달해야 했음)
  - useEffect를 쓰지 않음

- firebase

  깊게는 아니더라도 authentication, firestore, storage 세가지의 기능을 사용해 보았습니다. 책을 보면서 로그인과 회원가입을 구현할 때 상당히 시간이 많이 들어갔던걸로 기억하는데 이렇게 간단히 인증을 구현할 수 있다는건 큰 장점같습니다. 하지만 아이디가 아닌 이메일로 회원가입하는 시스템이라 익숙한 구조(아이디-비밀번호) 가 아닌게 아쉬웠습니다.  
  상품을 업로드하는 기능을 구현하면서 storage도 사용해보게 되었습니다. 생각보다 간단하고 업로드 진행상황을 알려주는 메서드도 제공하고 있어 progress bar를 구현해볼 수 있었습니다.  
  firestore는 인증이나 스토리지보다는 알아야 할 내용이 많았던 부분입니다. firestore는 프론트엔드 개발자도 많이 쓰는 서비스지만 그래도 데이터베이스인지라 어떤 구조로 데이터를 저장하는게 가장 좋은 방식인지에 대해 고민하는 계기가 되었습니다.

  </details>

## 트러블 슈팅

<details>
<summary>📙</summary>

- 다른 페이지의 쿼리 무효화되지 않는 문제
  -> queryClient.invalidateQueries의 refetchType 옵션을 "all"로 설정

- useQuery의 enabled 설정 이후 isLoading=true로 고정되는 문제
  -> status와 fetchStatus 함께 확인  
   [블로그 기록](https://jaypa.tistory.com/46)

- tsx의 조건부 렌더링 문제
  ->

  ```
  'GlobalModal' cannot be used as a JSX component.
  Its return type 'false | Element' is not a valid JSX element.
  Type 'boolean' is not assignable to type 'ReactElement<any, any>'.
  ```

  이런 오류가 발생한다면

  ```tsx
  const GlobalModal = () => {
    const [visible, setVisible] = useState(false);
    const modalState = useRecoilValue(globalModalAtom);

    useEffect(() => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 1500);
    }, [modalState]);

    return (
      visible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-md bg-white/50">
          {modalState}
        </div>
      )
    );
  };
  ```

  조건부 렌더링이 원인이 될 수 있다.

  ```tsx
  return (
    <>
      // ✔✔
      {visible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-md bg-white/50">
          {modalState}
        </div>
      )}
    </>
  );
  ```

  한번 묶어서 내보내줘야한다.

- vite의 환경변수
  -> 보통 `process.env.변수명`으로 많이 접근하는데 vite는 좀 달라서
  `import.meta.env.VITE_변수명` 으로 접근해야 한다.

- 타입스크립트에서 try catch

  에러 객체가 무조건 unknown으로 잡히기 때문에 에러 객체에서 바로 프로퍼티를 쓰는건 안되고 이런저런 처리를 해야한다.

  `err instanceof FirebaseError`

  타입 좁히기 함

- input의 onChange 문제

  onChange를 통해 파일 업로드를 구현하면 같은 파일을 다시 등록할 경우 변화가 없는것으로 간주되어 이벤트 핸들러가 실행되지 않음
  사용자가 alert의 내용을 놓쳤을 경우 동일한 작업을 수행해도 다시 alert가 뜨지 않아 답답함을 느낄 수 있다. -> 받은 파일 객체는 상태에 저장하고 input의 value를 비워 항상 변화가 발생한 것 처럼 처리

</details>
