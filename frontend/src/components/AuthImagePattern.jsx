const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-inherit p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8 ml-1">
            
            {// 3x3 grid with gradient squares and alternating animations}
            <div className="grid grid-cols-3 gap-3 w-96 h-96">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl 
                    bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400
                    ${i % 2 === 0 ? "animate-spin-slow" : "animate-bounce-slow"}`}
                />
              ))}
            </div>
            }
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;