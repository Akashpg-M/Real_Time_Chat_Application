import {useState} from "react";
import{useAuthStore } from "../store/useAuthStore";
import{ Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import {Link} from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = (req, res) => {
  console.log("SignUp Page");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password) return toast.error("Password is required");
    if(!formData.password.length < 6) return toast.error("Password must be atleast 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if(success === true) signup(formData);
  }

  return (
    <div>
      <div>
        <div>
          {/* LOGO */}
          <div>
            <div>
              <div>
                <MessageSquare className="size-6 text-primary"/>
              </div>
              <h1> Create Account </h1>
              <p>Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <span>Full Name</span>
              </label>
              <div>
                <div>
                  <User className="size-5 text-base-content/40"/>
                </div>
                <input
                  type="text"
                  classNmae={`input input-border w-full pl-10`}
                  placeholder="Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value})}
                  /> 
              </div>
            </div>

            <div>
              <label>
                <span>Email</span>
              </label>
              <div>
                <div>
                  <Mail className="size-5 tet-base-content/40"/>
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span>Password</span>
              </label>
              <div>
                <div>
                  <Lock className='size-5 text-base-content/40'/>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-boarded w-full pl-10`}
                  placeHolder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40"/>
                      ) : (
                        <Eye className="size-5 text-base-content/40" />
                      )}
                    </button>
              </div>
            </div>

            <button type="submit" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )} 
            </button>
          </form>

          <div>
            <p>
              Already have an account?{" "}
              <Link to='/login' className='link link-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="join our community"
        subtitle="connect with friends and family"
      />
    </div>
  )
};

export default SignUpPage;

