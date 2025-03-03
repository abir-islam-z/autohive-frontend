import EZButton from "@/components/form/EZButton";
import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";
import { verifyToken } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginSchema, TLoginSchema } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const defaultValues = { email: "", password: "" };

  const onSubmit = async (data: TLoginSchema) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Logged in", { id: toastId, duration: 2000 });

      navigate(`/dashboard`);
    } catch (err) {
      toast.dismiss(toastId);
      throw err;
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <EZForm
        onSubmit={onSubmit}
        resolver={zodResolver(loginSchema)}
        defaultValues={defaultValues}
      >
        <div className="mb-4">
          <EZInput name="email" label="Email" type="email" />
        </div>
        <div className="mb-6">
          <EZInput name="password" label="Password" type="password" />
        </div>
        <EZButton>Login</EZButton>
      </EZForm>
      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
