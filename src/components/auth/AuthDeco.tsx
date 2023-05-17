const AuthDeco = () => {
  return (
    <div className="hidden flex-1 md:flex md:justify-center md:items-center">
      <div>
        <p className="font-bold text-3xl">Welcome!</p>
        <div className="relative h-64 p-10">
          <div className="absolute -left-4 w-24 h-24 bg-slate-300  rounded-md" />
          <div className="absolute left-8 -rotate-6 top-24 w-24 h-24 bg-slate-400 rounded-md" />
          <div className="absolute left-24 rotate-12 top-12 w-24 h-24 bg-slate-500 rounded-md" />
        </div>
        <p>멋진 그림과 사진을 전시해보세요</p>
        <p>멋진 그림과 사진을 전시해보세요</p>
      </div>
    </div>
  );
};

export default AuthDeco;
