const AuthInput = ({ ...props }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        {...props}
        className="p-3 rounded-md w-full bg-slate-100"
      />
    </div>
  );
};

export default AuthInput;
