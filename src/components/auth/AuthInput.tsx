const AuthInput = ({ ...props }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        autoComplete="on"
        {...props}
        className="p-3 rounded-md w-full bg-slate-100"
      />
    </div>
  );
};

export default AuthInput;
