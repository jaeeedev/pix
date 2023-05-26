const AuthDeco = () => {
  return (
    <div className="hidden flex-1 md:flex md:justify-center md:items-center">
      <div>
        <p className="font-bold text-4xl">Welcome!</p>
        <div className="relative h-64 p-10">
          <div className="absolute -left-8 w-24 h-24 bg-slate-300  rounded-md" />
          <div className="absolute left-6 -rotate-6 top-24 w-24 h-24 bg-slate-400 rounded-md" />
          <div className="absolute left-24 rotate-12 top-12 w-24 h-24 bg-slate-500 rounded-md" />
        </div>
        <p className="font-normal">멋진 상품들을 만나보세요</p>
      </div>
    </div>
  );
};

export default AuthDeco;
