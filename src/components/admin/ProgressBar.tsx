type Props = {
  progress: number;
};

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full flex items-center gap-4">
      <div className="w-full h-3 rounded-md bg-slate-100 flex-1">
        <div
          className="bg-slate-800 rounded-md h-full"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <span className="text-sm">{progress} %</span>
    </div>
  );
};

export default ProgressBar;
