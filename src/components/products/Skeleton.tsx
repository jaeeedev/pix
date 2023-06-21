const Skeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 relative h-full animate-pulse">
      <div className="bg-slate-300 w-full h-[200px] overflow-hidden"></div>
      <div className="p-4 flex flex-col justify-between h-[130px]">
        <div className="bg-slate-300 h-[28px] rounded-sm" />
        {/* <p className="font-bold text-xl truncate">테스트</p> */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-1">
            <div className="bg-slate-300 w-[40px] h-[16px] rounded-sm" />
            <div className="bg-slate-300 w-[100px] h-[19px] rounded-sm" />
          </div>
          <div className="bg-slate-300 w-[34px] h-[34px] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
