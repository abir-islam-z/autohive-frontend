import EZButton from "@/components/form/EZButton";
import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type TRegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
  const [register] = useRegisterMutation();
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const onSubmit = async (data: TRegisterSchema) => {
    const id = toast.loading("Registering");
    try {
      await register(data);
      // Handle successful registration (e.g., redirect to login)
      toast.success("Registered Successfully", { id, duration: 2000 });
    } catch (error) {
      toast.error(getErrorMessage(error), { id, duration: 2000 });
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <EZForm
        onSubmit={onSubmit}
        resolver={zodResolver(registerSchema)}
        defaultValues={defaultValues}
      >
        <div className="mb-4">
          <EZInput name="name" label="Name" type="text" />
        </div>
        <div className="mb-4">
          <EZInput name="email" label="Email" type="email" />
        </div>
        <div className="mb-6">
          <EZInput name="password" label="Password" type="password" />
        </div>

        <div className="mb-6">
          <EZInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        </div>

        <EZButton>Login</EZButton>
      </EZForm>
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
