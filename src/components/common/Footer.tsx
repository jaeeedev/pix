import ContentContainer from "./ContentContainer";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-slate-400">
      <ContentContainer>
        <div className="font-bold mb-4">pix</div>
        <p className="text-sm">
          상업적 목적이 없는 사이트입니다.
          <br />
          모든 사진은 저작권 문제가 없는 사진을 사용했습니다.
        </p>
        <span className="text-sm">@jaeeedev</span>
      </ContentContainer>
    </div>
  );
};

export default Footer;
