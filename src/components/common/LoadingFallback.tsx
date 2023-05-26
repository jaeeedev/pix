import ContentContainer from "./ContentContainer";

const LoadingFallback = () => {
  return (
    <ContentContainer>
      <div className="w-full h-screen flex items-center justify-center animate-pulse">
        Loading...
      </div>
    </ContentContainer>
  );
};

export default LoadingFallback;
